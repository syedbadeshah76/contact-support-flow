import { useState } from "react";
import { Loader2, Video, Timer } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDocumentMeta } from "@/lib/meta";

const liveClassesList = [
  {
    topic: "Fraction Face off",
    teacher: "Ms. Chen",
    time: "Today 04:00",
    countdown: "42 mins",
    icon: "➗",
    bgColor: "bg-[#ede9fe]/80 border-[#ddd6fe]",
  },
  {
    topic: "Build a Discord Bot",
    teacher: "Ms. Rivire",
    time: "Today 06:00",
    countdown: "2 hrs",
    icon: "🤖",
    bgColor: "bg-[#ede9fe]/80 border-[#ddd6fe]",
  },
  {
    topic: "Sketching Anime Eyes",
    teacher: "Ms. Rivire",
    time: "Tomorrow · 4:30 PM",
    countdown: "1 day",
    icon: "🎨",
    bgColor: "bg-[#ede9fe]/80 border-[#ddd6fe]",
  },
  {
    topic: "Story Time: Dragons",
    teacher: "Ms. Ibarra",
    time: "Sat 11:00 AM",
    countdown: "2 Day",
    icon: "📖",
    bgColor: "bg-[#ede9fe]/80 border-[#ddd6fe]",
  },
];

export function LiveClassesPage() {
  useDocumentMeta(
    "Live Classes - EDVANZ",
    "Join small-group live classes with real teachers and ask questions in real time.",
  );

  const [joining, setJoining] = useState<string | null>(null);
  const [openClass, setOpenClass] = useState<(typeof liveClassesList)[number] | null>(null);

  const join = async (liveClass: (typeof liveClassesList)[number]) => {
    setJoining(liveClass.topic);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setJoining(null);
    setOpenClass(liveClass);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 pb-12">
      {/* Header */}
      <div>
        <p className="text-xs font-black uppercase tracking-wider text-blue-600">REAL-TIME</p>
        <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">Live classes</h1>
        <p className="mt-1 text-sm font-semibold text-slate-500">
          Small-group sessions with real teachers. Cameras optional, questions encouraged.
        </p>
      </div>

      {/* Grid of 4 Cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {liveClassesList.map((liveClass) => (
          <article
            key={liveClass.topic}
            className={`flex flex-col justify-between rounded-3xl border ${liveClass.bgColor} p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1`}
          >
            <div className="flex items-start gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl shadow-xs">
                {liveClass.icon}
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">{liveClass.topic}</h2>
                <p className="text-xs font-bold text-slate-400">{liveClass.teacher}</p>
                <p className="text-xs font-semibold text-slate-400">{liveClass.time}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-xs">
                <Timer className="size-3.5 text-blue-600" />
                <span>Start in {liveClass.countdown}</span>
              </div>

              <Button
                onClick={() => join(liveClass)}
                disabled={joining === liveClass.topic}
                className="rounded-full bg-blue-600 px-6 py-5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 active:scale-95"
              >
                {joining === liveClass.topic ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Video className="mr-1.5 size-4" />
                )}
                {joining === liveClass.topic ? "Connecting..." : "Join Class"}
              </Button>
            </div>
          </article>
        ))}
      </div>

      {/* Classroom Dialog */}
      <Dialog open={openClass !== null} onOpenChange={(isOpen) => !isOpen && setOpenClass(null)}>
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">{openClass?.topic}</DialogTitle>
            <DialogDescription className="font-semibold text-slate-500">
              {openClass?.teacher} · {openClass?.time}
            </DialogDescription>
          </DialogHeader>
          <div className="grid h-44 place-items-center rounded-2xl bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-6xl shadow-inner">
            🎥
          </div>
          <p className="text-xs font-semibold text-slate-500">
            The classroom opens 5 minutes before start. Mic and camera are optional - the chat is always open.
          </p>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="ghost"
              className="rounded-full font-bold text-xs"
              onClick={() => {
                toast.success("Class link copied to clipboard");
              }}
            >
              Copy class link
            </Button>
            <Button
              className="rounded-full bg-blue-600 font-bold text-xs text-white hover:bg-blue-700"
              onClick={() => {
                toast.success("You're in the waiting room 🎉");
                setOpenClass(null);
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
