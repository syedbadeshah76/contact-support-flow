import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/StatusPill";
import { Textarea } from "@/components/ui/textarea";
import { tickets, type TicketMessage } from "@/data/support";

export const Route = createFileRoute("/support/tickets/$ticketId")({
  loader: ({ params }) => {
    const ticket = tickets.find((t) => t.id === params.ticketId);
    if (!ticket) throw notFound();
    return { ticket };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Ticket not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.ticket.id} · ${loaderData.ticket.subject} — Kidzy Support`;
    const description = `Support thread ${loaderData.ticket.id} about ${loaderData.ticket.category}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: TicketThread,
});

function TicketThread() {
  const { ticket } = Route.useLoaderData();
  const [reply, setReply] = useState("");

  const send = () => {
    if (reply.trim().length < 2) {
      toast.error("Write a reply first");
      return;
    }
    toast.success("Reply sent to the support crew");
    setReply("");
  };

  return (
    <div className="flex flex-col gap-6">
      <Link
        to="/support/tickets"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
      >
        <ArrowLeft className="size-4" /> All requests
      </Link>

      <div className="card-surface bg-soft-gradient p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground">{ticket.id}</span>
          <StatusPill status={ticket.status} />
          <span className="rounded-full bg-card px-2.5 py-1 text-xs font-bold shadow-card">
            {ticket.priority} priority
          </span>
        </div>
        <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">{ticket.subject}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {ticket.category} · updated {ticket.updated} · helper {ticket.agent.avatar}{" "}
          {ticket.agent.name}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="card-surface space-y-4 p-5 sm:p-6">
          <h2 className="text-lg font-bold">Conversation</h2>
          <ul className="space-y-4">
            {ticket.messages.map((m: TicketMessage, i: number) => (
              <li
                key={i}
                className={`flex gap-3 ${m.from === "you" ? "flex-row-reverse" : ""}`}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-muted text-xl">
                  {m.from === "you" ? "🦊" : ticket.agent.avatar}
                </span>
                <div
                  className={`max-w-md rounded-2xl px-4 py-3 ${
                    m.from === "you"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-xs font-bold opacity-80">
                    {m.name} · {m.time}
                  </p>
                  <p className="mt-1 text-sm">{m.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-3 border-t border-border pt-4">
            <Textarea
              value={reply}
              rows={4}
              maxLength={1000}
              placeholder="Add a reply for the support crew…"
              onChange={(e) => setReply(e.target.value)}
              aria-label="Reply to ticket"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                className="rounded-full font-bold"
                onClick={() => toast("Ticket marked as resolved")}
              >
                Mark resolved
              </Button>
              <Button onClick={send} className="rounded-full font-bold">
                <Send className="size-4" /> Send reply
              </Button>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="card-surface p-5">
            <h2 className="text-lg font-bold">Ticket details</h2>
            <dl className="mt-3 space-y-2 text-sm">
              {[
                ["Reference", ticket.id],
                ["Category", ticket.category],
                ["Status", ticket.status],
                ["Priority", ticket.priority],
                ["Helper", `${ticket.agent.name}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-bold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="card-surface p-5">
            <h2 className="text-lg font-bold">Faster options</h2>
            <Button asChild className="mt-3 w-full rounded-full font-bold">
              <Link to="/support/chat">Chat with a helper</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="mt-2 w-full rounded-full font-bold"
            >
              <Link to="/support">Browse help articles</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
