import { Link } from "react-router-dom";

import { PageHeader } from "@/components/PageHeader";
import { subjects } from "@/data/portal";
import { useDocumentMeta } from "@/lib/meta";

export function SubjectsPage() {
  useDocumentMeta(
    "Subjects - Kidzy",
    "Math, science, coding, art, music, robotics and more - pick a subject to dive in.",
  );

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-7">
      <PageHeader
        eyebrow="Pick a lane"
        title="Subjects"
        description="Nine subject worlds, each stacked with courses, quizzes and projects."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <Link
            key={subject.name}
            to={`/explore?subject=${encodeURIComponent(subject.name)}&q=`}
            className={`card-surface flex items-center gap-4 p-6 transition-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${subject.tint}`}
          >
            <span className="grid size-16 place-items-center rounded-2xl bg-card text-3xl shadow-card">
              {subject.emoji}
            </span>
            <div>
              <h2 className="text-lg font-extrabold">{subject.name}</h2>
              <p className="text-sm text-muted-foreground">{subject.courses} courses · all levels</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
