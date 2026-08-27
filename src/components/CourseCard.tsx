import { Star, Users, Clock, Heart, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import type { Course } from "@/data/portal";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/lib/app-state";

import codingBracketsImg from "@/assets/coding-brackets-3d.jpg";
import algebraShapesImg from "@/assets/algebra-shapes-3d.jpg";
import storyWorkspaceImg from "@/assets/story-workspace-3d.jpg";

const imageMap: Record<string, string> = {
  "python-quest": codingBracketsImg,
  "algebra-arcade": algebraShapesImg,
  "story-lab": storyWorkspaceImg,
};

export function CourseCard({
  course,
  isPopular = false,
}: {
  course: Course;
  isPopular?: boolean;
}) {
  const navigate = useNavigate();
  const { isFavourite, toggleFavourite, enroll, isEnrolled } = useAppState();
  const [busy, setBusy] = useState(false);
  const favourite = isFavourite(course.id);
  const enrolled = isEnrolled(course.id) || typeof course.progress === "number";

  const imageSrc = imageMap[course.id] || storyWorkspaceImg;

  const handleAction = async () => {
    setBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (!enrolled) {
      enroll(course.id);
      toast.success(`Enrolled in ${course.title}`);
    }
    setBusy(false);
    navigate(`/courses/${course.id}`);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Thumbnail Header */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={imageSrc}
          alt={course.title}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Free / Premium Badge */}
        <span
          className={`absolute left-3.5 top-3.5 rounded-full px-3 py-1 text-[11px] font-extrabold shadow-sm ${
            course.price === "Free"
              ? "bg-white text-slate-800"
              : "bg-slate-900 text-white"
          }`}
        >
          {course.price}
        </span>

        {/* Heart Favorite Button */}
        <button
          type="button"
          aria-label={favourite ? "Remove from favourites" : "Add to favourites"}
          onClick={(e) => {
            e.stopPropagation();
            const added = toggleFavourite(course.id);
            toast[added ? "success" : "message"](
              added ? "Saved to favourites ❤️" : "Removed from favourites",
            );
          }}
          className="absolute right-3.5 top-3.5 flex size-8 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm transition-transform hover:scale-110 active:scale-95"
        >
          <Heart
            className={`size-4 ${
              favourite ? "fill-red-500 text-red-500" : "text-slate-600"
            }`}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
        <div>
          <p className="text-[11px] font-bold tracking-wider uppercase text-rose-500">
            {course.subject} - AGES {course.age}
          </p>
          <h3 className="mt-1 line-clamp-1 text-base font-extrabold text-slate-900">
            <Link to={`/courses/${course.id}`} className="hover:text-blue-600">
              {course.title}
            </Link>
          </h3>
          <p className="mt-0.5 text-xs font-semibold text-slate-500">Ms. Jhons</p>
        </div>

        {/* Info Icons Row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-1 text-slate-900 font-bold">
            <Star className="size-3.5 fill-slate-900 text-slate-900" /> {course.rating}
          </span>
          <span className="flex items-center gap-1">
            <Users className="size-3.5 text-slate-400" /> {course.students.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5 text-slate-400" /> {course.duration}
          </span>
          <span>{course.lessons} lessons</span>
        </div>

        {/* Progress Bar for Continue Learning */}
        {!isPopular && typeof course.progress === "number" && (
          <div className="mt-1 space-y-1.5">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-blue-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <p className="text-[11px] font-semibold text-slate-400">
              {course.progress}% . Next: {course.nextLesson || "Plot twists that land"}
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-auto pt-2">
          <Button
            onClick={handleAction}
            disabled={busy}
            className="w-full rounded-full bg-blue-600 py-5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 active:scale-[0.99]"
          >
            {busy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : isPopular && !enrolled ? (
              "Enroll Now"
            ) : (
              "Resume"
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
