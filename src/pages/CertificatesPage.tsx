import { useState } from "react";
import { Download, Loader2, Share2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { certificates } from "@/data/portal";
import { useAppState } from "@/lib/app-state";
import { useDocumentMeta } from "@/lib/meta";

function certificateSvg(name: string, title: string, date: string, grade: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <rect width="1200" height="800" fill="#fffaf3"/>
  <rect x="40" y="40" width="1120" height="720" fill="none" stroke="#2563eb" stroke-width="8" rx="32"/>
  <text x="600" y="180" text-anchor="middle" font-family="Georgia, serif" font-size="46" fill="#2563eb">EDVANZ Learning Portal</text>
  <text x="600" y="290" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#4a4a4a">Certificate of Completion</text>
  <text x="600" y="400" text-anchor="middle" font-family="Georgia, serif" font-size="60" fill="#222">${name}</text>
  <text x="600" y="480" text-anchor="middle" font-family="Georgia, serif" font-size="32" fill="#4a4a4a">has successfully completed</text>
  <text x="600" y="550" text-anchor="middle" font-family="Georgia, serif" font-size="40" fill="#222">${title}</text>
  <text x="600" y="640" text-anchor="middle" font-family="Georgia, serif" font-size="26" fill="#666">Completed ${date} · Grade ${grade}</text>
</svg>`;
}

export function CertificatesPage() {
  useDocumentMeta(
    "Certificates - EDVANZ",
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
    const text = `I completed "${title}" on EDVANZ!`;
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
    <div className="mx-auto flex max-w-7xl flex-col gap-6 pb-12">
      {/* Header */}
      <div>
        <p className="text-xs font-black uppercase tracking-wider text-blue-600">PROOF OF WORK</p>
        <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">Certificates</h1>
        <p className="mt-1 text-sm font-semibold text-slate-500">
          Every finished course gets a shareable certificate with your name on it.
        </p>
      </div>

      {/* Grid of 3 Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <article
            key={certificate.title}
            className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="grid h-36 place-items-center bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-6xl shadow-inner">
              🎓
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h2 className="text-base font-black text-slate-900">{certificate.title}</h2>
                <p className="mt-1 text-xs font-semibold text-slate-400">
                  Completed {certificate.date} · Grade {certificate.grade}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  onClick={() => download(certificate)}
                  disabled={downloading === certificate.title}
                  className="flex-1 rounded-full bg-blue-600 py-5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 active:scale-95"
                >
                  {downloading === certificate.title ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Download className="mr-1.5 size-4" />
                  )}
                  {downloading === certificate.title ? "Preparing..." : "Download"}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => share(certificate.title)}
                  className="rounded-full border-blue-200 px-5 py-5 text-xs font-bold text-blue-600 hover:bg-blue-50 active:scale-95"
                >
                  <Share2 className="mr-1 size-4 text-blue-600" /> Share
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
