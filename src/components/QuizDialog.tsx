import { useCallback, useEffect, useState } from "react";
import { Check, Clock3, Flame, Sparkles, X, Zap } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fallbackQuestions, quizQuestions } from "@/data/quiz-questions";
import { learner } from "@/data/portal";
import { useAppState } from "@/lib/app-state";
import { cn } from "@/lib/utils";

const QUESTION_SECONDS = 30;
const answerLetters = ["A", "B", "C", "D"];

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
  const [secondsLeft, setSecondsLeft] = useState(QUESTION_SECONDS);

  const reset = () => {
    setIndex(0);
    setPicked(null);
    setCorrect(0);
    setFinished(false);
    setSecondsLeft(QUESTION_SECONDS);
  };

  const question = questions[index];
  const score = Math.round((correct / questions.length) * 100);
  const progress = finished ? 100 : ((index + 1) / questions.length) * 100;

  const advance = useCallback((selected: number | null) => {
    if (!question || finished) return;
    const wasRight = selected === question.answer;
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
      setSecondsLeft(QUESTION_SECONDS);
    }
  }, [correct, finished, index, question, questions.length, setQuizScore, title]);

  useEffect(() => {
    if (!open || finished || picked !== null) return;
    if (secondsLeft <= 0) {
      advance(null);
      return;
    }
    const timer = window.setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [advance, finished, open, picked, secondsLeft]);

  if (!question) return null;

  const selectAnswer = (answerIndex: number) => {
    if (picked !== null) return;
    setPicked(answerIndex);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) reset();
      }}
    >
      <DialogContent className="max-h-[96dvh] w-[calc(100%-1rem)] max-w-4xl overflow-y-auto border-0 bg-transparent p-2 shadow-none sm:rounded-[2.5rem] sm:p-8 [&>button]:right-5 [&>button]:top-5 [&>button]:z-30 [&>button]:rounded-full [&>button]:border-2 [&>button]:border-quiz-ink [&>button]:bg-card [&>button]:p-2 [&>button]:text-quiz-ink [&>button]:opacity-100">
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{finished ? "Quiz results" : `Question ${index + 1} of ${questions.length}`}</DialogDescription>
        </DialogHeader>

        {finished ? (
          <div className="quiz-card-shadow relative overflow-hidden rounded-[2rem] border-4 border-quiz-ink bg-card px-6 py-10 text-center sm:rounded-[2.5rem] sm:px-12 sm:py-14">
            <div className="animate-quiz-celebrate mx-auto grid size-24 place-items-center rounded-full border-4 border-quiz-ink bg-quiz-pop text-5xl sm:size-28">
              {score >= 70 ? "🎉" : "💪"}
            </div>
            <p className="mt-6 text-sm font-black uppercase text-quiz-ink">Challenge complete</p>
            <p className="mt-2 text-5xl font-black text-foreground sm:text-7xl">{score}%</p>
            <p className="mt-3 font-bold text-muted-foreground">
              {correct} of {questions.length} correct · +{correct * 20} XP
            </p>
            <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:flex-row">
              <Button variant="outline" className="h-12 flex-1 rounded-full border-2 border-quiz-ink font-black text-quiz-ink" onClick={reset}>Try again</Button>
              <Button className="h-12 flex-1 rounded-full bg-quiz-ink font-black text-primary-foreground hover:bg-quiz-ink/90" onClick={() => onOpenChange(false)}>Done</Button>
            </div>
          </div>
        ) : (
          <div className="quiz-card-shadow relative rounded-[2rem] border-4 border-quiz-ink bg-card p-5 sm:rounded-[2.5rem] sm:p-10">
            <div className="pointer-events-none absolute -right-1 top-12 hidden sm:block">
              <div className="animate-quiz-mascot relative grid size-32 place-items-center rounded-full border-4 border-quiz-ink bg-quiz-pop text-6xl shadow-lg lg:size-36">
                🦊
                <Sparkles className="absolute -left-4 top-2 size-8 text-destructive" aria-hidden="true" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pr-10 sm:pr-28">
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-quiz-ink bg-quiz-soft px-3 py-1.5 text-xs font-black uppercase text-quiz-ink sm:px-4">
                <span className="size-2.5 animate-pulse rounded-full bg-mint" /> Question {index + 1} of {questions.length}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-quiz-pop-soft px-3 py-2 text-xs font-black text-sun-foreground"><Zap className="size-4 fill-current" /> +20 XP</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-2 text-xs font-black text-destructive"><Flame className="size-4 fill-current" /> {learner.streak} day streak</span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="h-5 flex-1 overflow-hidden rounded-full border-2 border-quiz-ink bg-quiz-soft p-0.5" role="progressbar" aria-label="Quiz progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
                <div className="h-full rounded-full bg-quiz-ink transition-[width] duration-500" style={{ width: `${progress}%` }} />
              </div>
              <div className={cn("flex min-w-20 items-center justify-center gap-1.5 font-black", secondsLeft <= 10 ? "text-destructive" : "text-quiz-ink")} aria-live="polite"><Clock3 className="size-5" /><span>{secondsLeft}s</span></div>
            </div>

            <div className="mt-7 min-h-32 rounded-3xl bg-quiz-soft px-5 py-7 sm:mr-20 sm:px-8">
              <p className="text-xs font-black uppercase text-quiz-ink">{title}</p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-foreground sm:text-3xl">{question.prompt}</h2>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
                  <Button
                    key={opt}
                    type="button"
                    variant="outline"
                    disabled={picked !== null}
                    onClick={() => selectAnswer(i)}
                    className={cn(
                      "h-auto min-h-20 justify-start whitespace-normal rounded-2xl border-4 px-4 py-4 text-left text-base font-black transition-all duration-200 disabled:pointer-events-none disabled:opacity-100 sm:min-h-24 sm:px-5 sm:text-lg",
                      state === "correct" && "quiz-answer-shadow -translate-y-1 border-mint bg-mint/20 text-mint-foreground",
                      state === "wrong" && "quiz-answer-shadow -translate-y-1 border-destructive bg-destructive/10 text-destructive",
                      state === "idle" && "border-quiz-ink bg-card text-foreground hover:-translate-y-1 hover:bg-quiz-soft hover:quiz-answer-shadow active:translate-y-0 active:shadow-none",
                    )}
                  >
                    <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl text-base font-black", state === "correct" ? "bg-mint text-primary-foreground" : state === "wrong" ? "bg-destructive text-destructive-foreground" : "bg-quiz-ink text-primary-foreground")}>
                      {state === "correct" ? <Check className="size-5" /> : state === "wrong" ? <X className="size-5" /> : answerLetters[i]}
                    </span>
                    <span>{opt}</span>
                  </Button>
                );
              })}
            </div>

            <div className="mt-6 flex min-h-12 items-center justify-between gap-4">
              <p className={cn("text-sm font-bold", picked === null ? "text-muted-foreground" : picked === question.answer ? "text-mint-foreground" : "text-destructive")} aria-live="polite">
                {picked === null ? "Pick the answer that feels right." : picked === question.answer ? "Awesome — you nailed it!" : `Good try — the answer is ${answerLetters[question.answer]}.`}
              </p>
              <Button className="h-12 shrink-0 rounded-full bg-quiz-ink px-7 font-black text-primary-foreground shadow-md hover:bg-quiz-ink/90 active:translate-y-0.5" disabled={picked === null} onClick={() => advance(picked)}>
                {index + 1 >= questions.length ? "See results" : "Next question"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
