import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight, CheckCircle2, Lock } from 'lucide-react';
import { CURRICULUM } from '../data/curriculum';

// Flatten all lessons with module metadata once
const ALL_LESSONS = CURRICULUM.flatMap(mod =>
  mod.lessons.map((lesson, idx) => ({
    lessonId:    lesson.id,
    title:       lesson.title,
    moduleTitle: mod.title,
    moduleIcon:  mod.icon,
    moduleColor: mod.color,
    lessonNum:   idx + 1,
    totalLessons: mod.lessons.length,
  }))
);

function highlight(text, query) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded px-0.5" style={{ background: 'rgba(99,102,241,0.35)', color: '#c7d2fe' }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function SearchModal({ onClose, progress, isLessonUnlocked }) {
  const [query,       setQuery]   = useState('');
  const [activeIdx,   setActive]  = useState(0);
  const navigate                  = useNavigate();
  const inputRef                  = useRef(null);
  const listRef                   = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_LESSONS.slice(0, 8);
    return ALL_LESSONS.filter(
      l => l.title.toLowerCase().includes(q) || l.moduleTitle.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [query]);

  // Reset active index when results change
  useEffect(() => { setActive(0); }, [results]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.children[activeIdx];
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  function selectLesson(lessonId) {
    navigate(`/lesson/${lessonId}`);
    onClose();
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(i => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && results[activeIdx]) selectLesson(results[activeIdx].lessonId);
    if (e.key === 'Escape') onClose();
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-xl rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(13,11,28,0.98)',
          border: '1px solid rgba(99,102,241,0.25)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.08)',
        }}
        initial={{ y: -24, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -16, opacity: 0, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-dark-700">
          <Search size={17} className="text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search lessons…"
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder-slate-600"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-600 hover:text-slate-400 transition-colors">
              <X size={15} />
            </button>
          )}
          <kbd className="hidden sm:flex items-center gap-1 text-[10px] text-slate-600 bg-dark-700 rounded px-1.5 py-0.5">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[360px] overflow-y-auto py-1.5">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-slate-600">No lessons found for "{query}"</div>
          ) : (
            results.map((item, i) => {
              const completed = !!progress?.completedLessons?.[item.lessonId];
              const unlocked  = isLessonUnlocked ? isLessonUnlocked(item.lessonId) : true;
              const isActive  = i === activeIdx;

              return (
                <button
                  key={item.lessonId}
                  onClick={() => selectLesson(item.lessonId)}
                  onMouseEnter={() => setActive(i)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                  style={{ background: isActive ? 'rgba(99,102,241,0.1)' : 'transparent' }}
                >
                  {/* Module icon */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
                    style={{ background: `${item.moduleColor}18`, border: `1px solid ${item.moduleColor}30` }}
                  >
                    {item.moduleIcon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white font-medium truncate">
                      {highlight(item.title, query)}
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5 truncate">
                      {item.moduleTitle} · Lesson {item.lessonNum}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="shrink-0 flex items-center gap-1.5">
                    {completed && <CheckCircle2 size={14} className="text-emerald-500" />}
                    {!unlocked && !completed && <Lock size={12} className="text-slate-600" />}
                    {isActive && <ChevronRight size={14} className="text-slate-500" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-dark-700">
          {[
            { keys: ['↑', '↓'], label: 'navigate' },
            { keys: ['↵'],       label: 'open' },
            { keys: ['Esc'],     label: 'close' },
          ].map((hint, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700">
              <div className="flex gap-1">
                {hint.keys.map(k => (
                  <kbd key={k} className="bg-dark-700 rounded px-1.5 py-0.5 text-slate-500">{k}</kbd>
                ))}
              </div>
              {hint.label}
            </div>
          ))}
          <span className="ml-auto text-[11px] text-slate-700">{ALL_LESSONS.length} lessons</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
