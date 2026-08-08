import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { assetPath } from "@/lib/site";
import type { ReportLocale } from "./localized-data";

/* This site is deployed separately from wigtn.com, so browser-back is the only
 * route home and it breaks on direct/shared entry. A real link always works. */
const WIGTN_HOME = "https://wigtn.com";

export const reportHomeHref = (locale: ReportLocale) =>
  locale === "ko" ? "/ko/" : "/";

export const reportHref = (slug: string, locale: ReportLocale = "en") =>
  locale === "ko" ? `/ko/${slug}/` : `/${slug}/`;

export function ReportHeader({
  locale,
  slug,
}: {
  locale: ReportLocale;
  slug?: string;
}) {
  /* The EN/한국어 switch was removed with the /ko routes. A visible language
   * pair whose second half 404s is worse than no pair at all. `locale` stays in
   * the signature so restoring Korean is a routing change, not a component
   * rewrite; localized-data.ts lists everything that has to come back. */
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#15151E]/95 text-white backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-4 px-5 md:px-8">
        <Link
          href={reportHomeHref(locale)}
          aria-label="WIGTN technical reports home"
          className="inline-flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Image
            src={assetPath("/images/WIGTN_LOGO_WHITE.png")}
            alt="WIGTN"
            width={141}
            height={32}
            /* Matches the wigtn.com header wordmark (h-7 md:h-8). */
            className="h-7 w-auto md:h-8"
            priority
          />
          {/* Hidden below sm: with the larger logo, larger mono and the new
              back-link, keeping this on a phone squeezes the flex row until
              the nav text wraps mid-word ("한 / 국 / 어"). */}
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span className="hidden whitespace-nowrap font-report-mono text-xs uppercase tracking-[0.13em] text-[#B7B4C2] sm:inline">
            Technical reports
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-4 font-report-mono text-[12px] uppercase tracking-[0.1em] sm:gap-6 sm:text-[13px]">
          <a
            href={WIGTN_HOME}
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[#8D8998] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <ArrowLeft aria-hidden size={13} />
            wigtn.com
          </a>
        </div>
      </nav>
    </header>
  );
}

export function ReportFooter({ locale }: { locale: ReportLocale }) {
  return (
    <footer className="border-t border-[#D8DDE5] bg-[#F7F8FA]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-5 py-8 font-report-mono text-[12px] uppercase tracking-[0.08em] text-[#667085] sm:flex-row sm:items-center sm:justify-between md:px-8">
        <span>WIGTN Technical Reports</span>
        <span>
          {locale === "ko"
            ? "방법 · 측정 · 한계"
            : "Methods · Measurements · Limitations"}
        </span>
      </div>
    </footer>
  );
}

export function ReportShell({
  children,
  locale = "en",
  slug,
}: {
  children: React.ReactNode;
  locale?: ReportLocale;
  slug?: string;
}) {
  return (
    <div
      lang={locale}
      className={`min-h-screen bg-white text-[#111827] selection:bg-[#1457D9]/15 ${
        locale === "ko" ? "font-sans" : "font-report"
      }`}
    >
      <ReportHeader locale={locale} slug={slug} />
      <main>{children}</main>
      <ReportFooter locale={locale} />
    </div>
  );
}
