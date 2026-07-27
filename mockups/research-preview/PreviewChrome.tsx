import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const previewHref = (slug: string) => `/preview/${slug}/`;

export function PreviewHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#D8DDE5] bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-[1180px] items-center justify-between px-5 md:px-8">
        <Link
          href="/preview/"
          aria-label="WIGTN technical reports preview home"
          className="inline-flex items-baseline gap-3 font-report focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1457D9]"
        >
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#111827]">
            WIGTN
          </span>
          <span className="font-report-mono text-[9px] uppercase tracking-[0.13em] text-[#667085]">
            Technical reports
          </span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-report-mono text-[9px] uppercase tracking-[0.1em] text-[#475467] transition-colors hover:text-[#1457D9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1457D9]"
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
