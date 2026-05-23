import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { db } from '../lib/firebase';

const TYPE_CONFIG = {
  info: {
    icon: Info,
    gradient: 'linear-gradient(90deg, rgba(79,70,229,0.22) 0%, rgba(99,102,241,0.14) 60%, rgba(79,70,229,0.22) 100%)',
    border: 'rgba(99,102,241,0.5)',
    glow: 'rgba(99,102,241,0.35)',
    iconBg: 'rgba(99,102,241,0.2)',
    iconColor: '#a5b4fc',
    text: '#c7d2fe',
    btn: 'rgba(99,102,241,0.25)',
    btnHover: 'rgba(99,102,241,0.4)',
    btnText: '#a5b4fc',
  },
  warning: {
    icon: AlertTriangle,
    gradient: 'linear-gradient(90deg, rgba(180,83,9,0.25) 0%, rgba(245,158,11,0.15) 60%, rgba(180,83,9,0.25) 100%)',
    border: 'rgba(245,158,11,0.5)',
    glow: 'rgba(245,158,11,0.3)',
    iconBg: 'rgba(245,158,11,0.2)',
    iconColor: '#fcd34d',
    text: '#fde68a',
    btn: 'rgba(245,158,11,0.25)',
    btnHover: 'rgba(245,158,11,0.4)',
    btnText: '#fcd34d',
  },
  success: {
    icon: CheckCircle,
    gradient: 'linear-gradient(90deg, rgba(6,95,70,0.25) 0%, rgba(52,211,153,0.15) 60%, rgba(6,95,70,0.25) 100%)',
    border: 'rgba(52,211,153,0.5)',
    glow: 'rgba(52,211,153,0.3)',
    iconBg: 'rgba(52,211,153,0.2)',
    iconColor: '#6ee7b7',
    text: '#a7f3d0',
    btn: 'rgba(52,211,153,0.25)',
    btnHover: 'rgba(52,211,153,0.4)',
    btnText: '#6ee7b7',
  },
};

export default function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState([]);
  const [dismissed, setDismissed] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cpp_dismissed_announcements') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    const q = query(collection(db, 'announcements'), where('active', '==', true));
    return onSnapshot(q, snap => {
      setAnnouncements(
        snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
      );
    }, () => {});
  }, []);

  const dismiss = (id) => {
    const next = [...dismissed, id];
    setDismissed(next);
    localStorage.setItem('cpp_dismissed_announcements', JSON.stringify(next));
  };

  const visible = announcements.filter(a => !dismissed.includes(a.id));

  return (
    <AnimatePresence>
      {visible.map(a => {
        const cfg = TYPE_CONFIG[a.type] || TYPE_CONFIG.info;
        const Icon = cfg.icon;
        return (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{
              background: cfg.gradient,
              borderBottom: `1px solid ${cfg.border}`,
              boxShadow: `0 4px 24px ${cfg.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
            }}
            className="shrink-0 overflow-hidden"
          >
            {/* animated shimmer line across the top */}
            <motion.div
              className="h-[2px] w-full"
              style={{ background: `linear-gradient(90deg, transparent, ${cfg.border}, transparent)` }}
              animate={{ backgroundPosition: ['200% center', '-200% center'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            <div className="flex items-center gap-3 px-4 py-3">
              {/* pulsing icon badge */}
              <motion.div
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: cfg.iconBg, border: `1px solid ${cfg.border}` }}
                animate={{ boxShadow: [`0 0 0 0 ${cfg.glow}`, `0 0 0 6px transparent`] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              >
                <Icon size={15} style={{ color: cfg.iconColor }} />
              </motion.div>

              {/* megaphone label + message */}
              <div className="flex-1 flex items-center gap-2 min-w-0">
                <Megaphone size={12} style={{ color: cfg.iconColor, flexShrink: 0 }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: cfg.iconColor }}>
                  Announcement
                </span>
                <span className="text-dark-500 text-xs">·</span>
                <span className="text-sm font-medium leading-snug truncate" style={{ color: cfg.text }}>
                  {a.message}
                </span>
              </div>

              {/* Got it button */}
              <motion.button
                onClick={() => dismiss(a.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                style={{ background: cfg.btn, color: cfg.btnText, border: `1px solid ${cfg.border}` }}
                onMouseEnter={e => e.currentTarget.style.background = cfg.btnHover}
                onMouseLeave={e => e.currentTarget.style.background = cfg.btn}
              >
                Got it
              </motion.button>
            </div>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
}
