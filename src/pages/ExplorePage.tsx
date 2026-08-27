import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { allCourses } from "@/data/portal";
import { useDocumentMeta } from "@/lib/meta";

const subjectFilters = [
  { name: "All", emoji: "" },
  { name: "Math", emoji: "➗" },
  { name: "Science", emoji: "🧪" },
  { name: "English", emoji: "📖" },
  { name: "Coding", emoji: "💻" },
  { name: "Art", emoji: "🎨" },
  { name: "Music", emoji: "🎵" },
  { name: "Languages", emoji: "🗣️" },
  { name: "Robotics", emoji: "🤖" },
  { name: "General Knowledge", emoji: "🧠" },
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"] as const;
const prices = ["All", "Premium", "Free"] as const;

export function ExplorePage() {
  useDocumentMeta(
    "Explore Courses - EDVANZ",
    "Search and filter hundreds of teen-friendly courses by subject, level and price.",
  );

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.slice(0, 80) ?? "";
  const subject = searchParams.get("subject") ?? "All";
  const [level, setLevel] = useState<(typeof levels)[number]>("All Levels");
  const [price, setPrice] = useState<(typeof prices)[number]>("All");

  const setParams = (next: { q?: string; subject?: string }) => {
    const params = new URLSearchParams(searchParams);
    if (next.q !== undefined) params.set("q", next.q.slice(0, 80));
    if (next.subject !== undefined) params.set("subject", next.subject);
    navigate(`/explore?${params.toString()}`, { replace: true });
  };

  const results = useMemo(
    () =>
      allCourses.filter(
        (course) =>
          (subject === "All" || course.subject.toLowerCase() === subject.toLowerCase()) &&
          (level === "All Levels" || course.level === level) &&
          (price === "All" || course.price === price) &&
          `${course.title}${course.teacher}${course.subject}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [level, price, query, subject],
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 pb-12">
      {/* Header */}
      <div>
        <p className="text-xs font-black uppercase tracking-wider text-blue-600">DISCOVER</p>
        <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">Explore courses</h1>
        <p className="mt-1 text-sm font-semibold text-slate-500">
          Hundreds of courses built for ages 12-19 — filter until you find your thing.
        </p>
      </div>

      {/* Filter Box */}
      <div className="rounded-3xl border border-[#ddd6fe] bg-[#ede9fe]/80 p-6 space-y-4 shadow-xs">
        {/* Search Input */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setParams({ q: e.target.value })}
            placeholder="What do you want to learn today?"
            aria-label="Search courses"
            className="h-12 rounded-full border-none bg-white pl-11 text-xs font-semibold text-slate-800 shadow-xs"
          />
        </div>

        {/* Filter Rows */}
        <div className="space-y-3 pt-1">
          {/* Subject Filter */}
          <FilterRow label="SUBJECT">
            {subjectFilters.map((item) => (
              <Chip
                key={item.name}
                active={subject.toLowerCase() === item.name.toLowerCase()}
                onClick={() => setParams({ subject: item.name })}
              >
                {item.emoji ? `${item.emoji} ${item.name}` : item.name}
              </Chip>
            ))}
          </FilterRow>

          {/* Level Filter */}
          <FilterRow label="LEVEL">
            {levels.map((item) => (
              <Chip key={item} active={level === item} onClick={() => setLevel(item)}>
                {item}
              </Chip>
            ))}
          </FilterRow>

          {/* Price Filter */}
          <FilterRow label="PRICE">
            {prices.map((item) => (
              <Chip key={item} active={price === item} onClick={() => setPrice(item)}>
                {item}
              </Chip>
            ))}
          </FilterRow>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <h2 className="text-xl font-black text-slate-900">
          {results.length} Course{results.length === 1 ? "" : "s"} Found
        </h2>
        {(query || subject !== "All" || level !== "All Levels" || price !== "All") && (
          <Button
            variant="ghost"
            className="rounded-full text-xs font-bold text-slate-500 hover:text-slate-900"
            onClick={() => {
              setLevel("All Levels");
              setPrice("All");
              navigate("/explore?q=&subject=All", { replace: true });
            }}
          >
            <X className="mr-1 size-3.5" /> Clear filters
          </Button>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Empty State */}
      {results.length === 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
          <p className="text-5xl">🔍</p>
          <h3 className="mt-3 text-lg font-black text-slate-900">Nothing matched those filters</h3>
          <p className="mt-1 text-xs font-semibold text-slate-400">Try clearing your search query or subject filters.</p>
          <Button
            className="mt-5 rounded-full bg-blue-600 px-6 py-5 text-xs font-bold text-white hover:bg-blue-700"
            onClick={() => {
              setLevel("All Levels");
              setPrice("All");
              navigate("/explore?q=&subject=All", { replace: true });
            }}
          >
            Reset all filters
          </Button>
        </div>
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-16 text-[10px] font-black tracking-wider text-blue-600 uppercase">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-1.5">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3.5 py-1 text-xs font-bold transition-all active:scale-95 ${
        active
          ? "bg-slate-900 text-white shadow-xs"
          : "bg-white text-slate-700 hover:bg-slate-100 shadow-2xs border border-slate-200/60"
      }`}
    >
      {children}
    </button>
  );
}
