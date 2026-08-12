import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/ui/progress";
import { badges, learner } from "@/data/portal";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — Kidzy" },
      {
        name: "description",
        content: "Badges, XP history and milestones you've unlocked on your learning journey.",
      },
      { property: "og:title", content: "Achievements — Kidzy" },
      {
        property: "og:description",
        content: "Badges, XP history and milestones you've unlocked.",
      },
    ],
  }),
  component: Achievements,
});

function Achievements() {
  const earned = badges.filter((b) => b.earned).length;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-7">
      <PageHeader
        eyebrow="Flex zone"
        title="Achievements"
        description={`${earned} of ${badges.length} badges unlocked. Keep the streak alive.`}
      />

      <div className="card-surface bg-soft-gradient p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Current level</p>
            <p className="text-4xl font-extrabold">Level {learner.level}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-muted-foreground">Total XP</p>
            <p className="text-4xl font-extrabold text-primary">{learner.xp}</p>
          </div>
        </div>
        <Progress
          value={Math.round((learner.xp / learner.xpToNext) * 100)}
          className="mt-4 h-2.5"
        />
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {badges.map((b) => (
          <div
            key={b.name}
            className={`card-surface flex flex-col items-center gap-2 p-6 text-center ${
              b.earned ? "" : "opacity-45 grayscale"
            }`}
          >
            <span className="text-4xl">{b.emoji}</span>
            <p className="font-bold">{b.name}</p>
            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
              {b.tier}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
