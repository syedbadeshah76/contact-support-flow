import { leaderboard } from "@/data/portal";
import { useDocumentMeta } from "@/lib/meta";

const medals = ["🥇", "🥈", "🥉"];

const fullLeaderboard = [
  { rank: 1, name: "Zayn", avatar: "🐼", xp: 4820, level: "Level 12" },
  { rank: 2, name: "Aisha", avatar: "🦄", xp: 4820, level: "Level 12" },
  { rank: 3, name: "Emma", avatar: "🦊", xp: 4820, level: "Level 12", you: true },
  { rank: 4, name: "Deigo", avatar: "🐯", xp: 4820, level: "Level 12" },
  { rank: 5, name: "Mie", avatar: "🐧", xp: 4820, level: "Level 12" },
  { rank: 6, name: "Kofi", avatar: "🦁", xp: 4820, level: "Level 12" },
  { rank: 7, name: "Luca", avatar: "🐨", xp: 4820, level: "Level 12" },
  { rank: 8, name: "Zan", avatar: "🐧", xp: 4820, level: "Level 12" },
  { rank: 9, name: "Jhon", avatar: "🦁", xp: 4820, level: "Level 12" },
];

export function LeaderboardPage() {
  useDocumentMeta(
    "Leaderboard - EDVANZ",
    "See how your weekly XP stacks up against other learners in your league.",
  );

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 pb-12">
      {/* Header */}
      <div>
        <p className="text-xs font-black uppercase tracking-wider text-blue-600">THIS WEEK</p>
        <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">Leaderboard</h1>
        <p className="mt-1 text-sm font-semibold text-slate-500">
          Resets every Sunday night. Top 3 keep their crown badge.
        </p>
      </div>

      {/* Rows List */}
      <div className="space-y-3.5">
        {fullLeaderboard.map((player, index) => (
          <div
            key={player.name + index}
            className={`flex items-center justify-between rounded-3xl border ${
              player.you
                ? "border-blue-300 bg-[#ede9fe] shadow-sm ring-2 ring-blue-500/20"
                : "border-[#ddd6fe] bg-[#ede9fe]/70"
            } px-5 py-4 transition-transform hover:-translate-y-0.5`}
          >
            <div className="flex items-center gap-4">
              <span className="w-6 text-center text-xl font-extrabold">
                {medals[index] ?? ""}
              </span>

              <div className="flex size-11 items-center justify-center rounded-full bg-white text-xl shadow-xs">
                {player.avatar}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-900">{player.name}</h3>
                  {player.you && (
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-black text-blue-600">
                      You
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-slate-400">{player.level}</p>
              </div>
            </div>

            <div className="text-base font-black text-slate-900">
              {player.xp.toLocaleString()} XP
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
