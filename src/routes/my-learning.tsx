import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { CourseCard } from "@/components/CourseCard";
import { Progress } from "@/components/ui/progress";
import { continueLearning, popularCourses } from "@/data/portal";

export const Route = createFileRoute("/my-learning")({
  head: () => ({
    meta: [
      { title: "My Learning — Kidzy" },
      {
        name: "description",
        content: "Pick up every course you started and track lesson-by-lesson progress.",
      },
      { property: "og:title", content: "My Learning — Kidzy" },
      {
        property: "og:description",
        content: "Pick up every course you started and track lesson-by-lesson progress.",
      },
    ],
  }),
  component: MyLearning,
});

function MyLearning() {
  const avg = Math.round(
    continueLearning.reduce((a, c) => a + (c.progress ?? 0), 0) / continueLearning.length,
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <PageHeader
        eyebrow="Keep going"
        title="My Learning"
        description="Everything you've started, sorted by what's closest to done."
      />

      <div className="card-surface p-5">
        <div className="flex items-center justify-between text-sm font-semibold">
          <span>Overall course progress</span>
          <span className="text-primary">{avg}%</span>
        </div>
        <Progress value={avg} className="mt-3 h-2.5" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {continueLearning.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold">Saved for later</h2>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {popularCourses.slice(0, 3).map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
