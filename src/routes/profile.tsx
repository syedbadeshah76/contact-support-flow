import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { badges, certificates, learner, stats, subjects } from "@/data/portal";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Kidzy" },
      {
        name: "description",
        content: "Your avatar, level, interests, badges and learning goals in one place.",
      },
      { property: "og:title", content: "Profile — Kidzy" },
      {
        property: "og:description",
        content: "Your avatar, level, interests, badges and learning goals.",
      },
    ],
  }),
  component: Profile,
});

function Profile() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-7">
      <PageHeader eyebrow="You" title="Profile" />

      <section className="card-surface flex flex-wrap items-center gap-6 bg-soft-gradient p-6">
        <span className="grid size-24 place-items-center rounded-3xl bg-card text-5xl shadow-card">
          {learner.avatar}
        </span>
        <div className="min-w-52 flex-1">
          <h2 className="text-2xl font-extrabold">{learner.name}</h2>
          <p className="text-sm text-muted-foreground">
            Level {learner.level} · {learner.streak}-day streak · {learner.coins} coins
          </p>
          <Progress
            value={Math.round((learner.xp / learner.xpToNext) * 100)}
            className="mt-3 h-2"
          />
          <p className="mt-1 text-xs font-semibold text-muted-foreground">
            {learner.xp} / {learner.xpToNext} XP to Level {learner.level + 1}
          </p>
        </div>
        <Button variant="outline" className="rounded-full font-bold">
          Edit profile
        </Button>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="text-2xl font-extrabold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="card-surface p-6">
        <h2 className="text-xl font-bold">Interests</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {subjects.slice(0, 6).map((s) => (
            <span
              key={s.name}
              className="rounded-full bg-muted px-3.5 py-1.5 text-sm font-semibold"
            >
              {s.emoji} {s.name}
            </span>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card-surface p-6">
          <h2 className="text-xl font-bold">Recent badges</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {badges
              .filter((b) => b.earned)
              .map((b) => (
                <div key={b.name} className="w-20 text-center">
                  <span className="text-3xl">{b.emoji}</span>
                  <p className="text-xs font-semibold">{b.name}</p>
                </div>
              ))}
          </div>
        </section>

        <section className="card-surface p-6">
          <h2 className="text-xl font-bold">Certificates</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {certificates.map((c) => (
              <li key={c.title} className="flex justify-between rounded-xl bg-muted/60 px-4 py-2.5">
                <span className="font-semibold">{c.title}</span>
                <span className="text-muted-foreground">{c.date}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
