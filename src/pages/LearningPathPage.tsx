import { Link } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allCourses } from "@/data/portal";
import { useAppState } from "@/lib/app-state";
import { useDocumentMeta } from "@/lib/meta";

const ALL_COURSES = "all";

const pathStepsByCourse = {
  "python-quest": [
    { title: "Level 1 · Foundations", detail: "Variables, loops, first script", progress: 100 },
    { title: "Level 2 · Builder", detail: "Functions, lists, mini apps", progress: 100 },
    { title: "Level 3 · Creator", detail: "Game logic & sprites", progress: 62 },
    { title: "Final Challenge", detail: "Ship your own arcade game", progress: 0 },
    { title: "Certificate", detail: "Verified Python Creator", progress: 0 },
  ],
  "algebra-arcade": [
    { title: "Level 1 · Number Sense", detail: "Patterns, integers, and operations", progress: 100 },
    { title: "Level 2 · Equation Builder", detail: "Expressions and one-step equations", progress: 100 },
    { title: "Level 3 · Two Unknowns", detail: "Solve equations with variables on both sides", progress: 5 },
    { title: "Final Challenge", detail: "Crack the Algebra Arcade", progress: 0 },
    { title: "Certificate", detail: "Verified Algebra Explorer", progress: 0 },
  ],
  "story-lab": [
    { title: "Level 1 · Story Seeds", detail: "Find an idea worth telling", progress: 100 },
    { title: "Level 2 · Character Studio", detail: "Build characters readers remember", progress: 100 },
    { title: "Level 3 · Plot Twists", detail: "Shape a story with momentum", progress: 100 },
    { title: "Final Challenge", detail: "Write and polish your original story", progress: 100 },
    { title: "Certificate", detail: "Verified Story Lab Creator", progress: 35 },
  ],
} satisfies Record<string, { title: string; detail: string; progress: number }[]>;

type LearningPath = {
  courseId: string;
  courseTitle: string;
  courseEmoji: string;
  subject: string;
  steps: { title: string; detail: string; progress: number }[];
};

export function LearningPathPage() {
  useDocumentMeta(
    "Learning Path - EDVANZ",
    "A level-by-level roadmap from foundations to your final challenge and certificate.",
  );

  const { enrolled } = useAppState();
  const [selectedCourseId, setSelectedCourseId] = useState(ALL_COURSES);
  const courses = allCourses.filter((course) => enrolled.includes(course.id));
  const paths: LearningPath[] = courses.map((course) => ({
    courseId: course.id,
    courseTitle: course.title,
    courseEmoji: course.emoji,
    subject: course.subject,
    steps: pathStepsByCourse[course.id as keyof typeof pathStepsByCourse] ?? [
      { title: "Level 1 · Foundations", detail: `Get started with ${course.subject}`, progress: 0 },
      { title: "Level 2 · Build Skills", detail: `Practice key ${course.subject} skills`, progress: 0 },
      { title: "Level 3 · Creator", detail: `Apply what you learned in ${course.title}`, progress: 0 },
      { title: "Final Challenge", detail: `Complete your ${course.subject} challenge`, progress: 0 },
      { title: "Certificate", detail: `Earn your ${course.subject} certificate`, progress: 0 },
    ],
  }));
  const visiblePaths = selectedCourseId === ALL_COURSES
    ? paths
    : paths.filter((path) => path.courseId === selectedCourseId);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 pb-12">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-primary">YOUR NEXT STEPS</p>
          <h1 className="mt-1 text-3xl font-black text-foreground sm:text-4xl">Your Learning Path</h1>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">
            Clear one milestone at a time. Finish a track to unlock its certificate.
          </p>
        </div>
        <div className="w-full sm:w-72">
          <label htmlFor="learning-course-filter" className="mb-1.5 block text-xs font-bold text-muted-foreground">
            Show learning path
          </label>
          <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
            <SelectTrigger id="learning-course-filter" aria-label="Filter learning path by course" className="h-11 rounded-xl bg-background font-semibold">
              <SelectValue placeholder="Choose a course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_COURSES}>All Courses</SelectItem>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id}>{course.emoji} {course.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-8">
        {visiblePaths.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm font-semibold text-muted-foreground">
            Enroll in a course to see its learning path here.
          </p>
        ) : visiblePaths.map((path) => {
          const activeIndex = path.steps.findIndex((step) => step.progress < 100);

          return (
            <section key={path.courseId} aria-label={`${path.courseTitle} learning path`}>
              <div className="mb-4 flex items-center gap-3">
                <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-2xl" aria-hidden="true">
                  {path.courseEmoji}
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-black uppercase tracking-wider text-primary">{path.subject}</p>
                  <h2 className="text-lg font-black text-foreground">{path.courseTitle}</h2>
                </div>
              </div>

              <div className="relative space-y-4 pl-10">
                <div className="absolute bottom-7 left-[1.15rem] top-5 w-0.5 border-l-2 border-dashed border-border" aria-hidden="true" />
                {path.steps.map((item, index) => {
                  const completed = item.progress === 100;
                  const active = index === activeIndex;

                  return (
                    <div key={`${path.courseId}-${item.title}`} className="relative flex items-start">
                      <div
                        className={`absolute -left-10 top-5 grid size-9 place-items-center rounded-full text-xs font-extrabold shadow-xs ring-4 ring-background ${
                          completed || active
                            ? "bg-primary text-primary-foreground"
                            : "border border-border bg-muted text-muted-foreground"
                        }`}
                        aria-label={`Step ${index + 1}${completed ? ", completed" : active ? ", in progress" : ", locked"}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="w-full rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
                        <div>
                          <h3 className="text-lg font-black text-card-foreground">{item.title}</h3>
                          <p className="mt-0.5 text-sm font-semibold text-muted-foreground">{item.detail}</p>
                        </div>

                        <div className="mt-5 flex items-center gap-3">
                          <div
                            className="h-2 w-full overflow-hidden rounded-full bg-muted"
                            role="progressbar"
                            aria-label={`${item.title} progress`}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={item.progress}
                          >
                            <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${item.progress}%` }} />
                          </div>
                          <span className="w-10 shrink-0 text-right text-xs font-extrabold text-foreground">{item.progress}%</span>
                        </div>

                        {active && (
                          <div className="mt-4">
                            <Button asChild className="rounded-full font-bold">
                              <Link to={`/courses/${path.courseId}`}>Continue Learning</Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
