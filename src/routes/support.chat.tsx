import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Send, Smile } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatTranscript, quickReplies } from "@/data/support";

const title = "Live chat support — Kidzy Learning Portal";
const description =
  "Chat live with the Kidzy support crew and get answers in about two minutes.";

export const Route = createFileRoute("/support/chat")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SupportChat,
});

type Message = { from: "you" | "agent"; name: string; time: string; body: string };

function SupportChat() {
  const [messages, setMessages] = useState<Message[]>([...chatTranscript]);
  const [draft, setDraft] = useState("");

  const send = (text: string) => {
    const body = text.trim().slice(0, 500);
    if (!body) return;
    const time = new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    setMessages((m) => [...m, { from: "you", name: "Emma", time, body }]);
    setDraft("");
  };

  return (
    <div className="flex flex-col gap-6">
      <Link
        to="/support"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
      >
        <ArrowLeft className="size-4" /> Back to support
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="card-surface flex h-[34rem] flex-col overflow-hidden">
          <header className="flex items-center gap-3 border-b border-border bg-soft-gradient px-5 py-4">
            <span className="grid size-11 place-items-center rounded-2xl bg-card text-xl shadow-card">
              🦊
            </span>
            <div className="min-w-0">
              <h1 className="text-lg font-bold">Riya · Kidzy helper</h1>
              <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <span className="size-2 rounded-full bg-mint" /> Online · replies in ~2
                min
              </p>
            </div>
          </header>

          <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {messages.map((m, i) => (
              <li
                key={i}
                className={`flex gap-2.5 ${m.from === "you" ? "flex-row-reverse" : ""}`}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-muted text-lg">
                  {m.from === "you" ? "🐨" : "🦊"}
                </span>
                <div
                  className={`max-w-xs rounded-2xl px-4 py-2.5 sm:max-w-sm ${
                    m.from === "you"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{m.body}</p>
                  <p className="mt-1 text-[11px] font-semibold opacity-70">{m.time}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-border px-5 py-3">
            <div className="flex flex-wrap gap-2 pb-3">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full bg-muted px-3 py-1.5 text-xs font-bold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {q}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(draft);
              }}
              className="flex items-center gap-2"
            >
              <Smile className="size-5 shrink-0 text-muted-foreground" />
              <Input
                value={draft}
                maxLength={500}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type your message…"
                aria-label="Message"
                className="rounded-full"
              />
              <Button type="submit" size="icon" className="rounded-full">
                <Send className="size-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="card-surface p-5">
            <h2 className="text-lg font-bold">Chat tips</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>💡 Share the course or quiz name</li>
              <li>🖼️ Screenshots speed things up</li>
              <li>🔒 Never share your password</li>
            </ul>
          </div>
          <div className="card-surface p-5">
            <h2 className="text-lg font-bold">Prefer writing it out?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Raise a ticket and we'll reply by email within 24 hours.
            </p>
            <Button asChild className="mt-4 w-full rounded-full font-bold">
              <Link to="/support/new">Raise a ticket</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
