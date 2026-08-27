import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Video, Bell, BellRing, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { liveClasses } from "@/data/portal";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/live-classes")({
  head: () => ({
    meta: [
      { title: "Live Classes — Kidzy" },
      {
        name: "description",
        content: "Join small-group live classes with real teachers and ask questions in real time.",
      },
      { property: "og:title", content: "Live Classes — Kidzy" },
      {
        property: "og:description",
        content: "Join small-group live classes with real teachers.",
      },
    ],
  }),
  component: LiveClasses,
});

function LiveClasses() {
  const { reminders, toggleReminder } = useAppState();
  const [joining, setJoining] = useState<string | null>(null);
  const [open, setOpen] = useState<(typeof liveClasses)[number] | null>(null);

  const join = async (l: (typeof liveClasses)[number]) => {
    setJoining(l.topic);
    await new Promise((r) => setTimeout(r, 700));
    setJoining(null);
    setOpen(l);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-7">
      <PageHeader
        eyebrow="Real-time"
        title="Live classes"
        description="Small-group sessions with real teachers. Cameras optional, questions encouraged."
      />

      <div className="grid gap-5">
        {liveClasses.map((l) => {
          const reminded = reminders.includes(l.topic);
          return (
            <article
              key={l.topic}
              className="card-surface flex flex-wrap items-center justify-between gap-4 p-6 transition-transform hover:-translate-y-0.5"
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
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-sun/30 px-3 py-1.5 text-sm font-bold text-sun-foreground">
                  Starts {l.countdown}
                </span>
                <Button
                  variant="outline"
                  className="rounded-full font-bold"
                  aria-pressed={reminded}
                  onClick={() => {
                    const on = toggleReminder(l.topic);
                    toast[on ? "success" : "message"](
                      on ? `Reminder set for ${l.topic}` : `Reminder removed`,
                    );
                  }}
                >
                  {reminded ? <BellRing className="size-4 text-primary" /> : <Bell className="size-4" />}
                  {reminded ? "Reminder on" : "Remind me"}
                </Button>
                <Button
                  className="rounded-full font-bold"
                  disabled={joining === l.topic}
                  onClick={() => join(l)}
                >
                  {joining === l.topic && <Loader2 className="size-4 animate-spin" />}
                  {joining === l.topic ? "Connecting…" : "Join class"}
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{open?.topic}</DialogTitle>
            <DialogDescription>
              {open?.teacher} · {open?.time}
            </DialogDescription>
          </DialogHeader>
          <div className="grid h-40 place-items-center rounded-2xl bg-soft-gradient text-5xl">
            🎥
          </div>
          <p className="text-sm text-muted-foreground">
            The classroom opens 5 minutes before start. Mic and camera are optional — the
            chat is always open.
          </p>
          <DialogFooter>
            <Button
              variant="ghost"
              className="rounded-full font-bold"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    `${window.location.origin}/live-classes#${encodeURIComponent(open?.topic ?? "")}`,
                  );
                  toast.success("Class link copied");
                } catch {
                  toast.error("Couldn't copy the link");
                }
              }}
            >
              Copy class link
            </Button>
            <Button
              className="rounded-full font-bold"
              onClick={() => {
                toast.success("You're in the waiting room 🎉");
                setOpen(null);
              }}
            >
              Enter classroom
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
