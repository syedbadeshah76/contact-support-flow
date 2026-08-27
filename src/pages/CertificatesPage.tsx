import { useState } from "react";
import { Download, Loader2, Share2 } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { certificates } from "@/data/portal";
import { useAppState } from "@/lib/app-state";
import { useDocumentMeta } from "@/lib/meta";

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

export function CertificatesPage() {
  useDocumentMeta(
    "Certificates - Kidzy",
    "Download and share the certificates you've earned for completed courses.",
  );

  const { profile } = useAppState();
  const [downloading, setDownloading] = useState<string | null>(null);

  const download = async (certificate: (typeof certificates)[number]) => {
    setDownloading(certificate.title);
    try {
      const svg = certificateSvg(profile.name, certificate.title, certificate.date, certificate.grade);
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${certificate.title.replace(/\s+/g, "-").toLowerCase()}-certificate.svg`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      toast.success("Certificate downloaded");
    } catch {
      toast.error("Download failed - please try again");
    } finally {
      setDownloading(null);
    }
  };

  const share = async (title: string) => {
    const text = `I completed "${title}" on Kidzy!`;
    const url = window.location.href;
    try {
      if (navigator.share) {
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
        {certificates.map((certificate) => (
          <article key={certificate.title} className="card-surface overflow-hidden">
            <div className="grid h-32 place-items-center bg-soft-gradient text-5xl">🎓</div>
            <div className="space-y-3 p-5">
              <div>
                <h2 className="text-lg font-bold">{certificate.title}</h2>
                <p className="text-sm text-muted-foreground">
                  Completed {certificate.date} · Grade {certificate.grade} · {profile.name}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1 rounded-full font-bold"
                  disabled={downloading === certificate.title}
                  onClick={() => download(certificate)}
                >
                  {downloading === certificate.title ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Download className="size-4" />
                  )}
                  {downloading === certificate.title ? "Preparing..." : "Download"}
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full font-bold"
                  onClick={() => share(certificate.title)}
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
