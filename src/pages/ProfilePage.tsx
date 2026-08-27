import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppState } from "@/lib/app-state";
import { useDocumentMeta } from "@/lib/meta";

const profileStats = [
  { value: "9", label: "Courses enrolled" },
  { value: "80", label: "Lessons done" },
  { value: "17d", label: "Weekly streak" },
  { value: "62h", label: "Learning hours" },
];

const interestsList = [
  { name: "Math", icon: "➗" },
  { name: "Science", icon: "🧪" },
  { name: "English", icon: "📖" },
  { name: "Coding", icon: "💻" },
  { name: "Music", icon: "🎵" },
];

const recentBadges = [
  { name: "Start Streak", icon: "🔥" },
  { name: "Story Star", icon: "⭐" },
  { name: "Code Ninja", icon: "🥷" },
];

const certificatesList = [
  { title: "Scratch Game Designer", date: "Mar 2026" },
  { title: "Intro to Web Design", date: "Jan 2026" },
  { title: "Creative Writing Level 1", date: "Dec 2025" },
];

export function ProfilePage() {
  useDocumentMeta(
    "Profile - EDVANZ",
    "Your EDVANZ profile: level, XP, interests, badges and certificates.",
  );

  const { profile, saveProfile } = useAppState();
  const [open, setOpen] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);

  const handleSave = () => {
    saveProfile({ ...profile, name: nameInput });
    setOpen(false);
    toast.success("Profile updated!");
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 pb-12">
      {/* Header */}
      <div>
        <p className="text-xs font-black uppercase tracking-wider text-blue-600">YOU</p>
        <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">Profile</h1>
      </div>

      {/* Hero Banner Card */}
      <section className="relative flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-[#ddd6fe] bg-gradient-to-r from-[#c7d2fe]/90 via-[#ede9fe] to-[#e0e7ff] p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-5">
          <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-orange-100 text-4xl shadow-md border-2 border-white">
            {profile.avatar}
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">{profile.name}</h2>
            <p className="text-xs font-bold text-slate-600">
              Level 12 · 17-day streak · 1340 coins
            </p>

            {/* XP Progress Line */}
            <div className="mt-3 max-w-md">
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/60">
                <div className="h-full rounded-full bg-blue-600" style={{ width: "80%" }} />
              </div>
              <p className="mt-1 text-[11px] font-bold text-slate-700">
                4820 / 6000 XP to Level 13
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="rounded-full bg-white px-6 py-5 text-xs font-bold text-blue-600 shadow-sm hover:bg-slate-50 border-none active:scale-95"
        >
          Edit Profile
        </Button>
      </section>

      {/* 4 Stat Cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {profileStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm"
          >
            <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
            <p className="text-xs font-bold text-slate-400">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Interests Card */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-black text-slate-900">Interests</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {interestsList.map((interest) => (
            <span
              key={interest.name}
              className="flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-2 text-xs font-extrabold text-slate-700 shadow-2xs"
            >
              <span>{interest.icon}</span>
              <span>{interest.name}</span>
            </span>
          ))}
        </div>
      </section>

      {/* 2 Columns: Recent Badges & Certificates */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Badges */}
        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-black text-slate-900">Recent badges</h3>
          <div className="mt-6 flex flex-wrap justify-around gap-4 text-center">
            {recentBadges.map((badge) => (
              <div key={badge.name} className="flex flex-col items-center">
                <div className="flex size-16 items-center justify-center rounded-3xl bg-slate-50 text-4xl shadow-2xs">
                  {badge.icon}
                </div>
                <p className="mt-2 text-xs font-extrabold text-slate-800">{badge.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates */}
        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-black text-slate-900">Certificates</h3>
          <div className="mt-4 space-y-3">
            {certificatesList.map((cert) => (
              <div
                key={cert.title}
                className="flex items-center justify-between rounded-2xl bg-blue-50/60 p-3.5"
              >
                <span className="text-xs font-bold text-slate-800">{cert.title}</span>
                <span className="text-[11px] font-semibold text-slate-400">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Edit Profile</DialogTitle>
            <DialogDescription className="font-semibold text-slate-500">
              Update your display name.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="font-bold">Display Name</Label>
              <Input
                id="name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="rounded-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)} className="rounded-full font-bold">
              Cancel
            </Button>
            <Button onClick={handleSave} className="rounded-full bg-blue-600 font-bold text-white hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
