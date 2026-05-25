import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, CheckCircle2, XCircle, Database, RefreshCw,
  ChevronDown, ChevronUp, Lightbulb, Zap, Lock,
} from 'lucide-react';

const WASM_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2';

function loadSqlJs() {
  return new Promise((resolve, reject) => {
    const init = () =>
      window.initSqlJs({ locateFile: f => `${WASM_CDN}/${f}` })
        .then(resolve).catch(reject);
    if (window.initSqlJs) { init(); return; }
    const script = document.createElement('script');
    script.src = `${WASM_CDN}/sql-wasm.js`;
    script.onload = init;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// ─── Result Table ─────────────────────────────────────────────────────────────
function ResultTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr style={{ background: 'rgba(167,139,250,0.08)' }}>
            {columns.map((col, i) => (
              <th key={i} className="px-3 py-2 text-left font-semibold border-b border-dark-600"
                style={{ color: '#c4b5fd' }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? '' : 'bg-white/[0.02]'}>
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-1.5 font-mono text-white border-b border-dark-700/50">
                  {cell === null ? <span className="text-dark-500 italic">NULL</span> : String(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[10px] text-dark-500 px-3 py-1.5">
        {rows.length} row{rows.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
}

// ─── Hint Panel ───────────────────────────────────────────────────────────────
function HintPanel({ hints, hintIndex, onShowHint, xp }) {
  const [open, setOpen] = useState(false);
  if (!hints?.length) return null;

  const unlocked = hints.slice(0, hintIndex + 1);
  const nextIdx  = hintIndex + 1;
  const hasMore  = nextIdx < hints.length;
  const canAfford = xp >= 5;

  return (
    <div className="border-t border-dark-600">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-dark-700/50 transition-colors"
      >
        <Lightbulb size={13} className="text-yellow-400 shrink-0" />
        <span className="text-xs font-semibold text-dark-300 flex-1 text-left">
          Hints {unlocked.length > 0 ? `(${unlocked.length} unlocked)` : ''}
        </span>
        <span className="text-[10px] text-dark-500">{xp} XP</span>
        {open ? <ChevronUp size={13} className="text-dark-400" /> : <ChevronDown size={13} className="text-dark-400" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 space-y-2">
              {unlocked.map((h, i) => (
                <div key={i} className="text-xs text-dark-200 bg-yellow-900/10 border border-yellow-700/20 rounded-lg px-3 py-2">
                  <span className="font-semibold text-yellow-400 mr-1">Hint {i + 1}:</span>{h}
                </div>
              ))}
              {hasMore && (
                <button
                  onClick={onShowHint}
                  disabled={!canAfford}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
                  style={{
                    background: canAfford ? 'rgba(234,179,8,0.1)' : 'rgba(255,255,255,0.04)',
                    border: canAfford ? '1px solid rgba(234,179,8,0.3)' : '1px solid rgba(255,255,255,0.08)',
                    color: canAfford ? '#fbbf24' : '#6b7280',
                  }}
                >
                  {canAfford ? <Zap size={11} /> : <Lock size={11} />}
                  {unlocked.length === 0 ? 'Unlock hint' : 'Unlock next hint'} · 5 XP
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SqlEditor({
  lesson,
  isCompleted,
  onComplete,
  hints,
  hintIndex,
  onShowHint,
  xp = 0,
}) {
  const [code, setCode]           = useState('');
  const [result, setResult]       = useState(null);   // { columns, rows }
  const [error, setError]         = useState(null);
  const [sqlReady, setSqlReady]   = useState(false);
  const [loadErr, setLoadErr]     = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [testStatus, setTestStatus] = useState(null); // null | 'pass' | 'fail'
  const [testDetails, setTestDetails] = useState(null); // { actual, expected }
  const sqlRef = useRef(null);

  // Load sql.js once
  useEffect(() => {
    loadSqlJs()
      .then(SQL => { sqlRef.current = SQL; setSqlReady(true); })
      .catch(() => setLoadErr(true));
  }, []);

  // Restore saved code
  useEffect(() => {
    const saved = localStorage.getItem(`sql_${lesson.id}`);
    setCode(saved ?? (lesson.starterCode || ''));
    setResult(null); setError(null); setTestStatus(null);
  }, [lesson.id]);

  // Auto-save
  const saveTimer = useRef(null);
  useEffect(() => {
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      localStorage.setItem(`sql_${lesson.id}`, code);
    }, 500);
    return () => clearTimeout(saveTimer.current);
  }, [code, lesson.id]);

  const execSQL = useCallback((sql) => {
    if (!sqlRef.current) return null;
    try {
      const db = new sqlRef.current.Database();
      if (lesson.schema) db.run(lesson.schema);
      const results = db.exec(sql);
      db.close();
      return { ok: true, results };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }, [lesson.schema]);

  function handleRun() {
    setIsRunning(true); setError(null); setTestStatus(null); setResult(null);
    setTimeout(() => {
      const res = execSQL(code);
      if (!res) return setIsRunning(false);
      if (!res.ok) { setError(res.error); }
      else if (res.results.length > 0) {
        setResult({ columns: res.results[0].columns, rows: res.results[0].values, dml: false });
      } else {
        setResult({ columns: [], rows: [], dml: true });
      }
      setIsRunning(false);
    }, 40);
  }

  function handleTest() {
    setIsRunning(true); setError(null); setTestDetails(null);
    setTimeout(() => {
      const tc = lesson.testCases?.[0];
      if (!tc) { setIsRunning(false); return; }

      const res = execSQL(code);
      if (!res || !res.ok) {
        setError(res?.error || 'SQL error');
        setTestStatus('fail');
        setTestDetails({ actual: '(SQL error — see above)', expected: tc.expectedOutput.trim() });
        setIsRunning(false);
        return;
      }

      const rows = res.results[0]?.values || [];
      if (res.results.length > 0) {
        setResult({ columns: res.results[0].columns, rows });
      }

      const output = rows
        .map(r => r.map(v => v === null ? 'NULL' : String(v)).join('|'))
        .join('\n')
        .trim();

      const passed = output === tc.expectedOutput.trim();
      setTestStatus(passed ? 'pass' : 'fail');
      if (!passed) setTestDetails({ actual: output || '(empty — no rows returned)', expected: tc.expectedOutput.trim() });
      if (passed && !isCompleted) onComplete();
      setIsRunning(false);
    }, 40);
  }

  function handleReset() {
    localStorage.removeItem(`sql_${lesson.id}`);
    setCode(lesson.starterCode || '');
    setResult(null); setError(null); setTestStatus(null); setTestDetails(null);
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-dark-900">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-dark-600 bg-dark-800 shrink-0">
        <Database size={13} style={{ color: '#a78bfa' }} />
        <span className="text-xs font-semibold text-dark-300 uppercase tracking-wide">SQL Editor</span>
        {!sqlReady && !loadErr && (
          <span className="text-[10px] text-dark-500 flex items-center gap-1">
            <RefreshCw size={9} className="animate-spin" /> Loading SQLite…
          </span>
        )}
        {loadErr && (
          <span className="text-[10px] text-red-400">Failed to load SQLite (check internet)</span>
        )}
        <div className="flex-1" />
        <button onClick={handleReset}
          className="text-xs text-dark-500 hover:text-dark-200 px-2 py-1 rounded transition-all">
          Reset
        </button>
        <button onClick={handleRun} disabled={!sqlReady || isRunning}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all disabled:opacity-40"
          style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
          <Play size={11} /> Run
        </button>
        <button onClick={handleTest} disabled={!sqlReady || isRunning || !lesson.testCases?.length}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all disabled:opacity-40"
          style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)', color: '#34d399' }}>
          {isRunning
            ? <RefreshCw size={11} className="animate-spin" />
            : <CheckCircle2 size={11} />}
          Test
        </button>
      </div>

      {/* Code area — top 55% */}
      <div className="flex flex-col border-b border-dark-500" style={{ flex: '0 0 55%', minHeight: 0 }}>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-dark-800 border-b border-dark-700 shrink-0">
          <span className="text-[10px] font-bold text-dark-500 uppercase tracking-widest">Write SQL here</span>
          <span className="text-[10px] text-dark-600 ml-auto">Ctrl+Enter to run</span>
        </div>
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          spellCheck={false}
          className="flex-1 min-h-0 bg-[#0d1117] text-sm font-mono text-gray-200 px-4 py-3 outline-none resize-none"
          style={{ lineHeight: 1.75, tabSize: 2 }}
          placeholder="-- Write your SQL here"
          onKeyDown={e => {
            if (e.key === 'Tab') {
              e.preventDefault();
              const s = e.target.selectionStart;
              const v = code;
              setCode(v.slice(0, s) + '  ' + v.slice(e.target.selectionEnd));
              requestAnimationFrame(() => { e.target.selectionStart = e.target.selectionEnd = s + 2; });
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleRun();
          }}
        />
      </div>

      {/* Results area — bottom 45% */}
      <div className="flex flex-col" style={{ flex: '0 0 45%', minHeight: 0 }}>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-dark-800 border-b border-dark-700 shrink-0">
          <span className="text-[10px] font-bold text-dark-500 uppercase tracking-widest">Results</span>
          {result && !result.dml && result.rows.length > 0 && (
            <span className="text-[10px] text-dark-600 ml-auto">{result.rows.length} row{result.rows.length !== 1 ? 's' : ''}</span>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">
          {error && (
            <div className="px-4 py-3 text-xs text-red-400 font-mono flex items-start gap-2">
              <XCircle size={13} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          {result && !error && result.dml && (
            <div className="flex items-center gap-2 px-4 py-3 text-xs text-emerald-400">
              <CheckCircle2 size={13} className="shrink-0" />
              Statement executed successfully — no rows returned.
            </div>
          )}
          {result && !error && !result.dml && result.rows.length > 0 && (
            <ResultTable columns={result.columns} rows={result.rows} />
          )}
          {result && !error && !result.dml && result.rows.length === 0 && (
            <p className="text-xs text-dark-500 px-4 py-3">Query returned 0 rows.</p>
          )}
          {!result && !error && (
            <p className="text-xs text-dark-600 px-4 py-3">
              Press <span className="text-dark-400 font-mono">Run</span> to execute your query,&nbsp;
              <span className="text-dark-400 font-mono">Test</span> to check against expected output.
            </p>
          )}
        </div>
      </div>

      {/* Test status banner */}
      <AnimatePresence>
        {testStatus && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="shrink-0 border-t border-dark-600 overflow-hidden"
          >
            {testStatus === 'pass' ? (
              <div className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-400"
                style={{ background: 'rgba(52,211,153,0.06)' }}>
                <CheckCircle2 size={13} /> All tests passed! +{lesson.xpReward || 10} XP
              </div>
            ) : (
              <div style={{ background: 'rgba(239,68,68,0.06)' }}>
                {/* Fail header */}
                <div className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-400 border-b border-red-900/30">
                  <XCircle size={13} /> Wrong answer — see what's different below
                </div>
                {/* Side-by-side comparison */}
                {testDetails && (
                  <div className="grid grid-cols-2 divide-x divide-dark-600 text-[11px] font-mono max-h-40 overflow-y-auto">
                    <div className="p-3">
                      <p className="text-[10px] font-bold text-red-400 uppercase tracking-wide mb-1.5">Your Output</p>
                      {testDetails.actual.split('\n').map((line, i) => (
                        <div key={i} className="text-red-300/80 leading-5">{line || <span className="text-dark-600 italic">empty</span>}</div>
                      ))}
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide mb-1.5">Expected Output</p>
                      {testDetails.expected.split('\n').map((line, i) => (
                        <div key={i} className="text-emerald-300/80 leading-5">{line}</div>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-[10px] text-dark-500 px-4 py-1.5">
                  Values are compared as: row1col1|row1col2 per line. Check column names, order, and filters.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hints */}
      <HintPanel hints={hints} hintIndex={hintIndex} onShowHint={onShowHint} xp={xp} />
    </div>
  );
}
