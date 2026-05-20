import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Zap, BookOpen, Lock, Play, ChevronRight, X, Terminal, Trophy } from 'lucide-react';

const STEPS = [
  {
    icon: <Zap size={28} className="text-yellow-400" />,
    iconBg: 'rgba(234,179,8,0.12)',
    iconBorder: 'rgba(234,179,8,0.25)',
    accent: '#f59e0b',
    title: 'Earn XP. Level Up. Build Streaks.',
    body: 'Every lesson you complete earns XP, pushes you up the leaderboard, and grows your streak. Come back daily to keep it alive.',
    visual: (
      <div className="flex items-center justify-center gap-6 py-2">
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}>
            <Zap size={22} className="text-indigo-400" />
          </div>
          <span className="text-xs text-slate-400">+30 XP</span>
          <span className="text-[10px] text-slate-600">per lesson</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(251,146,60,0.12)', border: '1px solid rgba(251,146,60,0.25)' }}>
            <Flame size={22} className="text-orange-400" />
          </div>
          <span className="text-xs text-slate-400">Streak</span>
          <span className="text-[10px] text-slate-600">daily goal</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.25)' }}>
            <Trophy size={22} className="text-purple-400" />
          </div>
          <span className="text-xs text-slate-400">Level Up</span>
          <span className="text-[10px] text-slate-600">rank higher</span>
        </div>
      </div>
    ),
  },
  {
    icon: <BookOpen size={28} className="text-indigo-400" />,
    iconBg: 'rgba(99,102,241,0.12)',
    iconBorder: 'rgba(99,102,241,0.25)',
    accent: '#6366f1',
    title: '13 Modules. 120+ Lessons.',
    body: 'Work through the curriculum in order — complete a module to unlock the next. Advanced topics like Graphs and DP are waiting at the end.',
    visual: (
      <div className="space-y-2">
        {[
          { name: 'C++ Fundamentals', done: true,  color: '#34d399' },
          { name: 'OOP in C++',       done: false, color: '#6366f1' },
          { name: 'Graphs & BFS/DFS', done: false, color: '#a78bfa', locked: true },
        ].map((m, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: m.color }} />
            <span className="text-sm text-slate-300 flex-1">{m.name}</span>
            {m.done && <span className="text-xs text-emerald-400">✓ Done</span>}
            {m.locked && <Lock size={12} className="text-slate-600" />}
            {!m.done && !m.locked && (
              <div className="h-1 w-16 rounded-full bg-dark-600">
                <div className="h-1 rounded-full bg-indigo-500" style={{ width: '0%' }} />
              </div>
            )}
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: <Terminal size={28} className="text-green-400" />,
    iconBg: 'rgba(52,211,153,0.1)',
    iconBorder: 'rgba(52,211,153,0.25)',
    accent: '#34d399',
    title: 'Code. Run. Learn Instantly.',
    body: 'Every lesson has a real C++ compiler built in — nothing to install. Write code, hit the shortcut, and see your output instantly.',
    visual: (
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(99,102,241,0.2)' }}>
        <div className="flex items-center gap-2 px-4 py-2" style={{ background: 'rgba(99,102,241,0.08)', borderBottom: '1px solid rgba(99,102,241,0.12)' }}>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs text-slate-600 font-mono ml-1">main.cpp</span>
          <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
            <Play size={9} /> Run
            <span className="text-[9px] text-indigo-300 ml-1">Ctrl+Enter</span>
          </div>
        </div>
        <div className="px-4 py-3 font-mono text-xs leading-5" style={{ background: 'rgba(6,8,15,0.8)' }}>
          <div><span className="text-orange-400">#include</span> <span className="text-slate-400">&lt;iostream&gt;</span></div>
          <div className="text-slate-500">&nbsp;</div>
          <div><span className="text-purple-400">int</span> <span className="text-blue-400">main</span><span className="text-slate-300">() {'{'}</span></div>
          <div><span className="text-slate-300">&nbsp;&nbsp;cout &lt;&lt; </span><span className="text-green-400">"Hello, World!"</span><span className="text-slate-300">;</span></div>
          <div><span className="text-slate-300">{'}'}</span></div>
        </div>
      </div>
    ),
  },
];

const ONBOARDING_KEY = 'cpp_onboarded_v1';

export function shouldShowOnboarding() {
  return !localStorage.getItem(ONBOARDING_KEY);
}

export function markOnboardingDone() {
  localStorage.setItem(ONBOARDING_KEY, '1');
}

export default function OnboardingModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [dir, setDir]   = useState(1);
  const current = STEPS[step];

  function go(next) {
    setDir(next > step ? 1 : -1);
    setStep(next);
  }

  function finish() {
    markOnboardingDone();
    onClose();
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden relative"
        style={{
          background: 'linear-gradient(160deg, #0d0b1f 0%, #0a0818 100%)',
          border: '1px solid rgba(99,102,241,0.2)',
          boxShadow: '0 -4px 60px rgba(79,70,229,0.1), 0 0 0 1px rgba(99,102,241,0.07)',
        }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      >
        {/* Skip */}
        <button
          onClick={finish}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-slate-600 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        {/* Step dots */}
        <div className="flex justify-center gap-1.5 pt-5 pb-1">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === step ? 20 : 6,
                background: i === step ? current.accent : 'rgba(255,255,255,0.12)',
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="px-7 pt-5 pb-7">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -dir * 40 }}
              transition={{ duration: 0.22 }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-5">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: current.iconBg, border: `1px solid ${current.iconBorder}` }}
                >
                  {current.icon}
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-black text-white text-center mb-2">{current.title}</h2>
              <p className="text-sm text-slate-400 text-center leading-relaxed mb-6">{current.body}</p>

              {/* Visual */}
              <div className="mb-6">{current.visual}</div>
            </motion.div>
          </AnimatePresence>

          {/* Buttons */}
          <div className="flex gap-3">
            {step > 0 && (
              <button
                onClick={() => go(step - 1)}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-slate-400 border border-dark-600 hover:text-white hover:border-dark-500 transition-all"
              >
                Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => go(step + 1)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${current.accent}, ${current.accent}cc)` }}
              >
                Next <ChevronRight size={15} />
              </button>
            ) : (
              <button
                onClick={finish}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}
              >
                Let's go! <ChevronRight size={15} />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
