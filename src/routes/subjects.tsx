import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { subjects } from "@/data/portal";

export const Route = createFileRoute("/subjects")({
  head: () => ({
    meta: [
      { title: "Subjects — Kidzy" },
      {
        name: "description",
        content: "Math, science, coding, art, music, robotics and more — pick a subject to dive in.",
      },
      { property: "og:title", content: "Subjects — Kidzy" },
      {
        property: "og:description",
        content: "Math, science, coding, art, music, robotics and more.",
      },
    ],
  }),
  component: Subjects,
});

function Subjects() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-7">
      <PageHeader
        eyebrow="Pick a lane"
        title="Subjects"
        description="Nine subject worlds, each stacked with courses, quizzes and projects."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s) => (
          <Link
            key={s.name}
            to="/explore"
            search={{ subject: s.name, q: "" }}
            className={`card-surface flex items-center gap-4 p-6 transition-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${s.tint}`}
          >
            <span className="grid size-16 place-items-center rounded-2xl bg-card text-3xl shadow-card">
              {s.emoji}
            </span>
            <div>
              <h2 className="text-lg font-extrabold">{s.name}</h2>
              <p className="text-sm text-muted-foreground">{s.courses} courses · all levels</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
