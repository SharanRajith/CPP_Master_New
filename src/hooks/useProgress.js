// ─── useProgress.js ──────────────────────────────────────────────────────────
// Manages lesson progress, completion, and unlocking via localStorage

import { useState, useCallback, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const STORAGE_KEY = 'cpp_dsa_progress';

export function useProgress(user) {
  const [progress, setProgress] = useState(getDefaultProgress());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.uid) return;
    
    const fetchProgress = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        let data;
        if (docSnap.exists()) {
          const firestoreData = docSnap.data();
          // Never overwrite photoURL — it is managed exclusively by ProfilePage upload/delete
          const patch = {
            displayName: user.displayName || 'Anonymous',
            email:       user.email       || '',
          };
          if (!firestoreData.joinedAt) patch.joinedAt = serverTimestamp();
          await setDoc(docRef, patch, { merge: true });
          data = { ...firestoreData, ...patch };
        } else {
          // New user — attempt migration from local legacy data
          const legacyRaw = localStorage.getItem('cpp_dsa_progress');
          data = {
            ...(legacyRaw ? JSON.parse(legacyRaw) : getDefaultProgress()),
            displayName: user.displayName || 'Anonymous',
            photoURL:    user.photoURL    || '',
            email:       user.email       || '',
            joinedAt:    serverTimestamp(),
          };
          await setDoc(docRef, data);
        }

        // Update streak on login — so visiting each day counts
        const today     = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const lastDate  = data.lastActiveDate;
        if (lastDate !== today) {
          let streak = data.streak || 0;
          if (lastDate === yesterday) {
            streak += 1;       // consecutive day
          } else {
            streak = 1;        // first login or streak broken
          }
          const patch = { streak, lastActiveDate: today };
          await setDoc(docRef, patch, { merge: true });
          data = { ...data, ...patch };
        }

        setProgress(data);
      } catch (err) {
        console.error("Firebase sync error", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProgress();
  }, [user]);

  const _update = useCallback((updater) => {
    setProgress(prev => {
      const next = updater(prev);
      if (user && user.uid) {
        setDoc(doc(db, 'users', user.uid), next, { merge: true }).catch(console.error);
      }
      return next;
    });
  }, [user]);

  /** Mark a lesson as completed, award XP, update streak */
  const completeLesson = useCallback((lessonId, xpReward = 10) => {
    _update(prev => {
      if (prev.completedLessons[lessonId]) return prev; // already done

      const today     = new Date().toDateString();
      const lastDate  = prev.lastActiveDate;
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      let { streak } = prev;
      if (lastDate === today) {
        // Same day, no change
      } else if (lastDate === yesterday) {
        streak += 1; // Consecutive day
      } else {
        streak = 1; // Streak broken
      }

      const newXP    = prev.xp + xpReward;
      const newLevel = calculateLevel(newXP);

      // Track daily XP for the activity calendar
      const isoDate    = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
      const activityLog = { ...(prev.activityLog || {}) };
      activityLog[isoDate] = (activityLog[isoDate] || 0) + xpReward;

      return {
        ...prev,
        completedLessons: { ...prev.completedLessons, [lessonId]: true },
        xp: newXP,
        level: newLevel,
        streak,
        lastActiveDate: today,
        activityLog,
      };
    });
  }, [_update]);

  /** Mark a LeetCode problem as completed */
  const completeLeetCode = useCallback((problemId, xpReward = 50) => {
    _update(prev => {
      if (prev.completedLeetCode[problemId]) return prev;
      const newXP   = prev.xp + xpReward;
      const newLevel = calculateLevel(newXP);
      return {
        ...prev,
        completedLeetCode: { ...prev.completedLeetCode, [problemId]: true },
        xp: newXP,
        level: newLevel,
      };
    });
  }, [_update]);

  /** Save a personal note on a lesson */
  const saveNote = useCallback((lessonId, text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    _update(prev => ({
      ...prev,
      notes: {
        ...(prev.notes || {}),
        [lessonId]: [
          { id: Date.now().toString(), text: trimmed, ts: Date.now() },
          ...(prev.notes?.[lessonId] || []),
        ],
      },
    }));
  }, [_update]);

  /** Delete a note by id */
  const deleteNote = useCallback((lessonId, noteId) => {
    _update(prev => ({
      ...prev,
      notes: {
        ...(prev.notes || {}),
        [lessonId]: (prev.notes?.[lessonId] || []).filter(n => n.id !== noteId),
      },
    }));
  }, [_update]);

  /** Spend 5 XP to unlock the next hint for a lesson (idempotent if already unlocked) */
  const unlockHint = useCallback((lessonId, hintIdx) => {
    const COST = 5;
    _update(prev => {
      const already = (prev.unlockedHints?.[lessonId] || []).includes(hintIdx);
      if (already) return prev;
      if (prev.xp < COST) return prev; // not enough XP
      return {
        ...prev,
        xp: prev.xp - COST,
        unlockedHints: {
          ...(prev.unlockedHints || {}),
          [lessonId]: [...(prev.unlockedHints?.[lessonId] || []), hintIdx],
        },
      };
    });
  }, [_update]);

  /** Record quiz completion and award XP (first attempt only) */
  const completeQuiz = useCallback((moduleId, score) => {
    _update(prev => {
      const existing = (prev.completedQuizzes || {})[moduleId];
      const xpReward = score * 10;
      const newXP    = existing ? prev.xp : prev.xp + xpReward;
      const newLevel  = calculateLevel(newXP);
      const bestScore = existing ? Math.max(existing.score, score) : score;
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        completedQuizzes: {
          ...(prev.completedQuizzes || {}),
          [moduleId]: { score: bestScore, xp: existing ? existing.xp : xpReward },
        },
      };
    });
  }, [_update]);

  /** Check if a lesson is unlocked (first lesson always unlocked) */
  const isLessonUnlocked = useCallback((lessonId, prevLessonId) => {
    if (progress.completedLessons[lessonId]) return true;
    if (!prevLessonId) return true;
    return !!progress.completedLessons[prevLessonId];
  }, [progress.completedLessons]);

  /** Check if a lesson is completed */
  const isLessonCompleted = useCallback((lessonId) => {
    return !!progress.completedLessons[lessonId];
  }, [progress.completedLessons]);

  /** Reset all progress */
  const resetProgress = useCallback(() => {
    const fresh = getDefaultProgress();
    if (user && user.uid) {
      setDoc(doc(db, 'users', user.uid), fresh).catch(console.error);
    }
    setProgress(fresh);
  }, [user]);

  return {
    progress,
    completeLesson,
    completeLeetCode,
    completeQuiz,
    unlockHint,
    saveNote,
    deleteNote,
    isLessonUnlocked,
    isLessonCompleted,
    resetProgress,
    xp:      progress.xp,
    level:   progress.level,
    streak:  progress.streak,
    loading
  };
}

function getDefaultProgress() {
  return {
    completedLessons:  {},
    completedLeetCode: {},
    completedQuizzes:  {},
    unlockedHints:     {},  // lessonId → [0, 1, 2, ...]
    notes:             {},  // lessonId → [{ id, text, ts }]
    xp:                0,
    level:             1,
    streak:            0,
    lastActiveDate:    null,
    totalLessons:      0,
    activityLog:       {},  // "YYYY-MM-DD" → xp earned that day
  };
}

/** Calculate level from XP */
export function calculateLevel(xp) {
  if (xp >= 2500) return 7;
  if (xp >= 1500) return 6;
  if (xp >= 1000) return 5;
  if (xp >= 600)  return 4;
  if (xp >= 300)  return 3;
  if (xp >= 100)  return 2;
  return 1;
}

export const LEVELS = [
  { level: 1, title: 'Beginner',       minXP: 0,    maxXP: 99,   color: '#94a3b8' },
  { level: 2, title: 'Developer',      minXP: 100,  maxXP: 299,  color: '#34d399' },
  { level: 3, title: 'Coder',          minXP: 300,  maxXP: 599,  color: '#60a5fa' },
  { level: 4, title: 'Intermediate',   minXP: 600,  maxXP: 999,  color: '#a78bfa' },
  { level: 5, title: 'Advanced',       minXP: 1000, maxXP: 1499, color: '#f59e0b' },
  { level: 6, title: 'Expert',         minXP: 1500, maxXP: 2499, color: '#f97316' },
  { level: 7, title: 'Interview Ready',minXP: 2500, maxXP: 9999, color: '#ef4444' },
];
