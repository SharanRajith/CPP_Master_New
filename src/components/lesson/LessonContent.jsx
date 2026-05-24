import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { Lightbulb, Eye, EyeOff, ExternalLink, Clock, HardDrive, StickyNote, Trash2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DiscussionPanel, { useFeedbackBadge } from './DiscussionPanel';

// ─── LeetCode Problem Card ────────────────────────────────────────────────────
function LeetCodeCard({ problem }) {
  const diffColor = {
    Easy:   'text-green-400 bg-green-900/20 border-green-700/30',
    Medium: 'text-yellow-400 bg-yellow-900/20 border-yellow-700/30',
    Hard:   'text-red-400 bg-red-900/20 border-red-700/30',
  }[problem.difficulty] || 'text-dark-300 bg-dark-700 border-dark-500';

  return (
    <a
      href={problem.url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 p-3 rounded-lg bg-dark-800 border border-dark-600 hover:border-brand-500 transition-all group"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-dark-300">LeetCode #{problem.id}</span>
          <span className={`text-xs px-1.5 py-0.5 rounded border ${diffColor}`}>
            {problem.difficulty}
          </span>
        </div>
        <p className="text-sm font-medium text-white truncate mt-0.5">{problem.title}</p>
      </div>
      <ExternalLink size={14} className="shrink-0 text-dark-300 group-hover:text-brand-400 transition-colors" />
    </a>
  );
}

// ─── Hint System ─────────────────────────────────────────────────────────────
function HintSystem({ hints }) {
  const [revealed, setRevealed] = useState(0);

  if (!hints || hints.length === 0) return null;

  return (
    <div className="mt-4 space-y-2">
      <h3 className="text-sm font-semibold text-dark-300 uppercase tracking-wide">Hints</h3>
      {hints.slice(0, revealed).map((hint, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-2 bg-dark-800 border border-brand-900 rounded-lg p-3"
        >
          <Lightbulb size={14} className="text-warning shrink-0 mt-0.5" />
          <p className="text-sm text-dark-200">{hint}</p>
        </motion.div>
      ))}
      {revealed < hints.length && (
        <button
          onClick={() => setRevealed(r => r + 1)}
          className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1.5 transition-colors"
        >
          <Lightbulb size={14} />
          Reveal Hint {revealed + 1}/{hints.length}
        </button>
      )}
    </div>
  );
}

// ─── Complexity Table ─────────────────────────────────────────────────────────
function ComplexityTable({ complexity }) {
  if (!complexity) return null;
  return (
    <div className="mt-4 bg-dark-800 border border-dark-600 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-dark-300 uppercase tracking-wide mb-3 flex items-center gap-2">
        <Clock size={14} /> Complexity Analysis
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-dark-700 rounded-lg p-3">
          <div className="text-xs text-dark-300 mb-1 flex items-center gap-1">
            <Clock size={10} /> Time
          </div>
          <div className="font-mono text-brand-300 font-bold">{complexity.time}</div>
        </div>
        <div className="bg-dark-700 rounded-lg p-3">
          <div className="text-xs text-dark-300 mb-1 flex items-center gap-1">
            <HardDrive size={10} /> Space
          </div>
          <div className="font-mono text-brand-300 font-bold">{complexity.space}</div>
        </div>
      </div>
      {complexity.notes && (
        <p className="text-xs text-dark-300 mt-2 italic">{complexity.notes}</p>
      )}
    </div>
  );
}

// ─── Model Answer ─────────────────────────────────────────────────────────────
function ModelAnswer({ code, attempts }) {
  const [show, setShow] = useState(false);

  const canReveal = attempts >= 3;

  return (
    <div className="mt-4">
      <button
        onClick={() => canReveal && setShow(!show)}
        disabled={!canReveal}
        className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg border transition-all ${
          canReveal
            ? 'border-brand-600 text-brand-400 hover:border-brand-400 hover:bg-brand-900/20'
            : 'border-dark-600 text-dark-400 cursor-not-allowed'
        }`}
      >
        {show ? <EyeOff size={14} /> : <Eye size={14} />}
        {show ? 'Hide Answer' : canReveal ? 'Show Model Answer' : `Model Answer (after 3 attempts — ${3 - attempts} left)`}
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2 bg-dark-800 border border-brand-800 rounded-lg p-4">
              <pre className="text-sm text-green-300 font-mono whitespace-pre-wrap overflow-x-auto">{code}</pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Notes Panel ─────────────────────────────────────────────────────────────
function LessonNotes({ notes = [], onSaveNote, onDeleteNote }) {
  const [draft, setDraft] = useState('');
  const taRef = useRef(null);

  function relativeTime(ts) {
    const diff = Date.now() - ts;
    const m = Math.floor(diff / 60000);
    if (m < 1)  return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  }

  function handleAdd() {
    if (!draft.trim()) return;
    onSaveNote(draft);
    setDraft('');
    if (taRef.current) taRef.current.focus();
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Input */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.04)' }}>
        <textarea
          ref={taRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleAdd(); }}
          placeholder="Write a note for this lesson… (Ctrl+Enter to save)"
          rows={3}
          className="w-full bg-transparent text-sm text-slate-200 px-4 pt-3 pb-2 resize-none outline-none placeholder:text-dark-500 font-mono"
        />
        <div className="flex items-center justify-between px-4 pb-2">
          <span className="text-[10px] text-dark-600">Ctrl+Enter to save</span>
          <button
            onClick={handleAdd}
            disabled={!draft.trim()}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: draft.trim() ? 'linear-gradient(135deg,#4f46e5,#6366f1)' : 'rgba(255,255,255,0.06)', color: 'white' }}
          >
            <Plus size={11} /> Add Note
          </button>
        </div>
      </div>

      {/* Saved notes */}
      {notes.length === 0 ? (
        <p className="text-xs text-dark-500 text-center py-4">No notes yet. Add one above.</p>
      ) : (
        <div className="flex flex-col gap-2">
          <AnimatePresence>
            {notes.map(note => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="group flex gap-3 rounded-xl p-3"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <StickyNote size={14} className="shrink-0 mt-0.5 text-indigo-400/60" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap break-words">{note.text}</p>
                  <span className="text-[10px] text-dark-600 mt-1 block">{relativeTime(note.ts)}</span>
                </div>
                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="shrink-0 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-all hover:bg-red-900/30 text-dark-500 hover:text-red-400"
                >
                  <Trash2 size={12} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// ─── Main Lesson Content ──────────────────────────────────────────────────────
export default function LessonContent({ lesson, attempts = 0, notes = [], onSaveNote, onDeleteNote, currentUser, isAdmin }) {
  const [activeTab, setActiveTab] = useState('lesson');
  const feedbackBadge = useFeedbackBadge(lesson?.id, currentUser, isAdmin);

  if (!lesson) return null;

  const TABS = [
    { id: 'lesson',     label: '📖 Lesson' },
    { id: 'practice',   label: '🧪 Practice' },
    { id: 'notes',      label: notes.length > 0 ? `📝 Notes (${notes.length})` : '📝 Notes' },
    { id: 'discussion', label: feedbackBadge > 0 ? `💬 Comments (${feedbackBadge})` : '💬 Comments' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-dark-600 shrink-0">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'tab-active'
                : 'text-dark-300 hover:text-white border-b-2 border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-24">
        {activeTab === 'discussion' ? (
          <DiscussionPanel lessonId={lesson.id} lessonTitle={lesson.title} currentUser={currentUser} isAdmin={isAdmin} />
        ) : activeTab === 'notes' ? (
          <LessonNotes notes={notes} onSaveNote={onSaveNote} onDeleteNote={onDeleteNote} />
        ) : activeTab === 'lesson' ? (
          <>
            <div className="lesson-prose">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {lesson.content}
              </ReactMarkdown>
            </div>

            <ComplexityTable complexity={lesson.complexity} />

            {/* LeetCode Problems */}
            {lesson.leetcodeProblems && lesson.leetcodeProblems.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-dark-300 uppercase tracking-wide mb-3">
                  🔗 LeetCode Challenge
                </h3>
                <div className="space-y-2">
                  {lesson.leetcodeProblems.map(p => (
                    <LeetCodeCard key={p.id} problem={p} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-4 bg-dark-800 border border-brand-900 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-brand-300 mb-1">🎯 Challenge</h3>
              <p className="text-sm text-dark-200">
                Read the starter code carefully. Implement the solution and click <strong className="text-white">Run Tests</strong> to verify.
              </p>
            </div>

            <HintSystem hints={lesson.hints} />

            <ModelAnswer code={lesson.modelAnswer} attempts={attempts} />
          </>
        )}
      </div>
    </div>
  );
}
