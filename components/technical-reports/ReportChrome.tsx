import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/site";
import type { ReportLocale } from "./localized-data";

/* This site is deployed separately from wigtn.com, so browser-back is the only
 * route home and it breaks on direct/shared entry. A real link always works.
 *
 * The header carries one destination, wigtn.com itself. It briefly carried
 * three, deep-linking About and Updates as well, on the theory that a reader
 * arriving cold from a paper needs a route to the team. But the tab bar under
 * the masthead is already this site's navigation, and a second row of links
 * beside the wordmark reads as part of it. One link out is unambiguous: it is
 * the way off this site, not a fourth section of it.
 *
 * The footer keeps the deep links, where a list of destinations is what a
 * footer is for.
 *
 * No trailing slashes: wigtn.com exports flat files, so `/team` resolves and
 * `/team/` 404s. */
const WIGTN_HOME = "https://wigtn.com";

/* Two destinations, and both are stable. Updates was a third and is gone: it
 * pointed at wigtn.com/news, which that site is in the middle of renaming to
 * /notices, and a footer link is the wrong place to find that out. Add it back
 * pointing at the new path once that rename ships. */
const WIGTN_LINKS = [{ label: "About", href: `${WIGTN_HOME}/team` }];

/* Reports sit under /tech, matching /feed. They were at the root until
 * 2026-08-09, which made the two halves asymmetric and the root ambiguous:
 * it was both the site's front door and one of its two sections. Those old
 * URLs are live and linked, so `app/[slug]` still exports a redirect for
 * every report slug. */
export const reportHomeHref = (locale: ReportLocale) =>
  locale === "ko" ? "/ko/tech/" : "/tech/";

export const reportHref = (slug: string, locale: ReportLocale = "en") =>
  locale === "ko" ? `/ko/tech/${slug}/` : `/tech/${slug}/`;

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
          {/* The site's name, not the section's. Both sections hang off it,
              so this stays put when the reader moves between the tabs; the
              tab bar below the masthead is what says which half you are in. */}
          <span className="hidden whitespace-nowrap font-report-mono text-xs uppercase tracking-[0.13em] text-[#B7B4C2] sm:inline">
            WIG-log
          </span>
        </Link>
        {/* One item, so no flex row to hold it and no width rule to hide it
            under. The arrow went with the other two: it was there to read as
            "back", which only worked while this was the odd one out among
            three. Alone, it is just the label. */}
        <a
          href={WIGTN_HOME}
          className="shrink-0 whitespace-nowrap font-report-mono text-[12px] uppercase tracking-[0.1em] text-[#8D8998] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-[13px]"
        >
          wigtn.com
        </a>
      </nav>
    </header>
  );
}

export function ReportFooter({ locale }: { locale: ReportLocale }) {
  return (
    <footer className="border-t border-[#D8DDE5] bg-[#F7F8FA]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-5 py-8 font-report-mono text-[12px] uppercase tracking-[0.08em] text-[#667085] sm:flex-row sm:items-center sm:justify-between md:px-8">
        <span>WIG-log</span>
        <span>
          {locale === "ko"
            ? "방법 · 측정 · 한계"
            : "Methods · Measurements · Limitations"}
        </span>
        {/* The list of destinations, which is what a footer is for. The header
            carries wigtn.com alone; this is where the deep links live. */}
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {WIGTN_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap transition-colors hover:text-[#1457D9]"
            >
              {link.label}
            </a>
          ))}
          <a
            href={WIGTN_HOME}
            className="whitespace-nowrap transition-colors hover:text-[#1457D9]"
          >
            wigtn.com
          </a>
        </nav>
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
