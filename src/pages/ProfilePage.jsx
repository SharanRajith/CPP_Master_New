import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../lib/firebase';
import { LEVELS } from '../hooks/useProgress';
import { Copy, Check, Calendar, Clock, Camera, Loader2 } from 'lucide-react';

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
  const fileInputRef = useRef(null);

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

  const { displayName, photoURL, xp = 0, level = 1,
          joinedAt, lastActiveDate } = profileData;

  const levelInfo      = LEVELS[level - 1] || LEVELS[0];
  const nextLevel      = LEVELS[level]     || null;
  const xpInLevel      = nextLevel ? xp - levelInfo.minXP : 0;
  const xpNeeded       = nextLevel ? nextLevel.minXP - levelInfo.minXP : 1;
  const pct            = nextLevel ? Math.min((xpInLevel / xpNeeded) * 100, 100) : 100;
  const avatarFallback = (displayName || 'U').charAt(0).toUpperCase();
  const joinStr        = formatJoinDate(joinedAt);
  const lastStr        = formatLastActive(lastActiveDate);

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

        {/* Own profile — view own public link note */}
        {isOwn && (
          <p className="text-center text-xs text-dark-600 mt-6">
            This is your public profile · <button onClick={copyLink} className="underline hover:text-dark-400 transition-colors">copy link to share</button>
          </p>
        )}
      </div>
    </div>
  );
}
