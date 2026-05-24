import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  collection, addDoc, deleteDoc, doc,
  onSnapshot, serverTimestamp, query, orderBy,
  updateDoc, getDocs, where, setDoc, getDoc,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Trash2, Send, CheckCircle2, Inbox, CornerDownRight, X, AtSign, Lock, LockOpen } from 'lucide-react';

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
  const [quotingComment, setQuotingComment] = useState(null); // { id, displayName, text }
  const [isLocked,    setIsLocked]    = useState(false);
  const [allUsers,    setAllUsers]    = useState([]);
  const [mentionList, setMentionList] = useState([]);
  const [showMention, setShowMention] = useState(false);
  const taRef    = useRef(null);
  const composeRef = useRef(null);

  // Listen to lock status on the discussion doc
  useEffect(() => {
    if (!lessonId) return;
    return onSnapshot(doc(db, 'discussions', lessonId), snap => {
      setIsLocked(!!snap.data()?.locked);
    }, () => {});
  }, [lessonId]);

  async function toggleLock() {
    await setDoc(doc(db, 'discussions', lessonId), { locked: !isLocked }, { merge: true });
  }

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
        isAdmin:     isAdmin || false,
        ...(quotingComment ? { replyTo: { displayName: quotingComment.displayName, text: quotingComment.text.slice(0, 120) } } : {}),
      });
      // Notify admins of new comments — skip if the poster is already an admin
      if (!isAdmin) addDoc(collection(db, 'notifications'), {
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
      setQuotingComment(null);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } finally {
      setPosting(false);
    }
  }

  async function handleDelete(id) {
    const comment = comments.find(c => c.id === id);
    await deleteDoc(doc(db, 'discussions', lessonId, 'comments', id));
    if (comment) {
      try {
        const q = query(
          collection(db, 'notifications'),
          where('uid', '==', comment.uid),
          where('lessonId', '==', lessonId),
          where('text', '==', comment.text),
        );
        const snap = await getDocs(q);
        snap.forEach(d => deleteDoc(d.ref).catch(() => {}));
      } catch {}
    }
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
      // Notify the comment author
      const comment = comments.find(c => c.id === commentId);
      if (comment?.uid) {
        addDoc(collection(db, 'users', comment.uid, 'notifications'), {
          lessonId,
          lessonTitle:   lessonTitle || lessonId,
          adminName:     currentUser.displayName || 'Admin',
          adminPhotoURL: currentUser.photoURL    || '',
          text:          replyText.trim(),
          createdAt:     serverTimestamp(),
          read:          false,
        }).catch(() => {});
      }
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
      {/* Admin lock toggle */}
      {isAdmin && (
        <div className="flex items-center justify-between px-3 py-2 rounded-xl"
          style={{ background: isLocked ? 'rgba(239,68,68,0.07)' : 'rgba(255,255,255,0.03)', border: isLocked ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2">
            {isLocked ? <Lock size={13} className="text-red-400" /> : <LockOpen size={13} className="text-dark-400" />}
            <span className="text-xs text-dark-300">{isLocked ? 'Comments are locked for students' : 'Comments are open'}</span>
          </div>
          <button
            onClick={toggleLock}
            className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${isLocked ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-700/40' : 'bg-dark-700 text-dark-300 hover:text-white border border-dark-600'}`}
          >
            {isLocked ? 'Unlock' : 'Lock'}
          </button>
        </div>
      )}

      {/* Compose box — hidden for non-admins when locked */}
      {isLocked && !isAdmin ? (
        <div className="flex items-center gap-3 px-4 py-4 rounded-xl"
          style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <Lock size={16} className="text-red-400 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-300">Comments are locked</p>
            <p className="text-xs text-dark-400 mt-0.5">The instructor has disabled new comments for this lesson.</p>
          </div>
        </div>
      ) : (
      <div className="relative" ref={composeRef}>
        <div
          className="rounded-xl overflow-visible"
          style={{ border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.04)' }}
        >
          {/* Quote preview */}
          <AnimatePresence>
            {quotingComment && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-start gap-2 mx-3 mt-3 px-3 py-2 rounded-lg"
                  style={{ background: 'rgba(99,102,241,0.1)', borderLeft: '2px solid rgba(99,102,241,0.6)' }}>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold text-indigo-400 mb-0.5">{quotingComment.displayName}</p>
                    <p className="text-xs text-dark-400 truncate">{quotingComment.text}</p>
                  </div>
                  <button onClick={() => setQuotingComment(null)} className="shrink-0 text-dark-500 hover:text-white transition-colors mt-0.5">
                    <X size={12} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
      )}

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
                      {c.isAdmin && (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                          style={{ background: 'rgba(99,102,241,0.25)', border: '1px solid rgba(99,102,241,0.5)', color: '#a5b4fc' }}>
                          Admin
                        </span>
                      )}
                      {isAdmin && c.email && (
                        <span className="text-[10px] text-dark-600">{c.email}</span>
                      )}
                      <span className="text-[10px] text-dark-600 ml-auto">{relativeTime(c.createdAt)}</span>
                    </div>
                    {c.replyTo && (
                      <div className="mb-1.5 pl-2 rounded" style={{ borderLeft: '2px solid rgba(99,102,241,0.5)' }}>
                        <p className="text-[10px] font-semibold text-indigo-400">{c.replyTo.displayName}</p>
                        <p className="text-xs text-dark-500 truncate">{c.replyTo.text}</p>
                      </div>
                    )}
                    <CommentText text={c.text} />
                    {currentUser && (
                      <button
                        onClick={() => {
                          setQuotingComment({ id: c.id, displayName: c.displayName, text: c.text });
                          composeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          setTimeout(() => taRef.current?.focus(), 300);
                        }}
                        className="mt-1.5 flex items-center gap-1 text-[11px] text-dark-500 hover:text-indigo-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <CornerDownRight size={11} /> Reply
                      </button>
                    )}
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
                  <div className="mt-3 ml-4 rounded-xl p-3 flex justify-between items-start gap-2"
                    style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <div className="flex gap-2.5 min-w-0 flex-1">
                      <Avatar photoURL={c.adminReply.photoURL} displayName={c.adminReply.displayName} small />
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold mb-1 flex items-center gap-1.5 flex-wrap">
                          <span className="text-white">{c.adminReply.displayName || 'Admin'}</span>
                          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                            style={{ background: 'rgba(99,102,241,0.25)', border: '1px solid rgba(99,102,241,0.5)', color: '#a5b4fc' }}>
                            Admin
                          </span>
                          <span className="text-dark-500 font-normal text-[10px]">{relativeTime(c.adminReply.createdAt)}</span>
                        </p>
                        <CommentText text={c.adminReply.text} />
                      </div>
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
