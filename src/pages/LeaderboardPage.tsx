import { useState } from "react";

import { PageHeader } from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { leaderboard } from "@/data/portal";
import { useDocumentMeta } from "@/lib/meta";

const medals = ["🥇", "🥈", "🥉"];
const ranges = {
  week: { label: "This week", factor: 1 },
  month: { label: "This month", factor: 3.4 },
  all: { label: "All time", factor: 11.2 },
} as const;

type RangeKey = keyof typeof ranges;

export function LeaderboardPage() {
  useDocumentMeta(
    "Leaderboard - Kidzy",
    "See how your weekly XP stacks up against other learners in your league.",
  );

  const [range, setRange] = useState<RangeKey>("week");
  const [friendsOnly, setFriendsOnly] = useState(false);

  const rows = leaderboard
    .filter((player) => !friendsOnly || player.you || player.rank <= 4)
    .map((player) => ({ ...player, xp: Math.round(player.xp * ranges[range].factor) }))
    .sort((a, b) => b.xp - a.xp);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-7">
      <PageHeader
        eyebrow="Rankings"
        title="Leaderboard"
        description="Weekly board resets every Sunday night. Top 3 keep their crown badge."
      />

      <Tabs value={range} onValueChange={(value) => setRange(value as RangeKey)}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList className="rounded-full">
            {(Object.keys(ranges) as RangeKey[]).map((key) => (
              <TabsTrigger key={key} value={key} className="rounded-full font-bold">
                {ranges[key].label}
              </TabsTrigger>
            ))}
          </TabsList>
          <button
            type="button"
            aria-pressed={friendsOnly}
            onClick={() => setFriendsOnly((current) => !current)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
              friendsOnly
                ? "bg-primary text-primary-foreground shadow-pop"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            Friends only
          </button>
        </div>

        {(Object.keys(ranges) as RangeKey[]).map((key) => (
          <TabsContent key={key} value={key} className="mt-5">
            <ul className="space-y-3">
              {rows.map((player, index) => (
                <li
                  key={player.name}
                  className={`card-surface flex items-center gap-4 p-4 ${
                    player.you ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <span className="w-8 text-center text-lg font-extrabold">
                    {medals[index] ?? index + 1}
                  </span>
                  <span className="grid size-11 place-items-center rounded-full bg-muted text-xl">
                    {player.avatar}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold">
                      {player.name}
                      {player.you && (
                        <span className="ml-2 rounded-full bg-primary-soft px-2 py-0.5 text-xs font-bold text-accent-foreground">
                          You
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">{player.badge}</p>
                  </div>
                  <span className="font-extrabold text-primary">
                    {player.xp.toLocaleString()} XP
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
