import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { onSnapshot, doc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';

import Navbar        from './components/layout/Navbar';
import Sidebar       from './components/layout/Sidebar';
import SettingsModal from './components/settings/SettingsModal';
import PremiumModal  from './components/PremiumModal';
import SupportModal  from './components/SupportModal';
import OnboardingModal, { shouldShowOnboarding } from './components/OnboardingModal';
import ProductTour, { shouldShowTour } from './components/ProductTour';
import SearchModal from './components/SearchModal';
import AnnouncementBanner from './components/AnnouncementBanner';
import { AnimatePresence } from 'framer-motion';

const HomePage        = lazy(() => import('./pages/HomePage'));
const LessonPage      = lazy(() => import('./pages/LessonPage'));
const DashboardPage   = lazy(() => import('./pages/DashboardPage'));
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'));
const AdminPage       = lazy(() => import('./pages/AdminPage'));
const ProfilePage     = lazy(() => import('./pages/ProfilePage'));
const VisualizerPage  = lazy(() => import('./pages/VisualizerPage'));
const ProblemsPage    = lazy(() => import('./pages/ProblemsPage'));
const InterviewPage   = lazy(() => import('./pages/InterviewPage'));
const LoginPage       = lazy(() => import('./pages/LoginPage'));

function PageLoader() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

import { useProgress } from './hooks/useProgress';
import { isAdminEmail } from './config/admins';
import { useParams }   from 'react-router-dom';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

// ─── Layout wrapper ───────────────────────────────────────────────────────────
function AppShell({ progress, completeLesson, completeQuiz, completeLeetCode, unlockHint, saveNote, deleteNote, isLessonCompleted, isLessonUnlocked, resetProgress, onLogout, onProfileUpdate, currentUser, isAdmin, isPremium }) {
  const { pathname } = useLocation();
  const [showSettings,   setShowSettings]   = useState(false);
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [showPremium,    setShowPremium]    = useState(false);
  const [showSupport,    setShowSupport]    = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => shouldShowOnboarding());
  // Show tour immediately if onboarding already done, otherwise wait for onboarding to finish
  const [showTour,       setShowTour]       = useState(() => !shouldShowOnboarding() && shouldShowTour());
  const [showSearch,     setShowSearch]     = useState(false);

  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(v => !v);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <Navbar
        xp={progress.xp}
        level={progress.level}
        streak={progress.streak}
        currentUser={currentUser}
        isAdmin={isAdmin}
        isPremium={isPremium}
        onOpenSettings={() => setShowSettings(true)}
        onOpenPremium={() => setShowPremium(true)}
        onOpenSupport={() => setShowSupport(true)}
        onOpenSearch={() => setShowSearch(true)}
        onLogout={onLogout}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        photoURL={progress.photoURL}
      />
      <AnnouncementBanner />
      <div className="flex flex-1 overflow-hidden relative">
        <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage progress={progress} onOpenPremium={() => setShowPremium(true)} />} />
          <Route
            path="/lesson/:lessonId"
            element={
              <LessonShell
                progress={progress}
                completeLesson={completeLesson}
                completeLeetCode={completeLeetCode}
                unlockHint={unlockHint}
                saveNote={saveNote}
                deleteNote={deleteNote}
                isLessonCompleted={isLessonCompleted}
                isLessonUnlocked={isLessonUnlocked}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                isPremium={isPremium}
                currentUser={currentUser}
                isAdmin={isAdmin}
              />
            }
          />
          <Route path="/dashboard"    element={<DashboardPage progress={progress} resetProgress={resetProgress} completeQuiz={completeQuiz} currentUser={currentUser} />} />
          <Route path="/leaderboard"  element={<LeaderboardPage currentUser={currentUser} />} />
          <Route path="/admin"        element={<AdminPage currentUser={currentUser} />} />
          <Route path="/visualizer"   element={<VisualizerPage />} />
          <Route path="/problems"     element={<ProblemsPage progress={progress} />} />
          <Route path="/interview"    element={<InterviewPage />} />
          <Route path="/profile"      element={<ProfilePage currentUser={currentUser} progress={progress} onProfileUpdate={onProfileUpdate} />} />
          <Route path="/profile/:uid" element={<ProfilePage currentUser={currentUser} progress={progress} onProfileUpdate={onProfileUpdate} />} />
          <Route path="*"             element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </div>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      <AnimatePresence>
        {showPremium && <PremiumModal onClose={() => setShowPremium(false)} onOpenSupport={() => { setShowPremium(false); setShowSupport(true); }} />}
      </AnimatePresence>
      <AnimatePresence>
        {showSupport && <SupportModal onClose={() => setShowSupport(false)} currentUser={currentUser} isPremium={isPremium} />}
      </AnimatePresence>
      <AnimatePresence>
        {showOnboarding && (
          <OnboardingModal onClose={() => {
            setShowOnboarding(false);
            if (shouldShowTour()) setShowTour(true);
          }} />
        )}
      </AnimatePresence>
      {showTour && <ProductTour onDone={() => setShowTour(false)} />}
      <AnimatePresence>
        {showSearch && (
          <SearchModal
            onClose={() => setShowSearch(false)}
            progress={progress}
            isLessonUnlocked={isLessonUnlocked}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Lesson Shell (responsive) ────────────────────────────────────────────────
function LessonShell({ progress, completeLesson, completeLeetCode, unlockHint, saveNote, deleteNote, isLessonCompleted, isLessonUnlocked, sidebarOpen, setSidebarOpen, isPremium, currentUser, isAdmin }) {
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
            completeLeetCode={completeLeetCode}
            unlockHint={unlockHint}
            saveNote={saveNote}
            deleteNote={deleteNote}
            isLessonCompleted={isLessonCompleted}
            isLessonUnlocked={isLessonUnlocked}
            isMobile={true}
            isPremium={isPremium}
            currentUser={currentUser}
            isAdmin={isAdmin}
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
          completeLeetCode={completeLeetCode}
          unlockHint={unlockHint}
          saveNote={saveNote}
          deleteNote={deleteNote}
          isLessonCompleted={isLessonCompleted}
          isLessonUnlocked={isLessonUnlocked}
          isMobile={false}
          isPremium={isPremium}
          currentUser={currentUser}
          isAdmin={isAdmin}
        />
      </Panel>
    </PanelGroup>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isBlocked, setIsBlocked] = useState(false);
  // watchedUid keeps the Firestore listener alive after signOut so unblock is detected instantly
  const [watchedUid, setWatchedUid] = useState(null);
  const isBlockedRef = useRef(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser({
          uid:         firebaseUser.uid,
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          email:       firebaseUser.email,
          photoURL:    firebaseUser.photoURL,
        });
        setWatchedUid(firebaseUser.uid);
      } else {
        setCurrentUser(null);
        // Only stop watching if this was a voluntary logout, not a block-triggered signOut
        if (!isBlockedRef.current) setWatchedUid(null);
      }
    });
    return () => unsub();
  }, []);

  // Block/unblock listener — stays alive after signOut because it depends on watchedUid, not currentUser
  useEffect(() => {
    if (!watchedUid) return;
    const unsub = onSnapshot(doc(db, 'users', watchedUid), (snap) => {
      if (!snap.exists()) return;
      const blocked = !!snap.data().isBlocked;
      if (blocked && !isBlockedRef.current) {
        isBlockedRef.current = true;
        setIsBlocked(true);
        signOut(auth);
      } else if (!blocked && isBlockedRef.current) {
        // Admin unblocked — clear screen instantly, show login
        isBlockedRef.current = false;
        setIsBlocked(false);
        setWatchedUid(null);
      }
    });
    return () => unsub();
  }, [watchedUid]);

  if (isBlocked) {
    return (
      <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
            </svg>
          </div>
          <h1 className="text-2xl font-black text-white mb-2">Account Suspended</h1>
          <p className="text-dark-300 text-sm leading-relaxed mb-6">
            Your account has been suspended due to a violation of our community guidelines.
            If you believe this is a mistake, please contact support.
          </p>
          <a href="mailto:sharanrajithk@gmail.com"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
            style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
            Contact Support
          </a>
          <p className="text-dark-600 text-xs mt-6">You will be signed out automatically.</p>
        </div>
      </div>
    );
  }

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

  function refreshCurrentUser() {
    const u = auth.currentUser;
    if (u) setCurrentUser({ uid: u.uid, displayName: u.displayName || u.email?.split('@')[0] || 'User', email: u.email, photoURL: u.photoURL });
  }

  if (!currentUser) return <Suspense fallback={<PageLoader />}><LoginPage /></Suspense>;

  return <AuthenticatedApp currentUser={currentUser} onLogout={async () => signOut(auth)} onProfileUpdate={refreshCurrentUser} />;
}

const BACKEND_URL = 'https://cpp-master.onrender.com/';
const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes

function AuthenticatedApp({ currentUser, onLogout, onProfileUpdate }) {
  const { progress, completeLesson, completeQuiz, completeLeetCode, unlockHint, saveNote, deleteNote, isLessonUnlocked, isLessonCompleted, resetProgress } = useProgress(currentUser);

  const isAdmin   = isAdminEmail(currentUser?.email) || !!progress?.isAdmin;
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
        completeQuiz={completeQuiz}
        completeLeetCode={completeLeetCode}
        unlockHint={unlockHint}
        saveNote={saveNote}
        deleteNote={deleteNote}
        isLessonCompleted={isLessonCompleted}
        isLessonUnlocked={isLessonUnlocked}
        resetProgress={resetProgress}
        onLogout={onLogout}
        onProfileUpdate={onProfileUpdate}
        currentUser={currentUser}
        isAdmin={isAdmin}
        isPremium={isPremium}
      />
    </BrowserRouter>
  );
}
