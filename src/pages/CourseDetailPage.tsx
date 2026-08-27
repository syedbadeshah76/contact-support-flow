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
  X,
  CreditCard,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

import storyWorkspaceImg from "@/assets/story-workspace-3d.jpg";
import heroBooksImg from "@/assets/hero-books-stack.jpg";
import codingBracketsImg from "@/assets/coding-brackets-3d.jpg";
import algebraShapesImg from "@/assets/algebra-shapes-3d.jpg";
import { Button } from "@/components/ui/button";
import { allCourses, type Course } from "@/data/portal";
import { useAppState } from "@/lib/app-state";

const moduleLessons = [
  { id: 1, title: "Show don't tell", status: "completed", duration: "10:00" },
  { id: 2, title: "Character goals", status: "completed", duration: "08:45" },
  { id: 3, title: "Plot twist that land", status: "active", duration: "12:00" },
  { id: 4, title: "Dialogue that pops", status: "locked", duration: "15:20" },
  { id: 5, title: "Publish your story", status: "locked", duration: "11:10" },
];

export function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { isEnrolled, enroll } = useAppState();

  const fallbackCourse = allCourses[0] as Course;
  const course = allCourses.find((c) => c.id === courseId) ?? fallbackCourse;
  const enrolled = isEnrolled(course.id);

  const isFreeCourse = course.price === "Free";

  const [viewState, setViewState] = useState<"preview" | "checkout" | "checkout_pay" | "success" | "learning">(
    enrolled ? "learning" : isFreeCourse ? "preview" : "checkout",
  );

  const [activeLessonId, setActiveLessonId] = useState(3);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState("1.25x");
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "announcement">("overview");
  const [notes, setNotes] = useState("Key takeaway: Plant subtle hints early on so the plot twist feels natural!");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking" | "wallet">("upi");

  const activeLesson = moduleLessons.find((l) => l.id === activeLessonId) || moduleLessons[2];

  const handleStartFree = () => {
    enroll(course.id);
    setViewState("learning");
    toast.success("Enrolled in course!");
  };

  const handleCompletePayment = () => {
    enroll(course.id);
    setViewState("success");
    toast.success("Payment Successful!");
  };

  const thumbnailImg = course.id === "algebra-arcade" ? algebraShapesImg : codingBracketsImg;

  // 1. FREE COURSE ENROLLMENT VIEW (Image 1)
  if (viewState === "preview") {
    return (
      <div className="mx-auto flex max-w-5xl flex-col gap-6 pb-16">
        <div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-blue-600 hover:underline"
          >
            <ArrowLeft className="size-4 stroke-[3]" /> BACK TO COURSE
          </Link>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Enroll Course For Free
          </h1>
        </div>

        <div className="mx-auto w-full max-w-3xl space-y-6 pt-4">
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-white p-6 shadow-sm sm:flex-row">
            <div className="flex size-48 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-[#ede9fe]/90 p-4 shadow-inner">
              <img src={thumbnailImg} alt={course.title} className="size-full object-cover rounded-2xl" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase text-red-500 tracking-wider">
                  {course.subject} - AGES {course.age}
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black text-emerald-600">
                  Free
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900">{course.title}</h2>
              <p className="text-xs font-semibold text-slate-400">Ms. Jhons</p>
              <ul className="mt-2 space-y-1 text-xs font-bold text-slate-600">
                <li>{course.lessons} Lessons</li>
                <li>{course.duration} total Length</li>
                <li>Certificate Completion</li>
                <li>Learn at your own peace</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-[#ede9fe]/80 p-4 text-xs font-bold text-slate-800 shadow-xs">
            <span className="flex items-center gap-2">
              <span className="text-amber-500">⭐</span> {course.rating} ({course.students.toLocaleString()} learners)
            </span>
            <span className="text-blue-600">📊 Beginners Friendly</span>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-black text-slate-900">What you&apos;ll Learn</h3>
            <ul className="space-y-2 text-xs font-semibold text-slate-700">
              <li className="flex items-center gap-2">
                <div className="flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="size-3 stroke-[3]" />
                </div>
                <span>Build your first python game</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="size-3 stroke-[3]" />
                </div>
                <span>Understanding Basic programming Concept</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="size-3 stroke-[3]" />
                </div>
                <span>Solve fun challenges and quizzes</span>
              </li>
            </ul>
          </div>

          <Button
            onClick={handleStartFree}
            className="w-full rounded-full bg-blue-600 py-6 text-sm font-bold text-white shadow-md hover:bg-blue-700 active:scale-95"
          >
            Start
          </Button>
        </div>
      </div>
    );
  }

  // 2. PAID UNLOCK MODAL / VIEW (Image 3)
  if (viewState === "checkout") {
    return (
      <div className="mx-auto flex max-w-5xl flex-col gap-6 pb-16">
        <div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-blue-600 hover:underline"
          >
            <ArrowLeft className="size-4 stroke-[3]" /> BACK TO COURSE
          </Link>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Enroll in Course
          </h1>
        </div>

        <div className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <button
              onClick={() => setViewState("preview")}
              className="text-slate-400 hover:text-slate-700"
            >
              <ArrowLeft className="size-5" />
            </button>
            <h2 className="text-lg font-black text-slate-900">Unlock a Course</h2>
            <Link to="/explore" className="text-slate-400 hover:text-slate-700">
              <X className="size-5" />
            </Link>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex size-44 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-900 p-2 shadow-inner">
              <img src={thumbnailImg} alt={course.title} className="size-full object-cover rounded-xl" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase text-red-500 tracking-wider">
                  {course.subject} - AGES {course.age}
                </span>
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-black text-blue-600">
                  Premium
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900">{course.title}</h3>
              <p className="text-xs font-semibold text-slate-400">Ms. Jhons</p>
              <ul className="mt-2 space-y-1 text-xs font-bold text-slate-600">
                <li>{course.lessons} Lessons</li>
                <li>{course.duration} total Length</li>
                <li>Certificate Completion</li>
                <li>Learn at your own peace</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-[#ede9fe]/80 p-4 text-xs font-extrabold text-slate-900 shadow-xs">
            <span>Unlock this Course</span>
            <span className="text-base text-blue-600">₹ 499</span>
            <span className="text-slate-600">📊 Lifetime Access</span>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-black text-slate-900">What you&apos;ll Learn</h4>
            <ul className="space-y-1.5 text-xs font-semibold text-slate-700">
              <li className="flex items-center gap-2">
                <div className="flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="size-3 stroke-[3]" />
                </div>
                <span>Full access to all lessons</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="size-3 stroke-[3]" />
                </div>
                <span>Downloadable resources and worksheets</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="size-3 stroke-[3]" />
                </div>
                <span>Ask doubt in community</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="size-3 stroke-[3]" />
                </div>
                <span>Certificate After completion</span>
              </li>
            </ul>
          </div>

          <Button
            onClick={() => setViewState("checkout_pay")}
            className="w-full rounded-full bg-blue-600 py-6 text-sm font-bold text-white shadow-md hover:bg-blue-700 active:scale-95"
          >
            Unlock Now
          </Button>
        </div>
      </div>
    );
  }

  // 3. SECURE CHECKOUT MODAL (Image 4)
  if (viewState === "checkout_pay") {
    return (
      <div className="mx-auto flex max-w-5xl flex-col gap-6 pb-16">
        <div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-blue-600 hover:underline"
          >
            <ArrowLeft className="size-4 stroke-[3]" /> BACK TO COURSE
          </Link>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Enroll in Course
          </h1>
        </div>

        <div className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-lg space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <button
              onClick={() => setViewState("checkout")}
              className="text-slate-400 hover:text-slate-700"
            >
              <ArrowLeft className="size-5" />
            </button>
            <h2 className="text-lg font-black text-slate-900">Secure Checkout</h2>
            <Link to="/explore" className="text-slate-400 hover:text-slate-700">
              <X className="size-5" />
            </Link>
          </div>

          <div>
            <h3 className="text-xs font-black text-slate-900">Order Summary</h3>
            <div className="mt-2 flex items-center gap-4 rounded-2xl border border-slate-200 p-4">
              <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-900">
                <img src={thumbnailImg} alt={course.title} className="size-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">{course.title}</h4>
                <p className="text-xs font-semibold text-slate-400">Premium Course</p>
                <p className="text-sm font-black text-blue-600 mt-0.5">₹ 499</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black text-slate-900">Choose a Payment Method</h3>
            <div className="mt-2 space-y-2">
              <div
                onClick={() => setPaymentMethod("upi")}
                className={`flex cursor-pointer items-center justify-between rounded-2xl p-4 transition-all ${
                  paymentMethod === "upi"
                    ? "bg-[#ede9fe] border-2 border-blue-500 shadow-xs"
                    : "border border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <span className="text-xs font-extrabold text-slate-900">
                  {paymentMethod === "upi" ? "⊙" : "⚪"} UPI / Google Pay / PhonePe
                </span>
                <span className="text-xs font-bold text-blue-600">UPI</span>
              </div>

              <div
                onClick={() => setPaymentMethod("card")}
                className={`flex cursor-pointer items-center justify-between rounded-2xl p-4 transition-all ${
                  paymentMethod === "card"
                    ? "bg-[#ede9fe] border-2 border-blue-500 shadow-xs"
                    : "border border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <span className="text-xs font-extrabold text-slate-900">
                  {paymentMethod === "card" ? "⊙" : "⚪"} Credit / Debit Card
                </span>
                <CreditCard className="size-4 text-slate-500" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-xs font-black text-slate-900">Total Amount</span>
            <span className="text-base font-black text-blue-600">₹ 499</span>
          </div>

          <Button
            onClick={handleCompletePayment}
            className="w-full rounded-full bg-blue-600 py-6 text-sm font-bold text-white shadow-md hover:bg-blue-700 active:scale-95"
          >
            Unlock Now
          </Button>

          <p className="text-center text-[11px] font-bold text-slate-400">
            🔒 100% Secure Payment
          </p>
        </div>
      </div>
    );
  }

  // 4. ENROLLMENT SUCCESSFUL VIEW (Image 5)
  if (viewState === "success") {
    return (
      <div className="mx-auto flex max-w-5xl flex-col gap-6 pb-16">
        <div>
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-blue-600 hover:underline"
          >
            <ArrowLeft className="size-4 stroke-[3]" /> BACK TO COURSE
          </Link>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Enroll in Course
          </h1>
        </div>

        <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg space-y-6 text-center">
          <div className="flex h-44 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-6xl shadow-inner">
            🐷 💰 📊
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900">Enrollment Successful!</h2>
            <p className="mt-1 text-xs font-semibold text-slate-500">You now have access to</p>
            <h3 className="mt-1 text-lg font-black text-blue-600">{course.title}</h3>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-5 space-y-2 text-xs font-bold text-emerald-900 max-w-md mx-auto">
            <p>✓ 21 Lessons</p>
            <p>✓ Lifetime Access</p>
            <p>✓ Certificate of Completion</p>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              onClick={() => setViewState("learning")}
              className="w-full rounded-full bg-blue-600 py-6 text-sm font-bold text-white shadow-md hover:bg-blue-700 active:scale-95"
            >
              Start Learning Now
            </Button>

            <button
              onClick={() => setViewState("learning")}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Go Back to Learning
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 5. LESSON PLAYER VIEW (Image 2)
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 pb-12">
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-blue-600 hover:underline"
        >
          <ArrowLeft className="size-4 stroke-[3]" /> BACK TO COURSE
        </Link>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
          Enroll Course For Free
        </h1>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span>Course Completion</span>
          <span>87%</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
            style={{ width: "87%" }}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-bold text-blue-600">Lesson 02 From 12</p>
            <h2 className="mt-1 text-2xl font-black text-slate-900">{course.title}</h2>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Learn how to create surprising plot twists that feel unexpected but still make sense.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-900 shadow-md">
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={storyWorkspaceImg}
                alt="Lesson Video Thumbnail"
                className={`size-full object-cover transition-opacity duration-300 ${
                  isPlaying ? "opacity-95" : "opacity-75"
                }`}
              />

              {!isPlaying && (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full bg-white/90 text-blue-600 shadow-xl transition-transform hover:scale-110"
                >
                  <Play className="ml-1 size-8 fill-blue-600" />
                </button>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-4">
                <div className="flex items-center gap-3 text-white">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:text-blue-400"
                  >
                    {isPlaying ? <Pause className="size-5 fill-white" /> : <Play className="size-5 fill-white" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:text-blue-400"
                  >
                    {isMuted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
                  </button>

                  <span className="text-xs font-semibold">05:30 / 12:00</span>

                  <div className="relative flex-1">
                    <div className="h-1.5 w-full rounded-full bg-white/30">
                      <div className="h-full w-5/12 rounded-full bg-white" />
                    </div>
                  </div>

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
                            className={`w-full rounded-lg px-2 py-1 text-left ${
                              speed === s ? "bg-blue-50 text-blue-600" : "hover:bg-slate-50"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toast("Fullscreen mode toggled")}
                    className="text-white hover:text-blue-400"
                  >
                    <Maximize className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
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
                        <span>Build your first python game</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                          <Check className="size-3 stroke-[3]" />
                        </div>
                        <span>Understanding Basic programming Concept</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="flex size-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                          <Check className="size-3 stroke-[3]" />
                        </div>
                        <span>Solve fun challenges and quizzes</span>
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

        <div className="space-y-6">
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

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">UP Next</h3>

            <div className="mt-4 flex gap-3">
              <div className="size-16 shrink-0 overflow-hidden rounded-2xl bg-amber-50">
                <img src={heroBooksImg} alt="Thumbnail" className="size-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">Build Your First Python Game</h4>
                <p className="text-[11px] font-semibold text-slate-400">Remember</p>
                <p className="mt-1 text-[10px] font-bold text-slate-400">Lesson 08 - 20</p>
              </div>
            </div>

            <Button
              onClick={() => {
                setActiveLessonId(4);
                toast.success("Loaded next lesson!");
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
