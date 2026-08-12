import { createFileRoute } from "@tanstack/react-router";
import { Download, Share2 } from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { certificates } from "@/data/portal";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Certificates — Kidzy" },
      {
        name: "description",
        content: "Download and share the certificates you've earned for completed courses.",
      },
      { property: "og:title", content: "Certificates — Kidzy" },
      {
        property: "og:description",
        content: "Download and share certificates for completed courses.",
      },
    ],
  }),
  component: Certificates,
});

function Certificates() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-7">
      <PageHeader
        eyebrow="Proof of work"
        title="Certificates"
        description="Every finished course gets a shareable certificate with your name on it."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {certificates.map((c) => (
          <article key={c.title} className="card-surface overflow-hidden">
            <div className="grid h-32 place-items-center bg-soft-gradient text-5xl">🎓</div>
            <div className="space-y-3 p-5">
              <div>
                <h2 className="text-lg font-bold">{c.title}</h2>
                <p className="text-sm text-muted-foreground">
                  Completed {c.date} · Grade {c.grade}
                </p>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 rounded-full font-bold">
                  <Download className="size-4" /> Download
                </Button>
                <Button variant="outline" className="rounded-full font-bold">
                  <Share2 className="size-4" /> Share
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
