import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { X, BookMarked } from 'lucide-react';
import { getCheatSheet } from '../../data/cheatsheets';

export default function CheatSheetPanel({ moduleId, moduleTitle, moduleColor, onClose }) {
  const content = getCheatSheet(moduleId);

  return (
    <AnimatePresence>
      <motion.div
        key="cheatsheet-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex justify-end"
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
        onClick={onClose}
      >
        <motion.div
          key="cheatsheet-panel"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative h-full w-full max-w-sm md:max-w-md flex flex-col shadow-2xl"
          style={{ background: '#0e0e1a', borderLeft: `1px solid ${moduleColor}30` }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="shrink-0 flex items-center gap-3 px-5 py-4 border-b border-dark-700"
            style={{ background: `${moduleColor}0e` }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${moduleColor}20`, border: `1px solid ${moduleColor}40` }}>
              <BookMarked size={16} style={{ color: moduleColor }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: moduleColor }}>
                Cheat Sheet
              </p>
              <p className="text-sm font-semibold text-white truncate">{moduleTitle}</p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 p-1.5 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700 transition-all"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 pb-10">
            {content ? (
              <div className="cheatsheet-prose lesson-prose text-sm">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-16">
                <BookMarked size={32} className="mx-auto mb-3 text-dark-600" />
                <p className="text-sm text-dark-500">No cheat sheet for this module yet.</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
