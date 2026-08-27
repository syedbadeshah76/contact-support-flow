import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { badges, certificates, learner, stats, subjects } from "@/data/portal";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Kidzy" },
      {
        name: "description",
        content: "Your Kidzy profile: level, XP, interests, badges and certificates.",
      },
      { property: "og:title", content: "Profile — Kidzy" },
      {
        property: "og:description",
        content: "Your Kidzy profile: level, XP, interests, badges and certificates.",
      },
    ],
  }),
  component: Profile,
});

const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name needs at least 2 characters" })
    .max(40, { message: "Keep the name under 40 characters" }),
  avatar: z.string().trim().min(1, { message: "Pick an emoji" }).max(4),
  bio: z.string().trim().max(160, { message: "Bio must be under 160 characters" }),
});

const avatarChoices = ["🦊", "🐼", "🦄", "🐯", "🐧", "🦁", "🐨", "🐸"];

function Profile() {
  const { profile, saveProfile, interests, toggleInterest, favourites } = useAppState();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(profile);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => setForm(profile), [profile]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = profileSchema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setErrors({});
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    saveProfile(parsed.data);
    setSaving(false);
    setOpen(false);
    toast.success("Profile updated");
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-7">
      <PageHeader eyebrow="You" title="Profile" />

      <section className="card-surface flex flex-wrap items-center gap-6 bg-soft-gradient p-6">
        <span className="grid size-24 place-items-center rounded-3xl bg-card text-5xl shadow-card">
          {profile.avatar}
        </span>
        <div className="min-w-52 flex-1">
          <h2 className="text-2xl font-extrabold">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">
            Level {learner.level} · {learner.streak}-day streak · {learner.coins} coins
          </p>
          {profile.bio && <p className="mt-1 text-sm">{profile.bio}</p>}
          <Progress
            value={Math.round((learner.xp / learner.xpToNext) * 100)}
            className="mt-3 h-2"
          />
          <p className="mt-1 text-xs font-semibold text-muted-foreground">
            {learner.xp} / {learner.xpToNext} XP to Level {learner.level + 1}
          </p>
        </div>
        <Button
          variant="outline"
          className="rounded-full font-bold"
          onClick={() => setOpen(true)}
        >
          Edit profile
        </Button>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card-surface p-4">
            <p className="text-2xl font-extrabold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="card-surface p-6">
        <h2 className="text-xl font-bold">Interests</h2>
        <p className="text-sm text-muted-foreground">Tap to add or remove a subject.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {subjects.map((s) => {
            const on = interests.includes(s.name);
            return (
              <button
                key={s.name}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  const added = toggleInterest(s.name);
                  toast[added ? "success" : "message"](
                    added ? `${s.name} added to interests` : `${s.name} removed`,
                  );
                }}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                  on
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {s.emoji} {s.name}
              </button>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card-surface p-6">
          <h2 className="text-xl font-bold">Recent badges</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {badges
              .filter((b) => b.earned)
              .map((b) => (
                <div key={b.name} className="w-20 text-center">
                  <span className="text-3xl">{b.emoji}</span>
                  <p className="text-xs font-semibold">{b.name}</p>
                </div>
              ))}
          </div>
          <Button asChild variant="ghost" className="mt-4 rounded-full font-bold">
            <Link to="/achievements">See all achievements</Link>
          </Button>
        </section>

        <section className="card-surface p-6">
          <h2 className="text-xl font-bold">Certificates</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {certificates.map((c) => (
              <li key={c.title} className="flex justify-between rounded-xl bg-muted/60 px-4 py-2.5">
                <span className="font-semibold">{c.title}</span>
                <span className="text-muted-foreground">{c.date}</span>
              </li>
            ))}
          </ul>
          <Button asChild variant="ghost" className="mt-4 rounded-full font-bold">
            <Link to="/certificates">Download certificates</Link>
          </Button>
        </section>
      </div>

      <section className="card-surface p-6">
        <h2 className="text-xl font-bold">Saved courses</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {favourites.length === 0
            ? "You haven't saved any courses yet — tap the heart on a course card."
            : `${favourites.length} course${favourites.length === 1 ? "" : "s"} saved for later.`}
        </p>
        <Button asChild className="mt-4 rounded-full font-bold">
          <Link to="/my-learning">Go to my learning</Link>
        </Button>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Change how you show up on Kidzy.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="name">Display name</Label>
              <Input
                id="name"
                value={form.name}
                maxLength={40}
                aria-invalid={!!errors['name']}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors['name'] && (
                <p className="text-sm font-semibold text-destructive">{errors['name']}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Avatar</Label>
              <div className="flex flex-wrap gap-2">
                {avatarChoices.map((a) => (
                  <button
                    key={a}
                    type="button"
                    aria-pressed={form.avatar === a}
                    onClick={() => setForm({ ...form, avatar: a })}
                    className={`grid size-11 place-items-center rounded-2xl text-xl transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                      form.avatar === a ? "bg-primary/20 ring-2 ring-primary" : "bg-muted"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="bio">Short bio</Label>
              <Textarea
                id="bio"
                rows={3}
                maxLength={160}
                value={form.bio}
                aria-invalid={!!errors['bio']}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">{form.bio.length}/160</p>
              {errors['bio'] && (
                <p className="text-sm font-semibold text-destructive">{errors['bio']}</p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                className="rounded-full font-bold"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="rounded-full font-bold">
                {saving ? "Saving…" : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
