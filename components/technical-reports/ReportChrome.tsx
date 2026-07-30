import Image from "next/image";
import Link from "next/link";
import { assetPath } from "@/lib/site";
import type { ReportLocale } from "./localized-data";

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
  const englishHref = slug ? reportHref(slug, "en") : reportHomeHref("en");
  const koreanHref = slug ? reportHref(slug, "ko") : reportHomeHref("ko");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#15151E]/95 text-white backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 md:px-8">
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
            className="h-6 w-auto"
            priority
          />
          <span className="h-4 w-px bg-white/20" />
          <span className="font-report-mono text-[9px] uppercase tracking-[0.13em] text-[#B7B4C2]">
            Technical reports
          </span>
        </Link>
        <div
          className="flex items-center gap-3 font-report-mono text-[9px] uppercase tracking-[0.1em]"
          aria-label={locale === "ko" ? "언어 선택" : "Language"}
        >
          <Link
            href={englishHref}
            hrefLang="en"
            className={
              locale === "en"
                ? "text-white"
                : "text-[#8D8998] transition-colors hover:text-white"
            }
          >
            EN
          </Link>
          <span className="h-3 w-px bg-white/20" aria-hidden />
          <Link
            href={koreanHref}
            hrefLang="ko"
            className={
              locale === "ko"
                ? "text-white"
                : "text-[#8D8998] transition-colors hover:text-white"
            }
          >
            한국어
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function ReportFooter({ locale }: { locale: ReportLocale }) {
  return (
    <footer className="border-t border-[#D8DDE5] bg-[#F7F8FA]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-5 py-8 font-report-mono text-[9px] uppercase tracking-[0.08em] text-[#667085] sm:flex-row sm:items-center sm:justify-between md:px-8">
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
