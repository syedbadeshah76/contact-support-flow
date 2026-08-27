import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHeader } from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const ranges = {
  week: { label: "This week", factor: 1 },
  month: { label: "This month", factor: 3.4 },
  all: { label: "All time", factor: 11.2 },
} as const;

type RangeKey = keyof typeof ranges;

function Leaderboard() {
  const [range, setRange] = useState<RangeKey>("week");
  const [friendsOnly, setFriendsOnly] = useState(false);

  const rows = leaderboard
    .filter((p) => !friendsOnly || p.you || p.rank <= 4)
    .map((p) => ({ ...p, xp: Math.round(p.xp * ranges[range].factor) }))
    .sort((a, b) => b.xp - a.xp);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-7">
      <PageHeader
        eyebrow="Rankings"
        title="Leaderboard"
        description="Weekly board resets every Sunday night. Top 3 keep their crown badge."
      />

      <Tabs value={range} onValueChange={(v) => setRange(v as RangeKey)}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList className="rounded-full">
            {(Object.keys(ranges) as RangeKey[]).map((k) => (
              <TabsTrigger key={k} value={k} className="rounded-full font-bold">
                {ranges[k].label}
              </TabsTrigger>
            ))}
          </TabsList>
          <button
            type="button"
            aria-pressed={friendsOnly}
            onClick={() => setFriendsOnly((f) => !f)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
              friendsOnly
                ? "bg-primary text-primary-foreground shadow-pop"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            Friends only
          </button>
        </div>

        {(Object.keys(ranges) as RangeKey[]).map((k) => (
          <TabsContent key={k} value={k} className="mt-5">
            <ul className="space-y-3">
              {rows.map((p, i) => (
                <li
                  key={p.name}
                  className={`card-surface flex items-center gap-4 p-4 ${
                    p.you ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <span className="w-8 text-center text-lg font-extrabold">
                    {medals[i] ?? i + 1}
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
                  <span className="font-extrabold text-primary">
                    {p.xp.toLocaleString()} XP
                  </span>
                </li>
              ))}
            </ul>
            {rows.length === 0 && (
              <div className="card-surface p-10 text-center">
                <p className="text-3xl">👀</p>
                <p className="mt-2 font-bold">No learners in this view</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
