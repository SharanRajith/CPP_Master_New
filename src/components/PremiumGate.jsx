import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Lock, CheckCircle2, Mail } from 'lucide-react';

const PREMIUM_PERKS = [
  'Trees, Heaps & Priority Queues',
  'Graph algorithms (BFS, DFS, Dijkstra, MST)',
  'Dynamic Programming (1D, 2D, Bitmask, Digit DP)',
  'Advanced Topics (Tarjan\'s, Rolling Hash, Game Theory)',
  'Interview Patterns & System Design DSA',
  'FAANG Problem Bank (Google, Meta, Amazon, Microsoft, Apple)',
];

export default function PremiumGate({ lessonTitle, moduleTitle }) {
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-dark-900">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="max-w-md w-full rounded-2xl p-8 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(17,17,24,0.95) 100%)',
          border: '1px solid rgba(251,191,36,0.25)',
        }}
      >
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
          style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)' }}>
          <Crown size={30} className="text-yellow-400" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-black text-white mb-1">Premium Content</h2>
        <p className="text-dark-400 text-sm mb-1">
          <span className="text-yellow-400 font-semibold">{moduleTitle}</span>
        </p>
        <p className="text-dark-400 text-sm mb-6">
          "{lessonTitle}" is part of the Premium plan.
        </p>

        {/* Perks list */}
        <div className="text-left rounded-xl p-4 mb-6"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs font-semibold text-dark-300 uppercase tracking-wide mb-3">
            Premium includes
          </p>
          <ul className="space-y-2">
            {PREMIUM_PERKS.map((perk, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-dark-200">
                <CheckCircle2 size={14} className="text-yellow-400 shrink-0 mt-0.5" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <a
          href="mailto:sharanrajithk@gmail.com?subject=CppMaster Premium Access Request"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all mb-3"
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
            color: 'white',
            boxShadow: '0 4px 20px rgba(245,158,11,0.3)',
          }}
        >
          <Mail size={15} />
          Request Premium Access
        </a>

        <p className="text-xs text-dark-500">
          Contact admin · <span className="text-dark-400">sharanrajithk@gmail.com</span>
        </p>
      </motion.div>
    </div>
  );
}
