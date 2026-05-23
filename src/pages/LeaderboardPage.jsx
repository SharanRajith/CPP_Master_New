import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Trophy, Zap, Flame } from 'lucide-react';
import { db } from '../lib/firebase';
import { LEVELS } from '../hooks/useProgress';

const MEDAL = ['🥇', '🥈', '🥉'];

function Avatar({ photoURL, displayName, size = 9 }) {
  const initial = (displayName || 'U').charAt(0).toUpperCase();
  const px = size * 4;
  const sizeStyle = { width: px, height: px };
  return photoURL ? (
    <img
      src={photoURL}
      alt={displayName}
      className="rounded-full object-cover ring-2 ring-dark-600"
      style={sizeStyle}
    />
  ) : (
    <div
      className="rounded-full flex items-center justify-center text-sm font-bold text-white ring-2 ring-dark-600"
      style={{ ...sizeStyle, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}
    >
      {initial}
    </div>
  );
}

export default function LeaderboardPage({ currentUser }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    // Try ordered query first; fall back to full fetch + client sort if index/rules block it
    getDocs(query(collection(db, 'users'), orderBy('xp', 'desc'), limit(20)))
      .then(snap => setEntries(snap.docs.map(d => ({ uid: d.id, ...d.data() }))))
      .catch(() =>
        getDocs(collection(db, 'users'))
          .then(snap => {
            const all = snap.docs.map(d => ({ uid: d.id, ...d.data() }));
            all.sort((a, b) => (b.xp ?? 0) - (a.xp ?? 0));
            setEntries(all.slice(0, 20));
          })
      )
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex-1 overflow-y-auto overscroll-contain">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{ background: 'linear-gradient(135deg,#f59e0b22,#f9731622)', border: '1px solid #f59e0b44' }}>
            <Trophy size={26} className="text-yellow-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-1">Leaderboard</h1>
          <p className="text-dark-400 text-sm">Top learners ranked by XP</p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-8 space-y-3">
            <p className="text-red-400 text-sm font-semibold">Could not load leaderboard</p>
            <p className="text-dark-400 text-xs max-w-sm mx-auto">
              Go to <span className="text-brand-400">Firebase Console → Firestore → Rules</span> and
              make sure you have published: <code className="text-green-400">allow read: if request.auth != null;</code>
            </p>
            <p className="text-dark-600 text-xs font-mono">{error}</p>
          </div>
        )}

        {/* Entries */}
        {!loading && !error && (
          <div className="space-y-2">
            {entries.map((entry, i) => {
              const levelInfo  = LEVELS[(entry.level ?? 1) - 1] || LEVELS[0];
              const isMe       = entry.uid === currentUser?.uid;
              const isTopThree = i < 3;

              return (
                <motion.div
                  key={entry.uid}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 rounded-2xl px-4 py-3 transition-all"
                  style={{
                    background: isMe
                      ? 'linear-gradient(135deg,rgba(99,102,241,0.18),rgba(17,17,24,0.9))'
                      : 'rgba(17,17,24,0.7)',
                    border: isMe
                      ? '1px solid rgba(99,102,241,0.45)'
                      : '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  {/* Rank */}
                  <div className="w-8 text-center shrink-0">
                    {isTopThree ? (
                      <span className="text-xl">{MEDAL[i]}</span>
                    ) : (
                      <span className="text-sm font-bold text-dark-400">#{i + 1}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <Avatar photoURL={entry.photoURL} displayName={entry.displayName} />

                  {/* Name + level */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm truncate">
                        {entry.displayName || 'Anonymous'}
                      </span>
                      {isMe && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50">
                          You
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-xs font-semibold" style={{ color: levelInfo.color }}>
                        L{entry.level ?? 1} {levelInfo.title}
                      </span>
                      {(entry.streak > 0) && (
                        <span className="text-xs text-orange-400 flex items-center gap-0.5 ml-2">
                          <Flame size={10} /> {entry.streak}d
                        </span>
                      )}
                    </div>
                  </div>

                  {/* XP */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Zap size={13} className="text-yellow-400" />
                    <span className="text-sm font-black text-white">{entry.xp ?? 0}</span>
                    <span className="text-xs text-dark-400">XP</span>
                  </div>
                </motion.div>
              );
            })}

            {entries.length === 0 && (
              <p className="text-center text-dark-400 py-12">No entries yet — complete a lesson to appear here!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
