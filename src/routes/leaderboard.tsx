import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { leaderboard } from "@/data/portal";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — Kidzy" },
      {
        name: "description",
        content: "See how your weekly XP stacks up against other learners in your league.",
      },
      { property: "og:title", content: "Leaderboard — Kidzy" },
      {
        property: "og:description",
        content: "See how your weekly XP stacks up against other learners.",
      },
    ],
  }),
  component: Leaderboard,
});

const medals = ["🥇", "🥈", "🥉"];

function Leaderboard() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-7">
      <PageHeader
        eyebrow="This week"
        title="Leaderboard"
        description="Resets every Sunday night. Top 3 keep their crown badge."
      />

      <ul className="space-y-3">
        {leaderboard.map((p) => (
          <li
            key={p.name}
            className={`card-surface flex items-center gap-4 p-4 ${
              p.you ? "ring-2 ring-primary" : ""
            }`}
          >
            <span className="w-8 text-center text-lg font-extrabold">
              {medals[p.rank - 1] ?? p.rank}
            </span>
            <span className="grid size-11 place-items-center rounded-full bg-muted text-xl">
              {p.avatar}
            </span>
            <div className="flex-1">
              <p className="font-bold">
                {p.name}
                {p.you && (
                  <span className="ml-2 rounded-full bg-primary-soft px-2 py-0.5 text-xs font-bold text-accent-foreground">
                    You
                  </span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">{p.badge}</p>
            </div>
            <span className="font-extrabold text-primary">{p.xp} XP</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
