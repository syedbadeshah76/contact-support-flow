import type { TicketStatus } from "@/data/support";

const tone: Record<TicketStatus, string> = {
  Open: "bg-sky/30 text-sky-foreground",
  "In progress": "bg-sun/30 text-sun-foreground",
  "Waiting on you": "bg-primary-soft text-accent-foreground",
  Resolved: "bg-mint/30 text-mint-foreground",
};

export function StatusPill({ status }: { status: TicketStatus }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-bold ${tone[status]}`}
    >
      {status}
    </span>
  );
}
