export const ACHIEVEMENTS = [
  {
    id: 'first_lesson',
    icon: '🎯',
    name: 'First Steps',
    desc: 'Complete your first lesson',
    check: (p) => Object.keys(p.completedLessons).length >= 1,
  },
  {
    id: 'lesson_5',
    icon: '✨',
    name: 'Getting Started',
    desc: 'Complete 5 lessons',
    check: (p) => Object.keys(p.completedLessons).length >= 5,
  },
  {
    id: 'lesson_25',
    icon: '🔥',
    name: 'On Fire',
    desc: 'Complete 25 lessons',
    check: (p) => Object.keys(p.completedLessons).length >= 25,
  },
  {
    id: 'lesson_75',
    icon: '⚡',
    name: 'Power Coder',
    desc: 'Complete 75 lessons',
    check: (p) => Object.keys(p.completedLessons).length >= 75,
  },
  {
    id: 'all_lessons',
    icon: '🏆',
    name: 'C++ Master',
    desc: 'Complete every single lesson',
    check: (p, total) => total > 0 && Object.keys(p.completedLessons).length >= total,
  },
  {
    id: 'streak_3',
    icon: '📅',
    name: '3-Day Streak',
    desc: 'Code 3 days in a row',
    check: (p) => p.streak >= 3,
  },
  {
    id: 'streak_7',
    icon: '🗓️',
    name: 'Week Warrior',
    desc: 'Code 7 days in a row',
    check: (p) => p.streak >= 7,
  },
  {
    id: 'streak_30',
    icon: '🌟',
    name: 'Unstoppable',
    desc: 'Code 30 days in a row',
    check: (p) => p.streak >= 30,
  },
  {
    id: 'xp_100',
    icon: '💡',
    name: '100 XP Club',
    desc: 'Earn 100 XP',
    check: (p) => p.xp >= 100,
  },
  {
    id: 'xp_500',
    icon: '💎',
    name: 'XP Hoarder',
    desc: 'Earn 500 XP',
    check: (p) => p.xp >= 500,
  },
  {
    id: 'xp_1000',
    icon: '👑',
    name: 'XP Royalty',
    desc: 'Earn 1000 XP',
    check: (p) => p.xp >= 1000,
  },
  {
    id: 'level_5',
    icon: '🚀',
    name: 'Rising Star',
    desc: 'Reach Level 5',
    check: (p) => p.level >= 5,
  },
];

export function getEarnedAchievements(progress, totalLessons) {
  return ACHIEVEMENTS.filter(a => a.check(progress, totalLessons));
}
