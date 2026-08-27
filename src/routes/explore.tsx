import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { PageHeader } from "@/components/PageHeader";
import { CourseCard } from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { allCourses, subjects } from "@/data/portal";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Courses — Kidzy" },
      {
        name: "description",
        content: "Search and filter hundreds of teen-friendly courses by subject, level and price.",
      },
      { property: "og:title", content: "Explore Courses — Kidzy" },
      {
        property: "og:description",
        content: "Search and filter teen-friendly courses by subject, level and price.",
      },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q.slice(0, 80) : "",
    subject: typeof search.subject === "string" ? search.subject : "All",
  }),
  component: Explore,
});

const levels = ["All levels", "Beginner", "Intermediate", "Advanced"] as const;
const prices = ["All", "Free", "Premium"] as const;

function Explore() {
  const { q, subject } = Route.useSearch();
  const navigate = useNavigate({ from: "/explore" });
  const query = q;
  const setQuery = (value: string) =>
    navigate({ search: (prev) => ({ ...prev, q: value.slice(0, 80) }) });
  const setSubject = (value: string) =>
    navigate({ search: (prev) => ({ ...prev, subject: value }) });
  const [level, setLevel] = useState<(typeof levels)[number]>("All levels");
  const [price, setPrice] = useState<(typeof prices)[number]>("All");

  const results = useMemo(
    () =>
      allCourses.filter(
        (c) =>
          (subject === "All" || c.subject === subject) &&
          (level === "All levels" || c.level === level) &&
          (price === "All" || c.price === price) &&
          (c.title + c.teacher + c.subject).toLowerCase().includes(query.toLowerCase()),
      ),
    [query, subject, level, price],
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-7">
      <PageHeader
        eyebrow="Discover"
        title="Explore courses"
        description="Hundreds of courses built for ages 12-19 — filter until you find your thing."
      />

      <div className="card-surface space-y-4 p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to learn today?"
            aria-label="Search courses"
            className="h-14 rounded-full pl-12 text-base"
          />
        </div>

        <FilterRow label="Subject">
          <Chip active={subject === "All"} onClick={() => setSubject("All")}>
            All
          </Chip>
          {subjects.map((s) => (
            <Chip key={s.name} active={subject === s.name} onClick={() => setSubject(s.name)}>
              {s.emoji} {s.name}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Level">
          {levels.map((l) => (
            <Chip key={l} active={level === l} onClick={() => setLevel(l)}>
              {l}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Price">
          {prices.map((p) => (
            <Chip key={p} active={price === p} onClick={() => setPrice(p)}>
              {p}
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
              navigate({ search: { q: "", subject: "All" } });
            }}
          >
            <X className="size-4" /> Clear filters
          </Button>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {results.map((c) => (
          <CourseCard key={c.id} course={c} />
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
              navigate({ search: { q: "", subject: "All" } });
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
