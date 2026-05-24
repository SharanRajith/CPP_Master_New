import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Zap, BookOpen, Lock, Play, ChevronRight, X, Terminal, Trophy, GitBranch, Swords, MessageCircle, StickyNote, Medal, Award, CalendarDays, Database, Cpu } from 'lucide-react';

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
    title: '3 Tracks. 200+ Lessons.',
    body: 'Choose your path — DSA in C++, Embedded C, or DBMS. Each track has its own structured curriculum from beginner to interview-ready.',
    visual: (
      <div className="space-y-2">
        {[
          { icon: <BookOpen size={14} />, name: 'DSA & C++',    sub: '13 modules · Arrays → DP → Graphs', color: '#6366f1', bg: 'rgba(99,102,241,0.1)'   },
          { icon: <Cpu       size={14} />, name: 'Embedded C',  sub: '4 modules · Peripherals · Protocols', color: '#22d3ee', bg: 'rgba(34,211,238,0.1)'  },
          { icon: <Database  size={14} />, name: 'DBMS & SQL',  sub: '5 modules · Normalization · Indexing', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{ background: t.bg, border: `1px solid ${t.color}30` }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${t.color}20`, color: t.color }}>
              {t.icon}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white leading-none">{t.name}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{t.sub}</p>
            </div>
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
    body: 'Every lesson has a real C++ compiler built in — nothing to install. Write code, hit Ctrl+Enter, and see your output instantly.',
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
  {
    icon: <CalendarDays size={28} className="text-rose-400" />,
    iconBg: 'rgba(251,113,133,0.1)',
    iconBorder: 'rgba(251,113,133,0.25)',
    accent: '#fb7185',
    title: 'Daily Challenge. Every Day.',
    body: 'A fresh coding challenge drops every day. Solve it to earn bonus XP and keep your streak alive. Miss a day and it resets.',
    visual: (
      <div className="rounded-xl p-4" style={{ background: 'rgba(251,113,133,0.06)', border: '1px solid rgba(251,113,133,0.2)' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-wide">Today's Challenge</span>
          <span className="text-xs text-slate-500">+50 XP bonus</span>
        </div>
        <p className="text-sm font-semibold text-white mb-1">Two Sum — Find indices</p>
        <p className="text-xs text-slate-400 mb-3">Given an array of integers, return indices of the two numbers such that they add up to target.</p>
        <div className="flex gap-2">
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399', border: '1px solid rgba(52,211,153,0.2)' }}>Easy</span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}>HashMap</span>
        </div>
      </div>
    ),
  },
  {
    icon: <GitBranch size={28} className="text-cyan-400" />,
    iconBg: 'rgba(34,211,238,0.1)',
    iconBorder: 'rgba(34,211,238,0.25)',
    accent: '#22d3ee',
    title: 'Visualize. Practice. Interview.',
    body: 'Three extra tools to sharpen your skills — find them in the Explore menu (compass icon) in the navbar.',
    visual: (
      <div className="space-y-2">
        {[
          { icon: <GitBranch size={14} className="text-indigo-400" />, name: 'Algorithm Visualizer', sub: 'See sorting, trees & graphs animate live' },
          { icon: <BookOpen  size={14} className="text-emerald-400" />, name: 'FAANG Problems',       sub: '15 company-tagged problem sets' },
          { icon: <Swords    size={14} className="text-yellow-400" />,  name: 'Mock Interview',        sub: '10 timed questions — simulate a real interview' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {item.icon}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white leading-none">{item.name}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: <MessageCircle size={28} className="text-violet-400" />,
    iconBg: 'rgba(167,139,250,0.1)',
    iconBorder: 'rgba(167,139,250,0.25)',
    accent: '#a78bfa',
    title: 'Ask Questions. Take Notes.',
    body: 'Stuck on a lesson? Drop a comment and get a reply. Use the Notes tab to save your own insights right inside the lesson.',
    visual: (
      <div className="space-y-2">
        <div className="flex gap-3 p-3 rounded-xl" style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.15)' }}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shrink-0">A</div>
          <div>
            <p className="text-xs font-semibold text-white">You</p>
            <p className="text-xs text-slate-400 mt-0.5">Why does the two-pointer approach work here?</p>
          </div>
        </div>
        <div className="flex gap-3 p-3 rounded-xl" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-xs font-bold text-white shrink-0">M</div>
          <div>
            <p className="text-xs font-semibold text-white flex items-center gap-1.5">
              Admin
              <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' }}>Admin</span>
            </p>
            <p className="text-xs text-slate-400 mt-0.5">Because the array is sorted — we can move pointers inward based on the sum!</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: <Award size={28} className="text-yellow-400" />,
    iconBg: 'rgba(234,179,8,0.12)',
    iconBorder: 'rgba(234,179,8,0.25)',
    accent: '#f59e0b',
    title: 'Compete. Certify. Conquer.',
    body: 'Climb the leaderboard, earn achievement badges for milestones, and get a certificate when you complete a full track.',
    visual: (
      <div className="flex items-center justify-center gap-5 py-2">
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.25)' }}>
            <Medal size={22} className="text-yellow-400" />
          </div>
          <span className="text-xs text-slate-400">Leaderboard</span>
          <span className="text-[10px] text-slate-600">top rankers</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.25)' }}>
            <Award size={22} className="text-rose-400" />
          </div>
          <span className="text-xs text-slate-400">Badges</span>
          <span className="text-[10px] text-slate-600">achievements</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)' }}>
            <Trophy size={22} className="text-emerald-400" />
          </div>
          <span className="text-xs text-slate-400">Certificate</span>
          <span className="text-[10px] text-slate-600">on completion</span>
        </div>
      </div>
    ),
  },
];

const ONBOARDING_KEY = 'cpp_onboarded_v3';

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
