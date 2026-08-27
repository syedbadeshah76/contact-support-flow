import { Link } from "react-router-dom";
import { toast } from "sonner";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { learningPath } from "@/data/portal";
import { useDocumentMeta } from "@/lib/meta";

export function LearningPathPage() {
  useDocumentMeta(
    "Learning Path - Kidzy",
    "A level-by-level roadmap from foundations to your final challenge and certificate.",
  );

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-7">
      <PageHeader
        eyebrow="Python Creator track"
        title="Your learning path"
        description="Clear one milestone at a time. Finish the track to unlock your certificate."
      />

      <ol className="relative space-y-4 border-l-2 border-dashed border-border pl-6">
        {learningPath.map((step, index) => {
          const done = step.progress === 100;
          const active = !done && step.progress > 0;
          const locked = !done && step.progress === 0;

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
                {done ? "✓" : index + 1}
              </span>
              <div className="card-surface p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-bold">{step.level}</h2>
                  <span className="text-sm font-bold text-primary">{step.progress}%</span>
                </div>
                <p className="text-sm text-muted-foreground">{step.detail}</p>
                <Progress value={step.progress} className="mt-3 h-2" />
                <div className="mt-4 flex flex-wrap gap-2">
                  {active && (
                    <Button asChild className="rounded-full font-bold">
                      <Link to="/courses/python-quest">Continue level</Link>
                    </Button>
                  )}
                  {done && (
                    <Button asChild variant="outline" className="rounded-full font-bold">
                      <Link to="/courses/python-quest">Review level</Link>
                    </Button>
                  )}
                  {locked && (
                    <Button
                      variant="ghost"
                      className="rounded-full font-bold"
                      onClick={() =>
                        toast.message("Locked", {
                          description: `Finish "${learningPath[index - 1]?.level}" to unlock this step.`,
                        })
                      }
                    >
                      🔒 Locked
                    </Button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
