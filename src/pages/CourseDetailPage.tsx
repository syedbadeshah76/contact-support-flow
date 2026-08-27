import { useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Lock,
  Maximize,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

import storyWorkspaceImg from "@/assets/story-workspace-3d.jpg";
import heroBooksImg from "@/assets/hero-books-stack.jpg";
import { Button } from "@/components/ui/button";

const moduleLessons = [
  { id: 1, title: "Show don't tell", status: "completed", duration: "10:00" },
  { id: 2, title: "Character goals", status: "completed", duration: "08:45" },
  { id: 3, title: "Plot twist that land", status: "active", duration: "12:00" },
  { id: 4, title: "Dialogue that pops", status: "locked", duration: "15:20" },
  { id: 5, title: "Publish your story", status: "locked", duration: "11:10" },
];

export function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();

  const [activeLessonId, setActiveLessonId] = useState(3);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState("1.25x");
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "announcement">("overview");
  const [notes, setNotes] = useState("Key takeaway: Plant subtle hints early on so the plot twist feels natural!");

  const activeLesson = moduleLessons.find((l) => l.id === activeLessonId) || moduleLessons[2];

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 pb-12">
      {/* Back Link */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-blue-600 hover:underline"
        >
          <ArrowLeft className="size-4 stroke-[3]" /> BACK TO COURSE
        </Link>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
          Story Lab: Write like a creator
        </h1>
      </div>

      {/* Course Completion Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span>Course Completion</span>
          <span>87%</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" style={{ width: "87%" }} />
        </div>
      </div>

      {/* Main Grid Section (2 columns) */}
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left Column: Lesson Player & Info */}
        <div className="space-y-6">
          {/* Subtitle & Lesson Header */}
          <div>
            <p className="text-xs font-bold text-blue-600">Lesson 07 From 20</p>
            <h2 className="mt-1 text-2xl font-black text-slate-900">{activeLesson?.title || "Plot twist that land"}</h2>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Learn how to create surprising plot twists that feel unexpected but still make sense.
            </p>
          </div>

          {/* Video Player Card */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-900 shadow-md">
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={storyWorkspaceImg}
                alt="Lesson Video Thumbnail"
                className={`size-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-95" : "opacity-75"}`}
              />

              {/* Video Play/Pause Overlay Indicator */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full bg-white/90 text-blue-600 shadow-xl transition-transform hover:scale-110"
                >
                  <Play className="ml-1 size-8 fill-blue-600" />
                </button>
              )}

              {/* Video Controls Bar at Bottom */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-4">
                <div className="flex items-center gap-3 text-white">
                  {/* Play / Pause */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="text-white hover:text-blue-400"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="size-5 fill-white" /> : <Play className="size-5 fill-white" />}
                  </button>

                  {/* Volume */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="text-white hover:text-blue-400"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
                  </button>

                  {/* Time Indicator */}
                  <span className="text-xs font-semibold">05:30 / 12:00</span>

                  {/* Progress Line */}
                  <div className="relative flex-1">
                    <div className="h-1.5 w-full rounded-full bg-white/30">
                      <div className="h-full w-5/12 rounded-full bg-white" />
                    </div>
                  </div>

                  {/* Speed Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                      className="flex items-center gap-1 rounded-lg bg-white/20 px-2.5 py-1 text-xs font-bold text-white hover:bg-white/30"
                    >
                      <span>{speed}</span>
                      <ChevronDown className="size-3" />
                    </button>
                    {showSpeedMenu && (
                      <div className="absolute right-0 bottom-8 z-20 w-24 rounded-xl border border-slate-200 bg-white p-1 shadow-lg text-slate-800 text-xs font-bold">
                        {["0.75x", "1.0x", "1.25x", "1.5x", "2.0x"].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => {
                              setSpeed(s);
                              setShowSpeedMenu(false);
                              toast.success(`Speed changed to ${s}`);
                            }}
                            className={`w-full rounded-lg px-2 py-1 text-left ${speed === s ? "bg-blue-50 text-blue-600" : "hover:bg-slate-50"}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Fullscreen */}
                  <button
                    type="button"
                    onClick={() => toast("Fullscreen mode toggled")}
                    className="text-white hover:text-blue-400"
                    aria-label="Fullscreen"
                  >
                    <Maximize className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            {/* Tabs Header */}
            <div className="flex border-b border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`pb-3 text-sm font-bold transition-all border-b-2 px-4 ${
                  activeTab === "overview"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("notes")}
                className={`pb-3 text-sm font-bold transition-all border-b-2 px-4 ${
                  activeTab === "notes"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                Notes
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("announcement")}
                className={`pb-3 text-sm font-bold transition-all border-b-2 px-4 ${
                  activeTab === "announcement"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                Announcement
              </button>
            </div>

            {/* Tab Content */}
            <div className="pt-5">
              {activeTab === "overview" && (
                <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                  <p className="font-medium text-slate-600">
                    A great twist changes everything-when down right. It Surprises your reader, but still makes perfect sense in hindsight.
                  </p>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">What you&apos;ll Learn</h4>
                    <ul className="mt-2.5 space-y-2 font-medium">
                      <li className="flex items-center gap-2">
                        <div className="flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                          <Check className="size-3 stroke-[3]" />
                        </div>
                        <span>How to plant clues early in your story</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                          <Check className="size-3 stroke-[3]" />
                        </div>
                        <span>3 types of plot twist with examples</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                          <Check className="size-3 stroke-[3]" />
                        </div>
                        <span>How to make twists feel satisfying</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "notes" && (
                <div className="space-y-3">
                  <label htmlFor="notes-input" className="text-xs font-bold text-slate-700">Your Lesson Notes</label>
                  <textarea
                    id="notes-input"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-medium text-slate-800 focus:border-blue-600 focus:outline-none"
                    placeholder="Type your notes here..."
                  />
                  <Button
                    size="sm"
                    onClick={() => toast.success("Notes saved successfully!")}
                    className="rounded-full bg-blue-600 text-xs font-bold text-white"
                  >
                    Save Notes
                  </Button>
                </div>
              )}

              {activeTab === "announcement" && (
                <div className="rounded-2xl bg-blue-50/60 p-4 text-xs text-blue-900">
                  <p className="font-bold">📢 Message from Ms. Jhons:</p>
                  <p className="mt-1 font-medium">
                    Submit your plot twist assignment before Thursday&apos;s live Q&A session!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Course Content & Up Next */}
        <div className="space-y-6">
          {/* Card 1: Course Content */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <h3 className="text-base font-black text-slate-900">Course Content</h3>
            <p className="mt-0.5 text-xs font-bold text-slate-400">Module 1 Lesson 2</p>

            <div className="mt-4 space-y-2.5">
              {moduleLessons.map((lesson) => {
                const isActive = lesson.id === activeLessonId;
                const isDone = lesson.status === "completed";
                const isLocked = lesson.status === "locked";

                return (
                  <button
                    key={lesson.id}
                    type="button"
                    disabled={isLocked}
                    onClick={() => {
                      if (!isLocked) {
                        setActiveLessonId(lesson.id);
                        toast.success(`Loaded: ${lesson.title}`);
                      }
                    }}
                    className={`flex w-full items-center justify-between rounded-2xl p-3.5 text-left transition-all ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-extrabold ring-1 ring-blue-200"
                        : isDone
                          ? "bg-blue-50/50 text-slate-700 font-bold hover:bg-blue-50"
                          : "bg-blue-50/30 text-slate-400 font-semibold cursor-not-allowed opacity-75"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex size-6 items-center justify-center rounded-full ${
                          isDone
                            ? "bg-emerald-500 text-white"
                            : isActive
                              ? "bg-blue-600 text-white"
                              : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {isDone ? (
                          <Check className="size-3.5 stroke-[3]" />
                        ) : isActive ? (
                          <Play className="ml-0.5 size-3 fill-white" />
                        ) : (
                          <Lock className="size-3" />
                        )}
                      </div>
                      <span className="text-xs">{lesson.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 2: UP Next */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">UP Next</h3>

            <div className="mt-4 flex gap-3">
              <div className="size-16 shrink-0 overflow-hidden rounded-2xl bg-amber-50">
                <img src={heroBooksImg} alt="Thumbnail" className="size-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">Dialogue that pops</h4>
                <p className="text-[11px] font-semibold text-slate-400">Remember</p>
                <p className="mt-1 text-[10px] font-bold text-slate-400">Lesson 08 - 20</p>
              </div>
            </div>

            <Button
              onClick={() => {
                setActiveLessonId(4);
                toast.success("Loaded next lesson: Dialogue that pops");
              }}
              className="mt-4 w-full rounded-full bg-blue-600 py-5 text-xs font-bold text-white shadow-sm hover:bg-blue-700"
            >
              Preview Lesson
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
