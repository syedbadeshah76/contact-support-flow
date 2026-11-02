import { useMemo, useState } from "react";

import { PageHeader } from "@/components/PageHeader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { BADGES, RECENT_XP_EVENTS, UNLOCKED_AT } from "@/data/achievements";
import { learner } from "@/data/portal";
import {
  computeBadgeProgress,
  deriveStats,
  filterBadges,
  levelProgress,
  type BadgeStatus,
  type FilterKey,
} from "@/lib/achievements";
import { useAppState } from "@/lib/app-state";
import { useDocumentMeta } from "@/lib/meta";
import type { BadgeDef } from "@/data/achievements";

const tierStyles: Record<BadgeDef["tier"], string> = {
  Gold: "bg-amber-100 text-amber-700",
  Silver: "bg-slate-100 text-slate-600",
  Bronze: "bg-orange-100 text-orange-700",
};

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "unlocked", label: "Unlocked" },
  { key: "progress", label: "In progress" },
];

export function AchievementsPage() {
  useDocumentMeta(
    "Achievements - EDVANZ",
    "Badges, XP levels and milestones you've unlocked on your learning journey.",
  );

  const { quizScores, enrolled, isEnrolled } = useAppState();
  const [filter, setFilter] = useState<FilterKey>("all");
  const [activeCode, setActiveCode] = useState<string | null>(null);

  const stats = useMemo(
    () => deriveStats({ quizScores, enrolledCourseIds: enrolled }),
    [quizScores, enrolled],
  );
  const level = levelProgress(learner.xp);
  const entries = useMemo(
    () => BADGES.map((badge) => ({ badge, status: computeBadgeProgress(badge, stats) })),
    [stats],
  );
  const visible = filterBadges(entries, filter);
  const unlockedCount = entries.filter((entry) => entry.status.earned).length;
  const active = entries.find((entry) => entry.badge.code === activeCode) ?? null;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-7">
      <PageHeader
        eyebrow="Flex zone"
        title="Achievements"
        description={`${unlockedCount} of ${BADGES.length} badges unlocked. Earn XP, climb levels, grab badges — all automatic.`}
      />

      {/* Level hero */}
      <section className="relative flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-[#ddd6fe] bg-gradient-to-r from-[#c7d2fe]/90 via-[#ede9fe] to-[#e0e7ff] p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-5">
          <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-3xl bg-white text-center shadow-md">
            <span className="text-3xl font-black text-slate-900">{level.level}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
              Level
            </span>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-blue-600">
              {level.xpTotal.toLocaleString()} XP total
            </p>
            <div className="mt-2 w-full max-w-xs">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/60">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${Math.max(4, level.percent)}%` }}
                />
              </div>
              <p className="mt-1.5 text-[11px] font-bold text-slate-700">
                {level.percent}% · {level.xpToNext.toLocaleString()} XP to Level{" "}
                {level.level + 1}
              </p>
            </div>
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
      </section>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => {
          const count =
            item.key === "unlocked"
              ? unlockedCount
              : item.key === "progress"
                ? BADGES.length - unlockedCount
                : BADGES.length;
          const activeFilter = filter === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              className={`rounded-full px-4 py-2 text-xs font-extrabold transition-colors ${
                activeFilter
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {item.label} · {count}
            </button>
          );
        })}
      </div>

      {/* Badge grid */}
      {visible.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-3xl">🌱</p>
          <p className="mt-2 font-bold text-slate-900">Nothing here yet</p>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">
            {filter === "unlocked"
              ? "Unlock your first badge by finishing a lesson or quiz!"
              : "Wow — everything is unlocked. Keep the streak alive!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map(({ badge, status }) => (
            <button
              key={badge.code}
              type="button"
              onClick={() => setActiveCode(badge.code)}
              className={`card-surface flex flex-col items-center gap-2 p-5 text-center transition-transform hover:-translate-y-0.5 ${
                status.earned ? "" : "bg-white opacity-90"
              }`}
            >
              <div className="relative">
                <span className={`text-4xl ${status.earned ? "" : "grayscale"}`}>
                  {badge.emoji}
                </span>
                {status.earned && (
                  <span className="absolute -right-2 -top-1 text-xs">✨</span>
                )}
              </div>
              <p className="font-bold text-slate-900">{badge.name}</p>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${tierStyles[badge.tier]}`}
              >
                {badge.tier}
              </span>

              {status.earned ? (
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black text-blue-600">
                  UNLOCKED
                </span>
              ) : (
                <div className="mt-1 w-full space-y-1">
                  <Progress value={status.percent} className="h-1.5" />
                  <p className="text-[10px] font-bold text-slate-400">
                    {status.current.toLocaleString()} / {status.target.toLocaleString()}{" "}
                    {badge.criteria.unit}
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* XP activity (ledger feed) */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900">Recent XP activity</h3>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black text-blue-600">
            +{RECENT_XP_EVENTS.reduce((sum, event) => sum + event.xp, 0)} XP lately
          </span>
        </div>
        <div className="mt-4 space-y-2.5">
          {RECENT_XP_EVENTS.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
            >
              <div>
                <p className="text-xs font-bold text-slate-800">{event.label}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  {event.at}
                </p>
              </div>
              <span className="text-sm font-black text-emerald-600">+{event.xp} XP</span>
            </div>
          ))}
        </div>
      </section>

      {/* Badge detail dialog */}
      <Dialog open={active != null} onOpenChange={(open) => !open && setActiveCode(null)}>
        {active && <BadgeDetail badge={active.badge} status={active.status} />}
      </Dialog>
    </div>
  );
}

function BadgeDetail({ badge, status }: { badge: BadgeDef; status: BadgeStatus }) {
  const unlockedAt = UNLOCKED_AT[badge.code];
  return (
    <DialogContent className="max-w-sm rounded-3xl border-slate-200/80 p-6 sm:p-8">
      <DialogHeader className="items-center text-center">
        <div className="flex size-20 items-center justify-center rounded-3xl bg-slate-50 text-5xl shadow-xs">
          <span className={status.earned ? "" : "grayscale opacity-70"}>{badge.emoji}</span>
        </div>
        <DialogTitle className="mt-2 text-2xl font-black text-slate-900">
          {badge.name}
        </DialogTitle>
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wide ${tierStyles[badge.tier]}`}
        >
          {badge.tier} badge
        </span>
        <DialogDescription className="pt-1 text-sm font-semibold text-muted-foreground">
          {badge.description}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        {status.earned ? (
          <div className="rounded-2xl bg-blue-50 p-4 text-center">
            <p className="text-xs font-black uppercase tracking-wider text-blue-600">
              Unlocked {unlockedAt ?? ""}
            </p>
            <p className="mt-1 text-sm font-bold text-slate-800">
              You hit {status.target.toLocaleString()} {badge.criteria.unit}!
            </p>
          </div>
        ) : (
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-700">
              <span>
                {status.current.toLocaleString()} / {status.target.toLocaleString()}
              </span>
              <span>{status.percent}%</span>
            </div>
            <Progress value={status.percent} className="mt-2 h-2" />
            <p className="mt-2 text-center text-[11px] font-bold text-slate-500">
              {Math.max(0, status.target - status.current).toLocaleString()} more{" "}
              {badge.criteria.unit} to go
            </p>
          </div>
        )}

        <div className="flex justify-center gap-3">
          <span className="rounded-full bg-amber-50 px-4 py-2 text-xs font-extrabold text-amber-700">
            +{badge.xpReward} XP
          </span>
          <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-extrabold text-blue-600">
            🪙 +{badge.coinsReward} coins
          </span>
        </div>
      </div>
    </DialogContent>
  );
}
