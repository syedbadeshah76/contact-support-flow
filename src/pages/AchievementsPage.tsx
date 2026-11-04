import { useMemo } from "react";

import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/ui/progress";
import { BADGES } from "@/data/achievements";
import { learner } from "@/data/portal";
import { computeBadgeProgress, deriveStats, levelProgress } from "@/lib/achievements";
import { useAppState } from "@/lib/app-state";
import { useDocumentMeta } from "@/lib/meta";
import type { BadgeDef } from "@/data/achievements";

const tierStyles: Record<BadgeDef["tier"], string> = {
  Gold: "bg-amber-100 text-amber-700",
  Silver: "bg-slate-100 text-slate-600",
  Bronze: "bg-orange-100 text-orange-700",
};

export function AchievementsPage() {
  useDocumentMeta(
    "Achievements - EDVANZ",
    "Badges, XP levels and milestones you've unlocked on your learning journey.",
  );

  const { quizScores, enrolled } = useAppState();

  const stats = useMemo(
    () => deriveStats({ quizScores, enrolledCourseIds: enrolled }),
    [quizScores, enrolled],
  );
  const level = levelProgress(learner.xp);
  const entries = useMemo(
    () => BADGES.map((badge) => ({ badge, status: computeBadgeProgress(badge, stats) })),
    [stats],
  );
  const unlockedCount = entries.filter((entry) => entry.status.earned).length;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-7">
      <PageHeader
        eyebrow="Flex zone"
        title="Achievements"
        description="Keep learning to earn XP and unlock every badge."
      />

      {/* Level hero — one card, one number, one progress bar */}
      <section className="rounded-3xl border border-[#ddd6fe] bg-gradient-to-r from-[#c7d2fe]/90 via-[#ede9fe] to-[#e0e7ff] p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-3xl bg-white text-center shadow-md">
            <span className="text-3xl font-black text-slate-900">{level.level}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
              Level
            </span>
          </div>
          <div className="min-w-[220px] flex-1">
            <p className="text-xs font-black uppercase tracking-wider text-blue-600">
              {level.xpTotal.toLocaleString()} XP total
            </p>
            <div className="mt-2 w-full">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/60">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${Math.max(4, level.percent)}%` }}
                />
              </div>
              <p className="mt-1.5 text-[11px] font-bold text-slate-700">
                {level.xpToNext.toLocaleString()} XP to Level {level.level + 1}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-xs">
              🔥 {learner.streak}-day streak
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-xs">
              🪙 {learner.coins.toLocaleString()} coins
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-slate-700 shadow-xs">
              🏅 {unlockedCount}/{BADGES.length} badges
            </span>
          </div>
        </div>
      </section>

      {/* Badges — every badge is a card. Earned badges are colorful, locked ones grey. */}
      <section>
        <h3 className="text-lg font-black text-slate-900">Badges</h3>
        <p className="mt-0.5 text-sm font-semibold text-muted-foreground">
          A badge unlocks automatically the moment you reach its goal.
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
