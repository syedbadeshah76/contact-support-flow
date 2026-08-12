import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { learningPath } from "@/data/portal";

export const Route = createFileRoute("/learning-path")({
  head: () => ({
    meta: [
      { title: "Learning Path — Kidzy" },
      {
        name: "description",
        content: "A level-by-level roadmap from foundations to your final challenge and certificate.",
      },
      { property: "og:title", content: "Learning Path — Kidzy" },
      {
        property: "og:description",
        content: "A level-by-level roadmap from foundations to certificate.",
      },
    ],
  }),
  component: LearningPath,
});

function LearningPath() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-7">
      <PageHeader
        eyebrow="Python Creator track"
        title="Your learning path"
        description="Clear one milestone at a time. Finish the track to unlock your certificate."
      />

      <ol className="relative space-y-4 border-l-2 border-dashed border-border pl-6">
        {learningPath.map((step, i) => {
          const done = step.progress === 100;
          const active = !done && step.progress > 0;
          return (
            <li key={step.level} className="relative">
              <span
                className={`absolute -left-[2.15rem] grid size-8 place-items-center rounded-full text-sm font-bold ${
                  done
                    ? "bg-mint/50 text-mint-foreground"
                    : active
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? "✓" : i + 1}
              </span>
              <div className="card-surface p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-bold">{step.level}</h2>
                  <span className="text-sm font-bold text-primary">{step.progress}%</span>
                </div>
                <p className="text-sm text-muted-foreground">{step.detail}</p>
                <Progress value={step.progress} className="mt-3 h-2" />
                {active && (
                  <Button className="mt-4 rounded-full font-bold">Continue level</Button>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
