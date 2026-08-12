import { createFileRoute } from "@tanstack/react-router";
import { Video } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { liveClasses } from "@/data/portal";

export const Route = createFileRoute("/live-classes")({
  head: () => ({
    meta: [
      { title: "Live Classes — Kidzy" },
      {
        name: "description",
        content: "Join live sessions with teachers, ask questions in real time and earn bonus XP.",
      },
      { property: "og:title", content: "Live Classes — Kidzy" },
      {
        property: "og:description",
        content: "Join live sessions with teachers and earn bonus XP.",
      },
    ],
  }),
  component: LiveClasses,
});

function LiveClasses() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-7">
      <PageHeader
        eyebrow="Real-time"
        title="Live classes"
        description="Small-group sessions with real teachers. Cameras optional, questions encouraged."
      />

      <div className="grid gap-5">
        {liveClasses.map((l) => (
          <article
            key={l.topic}
            className="card-surface flex flex-wrap items-center justify-between gap-4 p-6"
          >
            <div className="flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary">
                <Video className="size-6" />
              </span>
              <div>
                <h2 className="text-lg font-bold">{l.topic}</h2>
                <p className="text-sm text-muted-foreground">
                  {l.teacher} · {l.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-sun/30 px-3 py-1.5 text-sm font-bold text-sun-foreground">
                Starts {l.countdown}
              </span>
              <Button className="rounded-full font-bold">Join class</Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
