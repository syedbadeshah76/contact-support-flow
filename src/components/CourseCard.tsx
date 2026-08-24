import { Star, Users, Clock, Heart, Loader2 } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAppState } from "@/lib/app-state";
import type { Course } from "@/data/portal";

export function CourseCard({ course }: { course: Course }) {
  const navigate = useNavigate();
  const { isFavourite, toggleFavourite, enroll, isEnrolled } = useAppState();
  const [busy, setBusy] = useState(false);
  const favourite = isFavourite(course.id);
  const enrolled = isEnrolled(course.id) || typeof course.progress === "number";

  const handleAction = async () => {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 500));
    if (!enrolled) {
      enroll(course.id);
      toast.success(`Enrolled in ${course.title}`);
    }
    setBusy(false);
    navigate({ to: "/courses/$courseId", params: { courseId: course.id } });
  };

  return (
    <article className="card-surface group flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1 focus-within:-translate-y-1">
      <div className={`relative grid h-32 place-items-center text-5xl ${course.tint}`}>
        <Link
          to="/courses/$courseId"
          params={{ courseId: course.id }}
          className="absolute inset-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          aria-label={`View ${course.title}`}
        />
        <span aria-hidden>{course.emoji}</span>
        <button
          type="button"
          aria-label={favourite ? "Remove from favourites" : "Add to favourites"}
          aria-pressed={favourite}
          onClick={() => {
            const added = toggleFavourite(course.id);
            toast[added ? "success" : "message"](
              added ? "Saved to favourites ❤️" : "Removed from favourites",
            );
          }}
          className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-card/80 text-muted-foreground transition-colors hover:text-primary active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Heart className={`size-4 ${favourite ? "fill-primary text-primary" : ""}`} />
        </button>
        <span className="absolute left-3 top-3 rounded-full bg-card/85 px-2.5 py-1 text-xs font-semibold">
          {course.price}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {course.subject} · Ages {course.age}
          </p>
          <h3 className="mt-1 line-clamp-2 text-base font-bold">
            <Link
              to="/courses/$courseId"
              params={{ courseId: course.id }}
              className="hover:underline focus-visible:underline focus-visible:outline-none"
            >
              {course.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{course.teacher}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 font-semibold text-sun-foreground">
            <Star className="size-3.5 fill-current" /> {course.rating}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="size-3.5" /> {course.students.toLocaleString()}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" /> {course.duration}
          </span>
          <span>{course.lessons} lessons</span>
        </div>

        <div className="mt-auto space-y-2">
          {typeof course.progress === "number" && (
            <>
              <Progress value={course.progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {course.progress}% · Next: {course.nextLesson}
              </p>
            </>
          )}
          <Button
            className="w-full rounded-full"
            disabled={busy}
            onClick={handleAction}
          >
            {busy && <Loader2 className="size-4 animate-spin" />}
            {enrolled ? "Resume" : busy ? "Enrolling…" : "Enroll now"}
          </Button>
        </div>
      </div>
    </article>
  );
}
