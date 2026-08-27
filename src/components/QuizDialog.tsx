import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fallbackQuestions, quizQuestions } from "@/data/quiz-questions";
import { useAppState } from "@/lib/app-state";

export function QuizDialog({
  title,
  open,
  onOpenChange,
}: {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const questions = quizQuestions[title] ?? fallbackQuestions;
  const { setQuizScore } = useAppState();
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  const reset = () => {
    setIndex(0);
    setPicked(null);
    setCorrect(0);
    setFinished(false);
  };

  const question = questions[index]!;
  const score = Math.round((correct / questions.length) * 100);

  const next = () => {
    if (picked === null) return;
    const wasRight = picked === question.answer;
    const nextCorrect = correct + (wasRight ? 1 : 0);
    if (index + 1 >= questions.length) {
      setCorrect(nextCorrect);
      setFinished(true);
      const finalScore = Math.round((nextCorrect / questions.length) * 100);
      setQuizScore(title, finalScore);
      toast.success(`Quiz complete — ${finalScore}%`);
    } else {
      setCorrect(nextCorrect);
      setIndex(index + 1);
      setPicked(null);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) reset();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {finished
              ? "Here's how you did."
              : `Question ${index + 1} of ${questions.length}`}
          </DialogDescription>
        </DialogHeader>

        {finished ? (
          <div className="space-y-3 text-center">
            <p className="text-5xl">{score >= 70 ? "🎉" : "💪"}</p>
            <p className="text-3xl font-extrabold text-primary">{score}%</p>
            <p className="text-sm text-muted-foreground">
              {correct} of {questions.length} correct · +{correct * 20} XP
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <Progress value={(index / questions.length) * 100} className="h-2" />
            <p className="font-bold">{question.prompt}</p>
            <div className="grid gap-2">
              {question.options.map((opt, i) => {
                const isPicked = picked === i;
                const state =
                  picked === null
                    ? "idle"
                    : i === question.answer
                      ? "correct"
                      : isPicked
                        ? "wrong"
                        : "idle";
                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={picked !== null}
                    onClick={() => setPicked(i)}
                    className={`rounded-2xl px-4 py-2.5 text-left text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                      state === "correct"
                        ? "bg-mint/40 text-mint-foreground"
                        : state === "wrong"
                          ? "bg-destructive/15 text-destructive"
                          : "bg-muted hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <DialogFooter>
          {finished ? (
            <>
              <Button variant="ghost" className="rounded-full font-bold" onClick={reset}>
                Try again
              </Button>
              <Button className="rounded-full font-bold" onClick={() => onOpenChange(false)}>
                Done
              </Button>
            </>
          ) : (
            <Button
              className="rounded-full font-bold"
              disabled={picked === null}
              onClick={next}
            >
              {index + 1 >= questions.length ? "Finish quiz" : "Next question"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
