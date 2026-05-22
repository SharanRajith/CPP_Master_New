import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  collection, addDoc, deleteDoc, doc,
  onSnapshot, serverTimestamp, query, orderBy,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Trash2, Send, MessageSquare, CheckCircle2, Inbox } from 'lucide-react';

function relativeTime(ts) {
  if (!ts?.toMillis) return '';
  const diff = Date.now() - ts.toMillis();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7)  return `${d}d ago`;
  return ts.toDate().toLocaleDateString();
}

// ─── Admin view — sees all feedback ──────────────────────────────────────────
function AdminView({ lessonId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'discussions', lessonId, 'comments'),
      orderBy('createdAt', 'desc'),
    );
    return onSnapshot(q, snap =>
      setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }, [lessonId]);

  async function handleDelete(id) {
    await deleteDoc(doc(db, 'discussions', lessonId, 'comments', id));
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-10">
        <Inbox size={30} className="mx-auto mb-2 text-dark-600" />
        <p className="text-xs text-dark-500">No feedback yet for this lesson.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[10px] text-dark-500 uppercase tracking-widest font-bold">
        {comments.length} submission{comments.length !== 1 ? 's' : ''}
      </p>
      <AnimatePresence initial={false}>
        {comments.map(c => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="group flex gap-3 rounded-xl p-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {c.photoURL ? (
              <img src={c.photoURL} alt="" className="w-7 h-7 rounded-full shrink-0 ring-1 ring-dark-600 mt-0.5" />
            ) : (
              <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-white mt-0.5"
                style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
                {(c.displayName || 'A').charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs font-semibold text-white">{c.displayName}</span>
                {c.email && <span className="text-[10px] text-dark-600">{c.email}</span>}
                <span className="text-[10px] text-dark-600 ml-auto">{relativeTime(c.createdAt)}</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap break-words">{c.text}</p>
            </div>
            <button
              onClick={() => handleDelete(c.id)}
              className="opacity-0 group-hover:opacity-100 shrink-0 p-1.5 rounded-lg text-dark-500 hover:text-red-400 hover:bg-red-900/20 transition-all self-start"
            >
              <Trash2 size={13} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── User view — submit only ──────────────────────────────────────────────────
function UserView({ lessonId, currentUser }) {
  const [draft,   setDraft]   = useState('');
  const [posting, setPosting] = useState(false);
  const [sent,    setSent]    = useState(false);
  const taRef = useRef(null);

  async function handlePost() {
    if (!draft.trim() || posting) return;
    setPosting(true);
    try {
      await addDoc(collection(db, 'discussions', lessonId, 'comments'), {
        uid:         currentUser.uid,
        displayName: currentUser.displayName || 'Anonymous',
        photoURL:    currentUser.photoURL    || '',
        email:       currentUser.email       || '',
        text:        draft.trim(),
        createdAt:   serverTimestamp(),
      });
      setDraft('');
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    } finally {
      setPosting(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl p-4"
        style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <p className="text-xs text-dark-400 mb-1 font-medium">
          Have a question or suggestion about this lesson?
        </p>
        <p className="text-[11px] text-dark-600">Your feedback goes directly to the instructors.</p>
      </div>

      <div className="rounded-xl overflow-hidden"
        style={{ border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.04)' }}>
        <textarea
          ref={taRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handlePost(); }}
          placeholder="Write your feedback or question… (Ctrl+Enter to send)"
          rows={4}
          className="w-full bg-transparent text-sm text-slate-200 px-4 pt-3 pb-2 resize-none outline-none placeholder:text-dark-500"
        />
        <div className="flex items-center justify-between px-4 pb-3">
          <span className="text-[10px] text-dark-600">Ctrl+Enter to send</span>
          <button
            onClick={handlePost}
            disabled={!draft.trim() || posting}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: draft.trim() ? 'linear-gradient(135deg,#4f46e5,#6366f1)' : 'rgba(255,255,255,0.06)',
              color: 'white',
            }}
          >
            <Send size={11} /> Send
          </button>
        </div>
      </div>

      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-emerald-400 font-medium"
            style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}
          >
            <CheckCircle2 size={14} /> Feedback sent — thanks!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function DiscussionPanel({ lessonId, currentUser, isAdmin }) {
  if (isAdmin) return <AdminView lessonId={lessonId} />;
  return <UserView lessonId={lessonId} currentUser={currentUser} />;
}
