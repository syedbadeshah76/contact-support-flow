// Pure achievement logic — the frontend mirror of the backend rules documented
// in ACHIEVEMENTS_BACKEND_SPEC.md. No React, no side effects: every function is
// a plain derivation so the backend team can port the rules 1:1.
//
// Source of truth = the backend. This module exists so the UI can render
// progress instantly and identically before/after the API is connected.

import {
  BADGES,
  LEARNER_STATS_BASELINE,
  LEVELS,
  type BadgeCriteriaType,
  type BadgeDef,
} from "@/data/achievements";
import { allCourses, learner, quizzes } from "@/data/portal";

/** A quiz counts as "passed" at 80% or higher (matches Quiz Whiz criteria). */
export const QUIZ_PASS_SCORE = 80;

export type LearnerStats = {
  xpTotal: number;
  streakDays: number;
  lessonsCompleted: number;
  coursesCompleted: number;
  quizzesPassed: number;
  quizBestScore: number;
  subjectsExplored: number;
  liveClassesAttended: number;
};

export type BadgeStatus = {
  earned: boolean;
  current: number;
  target: number;
  percent: number;
};

export type LevelProgress = {
  level: number;
  xpTotal: number;
  /** XP accumulated inside the current level. */
  xpIntoLevel: number;
  /** XP needed to complete the current level. */
  xpForLevel: number;
  /** Cumulative XP required to reach the next level. */
  nextLevelXp: number;
  xpToNext: number;
  percent: number;
};

/** Level = highest rung on the ladder the learner's XP has reached. */
export function levelFromXp(xp: number): number {
  let level = 1;
  for (const rung of LEVELS) {
    if (xp >= rung.xpRequired) level = rung.level;
  }
  return level;
}

export function levelProgress(xp: number): LevelProgress {
  const level = levelFromXp(xp);
  const current = LEVELS.find((rung) => rung.level === level);
  const next = LEVELS.find((rung) => rung.level === level + 1);
  const baseXp = current?.xpRequired ?? 0;
  const nextXp = next?.xpRequired ?? baseXp;
  const xpIntoLevel = xp - baseXp;
  const xpForLevel = nextXp - baseXp;
  return {
    level,
    xpTotal: xp,
    xpIntoLevel,
    xpForLevel,
    nextLevelXp: nextXp,
    xpToNext: Math.max(0, nextXp - xp),
    percent: xpForLevel > 0 ? Math.min(100, Math.round((xpIntoLevel / xpForLevel) * 100)) : 100,
  };
}

/**
 * Builds the learner stat snapshot. Until the stats endpoint exists, lessons /
 * course completions / live classes come from LEARNER_STATS_BASELINE, XP and
 * streak come from the learner profile, quizzes come from best scores (mock
 * catalog overlaid with the scores actually played in this browser), and
 * subjects explored come from the subjects of enrolled courses.
 */
export function deriveStats(input: {
  quizScores: Record<string, number>;
  enrolledCourseIds: string[];
}): LearnerStats {
  const bestByTitle = new Map<string, number>();
  for (const quiz of quizzes) {
    if (quiz.best != null) bestByTitle.set(quiz.title, quiz.best);
  }
  for (const [title, score] of Object.entries(input.quizScores)) {
    bestByTitle.set(title, Math.max(score, bestByTitle.get(title) ?? 0));
  }
  const scores = [...bestByTitle.values()];

  const enrolledSubjects = new Set(
    input.enrolledCourseIds
      .map((id) => allCourses.find((course) => course.id === id)?.subject)
      .filter((subject): subject is string => Boolean(subject)),
  );

  return {
    xpTotal: learner.xp,
    streakDays: learner.streak,
    lessonsCompleted: LEARNER_STATS_BASELINE.lessonsCompleted,
    coursesCompleted: LEARNER_STATS_BASELINE.coursesCompleted,
    quizzesPassed: scores.filter((score) => score >= QUIZ_PASS_SCORE).length,
    quizBestScore: scores.length > 0 ? Math.max(...scores) : 0,
    subjectsExplored: enrolledSubjects.size,
    liveClassesAttended: LEARNER_STATS_BASELINE.liveClassesAttended,
  };
}

/** Reads the single stat a badge's criteria points at. */
function statFor(type: BadgeCriteriaType, stats: LearnerStats): number {
  switch (type) {
    case "xp_total":
      return stats.xpTotal;
    case "lessons_completed":
      return stats.lessonsCompleted;
    case "courses_completed":
      return stats.coursesCompleted;
    case "quizzes_passed":
      return stats.quizzesPassed;
    case "quiz_best_score":
      return stats.quizBestScore;
    case "streak_days":
      return stats.streakDays;
    case "subjects_explored":
      return stats.subjectsExplored;
    case "live_classes_attended":
      return stats.liveClassesAttended;
  }
}

/**
 * Unlock rule (identical on the server): a badge is earned the moment
 * current >= target. Progress is capped at 100% for display.
 */
export function computeBadgeProgress(badge: BadgeDef, stats: LearnerStats): BadgeStatus {
  const current = statFor(badge.criteria.type, stats);
  const target = badge.criteria.target;
  return {
    earned: current >= target,
    current,
    target,
    percent: target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0,
  };
}

export type FilterKey = "all" | "unlocked" | "progress";

export function filterBadges(
  entries: { badge: BadgeDef; status: BadgeStatus }[],
  filter: FilterKey,
): { badge: BadgeDef; status: BadgeStatus }[] {
  switch (filter) {
    case "unlocked":
      return entries.filter((entry) => entry.status.earned);
    case "progress":
      return entries.filter((entry) => !entry.status.earned);
    default:
      return entries;
  }
}

export const ALL_BADGES = BADGES;
