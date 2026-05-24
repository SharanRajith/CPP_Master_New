import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  collection, addDoc, deleteDoc, doc,
  onSnapshot, serverTimestamp, query, orderBy,
  updateDoc, getDocs, where,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Trash2, Send, CheckCircle2, Inbox, CornerDownRight, X, AtSign } from 'lucide-react';

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

function Avatar({ photoURL, displayName, small = false }) {
  const sz = small ? 'w-6 h-6' : 'w-7 h-7';
  if (photoURL) return <img src={photoURL} alt="" className={`${sz} rounded-full shrink-0 ring-1 ring-dark-600 mt-0.5 object-cover`} />;
  return (
    <div className={`${sz} rounded-full shrink-0 flex items-center justify-center text-xs font-bold text-white mt-0.5`}
      style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
      {(displayName || 'A').charAt(0).toUpperCase()}
    </div>
  );
}

function CommentText({ text }) {
  const parts = text.split(/(@\w+)/g);
  return (
    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap break-words">
      {parts.map((part, i) =>
        /^@\w+$/.test(part)
          ? <span key={i} className="text-indigo-400 font-semibold">{part}</span>
          : part
      )}
    </p>
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
export default function DiscussionPanel({ lessonId, lessonTitle, currentUser, isAdmin }) {
  const [comments,    setComments]    = useState([]);
  const [draft,       setDraft]       = useState('');
  const [posting,     setPosting]     = useState(false);
  const [sent,        setSent]        = useState(false);
  const [replyingTo,  setReplyingTo]  = useState(null);
  const [replyText,   setReplyText]   = useState('');
  const [sending,     setSending]     = useState(false);
  const [replyError,  setReplyError]  = useState('');
  const [allUsers,    setAllUsers]    = useState([]);
  const [mentionList, setMentionList] = useState([]);
  const [showMention, setShowMention] = useState(false);
  const taRef = useRef(null);

  // Load all comments (public thread, newest first)
  useEffect(() => {
    if (!lessonId) return;
    const q = query(collection(db, 'discussions', lessonId, 'comments'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, snap => {
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setComments(docs);
      if (isAdmin) {
        docs.forEach(c => {
          if (!c.read) updateDoc(doc(db, 'discussions', lessonId, 'comments', c.id), { read: true }).catch(() => {});
        });
      }
    }, () => {});
  }, [lessonId, isAdmin]);

  // Load users for @mention autocomplete
  useEffect(() => {
    getDocs(collection(db, 'users')).then(snap => {
      setAllUsers(snap.docs.map(d => ({ uid: d.id, ...d.data() })));
    }).catch(() => {});
  }, []);

  function handleDraftChange(e) {
    const val = e.target.value;
    setDraft(val);
    const cursor = e.target.selectionStart;
    const before = val.slice(0, cursor);
    const match = before.match(/@(\w*)$/);
    if (match) {
      const q = match[1].toLowerCase();
      const filtered = allUsers
        .filter(u => u.displayName?.toLowerCase().includes(q))
        .slice(0, 5);
      setMentionList(filtered);
      setShowMention(filtered.length > 0);
    } else {
      setShowMention(false);
    }
  }

  function insertMention(user) {
    const ta = taRef.current;
    if (!ta) return;
    const cursor = ta.selectionStart;
    const before = draft.slice(0, cursor);
    const after  = draft.slice(cursor);
    const atIdx  = before.lastIndexOf('@');
    const handle = (user.displayName || 'user').replace(/\s+/g, '');
    const newText = before.slice(0, atIdx) + '@' + handle + ' ' + after;
    setDraft(newText);
    setShowMention(false);
    setTimeout(() => ta.focus(), 0);
  }

  async function handlePost() {
    if (!draft.trim() || posting) return;
    setPosting(true);
    localStorage.setItem(`cpp_reply_seen_${lessonId}`, Date.now().toString());
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
      // Best-effort notification — don't block comment posting if this fails
      addDoc(collection(db, 'notifications'), {
        lessonId,
        lessonTitle:  lessonTitle || lessonId,
        uid:          currentUser.uid,
        displayName:  currentUser.displayName || 'Anonymous',
        photoURL:     currentUser.photoURL    || '',
        text:         draft.trim(),
        createdAt:    serverTimestamp(),
        read:         false,
      }).catch(() => {});
      setDraft('');
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } finally {
      setPosting(false);
    }
  }

  async function handleDelete(id) {
    await deleteDoc(doc(db, 'discussions', lessonId, 'comments', id));
  }

  async function handleReply(commentId) {
    if (!replyText.trim() || sending) return;
    setSending(true);
    setReplyError('');
    try {
      await updateDoc(doc(db, 'discussions', lessonId, 'comments', commentId), {
        'adminReply.text':        replyText.trim(),
        'adminReply.createdAt':   serverTimestamp(),
        'adminReply.displayName': currentUser.displayName || 'Admin',
        'adminReply.photoURL':    currentUser.photoURL    || '',
      });
      setReplyingTo(null);
      setReplyText('');
    } catch (err) {
      setReplyError('Failed to send reply. Try again.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Compose box */}
      <div className="relative">
        <div
          className="rounded-xl overflow-visible"
          style={{ border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.04)' }}
        >
          <textarea
            ref={taRef}
            value={draft}
            onChange={handleDraftChange}
            onKeyDown={e => {
              if (e.key === 'Escape') { setShowMention(false); return; }
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { setShowMention(false); handlePost(); }
            }}
            placeholder="Ask a question or share your thoughts… (Ctrl+Enter to post)"
            rows={3}
            className="w-full bg-transparent text-sm text-slate-200 px-4 pt-3 pb-2 resize-none outline-none placeholder:text-dark-500"
          />
          <div className="flex items-center justify-between px-4 pb-3">
            <span className="text-[10px] text-dark-600 flex items-center gap-1">
              <AtSign size={9} /> @name to mention
            </span>
            <button
              onClick={handlePost}
              disabled={!draft.trim() || posting}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: draft.trim() ? 'linear-gradient(135deg,#4f46e5,#6366f1)' : 'rgba(255,255,255,0.06)', color: 'white' }}
            >
              <Send size={11} /> {posting ? 'Posting…' : 'Post'}
            </button>
          </div>
        </div>

        {/* @mention dropdown */}
        <AnimatePresence>
          {showMention && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.1 }}
              className="absolute left-0 right-0 top-full mt-1 rounded-xl overflow-hidden z-20 shadow-2xl"
              style={{ background: 'rgba(20,18,48,0.97)', border: '1px solid rgba(99,102,241,0.25)' }}
            >
              {mentionList.map(u => (
                <button
                  key={u.uid}
                  onMouseDown={e => { e.preventDefault(); insertMention(u); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-dark-700 transition-all text-left"
                >
                  <Avatar photoURL={u.photoURL} displayName={u.displayName} small />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{u.displayName}</p>
                    {u.isAdmin && <p className="text-[10px] text-indigo-400">Admin</p>}
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sent confirmation */}
      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-emerald-400 font-medium"
            style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}
          >
            <CheckCircle2 size={14} /> Comment posted!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thread */}
      {comments.length === 0 ? (
        <div className="text-center py-10">
          <Inbox size={30} className="mx-auto mb-2 text-dark-600" />
          <p className="text-xs text-dark-500">No comments yet. Be the first to ask!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-[10px] text-dark-500 uppercase tracking-widest font-bold">
            {comments.length} comment{comments.length !== 1 ? 's' : ''}
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
                <div className="flex gap-3">
                  <Avatar photoURL={c.photoURL} displayName={c.displayName} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-semibold text-white">{c.displayName}</span>
                      {isAdmin && c.email && (
                        <span className="text-[10px] text-dark-600">{c.email}</span>
                      )}
                      <span className="text-[10px] text-dark-600 ml-auto">{relativeTime(c.createdAt)}</span>
                    </div>
                    <CommentText text={c.text} />
                  </div>
                  {(isAdmin || c.uid === currentUser?.uid) && (
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="opacity-0 group-hover:opacity-100 shrink-0 p-1.5 rounded-lg text-dark-500 hover:text-red-400 hover:bg-red-900/20 transition-all self-start"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>

                {/* Existing admin reply */}
                {c.adminReply && replyingTo !== c.id && (
                  <div className="mt-3 ml-10 pl-3 border-l-2 border-indigo-600/40 flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <p className="text-[10px] text-indigo-400 font-semibold mb-0.5 flex items-center gap-1.5 flex-wrap">
                        {c.adminReply.displayName || 'Admin'}
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                          style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc' }}>
                          Admin
                        </span>
                        <span className="text-dark-500 font-normal">replied · {relativeTime(c.adminReply.createdAt)}</span>
                      </p>
                      <CommentText text={c.adminReply.text} />
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => { setReplyingTo(c.id); setReplyText(c.adminReply.text); }}
                        className="text-[10px] text-dark-500 hover:text-indigo-400 transition-colors shrink-0"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                )}

                {/* Reply compose (admin only) */}
                {isAdmin && replyingTo === c.id ? (
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
                      {replyError && <p className="text-[10px] text-red-400 px-3 pb-1">{replyError}</p>}
                      <div className="flex items-center justify-end gap-2 px-3 pb-2">
                        <button
                          onClick={() => { setReplyingTo(null); setReplyError(''); }}
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
                ) : isAdmin && !c.adminReply && (
                  <button
                    onClick={() => { setReplyingTo(c.id); setReplyText(''); }}
                    className="mt-2 ml-10 flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <CornerDownRight size={11} /> Reply
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
