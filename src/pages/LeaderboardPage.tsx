import { useState } from "react";
import { Medal, Trophy, Zap } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allCourses, leaderboard as allCourseLeaderboard } from "@/data/portal";
import { useAppState } from "@/lib/app-state";
import { useDocumentMeta } from "@/lib/meta";

const ALL_COURSES = "all";

const courseRankings: Record<string, { order: string[]; scores: Record<string, number> }> = {
  "python-quest": {
    order: ["Zayn", "Aisha", "Emma", "Diego", "Mei", "Kofi", "Luca"],
    scores: { Zayn: 1840, Aisha: 1610, Emma: 1520, Diego: 1380, Mei: 1270, Kofi: 1190, Luca: 980 },
  },
  "algebra-arcade": {
    order: ["Aisha", "Zayn", "Emma", "Mei", "Diego", "Kofi", "Luca"],
    scores: { Aisha: 1720, Zayn: 1600, Emma: 1430, Mei: 1310, Diego: 1180, Kofi: 1120, Luca: 880 },
  },
  "story-lab": {
    order: ["Emma", "Aisha", "Mei", "Zayn", "Diego", "Luca", "Kofi"],
    scores: { Emma: 1180, Aisha: 1070, Mei: 960, Zayn: 920, Diego: 830, Luca: 710, Kofi: 650 },
  },
};

type LeaderboardEntry = (typeof allCourseLeaderboard)[number];

export function LeaderboardPage() {
  useDocumentMeta("Leaderboard - EDVANZ", "See how you rank across all your courses or in a single course.");

  const { enrolled, profile } = useAppState();
  const [selectedCourseId, setSelectedCourseId] = useState(ALL_COURSES);
  const courses = allCourses.filter((course) => enrolled.includes(course.id));
  const selectedCourse = courses.find((course) => course.id === selectedCourseId);

  const entries: LeaderboardEntry[] = selectedCourse
    ? (() => {
        const ranking = courseRankings[selectedCourse.id];
        const byName = new Map(allCourseLeaderboard.map((entry) => [entry.name, entry]));
        const orderedNames = ranking?.order ?? allCourseLeaderboard.map((entry) => entry.name);
        return orderedNames.flatMap((name, index) => {
          const entry = byName.get(name);
          if (!entry) return [];
          return [{
            ...entry,
            rank: index + 1,
            xp: ranking?.scores[name] ?? Math.round(entry.xp * 0.2),
            name: entry.you ? profile.name : entry.name,
            avatar: entry.you ? profile.avatar : entry.avatar,
          }];
        });
      })()
    : allCourseLeaderboard.map((entry) => ({
        ...entry,
        name: entry.you ? profile.name : entry.name,
        avatar: entry.you ? profile.avatar : entry.avatar,
      }));

  const highestXp = Math.max(...entries.map((entry) => entry.xp), 1);
  const learnerEntry = entries.find((entry) => entry.you);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 pb-12">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-primary">FRIENDLY COMPETITION</p>
          <h1 className="mt-1 text-3xl font-black text-foreground sm:text-4xl">Leaderboard</h1>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">
            Celebrate your progress with learners across EDVANZ.
          </p>
        </div>
        <div className="w-full sm:w-72">
          <label htmlFor="leaderboard-course-filter" className="mb-1.5 block text-xs font-bold text-muted-foreground">
            Rank by course
          </label>
          <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
            <SelectTrigger id="leaderboard-course-filter" aria-label="Filter leaderboard by course" className="h-11 rounded-xl bg-background font-semibold">
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

      <section className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6" aria-label="Current leaderboard standing">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sun/20 text-sun-foreground">
              {selectedCourse ? <Medal className="size-6" aria-hidden="true" /> : <Trophy className="size-6" aria-hidden="true" />}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                {selectedCourse ? "Course standings" : "All-course standings"}
              </p>
              <h2 className="truncate text-lg font-black text-card-foreground">
                {selectedCourse ? `${selectedCourse.emoji} ${selectedCourse.title}` : "Every course, one board"}
              </h2>
            </div>
          </div>
          {learnerEntry && (
            <div className="flex items-center gap-2 self-start rounded-full bg-primary-soft px-4 py-2 text-sm font-extrabold text-primary sm:self-auto">
              <span aria-hidden="true">{profile.avatar}</span>
              <span>You&apos;re #{learnerEntry.rank}</span>
              <span className="text-muted-foreground">·</span>
              <Zap className="size-4" aria-hidden="true" />
              <span>{learnerEntry.xp.toLocaleString()} XP</span>
            </div>
          )}
        </div>
        <p className="mt-4 text-xs font-medium text-muted-foreground">
          {selectedCourse
            ? "Course XP rankings use sample learner data for this preview."
            : "All-course rankings use each learner’s total XP."}
        </p>
      </section>

      <section aria-label="Learner rankings" className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-4 py-3 text-[11px] font-black uppercase tracking-wide text-muted-foreground sm:grid-cols-[3rem_minmax(0,1fr)_minmax(8rem,1fr)_auto] sm:px-6">
          <span>Rank</span>
          <span>Learner</span>
          <span className="hidden sm:block">Progress</span>
          <span className="text-right">XP</span>
        </div>
        <ol className="divide-y divide-border">
          {entries.map((entry) => (
            <li
              key={`${selectedCourseId}-${entry.rank}-${entry.name}`}
              className={`grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 transition-colors sm:grid-cols-[3rem_minmax(0,1fr)_minmax(8rem,1fr)_auto] sm:px-6 ${entry.you ? "bg-primary-soft/60" : "hover:bg-muted/50"}`}
            >
              <span className={`grid size-9 place-items-center rounded-xl text-sm font-black ${entry.rank <= 3 ? "bg-sun/20 text-sun-foreground" : "bg-muted text-muted-foreground"}`}>
                {entry.rank <= 3 ? <Trophy className="size-4" aria-label={`Rank ${entry.rank}`} /> : entry.rank}
              </span>
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-muted text-xl" aria-hidden="true">{entry.avatar}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold text-card-foreground">{entry.name}{entry.you ? " (you)" : ""}</p>
                  <p className="text-xs font-semibold text-muted-foreground">{entry.badge}</p>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="h-2 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${(entry.xp / highestXp) * 100}%` }} />
                </div>
              </div>
              <span className="whitespace-nowrap text-right text-sm font-black text-foreground">{entry.xp.toLocaleString()} XP</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}