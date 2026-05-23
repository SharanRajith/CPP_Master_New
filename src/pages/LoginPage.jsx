import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Zap, Trophy, BookOpen, Code2, Mail, Lock, User, Eye, EyeOff, BarChart2, MessageSquare, Layers, Swords } from 'lucide-react';
import { auth, googleProvider } from '../lib/firebase';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

const STATS = [
  { value: '3',    label: 'Tracks' },
  { value: '120+', label: 'Lessons' },
  { value: '15',   label: 'FAANG Problems' },
];

const FEATURES = [
  { icon: <Code2 size={14} />,        text: 'In-browser C++ compiler — no install needed' },
  { icon: <BarChart2 size={14} />,    text: 'Algorithm Visualizer — sorting, trees & graphs step-by-step' },
  { icon: <Layers size={14} />,       text: '3 tracks: C++ DSA · Embedded C · DBMS' },
  { icon: <Swords size={14} />,       text: 'Daily challenges + FAANG-style problems with hints' },
  { icon: <Zap size={14} />,          text: 'XP, levels, streaks & achievement badges' },
  { icon: <MessageSquare size={14} />,text: 'Public comments with @mentions on every lesson' },
];

const CODE_LINES = [
  { n: 1,  color: '#f97316', text: '#include <iostream>' },
  { n: 2,  color: '#f97316', text: '#include <vector>' },
  { n: 3,  color: '',        text: '' },
  { n: 4,  color: '#c084fc', text: 'int main() {' },
  { n: 5,  color: '#818cf8', text: '  vector<int> v = {3,1,4,1,5};' },
  { n: 6,  color: '#818cf8', text: '  sort(v.begin(), v.end());' },
  { n: 7,  color: '#6b7280', text: '  // You\'ll learn this here 🚀' },
  { n: 8,  color: '#e2e8f0', text: '  return 0;' },
  { n: 9,  color: '#c084fc', text: '}' },
];

const INPUT_STYLE = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12,
  color: '#e2e8f0',
  outline: 'none',
  width: '100%',
  padding: '10px 12px 10px 36px',
  fontSize: 14,
};

function InputField({ icon, type, placeholder, value, onChange, right }) {
  return (
    <div style={{ position: 'relative' }}>
      <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#4b5563', pointerEvents: 'none' }}>
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        style={{ ...INPUT_STYLE, paddingRight: right ? 40 : 12 }}
      />
      {right && (
        <span style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#4b5563' }}>
          {right}
        </span>
      )}
    </div>
  );
}

export default function LoginPage() {
  const [tab,          setTab]          = useState('google'); // 'google' | 'email'
  const [mode,         setMode]         = useState('signin'); // 'signin' | 'signup'
  const [name,         setName]         = useState('');
  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [showPwd,      setShowPwd]      = useState(false);
  const [isLoggingIn,  setIsLoggingIn]  = useState(false);
  const [error,        setError]        = useState('');

  const clearForm = () => { setName(''); setEmail(''); setPassword(''); setError(''); };

  const handleGoogleLogin = async () => {
    try {
      setIsLoggingIn(true); setError('');
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') setError('Sign-in failed. Please try again.');
      setIsLoggingIn(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    if (mode === 'signup' && !name.trim()) { setError('Please enter your name.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }

    setIsLoggingIn(true); setError('');
    try {
      if (mode === 'signup') {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name.trim() });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      const msgs = {
        'auth/user-not-found':    'No account found with this email.',
        'auth/wrong-password':    'Incorrect password.',
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/invalid-email':     'Invalid email address.',
        'auth/invalid-credential': 'Invalid email or password.',
      };
      setError(msgs[err.code] || 'Something went wrong. Please try again.');
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: '#06080f' }}>

      {/* ── Left panel ── */}
      <div
        className="hidden lg:flex flex-col flex-1 relative overflow-y-auto overflow-x-hidden"
        style={{ background: 'linear-gradient(160deg, #0c0920 0%, #0f0b28 45%, #080d1a 100%)' }}
      >
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, #4f46e5 0%, transparent 65%)', transform: 'translate(-30%, -30%)' }} />
          <div className="absolute bottom-0 right-[35%] w-96 h-96 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 65%)', transform: 'translate(0%, 30%)' }} />
        </div>
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />

        <div className="relative flex flex-col min-h-full px-12 xl:px-16 py-10 xl:py-12" style={{ zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex flex-col items-start mb-10">
            <div className="relative mb-4">
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-60"
                style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', transform: 'scale(1.4)' }} />
              <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center font-black text-white text-2xl shadow-2xl"
                style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', border: '1px solid rgba(139,92,246,0.5)' }}>
                C+
              </div>
            </div>
            <h1 className="text-4xl xl:text-5xl font-black tracking-tight leading-none mb-1"
              style={{ background: 'linear-gradient(135deg, #ffffff 30%, #a78bfa 70%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              CppMaster
            </h1>
            <p className="text-sm font-medium" style={{ color: '#6366f1' }}>C++ &amp; DSA Learning Platform</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-lg mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Free to start · No credit card required
            </div>
            <h2 className="text-3xl xl:text-4xl font-black text-white leading-[1.15] mb-4">
              Go from{' '}
              <span style={{ background: 'linear-gradient(135deg,#818cf8,#c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>beginner</span>
              <br />to{' '}
              <span style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FAANG‑ready</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              C++ DSA, Embedded C &amp; DBMS — all in one platform. Interactive lessons, live compiler, algorithm visualizer, and daily challenges.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            className="flex items-center gap-0 mb-10 rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(99,102,241,0.15)', background: 'rgba(99,102,241,0.05)' }}>
            {STATS.map((s, i) => (
              <div key={i} className={`flex-1 py-4 px-5 text-center ${i < STATS.length - 1 ? 'border-r border-indigo-900/40' : ''}`}>
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-[11px] text-slate-500 mt-0.5 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </motion.div>

          <ul className="space-y-3 mb-10">
            {FEATURES.map((f, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(99,102,241,0.13)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}>
                  {f.icon}
                </div>
                {f.text}
              </motion.li>
            ))}
          </ul>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.5 }}
            className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(99,102,241,0.18)' }}>
            <div className="flex items-center gap-2 px-4 py-2.5"
              style={{ background: 'rgba(99,102,241,0.08)', borderBottom: '1px solid rgba(99,102,241,0.12)' }}>
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-slate-600 ml-2 font-mono">main.cpp</span>
            </div>
            <div className="p-5 font-mono text-xs leading-6" style={{ background: 'rgba(6,8,15,0.7)' }}>
              {CODE_LINES.map((line, i) => (
                <div key={i} className="flex gap-5">
                  <span className="select-none text-slate-700 w-3 text-right shrink-0">{line.text ? line.n : ''}</span>
                  <span style={{ color: line.color || '#e2e8f0' }}>{line.text || ' '}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div
        className="flex-1 lg:max-w-[420px] flex items-center justify-center p-6 relative overflow-y-auto"
        style={{ background: '#06080f', borderLeft: '1px solid rgba(99,102,241,0.08)' }}
      >
        <div className="lg:hidden absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(79,70,229,0.18) 0%, transparent 65%)' }} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
          className="w-full max-w-sm relative z-10">

          {/* Mobile brand */}
          <div className="lg:hidden flex flex-col items-center mb-10">
            <div className="relative mb-3">
              <div className="absolute inset-0 rounded-2xl blur-xl opacity-50"
                style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', transform: 'scale(1.5)' }} />
              <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white text-xl"
                style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>C+</div>
            </div>
            <h1 className="text-3xl font-black"
              style={{ background: 'linear-gradient(135deg,#fff,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              CppMaster
            </h1>
            <p className="text-xs mt-1" style={{ color: '#6366f1' }}>C++ &amp; DSA Platform</p>
          </div>

          {/* Card */}
          <div className="rounded-2xl p-8"
            style={{
              background: 'rgba(12,9,28,0.95)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(99,102,241,0.2)',
              boxShadow: '0 0 0 1px rgba(99,102,241,0.05), 0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(79,70,229,0.08)',
            }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-black text-white mb-1">
                {tab === 'email' && mode === 'signup' ? 'Create account' : 'Welcome back'}
              </h2>
              <p className="text-sm text-slate-500">
                {tab === 'email' && mode === 'signup' ? 'Start your C++ journey today.' : 'Sign in to continue your journey.'}
              </p>
            </div>

            {/* Tab switcher */}
            <div className="flex rounded-xl p-1 mb-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              {[{ id: 'google', label: 'Google' }, { id: 'email', label: 'Email' }].map(t => (
                <button key={t.id} onClick={() => { setTab(t.id); clearForm(); }}
                  className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
                  style={tab === t.id
                    ? { background: 'rgba(99,102,241,0.25)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' }
                    : { color: '#4b5563', background: 'transparent', border: '1px solid transparent' }
                  }>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 rounded-xl text-sm text-red-400 text-center"
                  style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {tab === 'google' ? (
                <motion.div key="google" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <motion.button
                    onClick={handleGoogleLogin}
                    disabled={isLoggingIn}
                    whileHover={{ scale: 1.015, boxShadow: '0 0 24px rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.985 }}
                    className="w-full flex items-center justify-center gap-3 rounded-xl py-3.5 font-bold text-sm text-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: '#ffffff', boxShadow: '0 2px 16px rgba(0,0,0,0.4)' }}
                  >
                    {isLoggingIn ? (
                      <><div className="w-5 h-5 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin" /> Signing in…</>
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
                </motion.div>
              ) : (
                <motion.form key="email" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onSubmit={handleEmailAuth} className="space-y-3">
                  <AnimatePresence>
                    {mode === 'signup' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        <InputField
                          icon={<User size={14} />}
                          type="text"
                          placeholder="Full name"
                          value={name}
                          onChange={e => setName(e.target.value)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <InputField
                    icon={<Mail size={14} />}
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <InputField
                    icon={<Lock size={14} />}
                    type={showPwd ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    right={
                      <span onClick={() => setShowPwd(p => !p)}>
                        {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                      </span>
                    }
                  />
                  <motion.button
                    type="submit"
                    disabled={isLoggingIn}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', boxShadow: '0 4px 20px rgba(79,70,229,0.35)' }}
                  >
                    {isLoggingIn
                      ? <span className="flex items-center justify-center gap-2"><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Please wait…</span>
                      : mode === 'signup' ? 'Create Account' : 'Sign In'
                    }
                  </motion.button>

                  <p className="text-center text-xs text-slate-600 pt-1">
                    {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                    <button type="button" onClick={() => { setMode(m => m === 'signin' ? 'signup' : 'signin'); setError(''); }}
                      className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                      {mode === 'signin' ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Divider + checklist */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <span className="text-[11px] text-slate-600 uppercase tracking-widest">included free</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>
            <ul className="space-y-2.5">
              {['C++ DSA · Embedded C · DBMS curriculum', 'Live in-browser compiler', 'Algorithm Visualizer + daily challenges', 'XP, streaks & achievements'].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs text-slate-400">
                  <CheckCircle2 size={13} className="text-indigo-400 shrink-0" />{item}
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-center text-[11px] text-slate-600">
                🔒 Secured · Synced via Firebase
              </p>
            </div>
          </div>

          <p className="text-center text-[11px] text-slate-700 mt-4">
            CppMaster v2.0 · Powered by Firebase
          </p>
        </motion.div>
      </div>
    </div>
  );
}
