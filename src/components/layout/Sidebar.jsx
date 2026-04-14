import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight, Lock, CheckCircle2, Circle, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CURRICULUM, getAllLessons, getPreviousLessonId } from '../../data/curriculum';

export default function Sidebar({ progress, currentLessonId }) {
  const [expandedModules, setExpandedModules] = useState({ 'module-1': true });
  const allLessons = getAllLessons();

  function toggleModule(moduleId) {
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  }

  function isUnlocked(lesson) {
    const prevId = getPreviousLessonId(lesson.id);
    if (!prevId) return true;
    return !!progress.completedLessons[prevId];
  }

  function getModuleProgress(module) {
    const total     = module.lessons.length;
    const completed = module.lessons.filter(l => progress.completedLessons[l.id]).length;
    return { total, completed, pct: total > 0 ? (completed / total) * 100 : 0 };
  }

  return (
    <aside className="flex flex-col h-full w-full bg-dark-800 border-r border-dark-600 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-4 border-b border-dark-600 shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={16} className="text-brand-400" />
          <span className="text-sm font-semibold text-white">Curriculum</span>
        </div>
        <p className="text-xs text-dark-300">
          {Object.keys(progress.completedLessons).length} / {allLessons.length} lessons
        </p>
      </div>

      {/* Module list */}
      <div className="flex-1 overflow-y-auto">
        {CURRICULUM.map(module => {
          const { total, completed, pct } = getModuleProgress(module);
          const isExpanded = expandedModules[module.id];
          const isAllDone  = completed === total;

          return (
            <div key={module.id} className="border-b border-dark-700">
              {/* Module header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-dark-700 transition-colors text-left"
              >
                <span className="text-lg leading-none shrink-0">{module.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-white truncate">{module.title}</span>
                    {isAllDone
                      ? <CheckCircle2 size={14} className="shrink-0" style={{ color: module.color }} />
                      : null
                    }
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1 bg-dark-600 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: module.color }}
                      />
                    </div>
                    <span className="text-xs text-dark-300 shrink-0">{completed}/{total}</span>
                  </div>
                </div>
                {isExpanded
                  ? <ChevronDown size={14} className="shrink-0 text-dark-300" />
                  : <ChevronRight size={14} className="shrink-0 text-dark-300" />
                }
              </button>

              {/* Lessons */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    {module.lessons.map((lesson, idx) => {
                      const fullLesson  = { ...lesson, id: lesson.id };
                      const unlocked    = isUnlocked(fullLesson);
                      const completed   = !!progress.completedLessons[lesson.id];
                      const isCurrent   = lesson.id === currentLessonId;

                      return (
                        <NavLink
                          key={lesson.id}
                          to={unlocked ? `/lesson/${lesson.id}` : '#'}
                          onClick={!unlocked ? (e) => e.preventDefault() : undefined}
                          className={() =>
                            `flex items-center gap-2.5 px-5 py-2.5 text-sm transition-all ${
                              isCurrent
                                ? 'sidebar-item-active text-white'
                                : unlocked
                                ? 'text-dark-200 hover:text-white hover:bg-dark-700'
                                : 'text-dark-400 cursor-not-allowed opacity-60'
                            }`
                          }
                        >
                          <span className="shrink-0 w-4">
                            {completed
                              ? <CheckCircle2 size={14} style={{ color: module.color }} />
                              : unlocked
                              ? <Circle size={14} className="text-dark-400" />
                              : <Lock size={12} className="text-dark-400" />
                            }
                          </span>
                          <span className="truncate leading-tight">
                            {idx + 1}. {lesson.title}
                          </span>
                        </NavLink>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
