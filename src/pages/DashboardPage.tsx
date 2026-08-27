import { useState } from "react";
import { ChevronRight, Check, Sparkles, Sun, ThumbsUp, AlarmClock, Star, BookOpen, Target, FolderCode, Palette, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import heroBooksImg from "@/assets/hero-books-stack.jpg";
import pandaAvatar from "@/assets/panda-avatar.jpg";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { continueLearning, popularCourses, learner } from "@/data/portal";
import { useDocumentMeta } from "@/lib/meta";

const initialChallenges = [
  { id: 1, task: "Solve 5 math problems", xp: 60, done: true },
  { id: 2, task: "Complete a reading story", xp: 60, done: true },
  { id: 3, task: "Watch a science video", xp: 60, done: false },
  { id: 4, task: "Finish the coding puzzle", xp: 60, done: false },
];

export function DashboardPage() {
  useDocumentMeta(
    "Dashboard - EDVANZ Learning Portal",
    "Your learning dashboard: streaks, XP, daily challenges, and courses for teens.",
  );

  const [challenges, setChallenges] = useState(initialChallenges);

  const toggleChallenge = (id: number) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const updated = !c.done;
          toast[updated ? "success" : "message"](
            updated ? `Completed: ${c.task} (+${c.xp} XP)` : `Unchecked: ${c.task}`,
          );
          return { ...c, done: updated };
        }
        return c;
      }),
    );
  };

  const xpProgress = Math.round((learner.xp / learner.xpToNext) * 100);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 pb-12">
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 p-6 text-white shadow-xl sm:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-widest opacity-85">
              LEVEL {learner.level} - {learner.streak} - DAY STREAK
            </p>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
              Welcome Back Aarav!
            </h1>
            <p className="max-w-md text-sm font-medium text-blue-100 sm:text-base">
              Continue your learning adventure today — you&apos;re {learner.xpToNext - learner.xp} XP away from Level {learner.level + 1}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                asChild
                className="rounded-full bg-purple-600 px-6 py-6 font-bold text-white shadow-md hover:bg-purple-700 active:scale-95"
              >
                <Link to="/my-learning">Continue Learning</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-none bg-white px-6 py-6 font-bold text-blue-600 shadow-md hover:bg-slate-100 active:scale-95"
              >
                <Link to="/explore">Explore Courses</Link>
              </Button>
            </div>

            {/* XP Progress */}
            <div className="pt-4 max-w-md">
              <div className="flex justify-between text-xs font-bold text-blue-100">
                <span>{learner.xp}XP</span>
                <span>{learner.xpToNext}XP</span>
              </div>
              <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={heroBooksImg}
              alt="Colorful stack of 3D books"
              className="w-full max-w-xs rounded-2xl drop-shadow-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. Stat Cards (4 cards) */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="flex items-center gap-4 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <div className="grid size-7 place-items-center rounded-full border-2 border-rose-500 bg-rose-500 text-white font-bold text-xs">
              9
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">9</h3>
            <p className="text-xs font-bold text-slate-400">Enrolled Courses</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-center gap-4 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <Check className="size-6 stroke-[3]" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">182</h3>
            <p className="text-xs font-bold text-slate-400">Lessons Done</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex items-center gap-4 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <Sparkles className="size-6 fill-orange-500 text-orange-500" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">17d</h3>
            <p className="text-xs font-bold text-slate-400">Weekly Streak</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex items-center gap-4 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
            <AlarmClock className="size-6 text-pink-600" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">62h</h3>
            <p className="text-xs font-bold text-slate-400">Enrolled Courses</p>
          </div>
        </div>
      </section>

      {/* 3. Continue Learning Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900">Continue Learning</h2>
          <Link
            to="/my-learning"
            className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:underline"
          >
            My Learning <ChevronRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {continueLearning.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* 4. Middle Section (Daily Challenge & Upcoming Classes) */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Daily Challenge */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-black text-slate-900">Daily Challenge</h3>
          <div className="mt-4 space-y-3">
            {challenges.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => toggleChallenge(c.id)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 transition-all text-left ${
                  c.done ? "bg-blue-50/70 text-slate-700" : "bg-slate-50 text-slate-800 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-6 items-center justify-center rounded-full transition-colors ${
                      c.done ? "bg-emerald-500 text-white" : "border-2 border-slate-300 bg-white"
                    }`}
                  >
                    {c.done && <Check className="size-3.5 stroke-[3]" />}
                  </div>
                  <span className={`text-sm font-bold ${c.done ? "text-slate-500" : "text-slate-800"}`}>
                    {c.task}
                  </span>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-extrabold text-blue-600">
                  <Sparkles className="size-3.5 fill-blue-600" />
                  <span>{c.xp}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">Upcoming Classes</h3>
            <Link to="/live-classes" className="text-xs font-bold text-blue-600 hover:underline">
              See All
            </Link>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {/* Class 1 */}
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-500 shadow-xs">
                <Sun className="size-5 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs font-black text-emerald-800">Fractions Face-Off</h4>
                <p className="text-[11px] font-semibold text-emerald-600">Live Session</p>
                <p className="mt-1 text-[10px] font-bold text-slate-400">Today, 4:00 PM</p>
              </div>
            </div>

            {/* Class 2 */}
            <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-xs">
                <ThumbsUp className="size-5 fill-blue-500 text-blue-500" />
              </div>
              <div>
                <h4 className="text-xs font-black text-blue-900">Fraction Practice</h4>
                <p className="text-[11px] font-semibold text-blue-600">Worksheet</p>
                <p className="mt-1 text-[10px] font-bold text-slate-400">Today, 6:00 PM</p>
              </div>
            </div>

            {/* Class 3 */}
            <div className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/60 p-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500 shadow-xs">
                <AlarmClock className="size-5 text-orange-500" />
              </div>
              <div>
                <h4 className="text-xs font-black text-amber-900">Build a Discord Bot</h4>
                <p className="text-[11px] font-semibold text-amber-600">Quiz</p>
                <p className="mt-1 text-[10px] font-bold text-slate-400">Tomorrow, 12:00 PM</p>
              </div>
            </div>

            {/* Class 4 */}
            <div className="flex items-start gap-3 rounded-2xl border border-purple-100 bg-purple-50/60 p-3.5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-purple-600 shadow-xs">
                <Star className="size-5 fill-purple-500 text-purple-500" />
              </div>
              <div>
                <h4 className="text-xs font-black text-purple-900">Sketching Anime Eyes</h4>
                <p className="text-[11px] font-semibold text-purple-600">Pronoun Test</p>
                <p className="mt-1 text-[10px] font-bold text-slate-400">Tomorrow, 11:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Popular Right Now Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900">Popular right now</h2>
          <Link
            to="/explore"
            className="text-sm font-bold text-blue-600 hover:underline"
          >
            Explore All
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {popularCourses.slice(0, 6).map((course) => (
            <CourseCard key={course.id} course={course} isPopular />
          ))}
        </div>
      </section>

      {/* 6. Browse Subjects Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Browse Subjects</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {/* Subject 1: English */}
          <Link
            to="/subjects"
            className="flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-sm transition-transform hover:-translate-y-1"
          >
            <div className="flex size-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 shadow-xs">
              <Star className="size-8 fill-amber-400 text-amber-400" />
            </div>
            <h4 className="mt-3 font-extrabold text-slate-900">English</h4>
            <p className="text-xs font-semibold text-slate-400">42 Courses</p>
          </Link>

          {/* Subject 2: Science */}
          <Link
            to="/subjects"
            className="flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-sm transition-transform hover:-translate-y-1"
          >
            <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 shadow-xs">
              <BookOpen className="size-8 text-emerald-500" />
            </div>
            <h4 className="mt-3 font-extrabold text-slate-900">Science</h4>
            <p className="text-xs font-semibold text-slate-400">Earned on</p>
          </Link>

          {/* Subject 3: Maths */}
          <Link
            to="/subjects"
            className="flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-sm transition-transform hover:-translate-y-1"
          >
            <div className="flex size-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 shadow-xs">
              <Target className="size-8 text-rose-500" />
            </div>
            <h4 className="mt-3 font-extrabold text-slate-900">Maths</h4>
            <p className="text-xs font-semibold text-slate-400">42 Courses</p>
          </Link>

          {/* Subject 4: Coding */}
          <Link
            to="/subjects"
            className="flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-sm transition-transform hover:-translate-y-1"
          >
            <div className="flex size-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 shadow-xs">
              <FolderCode className="size-8 text-amber-500" />
            </div>
            <h4 className="mt-3 font-extrabold text-slate-900">Coding</h4>
            <p className="text-xs font-semibold text-slate-400">Earned on</p>
          </Link>

          {/* Subject 5: Art */}
          <Link
            to="/subjects"
            className="flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-6 text-center shadow-sm transition-transform hover:-translate-y-1"
          >
            <div className="flex size-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-500 shadow-xs">
              <Palette className="size-8 text-purple-500" />
            </div>
            <h4 className="mt-3 font-extrabold text-slate-900">Art</h4>
            <p className="text-xs font-semibold text-slate-400">Earned on</p>
          </Link>
        </div>
      </section>

      {/* 7. Leaderboard Banner */}
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-indigo-100 bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="size-14 overflow-hidden rounded-2xl shadow-sm">
            <img src={pandaAvatar} alt="Panda Avatar" className="size-full object-cover" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">You&apos;re #3 this week</h3>
            <p className="text-xs font-bold text-slate-500">
              760 XP behind first place — one quiz could flip it.
            </p>
          </div>
        </div>

        <Button
          asChild
          className="rounded-full bg-blue-600 px-6 py-5 font-bold text-white shadow-md hover:bg-blue-700 active:scale-95"
        >
          <Link to="/leaderboard">
            <Trophy className="mr-1.5 size-4" /> View Leaderboard
          </Link>
        </Button>
      </section>
    </div>
  );
}
