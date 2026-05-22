import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../lib/firebase';
import { CURRICULUM } from '../data/curriculum';
import { LEVELS } from '../hooks/useProgress';
import { ACHIEVEMENTS, getEarnedAchievements } from '../config/achievements';
import { Flame, Zap, BookOpen, Copy, Check, Calendar, Clock, Camera, Loader2, Mail, Pencil, X } from 'lucide-react';

function formatJoinDate(ts) {
  if (!ts) return null;
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function formatLastActive(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const diff = Math.floor((Date.now() - d) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7)  return `${diff} days ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProfilePage({ currentUser, progress: ownProgress, onProfileUpdate }) {
  const { uid } = useParams();
  const isOwn   = !uid || uid === currentUser?.uid;

  const [profileData,   setProfileData]   = useState(isOwn ? ownProgress : null);
  const [loading,       setLoading]       = useState(!isOwn);
  const [notFound,      setNotFound]      = useState(false);
  const [copied,        setCopied]        = useState(false);
  const [uploading,     setUploading]     = useState(false);
  const [uploadError,   setUploadError]   = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [editingName,   setEditingName]   = useState(false);
  const [nameValue,     setNameValue]     = useState('');
  const [nameSaving,    setNameSaving]    = useState(false);
  const [nameError,     setNameError]     = useState('');
  const [nameSaved,     setNameSaved]     = useState(false);
  const fileInputRef = useRef(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (isOwn) { setProfileData(ownProgress); return; }
    setLoading(true);
    getDoc(doc(db, 'users', uid))
      .then(snap => {
        if (!snap.exists()) { setNotFound(true); }
        else { setProfileData(snap.data()); }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [uid, isOwn, ownProgress]);

  function copyLink() {
    const url = `${window.location.origin}/profile/${isOwn ? currentUser.uid : uid}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  async function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setUploadError('Please select an image file.'); return; }
    if (file.size > 5 * 1024 * 1024)    { setUploadError('Image must be under 5 MB.');   return; }
    setUploadError('');
    setUploading(true);

    // Resize to 256×256 using canvas
    const resized = await new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const size = Math.min(img.width, img.height);
        const sx = (img.width  - size) / 2;
        const sy = (img.height - size) / 2;
        ctx.drawImage(img, sx, sy, size, size, 0, 0, 256, 256);
        canvas.toBlob(resolve, 'image/jpeg', 0.88);
      };
      img.src = URL.createObjectURL(file);
    });

    try {
      const storageRef = ref(storage, `avatars/${currentUser.uid}`);
      await uploadBytes(storageRef, resized, { contentType: 'image/jpeg' });
      const url = await getDownloadURL(storageRef);

      await updateProfile(auth.currentUser, { photoURL: url });
      await setDoc(doc(db, 'users', currentUser.uid), { photoURL: url }, { merge: true });

      setAvatarPreview(url);
      onProfileUpdate?.();
    } catch (err) {
      setUploadError('Upload failed — check Firebase Storage rules.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  function startEditName(currentDisplayName) {
    setNameValue(currentDisplayName || '');
    setEditingName(true);
    setNameError('');
    setTimeout(() => nameInputRef.current?.focus(), 50);
  }

  async function saveName(currentDisplayName) {
    const trimmed = nameValue.trim();
    if (!trimmed) { setNameError('Name cannot be empty.'); return; }
    if (trimmed === currentDisplayName) { setEditingName(false); return; }
    setNameSaving(true);
    setNameError('');
    try {
      await updateProfile(auth.currentUser, { displayName: trimmed });
      await setDoc(doc(db, 'users', currentUser.uid), { displayName: trimmed }, { merge: true });
      onProfileUpdate?.();
      setEditingName(false);
      setNameSaved(true);
      setTimeout(() => setNameSaved(false), 2000);
    } catch (e) {
      setNameError('Failed to save. Try again.');
    } finally {
      setNameSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-dark-900">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !profileData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-dark-900 text-center px-4">
        <p className="text-4xl mb-3">👤</p>
        <p className="text-white font-bold text-lg mb-1">Profile not found</p>
        <p className="text-dark-400 text-sm">This user doesn't exist or hasn't signed in yet.</p>
      </div>
    );
  }

  const { displayName, photoURL, xp = 0, level = 1, streak = 0,
          completedLessons = {}, joinedAt, lastActiveDate } = profileData;

  const levelInfo      = LEVELS[level - 1] || LEVELS[0];
  const nextLevel      = LEVELS[level]     || null;
  const xpInLevel      = nextLevel ? xp - levelInfo.minXP : 0;
  const xpNeeded       = nextLevel ? nextLevel.minXP - levelInfo.minXP : 1;
  const pct            = nextLevel ? Math.min((xpInLevel / xpNeeded) * 100, 100) : 100;
  const avatarFallback = (displayName || 'U').charAt(0).toUpperCase();
  const joinStr        = formatJoinDate(joinedAt);
  const lastStr        = formatLastActive(lastActiveDate);
  const totalLessons   = CURRICULUM.reduce((s, m) => s + m.lessons.length, 0);
  const lessonsCount   = Object.keys(completedLessons).length;
  const earnedBadges   = getEarnedAchievements({ completedLessons, xp, streak, level });

  return (
    <div className="flex-1 overflow-y-auto bg-dark-900">
      <div className="max-w-2xl mx-auto px-4 py-8 pb-20">

        {/* ── Hero card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl overflow-hidden mb-6"
          style={{ border: `1px solid ${levelInfo.color}30` }}
        >
          {/* Gradient banner */}
          <div className="h-24 w-full relative"
            style={{ background: `linear-gradient(135deg, ${levelInfo.color}30 0%, rgba(15,15,26,0) 100%)` }}>
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, transparent 60%, #0e0e1a 100%)' }} />
          </div>

          {/* Avatar + info row */}
          <div className="px-6 pb-6 -mt-10 relative">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div className="flex items-end gap-4">
                {/* Avatar */}
                <div className="relative shrink-0 group">
                  {/* Hidden file input */}
                  {isOwn && (
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  )}

                  {/* Avatar image */}
                  {(avatarPreview || photoURL) ? (
                    <img
                      src={avatarPreview || photoURL}
                      alt={displayName}
                      className="w-20 h-20 rounded-2xl object-cover"
                      style={{ boxShadow: `0 0 0 3px ${levelInfo.color}60` }}
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black text-white"
                      style={{ background: `linear-gradient(135deg, ${levelInfo.color}80, #4f46e5)` }}>
                      {avatarFallback}
                    </div>
                  )}

                  {/* Camera overlay — own profile only */}
                  {isOwn && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="absolute inset-0 rounded-2xl flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                      style={{ background: 'rgba(0,0,0,0.55)' }}
                      title="Change profile photo"
                    >
                      {uploading
                        ? <Loader2 size={22} className="text-white animate-spin" />
                        : <Camera size={22} className="text-white" />}
                    </button>
                  )}

                  {/* Level badge */}
                  <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-black text-white shadow-lg"
                    style={{ background: levelInfo.color }}>
                    Lv {level}
                  </div>
                </div>

                {/* Name + level title */}
                <div className="pb-1">
                  <h1 className="text-xl font-black text-white leading-tight">{displayName || 'Anonymous'}</h1>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: levelInfo.color }}>
                    {levelInfo.title}
                  </p>
                  {joinStr && (
                    <div className="flex items-center gap-1 mt-1 text-[11px] text-dark-500">
                      <Calendar size={10} /> Joined {joinStr}
                    </div>
                  )}
                </div>
              </div>

              {/* Copy link */}
              <button
                onClick={copyLink}
                className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border transition-all mb-1"
                style={{
                  background: copied ? `${levelInfo.color}15` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${copied ? levelInfo.color + '50' : 'rgba(255,255,255,0.08)'}`,
                  color: copied ? levelInfo.color : '#9ca3af',
                }}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Copied!' : 'Copy link'}
              </button>
            </div>

            {/* Upload error */}
            {uploadError && (
              <p className="text-xs text-red-400 mt-2">{uploadError}</p>
            )}

            {/* XP bar */}
            <div className="mt-5">
              <div className="flex justify-between text-xs text-dark-400 mb-1.5">
                <span>{xp} XP total</span>
                {nextLevel && <span>{xpInLevel} / {xpNeeded} XP to Level {level + 1}</span>}
                {!nextLevel && <span className="text-yellow-400 font-semibold">Max Level</span>}
              </div>
              <div className="h-2 rounded-full bg-dark-700 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${levelInfo.color}cc, ${levelInfo.color})` }}
                />
              </div>
            </div>

            {/* Last active */}
            {lastStr && (
              <p className="text-[11px] text-dark-600 mt-2 flex items-center gap-1">
                <Clock size={10} /> Last active {lastStr}
              </p>
            )}
          </div>
        </motion.div>

        {/* ── Compact stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="grid grid-cols-3 gap-3 mb-5"
        >
          {[
            { icon: <Zap size={14} className="text-yellow-400" />,    label: 'XP',      value: xp.toLocaleString() },
            { icon: <Flame size={14} className="text-orange-400" />,  label: 'Streak',  value: `${streak}d` },
            { icon: <BookOpen size={14} className="text-indigo-400" />,label: 'Lessons', value: `${lessonsCount}/${totalLessons}` },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center gap-1 py-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-1.5">
                {s.icon}
                <span className="text-lg font-black text-white">{s.value}</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-dark-500 font-medium">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Achievements ── */}
        {earnedBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="rounded-2xl p-5 mb-5"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-xs font-bold text-dark-400 uppercase tracking-widest mb-4">Achievements</p>
            <div className="flex flex-wrap gap-2">
              {earnedBadges.map(a => (
                <div key={a.id} title={a.desc}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#a5b4fc' }}>
                  <span>{a.icon}</span> {a.name}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Account Settings (own profile only) ── */}
        {isOwn && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden mb-5"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="px-5 py-3 border-b border-white/5"
              style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-xs font-bold text-dark-400 uppercase tracking-widest">Account Settings</p>
            </div>

            {/* Display Name */}
            <div className="px-5 py-4 flex items-center gap-4 border-b border-white/5"
              style={{ background: 'rgba(17,17,24,0.6)' }}>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-dark-500 mb-1 font-medium uppercase tracking-wide">Display Name</p>
                {editingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      ref={nameInputRef}
                      value={nameValue}
                      onChange={e => setNameValue(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') setEditingName(false); }}
                      maxLength={40}
                      className="flex-1 bg-dark-700 text-white text-sm px-3 py-1.5 rounded-lg border border-indigo-500/50 focus:outline-none focus:border-indigo-400"
                    />
                    <button onClick={() => saveName(displayName)} disabled={nameSaving}
                      className="p-1.5 rounded-lg text-indigo-400 hover:bg-indigo-900/30 transition-all disabled:opacity-50">
                      {nameSaving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                    </button>
                    <button onClick={() => setEditingName(false)}
                      className="p-1.5 rounded-lg text-dark-400 hover:bg-dark-700 transition-all">
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">
                      {nameSaved ? <span className="text-green-400">Saved!</span> : (displayName || 'Anonymous')}
                    </span>
                  </div>
                )}
                {nameError && <p className="text-xs text-red-400 mt-1">{nameError}</p>}
              </div>
              {!editingName && (
                <button onClick={() => startEditName(displayName)}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg text-dark-400 hover:text-white hover:bg-dark-700 transition-all shrink-0">
                  <Pencil size={12} /> Edit
                </button>
              )}
            </div>

            {/* Email */}
            <div className="px-5 py-4 flex items-center gap-4"
              style={{ background: 'rgba(17,17,24,0.6)' }}>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-dark-500 mb-1 font-medium uppercase tracking-wide">Email</p>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-dark-500 shrink-0" />
                  <span className="text-sm text-dark-300 truncate">{currentUser?.email}</span>
                </div>
              </div>
              <span className="text-[10px] text-dark-600 shrink-0">via Google</span>
            </div>
          </motion.div>
        )}

        {/* Own profile — view own public link note */}
        {isOwn && (
          <p className="text-center text-xs text-dark-600 mt-4">
            This is your public profile · <button onClick={copyLink} className="underline hover:text-dark-400 transition-colors">copy link to share</button>
          </p>
        )}
      </div>
    </div>
  );
}
