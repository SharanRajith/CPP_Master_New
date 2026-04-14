import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Star, Zap,
  BookOpen, Code2, FlaskConical, CheckCircle2,
} from 'lucide-react';

import CodeEditor      from '../components/ide/CodeEditor';
import CompilerToolbar from '../components/ide/CompilerToolbar';
import TestResults     from '../components/ide/TestResults';
import LessonContent   from '../components/lesson/LessonContent';
import SettingsModal   from '../components/settings/SettingsModal';

import { useCompiler }  from '../hooks/useCompiler';
import { getAllLessons } from '../data/curriculum';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

// ─── Mobile Tabs Config ───────────────────────────────────────────────────────
const MOBILE_TABS = [
  { id: 'lesson', label: 'Lesson',  icon: BookOpen },
  { id: 'editor', label: 'Editor',  icon: Code2 },
  { id: 'tests',  label: 'Tests',   icon: FlaskConical },
];

// ─── XP Toast ────────────────────────────────────────────────────────────────
function XPToast({ xp, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ y: -70, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -70, opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-sm shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
        boxShadow: '0 0 30px rgba(99,102,241,0.5)',
        color: 'white',
        whiteSpace: 'nowrap',
      }}
    >
      <Zap size={15} className="text-yellow-300" />
      +{xp} XP earned!
      <Star size={15} className="text-yellow-300" />
    </motion.div>
  );
}

// ─── Desktop Header Strip ─────────────────────────────────────────────────────
function LessonHeaderStrip({ lesson, isCompleted, prevLesson, nextLesson, navigate }) {
  return (
    <>
      <div className="px-5 py-3 border-b border-dark-600 shrink-0 flex items-center gap-3 bg-dark-900 z-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs text-dark-400 font-medium">Module {lesson.module}</span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-900/20 border border-emerald-700/30 px-1.5 py-0.5 rounded-full">
                <CheckCircle2 size={10} /> Completed
              </span>
            )}
          </div>
          <h1 className="text-base md:text-lg font-bold text-white truncate">{lesson.title}</h1>
        </div>
      </div>

      <LessonContent lesson={lesson} attempts={0} />

      <div className="flex gap-2 p-3 border-t border-dark-600 shrink-0 bg-dark-900">
        {prevLesson && (
          <button
            onClick={() => navigate(`/lesson/${prevLesson.id}`)}
            className="flex items-center gap-1.5 text-sm text-dark-300 hover:text-white px-3 py-2 rounded-lg hover:bg-dark-700 transition-all"
          >
            <ChevronLeft size={14} /> Prev
          </button>
        )}
        <div className="flex-1" />
        {nextLesson && (
          <button
            onClick={() => navigate(`/lesson/${nextLesson.id}`)}
            disabled={!isCompleted}
            className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: isCompleted ? 'linear-gradient(135deg,#4f46e5,#6366f1)' : '',
              color:      isCompleted ? 'white' : '#6b7280',
              border:     isCompleted ? 'none'  : '1px solid #3d3d50',
            }}
          >
            Next <ChevronRight size={14} />
          </button>
        )}
      </div>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LessonPage({ progress, completeLesson, isLessonCompleted, isMobile }) {
  const { lessonId } = useParams();
  const navigate     = useNavigate();
  const allLessons   = getAllLessons();

  const [lesson, setLesson]           = useState(null);
  const [loading, setLoading]         = useState(true);
  const [code, setCode]               = useState('');
  const [attempts, setAttempts]       = useState(0);
  const [showXPToast, setShowXPToast] = useState(false);
  const [xpEarned, setXpEarned]       = useState(0);
  const [mobileTab, setMobileTab]     = useState('lesson');

  const {
    isCompiling, compilerResult, compilerStatus,
    showSettings, setShowSettings, runCode, runTests,
  } = useCompiler();

  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  const prevLesson   = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson   = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const isCompleted  = isLessonCompleted(lessonId);

  // Load lesson data
  useEffect(() => {
    setLoading(true);
    setLesson(null);
    setMobileTab('lesson');
    const meta = allLessons.find(l => l.id === lessonId);
    if (!meta) { setLoading(false); return; }
    meta.file()
      .then(mod => {
        const l = mod.default;
        setLesson(l);
        setCode(l.starterCode || '');
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [lessonId]);

  // Handle test pass
  useEffect(() => {
    if (!compilerResult || compilerResult.type !== 'tests') return;
    if (compilerResult.allPassed && !isCompleted && lesson) {
      completeLesson(lessonId, lesson.xpReward || 10);
      setXpEarned(lesson.xpReward || 10);
      setShowXPToast(true);
    }
    setAttempts(a => a + 1);
  }, [compilerResult]);

  // Auto-switch to tests tab on mobile when tests run
  useEffect(() => {
    if (isMobile && compilerResult?.type === 'tests') {
      setMobileTab('tests');
    }
  }, [compilerResult, isMobile]);

  const handleRun      = useCallback(() => runCode(code),                         [code, runCode]);
  const handleRunTests = useCallback(() => { if (lesson?.testCases) runTests(code, lesson.testCases); }, [code, lesson, runTests]);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-dark-900">
        <div className="flex flex-col items-center gap-4 text-dark-400">
          <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">Loading lesson…</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex-1 flex items-center justify-center text-dark-400">Lesson not found.</div>
    );
  }

  // ── Shared panel renderers ─────────────────────────────────────────────────
  const renderEditor = () => (
    <>
      <CompilerToolbar
        isCompiling={isCompiling}
        compilerStatus={compilerStatus}
        onRun={handleRun}
        onRunTests={handleRunTests}
        onOpenSettings={() => setShowSettings(true)}
        hasTestCases={lesson.testCases?.length > 0}
      />
      <div className="flex-1 min-h-0 bg-[#0d1326] relative">
        <CodeEditor value={code} onChange={val => setCode(val || '')} height="100%" />
      </div>
    </>
  );

  const renderTestResults = () => (
    <>
      <div className="px-4 py-2.5 bg-dark-800 border-b border-dark-600 shrink-0 flex items-center gap-2">
        <FlaskConical size={13} className="text-dark-400" />
        <span className="text-xs font-semibold text-dark-300 uppercase tracking-wide">Test Results</span>
        {compilerResult?.allPassed && (
          <span className="ml-auto text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 size={11} /> All Passed
          </span>
        )}
      </div>
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <TestResults result={compilerResult} isCompiling={isCompiling} />
      </div>
    </>
  );

  // ── Mobile Layout ──────────────────────────────────────────────────────────
  if (isMobile) {
    const tabOrder = ['lesson', 'editor', 'tests'];
    const tabIndex = tabOrder.indexOf(mobileTab);

    return (
      <div className="flex-1 flex flex-col overflow-hidden bg-dark-900">
        {/* XP Toast */}
        <AnimatePresence>
          {showXPToast && <XPToast xp={xpEarned} onDone={() => setShowXPToast(false)} />}
        </AnimatePresence>

        {/* Tab Bar */}
        <div
          className="flex shrink-0 relative"
          style={{ background: '#111118', borderBottom: '1px solid #22222f' }}
        >
          {/* Animated sliding pill */}
          <motion.div
            className="absolute bottom-0 h-0.5 rounded-t-full"
            style={{ background: 'linear-gradient(90deg, #6366f1, #818cf8)' }}
            animate={{ left: `${tabIndex * (100 / 3)}%`, width: `${100 / 3}%` }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
          />

          {MOBILE_TABS.map(({ id, label, icon: Icon }) => {
            const active = mobileTab === id;
            const hasResult = id === 'tests' && compilerResult;
            return (
              <button
                key={id}
                id={`mobile-tab-${id}`}
                onClick={() => setMobileTab(id)}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors relative"
              >
                <div className="relative">
                  <Icon
                    size={17}
                    style={{ color: active ? '#818cf8' : '#6b7280', transition: 'color 0.2s' }}
                  />
                  {/* Green dot when tests pass */}
                  {hasResult && compilerResult.allPassed && id === 'tests' && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-dark-900" />
                  )}
                </div>
                <span
                  className="text-[10px] font-semibold tracking-wide"
                  style={{ color: active ? '#a5b4fc' : '#6b7280', transition: 'color 0.2s' }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content — animated slide */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mobileTab}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute inset-0 flex flex-col overflow-hidden"
            >
              {mobileTab === 'lesson' && (
                <div className="flex flex-col h-full overflow-hidden">
                  {/* Lesson header */}
                  <div className="px-4 py-3 border-b border-dark-600 shrink-0 bg-dark-900">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs text-dark-400">Module {lesson.module}</span>
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-900/20 border border-emerald-700/30 px-2 py-0.5 rounded-full">
                          <CheckCircle2 size={9} /> Done
                        </span>
                      )}
                    </div>
                    <h1 className="text-base font-bold text-white leading-snug">{lesson.title}</h1>
                  </div>

                  {/* Scrollable content */}
                  <div className="flex-1 overflow-y-auto overscroll-contain">
                    <LessonContent lesson={lesson} attempts={attempts} />
                  </div>

                  {/* Prev / Next footer */}
                  <div className="flex gap-2 px-4 py-3 border-t border-dark-600 shrink-0 bg-dark-900">
                    {prevLesson && (
                      <button
                        onClick={() => navigate(`/lesson/${prevLesson.id}`)}
                        className="flex items-center gap-1 text-sm text-dark-300 hover:text-white px-3 py-2 rounded-lg hover:bg-dark-700 transition-all"
                      >
                        <ChevronLeft size={14} /> Prev
                      </button>
                    )}
                    <div className="flex-1" />
                    {/* Code CTA on mobile */}
                    <button
                      onClick={() => setMobileTab('editor')}
                      className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg font-medium transition-all"
                      style={{ background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: 'white' }}
                    >
                      <Code2 size={13} /> Code It
                    </button>
                    {nextLesson && isCompleted && (
                      <button
                        onClick={() => navigate(`/lesson/${nextLesson.id}`)}
                        className="flex items-center gap-1 text-sm px-3 py-2 rounded-lg font-medium transition-all"
                        style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}
                      >
                        Next <ChevronRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {mobileTab === 'editor' && (
                <div className="flex flex-col h-full overflow-hidden">
                  {renderEditor()}
                </div>
              )}

              {mobileTab === 'tests' && (
                <div className="flex flex-col h-full overflow-hidden">
                  {renderTestResults()}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {isCompleted && mobileTab === 'editor' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="shrink-0 px-4 py-2 border-t border-dark-700 bg-dark-900 flex items-center justify-between"
          >
            <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={13} /> Lesson Complete!
            </span>
            {nextLesson && (
              <button
                onClick={() => navigate(`/lesson/${nextLesson.id}`)}
                className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1"
                style={{ background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: 'white' }}
              >
                Next Lesson <ChevronRight size={12} />
              </button>
            )}
          </motion.div>
        )}

        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      </div>
    );
  }

  // ── Desktop Layout ─────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <AnimatePresence>
        {showXPToast && <XPToast xp={xpEarned} onDone={() => setShowXPToast(false)} />}
      </AnimatePresence>

      <PanelGroup direction="horizontal" className="flex-1 flex overflow-hidden">
        <Panel defaultSize={38} minSize={25} className="flex flex-col border-r border-dark-600 overflow-hidden bg-dark-900">
          <LessonHeaderStrip
            lesson={lesson}
            isCompleted={isCompleted}
            prevLesson={prevLesson}
            nextLesson={nextLesson}
            navigate={navigate}
          />
        </Panel>

        <PanelResizeHandle className="w-1.5 bg-dark-600 hover:bg-brand-500 transition-colors cursor-col-resize shrink-0 data-[resize-handle-state=drag]:bg-brand-400" />

        <Panel defaultSize={37} minSize={20} className="flex flex-col border-r border-dark-600">
          {renderEditor()}
        </Panel>

        <PanelResizeHandle className="w-1.5 bg-dark-600 hover:bg-brand-500 transition-colors cursor-col-resize shrink-0 data-[resize-handle-state=drag]:bg-brand-400" />

        <Panel defaultSize={25} minSize={15} className="flex flex-col overflow-hidden bg-dark-900">
          {renderTestResults()}
        </Panel>
      </PanelGroup>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
