import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './lib/firebase';

import Navbar        from './components/layout/Navbar';
import Sidebar       from './components/layout/Sidebar';
import SettingsModal from './components/settings/SettingsModal';
import PremiumModal  from './components/PremiumModal';
import { AnimatePresence } from 'framer-motion';

import HomePage        from './pages/HomePage';
import LessonPage      from './pages/LessonPage';
import DashboardPage   from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AdminPage       from './pages/AdminPage';
import LoginPage       from './pages/LoginPage';

import { useProgress } from './hooks/useProgress';
import { isAdminEmail } from './config/admins';
import { useParams }   from 'react-router-dom';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

// ─── Layout wrapper ───────────────────────────────────────────────────────────
function AppShell({ progress, completeLesson, isLessonCompleted, isLessonUnlocked, resetProgress, onLogout, currentUser, isAdmin, isPremium }) {
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [showPremium, setShowPremium]   = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar
        xp={progress.xp}
        level={progress.level}
        streak={progress.streak}
        currentUser={currentUser}
        isAdmin={isAdmin}
        isPremium={isPremium}
        onOpenSettings={() => setShowSettings(true)}
        onOpenPremium={() => setShowPremium(true)}
        onLogout={onLogout}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex flex-1 overflow-hidden relative">
        <Routes>
          <Route path="/" element={<HomePage progress={progress} onOpenPremium={() => setShowPremium(true)} />} />
          <Route
            path="/lesson/:lessonId"
            element={
              <LessonShell
                progress={progress}
                completeLesson={completeLesson}
                isLessonCompleted={isLessonCompleted}
                isLessonUnlocked={isLessonUnlocked}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                isPremium={isPremium}
              />
            }
          />
          <Route path="/dashboard"    element={<DashboardPage progress={progress} resetProgress={resetProgress} currentUser={currentUser} />} />
          <Route path="/leaderboard"  element={<LeaderboardPage currentUser={currentUser} />} />
          <Route path="/admin"        element={<AdminPage currentUser={currentUser} />} />
          <Route path="*"             element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      <AnimatePresence>
        {showPremium && <PremiumModal onClose={() => setShowPremium(false)} />}
      </AnimatePresence>
    </div>
  );
}

// ─── Lesson Shell (responsive) ────────────────────────────────────────────────
function LessonShell({ progress, completeLesson, isLessonCompleted, isLessonUnlocked, sidebarOpen, setSidebarOpen, isPremium }) {
  const { lessonId } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [lessonId, isMobile, setSidebarOpen]);

  if (isMobile) {
    return (
      <div className="flex flex-1 w-full relative overflow-hidden">
        {sidebarOpen && (
          <div className="absolute inset-0 z-40 flex"
            style={{ background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(6px)' }}>
            <div className="w-[85vw] max-w-xs h-full bg-dark-800 shadow-2xl border-r border-dark-600 flex flex-col">
              <Sidebar progress={progress} currentLessonId={lessonId} isPremium={isPremium} />
            </div>
            <div className="flex-1" onClick={() => setSidebarOpen(false)} />
          </div>
        )}
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <LessonPage
            progress={progress}
            completeLesson={completeLesson}
            isLessonCompleted={isLessonCompleted}
            isLessonUnlocked={isLessonUnlocked}
            isMobile={true}
            isPremium={isPremium}
          />
        </div>
      </div>
    );
  }

  return (
    <PanelGroup direction="horizontal" className="flex-1">
      <Panel defaultSize={20} minSize={15} maxSize={40}>
        <Sidebar progress={progress} currentLessonId={lessonId} isPremium={isPremium} />
      </Panel>
      <PanelResizeHandle className="w-1.5 bg-dark-600 hover:bg-brand-500 transition-colors cursor-col-resize shrink-0 data-[resize-handle-state=drag]:bg-brand-400" />
      <Panel className="flex flex-col min-w-0">
        <LessonPage
          progress={progress}
          completeLesson={completeLesson}
          isLessonCompleted={isLessonCompleted}
          isLessonUnlocked={isLessonUnlocked}
          isMobile={false}
          isPremium={isPremium}
        />
      </Panel>
    </PanelGroup>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser({
          uid:         firebaseUser.uid,
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          email:       firebaseUser.email,
          photoURL:    firebaseUser.photoURL,
        });
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsub();
  }, []);

  if (currentUser === undefined) {
    return (
      <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-500 flex items-center justify-center">
            <span className="text-white font-black text-lg">C+</span>
          </div>
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!currentUser) return <LoginPage />;

  return <AuthenticatedApp currentUser={currentUser} onLogout={async () => signOut(auth)} />;
}

const BACKEND_URL = 'https://cpp-master.onrender.com/';
const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes

function AuthenticatedApp({ currentUser, onLogout }) {
  const { progress, completeLesson, isLessonUnlocked, isLessonCompleted, resetProgress } = useProgress(currentUser);

  const isAdmin   = isAdminEmail(currentUser?.email);
  const isPremium = isAdmin || !!progress?.isPremium;

  // Keep Render backend alive — ping every 10 min so it never sleeps
  useEffect(() => {
    const ping = () => fetch(BACKEND_URL, { method: 'GET', mode: 'no-cors' }).catch(() => {});
    ping(); // immediate ping on login
    const id = setInterval(ping, PING_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <BrowserRouter>
      <AppShell
        progress={progress}
        completeLesson={completeLesson}
        isLessonCompleted={isLessonCompleted}
        isLessonUnlocked={isLessonUnlocked}
        resetProgress={resetProgress}
        onLogout={onLogout}
        currentUser={currentUser}
        isAdmin={isAdmin}
        isPremium={isPremium}
      />
    </BrowserRouter>
  );
}
