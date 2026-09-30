import { useMemo, useState } from "react";
import { ArrowLeft, Check, Eye, EyeOff, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { subjects } from "@/data/portal";
import { useAppState } from "@/lib/app-state";
import { useDocumentMeta } from "@/lib/meta";
import { cn } from "@/lib/utils";

const avatars = ["🦊", "🐼", "🦄", "🐯", "🐧", "🐨"];
const learningInterests = [
  { name: "Building things", icon: "🛠️" },
  { name: "Solving puzzles", icon: "🧩" },
  { name: "Creative stories", icon: "✍️" },
  { name: "Making art", icon: "🎨" },
  { name: "Discovering nature", icon: "🌱" },
  { name: "Music & rhythm", icon: "🎵" },
];

const profileSchema = z
  .object({
    name: z.string().trim().min(2, "Enter at least 2 characters").max(40, "Keep your name under 40 characters"),
    age: z.number().int().min(6, "Age must be 6 or older").max(19, "Age must be 19 or younger"),
    email: z.string().trim().email("Enter a valid email address").max(120),
    currentPassword: z.string().max(100),
    newPassword: z.string().max(100),
    confirmPassword: z.string().max(100),
  })
  .superRefine((values, ctx) => {
    const changingPassword = Boolean(values.currentPassword || values.newPassword || values.confirmPassword);
    if (!changingPassword) return;
    if (!values.currentPassword) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["currentPassword"], message: "Enter your current password" });
    if (values.newPassword.length < 8) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["newPassword"], message: "Use at least 8 characters" });
    if (values.newPassword !== values.confirmPassword) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["confirmPassword"], message: "Passwords do not match" });
  });

type FormErrors = Partial<Record<"name" | "age" | "email" | "currentPassword" | "newPassword" | "confirmPassword", string>>;

export function EditProfilePage() {
  useDocumentMeta("Edit Profile - EDVANZ", "Update your EDVANZ learner profile and preferences.");
  const navigate = useNavigate();
  const { profile, interests, saveProfilePreferences } = useAppState();
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(String(profile.age ?? 14));
  const [email, setEmail] = useState(profile.email ?? "");
  const [avatar, setAvatar] = useState(profile.avatar);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(() => {
    const available = new Set(learningInterests.map((item) => item.name));
    const saved = interests.filter((item) => available.has(item));
    return saved.length > 0 ? saved : ["Solving puzzles", "Making art"];
  });
  const [preferredSubjects, setPreferredSubjects] = useState<string[]>(profile.preferredSubjects ?? []);
  const [securityAlerts, setSecurityAlerts] = useState(profile.securityAlerts ?? true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  const subjectOptions = useMemo(() => subjects.slice(0, 8), []);
  const toggle = (list: string[], item: string, setter: (next: string[]) => void) => {
    setter(list.includes(item) ? list.filter((value) => value !== item) : [...list, item]);
  };

  const handleSave = () => {
    const parsed = profileSchema.safeParse({
      name,
      age: Number(age),
      email,
      currentPassword,
      newPassword,
      confirmPassword,
    });
    if (!parsed.success) {
      const nextErrors: FormErrors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (typeof key === "string" && !(key in nextErrors)) nextErrors[key as keyof FormErrors] = issue.message;
      });
      setErrors(nextErrors);
      toast.error("Check the highlighted details");
      return;
    }
    if (selectedInterests.length === 0 || preferredSubjects.length === 0) {
      toast.error("Choose at least one interest and one subject");
      return;
    }

    setErrors({});
    setSaving(true);
    window.setTimeout(() => {
      saveProfilePreferences(
        {
          ...profile,
          name: parsed.data.name,
          age: parsed.data.age,
          email: parsed.data.email,
          avatar,
          preferredSubjects,
          securityAlerts,
        },
        selectedInterests,
      );
      setSaving(false);
      toast.success(newPassword ? "Profile and password updated!" : "Profile updated!");
      navigate("/profile");
    }, 450);
  };

  return (
    <div className="mx-auto max-w-6xl pb-24">
      <div className="mb-6 flex items-center gap-3">
        <Button type="button" variant="ghost" size="icon" onClick={() => navigate("/profile")} aria-label="Back to profile" className="rounded-full">
          <ArrowLeft className="size-5" />
        </Button>
        <div>
          <p className="text-xs font-black uppercase text-primary">Your space</p>
          <h1 className="text-3xl font-black text-foreground sm:text-4xl">Make it yours</h1>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">Choose what feels like you and what you want to learn next.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="space-y-6">
          <section className="card-surface overflow-hidden">
            <div className="bg-soft-gradient p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="grid size-24 shrink-0 place-items-center rounded-full border-4 border-card bg-card text-5xl shadow-card" aria-label={`Selected avatar ${avatar}`}>
                  {avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-black text-foreground">Pick your sidekick</h2>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">This character appears beside your name.</p>
                  <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Choose an avatar">
                    {avatars.map((option) => (
                      <Button
                        key={option}
                        type="button"
                        variant="outline"
                        size="icon"
                        role="radio"
                        aria-checked={avatar === option}
                        aria-label={`Choose ${option} avatar`}
                        onClick={() => setAvatar(option)}
                        className={cn("size-12 rounded-2xl bg-card text-2xl transition-transform hover:-translate-y-1", avatar === option && "border-primary ring-2 ring-primary ring-offset-2")}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="learner-name" className="font-bold">Display name</Label>
                <Input id="learner-name" value={name} maxLength={40} onChange={(event) => setName(event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} className="h-12 rounded-2xl bg-background px-4" />
                {errors.name && <p id="name-error" className="text-xs font-semibold text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="learner-age" className="font-bold">Age</Label>
                <Input id="learner-age" type="number" inputMode="numeric" min={6} max={19} value={age} onChange={(event) => setAge(event.target.value)} aria-invalid={Boolean(errors.age)} aria-describedby={errors.age ? "age-error" : undefined} className="h-12 rounded-2xl bg-background px-4" />
                {errors.age && <p id="age-error" className="text-xs font-semibold text-destructive">{errors.age}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="learner-email" className="font-bold">Parent or learner email</Label>
                <Input id="learner-email" type="email" autoComplete="email" value={email} maxLength={120} onChange={(event) => setEmail(event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className="h-12 rounded-2xl bg-background px-4" />
                {errors.email && <p id="email-error" className="text-xs font-semibold text-destructive">{errors.email}</p>}
              </div>
            </div>
          </section>

          <section className="card-surface p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <span className="grid size-10 place-items-center rounded-2xl bg-primary-soft text-primary"><Sparkles className="size-5" /></span>
              <div><h2 className="text-xl font-black text-foreground">What lights you up?</h2><p className="text-sm font-medium text-muted-foreground">Pick as many interests as you like.</p></div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {learningInterests.map((item) => {
                const selected = selectedInterests.includes(item.name);
                return (
                  <Button key={item.name} type="button" variant="outline" aria-pressed={selected} onClick={() => toggle(selectedInterests, item.name, setSelectedInterests)} className={cn("h-14 justify-start rounded-2xl px-4 text-sm font-bold", selected && "border-primary bg-primary-soft text-primary") }>
                    <span className="text-xl">{item.icon}</span><span className="flex-1 text-left">{item.name}</span>{selected && <Check className="size-4" />}
                  </Button>
                );
              })}
            </div>
          </section>

          <section className="card-surface p-6 sm:p-8">
            <h2 className="text-xl font-black text-foreground">Favourite subjects</h2>
            <p className="mt-1 text-sm font-medium text-muted-foreground">We’ll use these to shape your recommendations.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {subjectOptions.map((subject) => {
                const selected = preferredSubjects.includes(subject.name);
                return (
                  <Button key={subject.name} type="button" variant="outline" aria-pressed={selected} onClick={() => toggle(preferredSubjects, subject.name, setPreferredSubjects)} className={cn("h-11 rounded-full px-4 font-bold", selected && "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground") }>
                    <span>{subject.emoji}</span>{subject.name}
                  </Button>
                );
              })}
            </div>
          </section>

          <section className="card-surface p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <span className="grid size-10 place-items-center rounded-2xl bg-mint/15 text-mint-foreground"><LockKeyhole className="size-5" /></span>
              <div><h2 className="text-xl font-black text-foreground">Password & safety</h2><p className="text-sm font-medium text-muted-foreground">Leave password fields empty to keep your current password.</p></div>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {[
                { id: "current-password", label: "Current password", value: currentPassword, setValue: setCurrentPassword, error: errors.currentPassword, key: "currentPassword" },
                { id: "new-password", label: "New password", value: newPassword, setValue: setNewPassword, error: errors.newPassword, key: "newPassword" },
                { id: "confirm-password", label: "Confirm new password", value: confirmPassword, setValue: setConfirmPassword, error: errors.confirmPassword, key: "confirmPassword" },
              ].map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id} className="font-bold">{field.label}</Label>
                  <div className="relative">
                    <Input id={field.id} type={showPasswords ? "text" : "password"} autoComplete={field.id === "current-password" ? "current-password" : "new-password"} value={field.value} maxLength={100} onChange={(event) => field.setValue(event.target.value)} aria-invalid={Boolean(field.error)} aria-describedby={field.error ? `${field.id}-error` : undefined} className="h-12 rounded-2xl bg-background px-4 pr-12" />
                    <Button type="button" variant="ghost" size="icon" onClick={() => setShowPasswords((visible) => !visible)} aria-label={showPasswords ? "Hide passwords" : "Show passwords"} className="absolute right-1.5 top-1.5 rounded-xl">
                      {showPasswords ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </Button>
                  </div>
                  {field.error && <p id={`${field.id}-error`} className="text-xs font-semibold text-destructive">{field.error}</p>}
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 rounded-2xl border bg-background p-4 sm:col-span-2">
                <div><p className="text-sm font-bold text-foreground">Security alerts</p><p className="text-xs font-medium text-muted-foreground">Email me when a new device signs in.</p></div>
                <Switch checked={securityAlerts} onCheckedChange={setSecurityAlerts} aria-label="Security alerts" />
              </div>
            </div>
          </section>
        </div>

        <aside className="h-fit space-y-4 lg:sticky lg:top-22">
          <div className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-pop">
            <ShieldCheck className="size-7" />
            <h2 className="mt-4 text-xl font-black">You’re in control</h2>
            <p className="mt-2 text-sm font-medium text-primary-foreground/80">Only your saved choices appear on your learner profile.</p>
          </div>
          <div className="card-surface p-5">
            <p className="text-sm font-black text-foreground">Profile preview</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="grid size-14 place-items-center rounded-full bg-primary-soft text-3xl">{avatar}</span>
              <div className="min-w-0"><p className="truncate font-black text-foreground">{name.trim() || "Your name"}</p><p className="text-xs font-semibold text-muted-foreground">Level 12 learner</p></div>
            </div>
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/95 p-3 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-6xl justify-end gap-3">
          <Button type="button" variant="outline" disabled={saving} onClick={() => navigate("/profile")} className="h-11 rounded-full px-6 font-bold">Cancel</Button>
          <Button type="button" disabled={saving} onClick={handleSave} className="h-11 min-w-36 rounded-full px-6 font-bold">{saving ? "Saving…" : "Save Changes"}</Button>
        </div>
      </div>
    </div>
  );
}