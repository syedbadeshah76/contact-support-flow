import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Share2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { certificates } from "@/data/portal";
import { useAppState } from "@/lib/app-state";

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

function certificateSvg(name: string, title: string, date: string, grade: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <rect width="1200" height="800" fill="#fffaf3"/>
  <rect x="40" y="40" width="1120" height="720" fill="none" stroke="#f26d3d" stroke-width="8" rx="32"/>
  <text x="600" y="180" text-anchor="middle" font-family="Georgia, serif" font-size="46" fill="#f26d3d">Kidzy Learning Portal</text>
  <text x="600" y="290" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#4a4a4a">Certificate of Completion</text>
  <text x="600" y="400" text-anchor="middle" font-family="Georgia, serif" font-size="60" fill="#222">${name}</text>
  <text x="600" y="480" text-anchor="middle" font-family="Georgia, serif" font-size="32" fill="#4a4a4a">has successfully completed</text>
  <text x="600" y="550" text-anchor="middle" font-family="Georgia, serif" font-size="40" fill="#222">${title}</text>
  <text x="600" y="640" text-anchor="middle" font-family="Georgia, serif" font-size="26" fill="#666">Completed ${date} · Grade ${grade}</text>
</svg>`;
}

function Certificates() {
  const { profile } = useAppState();
  const [downloading, setDownloading] = useState<string | null>(null);

  const download = async (c: (typeof certificates)[number]) => {
    setDownloading(c.title);
    try {
      const svg = certificateSvg(profile.name, c.title, c.date, c.grade);
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${c.title.replace(/\s+/g, "-").toLowerCase()}-certificate.svg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("Certificate downloaded");
    } catch {
      toast.error("Download failed — please try again");
    } finally {
      setDownloading(null);
    }
  };

  const share = async (title: string) => {
    const text = `I completed "${title}" on Kidzy! 🎓`;
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      toast.success("Share text copied to clipboard");
    } catch {
      toast.error("Couldn't share right now");
    }
  };

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
                  Completed {c.date} · Grade {c.grade} · {profile.name}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1 rounded-full font-bold"
                  disabled={downloading === c.title}
                  onClick={() => download(c)}
                >
                  {downloading === c.title ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Download className="size-4" />
                  )}
                  {downloading === c.title ? "Preparing…" : "Download"}
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full font-bold"
                  onClick={() => share(c.title)}
                >
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
