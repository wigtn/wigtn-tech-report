import Link from "next/link";

/**
 * The two sections of this site, as a tab pair on both list pages.
 *
 * Rendered as links to two real routes rather than as client-side tab state:
 * the site is a static export, so two routes mean two indexable pages and a
 * shareable URL per tab. A `useState` tab would have put both lists behind one
 * URL and made "send me the feed" impossible.
 *
 * The pair is deliberately asymmetric: reports hold the root, the feed sits
 * one level down. This repo publishes technical reports and nothing else, so
 * the root is theirs — the feed is a guest, not a co-owner.
 */

const TABS = [
  { href: "/", label: "Technical reports" },
  { href: "/feed/", label: "Feed" },
] as const;

export function SectionTabs({ active }: { active: "reports" | "feed" }) {
  return (
    <nav
      aria-label="Sections"
      className="flex items-center justify-center gap-1 border-b border-[#E4E7EC]"
    >
      {TABS.map((tab) => {
        const isActive =
          (active === "reports" && tab.href === "/") ||
          (active === "feed" && tab.href === "/feed/");
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={`-mb-px border-b-2 px-4 py-3.5 font-report-mono text-[13px] uppercase tracking-[0.1em] transition-colors md:px-6 ${
              isActive
                ? "border-[#1457D9] text-[#101828]"
                : "border-transparent text-[#667085] hover:text-[#101828]"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
