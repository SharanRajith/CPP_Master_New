import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CURRICULUM } from '../data/curriculum';
import { LEVELS } from '../hooks/useProgress';
import {
  Flame, Zap, BookOpen, CheckCircle2, Trophy, Target,
  Copy, Check, Calendar, Clock,
} from 'lucide-react';

// ─── Track config ──────────────────────────────────────────────────────────────
const TRACKS = [
  { id: 'cpp',      label: 'C++ & DSA',      color: '#818cf8', filter: m => !m.track },
  { id: 'embedded', label: 'Embedded C',      color: '#22d3ee', filter: m => m.track === 'embedded' },
  { id: 'dbms',     label: 'DBMS',            color: '#a78bfa', filter: m => m.track === 'dbms' },
];

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

// ─── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-1.5 p-4 rounded-2xl"
      style={{ background: `${color}10`, border: `1px solid ${color}25` }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
        {React.cloneElement(icon, { size: 17, style: { color } })}
      </div>
      <span className="text-xl font-black text-white">{value}</span>
      <span className="text-[10px] text-dark-400 font-medium uppercase tracking-wide text-center">{label}</span>
    </motion.div>
  );
}

// ─── Module completion grid ────────────────────────────────────────────────────
function ModuleGrid({ completedLessons }) {
  return (
    <div className="space-y-6">
      {TRACKS.map(track => {
        const modules = CURRICULUM.filter(track.filter);
        return (
          <div key={track.id}>
            <p className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: track.color }}>
              {track.label}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {modules.map(mod => {
                const total = mod.lessons.length;
                const done  = mod.lessons.filter(l => completedLessons?.[l.id]).length;
                const pct   = total > 0 ? (done / total) * 100 : 0;
                const full  = done === total;
                return (
                  <div key={mod.id}
                    className="rounded-xl p-3 transition-all"
                    style={{
                      background: full ? `${mod.color}12` : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${full ? mod.color + '40' : 'rgba(255,255,255,0.06)'}`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base leading-none">{mod.icon}</span>
                      {full && <CheckCircle2 size={12} style={{ color: mod.color }} className="ml-auto shrink-0" />}
                    </div>
                    <p className="text-xs font-semibold text-white leading-snug mb-2 truncate" title={mod.title}>
                      {mod.title}
                    </p>
                    <div className="h-1 rounded-full bg-dark-700 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: mod.color }} />
                    </div>
                    <p className="text-[10px] text-dark-500 mt-1">{done}/{total}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProfilePage({ currentUser, progress: ownProgress }) {
  const { uid } = useParams();
  const isOwn   = !uid || uid === currentUser?.uid;

  const [profileData, setProfileData] = useState(isOwn ? ownProgress : null);
  const [loading,     setLoading]     = useState(!isOwn);
  const [notFound,    setNotFound]    = useState(false);
  const [copied,      setCopied]      = useState(false);

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
          completedLessons = {}, completedQuizzes = {}, completedLeetCode = {},
          joinedAt, lastActiveDate } = profileData;

  const levelInfo       = LEVELS[level - 1] || LEVELS[0];
  const nextLevel       = LEVELS[level]     || null;
  const xpInLevel       = nextLevel ? xp - levelInfo.minXP : 0;
  const xpNeeded        = nextLevel ? nextLevel.minXP - levelInfo.minXP : 1;
  const pct             = nextLevel ? Math.min((xpInLevel / xpNeeded) * 100, 100) : 100;
  const totalDone       = Object.keys(completedLessons).length;
  const totalLessons    = CURRICULUM.reduce((s, m) => s + m.lessons.length, 0);
  const modulesDone     = CURRICULUM.filter(m => m.lessons.every(l => completedLessons[l.id])).length;
  const quizCount       = Object.keys(completedQuizzes).length;
  const leetcodeCount   = Object.keys(completedLeetCode).length;
  const avatarFallback  = (displayName || 'U').charAt(0).toUpperCase();
  const joinStr         = formatJoinDate(joinedAt);
  const lastStr         = formatLastActive(lastActiveDate);

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
                <div className="relative shrink-0">
                  {photoURL ? (
                    <img src={photoURL} alt={displayName}
                      className="w-20 h-20 rounded-2xl object-cover ring-4"
                      style={{ ringColor: levelInfo.color }} />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black text-white"
                      style={{ background: `linear-gradient(135deg, ${levelInfo.color}80, #4f46e5)` }}>
                      {avatarFallback}
                    </div>
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

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          <StatCard icon={<Zap />}        label="Total XP"        value={xp.toLocaleString()}     color="#818cf8" />
          <StatCard icon={<Flame />}      label="Day Streak"      value={streak}                  color="#f97316" />
          <StatCard icon={<BookOpen />}   label="Lessons Done"    value={`${totalDone}/${totalLessons}`} color="#34d399" />
          <StatCard icon={<Trophy />}     label="Modules Cleared" value={modulesDone}              color="#fbbf24" />
          <StatCard icon={<CheckCircle2/>}label="Quizzes Passed"  value={quizCount}               color="#60a5fa" />
          <StatCard icon={<Target />}     label="LeetCode Done"   value={leetcodeCount}            color="#f472b6" />
        </div>

        {/* ── Module progress ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-5"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <h2 className="text-sm font-bold text-white mb-5">Module Progress</h2>
          <ModuleGrid completedLessons={completedLessons} />
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
