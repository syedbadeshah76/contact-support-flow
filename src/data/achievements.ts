// Achievement system configuration data.
// Every value here mirrors the backend contract in ACHIEVEMENTS_BACKEND_SPEC.md —
// the backend owns these tables; this file is the frontend mirror used for the
// optimistic UI until the API is wired up.

export type BadgeTier = "Bronze" | "Silver" | "Gold";

export type BadgeCriteriaType =
  | "xp_total"
  | "lessons_completed"
  | "courses_completed"
  | "quizzes_passed"
  | "quiz_best_score"
  | "streak_days"
  | "subjects_explored"
  | "live_classes_attended";

export type BadgeDef = {
  code: string;
  name: string;
  emoji: string;
  tier: BadgeTier;
  description: string;
  criteria: {
    type: BadgeCriteriaType;
    target: number;
    /** Human label for the unit, e.g. "day login streak" */
    unit: string;
  };
  xpReward: number;
  coinsReward: number;
};

/**
 * Level ladder — cumulative XP required to REACH each level.
 * Levels 1–10 are quick wins (~200–600 XP apart); from Level 13 the gaps grow
 * so late levels feel like real milestones. The backend stores this as a
 * `levels` table; changing the ladder never requires a code change.
 */
export const LEVELS: { level: number; xpRequired: number }[] = [
  { level: 1, xpRequired: 0 },
  { level: 2, xpRequired: 200 },
  { level: 3, xpRequired: 450 },
  { level: 4, xpRequired: 750 },
  { level: 5, xpRequired: 1100 },
  { level: 6, xpRequired: 1500 },
  { level: 7, xpRequired: 1950 },
  { level: 8, xpRequired: 2450 },
  { level: 9, xpRequired: 3000 },
  { level: 10, xpRequired: 3600 },
  { level: 11, xpRequired: 4100 },
  { level: 12, xpRequired: 4600 },
  { level: 13, xpRequired: 6000 },
  { level: 14, xpRequired: 7500 },
  { level: 15, xpRequired: 9100 },
  { level: 16, xpRequired: 10800 },
  { level: 17, xpRequired: 12600 },
  { level: 18, xpRequired: 14500 },
  { level: 19, xpRequired: 16500 },
  { level: 20, xpRequired: 18600 },
];

export const BADGES: BadgeDef[] = [
  {
    code: "streak-star",
    name: "Streak Star",
    emoji: "🔥",
    tier: "Gold",
    description: "Learn something every single day. Consistency beats intensity!",
    criteria: { type: "streak_days", target: 14, unit: "day login streak" },
    xpReward: 200,
    coinsReward: 50,
  },
  {
    code: "quiz-whiz",
    name: "Quiz Whiz",
    emoji: "🧠",
    tier: "Gold",
    description: "Pass quizzes with a score of 80% or higher.",
    criteria: { type: "quizzes_passed", target: 2, unit: "quizzes passed (80%+)" },
    xpReward: 250,
    coinsReward: 60,
  },
  {
    code: "code-ninja",
    name: "Code Ninja",
    emoji: "🥷",
    tier: "Silver",
    description: "Score a perfect 100% on any quiz.",
    criteria: { type: "quiz_best_score", target: 100, unit: "best quiz score %" },
    xpReward: 150,
    coinsReward: 40,
  },
  {
    code: "bookworm",
    name: "Bookworm",
    emoji: "📚",
    tier: "Silver",
    description: "Finish lessons across all of your enrolled courses.",
    criteria: { type: "lessons_completed", target: 150, unit: "lessons completed" },
    xpReward: 150,
    coinsReward: 40,
  },
  {
    code: "lab-legend",
    name: "Lab Legend",
    emoji: "🧪",
    tier: "Bronze",
    description: "Complete full courses from start to certificate.",
    criteria: { type: "courses_completed", target: 3, unit: "courses completed" },
    xpReward: 120,
    coinsReward: 30,
  },
  {
    code: "art-icon",
    name: "Art Icon",
    emoji: "🎨",
    tier: "Bronze",
    description: "Try activities in many different subjects.",
    criteria: { type: "subjects_explored", target: 8, unit: "subjects explored" },
    xpReward: 120,
    coinsReward: 30,
  },
  {
    code: "polyglot",
    name: "Polyglot",
    emoji: "🌍",
    tier: "Gold",
    description: "Show up to live classes and learn together.",
    criteria: { type: "live_classes_attended", target: 5, unit: "live classes attended" },
    xpReward: 250,
    coinsReward: 60,
  },
  {
    code: "bot-builder",
    name: "Bot Builder",
    emoji: "🤖",
    tier: "Silver",
    description: "Earn lifetime XP across everything you do.",
    criteria: { type: "xp_total", target: 5000, unit: "lifetime XP" },
    xpReward: 200,
    coinsReward: 50,
  },
];

/**
 * Learner stat baselines that are not yet tracked in the browser
 * (lessons, course completions, live-class attendance). These arrive from the
 * stats endpoint once the backend is connected.
 */
export const LEARNER_STATS_BASELINE = {
  lessonsCompleted: 184,
  coursesCompleted: 1,
  liveClassesAttended: 2,
};

/** When each earned badge was unlocked (mock of `user_badges.unlocked_at`). */
export const UNLOCKED_AT: Record<string, string> = {
  "streak-star": "Oct 12, 2026",
  "quiz-whiz": "Sep 30, 2026",
  "code-ninja": "Oct 21, 2026",
  bookworm: "Oct 3, 2026",
};

/** Mock of the `xp_events` ledger feed (newest first). */
export const RECENT_XP_EVENTS: {
  id: string;
  source: string;
  label: string;
  xp: number;
  at: string;
}[] = [
  { id: "e1", source: "quiz_complete", label: "Quiz: Python Syntax Check", xp: 60, at: "Today" },
  { id: "e2", source: "daily_challenge", label: "Daily challenge: 5 math problems", xp: 50, at: "Today" },
  { id: "e3", source: "live_class_attended", label: "Live class: Fractions Face-Off", xp: 40, at: "Yesterday" },
  { id: "e4", source: "lesson_complete", label: "Lesson: Loops that never quit", xp: 25, at: "Yesterday" },
  { id: "e5", source: "streak_bonus", label: "Streak bonus · day 17", xp: 30, at: "2 days ago" },
  { id: "e6", source: "badge_unlock", label: "Badge unlocked: Code Ninja", xp: 150, at: "Oct 21" },
];
