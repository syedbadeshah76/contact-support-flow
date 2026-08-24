import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Clock, Heart, Loader2, Star, Users, Play, Share2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { allCourses } from "@/data/portal";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/courses/$courseId")({
  loader: ({ params }) => {
    const course = allCourses.find((c) => c.id === params.courseId);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Course not found — Kidzy" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.course.title} — Kidzy`;
    const description = `${loaderData.course.subject} course with ${loaderData.course.teacher} · ${loaderData.course.lessons} lessons · ${loaderData.course.duration}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CourseDetail,
});

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const { isFavourite, toggleFavourite, isEnrolled, enroll } = useAppState();
  const [busy, setBusy] = useState(false);
  const [lessonsDone, setLessonsDone] = useState<number[]>([]);
  const favourite = isFavourite(course.id);
  const enrolled = isEnrolled(course.id) || typeof course.progress === "number";

  const modules = [
    { name: "Getting started", lessons: ["Welcome & setup", "Your first win", "Tools tour"] },
    { name: "Core skills", lessons: ["Building blocks", "Practice lab", "Mini project"] },
    { name: "Level up", lessons: ["Advanced tricks", "Final project", "Wrap-up & certificate"] },
  ];

  const handleEnroll = async () => {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 600));
    enroll(course.id);
    setBusy(false);
    toast.success(enrolled ? "Jumping back in…" : `You're enrolled in ${course.title}!`);
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Course link copied to clipboard");
    } catch {
      toast.error("Couldn't copy the link — try again");
    }
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <Link
        to="/explore"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline focus-visible:underline focus-visible:outline-none"
      >
        <ArrowLeft className="size-4" /> Back to explore
      </Link>

      <section className="card-surface overflow-hidden">
        <div className={`grid h-40 place-items-center text-6xl ${course.tint}`}>
          {course.emoji}
        </div>
        <div className="space-y-4 p-5 sm:p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-primary">
              {course.subject} · {course.level} · Ages {course.age}
            </p>
            <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">{course.title}</h1>
            <p className="text-sm text-muted-foreground">Taught by {course.teacher}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1 font-semibold text-sun-foreground">
              <Star className="size-4 fill-current" /> {course.rating}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="size-4" /> {course.students.toLocaleString()} learners
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-4" /> {course.duration}
            </span>
            <span>{course.lessons} lessons</span>
            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-bold">
              {course.price}
            </span>
          </div>

          {typeof course.progress === "number" && (
            <div>
              <Progress value={course.progress} className="h-2.5" />
              <p className="mt-1 text-xs font-semibold text-muted-foreground">
                {course.progress}% complete · Next: {course.nextLesson}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleEnroll}
              disabled={busy}
              className="rounded-full font-bold"
            >
              {busy ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}
              {busy ? "Loading…" : enrolled ? "Resume course" : "Enroll now"}
            </Button>
            <Button
              variant="outline"
              className="rounded-full font-bold"
              aria-pressed={favourite}
              onClick={() => {
                const added = toggleFavourite(course.id);
                toast[added ? "success" : "message"](
                  added ? "Saved to favourites" : "Removed from favourites",
                );
              }}
            >
              <Heart className={`size-4 ${favourite ? "fill-primary text-primary" : ""}`} />
              {favourite ? "Saved" : "Save"}
            </Button>
            <Button variant="ghost" className="rounded-full font-bold" onClick={share}>
              <Share2 className="size-4" /> Share
            </Button>
          </div>
        </div>
      </section>

      <Tabs defaultValue="overview">
        <TabsList className="rounded-full">
          <TabsTrigger value="overview" className="rounded-full font-bold">
            Overview
          </TabsTrigger>
          <TabsTrigger value="lessons" className="rounded-full font-bold">
            Lessons
          </TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-full font-bold">
            Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="card-surface mt-4 space-y-3 p-5">
          <h2 className="text-lg font-bold">What you'll learn</h2>
          <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {[
              `${course.subject} fundamentals, explained simply`,
              "Hands-on projects after every module",
              "Quizzes that earn you XP and badges",
              "A shareable certificate at the finish line",
            ].map((point) => (
              <li key={point} className="rounded-2xl bg-muted/60 px-4 py-2.5">
                ✅ {point}
              </li>
            ))}
          </ul>
          <Button asChild variant="ghost" className="rounded-full font-bold">
            <Link to="/support/new">Question about this course?</Link>
          </Button>
        </TabsContent>

        <TabsContent value="lessons" className="card-surface mt-4 p-5">
          <h2 className="text-lg font-bold">Course modules</h2>
          <Accordion type="single" collapsible className="mt-2">
            {modules.map((m, mi) => (
              <AccordionItem key={m.name} value={m.name}>
                <AccordionTrigger className="font-bold">{m.name}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {m.lessons.map((l, li) => {
                      const idx = mi * 10 + li;
                      const done = lessonsDone.includes(idx);
                      return (
                        <li key={l}>
                          <button
                            type="button"
                            aria-pressed={done}
                            onClick={() => {
                              setLessonsDone((s) =>
                                done ? s.filter((i) => i !== idx) : [...s, idx],
                              );
                              toast[done ? "message" : "success"](
                                done ? `Marked "${l}" as not done` : `Lesson complete: ${l} +20 XP`,
                              );
                            }}
                            className="flex w-full items-center justify-between rounded-2xl bg-muted/60 px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                          >
                            <span className={done ? "line-through opacity-60" : ""}>{l}</span>
                            <span className="text-xs font-bold text-primary">
                              {done ? "Completed ✓" : "Mark done"}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="reviews" className="card-surface mt-4 space-y-3 p-5">
          <h2 className="text-lg font-bold">Learner reviews</h2>
          {[
            { who: "Aisha 🦄", body: "Explains things without being boring. Finished in a week!" },
            { who: "Diego 🐯", body: "The projects are the best part — I actually built something." },
            { who: "Mei 🐧", body: "Quizzes helped me remember everything before my exam." },
          ].map((r) => (
            <div key={r.who} className="rounded-2xl bg-muted/60 px-4 py-3">
              <p className="text-sm font-bold">{r.who}</p>
              <p className="text-sm text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
