import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  collection, addDoc, deleteDoc, doc,
  onSnapshot, serverTimestamp, query, orderBy,
  updateDoc, where,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Trash2, Send, CheckCircle2, Inbox, CornerDownRight, X } from 'lucide-react';

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

function Avatar({ photoURL, displayName }) {
  if (photoURL) return <img src={photoURL} alt="" className="w-7 h-7 rounded-full shrink-0 ring-1 ring-dark-600 mt-0.5" />;
  return (
    <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-white mt-0.5"
      style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
      {(displayName || 'A').charAt(0).toUpperCase()}
    </div>
  );
}

// ─── Admin view — sees all feedback, can reply ────────────────────────────────
function AdminView({ lessonId }) {
  const [comments,   setComments]   = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText,  setReplyText]  = useState('');
  const [sending,    setSending]    = useState(false);

  // Mark all as read when admin opens this panel
  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, 'discussions', lessonId, 'comments'), orderBy('createdAt', 'desc')),
      snap => {
        const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setComments(docs);
        // mark unread ones as read
        docs.forEach(c => {
          if (!c.read) {
            updateDoc(doc(db, 'discussions', lessonId, 'comments', c.id), { read: true }).catch(() => {});
          }
        });
      }
    );
    return unsub;
  }, [lessonId]);

  async function handleDelete(id) {
    await deleteDoc(doc(db, 'discussions', lessonId, 'comments', id));
  }

  async function handleReply(commentId) {
    if (!replyText.trim() || sending) return;
    setSending(true);
    try {
      await updateDoc(doc(db, 'discussions', lessonId, 'comments', commentId), {
        adminReply: { text: replyText.trim(), createdAt: serverTimestamp() },
      });
      setReplyingTo(null);
      setReplyText('');
    } finally {
      setSending(false);
    }
  }

  function startReply(id) {
    setReplyingTo(id);
    setReplyText('');
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
            className="group rounded-xl p-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Comment header */}
            <div className="flex gap-3">
              <Avatar photoURL={c.photoURL} displayName={c.displayName} />
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
            </div>

            {/* Existing reply */}
            {c.adminReply && replyingTo !== c.id && (
              <div className="mt-3 ml-10 pl-3 border-l-2 border-indigo-600/40 flex justify-between items-start gap-2">
                <div>
                  <p className="text-[10px] text-indigo-400 font-semibold mb-0.5">
                    You replied · {relativeTime(c.adminReply.createdAt)}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{c.adminReply.text}</p>
                </div>
                <button
                  onClick={() => { setReplyingTo(c.id); setReplyText(c.adminReply.text); }}
                  className="text-[10px] text-dark-500 hover:text-indigo-400 transition-colors shrink-0"
                >
                  Edit
                </button>
              </div>
            )}

            {/* Reply compose box */}
            {replyingTo === c.id ? (
              <div className="mt-3 ml-10">
                <div className="rounded-lg overflow-hidden" style={{ border: '1px solid rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.05)' }}>
                  <textarea
                    autoFocus
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleReply(c.id); }}
                    placeholder="Write a reply… (Ctrl+Enter to send)"
                    rows={3}
                    className="w-full bg-transparent text-xs text-slate-200 px-3 pt-2 pb-1 resize-none outline-none placeholder:text-dark-600"
                  />
                  <div className="flex items-center justify-end gap-2 px-3 pb-2">
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg text-dark-400 hover:text-white hover:bg-dark-600 transition-all"
                    >
                      <X size={10} /> Cancel
                    </button>
                    <button
                      onClick={() => handleReply(c.id)}
                      disabled={!replyText.trim() || sending}
                      className="flex items-center gap-1 text-xs px-3 py-1 rounded-lg font-semibold transition-all disabled:opacity-40"
                      style={{ background: 'linear-gradient(135deg,#4f46e5,#6366f1)', color: 'white' }}
                    >
                      <Send size={10} /> {sending ? 'Sending…' : 'Send Reply'}
                    </button>
                  </div>
                </div>
              </div>
            ) : !c.adminReply && (
              <button
                onClick={() => startReply(c.id)}
                className="mt-2 ml-10 flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <CornerDownRight size={11} /> Reply
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── User view — submit + see own submissions & replies ───────────────────────
function UserView({ lessonId, currentUser }) {
  const [draft,      setDraft]      = useState('');
  const [posting,    setPosting]    = useState(false);
  const [sent,       setSent]       = useState(false);
  const [myComments, setMyComments] = useState([]);
  const taRef = useRef(null);

  useEffect(() => {
    if (!currentUser?.uid) return;
    // Mark replies as seen
    localStorage.setItem(`cpp_reply_seen_${lessonId}`, Date.now().toString());

    const q = query(
      collection(db, 'discussions', lessonId, 'comments'),
      where('uid', '==', currentUser.uid),
      orderBy('createdAt', 'desc'),
    );
    return onSnapshot(q, snap => setMyComments(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
      () => setMyComments([]));
  }, [lessonId, currentUser?.uid]);

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
        read:        false,
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
        <p className="text-xs text-dark-400 mb-1 font-medium">Have a question or suggestion about this lesson?</p>
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
            style={{ background: draft.trim() ? 'linear-gradient(135deg,#4f46e5,#6366f1)' : 'rgba(255,255,255,0.06)', color: 'white' }}
          >
            <Send size={11} /> Send
          </button>
        </div>
      </div>

      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-emerald-400 font-medium"
            style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}
          >
            <CheckCircle2 size={14} /> Feedback sent — thanks!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Past submissions + replies */}
      {myComments.length > 0 && (
        <div className="flex flex-col gap-2 pt-2 border-t border-dark-700">
          <p className="text-[10px] text-dark-500 uppercase tracking-widest font-bold">Your submissions</p>
          {myComments.map(c => (
            <div key={c.id} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="text-xs text-dark-500 mb-1">{relativeTime(c.createdAt)}</p>
              <p className="text-sm text-slate-300 whitespace-pre-wrap break-words">{c.text}</p>
              {c.adminReply && (
                <div className="mt-3 pl-3 border-l-2 border-indigo-600/50">
                  <p className="text-[10px] text-indigo-400 font-semibold mb-0.5">
                    Instructor replied · {relativeTime(c.adminReply.createdAt)}
                  </p>
                  <p className="text-sm text-slate-200 whitespace-pre-wrap">{c.adminReply.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Badge hook — exported for LessonContent tab indicator ───────────────────
export function useFeedbackBadge(lessonId, currentUser, isAdmin) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!lessonId) return;

    if (isAdmin) {
      return onSnapshot(
        query(collection(db, 'discussions', lessonId, 'comments')),
        snap => setCount(snap.docs.filter(d => !d.data().read).length),
        () => setCount(0),
      );
    }

    if (currentUser?.uid) {
      const lastSeen = parseInt(localStorage.getItem(`cpp_reply_seen_${lessonId}`) || '0');
      const q = query(
        collection(db, 'discussions', lessonId, 'comments'),
        where('uid', '==', currentUser.uid),
      );
      return onSnapshot(q, snap => {
        const newReplies = snap.docs.filter(d => {
          const data = d.data();
          return data.adminReply && (data.adminReply.createdAt?.toMillis() || 0) > lastSeen;
        }).length;
        setCount(newReplies);
      }, () => setCount(0));
    }
  }, [lessonId, isAdmin, currentUser?.uid]);

  return count;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function DiscussionPanel({ lessonId, currentUser, isAdmin }) {
  if (isAdmin) return <AdminView lessonId={lessonId} />;
  return <UserView lessonId={lessonId} currentUser={currentUser} />;
}
