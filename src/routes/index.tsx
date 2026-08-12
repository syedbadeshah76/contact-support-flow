import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Sparkles, Trophy, Video, ChevronRight } from "lucide-react";

import heroArt from "@/assets/hero-learning.png";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CourseCard } from "@/components/CourseCard";
import {
  continueLearning,
  dailyChallenges,
  learner,
  liveClasses,
  popularCourses,
  stats,
  subjects,
} from "@/data/portal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Kidzy Learning Portal" },
      {
        name: "description",
        content:
          "Your learning dashboard: streaks, XP, daily challenges and courses picked for teens.",
      },
      { property: "og:title", content: "Dashboard — Kidzy Learning Portal" },
      {
        property: "og:description",
        content: "Your learning dashboard: streaks, XP, daily challenges and courses picked for teens.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const xpPct = Math.round((learner.xp / learner.xpToNext) * 100);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <section className="relative overflow-hidden rounded-3xl bg-hero-gradient px-6 py-8 text-primary-foreground shadow-pop sm:px-10 sm:py-10">
        <div className="grid items-center gap-6 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] opacity-85">
              Level {learner.level} · {learner.streak}-day streak
            </p>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-5xl">
              Welcome back, {learner.name} 👋
            </h1>
            <p className="mt-3 max-w-lg text-base opacity-90">
              Continue your learning adventure today — you're {learner.xpToNext - learner.xp} XP
              away from Level {learner.level + 1}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="rounded-full font-bold">
                <Link to="/my-learning">Continue learning</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-primary-foreground/50 bg-transparent font-bold text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
              >
                <Link to="/explore">Explore courses</Link>
              </Button>
            </div>
            <div className="mt-6 max-w-md">
              <div className="flex justify-between text-xs font-semibold opacity-90">
                <span>{learner.xp} XP</span>
                <span>{learner.xpToNext} XP</span>
              </div>
              <Progress value={xpPct} className="mt-1.5 h-2 bg-primary-foreground/25" />
            </div>
          </div>
          <img
            src={heroArt}
            alt="Teens learning together on laptops and tablets"
            width={1024}
            height={768}
            className="mx-auto w-full max-w-sm drop-shadow-xl"
          />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card-surface flex items-center gap-4 p-4">
            <span className={`grid size-12 place-items-center rounded-2xl text-2xl ${s.tint}`}>
              {s.emoji}
            </span>
            <div>
              <p className="text-2xl font-extrabold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <SectionHead title="Continue learning" to="/my-learning" linkLabel="My learning" />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {continueLearning.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="card-surface p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Flame className="size-5 text-primary" /> Daily challenges
          </h2>
          <ul className="mt-4 space-y-3">
            {dailyChallenges.map((c) => (
              <li
                key={c.task}
                className="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3"
              >
                <span className="flex items-center gap-3 text-sm font-semibold">
                  <span
                    className={`grid size-7 place-items-center rounded-full text-xs ${
                      c.done ? "bg-mint/40" : "bg-card border border-border"
                    }`}
                  >
                    {c.done ? "✓" : ""}
                  </span>
                  <span className={c.done ? "line-through opacity-60" : ""}>{c.task}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
                  <Sparkles className="size-4" /> {c.xp}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-surface p-5">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Video className="size-5 text-primary" /> Upcoming live classes
          </h2>
          <ul className="mt-4 space-y-3">
            {liveClasses.map((l) => (
              <li key={l.topic} className="rounded-2xl bg-muted/60 px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-bold">{l.topic}</p>
                  <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-accent-foreground">
                    {l.countdown}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {l.teacher} · {l.time}
                </p>
              </li>
            ))}
          </ul>
          <Button asChild variant="ghost" className="mt-3 w-full rounded-full font-bold">
            <Link to="/live-classes">See all classes</Link>
          </Button>
        </section>
      </div>

      <section className="space-y-4">
        <SectionHead title="Popular right now" to="/explore" linkLabel="Explore all" />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {popularCourses.slice(0, 6).map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHead title="Browse subjects" to="/subjects" linkLabel="All subjects" />
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {subjects.slice(0, 5).map((s) => (
            <Link
              key={s.name}
              to="/subjects"
              className={`card-surface flex flex-col items-center gap-2 p-5 text-center transition-transform hover:-translate-y-1 ${s.tint}`}
            >
              <span className="text-3xl">{s.emoji}</span>
              <span className="font-bold">{s.name}</span>
              <span className="text-xs text-muted-foreground">{s.courses} courses</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="card-surface flex flex-wrap items-center justify-between gap-4 bg-soft-gradient p-6">
        <div className="flex items-center gap-4">
          <span className="grid size-14 place-items-center rounded-2xl bg-card text-3xl shadow-card">
            🏆
          </span>
          <div>
            <h2 className="text-xl font-bold">You're #3 this week</h2>
            <p className="text-sm text-muted-foreground">
              760 XP behind first place — one quiz could flip it.
            </p>
          </div>
        </div>
        <Button asChild className="rounded-full font-bold">
          <Link to="/leaderboard">
            <Trophy className="size-4" /> View leaderboard
          </Link>
        </Button>
      </section>
    </div>
  );
}

function SectionHead({
  title,
  to,
  linkLabel,
}: {
  title: string;
  to: string;
  linkLabel: string;
}) {
  return (
    <div className="flex items-end justify-between gap-3">
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <Link
        to={to}
        className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
      >
        {linkLabel} <ChevronRight className="size-4" />
      </Link>
    </div>
  );
}
