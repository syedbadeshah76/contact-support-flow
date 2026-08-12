import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/StatusPill";
import { statusFilters, tickets } from "@/data/support";

const title = "My support requests — Kidzy Learning Portal";
const description =
  "Track the status of every support ticket you've raised with the Kidzy help crew.";

export const Route = createFileRoute("/support/tickets/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: TicketList,
});

function TicketList() {
  const [filter, setFilter] = useState<string>("All");
  const visible = tickets.filter((t) => filter === "All" || t.status === filter);

  return (
    <div className="flex flex-col gap-6">
      <Link
        to="/support"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
      >
        <ArrowLeft className="size-4" /> Back to support
      </Link>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <PageHeader
          eyebrow="Inbox"
          title="My support requests"
          description="Every question you've sent us, newest first."
        />
        <Button asChild className="rounded-full font-bold">
          <Link to="/support/new">
            <Plus className="size-4" /> New ticket
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {statusFilters.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
              filter === s
                ? "bg-primary text-primary-foreground shadow-pop"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {visible.map((t) => (
          <Link
            key={t.id}
            to="/support/tickets/$ticketId"
            params={{ ticketId: t.id }}
            className="card-surface flex flex-wrap items-center gap-4 p-5 transition-transform hover:-translate-y-0.5"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-muted text-2xl">
              {t.agent.avatar}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-muted-foreground">{t.id}</span>
                <StatusPill status={t.status} />
              </div>
              <h2 className="mt-1 truncate text-lg font-bold">{t.subject}</h2>
              <p className="text-sm text-muted-foreground">
                {t.category} · {t.priority} priority · updated {t.updated}
              </p>
            </div>
            <span className="text-sm font-bold text-primary">View thread →</span>
          </Link>
        ))}
        {visible.length === 0 && (
          <div className="card-surface p-10 text-center">
            <p className="text-3xl">🎉</p>
            <h2 className="mt-2 text-xl font-bold">Nothing here</h2>
            <p className="text-sm text-muted-foreground">
              No tickets with the status “{filter}”.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
