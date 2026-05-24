import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, onSnapshot, query, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Crown, Users, Zap, BookOpen, ToggleLeft, ToggleRight, RefreshCw, UserCog, Megaphone, Plus, Trash2, Info, AlertTriangle, CheckCircle, KeyRound, ChevronDown, ChevronUp } from 'lucide-react';
import { db } from '../lib/firebase';
import { LEVELS } from '../hooks/useProgress';
import { ADMIN_EMAILS } from '../config/admins';
import { CURRICULUM } from '../data/curriculum';

const SUPER_ADMINS = ['sharanrajithk@gmail.com', 'madhurahegde475@gmail.com'];

const ANN_TYPES = [
  { value: 'info',    label: 'Info',    icon: Info,          color: '#818cf8' },
  { value: 'warning', label: 'Warning', icon: AlertTriangle, color: '#fbbf24' },
  { value: 'success', label: 'Success', icon: CheckCircle,   color: '#34d399' },
];

export default function AdminPage({ currentUser }) {
  const [users,        setUsers]        = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [updating,     setUpdating]     = useState(null);
  const [expandedUid,  setExpandedUid]  = useState(null); // uid with unlock panel open

  // Announcements state
  const [announcements,  setAnnouncements]  = useState([]);
  const [annMessage,     setAnnMessage]     = useState('');
  const [annType,        setAnnType]        = useState('info');
  const [annPosting,     setAnnPosting]     = useState(false);
  const [annError,       setAnnError]       = useState('');

  const isAdmin      = ADMIN_EMAILS.includes(currentUser?.email) || false;
  const isSuperAdmin = SUPER_ADMINS.includes(currentUser?.email);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'users'));
      setUsers(
        snap.docs
          .map(d => ({ uid: d.id, ...d.data() }))
          .sort((a, b) => (b.xp || 0) - (a.xp || 0))
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  useEffect(() => {
    return onSnapshot(collection(db, 'announcements'), snap => {
      const list = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setAnnouncements(list);
    }, () => {});
  }, []);

  const postAnnouncement = async () => {
    if (!annMessage.trim()) return;
    setAnnPosting(true);
    setAnnError('');
    try {
      await addDoc(collection(db, 'announcements'), {
        message:   annMessage.trim(),
        type:      annType,
        active:    true,
        createdAt: serverTimestamp(),
        createdBy: currentUser?.email,
      });
      setAnnMessage('');
    } catch (e) {
      setAnnError('Failed to post: ' + e.message);
    } finally {
      setAnnPosting(false);
    }
  };

  const toggleAnnouncement = async (id, current) => {
    try { await updateDoc(doc(db, 'announcements', id), { active: !current }); }
    catch (e) { /* ignore */ }
  };

  const deleteAnnouncement = async (id) => {
    try { await deleteDoc(doc(db, 'announcements', id)); }
    catch (e) { /* ignore */ }
  };

  const togglePremium = async (uid, current) => {
    setUpdating(uid + '-premium');
    try {
      await updateDoc(doc(db, 'users', uid), { isPremium: !current });
      setUsers(prev => prev.map(u => u.uid === uid ? { ...u, isPremium: !current } : u));
    } finally {
      setUpdating(null);
    }
  };

  const toggleAdmin = async (uid, current) => {
    setUpdating(uid + '-admin');
    try {
      const updates = current
        ? { isAdmin: false }                         // revoke admin (keep premium as-is)
        : { isAdmin: true, isPremium: true };        // grant admin → also grant premium
      await updateDoc(doc(db, 'users', uid), updates);
      setUsers(prev => prev.map(u => u.uid === uid ? { ...u, ...updates } : u));
    } finally {
      setUpdating(null);
    }
  };

  const toggleModuleUnlock = async (uid, moduleId, currentUnlocked) => {
    const user = users.find(u => u.uid === uid);
    const current = user?.unlockedModules || [];
    const next = currentUnlocked
      ? current.filter(id => id !== moduleId)
      : [...current, moduleId];
    try {
      await updateDoc(doc(db, 'users', uid), { unlockedModules: next });
      setUsers(prev => prev.map(u => u.uid === uid ? { ...u, unlockedModules: next } : u));
    } catch (e) { /* ignore */ }
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
  const premiumUsers = users.filter(u => u.isPremium || ADMIN_EMAILS.includes(u.email) || u.isAdmin).length;
  const totalXP      = users.reduce((s, u) => s + (u.xp || 0), 0);

  return (
    <div className="flex-1 overflow-y-auto overscroll-contain">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <Shield size={22} className="text-indigo-400" />
            <h1 className="text-3xl font-black text-white">Admin Panel</h1>
            {isSuperAdmin && (
              <span className="text-xs px-2 py-1 rounded-full font-bold"
                style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
                Super Admin
              </span>
            )}
          </div>
          <p className="text-dark-400 text-sm">
            Manage users, premium access{isSuperAdmin ? ', and admin roles' : ''}.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: <Users size={16} className="text-indigo-400" />,  label: 'Total Users',     value: totalUsers,             bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.2)' },
            { icon: <Crown size={16} className="text-yellow-400" />,  label: 'Premium Users',   value: premiumUsers,           bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.2)' },
            { icon: <Zap   size={16} className="text-green-400" />,   label: 'Total XP Earned', value: totalXP.toLocaleString(), bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="rounded-xl p-4 text-center" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
              <div className="flex justify-center mb-1">{s.icon}</div>
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-xs text-dark-400">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Announcements */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
            <Megaphone size={16} className="text-indigo-400" /> Announcements
          </h2>

          {/* Compose */}
          <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(17,17,24,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <textarea
              value={annMessage}
              onChange={e => setAnnMessage(e.target.value)}
              placeholder="Write an announcement..."
              rows={2}
              className="w-full bg-transparent text-white text-sm placeholder-dark-500 resize-none focus:outline-none"
            />
            <div className="flex items-center gap-2 mt-3">
              {ANN_TYPES.map(t => {
                const Icon = t.icon;
                return (
                  <button key={t.value} onClick={() => setAnnType(t.value)}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
                    style={annType === t.value
                      ? { background: 'rgba(255,255,255,0.1)', border: `1px solid ${t.color}`, color: t.color }
                      : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7280' }
                    }>
                    <Icon size={12} /> {t.label}
                  </button>
                );
              })}
              <div className="flex-1" />
              {annError && <span className="text-xs text-red-400">{annError}</span>}
              <button onClick={postAnnouncement} disabled={annPosting || !annMessage.trim()}
                className="flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-lg font-semibold transition-all disabled:opacity-50"
                style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc' }}>
                {annPosting ? <RefreshCw size={12} className="animate-spin" /> : <Plus size={12} />}
                Post
              </button>
            </div>
          </div>

          {/* List */}
          <div className="space-y-2">
            <AnimatePresence>
              {announcements.map(a => {
                const cfg = ANN_TYPES.find(t => t.value === a.type) || ANN_TYPES[0];
                const Icon = cfg.icon;
                return (
                  <motion.div key={a.id}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                    className="flex items-start gap-3 rounded-xl px-4 py-3"
                    style={{ background: 'rgba(17,17,24,0.8)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <Icon size={14} style={{ color: cfg.color, marginTop: 2, flexShrink: 0 }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white leading-snug">{a.message}</p>
                      <p className="text-xs text-dark-500 mt-0.5">by {a.createdBy || 'admin'}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => toggleAnnouncement(a.id, a.active)}
                        className="text-xs px-2.5 py-1 rounded-lg transition-all"
                        style={a.active
                          ? { background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399' }
                          : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7280' }
                        }>
                        {a.active ? 'Live' : 'Off'}
                      </button>
                      <button onClick={() => deleteAnnouncement(a.id)}
                        className="p-1.5 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-900/20 transition-all">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {announcements.length === 0 && (
              <p className="text-xs text-dark-500 text-center py-4">No announcements yet.</p>
            )}
          </div>
        </motion.div>

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
              const levelInfo        = LEVELS[(user.level ?? 1) - 1] || LEVELS[0];
              const isMe             = user.uid === currentUser?.uid;
              const isHardcodedAdmin = ADMIN_EMAILS.includes(user.email);
              const isUserSuperAdmin = SUPER_ADMINS.includes(user.email);
              const isDynamicAdmin   = !!user.isAdmin;
              const isUserAdmin      = isHardcodedAdmin || isDynamicAdmin;
              const isUpdPremium     = updating === user.uid + '-premium';
              const isUpdAdmin       = updating === user.uid + '-admin';

              const isExpanded = expandedUid === user.uid;
              const unlockedModules = user.unlockedModules || [];

              return (
                <motion.div key={user.uid}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: isMe ? 'rgba(99,102,241,0.1)' : 'rgba(17,17,24,0.8)',
                    border: isMe ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                <div className="flex items-center gap-3 px-4 py-3">
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
                      {isMe         && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50">You</span>}
                      {isUserSuperAdmin && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-900/50 text-red-300 border border-red-700/50 flex items-center gap-0.5"><Shield size={9} />Super Admin</span>}
                      {isHardcodedAdmin && !isUserSuperAdmin && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-900/50 text-purple-300 border border-purple-700/50 flex items-center gap-0.5"><Shield size={9} />Admin</span>}
                      {!isHardcodedAdmin && isDynamicAdmin && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-900/50 text-purple-300 border border-purple-700/50 flex items-center gap-0.5"><Shield size={9} />Admin</span>}
                      {(user.isPremium || isUserAdmin) && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-900/50 text-yellow-300 border border-yellow-700/50 flex items-center gap-0.5"><Crown size={9} />Premium</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-dark-400">
                      <span style={{ color: levelInfo.color }}>L{user.level ?? 1} {levelInfo.title}</span>
                      <span className="flex items-center gap-0.5"><Zap size={10} className="text-yellow-400" />{user.xp ?? 0} XP</span>
                      <span className="flex items-center gap-0.5"><BookOpen size={10} />{Object.keys(user.completedLessons || {}).length} lessons</span>
                      {user.email && <span className="text-dark-600 truncate hidden sm:block">{user.email}</span>}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Admin toggle — super-admin only, not for hardcoded/super admins or self */}
                    {isSuperAdmin && !isHardcodedAdmin && !isUserSuperAdmin && !isMe && (
                      <button
                        onClick={() => toggleAdmin(user.uid, isDynamicAdmin)}
                        disabled={!!updating}
                        title={isDynamicAdmin ? 'Revoke Admin' : 'Grant Admin (also grants Premium)'}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
                        style={isDynamicAdmin
                          ? { background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', color: '#c084fc' }
                          : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#6b7280' }
                        }
                      >
                        {isUpdAdmin
                          ? <RefreshCw size={12} className="animate-spin" />
                          : <><UserCog size={13} /> {isDynamicAdmin ? 'Admin' : 'Make Admin'}</>
                        }
                      </button>
                    )}

                    {/* Premium toggle — not for admins (they always have it) */}
                    {!isUserAdmin && (
                      <button
                        onClick={() => togglePremium(user.uid, !!user.isPremium)}
                        disabled={!!updating}
                        title={user.isPremium ? 'Revoke Premium' : 'Grant Premium'}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
                        style={user.isPremium
                          ? { background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }
                          : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#6b7280' }
                        }
                      >
                        {isUpdPremium
                          ? <RefreshCw size={12} className="animate-spin" />
                          : user.isPremium
                            ? <><ToggleRight size={14} /> Premium</>
                            : <><ToggleLeft size={14} /> Free</>
                        }
                      </button>
                    )}

                    {/* Unlock modules — hidden for super admins (they have everything) */}
                    {!isUserSuperAdmin && (
                      <button
                        onClick={() => setExpandedUid(isExpanded ? null : user.uid)}
                        title="Unlock modules for this user"
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
                        style={unlockedModules.length > 0
                          ? { background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399' }
                          : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#6b7280' }
                        }
                      >
                        <KeyRound size={12} />
                        {unlockedModules.length > 0 ? unlockedModules.length : ''}
                        {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Unlock panel */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-white/5"
                    >
                      <div className="px-4 py-3">
                        <p className="text-xs text-dark-400 mb-2">Click a module to unlock/lock it for this user:</p>
                        <div className="flex flex-wrap gap-2">
                          {CURRICULUM.map(mod => {
                            const isUnlocked = unlockedModules.includes(mod.id);
                            return (
                              <button
                                key={mod.id}
                                onClick={() => toggleModuleUnlock(user.uid, mod.id, isUnlocked)}
                                className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg transition-all"
                                style={isUnlocked
                                  ? { background: `${mod.color}22`, border: `1px solid ${mod.color}66`, color: mod.color }
                                  : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#6b7280' }
                                }
                              >
                                <span>{mod.icon}</span> {mod.title}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
