import { Link, createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, Search, ChevronRight } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  supportChannels,
  supportContacts,
  supportFaqs,
  supportTopics,
} from "@/data/support";

const title = "Help & Support — Kidzy Learning Portal";
const description =
  "Get help fast: live chat, support tickets, FAQs and contact details for the Kidzy learning crew.";

export const Route = createFileRoute("/support/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SupportHome,
});

function SupportHome() {
  return (
    <div className="flex flex-col gap-8">
      <section className="relative overflow-hidden rounded-3xl bg-hero-gradient px-6 py-9 text-primary-foreground shadow-pop sm:px-10">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] opacity-85">
          <LifeBuoy className="size-4" /> Support centre
        </p>
        <h1 className="mt-2 max-w-2xl text-3xl font-extrabold sm:text-4xl">
          Stuck on something? We've got you.
        </h1>
        <p className="mt-3 max-w-xl text-base opacity-90">
          Search our help articles, chat with a real helper, or raise a ticket — most
          questions get answered in under an hour.
        </p>
        <div className="mt-6 flex max-w-xl items-center gap-2 rounded-full bg-card p-1.5 shadow-card">
          <Search className="ml-3 size-4 shrink-0 text-muted-foreground" />
          <Input
            placeholder="Search help articles, e.g. 'missing XP'"
            aria-label="Search help articles"
            className="h-10 border-0 bg-transparent text-foreground shadow-none focus-visible:ring-0"
          />
          <Button className="rounded-full font-bold">Search</Button>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {supportChannels.map((c) => (
          <Link
            key={c.id}
            to={c.to}
            className="card-surface flex flex-col gap-3 p-5 transition-transform hover:-translate-y-1"
          >
            <span
              className={`grid size-12 place-items-center rounded-2xl text-2xl ${c.tint}`}
            >
              {c.emoji}
            </span>
            <div>
              <h2 className="text-lg font-bold">{c.title}</h2>
              <p className="text-sm text-muted-foreground">{c.detail}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
              {c.meta} <ChevronRight className="size-4" />
            </span>
          </Link>
        ))}
      </section>

      <section className="space-y-4">
        <PageHeader eyebrow="Browse" title="Popular topics" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {supportTopics.map((t) => (
            <div
              key={t.name}
              className="card-surface flex flex-col items-center gap-1.5 p-4 text-center"
            >
              <span className="text-2xl">{t.emoji}</span>
              <span className="text-sm font-bold leading-tight">{t.name}</span>
              <span className="text-xs text-muted-foreground">
                {t.articles} articles
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="card-surface p-5 sm:p-6">
          <h2 className="text-2xl font-extrabold">Frequently asked</h2>
          <Accordion type="single" collapsible className="mt-2">
            {supportFaqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left font-bold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="space-y-4">
          <div className="card-surface bg-soft-gradient p-5">
            <h2 className="text-xl font-bold">Still need a human?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Reach the crew directly — parents welcome.
            </p>
            <ul className="mt-4 space-y-3">
              {supportContacts.map((c) => (
                <li
                  key={c.label}
                  className="flex items-start gap-3 rounded-2xl bg-card px-4 py-3 shadow-card"
                >
                  <span className="text-xl">{c.emoji}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold">{c.label}</p>
                    <p className="truncate text-sm text-primary">{c.value}</p>
                    <p className="text-xs text-muted-foreground">{c.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-surface flex flex-col gap-3 p-5">
            <h2 className="text-lg font-bold">Nothing matching your issue?</h2>
            <Button asChild className="rounded-full font-bold">
              <Link to="/support/new">Raise a support ticket</Link>
            </Button>
            <Button asChild variant="ghost" className="rounded-full font-bold">
              <Link to="/support/chat">Start live chat</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
