import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, CheckCircle2, Mail, Zap, Lock, BarChart2, Swords, Users, FileText, Headphones, Map } from 'lucide-react';

const FREE_ITEMS = [
  'C++ Fundamentals (14 lessons)',
  'Object-Oriented Programming',
  'STL Deep Dive',
  'Complexity Analysis',
  'Arrays, Strings & Two Pointers',
  'Sorting & Searching',
  'Embedded C & DBMS tracks',
  'Algorithm Visualizer (Sort, Trees, Graphs)',
  'In-browser C++ & C compiler',
  'Daily coding challenges',
  'Leaderboard, XP & achievements',
  'Public comments on every lesson',
];

const PREMIUM_ITEMS = [
  { text: 'Linked Lists, Stacks & Queues' },
  { text: 'Trees, Heaps & Priority Queues' },
  { text: 'Graphs — BFS, DFS, Dijkstra, MST' },
  { text: 'Dynamic Programming (1D → Bitmask)' },
  { text: 'Advanced Algorithms & Segment Trees' },
  { text: 'Interview Patterns & System Design DSA' },
  { text: 'Mock interview mode — timed & graded', star: true },
  { text: 'Company-tagged sets: Google · Meta · Amazon', star: true },
  { text: 'FAANG Problem Bank — 15 curated problems', star: true },
  { text: 'Personalized study roadmap', star: true },
  { text: 'Official completion certificate', star: true },
  { text: 'Priority support — response within 24 h', star: true },
];

export default function PremiumModal({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl relative"
          style={{
            background: 'linear-gradient(160deg, #0d0b00 0%, #080808 60%, #0a0800 100%)',
            border: '1px solid rgba(245,158,11,0.25)',
            boxShadow: '0 -4px 60px rgba(245,158,11,0.08), 0 0 0 1px rgba(245,158,11,0.08)',
          }}
          initial={{ y: 80, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-dark-400 hover:text-white hover:bg-dark-700 transition-all"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="relative overflow-hidden px-6 sm:px-10 pt-8 pb-6 text-center">
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% -20%, rgba(245,158,11,0.14), transparent 65%)' }} />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
                style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b' }}>
                <Crown size={12} /> Premium Plan
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Go from Good to{' '}
                <span style={{ background: 'linear-gradient(90deg,#f59e0b,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  FAANG‑Ready
                </span>
              </h2>
              <p className="text-dark-400 text-sm max-w-md mx-auto">
                Unlock 7 advanced modules, mock interviews, company-tagged problem sets, and a personalized roadmap — everything you need to crack top-tier tech interviews.
              </p>
            </div>
          </div>

          {/* Comparison cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 sm:px-8 pb-6">

            {/* Free */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-base font-black text-white">Free</p>
                  <p className="text-xs text-dark-500 mt-0.5">No credit card needed</p>
                </div>
                <span className="text-xl font-black text-white">$0</span>
              </div>
              <ul className="space-y-2.5">
                {FREE_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-dark-200">
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 py-2.5 rounded-xl text-center text-xs font-semibold text-dark-500 border border-dark-700">
                Your current plan
              </div>
            </div>

            {/* Premium */}
            <div className="rounded-2xl p-5 relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(35,22,0,0.95), rgba(18,11,0,0.98))',
                border: '1px solid rgba(245,158,11,0.35)',
                boxShadow: '0 0 30px rgba(245,158,11,0.06)',
              }}>
              <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 80% 20%, rgba(245,158,11,0.1), transparent 60%)' }} />

              {/* Badge */}
              <div className="absolute top-3.5 right-3.5 px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)', color: 'white' }}>
                ⭐ Popular
              </div>

              <div className="flex items-center gap-2 mb-1">
                <Crown size={16} className="text-yellow-400" />
                <p className="text-base font-black text-white">Premium</p>
              </div>
              <p className="text-xs text-yellow-700 mb-4">Everything in Free, plus:</p>

              <ul className="space-y-2.5 relative">
                {PREMIUM_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm">
                    <Crown size={11} className="shrink-0" style={{ color: '#f59e0b' }} />
                    <span style={{ color: '#e5e7eb' }}>{item.text}</span>
                  </li>
                ))}
              </ul>

              <a
                href="mailto:sharanrajithk@gmail.com?subject=CppMaster Premium Access Request"
                className="mt-5 flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98] relative"
                style={{
                  background: 'linear-gradient(135deg,#f59e0b,#f97316)',
                  boxShadow: '0 4px 20px rgba(245,158,11,0.3)',
                }}
              >
                <Mail size={14} /> Request Premium Access
              </a>
              <p className="text-center text-xs text-yellow-900/80 mt-2">Get access within 24 hours</p>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-px mx-6 sm:mx-8 mb-6 rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
            {[
              { icon: <Zap size={14} className="text-yellow-400" />,   value: '120+', label: 'Lessons' },
              { icon: <Crown size={14} className="text-yellow-400" />, value: '7',    label: 'Premium Modules' },
              { icon: <Lock size={14} className="text-yellow-400" />,  value: '15',   label: 'FAANG Problems' },
              { icon: <Swords size={14} className="text-yellow-400" />,value: '∞',    label: 'Daily Challenges' },
              { icon: <FileText size={14} className="text-yellow-400" />, value: '1', label: 'Certificate' },
              { icon: <Headphones size={14} className="text-yellow-400" />, value: '24h', label: 'Support' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1 py-3 text-center"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                {s.icon}
                <span className="text-base font-black text-white">{s.value}</span>
                <span className="text-[10px] text-dark-400">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
