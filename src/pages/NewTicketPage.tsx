import { useState } from "react";
import { ArrowLeft, Paperclip } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supportTopics } from "@/data/support";
import { useDocumentMeta } from "@/lib/meta";

const title = "Raise a support ticket - Kidzy Learning Portal";
const description = "Tell us what went wrong and our support crew will reply within 24 hours.";

const ticketSchema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  topic: z.string().min(1, "Pick a topic"),
  priority: z.string().min(1),
  subject: z.string().trim().min(4, "Add a short subject").max(120),
  details: z
    .string()
    .trim()
    .min(15, "Tell us a bit more (15+ characters)")
    .max(1000, "Keep it under 1000 characters"),
});

type Errors = Partial<Record<keyof z.infer<typeof ticketSchema>, string>>;

export function NewTicketPage() {
  useDocumentMeta(title, description);

  const [form, setForm] = useState({
    name: "Emma Rivera",
    email: "emma@kidzy.app",
    topic: "",
    priority: "medium",
    subject: "",
    details: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const setField = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = ticketSchema.safeParse(form);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        next[issue.path[0] as keyof Errors] = issue.message;
      }
      setErrors(next);
      toast.error("Please fix the highlighted fields");
      return;
    }

    setErrors({});
    toast.success("Ticket submitted - reference KZ-2492", {
      description: "We'll email you the moment a helper replies.",
    });
    setForm((current) => ({ ...current, subject: "", details: "" }));
  };

  return (
    <div className="flex flex-col gap-6">
      <Link
        to="/support"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
      >
        <ArrowLeft className="size-4" /> Back to support
      </Link>

      <PageHeader
        eyebrow="New request"
        title="Raise a support ticket"
        description="Share as much detail as you can - screenshots and lesson names help us fix things faster."
      />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <form onSubmit={submit} noValidate className="card-surface space-y-5 p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name" error={errors.name} htmlFor="name">
              <Input id="name" value={form.name} maxLength={80} onChange={(e) => setField("name", e.target.value)} />
            </Field>
            <Field label="Email" error={errors.email} htmlFor="email">
              <Input
                id="email"
                type="email"
                value={form.email}
                maxLength={255}
                onChange={(e) => setField("email", e.target.value)}
              />
            </Field>
          </div>

          <Field label="Topic" error={errors.topic} htmlFor="topic">
            <Select value={form.topic} onValueChange={(value) => setField("topic", value)}>
              <SelectTrigger id="topic">
                <SelectValue placeholder="What is this about?" />
              </SelectTrigger>
              <SelectContent>
                {supportTopics.map((topic) => (
                  <SelectItem key={topic.name} value={topic.name}>
                    {topic.emoji} {topic.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="How urgent is it?" htmlFor="priority">
            <RadioGroup
              value={form.priority}
              onValueChange={(value) => setField("priority", value)}
              className="grid gap-3 sm:grid-cols-3"
            >
              {[
                { value: "low", label: "Low", detail: "Can wait a few days" },
                { value: "medium", label: "Medium", detail: "Blocking some learning" },
                { value: "high", label: "High", detail: "Can't use the app" },
              ].map((option) => (
                <Label
                  key={option.value}
                  htmlFor={`p-${option.value}`}
                  className="flex cursor-pointer items-start gap-2 rounded-2xl border border-border bg-muted/50 p-3 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-soft"
                >
                  <RadioGroupItem id={`p-${option.value}`} value={option.value} className="mt-0.5" />
                  <span>
                    <span className="block text-sm font-bold">{option.label}</span>
                    <span className="block text-xs text-muted-foreground">{option.detail}</span>
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </Field>

          <Field label="Subject" error={errors.subject} htmlFor="subject">
            <Input
              id="subject"
              placeholder="Short summary of the problem"
              value={form.subject}
              maxLength={120}
              onChange={(e) => setField("subject", e.target.value)}
            />
          </Field>

          <Field label="What happened?" error={errors.details} htmlFor="details">
            <Textarea
              id="details"
              rows={6}
              placeholder="Tell us what you did, what you expected, and what happened instead."
              value={form.details}
              maxLength={1000}
              onChange={(e) => setField("details", e.target.value)}
            />
            <p className="mt-1 text-right text-xs text-muted-foreground">{form.details.length}/1000</p>
          </Field>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outline"
              className="rounded-full font-bold"
              onClick={() => toast("Attachment picker is coming soon")}
            >
              <Paperclip className="size-4" /> Attach screenshot
            </Button>
            <Button type="submit" className="rounded-full font-bold">
              Submit ticket
            </Button>
          </div>
        </form>

        <aside className="space-y-4">
          <div className="card-surface bg-soft-gradient p-5">
            <h2 className="text-lg font-bold">Before you send</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>✅ Add the course or quiz name</li>
              <li>✅ Mention your device and browser</li>
              <li>✅ Attach a screenshot if you can</li>
              <li>✅ Tell us the time it happened</li>
            </ul>
          </div>
          <div className="card-surface p-5">
            <h2 className="text-lg font-bold">Need an answer now?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Live chat is open and replies in about 2 minutes.
            </p>
            <Button asChild className="mt-4 w-full rounded-full font-bold">
              <Link to="/support/chat">Start live chat</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="font-bold">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs font-semibold text-destructive">{error}</p>}
    </div>
  );
}
