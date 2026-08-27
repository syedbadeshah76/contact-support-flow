import { Link } from "react-router-dom";
import { useDocumentMeta } from "@/lib/meta";

const subjectCards = [
  {
    name: "Maths",
    courses: "42 Courses",
    level: "All levels",
    emoji: "➗",
    bgColor: "bg-[#e0f2fe]/90 border-2 border-dashed border-cyan-400 shadow-sm",
    textColor: "text-blue-900",
  },
  {
    name: "Science",
    courses: "29 Courses",
    level: "All levels",
    emoji: "🧪",
    bgColor: "bg-[#dbeafe]/90 border border-blue-100",
    textColor: "text-blue-900",
  },
  {
    name: "English",
    courses: "20 Courses",
    level: "All Levels",
    emoji: "📖",
    bgColor: "bg-[#fef9c3]/90 border border-amber-100",
    textColor: "text-amber-900",
  },
  {
    name: "Arts",
    courses: "24 Courses",
    level: "Tomorrow, 11:00 AM",
    emoji: "🎨",
    bgColor: "bg-[#f3e8ff]/90 border border-purple-100",
    textColor: "text-purple-900",
  },
  {
    name: "Coding",
    courses: "20 Courses",
    level: "All Levels",
    emoji: "💻",
    bgColor: "bg-[#cffaff]/90 border border-cyan-100",
    textColor: "text-cyan-900",
  },
  {
    name: "Robotics",
    courses: "20 Courses",
    level: "All Levels",
    emoji: "🤖",
    bgColor: "bg-[#ffedd5]/90 border border-orange-100",
    textColor: "text-orange-900",
  },
  {
    name: "Music",
    courses: "24 Courses",
    level: "Tomorrow, 11:00 AM",
    emoji: "🎵",
    bgColor: "bg-[#ffe4e6]/90 border border-rose-100",
    textColor: "text-rose-900",
  },
  {
    name: "Languages",
    courses: "29 Courses",
    level: "All levels",
    emoji: "🗣️",
    bgColor: "bg-[#dbeafe]/90 border border-indigo-100",
    textColor: "text-indigo-900",
  },
  {
    name: "General Knowledge",
    courses: "42 Courses",
    level: "All levels",
    emoji: "🧠",
    bgColor: "bg-[#dcfce7]/90 border border-emerald-100",
    textColor: "text-emerald-900",
  },
];

export function SubjectsPage() {
  useDocumentMeta(
    "Subjects - EDVANZ",
    "Math, science, coding, art, music, robotics and more - pick a subject to dive in.",
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 pb-12">
      {/* Header */}
      <div>
        <p className="text-xs font-black uppercase tracking-wider text-blue-600">PICK A LANE</p>
        <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">Subjects</h1>
        <p className="mt-1 text-sm font-semibold text-slate-500">
          Nine subject worlds, each stacked with courses, quizzes and projects.
        </p>
      </div>

      {/* Grid of 9 Subject Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {subjectCards.map((subject) => (
          <Link
            key={subject.name}
            to={`/explore?subject=${encodeURIComponent(subject.name)}&q=`}
            className={`flex items-center gap-4 rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${subject.bgColor}`}
          >
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl shadow-xs">
              {subject.emoji}
            </div>
            <div>
              <h2 className={`text-base font-black ${subject.textColor}`}>{subject.name}</h2>
              <p className="text-xs font-bold text-slate-500">{subject.courses}</p>
              <p className="text-xs font-semibold text-slate-400">{subject.level}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
