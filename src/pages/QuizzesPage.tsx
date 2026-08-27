import { useState } from "react";

import { PageHeader } from "@/components/PageHeader";
import { QuizDialog } from "@/components/QuizDialog";
import { Button } from "@/components/ui/button";
import { quizzes } from "@/data/portal";
import { useAppState } from "@/lib/app-state";
import { useDocumentMeta } from "@/lib/meta";

export function QuizzesPage() {
  useDocumentMeta(
    "Quizzes - Kidzy",
    "Timed quizzes with instant feedback, confetti scores and XP for every streak.",
  );

  const [active, setActive] = useState<string | null>(null);
  const { quizScores } = useAppState();

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-7">
      <PageHeader
        eyebrow="Test yourself"
        title="Quizzes"
        description="Short, fast, and weirdly addictive. Beat your best score to climb the board."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => {
          const best = quizScores[quiz.title] ?? quiz.best;
          return (
            <article key={quiz.title} className="card-surface flex flex-col gap-3 p-6">
              <span className="text-3xl">{quiz.emoji}</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  {quiz.subject}
                </p>
                <h2 className="text-lg font-bold">{quiz.title}</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                {quiz.questions} questions · {quiz.minutes} min
              </p>
              <p className="text-sm font-semibold">
                {best !== null && best !== undefined ? (
                  <span className="text-mint-foreground">Best score: {best}%</span>
                ) : (
                  <span className="text-muted-foreground">Not attempted yet</span>
                )}
              </p>
              <Button className="mt-auto rounded-full font-bold" onClick={() => setActive(quiz.title)}>
                {best !== null && best !== undefined ? "Retry quiz" : "Start quiz"}
              </Button>
            </article>
          );
        })}
      </div>

      {active && (
        <QuizDialog title={active} open={active !== null} onOpenChange={(open) => !open && setActive(null)} />
      )}
    </div>
  );
}
