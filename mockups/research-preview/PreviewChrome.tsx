import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { assetPath } from "@/lib/site";

export const previewHref = (slug: string) => `/preview/${slug}/`;

export function PreviewHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#15151E]/95 text-white backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 md:px-8">
        <Link
          href="/preview/"
          aria-label="WIGTN technical reports preview home"
          className="inline-flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Image
            src={assetPath("/images/WIGTN_LOGO_WHITE.png")}
            alt="WIGTN"
            width={141}
            height={32}
            className="h-6 w-auto"
            priority
          />
          <span className="h-4 w-px bg-white/20" />
          <span className="font-report-mono text-[9px] uppercase tracking-[0.13em] text-[#B7B4C2]">
            Technical reports
          </span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-report-mono text-[9px] uppercase tracking-[0.1em] text-[#B7B4C2] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Current design <ArrowRight aria-hidden size={12} />
        </Link>
      </nav>
    </header>
  );
}

export function PreviewFooter() {
  return (
    <footer className="border-t border-[#D8DDE5] bg-[#F7F8FA]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-5 py-8 font-report-mono text-[9px] uppercase tracking-[0.08em] text-[#667085] sm:flex-row sm:items-center sm:justify-between md:px-8">
        <span>WIGTN Technical Reports</span>
        <span>Methods · Measurements · Limitations</span>
      </div>
    </footer>
  );
}

export function PreviewShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white font-report text-[#111827] selection:bg-[#1457D9]/15">
      <PreviewHeader />
      <main>{children}</main>
      <PreviewFooter />
    </div>
  );
}
