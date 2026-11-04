import { useMemo } from "react";

import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/ui/progress";
import { BADGES } from "@/data/achievements";
import {
  computeBadgeProgress,
  deriveStats,
  type LearnerStats,
} from "@/lib/achievements";
import { useAppState } from "@/lib/app-state";
import { useDocumentMeta } from "@/lib/meta";
import type { BadgeDef } from "@/data/achievements";

const tierStyles: Record<BadgeDef["tier"], string> = {
  Gold: "bg-amber-100 text-amber-700",
  Silver: "bg-slate-100 text-slate-600",
  Bronze: "bg-orange-100 text-orange-700",
};

/** The five numbers a learner controls. Each one feeds the badge goals below. */
function statTiles(stats: LearnerStats) {
  return [
    {
      emoji: "⚡",
      label: "Lifetime XP",
      value: stats.xpTotal.toLocaleString(),
      hint: "Earned from lessons, quizzes and classes",
    },
    {
      emoji: "🔥",
      label: "Day streak",
      value: stats.streakDays.toLocaleString(),
      hint: "Learn something every day to grow it",
    },
    {
      emoji: "🧠",
      label: "Quizzes passed",
      value: stats.quizzesPassed.toLocaleString(),
      hint: "Score 80% or higher to pass",
    },
    {
      emoji: "🧪",
      label: "Live classes",
      value: stats.liveClassesAttended.toLocaleString(),
      hint: "Show up and learn together",
    },
    {
      emoji: "🎨",
      label: "Subjects explored",
      value: stats.subjectsExplored.toLocaleString(),
      hint: "Courses you're studying right now",
    },
  ];
}

export function AchievementsPage() {
  useDocumentMeta(
    "Achievements - EDVANZ",
    "Badges and milestones you've unlocked on your learning journey.",
  );

  const { quizScores, enrolled } = useAppState();

  const stats = useMemo(
    () => deriveStats({ quizScores, enrolledCourseIds: enrolled }),
    [quizScores, enrolled],
  );
  const entries = useMemo(
    () => BADGES.map((badge) => ({ badge, status: computeBadgeProgress(badge, stats) })),
    [stats],
  );
  const unlockedCount = entries.filter((entry) => entry.status.earned).length;
  const tiles = statTiles(stats);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-7">
      <PageHeader
        eyebrow="Flex zone"
        title="Achievements"
        description="Every badge watches one of your numbers — reach the goal and it unlocks automatically."
      />

      {/* Your numbers — the stats that drive every badge */}
      <section className="rounded-3xl border border-[#ddd6fe] bg-gradient-to-r from-[#c7d2fe]/90 via-[#ede9fe] to-[#e0e7ff] p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-black text-slate-900">Your numbers</h3>
          <span className="rounded-full bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-xs">
            🏅 {unlockedCount}/{BADGES.length} badges
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className="rounded-2xl bg-white/90 p-4 shadow-xs"
            >
              <span className="text-xl">{tile.emoji}</span>
              <p className="mt-1 text-2xl font-black text-slate-900">{tile.value}</p>
              <p className="text-[11px] font-black uppercase tracking-wide text-blue-600">
                {tile.label}
              </p>
              <p className="mt-1 text-[10px] font-semibold leading-snug text-muted-foreground">
                {tile.hint}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Badges — each badge is one stat with a goal */}
      <section>
        <h3 className="text-lg font-black text-slate-900">Badges</h3>
        <p className="mt-0.5 text-sm font-semibold text-muted-foreground">
          A badge unlocks the moment its number reaches the goal.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {entries.map(({ badge, status }) => (
            <div
              key={badge.code}
              className={`card-surface flex flex-col items-center gap-2 p-5 text-center ${
                status.earned ? "" : "bg-white opacity-90"
              }`}
            >
              <span className={`text-4xl ${status.earned ? "" : "grayscale"}`}>
                {badge.emoji}
              </span>
              <p className="font-bold text-slate-900">{badge.name}</p>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${tierStyles[badge.tier]}`}
              >
                {badge.tier}
              </span>
              <p className="text-[11px] font-semibold leading-snug text-muted-foreground">
                {badge.description}
              </p>

              {status.earned ? (
                <span className="mt-auto rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black text-blue-600">
                  UNLOCKED
                </span>
              ) : (
                <div className="mt-auto w-full space-y-1 pt-1">
                  <Progress value={status.percent} className="h-1.5" />
                  <p className="text-[10px] font-bold text-slate-400">
                    {status.current.toLocaleString()} / {status.target.toLocaleString()}{" "}
                    {badge.criteria.unit}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
