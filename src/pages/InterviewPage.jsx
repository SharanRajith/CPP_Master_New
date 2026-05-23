import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle2, AlertCircle, XCircle, ChevronLeft, ChevronRight, Lightbulb, RotateCcw, Trophy, Play, Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Question bank (Easy × 3, Medium × 4, Hard × 3) ─────────────────────────
const QUESTIONS = [
  {
    id: 1, difficulty: 'Easy', company: 'Meta', mins: 10,
    title: 'Two Sum',
    description: 'Given an array of integers and a target, return the indices of the two numbers that add up to the target. Each input has exactly one solution. You may not use the same element twice.',
    example: 'Input:  nums = [2, 7, 11, 15],  target = 9\nOutput: [0, 1]   // nums[0] + nums[1] = 2 + 7 = 9',
    hint: 'Use a hash map: for each number x, check if (target − x) already exists in the map before inserting x.',
    approach: 'Hash Map — O(n) time, O(n) space',
  },
  {
    id: 2, difficulty: 'Easy', company: 'Google', mins: 10,
    title: 'Valid Parentheses',
    description: 'Given a string containing only (, ), {, }, [ and ], determine if it is valid. Every opening bracket must be closed by the same type of bracket in the correct order.',
    example: 'Input: "()[]{}"  →  true\nInput: "([)]"    →  false\nInput: "{[]}"    →  true',
    hint: 'Push opening brackets onto a stack. On a closing bracket, check if the top of the stack is the matching opener.',
    approach: 'Stack — O(n) time, O(n) space',
  },
  {
    id: 3, difficulty: 'Easy', company: 'Amazon', mins: 10,
    title: 'Best Time to Buy and Sell Stock',
    description: 'Given an array where prices[i] is the stock price on day i, find the maximum profit from a single buy-then-sell transaction. If no profit is possible, return 0.',
    example: 'Input:  [7, 1, 5, 3, 6, 4]\nOutput: 5   // Buy at 1 (day 1), sell at 6 (day 4)',
    hint: 'Track the minimum price seen so far. At each step, profit = current price − min price so far.',
    approach: 'Single pass — O(n) time, O(1) space',
  },
  {
    id: 4, difficulty: 'Medium', company: 'Apple', mins: 20,
    title: 'Product of Array Except Self',
    description: 'Given an integer array, return an array where each element is the product of all other elements. Solve in O(n) without the division operator.',
    example: 'Input:  [1, 2, 3, 4]\nOutput: [24, 12, 8, 6]',
    hint: 'First pass: build a prefix product array (left products). Second pass going right: multiply in suffix products on the fly.',
    approach: 'Prefix & Suffix Products — O(n) time, O(1) extra space',
  },
  {
    id: 5, difficulty: 'Medium', company: 'Microsoft', mins: 20,
    title: 'Spiral Matrix',
    description: 'Given an m × n matrix, return all its elements in spiral order (right → down → left → up, repeat while shrinking boundaries).',
    example: 'Input:  [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [1,2,3,6,9,8,7,4,5]',
    hint: 'Maintain four boundary pointers (top, bottom, left, right). After each direction, shrink the corresponding boundary.',
    approach: 'Boundary simulation — O(m × n) time',
  },
  {
    id: 6, difficulty: 'Medium', company: 'Amazon', mins: 20,
    title: 'Rotting Oranges',
    description: 'Grid cells are 0 (empty), 1 (fresh), or 2 (rotten). Each minute, rotten oranges spread to adjacent fresh ones. Return the minimum minutes until no fresh oranges remain, or −1 if impossible.',
    example: 'Input:  [[2,1,1],[1,1,0],[0,1,1]]\nOutput: 4',
    hint: 'Start BFS simultaneously from all initially rotten oranges. Track time via BFS level and count remaining fresh oranges.',
    approach: 'Multi-source BFS — O(m × n) time',
  },
  {
    id: 7, difficulty: 'Medium', company: 'Google', mins: 20,
    title: 'Trapping Rain Water',
    description: 'Given n non-negative integers representing elevation heights, compute how much rainwater can be trapped between the bars.',
    example: 'Input:  [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6',
    hint: 'Two-pointer approach: water at any bar = min(maxLeft, maxRight) − height. Move the pointer with the smaller max inward.',
    approach: 'Two Pointers — O(n) time, O(1) space',
  },
  {
    id: 8, difficulty: 'Hard', company: 'Meta', mins: 25,
    title: 'Merge Intervals',
    description: 'Given an array of intervals [start, end], merge all overlapping intervals and return the minimum set of non-overlapping intervals.',
    example: 'Input:  [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]',
    hint: 'Sort intervals by start time. Iterate and extend the last merged interval if the current one overlaps (curr.start ≤ last.end).',
    approach: 'Sort + Greedy — O(n log n) time',
  },
  {
    id: 9, difficulty: 'Hard', company: 'Amazon', mins: 25,
    title: 'Coin Change',
    description: 'Given coin denominations and an amount, find the fewest number of coins needed to make that amount. Return −1 if it is not possible.',
    example: 'Input:  coins = [1, 5, 11],  amount = 15\nOutput: 3   // 5 + 5 + 5',
    hint: 'Bottom-up DP: dp[i] = min coins to make amount i. Initialize dp[0]=0 and everything else = ∞. For each amount, try all coins.',
    approach: 'Bottom-up DP — O(amount × |coins|) time',
  },
  {
    id: 10, difficulty: 'Hard', company: 'Microsoft', mins: 25,
    title: 'Course Schedule',
    description: 'There are numCourses to take. prerequisites[i] = [a, b] means b must be taken before a. Return true if you can finish all courses (i.e., no cycle exists).',
    example: 'Input:  numCourses=2,  prerequisites=[[1,0]]\nOutput: true   // Take 0 first, then 1',
    hint: 'Build a directed graph. Use DFS with 3-state coloring — unvisited (0), in-stack (1), done (2) — to detect back edges (cycles).',
    approach: 'DFS cycle detection — O(V + E) time',
  },
];

const DIFF_COLOR = { Easy: '#34d399', Medium: '#f59e0b', Hard: '#f87171' };
const DIFF_BG    = { Easy: 'rgba(52,211,153,0.1)', Medium: 'rgba(245,158,11,0.1)', Hard: 'rgba(248,113,113,0.1)' };
const COMPANY_COLOR = { Google: '#4285F4', Meta: '#0668E1', Amazon: '#FF9900', Microsoft: '#00A4EF', Apple: '#94a3b8' };

const TOTAL_SECS = QUESTIONS.reduce((s, q) => s + q.mins * 60, 0); // ~165 min

function fmt(s) {
  const m = Math.floor(s / 60), sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

const STATUS_META = {
  solved:    { label: 'Solved',    icon: <CheckCircle2 size={13} />, color: '#34d399', bg: 'rgba(52,211,153,0.12)',   border: 'rgba(52,211,153,0.3)'   },
  attempted: { label: 'Attempted', icon: <AlertCircle  size={13} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.3)'   },
  stuck:     { label: 'Stuck',     icon: <XCircle      size={13} />, color: '#f87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.3)'  },
};

// ─── Start screen ─────────────────────────────────────────────────────────────
function StartScreen({ onStart }) {
  return (
    <div className="w-full px-6 py-10" style={{ background: '#0a0f1c' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg w-full mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', boxShadow: '0 0 40px rgba(99,102,241,0.3)' }}>
          <Clock size={28} className="text-white" />
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Mock Interview</h1>
        <p className="text-dark-400 text-sm mb-8">10 problems — Easy to Hard — across Google, Meta, Amazon, Microsoft & Apple.</p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[['10', 'Questions'], ['~90', 'Minutes'], ['3', 'Difficulty levels']].map(([v, l]) => (
            <div key={l} className="rounded-xl py-4"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.18)' }}>
              <p className="text-xl font-black text-white">{v}</p>
              <p className="text-xs text-dark-400 mt-0.5">{l}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-5 mb-8 text-left"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs font-bold text-dark-300 uppercase tracking-widest mb-3">Instructions</p>
          {[
            'Work through all 10 problems at your own pace.',
            'A timer runs at the top — try to finish within the suggested time.',
            'After each problem, mark yourself: Solved / Attempted / Stuck.',
            'Hints are available — use them sparingly for a realistic experience.',
            'Your score is shown at the end based on your self-assessment.',
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-2.5 mb-2">
              <span className="text-indigo-400 font-bold text-xs shrink-0 mt-0.5">{i + 1}.</span>
              <span className="text-xs text-dark-300">{t}</span>
            </div>
          ))}
        </div>

        <button onClick={onStart}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', boxShadow: '0 4px 24px rgba(99,102,241,0.35)' }}>
          <Play size={16} /> Start Interview
        </button>
      </motion.div>
    </div>
  );
}

// ─── Results screen ───────────────────────────────────────────────────────────
function ResultsScreen({ answers, timeTaken, onRetry, navigate }) {
  const solved    = QUESTIONS.filter(q => answers[q.id] === 'solved').length;
  const attempted = QUESTIONS.filter(q => answers[q.id] === 'attempted').length;
  const stuck     = QUESTIONS.filter(q => !answers[q.id] || answers[q.id] === 'stuck').length;
  const score     = solved * 10 + attempted * 5;
  const maxScore  = QUESTIONS.length * 10;
  const pct       = Math.round((score / maxScore) * 100);

  const grade = pct >= 80 ? { label: 'Excellent', color: '#34d399' }
              : pct >= 60 ? { label: 'Good',       color: '#f59e0b' }
              : pct >= 40 ? { label: 'Keep going', color: '#f97316' }
              :              { label: 'Need practice', color: '#f87171' };

  return (
    <div className="w-full" style={{ background: '#0a0f1c' }}>
      <div className="max-w-2xl mx-auto px-4 py-10 pb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="text-center mb-8">
            <Trophy size={40} className="mx-auto mb-3 text-yellow-400" />
            <h1 className="text-3xl font-black text-white mb-1">Interview Complete</h1>
            <p className="text-dark-400 text-sm">Time taken: {fmt(timeTaken)}</p>
          </div>

          {/* Score circle */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full flex flex-col items-center justify-center mb-3"
              style={{ background: `${grade.color}18`, border: `3px solid ${grade.color}50` }}>
              <span className="text-3xl font-black" style={{ color: grade.color }}>{pct}%</span>
              <span className="text-xs font-semibold text-dark-400">{score}/{maxScore} pts</span>
            </div>
            <span className="text-sm font-bold px-4 py-1.5 rounded-full"
              style={{ background: `${grade.color}18`, color: grade.color, border: `1px solid ${grade.color}40` }}>
              {grade.label}
            </span>
          </div>

          {/* Summary row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Solved',    value: solved,    color: '#34d399' },
              { label: 'Attempted', value: attempted, color: '#f59e0b' },
              { label: 'Stuck',     value: stuck,     color: '#f87171' },
            ].map(s => (
              <div key={s.label} className="rounded-xl py-4 text-center"
                style={{ background: `${s.color}0d`, border: `1px solid ${s.color}30` }}>
                <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-dark-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Per-question breakdown */}
          <div className="rounded-2xl overflow-hidden mb-6"
            style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <p className="text-[10px] font-bold text-dark-500 uppercase tracking-widest px-4 py-3 border-b"
              style={{ borderColor: 'rgba(255,255,255,0.05)' }}>Question breakdown</p>
            {QUESTIONS.map((q, i) => {
              const status = answers[q.id] || 'stuck';
              const sm = STATUS_META[status];
              return (
                <div key={q.id}
                  className="flex items-center gap-3 px-4 py-3 border-b last:border-b-0 cursor-pointer hover:bg-white/5 transition-all"
                  style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                  onClick={() => navigate(`/lesson/${q.id === 1 ? 'm13-l1' : `m13-l${q.id}`}`)}>
                  <span className="text-xs text-dark-600 w-4 shrink-0">{i + 1}</span>
                  <span className="flex-1 text-sm text-slate-300 truncate">{q.title}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: DIFF_BG[q.difficulty], color: DIFF_COLOR[q.difficulty] }}>{q.difficulty}</span>
                  <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: sm.bg, color: sm.color, border: `1px solid ${sm.border}` }}>
                    {sm.icon} {sm.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={onRetry}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
              <RotateCcw size={14} /> Try Again
            </button>
            <button onClick={() => navigate('/problems')}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
              View Problem Sets
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Main interview screen ────────────────────────────────────────────────────
export default function InterviewPage() {
  const navigate = useNavigate();
  const [phase,    setPhase]    = useState('start');
  const [qIdx,     setQIdx]     = useState(0);
  const [answers,  setAnswers]  = useState({});
  const [hints,    setHints]    = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECS);
  const [timeTaken, setTimeTaken] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (phase !== 'interview') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); endInterview(TOTAL_SECS); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  function startInterview() {
    setQIdx(0); setAnswers({}); setHints({});
    setTimeLeft(TOTAL_SECS); setTimeTaken(0);
    setPhase('interview');
  }

  function endInterview(left = timeLeft) {
    clearInterval(timerRef.current);
    setTimeTaken(TOTAL_SECS - left);
    setPhase('results');
  }

  function mark(status) {
    setAnswers(prev => ({ ...prev, [QUESTIONS[qIdx].id]: status }));
    if (qIdx < QUESTIONS.length - 1) setQIdx(qIdx + 1);
  }

  if (phase === 'start')   return <div className="h-full overflow-y-auto" style={{ background: '#0a0f1c' }}><StartScreen onStart={startInterview} /></div>;
  if (phase === 'results') return <div className="h-full overflow-y-auto" style={{ background: '#0a0f1c' }}><ResultsScreen answers={answers} timeTaken={timeTaken} onRetry={startInterview} navigate={navigate} /></div>;

  const q = QUESTIONS[qIdx];
  const answered = Object.keys(answers).length;
  const timerColor = timeLeft < 600 ? '#f87171' : timeLeft < 1800 ? '#f59e0b' : '#a5b4fc';

  return (
    <div className="w-full flex flex-col" style={{ background: '#0a0f1c', minHeight: '100%' }}>

      {/* Top bar */}
      <div className="flex items-center gap-4 px-4 py-3 shrink-0"
        style={{ background: 'rgba(17,17,28,0.9)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <Clock size={13} style={{ color: timerColor }} />
          <span className="text-sm font-mono font-bold" style={{ color: timerColor }}>{fmt(timeLeft)}</span>
        </div>

        <div className="flex-1 h-1.5 bg-dark-700 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${((qIdx) / QUESTIONS.length) * 100}%`, background: 'linear-gradient(90deg,#6366f1,#818cf8)' }} />
        </div>

        <span className="text-xs text-dark-500 shrink-0">{answered}/{QUESTIONS.length} marked</span>

        <button onClick={() => endInterview()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
          style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)', color: '#f87171' }}>
          <Flag size={11} /> Finish
        </button>
      </div>

      <div className="flex flex-1">
        {/* Left: question list */}
        <div className="hidden md:flex flex-col w-52 shrink-0 overflow-y-auto p-3 gap-1"
          style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          {QUESTIONS.map((question, i) => {
            const status = answers[question.id];
            const sm = status ? STATUS_META[status] : null;
            const active = i === qIdx;
            return (
              <button key={question.id} onClick={() => setQIdx(i)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all"
                style={active
                  ? { background: 'rgba(99,102,241,0.18)', border: '1px solid rgba(99,102,241,0.35)' }
                  : { background: 'rgba(255,255,255,0.02)', border: '1px solid transparent' }}>
                <span className="text-[10px] text-dark-600 w-3 shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate leading-tight">{question.title}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: DIFF_COLOR[question.difficulty] }}>{question.difficulty}</p>
                </div>
                {sm && <span style={{ color: sm.color }}>{sm.icon}</span>}
              </button>
            );
          })}
        </div>

        {/* Right: question detail */}
        <div className="flex-1 p-4 md:p-6 pb-10">
          <AnimatePresence mode="wait">
            <motion.div key={q.id}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}>

              {/* Question header */}
              <div className="flex items-start gap-3 mb-5 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: DIFF_BG[q.difficulty], color: DIFF_COLOR[q.difficulty] }}>{q.difficulty}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ color: COMPANY_COLOR[q.company], background: `${COMPANY_COLOR[q.company]}18`, border: `1px solid ${COMPANY_COLOR[q.company]}40` }}>
                      {q.company}
                    </span>
                    <span className="text-[10px] text-dark-500">{q.mins} min suggested</span>
                  </div>
                  <h2 className="text-xl font-black text-white">
                    {qIdx + 1}. {q.title}
                  </h2>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-xl p-4 mb-4"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-sm text-slate-300 leading-relaxed">{q.description}</p>
              </div>

              {/* Example */}
              <div className="rounded-xl p-4 mb-4"
                style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Example</p>
                <pre className="text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">{q.example}</pre>
              </div>

              {/* Hint */}
              <div className="mb-6">
                {hints[q.id] ? (
                  <div className="rounded-xl p-4"
                    style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}>
                    <p className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest mb-1.5">Hint</p>
                    <p className="text-xs text-slate-300 leading-relaxed mb-2">{q.hint}</p>
                    <p className="text-[10px] text-dark-400"><span className="text-yellow-600 font-semibold">Approach:</span> {q.approach}</p>
                  </div>
                ) : (
                  <button onClick={() => setHints(h => ({ ...h, [q.id]: true }))}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                    style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', color: '#f59e0b' }}>
                    <Lightbulb size={14} /> Show Hint
                  </button>
                )}
              </div>

              {/* Self-mark buttons */}
              <div>
                <p className="text-[10px] font-bold text-dark-500 uppercase tracking-widest mb-3">How did it go?</p>
                <div className="flex gap-3 flex-wrap">
                  {Object.entries(STATUS_META).map(([key, sm]) => {
                    const active = answers[q.id] === key;
                    return (
                      <button key={key} onClick={() => mark(key)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                        style={active
                          ? { background: sm.bg, border: `1px solid ${sm.border}`, color: sm.color }
                          : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7280' }}>
                        {sm.icon} {sm.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <button onClick={() => setQIdx(Math.max(0, qIdx - 1))} disabled={qIdx === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-25"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af' }}>
                  <ChevronLeft size={14} /> Prev
                </button>
                <span className="text-xs text-dark-500">{qIdx + 1} of {QUESTIONS.length}</span>
                {qIdx < QUESTIONS.length - 1 ? (
                  <button onClick={() => setQIdx(qIdx + 1)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.35)', color: '#a5b4fc' }}>
                    Next <ChevronRight size={14} />
                  </button>
                ) : (
                  <button onClick={() => endInterview()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: 'white' }}>
                    <Flag size={14} /> Finish
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
