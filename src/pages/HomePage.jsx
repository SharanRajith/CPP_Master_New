import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Trophy, Flame, BookOpen, ArrowRight, Star, Zap, Code2 } from 'lucide-react';
import { CURRICULUM, getAllLessons } from '../data/curriculum';
import { LEVELS } from '../hooks/useProgress';

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

export default function HomePage({ progress }) {
  const navigate = useNavigate();
  const allLessons = getAllLessons();
  const totalCompleted = Object.keys(progress.completedLessons).length;
  const totalLessons   = allLessons.length;
  const levelInfo      = LEVELS[progress.level - 1] || LEVELS[0];
  const nextLevel      = LEVELS[progress.level] || null;
  const pct            = nextLevel
    ? ((progress.xp - levelInfo.minXP) / (nextLevel.minXP - levelInfo.minXP)) * 100
    : 100;

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

      {/* Curriculum Grid */}
      <div className="px-4 sm:px-8 py-8">
        <h2 className="text-2xl font-bold text-white mb-2">Curriculum</h2>
        <p className="text-dark-300 mb-6">12 modules, 100+ lessons. Complete each module to unlock the next.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CURRICULUM.map((module, i) => (
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
    </div></div>
  );
}
