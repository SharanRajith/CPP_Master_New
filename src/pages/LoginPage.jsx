import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Zap, Code2, Lock } from 'lucide-react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';

const FEATURES = [
  { icon: <Code2 size={16} />, label: 'Live C++ Compiler' },
  { icon: <Zap size={16} />,   label: 'XP & Level System' },
  { icon: <Shield size={16} />, label: 'Cloud Progress Sync' },
];

export default function LoginPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError]             = useState('');

  const handleGoogleLogin = async () => {
    try {
      setIsLoggingIn(true);
      setError('');
      await signInWithPopup(auth, googleProvider);
      // onAuthStateChanged in App.jsx will handle the state update
    } catch (err) {
      console.error('Login failed', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Failed to sign in with Google. Please try again.');
      }
      setIsLoggingIn(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 20% 50%, #1a1040 0%, #0A0F1C 50%, #0d1026 100%)' }}
    >
      {/* Animated background orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4f46e5 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
      />

      {/* Floating code snippets (decorative, desktop only) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block overflow-hidden">
        {['#include <iostream>', 'int main() {', '  cout << "Hello";', '  return 0;', '}'].map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.07, x: 0 }}
            transition={{ delay: i * 0.2, duration: 1 }}
            className="absolute font-mono text-indigo-300 text-sm whitespace-nowrap"
            style={{ top: `${10 + i * 12}%`, left: `${3 + i * 1.5}%` }}
          >
            {line}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Card */}
        <div
          className="rounded-2xl p-7 shadow-2xl"
          style={{
            background: 'rgba(17, 15, 40, 0.85)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(99,102,241,0.2)',
            boxShadow: '0 0 60px rgba(79,70,229,0.15), 0 25px 50px rgba(0,0,0,0.5)',
          }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="relative"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  boxShadow: '0 0 30px rgba(99,102,241,0.5)',
                }}
              >
                <Terminal className="text-white w-8 h-8" />
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-[#110f28] flex items-center justify-center"
              >
                <Lock size={9} className="text-green-900" />
              </div>
            </motion.div>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-2">
              Welcome to{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                CppMaster
              </span>
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Master C++ and DSA with an interactive, gamified curriculum.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-7">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(99,102,241,0.12)',
                  border: '1px solid rgba(99,102,241,0.25)',
                  color: '#a5b4fc',
                }}
              >
                {f.icon}
                {f.label}
              </motion.div>
            ))}
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 bg-red-500/10 border border-red-500/40 text-red-400 text-sm p-3 rounded-xl text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Google Sign-In Button */}
          <motion.button
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(255,255,255,0.15)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full relative flex items-center justify-center gap-3 bg-white text-slate-800 rounded-xl py-3.5 px-4 font-bold text-sm shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ boxShadow: '0 4px 20px rgba(255,255,255,0.08)' }}
          >
            {isLoggingIn ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin" />
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

          {/* Trust Footer */}
          <p className="text-center text-xs text-slate-500 mt-5">
            🔒 Your progress is securely synced to the cloud via Firebase.
          </p>
        </div>

        {/* Version tag */}
        <p className="text-center text-xs text-slate-600 mt-4">
          CppMaster v2.0 · Powered by Firebase
        </p>
      </motion.div>
    </div>
  );
}
