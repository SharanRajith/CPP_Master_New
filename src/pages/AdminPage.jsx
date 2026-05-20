import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Shield, Crown, Users, Zap, BookOpen, ToggleLeft, ToggleRight, RefreshCw } from 'lucide-react';
import { db } from '../lib/firebase';
import { LEVELS } from '../hooks/useProgress';
import { ADMIN_EMAILS } from '../config/admins';

export default function AdminPage({ currentUser }) {
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [updating, setUpdating] = useState(null);

  const isAdmin = ADMIN_EMAILS.includes(currentUser?.email);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'users'));
      setUsers(snap.docs.map(d => ({ uid: d.id, ...d.data() }))
        .sort((a, b) => (b.xp || 0) - (a.xp || 0)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const togglePremium = async (uid, current) => {
    setUpdating(uid);
    try {
      await updateDoc(doc(db, 'users', uid), { isPremium: !current });
      setUsers(prev => prev.map(u => u.uid === uid ? { ...u, isPremium: !current } : u));
    } finally {
      setUpdating(null);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex-1 flex items-center justify-center text-dark-400">
        <div className="text-center">
          <Shield size={40} className="mx-auto mb-3 text-dark-600" />
          <p className="font-semibold text-white">Access Denied</p>
          <p className="text-sm mt-1">Admin accounts only.</p>
        </div>
      </div>
    );
  }

  const totalUsers   = users.length;
  const premiumUsers = users.filter(u => u.isPremium).length;
  const totalXP      = users.reduce((s, u) => s + (u.xp || 0), 0);

  return (
    <div className="flex-1 overflow-y-auto overscroll-contain">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <Shield size={22} className="text-indigo-400" />
            <h1 className="text-3xl font-black text-white">Admin Panel</h1>
          </div>
          <p className="text-dark-400 text-sm">Manage users and premium access.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: <Users size={16} className="text-indigo-400" />, label: 'Total Users', value: totalUsers, bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)' },
            { icon: <Crown size={16} className="text-yellow-400" />, label: 'Premium Users', value: premiumUsers, bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)' },
            { icon: <Zap size={16} className="text-green-400" />,   label: 'Total XP Earned', value: totalXP.toLocaleString(), bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="rounded-xl p-4 text-center" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
              <div className="flex justify-center mb-1">{s.icon}</div>
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-xs text-dark-400">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* User table */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users size={16} className="text-indigo-400" /> All Users
          </h2>
          <button onClick={fetchUsers}
            className="flex items-center gap-1.5 text-xs text-dark-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-dark-700 transition-all">
            <RefreshCw size={12} /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-2">
            {users.map((user, i) => {
              const levelInfo = LEVELS[(user.level ?? 1) - 1] || LEVELS[0];
              const isMe      = user.uid === currentUser?.uid;
              const isAdminU  = ADMIN_EMAILS.includes(user.email);

              return (
                <motion.div key={user.uid}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{
                    background: isMe ? 'rgba(99,102,241,0.1)' : 'rgba(17,17,24,0.8)',
                    border: isMe ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  {/* Avatar */}
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-9 h-9 rounded-full shrink-0 ring-2 ring-dark-600" />
                  ) : (
                    <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
                      {(user.displayName || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-white text-sm truncate">{user.displayName || 'Anonymous'}</span>
                      {isMe     && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50">You</span>}
                      {isAdminU && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-900/50 text-purple-300 border border-purple-700/50 flex items-center gap-0.5"><Shield size={9} />Admin</span>}
                      {user.isPremium && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-900/50 text-yellow-300 border border-yellow-700/50 flex items-center gap-0.5"><Crown size={9} />Premium</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-dark-400">
                      <span style={{ color: levelInfo.color }}>L{user.level ?? 1} {levelInfo.title}</span>
                      <span className="flex items-center gap-0.5"><Zap size={10} className="text-yellow-400" />{user.xp ?? 0} XP</span>
                      <span className="flex items-center gap-0.5"><BookOpen size={10} />{Object.keys(user.completedLessons || {}).length} lessons</span>
                    </div>
                  </div>

                  {/* Premium toggle */}
                  {!isAdminU && (
                    <button
                      onClick={() => togglePremium(user.uid, !!user.isPremium)}
                      disabled={updating === user.uid}
                      title={user.isPremium ? 'Revoke Premium' : 'Grant Premium'}
                      className="shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
                      style={user.isPremium
                        ? { background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }
                        : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#6b7280' }
                      }
                    >
                      {updating === user.uid
                        ? <RefreshCw size={12} className="animate-spin" />
                        : user.isPremium
                          ? <><ToggleRight size={14} /> Premium</>
                          : <><ToggleLeft size={14} /> Free</>
                      }
                    </button>
                  )}
                </motion.div>
              );
            })}
            {users.length === 0 && (
              <p className="text-center text-dark-400 py-8">No users yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
