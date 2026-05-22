import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Megaphone, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { db } from '../lib/firebase';

const TYPE_CONFIG = {
  info:    { icon: Info,          bg: 'rgba(99,102,241,0.12)',  border: 'rgba(99,102,241,0.3)',  text: '#a5b4fc', label: '#818cf8' },
  warning: { icon: AlertTriangle, bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', text: '#fde68a', label: '#fbbf24' },
  success: { icon: CheckCircle,   bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.3)', text: '#a7f3d0', label: '#34d399' },
};

export default function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState([]);
  const [dismissed, setDismissed] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cpp_dismissed_announcements') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    const q = query(
      collection(db, 'announcements'),
      where('active', '==', true),
      orderBy('createdAt', 'desc'),
    );
    return onSnapshot(q, snap => {
      setAnnouncements(snap.docs.map(d => ({ id: d.id, ...d.data() })));
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            className="flex items-center gap-3 px-4 py-2.5 text-sm shrink-0"
            style={{ background: cfg.bg, borderBottom: `1px solid ${cfg.border}` }}
          >
            <Icon size={15} style={{ color: cfg.label, flexShrink: 0 }} />
            <span style={{ color: cfg.text }} className="flex-1 leading-snug">{a.message}</span>
            <button
              onClick={() => dismiss(a.id)}
              className="p-1 rounded-md transition-all hover:bg-white/10 shrink-0"
              style={{ color: cfg.label }}
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
}
