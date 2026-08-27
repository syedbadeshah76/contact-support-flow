import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/ui/progress";
import { badges, learner } from "@/data/portal";
import { useDocumentMeta } from "@/lib/meta";

export function AchievementsPage() {
  useDocumentMeta(
    "Achievements - Kidzy",
    "Badges, XP history and milestones you've unlocked on your learning journey.",
  );

  const earned = badges.filter((badge) => badge.earned).length;

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

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {badges.map((badge) => (
          <div
            key={badge.name}
            className={`card-surface flex flex-col items-center gap-2 p-6 text-center ${
              badge.earned ? "" : "opacity-45 grayscale"
            }`}
          >
            <span className="text-4xl">{badge.emoji}</span>
            <p className="font-bold">{badge.name}</p>
            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground">
              {badge.tier}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
