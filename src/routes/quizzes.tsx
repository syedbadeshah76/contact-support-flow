import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { quizzes } from "@/data/portal";

export const Route = createFileRoute("/quizzes")({
  head: () => ({
    meta: [
      { title: "Quizzes — Kidzy" },
      {
        name: "description",
        content: "Timed quizzes with instant feedback, confetti scores and XP for every streak.",
      },
      { property: "og:title", content: "Quizzes — Kidzy" },
      {
        property: "og:description",
        content: "Timed quizzes with instant feedback and XP for every streak.",
      },
    ],
  }),
  component: Quizzes,
});

function Quizzes() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-7">
      <PageHeader
        eyebrow="Test yourself"
        title="Quizzes"
        description="Short, fast, and weirdly addictive. Beat your best score to climb the board."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((q) => (
          <article key={q.title} className="card-surface flex flex-col gap-3 p-6">
            <span className="text-3xl">{q.emoji}</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-primary">{q.subject}</p>
              <h2 className="text-lg font-bold">{q.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {q.questions} questions · {q.minutes} min
            </p>
            <p className="text-sm font-semibold">
              {q.best !== null ? (
                <span className="text-mint-foreground">Best score: {q.best}%</span>
              ) : (
                <span className="text-muted-foreground">Not attempted yet</span>
              )}
            </p>
            <Button className="mt-auto rounded-full font-bold">
              {q.best !== null ? "Retry quiz" : "Start quiz"}
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
