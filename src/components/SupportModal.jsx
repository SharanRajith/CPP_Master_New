import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Headphones, Mail, MessageSquare, ChevronRight, CheckCircle2, Clock, Zap } from 'lucide-react';

const TOPICS = [
  'Account & Billing',
  'Premium Access',
  'Course Content',
  'Technical Issue',
  'Feature Request',
  'Other',
];

export default function SupportModal({ onClose, currentUser, isPremium }) {
  const [topic, setTopic]     = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent]       = useState(false);

  const subject = encodeURIComponent(`[CppMaster Support] ${topic || 'General Inquiry'}`);
  const body    = encodeURIComponent(
    `Name: ${currentUser?.displayName || ''}\nEmail: ${currentUser?.email || ''}\nPlan: ${isPremium ? 'Premium' : 'Free'}\nTopic: ${topic}\n\n${message}`
  );

  function handleSend(e) {
    e.preventDefault();
    window.location.href = `mailto:sharanrajithk@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

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
          className="w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl relative"
          style={{
            background: 'linear-gradient(160deg, #050b1a 0%, #080808 60%, #050a18 100%)',
            border: '1px solid rgba(99,102,241,0.2)',
            boxShadow: '0 -4px 60px rgba(99,102,241,0.08)',
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
          <div className="relative overflow-hidden px-6 sm:px-8 pt-8 pb-5">
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% -20%, rgba(99,102,241,0.12), transparent 65%)' }} />
            <div className="relative flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
                <Headphones size={18} className="text-indigo-400" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">Priority Support</h2>
                {isPremium ? (
                  <p className="text-xs text-indigo-400 font-semibold">Response within 24 hours</p>
                ) : (
                  <p className="text-xs text-dark-400">Available to Premium members</p>
                )}
              </div>
            </div>
          </div>

          {/* Response time chips */}
          <div className="flex gap-3 px-6 sm:px-8 mb-6">
            {[
              { icon: <Clock size={12} />, text: '< 24h response', color: '#34d399' },
              { icon: <Zap size={12} />,   text: 'Direct to founder', color: '#a5b4fc' },
              { icon: <MessageSquare size={12} />, text: 'Email thread', color: '#f59e0b' },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: c.color }}>
                {c.icon}{c.text}
              </div>
            ))}
          </div>

          {sent ? (
            <div className="px-6 sm:px-8 pb-10 flex flex-col items-center gap-4 text-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)' }}>
                <CheckCircle2 size={28} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-bold text-base">Message sent!</p>
                <p className="text-dark-400 text-sm mt-1">Your email client should have opened. We'll reply within 24 hours.</p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="px-6 sm:px-8 pb-8 flex flex-col gap-4">

              {!isPremium && (
                <div className="rounded-xl p-4 text-sm"
                  style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                  <p className="text-yellow-400 font-semibold mb-1">Priority queue for Premium members</p>
                  <p className="text-dark-400 text-xs">Free users can still reach us — we'll respond as soon as we can. Upgrade for guaranteed 24 h replies.</p>
                </div>
              )}

              {/* Topic */}
              <div>
                <label className="block text-xs font-semibold text-dark-300 mb-2">Topic</label>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={topic === t
                        ? { background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.4)' }
                        : { background: 'rgba(255,255,255,0.04)', color: '#6b7280', border: '1px solid rgba(255,255,255,0.08)' }
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-dark-300 mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={5}
                  required
                  placeholder="Describe your issue or question in detail…"
                  className="w-full px-4 py-3 rounded-xl text-sm text-slate-300 outline-none resize-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#cbd5e1' }}
                />
              </div>

              {/* Prefill info */}
              <div className="rounded-xl p-3 text-xs text-dark-400"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                Sending as <span className="text-white font-semibold">{currentUser?.displayName || 'you'}</span> · {currentUser?.email} · {isPremium ? 'Premium' : 'Free'} plan
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', boxShadow: '0 4px 20px rgba(99,102,241,0.25)' }}
              >
                <Mail size={14} /> Open Email & Send
                <ChevronRight size={14} className="ml-auto" />
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
