import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { CourseCard } from "@/components/CourseCard";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { allCourses, subjects } from "@/data/portal";
import { useDocumentMeta } from "@/lib/meta";

const levels = ["All levels", "Beginner", "Intermediate", "Advanced"] as const;
const prices = ["All", "Free", "Premium"] as const;

export function ExplorePage() {
  useDocumentMeta(
    "Explore Courses - Kidzy",
    "Search and filter hundreds of teen-friendly courses by subject, level and price.",
  );

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.slice(0, 80) ?? "";
  const subject = searchParams.get("subject") ?? "All";
  const [level, setLevel] = useState<(typeof levels)[number]>("All levels");
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
          (subject === "All" || course.subject === subject) &&
          (level === "All levels" || course.level === level) &&
          (price === "All" || course.price === price) &&
          `${course.title}${course.teacher}${course.subject}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [level, price, query, subject],
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-7">
      <PageHeader
        eyebrow="Discover"
        title="Explore courses"
        description="Hundreds of courses built for ages 12-19 - filter until you find your thing."
      />

      <div className="card-surface space-y-4 p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setParams({ q: e.target.value })}
            placeholder="What do you want to learn today?"
            aria-label="Search courses"
            className="h-14 rounded-full pl-12 text-base"
          />
        </div>

        <FilterRow label="Subject">
          <Chip active={subject === "All"} onClick={() => setParams({ subject: "All" })}>
            All
          </Chip>
          {subjects.map((item) => (
            <Chip
              key={item.name}
              active={subject === item.name}
              onClick={() => setParams({ subject: item.name })}
            >
              {item.emoji} {item.name}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Level">
          {levels.map((item) => (
            <Chip key={item} active={level === item} onClick={() => setLevel(item)}>
              {item}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Price">
          {prices.map((item) => (
            <Chip key={item} active={price === item} onClick={() => setPrice(item)}>
              {item}
            </Chip>
          ))}
        </FilterRow>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-muted-foreground">
          {results.length} course{results.length === 1 ? "" : "s"} found
        </p>
        {(query || subject !== "All" || level !== "All levels" || price !== "All") && (
          <Button
            variant="ghost"
            className="rounded-full font-bold"
            onClick={() => {
              setLevel("All levels");
              setPrice("All");
              navigate("/explore?q=&subject=All", { replace: true });
            }}
          >
            <X className="size-4" /> Clear filters
          </Button>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {results.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {results.length === 0 && (
        <div className="card-surface p-10 text-center">
          <p className="text-4xl">🔍</p>
          <p className="mt-2 font-bold">Nothing matched those filters</p>
          <p className="text-sm text-muted-foreground">Try clearing one of them.</p>
          <Button
            className="mt-4 rounded-full font-bold"
            onClick={() => {
              setLevel("All levels");
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
      <span className="mr-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
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
      className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-primary-soft hover:text-accent-foreground"
      }`}
    >
      {children}
    </button>
  );
}
