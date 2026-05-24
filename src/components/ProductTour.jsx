import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const TOUR_STEPS = [
  {
    targetId: 'nav-explore',
    title: 'Explore Extra Features',
    message: 'Click this compass icon to access the Algorithm Visualizer, Mock Interview simulator, and FAANG Problem sets.',
    position: 'bottom',
    accent: '#22d3ee',
  },
  {
    targetId: 'nav-home',
    title: 'Pick Your Track',
    message: 'From the home page choose between DSA & C++, Embedded C, or DBMS — three full learning tracks.',
    position: 'bottom',
    accent: '#6366f1',
  },
  {
    targetId: 'streak-badge',
    title: 'Build Your Streak',
    message: 'Complete at least one lesson every day to keep your streak alive and earn bonus XP.',
    position: 'bottom',
    accent: '#f97316',
  },
];

const TOUR_KEY = 'cpp_tour_v1';
export function shouldShowTour() { return !localStorage.getItem(TOUR_KEY); }
export function markTourDone()   { localStorage.setItem(TOUR_KEY, '1'); }

function useTargetRect(targetId) {
  const [rect, setRect] = useState(null);

  useEffect(() => {
    function measure() {
      const el = document.getElementById(targetId);
      if (el) setRect(el.getBoundingClientRect());
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [targetId]);

  return rect;
}

function TourStep({ step, stepIndex, total, onNext, onSkip }) {
  const rect = useTargetRect(step.targetId);
  if (!rect) return null;

  const PAD = 6;
  const ringTop    = rect.top    - PAD;
  const ringLeft   = rect.left   - PAD;
  const ringWidth  = rect.width  + PAD * 2;
  const ringHeight = rect.height + PAD * 2;

  // Tooltip position
  const tooltipWidth = 260;
  let tooltipTop  = rect.bottom + 14;
  let tooltipLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
  tooltipLeft = Math.max(8, Math.min(tooltipLeft, window.innerWidth - tooltipWidth - 8));

  // Arrow offset relative to tooltip left
  const arrowLeft = (rect.left + rect.width / 2) - tooltipLeft - 8;

  return (
    <>
      {/* Dim overlay — pointer-events none so clicks still work on page */}
      <div
        className="fixed inset-0 z-40 pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.55)' }}
      />

      {/* Glowing ring around target */}
      <motion.div
        key={step.targetId}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed z-50 pointer-events-none rounded-xl"
        style={{
          top: ringTop, left: ringLeft,
          width: ringWidth, height: ringHeight,
          border: `2px solid ${step.accent}`,
          boxShadow: `0 0 0 4px ${step.accent}30, 0 0 24px ${step.accent}60`,
        }}
      />

      {/* Pulsing dot on target */}
      <motion.div
        className="fixed z-50 pointer-events-none rounded-full"
        animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        style={{
          top: rect.top + rect.height / 2 - 5,
          left: rect.right + 4,
          width: 10, height: 10,
          background: step.accent,
        }}
      />

      {/* Tooltip */}
      <motion.div
        key={`tooltip-${step.targetId}`}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed z-50 rounded-2xl p-4"
        style={{
          top: tooltipTop,
          left: tooltipLeft,
          width: tooltipWidth,
          background: 'rgba(13,11,31,0.98)',
          border: `1px solid ${step.accent}50`,
          boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px ${step.accent}20`,
        }}
      >
        {/* Arrow */}
        <div
          className="absolute -top-2"
          style={{
            left: Math.max(12, Math.min(arrowLeft, tooltipWidth - 24)),
            width: 0, height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderBottom: `8px solid ${step.accent}50`,
          }}
        />

        <div className="flex items-start justify-between gap-2 mb-1.5">
          <p className="text-sm font-bold text-white leading-snug">{step.title}</p>
          <button onClick={onSkip} className="shrink-0 p-0.5 rounded-full text-slate-600 hover:text-white transition-colors">
            <X size={13} />
          </button>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed mb-3">{step.message}</p>

        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-600">{stepIndex + 1} / {total}</span>
          <button
            onClick={onNext}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${step.accent}, ${step.accent}cc)` }}
          >
            {stepIndex === total - 1 ? 'Done!' : 'Next →'}
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default function ProductTour({ onDone }) {
  const [stepIndex, setStepIndex] = useState(0);

  function next() {
    if (stepIndex < TOUR_STEPS.length - 1) {
      setStepIndex(s => s + 1);
    } else {
      finish();
    }
  }

  function finish() {
    markTourDone();
    onDone();
  }

  return (
    <AnimatePresence mode="wait">
      <TourStep
        key={stepIndex}
        step={TOUR_STEPS[stepIndex]}
        stepIndex={stepIndex}
        total={TOUR_STEPS.length}
        onNext={next}
        onSkip={finish}
      />
    </AnimatePresence>
  );
}
