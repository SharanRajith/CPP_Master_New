import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Zap, Trophy, BookOpen, Code2, ArrowRight } from 'lucide-react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';

const STATS = [
  { value: '13',   label: 'Modules' },
  { value: '120+', label: 'Lessons' },
  { value: '15',   label: 'FAANG Problems' },
];

const FEATURES = [
  { icon: <Code2 size={15} />,    text: 'In-browser C++ compiler — no install needed' },
  { icon: <Zap size={15} />,      text: 'XP, levels, streaks & achievement badges' },
  { icon: <Trophy size={15} />,   text: 'Leaderboard & completion certificate' },
  { icon: <BookOpen size={15} />, text: 'FAANG-style problems with hints & solutions' },
];

const CODE_LINES = [
  '#include <iostream>',
  '#include <vector>',
  '',
  'int main() {',
  '  vector<int> v = {3,1,4,1,5};',
  '  sort(v.begin(), v.end());',
  '  // FAANG-ready 🚀',
  '  return 0;',
  '}',
];

export default function LoginPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError]             = useState('');

  const handleGoogleLogin = async () => {
    try {
      setIsLoggingIn(true);
      setError('');
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Sign-in failed. Please try again.');
      }
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: '#080b14' }}>

      {/* ── Left panel (hidden on mobile) ─────────────────────────────────── */}
      <div className="hidden lg:flex flex-col flex-1 relative overflow-y-auto overflow-x-hidden"
        style={{ background: 'linear-gradient(145deg, #0d0b1f 0%, #120a2e 40%, #0a1020 100%)' }}>

        {/* Ambient glows + grid — fixed so they don't scroll */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.35) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)' }} />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

        <div className="relative flex flex-col min-h-full p-10 xl:p-14" style={{ zIndex: 1 }}>
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm"
              style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
              C+
            </div>
            <span className="font-bold text-white text-lg tracking-tight">CppMaster</span>
          </div>

          {/* Main copy */}
          <div className="flex-1 flex flex-col justify-center max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Free to start · No credit card
              </div>

              <h1 className="text-4xl xl:text-5xl font-black text-white leading-[1.1] mb-5">
                Go from{' '}
                <span style={{ background: 'linear-gradient(135deg,#818cf8,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  beginner
                </span>
                <br />to{' '}
                <span style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  FAANG-ready
                </span>
              </h1>
              <p className="text-slate-400 text-base leading-relaxed mb-8">
                The structured C++ & DSA curriculum that takes you from zero to cracking top-tier tech interviews.
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-6 mb-10">
                {STATS.map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-black text-white">{s.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Feature list */}
              <ul className="space-y-3">
                {FEATURES.map((f, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
                      {f.icon}
                    </div>
                    {f.text}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Code block decoration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="rounded-2xl p-5 font-mono text-xs leading-6"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(99,102,241,0.15)',
            }}
          >
            {CODE_LINES.map((line, i) => (
              <div key={i} className="flex gap-4">
                <span className="select-none text-slate-700 w-4 text-right shrink-0">{line ? i + 1 : ''}</span>
                <span style={{ color: line.startsWith('#') ? '#f97316' : line.startsWith('//') ? '#6b7280' : line.includes('vector') || line.includes('sort') ? '#818cf8' : '#e2e8f0' }}>
                  {line || ' '}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Right panel — login card ───────────────────────────────────────── */}
      <div className="flex-1 lg:max-w-md flex items-center justify-center p-6 relative overflow-y-auto"
        style={{ background: '#080b14' }}>

        {/* Mobile background glow */}
        <div className="lg:hidden absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(79,70,229,0.2) 0%, transparent 60%)' }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm relative z-10"
        >
          {/* Mobile-only logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-base"
              style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
              C+
            </div>
            <span className="font-bold text-white text-xl">CppMaster</span>
          </div>

          {/* Card */}
          <div className="rounded-2xl p-8"
            style={{
              background: 'rgba(15,13,35,0.9)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(99,102,241,0.18)',
              boxShadow: '0 0 0 1px rgba(99,102,241,0.06), 0 32px 64px rgba(0,0,0,0.6)',
            }}>

            <div className="mb-7">
              <h2 className="text-2xl font-black text-white mb-1.5">Sign in to continue</h2>
              <p className="text-sm text-slate-400">Your progress is saved automatically.</p>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 rounded-xl text-sm text-red-400 text-center"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google button */}
            <motion.button
              onClick={handleGoogleLogin}
              disabled={isLoggingIn}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="w-full flex items-center justify-center gap-3 rounded-xl py-3.5 font-bold text-sm text-slate-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: '#ffffff', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
            >
              {isLoggingIn ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </>
              )}
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-dark-700" />
              <span className="text-xs text-slate-600">what you get</span>
              <div className="flex-1 h-px bg-dark-700" />
            </div>

            {/* Mini feature list */}
            <ul className="space-y-2.5">
              {[
                'Full C++ & DSA curriculum (free)',
                'Live compiler — code in the browser',
                'Track streaks, XP & achievements',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs text-slate-400">
                  <CheckCircle2 size={13} className="text-indigo-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-center text-[11px] text-slate-600 mt-6">
              🔒 Secured by Google · Progress synced via Firebase
            </p>
          </div>

          <p className="text-center text-xs text-slate-700 mt-4">
            CppMaster v2.0 · Powered by Firebase
          </p>
        </motion.div>
      </div>
    </div>
  );
}
