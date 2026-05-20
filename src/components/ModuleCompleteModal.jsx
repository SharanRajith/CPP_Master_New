import { useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Zap, ArrowRight, Home, Star, CheckCircle2 } from 'lucide-react';
import { CURRICULUM } from '../data/curriculum';

// ─── Confetti ────────────────────────────────────────────────────────────────
const COLORS = ['#6366f1','#a78bfa','#f59e0b','#f97316','#34d399','#f472b6','#60a5fa','#fbbf24'];

function Confetti() {
  const pieces = useMemo(() => (
    Array.from({ length: 48 }, (_, i) => ({
      id:       i,
      color:    COLORS[i % COLORS.length],
      x:        Math.random() * 100,           // % across screen
      size:     6 + Math.random() * 8,
      delay:    Math.random() * 0.8,
      duration: 1.8 + Math.random() * 1.4,
      rotate:   Math.random() * 720 - 360,
      drift:    (Math.random() - 0.5) * 120,   // px horizontal drift
      shape:    i % 3,                          // 0=square, 1=circle, 2=rect
    }))
  ), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0, scale: 1 }}
          animate={{ y: '105vh', x: `calc(${p.x}vw + ${p.drift}px)`, opacity: 0, rotate: p.rotate, scale: 0.5 }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
          style={{
            position: 'absolute',
            top: 0,
            width:  p.shape === 2 ? p.size * 2 : p.size,
            height: p.size,
            borderRadius: p.shape === 1 ? '50%' : 2,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export default function ModuleCompleteModal({ moduleId, completedLessons, onClose }) {
  const navigate = useNavigate();

  const mod = CURRICULUM.find(m => m.id === moduleId);
  const modIndex = CURRICULUM.findIndex(m => m.id === moduleId);
  const nextMod  = CURRICULUM[modIndex + 1] ?? null;

  const totalXP = useMemo(() => {
    if (!mod) return 0;
    return mod.lessons.reduce((sum, l) => {
      // Each lesson awards its xpReward; we don't know exact per-lesson here
      // so approximate with 10 * lessonCount (actual XP was tracked on completion)
      return sum + 10;
    }, 0);
  }, [mod]);

  // Close on Escape
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  if (!mod) return null;

  return (
    <>
      <Confetti />

      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-md rounded-3xl overflow-hidden relative"
          style={{
            background: 'linear-gradient(160deg, #0d0b1f 0%, #0a0818 100%)',
            border: '1px solid rgba(99,102,241,0.3)',
            boxShadow: '0 0 0 1px rgba(99,102,241,0.08), 0 40px 80px rgba(0,0,0,0.7), 0 0 80px rgba(79,70,229,0.15)',
          }}
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Glow top */}
          <div className="absolute inset-x-0 top-0 h-48 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% -20%, ${mod.color}25, transparent 70%)` }} />

          <div className="relative px-8 pt-10 pb-8 text-center">
            {/* Big module icon */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
              className="flex justify-center mb-4"
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-2xl"
                style={{ background: `${mod.color}22`, border: `2px solid ${mod.color}50` }}
              >
                {mod.icon}
              </div>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3"
                style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b' }}>
                <Trophy size={11} /> Module Complete!
              </div>

              <h2 className="text-2xl font-black text-white mb-1">{mod.title}</h2>
              <p className="text-sm text-slate-400 mb-6">You've mastered every lesson in this module.</p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex gap-3 mb-6"
            >
              <div className="flex-1 py-3 rounded-2xl flex flex-col items-center gap-1"
                style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span className="text-xl font-black text-white">{mod.lessons.length}</span>
                <span className="text-[11px] text-slate-500">Lessons Done</span>
              </div>
              <div className="flex-1 py-3 rounded-2xl flex flex-col items-center gap-1"
                style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)' }}>
                <Zap size={18} className="text-yellow-400" />
                <span className="text-xl font-black text-white">{mod.lessons.length * 10}+</span>
                <span className="text-[11px] text-slate-500">XP Earned</span>
              </div>
              <div className="flex-1 py-3 rounded-2xl flex flex-col items-center gap-1"
                style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.15)' }}>
                <Star size={18} className="text-purple-400" />
                <span className="text-xl font-black text-white">{mod.level}</span>
                <span className="text-[11px] text-slate-500 truncate px-1">Level</span>
              </div>
            </motion.div>

            {/* Next module preview */}
            {nextMod && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mb-6 p-4 rounded-2xl text-left"
                style={{ background: `${nextMod.color}0d`, border: `1px solid ${nextMod.color}25` }}
              >
                <p className="text-xs text-slate-500 mb-1.5 uppercase tracking-wide font-semibold">Up Next</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{nextMod.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{nextMod.title}</p>
                    <p className="text-xs text-slate-500">{nextMod.lessons.length} lessons · {nextMod.level}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-2.5"
            >
              {nextMod && (
                <button
                  onClick={() => { onClose(); navigate(`/lesson/${nextMod.lessons[0].id}`); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', boxShadow: '0 4px 20px rgba(79,70,229,0.35)' }}
                >
                  Start {nextMod.title} <ArrowRight size={15} />
                </button>
              )}
              <button
                onClick={() => { onClose(); navigate('/'); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-slate-400 border border-dark-600 hover:text-white hover:border-dark-500 transition-all"
              >
                <Home size={14} /> Back to Home
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
