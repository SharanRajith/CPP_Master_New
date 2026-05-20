import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, XCircle, ChevronRight, Trophy, Zap, RotateCcw, Brain } from 'lucide-react';

const XP_PER_CORRECT = 10;

function ProgressDots({ total, current, results }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }, (_, i) => {
        const done = i < current || (i === current && results[i] !== undefined);
        const correct = results[i] === true;
        const wrong   = results[i] === false;
        return (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width:  i === current && !done ? 20 : 8,
              height: 8,
              background: correct ? '#34d399' : wrong ? '#ef4444' : i === current ? '#6366f1' : 'rgba(255,255,255,0.12)',
            }}
          />
        );
      })}
    </div>
  );
}

function QuizQuestion({ question, qIndex, total, onAnswer, answered, selected }) {
  const { q, options, answer, explanation } = question;

  return (
    <motion.div
      key={qIndex}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25 }}
    >
      {/* Question number */}
      <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">
        Question {qIndex + 1} of {total}
      </p>

      {/* Question text — render newlines + code blocks naively */}
      <div className="mb-5">
        {q.split(/```([\s\S]*?)```/).map((part, idx) =>
          idx % 2 === 1 ? (
            <pre
              key={idx}
              className="my-2 px-4 py-3 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto"
              style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {part.replace(/^cpp\n/, '')}
            </pre>
          ) : (
            <p key={idx} className="text-base font-semibold text-white leading-snug whitespace-pre-line">{part}</p>
          )
        )}
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2.5 mb-5">
        {options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect  = answer === i;
          let bg     = 'rgba(255,255,255,0.04)';
          let border = 'rgba(255,255,255,0.08)';
          let textColor = 'text-slate-300';

          if (answered !== null) {
            if (isCorrect) {
              bg = 'rgba(52,211,153,0.12)'; border = 'rgba(52,211,153,0.45)'; textColor = 'text-emerald-300';
            } else if (isSelected && !isCorrect) {
              bg = 'rgba(239,68,68,0.1)'; border = 'rgba(239,68,68,0.4)'; textColor = 'text-red-400';
            }
          } else if (isSelected) {
            bg = 'rgba(99,102,241,0.12)'; border = 'rgba(99,102,241,0.45)'; textColor = 'text-indigo-300';
          }

          return (
            <button
              key={i}
              disabled={answered !== null}
              onClick={() => onAnswer(i)}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3 disabled:cursor-default"
              style={{ background: bg, border: `1px solid ${border}` }}
            >
              <span
                className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: answered !== null && isCorrect
                    ? 'rgba(52,211,153,0.2)'
                    : answered !== null && isSelected && !isCorrect
                    ? 'rgba(239,68,68,0.2)'
                    : 'rgba(255,255,255,0.06)',
                  color: answered !== null && isCorrect ? '#34d399' : answered !== null && isSelected ? '#ef4444' : '#94a3b8',
                }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className={textColor}>{opt}</span>
              {answered !== null && isCorrect && <CheckCircle2 size={15} className="ml-auto text-emerald-400 shrink-0" />}
              {answered !== null && isSelected && !isCorrect && <XCircle size={15} className="ml-auto text-red-400 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {answered !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className="px-4 py-3 rounded-xl text-sm text-slate-300 leading-relaxed"
              style={{
                background: answered === answer ? 'rgba(52,211,153,0.07)' : 'rgba(239,68,68,0.07)',
                border: `1px solid ${answered === answer ? 'rgba(52,211,153,0.2)' : 'rgba(239,68,68,0.2)'}`,
              }}
            >
              <span className="font-bold" style={{ color: answered === answer ? '#34d399' : '#f87171' }}>
                {answered === answer ? '✓ Correct! ' : '✗ Incorrect. '}
              </span>
              {explanation}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ResultScreen({ score, total, moduleColor, moduleIcon, moduleName, alreadyDone, onRetry, onClose }) {
  const xpEarned = alreadyDone ? 0 : score * XP_PER_CORRECT;
  const pct = Math.round((score / total) * 100);

  let grade, gradeColor, gradeMsg;
  if (pct === 100)      { grade = 'Perfect!';    gradeColor = '#f59e0b'; gradeMsg = 'Flawless run — you truly know this module cold.'; }
  else if (pct >= 80)   { grade = 'Great job!';  gradeColor = '#34d399'; gradeMsg = 'Strong score. Review the ones you missed.'; }
  else if (pct >= 60)   { grade = 'Good effort'; gradeColor = '#6366f1'; gradeMsg = 'Not bad! Re-read the module and try again.'; }
  else                  { grade = 'Keep going';  gradeColor = '#f97316'; gradeMsg = 'Review the lessons and come back stronger.'; }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      <div
        className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-2xl"
        style={{ background: `${moduleColor}22`, border: `2px solid ${moduleColor}50` }}
      >
        {moduleIcon}
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-dark-400 mb-1">{moduleName}</p>
      <h3 className="text-2xl font-black text-white mb-1">{grade}</h3>
      <p className="text-sm text-dark-400 mb-6">{gradeMsg}</p>

      {/* Score circle */}
      <div className="flex justify-center mb-6">
        <div className="relative w-28 h-28">
          <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
            <circle cx="56" cy="56" r="48" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
            <motion.circle
              cx="56" cy="56" r="48" fill="none"
              stroke={gradeColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 48}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 48 * (1 - pct / 100) }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-white">{score}/{total}</span>
            <span className="text-xs text-dark-400">correct</span>
          </div>
        </div>
      </div>

      {/* XP reward */}
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
        style={{
          background: xpEarned > 0 ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.04)',
          border:     xpEarned > 0 ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgba(255,255,255,0.08)',
          color:      xpEarned > 0 ? '#f59e0b' : '#6b7280',
        }}
      >
        <Zap size={14} />
        {xpEarned > 0 ? `+${xpEarned} XP earned!` : alreadyDone ? 'XP already claimed' : 'No XP (0 correct)'}
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={onRetry}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-slate-300 border border-dark-600 hover:text-white hover:border-dark-500 transition-all"
        >
          <RotateCcw size={14} /> Try Again
        </button>
        <button
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', boxShadow: '0 4px 20px rgba(79,70,229,0.35)' }}
        >
          Done <Trophy size={14} />
        </button>
      </div>
    </motion.div>
  );
}

export default function QuizModal({ moduleId, moduleName, moduleColor, moduleIcon, questions, alreadyDone, onClose, onComplete }) {
  const [qIndex,   setQIndex]   = useState(0);
  const [selected, setSelected] = useState(null);  // currently highlighted option
  const [answered, setAnswered] = useState(null);  // confirmed answer index
  const [results,  setResults]  = useState([]);    // true/false per question
  const [phase,    setPhase]    = useState('quiz'); // 'quiz' | 'result'
  const [score,    setScore]    = useState(0);

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const handleAnswer = useCallback((optionIdx) => {
    if (answered !== null) return;
    setSelected(optionIdx);
    setAnswered(optionIdx);
    const correct = optionIdx === questions[qIndex].answer;
    setResults(prev => [...prev, correct]);
    if (correct) setScore(s => s + 1);
  }, [answered, qIndex, questions]);

  const handleNext = useCallback(() => {
    if (qIndex + 1 >= questions.length) {
      setPhase('result');
      if (!alreadyDone) onComplete(score);
      return;
    }
    setQIndex(q => q + 1);
    setSelected(null);
    setAnswered(null);
  }, [qIndex, questions.length, score, alreadyDone, onComplete]);

  const handleRetry = () => {
    setQIndex(0);
    setSelected(null);
    setAnswered(null);
    setResults([]);
    setScore(0);
    setPhase('quiz');
  };

  const finalScore = score;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden relative"
        style={{
          background: 'linear-gradient(160deg, #0d0b1f 0%, #0a0818 100%)',
          border: '1px solid rgba(99,102,241,0.25)',
          boxShadow: '0 0 0 1px rgba(99,102,241,0.08), 0 40px 80px rgba(0,0,0,0.7)',
          maxHeight: '92vh',
          overflowY: 'auto',
        }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
          style={{ background: 'rgba(13,11,31,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}
        >
          <div className="flex items-center gap-2">
            <Brain size={16} className="text-indigo-400" />
            <span className="text-sm font-bold text-white">Module Quiz</span>
          </div>
          {phase === 'quiz' && (
            <ProgressDots
              total={questions.length}
              current={qIndex}
              results={results}
            />
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-6">
          <AnimatePresence mode="wait">
            {phase === 'quiz' ? (
              <QuizQuestion
                key={qIndex}
                question={questions[qIndex]}
                qIndex={qIndex}
                total={questions.length}
                onAnswer={handleAnswer}
                answered={answered}
                selected={selected}
              />
            ) : (
              <ResultScreen
                key="result"
                score={finalScore}
                total={questions.length}
                moduleColor={moduleColor}
                moduleIcon={moduleIcon}
                moduleName={moduleName}
                alreadyDone={alreadyDone}
                onRetry={handleRetry}
                onClose={onClose}
              />
            )}
          </AnimatePresence>

          {/* Next button — only in quiz phase after answering */}
          {phase === 'quiz' && answered !== null && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', boxShadow: '0 4px 20px rgba(79,70,229,0.3)' }}
            >
              {qIndex + 1 >= questions.length ? 'See Results' : 'Next Question'}
              <ChevronRight size={15} />
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
