import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Flame, Zap, BookOpen, Target, RefreshCw, ChevronRight, BarChart3 } from 'lucide-react';
import { LEVELS } from '../hooks/useProgress';
import { CURRICULUM, getAllLessons } from '../data/curriculum';

export default function DashboardPage({ progress, resetProgress }) {
  const navigate   = useNavigate();
  const allLessons = getAllLessons();
  const levelInfo  = LEVELS[progress.level - 1] || LEVELS[0];
  const nextLevel  = LEVELS[progress.level] || null;
  const pct        = nextLevel
    ? ((progress.xp - levelInfo.minXP) / (nextLevel.minXP - levelInfo.minXP)) * 100
    : 100;

  const totalCompleted = Object.keys(progress.completedLessons).length;

  const stats = [
    { icon: <Flame   size={18} className="text-orange-400" />,  label: 'Day Streak',    value: `${progress.streak}d`,  bg: 'rgba(251,146,60,0.1)',  border: 'rgba(251,146,60,0.2)' },
    { icon: <Zap     size={18} className="text-yellow-400" />,  label: 'Total XP',      value: progress.xp,            bg: 'rgba(234,179,8,0.1)',   border: 'rgba(234,179,8,0.2)' },
    { icon: <BookOpen size={18} className="text-indigo-400" />, label: 'Lessons Done',  value: totalCompleted,         bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.2)' },
    { icon: <Target  size={18} className="text-emerald-400" />, label: 'LeetCode Done', value: Object.keys(progress.completedLeetCode || {}).length, bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
  ];

  return (
    <div className="flex-1 overflow-y-auto overscroll-contain">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 size={20} className="text-indigo-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-white">My Dashboard</h1>
          </div>
          <p className="text-sm text-dark-400">Track your C++ mastery progress.</p>
        </motion.div>

        {/* Level hero card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl p-5 sm:p-6 mb-5"
          style={{
            background: `linear-gradient(135deg, ${levelInfo.color}18 0%, rgba(17,17,24,0.9) 100%)`,
            border: `1px solid ${levelInfo.color}35`,
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Level circle */}
            <div className="relative shrink-0">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                <motion.circle
                  cx="40" cy="40" r="34" fill="none"
                  stroke={levelInfo.color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - Math.min(pct, 100) / 100) }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-black" style={{ color: levelInfo.color }}>{progress.level}</span>
              </div>
            </div>

            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="text-xl sm:text-2xl font-black text-white mb-1">{levelInfo.title}</div>
              <div className="text-sm text-dark-400 mb-3">
                {progress.xp} XP total
                {nextLevel ? ` · ${nextLevel.minXP - progress.xp} XP to Level ${nextLevel.level}` : ' · Max level! 🎉'}
              </div>
              {/* XP bar */}
              <div className="h-2 bg-dark-600/60 rounded-full overflow-hidden w-full max-w-xs mx-auto sm:mx-0">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(pct, 100)}%` }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${levelInfo.color}, ${levelInfo.color}cc)` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="rounded-xl p-4 flex flex-col items-center gap-2 text-center"
              style={{ background: s.bg, border: `1px solid ${s.border}` }}
            >
              <div className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
                {s.icon}
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">{s.value}</div>
              <div className="text-xs text-dark-400 leading-tight">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Module progress */}
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <BookOpen size={16} className="text-indigo-400" /> Module Progress
        </h2>
        <div className="space-y-2.5 mb-7">
          {CURRICULUM.map((module, i) => {
            const total     = module.lessons.length;
            const completed = module.lessons.filter(l => progress.completedLessons[l.id]).length;
            const mpct      = total > 0 ? (completed / total) * 100 : 0;
            const firstUncompleted = module.lessons.find(l => !progress.completedLessons[l.id]);
            const isAllDone = completed === total;

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.04 }}
                className="flex items-center gap-3 rounded-xl p-4 cursor-pointer transition-all group active:scale-[0.99]"
                style={{
                  background: 'rgba(17,17,24,0.8)',
                  border: isAllDone ? `1px solid ${module.color}40` : '1px solid rgba(255,255,255,0.05)',
                }}
                onClick={() => navigate(`/lesson/${firstUncompleted?.id || module.lessons[0].id}`)}
              >
                <span className="text-xl shrink-0">{module.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-white text-sm truncate">{module.title}</span>
                    <span className="text-xs shrink-0 ml-2 font-bold" style={{ color: module.color }}>
                      {completed}/{total}
                    </span>
                  </div>
                  <div className="h-1.5 bg-dark-600/60 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${mpct}%` }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.05 }}
                      className="h-full rounded-full"
                      style={{ background: module.color }}
                    />
                  </div>
                </div>
                <ChevronRight
                  size={15}
                  className="shrink-0 text-dark-500 group-hover:text-dark-300 group-hover:translate-x-0.5 transition-all"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Level map */}
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Trophy size={16} className="text-yellow-400" /> Level Roadmap
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {LEVELS.map((lvl, i) => {
            const unlocked = progress.level >= lvl.level;
            return (
              <motion.div
                key={lvl.level}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: unlocked ? 1 : 0.35, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="rounded-xl p-4"
                style={{
                  background: unlocked ? `${lvl.color}12` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${unlocked ? lvl.color + '40' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                <div className="text-2xl font-black mb-1" style={{ color: unlocked ? lvl.color : '#4b5563' }}>
                  L{lvl.level}
                </div>
                <div className="text-sm font-semibold text-white mb-0.5">{lvl.title}</div>
                <div className="text-xs text-dark-400">{lvl.minXP}+ XP</div>
              </motion.div>
            );
          })}
        </div>

        {/* Danger zone */}
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}
        >
          <p className="text-xs text-red-400/70 mb-3 font-medium uppercase tracking-wide">Danger Zone</p>
          <button
            id="reset-progress-btn"
            onClick={() => { if (window.confirm('Reset ALL progress? This cannot be undone.')) resetProgress(); }}
            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 px-4 py-2 rounded-lg hover:bg-red-900/20 transition-all border border-red-800/50"
          >
            <RefreshCw size={14} /> Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );
}
