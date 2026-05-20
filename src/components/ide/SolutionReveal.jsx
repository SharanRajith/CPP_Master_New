import React, { useState } from 'react';
import { Eye, EyeOff, Code2, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SolutionReveal({ modelAnswer, isCompleted, attempts }) {
  const [open, setOpen]       = useState(false);
  const [copied, setCopied]   = useState(false);

  const canReveal = isCompleted || attempts >= 3;
  if (!modelAnswer || !canReveal) return null;

  function handleCopy() {
    navigator.clipboard.writeText(modelAnswer).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div className="mx-4 mb-4 mt-1 rounded-xl border border-dark-600 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2 px-3 py-2.5 bg-dark-800 hover:bg-dark-750 transition-colors text-left"
      >
        <Code2 size={13} className="text-indigo-400 shrink-0" />
        <span className="text-xs font-semibold text-dark-200 flex-1">
          Reference Solution
          {!isCompleted && attempts >= 3 && (
            <span className="ml-2 text-dark-500 font-normal">(after 3 attempts)</span>
          )}
        </span>
        {open
          ? <EyeOff size={13} className="text-dark-500" />
          : <Eye size={13} className="text-dark-400" />
        }
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="relative bg-[#080810]">
              <button
                onClick={handleCopy}
                className="absolute top-2.5 right-2.5 flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-dark-600 text-dark-400 hover:text-white hover:border-dark-400 transition-all bg-dark-800/80"
              >
                {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <pre className="text-xs font-mono p-4 pr-20 text-emerald-300/90 overflow-x-auto whitespace-pre leading-relaxed">
                {modelAnswer}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
