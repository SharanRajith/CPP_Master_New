import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, LogOut, Flame, Trophy, Home, Menu, X, ChevronRight, Zap } from 'lucide-react';
import { LEVELS } from '../../hooks/useProgress';

export default function Navbar({ xp, level, streak, currentUser, onOpenSettings, onLogout, onToggleSidebar }) {
  const location      = useLocation();
  const isLessonRoute = location.pathname.startsWith('/lesson/');
  const levelInfo     = LEVELS[level - 1] || LEVELS[0];
  const nextLevel     = LEVELS[level] || null;
  const xpInLevel     = nextLevel ? xp - levelInfo.minXP : 0;
  const xpNeeded      = nextLevel ? nextLevel.minXP - levelInfo.minXP : 1;
  const pct           = nextLevel ? Math.min((xpInLevel / xpNeeded) * 100, 100) : 100;
  const [showUserMenu, setShowUserMenu] = useState(false);

  const avatarFallback = (currentUser?.displayName || 'U').charAt(0).toUpperCase();

  return (
    <header className="h-14 flex items-center px-2 md:px-4 gap-2 md:gap-3 bg-dark-800 border-b border-dark-600 shrink-0 z-20 w-full relative">
      
      {/* Mobile Hamburger — only on lesson route */}
      {isLessonRoute && (
        <button
          id="sidebar-toggle-btn"
          className="md:hidden p-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700 transition"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Logo */}
      <Link to="/" id="nav-logo" className="flex items-center gap-2 shrink-0">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm"
          style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
        >
          C+
        </div>
        <div className="hidden sm:block leading-tight">
          <span className="font-bold text-white text-sm block">CppMaster</span>
          <span className="text-dark-300 text-[10px] block">DSA Platform</span>
        </div>
      </Link>

      <div className="flex-1" />

      {/* Streak badge */}
      <div
        id="streak-badge"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-sm font-bold"
        style={{ background: 'rgba(251,146,60,0.12)', border: '1px solid rgba(251,146,60,0.2)' }}
      >
        <Flame size={14} className={streak > 0 ? 'text-orange-400' : 'text-dark-400'} />
        <span className="text-orange-300">{streak}</span>
        <span className="hidden sm:inline text-xs text-dark-400 font-normal">day</span>
      </div>

      {/* Level + XP bar (hidden on tiny screens) */}
      <div id="level-indicator" className="hidden sm:flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2"
          style={{ borderColor: levelInfo.color, color: levelInfo.color }}
        >
          {level}
        </div>
        <div className="hidden md:block">
          <div className="text-[11px] font-semibold text-white leading-none mb-1">{levelInfo.title}</div>
          <div className="flex items-center gap-1.5">
            <div className="w-20 h-1.5 bg-dark-600 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${pct}%`,
                  background: 'linear-gradient(90deg, #6366f1, #818cf8)',
                }}
              />
            </div>
            <span className="text-[10px] text-dark-400 flex items-center gap-0.5">
              <Zap size={9} className="text-yellow-400" />{xp}
            </span>
          </div>
        </div>
      </div>

      {/* Nav icons */}
      <div className="flex items-center gap-0.5">
        <Link id="nav-home" to="/" className="p-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700 transition-all" title="Home">
          <Home size={17} />
        </Link>
        <Link id="nav-dashboard" to="/dashboard" className="p-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700 transition-all" title="Dashboard">
          <Trophy size={17} />
        </Link>
        <button id="nav-settings" onClick={onOpenSettings} className="p-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700 transition-all" title="Settings">
          <Settings size={17} />
        </button>
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-dark-600 mx-1 hidden sm:block" />

      {/* User avatar & dropdown */}
      <div className="relative">
        <button
          id="user-avatar-btn"
          onClick={() => setShowUserMenu(v => !v)}
          className="flex items-center gap-2 rounded-full px-1.5 py-1 hover:bg-dark-700 transition-all"
          aria-label="User menu"
        >
          {currentUser?.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt={currentUser.displayName}
              className="w-7 h-7 rounded-full ring-2 ring-brand-600/50 object-cover"
            />
          ) : (
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
            >
              {avatarFallback}
            </div>
          )}
          <span className="hidden md:block text-sm text-dark-200 font-medium max-w-[6rem] truncate">
            {currentUser?.displayName?.split(' ')[0] || 'User'}
          </span>
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowUserMenu(false)} />
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-56 rounded-xl shadow-2xl z-40 overflow-hidden"
                style={{
                  background: 'rgba(20,18,48,0.97)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                }}
              >
                {/* User info header */}
                <div className="px-4 py-3 border-b border-dark-600">
                  <div className="flex items-center gap-3">
                    {currentUser?.photoURL ? (
                      <img src={currentUser.photoURL} alt="" className="w-9 h-9 rounded-full" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-sm font-bold text-white">
                        {avatarFallback}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{currentUser?.displayName || 'User'}</p>
                      <p className="text-xs text-dark-400 truncate">{currentUser?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Level info */}
                <div className="px-4 py-2.5 border-b border-dark-700">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-dark-300">Level {level} · {levelInfo.title}</span>
                    <span className="text-xs font-bold" style={{ color: levelInfo.color }}>{xp} XP</span>
                  </div>
                  <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: levelInfo.color }} />
                  </div>
                </div>

                {/* Actions */}
                <div className="p-1.5">
                  <Link
                    to="/dashboard"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-dark-200 hover:bg-dark-700 hover:text-white transition-all"
                  >
                    <Trophy size={14} className="text-brand-400" />
                    My Dashboard
                    <ChevronRight size={12} className="ml-auto text-dark-400" />
                  </Link>
                  <button
                    id="user-logout-btn"
                    onClick={() => { setShowUserMenu(false); onLogout(); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-900/20 transition-all"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
