import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Flame, Zap, BookOpen, Target, RefreshCw, ChevronRight, BarChart3, Award, Download, Lock, Activity, Share2, Brain, StickyNote } from 'lucide-react';
import { downloadShareCard } from '../utils/shareCard';
import { LEVELS } from '../hooks/useProgress';
import { CURRICULUM, getAllLessons } from '../data/curriculum';
import { ACHIEVEMENTS, getEarnedAchievements } from '../config/achievements';
import { downloadCertificate } from '../utils/certificate';
import QuizModal from '../components/QuizModal';
import { QUIZZES } from '../data/quizzes';

// ─── Activity Calendar (90 days) ─────────────────────────────────────────────
function ActivityCalendar({ activityLog = {} }) {
  const COLS = 15; // 15 weeks
  const days = useMemo(() => {
    return Array.from({ length: COLS * 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (COLS * 7 - 1 - i));
      const key = d.toISOString().slice(0, 10);
      return { key, xp: activityLog[key] || 0, date: d };
    });
  }, [activityLog]);

  function intensity(xp) {
    if (xp === 0)  return 0;
    if (xp < 10)  return 1;
    if (xp < 20)  return 2;
    if (xp < 35)  return 3;
    return 4;
  }

  const COLORS = [
    'rgba(255,255,255,0.04)',
    'rgba(99,102,241,0.25)',
    'rgba(99,102,241,0.45)',
    'rgba(99,102,241,0.70)',
    '#6366f1',
  ];

  const DAY_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  // Show only Mon, Wed, Fri
  const SHOW_DAYS = [1, 3, 5];

  // Month labels — find first cell of each month
  const monthLabels = useMemo(() => {
    const seen = new Set();
    return days.filter((d, i) => {
      const m = d.date.toLocaleDateString('en-US', { month: 'short' });
      if (!seen.has(m) && i % 7 === 0) { seen.add(m); return true; }
      return false;
    }).map(d => ({
      label: d.date.toLocaleDateString('en-US', { month: 'short' }),
      col: Math.floor(days.indexOf(d) / 7),
    }));
  }, [days]);

  const totalXP = Object.values(activityLog).reduce((s, v) => s + v, 0);
  const activeDays = Object.keys(activityLog).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-2xl p-5 mb-5"
      style={{ background: 'rgba(17,17,24,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Activity size={15} className="text-indigo-400" /> Activity
        </h2>
        <div className="flex items-center gap-3 text-xs text-dark-400">
          <span>{activeDays} active days</span>
          <span>·</span>
          <span>{totalXP} XP logged</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 0 }}>
          {/* Month labels */}
          <div style={{ display: 'flex', marginLeft: 28, marginBottom: 4 }}>
            {Array.from({ length: COLS }, (_, col) => {
              const label = monthLabels.find(m => m.col === col);
              return (
                <div key={col} style={{ width: 13, marginRight: 2, fontSize: 9, color: '#6b7280', whiteSpace: 'nowrap' }}>
                  {label?.label || ''}
                </div>
              );
            })}
          </div>

          {/* Grid */}
          <div style={{ display: 'flex', gap: 0 }}>
            {/* Day labels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 4, paddingTop: 0 }}>
              {Array.from({ length: 7 }, (_, row) => (
                <div key={row} style={{ height: 11, fontSize: 9, color: '#6b7280', display: 'flex', alignItems: 'center' }}>
                  {SHOW_DAYS.includes(row) ? DAY_LABELS[row].slice(0, 3) : ''}
                </div>
              ))}
            </div>

            {/* Cells */}
            {Array.from({ length: COLS }, (_, col) => (
              <div key={col} style={{ display: 'flex', flexDirection: 'column', gap: 2, marginRight: 2 }}>
                {Array.from({ length: 7 }, (_, row) => {
                  const cell = days[col * 7 + row];
                  if (!cell) return <div key={row} style={{ width: 11, height: 11 }} />;
                  const level = intensity(cell.xp);
                  return (
                    <div
                      key={row}
                      title={`${cell.key}: ${cell.xp} XP`}
                      style={{
                        width: 11, height: 11,
                        borderRadius: 2,
                        background: COLORS[level],
                        cursor: cell.xp > 0 ? 'pointer' : 'default',
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-3 justify-end">
        <span className="text-[10px] text-dark-500">Less</span>
        {COLORS.map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
        ))}
        <span className="text-[10px] text-dark-500">More</span>
      </div>
    </motion.div>
  );
}

// ─── Weekly XP Bar Chart (last 14 days) ──────────────────────────────────────
function XPBarChart({ activityLog = {} }) {
  const bars = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (13 - i));
      const key = d.toISOString().slice(0, 10);
      return {
        key,
        xp: activityLog[key] || 0,
        label: d.toLocaleDateString('en-US', { weekday: 'short' }),
        isToday: i === 13,
      };
    });
  }, [activityLog]);

  const maxXP  = Math.max(...bars.map(b => b.xp), 1);
  const HEIGHT = 64;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 }}
      className="rounded-2xl p-5 mb-5"
      style={{ background: 'rgba(17,17,24,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <h2 className="text-base font-bold text-white flex items-center gap-2 mb-4">
        <BarChart3 size={15} className="text-indigo-400" /> XP Last 14 Days
      </h2>

      <div className="flex items-end gap-1.5" style={{ height: HEIGHT + 24 }}>
        {bars.map((bar, i) => {
          const h = bar.xp > 0 ? Math.max((bar.xp / maxXP) * HEIGHT, 6) : 2;
          return (
            <div key={bar.key} className="flex flex-col items-center flex-1 gap-1" style={{ height: HEIGHT + 24 }}>
              <div className="flex-1 flex items-end w-full">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: h }}
                  transition={{ duration: 0.6, delay: i * 0.03, ease: 'easeOut' }}
                  className="w-full rounded-t-md"
                  style={{
                    background: bar.xp > 0
                      ? bar.isToday
                        ? 'linear-gradient(180deg,#f59e0b,#f97316)'
                        : 'linear-gradient(180deg,#6366f1,#4f46e5)'
                      : 'rgba(255,255,255,0.04)',
                    minHeight: 2,
                  }}
                  title={`${bar.key}: ${bar.xp} XP`}
                />
              </div>
              <span className="text-[9px] text-dark-500 leading-none" style={{ color: bar.isToday ? '#f59e0b' : undefined }}>
                {bar.label.slice(0, 2)}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function DashboardPage({ progress, resetProgress, completeQuiz, currentUser }) {
  const navigate   = useNavigate();
  const [activeQuiz, setActiveQuiz] = useState(null); // { moduleId, moduleName, moduleColor, moduleIcon, questions }
  const allLessons = getAllLessons();
  const levelInfo  = LEVELS[progress.level - 1] || LEVELS[0];
  const nextLevel  = LEVELS[progress.level] || null;
  const pct        = nextLevel
    ? ((progress.xp - levelInfo.minXP) / (nextLevel.minXP - levelInfo.minXP)) * 100
    : 100;

  const totalCompleted  = Object.keys(progress.completedLessons).length;
  const totalLessons    = allLessons.length;
  const allDone         = totalCompleted >= totalLessons;
  const earnedBadges    = getEarnedAchievements(progress, totalLessons);
  const earnedIds       = new Set(earnedBadges.map(a => a.id));

  const modulesCompleted = CURRICULUM.filter(m =>
    m.lessons.every(l => progress.completedLessons[l.id])
  ).length;

  function handleShare() {
    downloadShareCard({
      userName:         currentUser?.displayName || 'Coder',
      photoURL:         currentUser?.photoURL || null,
      xp:               progress.xp,
      level:            progress.level,
      levelTitle:       levelInfo.title,
      streak:           progress.streak,
      lessonsCompleted: totalCompleted,
      totalLessons,
      modulesCompleted,
      totalModules:     CURRICULUM.length,
    });
  }

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
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 size={20} className="text-indigo-400" />
                <h1 className="text-2xl sm:text-3xl font-black text-white">My Dashboard</h1>
              </div>
              <p className="text-sm text-dark-400">Track your C++ mastery progress.</p>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: 'white', boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}
            >
              <Share2 size={14} /> Share Progress
            </button>
          </div>
        </motion.div>

        {/* Certificate banner — shown when all lessons complete */}
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.02 }}
            className="mb-5 rounded-2xl p-5 flex items-center gap-4"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(124,58,237,0.12) 100%)',
              border: '1px solid rgba(99,102,241,0.4)',
            }}
          >
            <div className="text-4xl shrink-0">🏆</div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white text-base">You've completed CppMaster!</p>
              <p className="text-sm text-indigo-300/80">Download your official certificate of completion.</p>
            </div>
            <button
              onClick={() => {
                const name = currentUser?.displayName || 'C++ Developer';
                const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                downloadCertificate(name, totalLessons, date);
              }}
              className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg,#6366f1,#7c3aed)' }}
            >
              <Download size={15} /> Download Certificate
            </button>
          </motion.div>
        )}

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

        {/* Activity charts */}
        <XPBarChart activityLog={progress.activityLog} />
        <ActivityCalendar activityLog={progress.activityLog} />

        {/* Module progress */}
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <BookOpen size={16} className="text-indigo-400" /> Module Progress
        </h2>
        <div className="space-y-2.5 mb-7">
          {CURRICULUM.map((module, i) => {
            const prevModule = CURRICULUM[i - 1];
            const showDivider =
              i === 0 ||
              (module.track === 'embedded' && prevModule?.track !== 'embedded') ||
              (module.track === 'dbms'     && prevModule?.track !== 'dbms');

            const total     = module.lessons.length;
            const completed = module.lessons.filter(l => progress.completedLessons[l.id]).length;
            const mpct      = total > 0 ? (completed / total) * 100 : 0;
            const firstUncompleted = module.lessons.find(l => !progress.completedLessons[l.id]);
            const isAllDone = completed === total;

            const quizKey   = module.id;
            const questions = QUIZZES[quizKey];
            const quizDone  = !!(progress.completedQuizzes || {})[quizKey];

            const trackLabel = module.track === 'embedded' ? 'Embedded C  ·  ECE / EEE'
                             : module.track === 'dbms'     ? 'DBMS'
                             : 'C++  ·  Data Structures';
            const trackColor = module.track === 'embedded' ? '#67e8f9'
                             : module.track === 'dbms'     ? '#c4b5fd'
                             : '#818cf8';
            const trackBg    = module.track === 'embedded' ? 'rgba(34,211,238,0.06)'
                             : module.track === 'dbms'     ? 'rgba(167,139,250,0.06)'
                             : 'rgba(99,102,241,0.06)';
            const trackBdr   = module.track === 'embedded' ? 'rgba(34,211,238,0.18)'
                             : module.track === 'dbms'     ? 'rgba(167,139,250,0.18)'
                             : 'rgba(99,102,241,0.18)';

            return (
              <React.Fragment key={module.id}>
                {showDivider && (
                  <div
                    className="flex items-center gap-3 px-3 py-2 rounded-lg"
                    style={{ background: trackBg, border: `1px solid ${trackBdr}`, marginBottom: 2 }}
                  >
                    <div className="flex-1 h-px" style={{ background: trackBdr }} />
                    <span className="text-[10px] font-bold tracking-widest uppercase shrink-0" style={{ color: trackColor }}>
                      {trackLabel}
                    </span>
                    <div className="flex-1 h-px" style={{ background: trackBdr }} />
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.04 }}
                  className="flex items-center gap-3 rounded-xl p-4 transition-all group"
                  style={{
                    background: 'rgba(17,17,24,0.8)',
                    border: isAllDone ? `1px solid ${module.color}40` : '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <span
                    className="text-xl shrink-0 cursor-pointer"
                    onClick={() => navigate(`/lesson/${firstUncompleted?.id || module.lessons[0].id}`)}
                  >
                    {module.icon}
                  </span>
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => navigate(`/lesson/${firstUncompleted?.id || module.lessons[0].id}`)}
                  >
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
                  {isAllDone && questions ? (
                    <button
                      onClick={e => { e.stopPropagation(); setActiveQuiz({ moduleId: quizKey, moduleName: module.title, moduleColor: module.color, moduleIcon: module.icon, questions }); }}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:opacity-90 active:scale-95"
                      style={{
                        background: quizDone ? 'rgba(52,211,153,0.1)' : 'rgba(99,102,241,0.15)',
                        border:     quizDone ? '1px solid rgba(52,211,153,0.3)' : '1px solid rgba(99,102,241,0.3)',
                        color:      quizDone ? '#34d399' : '#a5b4fc',
                      }}
                      title={quizDone ? `Quiz done — best: ${(progress.completedQuizzes || {})[quizKey]?.score}/5` : 'Take the module quiz'}
                    >
                      <Brain size={12} />
                      {quizDone ? 'Retake' : 'Quiz'}
                    </button>
                  ) : (
                    <ChevronRight
                      size={15}
                      className="shrink-0 text-dark-500 group-hover:text-dark-300 group-hover:translate-x-0.5 transition-all cursor-pointer"
                      onClick={() => navigate(`/lesson/${firstUncompleted?.id || module.lessons[0].id}`)}
                    />
                  )}
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Achievements */}
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Award size={16} className="text-yellow-400" /> Achievements
          <span className="ml-auto text-xs font-normal text-dark-400">{earnedBadges.length}/{ACHIEVEMENTS.length} earned</span>
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-7">
          {ACHIEVEMENTS.map((ach, i) => {
            const earned = earnedIds.has(ach.id);
            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: earned ? 1 : 0.4, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.04 }}
                title={ach.desc}
                className="rounded-xl p-3 flex flex-col items-center gap-1.5 text-center relative overflow-hidden"
                style={{
                  background: earned
                    ? 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(124,58,237,0.08))'
                    : 'rgba(255,255,255,0.02)',
                  border: earned
                    ? '1px solid rgba(99,102,241,0.35)'
                    : '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {earned && (
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{ background: 'radial-gradient(circle at 50% 0%, #6366f1, transparent 70%)' }}
                  />
                )}
                <span className="text-2xl relative">{earned ? ach.icon : <Lock size={18} className="text-dark-500" />}</span>
                <span className="text-xs font-semibold text-white leading-tight relative">{ach.name}</span>
                <span className="text-[10px] text-dark-400 leading-tight relative">{ach.desc}</span>
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

        {/* My Notes */}
        {(() => {
          const allNotes = allLessons
            .filter(l => (progress.notes?.[l.id] || []).length > 0)
            .map(l => {
              const mod = CURRICULUM.find(m => m.lessons.some(ml => ml.id === l.id));
              return { lesson: l, mod, notes: progress.notes[l.id] };
            });

          if (allNotes.length === 0) return null;

          return (
            <>
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <StickyNote size={16} className="text-indigo-400" /> My Notes
                <span className="ml-auto text-xs font-normal text-dark-400">
                  {allNotes.reduce((s, e) => s + e.notes.length, 0)} notes across {allNotes.length} lesson{allNotes.length !== 1 ? 's' : ''}
                </span>
              </h2>
              <div className="space-y-2.5 mb-7">
                {allNotes.map(({ lesson: l, mod, notes }) => (
                  <motion.div
                    key={l.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="rounded-xl p-4 cursor-pointer transition-all hover:border-indigo-500/30"
                    style={{ background: 'rgba(17,17,24,0.8)', border: '1px solid rgba(255,255,255,0.05)' }}
                    onClick={() => navigate(`/lesson/${l.id}`)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">{mod?.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{l.title}</p>
                        <p className="text-xs text-dark-500">{mod?.title} · {notes.length} note{notes.length !== 1 ? 's' : ''}</p>
                      </div>
                      <ChevronRight size={13} className="text-dark-600 shrink-0" />
                    </div>
                    <p className="text-xs text-dark-400 line-clamp-2 leading-relaxed pl-6">
                      {notes[0].text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </>
          );
        })()}

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

      {/* Quiz Modal */}
      <AnimatePresence>
        {activeQuiz && (
          <QuizModal
            {...activeQuiz}
            alreadyDone={!!(progress.completedQuizzes || {})[activeQuiz.moduleId]}
            onClose={() => setActiveQuiz(null)}
            onComplete={(score) => {
              completeQuiz(activeQuiz.moduleId, score);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
