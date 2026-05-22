import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Trophy, Flame, BookOpen, ArrowRight, Star, Zap, Code2, ChevronRight, CalendarDays, CheckCircle2, Swords, Crown } from 'lucide-react';
import { CURRICULUM, getAllLessons } from '../data/curriculum';
import { LEVELS } from '../hooks/useProgress';

// ─── Daily Challenge ──────────────────────────────────────────────────────────
const DIFFICULTY = {
  'm13-l1': 'Easy', 'm13-l2': 'Easy', 'm13-l3': 'Medium', 'm13-l4': 'Medium',
  'm13-l5': 'Medium', 'm13-l6': 'Medium', 'm13-l7': 'Hard', 'm13-l8': 'Hard',
  'm13-l9': 'Hard', 'm13-l10': 'Hard', 'm13-l11': 'Hard', 'm13-l12': 'Hard',
  'm13-l13': 'Hard', 'm13-l14': 'Hard', 'm13-l15': 'Hard',
};
const DIFF_COLOR = { Easy: '#34d399', Medium: '#f59e0b', Hard: '#f87171' };

function getDailyChallenge() {
  const allLessons = getAllLessons();
  const faang = allLessons.filter(l => l.id.startsWith('m13-'));
  if (!faang.length) return null;
  const dayIndex = Math.floor(Date.now() / 86_400_000);
  return faang[dayIndex % faang.length];
}

function DailyChallenge({ progress }) {
  const navigate   = useNavigate();
  const challenge  = getDailyChallenge();
  if (!challenge) return null;

  const solved     = !!progress.completedLessons[challenge.id];
  const diff       = DIFFICULTY[challenge.id] || 'Medium';
  const diffColor  = DIFF_COLOR[diff];
  const today      = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 }}
      className="mx-4 sm:mx-8 mt-5 rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(251,146,60,0.3)' }}
    >
      {/* Header strip */}
      <div
        className="flex items-center gap-2 px-4 py-2"
        style={{ background: 'linear-gradient(90deg, rgba(251,146,60,0.15), rgba(239,68,68,0.08))' }}
      >
        <Swords size={13} className="text-orange-400" />
        <span className="text-xs font-bold text-orange-300 tracking-wide uppercase">Daily Challenge</span>
        <span className="ml-auto flex items-center gap-1 text-xs text-dark-400">
          <CalendarDays size={11} /> {today}
        </span>
      </div>

      {/* Body */}
      <div
        className="flex items-center gap-4 px-4 py-3 cursor-pointer group"
        style={{ background: 'rgba(251,146,60,0.04)' }}
        onClick={() => navigate(`/lesson/${challenge.id}`)}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
          style={{ background: 'rgba(251,146,60,0.12)', border: '1px solid rgba(251,146,60,0.25)' }}
        >
          {solved ? '✅' : '⚔️'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded"
              style={{ background: `${diffColor}18`, color: diffColor, border: `1px solid ${diffColor}30` }}
            >
              {diff}
            </span>
            {solved && (
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                <CheckCircle2 size={10} /> Solved
              </span>
            )}
          </div>
          <p className="text-sm font-bold text-white truncate">{challenge.title}</p>
        </div>

        <div
          className="shrink-0 flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all group-hover:opacity-90"
          style={solved
            ? { background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.2)' }
            : { background: 'linear-gradient(135deg,#f97316,#ef4444)', color: 'white' }
          }
        >
          {solved ? 'Review' : 'Solve'} <ChevronRight size={12} />
        </div>
      </div>
    </motion.div>
  );
}

function ModuleCard({ module, progress, onStart }) {
  const total     = module.lessons.length;
  const completed = module.lessons.filter(l => progress.completedLessons[l.id]).length;
  const pct       = (completed / total) * 100;
  const firstLesson = module.lessons[0];
  const firstUncompleted = module.lessons.find(l => !progress.completedLessons[l.id]);
  const isAllDone = completed === total;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="glass rounded-2xl p-6 flex flex-col gap-4 cursor-pointer group transition-all"
      style={{ borderColor: `${module.color}30` }}
      onClick={() => onStart(firstUncompleted?.id || firstLesson.id)}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
          style={{ background: `${module.color}20`, border: `1px solid ${module.color}40` }}
        >
          {module.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: `${module.color}20`, color: module.color }}>
              {module.level}
            </span>
            {isAllDone && <span className="text-xs text-success">✅ Complete</span>}
          </div>
          <h3 className="font-bold text-white text-base">{module.title}</h3>
          <p className="text-sm text-dark-300 mt-0.5">{total} lessons</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs text-dark-300 mb-1.5">
          <span>Progress</span>
          <span style={{ color: module.color }}>{completed}/{total}</span>
        </div>
        <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: module.color }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-dark-300">{Math.round(pct)}% complete</span>
        <div className="flex items-center gap-1 text-sm font-medium group-hover:translate-x-1 transition-transform"
          style={{ color: module.color }}>
          {isAllDone ? 'Review' : completed === 0 ? 'Start' : 'Continue'}
          <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
}

export default function HomePage({ progress, onOpenPremium }) {
  const navigate = useNavigate();
  const allLessons = getAllLessons();
  const totalCompleted = Object.keys(progress.completedLessons).length;
  const levelInfo      = LEVELS[progress.level - 1] || LEVELS[0];

  // Find first uncompleted lesson
  const firstUncompleted = allLessons.find(l => !progress.completedLessons[l.id]);

  function handleStart() {
    navigate(`/lesson/${firstUncompleted?.id || 'm1-l1'}`);
  }

  return (
    <div className="flex-1 overflow-y-auto overscroll-contain"><div className="pb-8">
      {/* Hero */}
      <div
        className="relative overflow-hidden px-4 sm:px-8 py-10 sm:py-16 text-center"
        style={{
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0a0a0f 100%)',
        }}
      >
        {/* Glow circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle at center, #6366f1, transparent)' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-brand-900/50 border border-brand-700/50 px-4 py-1.5 rounded-full text-sm text-brand-300 mb-6">
            <Code2 size={14} />
            C++ DSA Learning Platform
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight">
            <span className="gradient-text">Master C++&nbsp;&amp;</span>
            <br className="hidden sm:block" />
            <span className="text-white"> Data Structures</span>
          </h1>
          <p className="text-dark-300 text-lg max-w-xl mx-auto mb-8">
            From absolute beginner to <strong className="text-brand-300">FAANG-interview-ready</strong>.
            Interactive lessons, in-browser C++ compilation, real LeetCode problems.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={handleStart} className="btn-primary text-base px-8 py-3">
              <Play size={18} />
              {totalCompleted > 0 ? 'Continue Learning' : 'Start Learning'}
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-8 py-3 rounded-xl border border-dark-500 text-dark-200 hover:text-white hover:border-dark-400 transition-all text-base"
            >
              <Trophy size={18} />
              My Progress
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 px-4 sm:px-8 py-4 sm:py-6 border-b border-dark-600">
        {[
          { icon: <BookOpen size={18} className="text-brand-400" />, label: 'Lessons Done',   value: totalCompleted },
          { icon: <Zap size={18} className="text-yellow-400" />,     label: 'Total XP',       value: `${progress.xp} XP` },
          { icon: <Flame size={18} className="text-orange-400" />,   label: 'Day Streak',     value: progress.streak },
          { icon: <Star size={18} className="text-purple-400" />,    label: 'Level',          value: `${levelInfo.title}` },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 bg-dark-800 rounded-xl p-4 border border-dark-600"
          >
            <div className="p-2 rounded-lg bg-dark-700">{stat.icon}</div>
            <div>
              <div className="text-lg font-bold text-white">{stat.value}</div>
              <div className="text-xs text-dark-300">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Continue Learning Card */}
      {totalCompleted > 0 && firstUncompleted && (() => {
        const mod = CURRICULUM.find(m => m.lessons.some(l => l.id === firstUncompleted.id));
        const lessonIdx = mod?.lessons.findIndex(l => l.id === firstUncompleted.id) ?? 0;
        if (!mod) return null;
        return (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-4 sm:mx-8 mt-6 rounded-2xl p-4 sm:p-5 flex items-center gap-4 cursor-pointer group"
            style={{
              background: `linear-gradient(135deg, ${mod.color}14 0%, rgba(17,17,24,0.9) 100%)`,
              border: `1px solid ${mod.color}35`,
            }}
            onClick={() => navigate(`/lesson/${firstUncompleted.id}`)}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{ background: `${mod.color}22`, border: `1px solid ${mod.color}40` }}
            >
              {mod.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold mb-0.5" style={{ color: mod.color }}>
                Continue — {mod.title}
              </p>
              <p className="text-sm font-bold text-white truncate">
                Lesson {lessonIdx + 1}: {firstUncompleted.title}
              </p>
            </div>
            <ChevronRight
              size={18}
              className="shrink-0 text-dark-400 group-hover:translate-x-1 transition-transform"
              style={{ color: mod.color }}
            />
          </motion.div>
        );
      })()}

      {/* Daily Challenge */}
      <DailyChallenge progress={progress} />

      {/* Curriculum Grid */}
      <div className="px-4 sm:px-8 py-8">
        {/* ── C++ & DSA track ───────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold text-white">C++ &amp; Data Structures</h2>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.25)' }}>
            CS Track
          </span>
        </div>
        <p className="text-dark-300 mb-6">Core algorithms &amp; data structures — from basics to FAANG interviews.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {CURRICULUM.filter(m => !m.track || m.track === 'cs').map((module, i) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ModuleCard
                module={module}
                progress={progress}
                onStart={id => navigate(`/lesson/${id}`)}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Embedded C track ──────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold text-white">Embedded C</h2>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ background: 'rgba(34,211,238,0.12)', color: '#67e8f9', border: '1px solid rgba(34,211,238,0.25)' }}>
            ECE / EEE Track
          </span>
        </div>
        <p className="text-dark-300 mb-6">Firmware fundamentals for microcontrollers — free, no extra compiler needed.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {CURRICULUM.filter(m => m.track === 'embedded').map((module, i) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ModuleCard
                module={module}
                progress={progress}
                onStart={id => navigate(`/lesson/${id}`)}
              />
            </motion.div>
          ))}
        </div>

        {/* ── DBMS track ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-bold text-white">Database Management</h2>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ background: 'rgba(167,139,250,0.12)', color: '#c4b5fd', border: '1px solid rgba(167,139,250,0.25)' }}>
            DBMS Track
          </span>
        </div>
        <p className="text-dark-300 mb-6">SQL, normalization, transactions &amp; indexing — runs entirely in your browser.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CURRICULUM.filter(m => m.track === 'dbms').map((module, i) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ModuleCard
                module={module}
                progress={progress}
                onStart={id => navigate(`/lesson/${id}`)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Premium banner */}
      <div className="px-4 sm:px-8 pb-10">
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={onOpenPremium}
          className="w-full rounded-2xl px-5 py-4 flex items-center gap-4 group transition-all hover:scale-[1.01] active:scale-[0.99]"
          style={{
            background: 'linear-gradient(135deg, rgba(30,18,0,0.9), rgba(15,9,0,0.95))',
            border: '1px solid rgba(245,158,11,0.3)',
            boxShadow: '0 0 30px rgba(245,158,11,0.06)',
          }}
        >
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)' }}>
            <Crown size={18} className="text-white" />
          </div>

          {/* Text */}
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-bold text-white">Unlock Premium — Go FAANG-Ready</p>
            <p className="text-xs text-yellow-700 mt-0.5 truncate">
              7 advanced modules · FAANG problem bank · completion certificate
            </p>
          </div>

          {/* CTA */}
          <div className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all group-hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)' }}>
            See what's included
            <ChevronRight size={13} />
          </div>
        </motion.button>
      </div>

    </div></div>
  );
}
