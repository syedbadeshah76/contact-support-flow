import { useState } from "react";

import { QuizDialog } from "@/components/QuizDialog";
import { Button } from "@/components/ui/button";
import { quizzes } from "@/data/portal";
import { useAppState } from "@/lib/app-state";
import { useDocumentMeta } from "@/lib/meta";

export function QuizzesPage() {
  useDocumentMeta(
    "Quizzes - EDVANZ",
    "Timed quizzes with instant feedback, confetti scores and XP for every streak.",
  );

  const [active, setActive] = useState<string | null>(null);
  const { quizScores } = useAppState();

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 pb-12">
      {/* Header */}
      <div>
        <p className="text-xs font-black uppercase tracking-wider text-blue-600">TEST YOURSELF</p>
        <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">Quizzes</h1>
        <p className="mt-1 text-sm font-semibold text-slate-500">
          Short, fast, and weirdly addictive. Beat your best score to climb the board.
        </p>
      </div>

      {/* Grid of 6 Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => {
          const best = quizScores[quiz.title] ?? quiz.best;
          const attempted = best !== null && best !== undefined;

          return (
            <article
              key={quiz.title}
              className="flex flex-col justify-between rounded-3xl border border-[#ddd6fe] bg-[#ede9fe]/80 p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                    {quiz.subject}
                  </p>
                  <h2 className="mt-1 text-lg font-black text-slate-900">{quiz.title}</h2>
                  <p className="mt-0.5 text-xs font-semibold text-slate-400">
                    {quiz.questions} Questions {quiz.minutes} Mins
                  </p>
                </div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-xs">
                  {quiz.emoji}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-xs font-bold text-slate-400">
                  {attempted ? (
                    <span>Best Score {best}%</span>
                  ) : (
                    <span>Not Attempted Yet</span>
                  )}
                </p>

                <Button
                  onClick={() => setActive(quiz.title)}
                  className="w-full rounded-full bg-blue-600 py-5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 active:scale-95"
                >
                  {attempted ? "Retry Quiz" : "Start Quiz"}
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      {active && (
        <QuizDialog
          title={active}
          open={active !== null}
          onOpenChange={(open) => !open && setActive(null)}
        />
      )}
    </div>
  );
}
