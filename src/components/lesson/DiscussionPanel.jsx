import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  collection, addDoc, deleteDoc, doc,
  onSnapshot, updateDoc, arrayUnion, arrayRemove,
  serverTimestamp, query, orderBy,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Heart, Trash2, Send, MessageSquare } from 'lucide-react';

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

export default function DiscussionPanel({ lessonId, currentUser, isAdmin }) {
  const [comments, setComments] = useState([]);
  const [draft,    setDraft]    = useState('');
  const [posting,  setPosting]  = useState(false);
  const taRef = useRef(null);

  useEffect(() => {
    if (!lessonId) return;
    const q = query(
      collection(db, 'discussions', lessonId, 'comments'),
      orderBy('createdAt', 'desc'),
    );
    return onSnapshot(q, snap =>
      setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }, [lessonId]);

  async function handlePost() {
    if (!draft.trim() || !currentUser || posting) return;
    setPosting(true);
    try {
      await addDoc(collection(db, 'discussions', lessonId, 'comments'), {
        uid:         currentUser.uid,
        displayName: currentUser.displayName || 'Anonymous',
        photoURL:    currentUser.photoURL    || '',
        text:        draft.trim(),
        createdAt:   serverTimestamp(),
        likedBy:     [],
      });
      setDraft('');
      taRef.current?.focus();
    } finally {
      setPosting(false);
    }
  }

  async function handleLike(comment) {
    if (!currentUser) return;
    const ref   = doc(db, 'discussions', lessonId, 'comments', comment.id);
    const liked = (comment.likedBy || []).includes(currentUser.uid);
    await updateDoc(ref, {
      likedBy: liked ? arrayRemove(currentUser.uid) : arrayUnion(currentUser.uid),
    });
  }

  async function handleDelete(commentId) {
    await deleteDoc(doc(db, 'discussions', lessonId, 'comments', commentId));
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Input */}
      <div className="rounded-xl overflow-hidden"
        style={{ border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.04)' }}>
        <textarea
          ref={taRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handlePost(); }}
          placeholder="Ask a question or share a thought… (Ctrl+Enter to post)"
          rows={3}
          className="w-full bg-transparent text-sm text-slate-200 px-4 pt-3 pb-2 resize-none outline-none placeholder:text-dark-500"
        />
        <div className="flex items-center justify-between px-4 pb-3">
          <span className="text-[10px] text-dark-600">Ctrl+Enter to post</span>
          <button
            onClick={handlePost}
            disabled={!draft.trim() || posting}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: draft.trim() ? 'linear-gradient(135deg,#4f46e5,#6366f1)' : 'rgba(255,255,255,0.06)',
              color: 'white',
            }}
          >
            <Send size={11} /> Post
          </button>
        </div>
      </div>

      {/* Comments list */}
      {comments.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare size={28} className="mx-auto mb-2 text-dark-600" />
          <p className="text-xs text-dark-500">No comments yet. Start the discussion!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {comments.map(c => {
              const liked     = (c.likedBy || []).includes(currentUser?.uid);
              const likeCount = (c.likedBy || []).length;
              const canDelete = isAdmin || c.uid === currentUser?.uid;
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="group flex gap-3 rounded-xl p-3"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {/* Avatar */}
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
                      <span className="text-[10px] text-dark-600">{relativeTime(c.createdAt)}</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap break-words">{c.text}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        onClick={() => handleLike(c)}
                        className="flex items-center gap-1 text-xs transition-colors"
                        style={{ color: liked ? '#f87171' : '#6b7280' }}
                      >
                        <Heart size={11} fill={liked ? '#f87171' : 'none'} />
                        {likeCount > 0 && <span>{likeCount}</span>}
                      </button>
                      {canDelete && (
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs text-dark-500 hover:text-red-400 transition-all"
                        >
                          <Trash2 size={11} /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
