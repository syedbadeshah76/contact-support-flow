import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDocumentMeta } from "@/lib/meta";

const learningSteps = [
  {
    step: "01",
    title: "Level 1 · Foundations",
    detail: "Variables, loops, first script",
    progress: 100,
    active: false,
    completed: true,
  },
  {
    step: "02",
    title: "Level 2 · Builder",
    detail: "Functions, lists, mini apps",
    progress: 100,
    active: false,
    completed: true,
  },
  {
    step: "03",
    title: "Level 3 · Creator",
    detail: "Game logic & sprites",
    progress: 62,
    active: true,
    completed: false,
  },
  {
    step: "04",
    title: "Final Challenge",
    detail: "Ship your own arcade game",
    progress: 0,
    active: false,
    completed: false,
  },
  {
    step: "05",
    title: "Certificate",
    detail: "Verified Python Creator",
    progress: 0,
    active: false,
    completed: false,
  },
];

export function LearningPathPage() {
  useDocumentMeta(
    "Learning Path - EDVANZ",
    "A level-by-level roadmap from foundations to your final challenge and certificate.",
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 pb-12">
      {/* Header */}
      <div>
        <p className="text-xs font-black uppercase tracking-wider text-blue-600">PYTHON CREATE TRACK</p>
        <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">Your Learning Path</h1>
        <p className="mt-1 text-sm font-semibold text-slate-500">
          Clear one milestone at a time. Finish the track to unlock your certificate.
        </p>
      </div>

      {/* Timeline Section */}
      <div className="relative pl-10 pt-4">
        {/* Dashed Vertical Line */}
        <div className="absolute left-[1.2rem] top-6 bottom-12 w-0.5 border-l-2 border-dashed border-slate-300" />

        <div className="space-y-6">
          {learningSteps.map((item) => {
            const isBlueCircle = item.completed || item.active;

            return (
              <div key={item.step} className="relative flex items-start">
                {/* Step Circle Indicator */}
                <div
                  className={`absolute -left-10 top-5 flex size-9 items-center justify-center rounded-full text-xs font-extrabold transition-all shadow-xs ${
                    isBlueCircle
                      ? "bg-blue-600 text-white ring-4 ring-white"
                      : "border border-slate-200 bg-slate-100 text-slate-400 ring-4 ring-white"
                  }`}
                >
                  {item.step}
                </div>

                {/* Card Container */}
                <div className="w-full rounded-3xl border border-[#ddd6fe] bg-[#ede9fe]/70 p-6 shadow-xs transition-transform duration-200 hover:-translate-y-0.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
                      <p className="mt-0.5 text-xs font-semibold text-slate-500">{item.detail}</p>
                    </div>
                  </div>

                  {/* Progress Bar & Percentage */}
                  <div className="mt-5 flex items-center gap-3">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/70">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-extrabold text-slate-900">{item.progress}%</span>
                  </div>

                  {/* Action Button for Active Level */}
                  {item.active && (
                    <div className="mt-4 pt-1">
                      <Button
                        asChild
                        className="rounded-full bg-blue-600 px-6 py-5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 active:scale-95"
                      >
                        <Link to="/courses/python-quest">Continue Level</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
