import { Star, Users, Clock, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Course } from "@/data/portal";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="card-surface group flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1">
      <div className={`relative grid h-32 place-items-center text-5xl ${course.tint}`}>
        <span aria-hidden>{course.emoji}</span>
        <button
          aria-label="Add to favourites"
          className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-card/80 text-muted-foreground transition-colors hover:text-primary"
        >
          <Heart className="size-4" />
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
          <h3 className="mt-1 line-clamp-2 text-base font-bold">{course.title}</h3>
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

        {typeof course.progress === "number" ? (
          <div className="mt-auto space-y-2">
            <Progress value={course.progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {course.progress}% · Next: {course.nextLesson}
            </p>
            <Button className="w-full rounded-full">Resume</Button>
          </div>
        ) : (
          <Button className="mt-auto w-full rounded-full">Enroll now</Button>
        )}
      </div>
    </article>
  );
}
