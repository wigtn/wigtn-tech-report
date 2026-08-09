import Link from "next/link";
import { SITE_URL } from "@/lib/site";

/**
 * A page that has moved, rendered as a real page.
 *
 * This site is a static export on GitHub Pages, so there is no server to send
 * a 301. What there is: a canonical link telling crawlers where the page went,
 * a meta refresh that moves a browser, and visible text for anyone who lands
 * with JavaScript or the refresh disabled. Same three parts wigtn.com uses for
 * its retired routes.
 *
 * Do not delete a redirect to tidy up. The only safe time is when the old URL
 * has stopped receiving traffic, which is a decision with data behind it.
 */
export function MovedPage({ to, title }: { to: string; title: string }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-[640px] flex-col items-center justify-center px-6 text-center">
      <p className="font-report-mono text-[12px] uppercase tracking-[0.12em] text-[#667085]">
        Moved
      </p>
      <h1 className="mt-4 font-report-display text-[1.75rem] font-semibold tracking-[-0.02em] text-[#101828]">
        {title} is now at a new address
      </h1>
      <p className="mt-4 text-[16px] leading-[1.7] text-[#475467]">
        Technical reports moved from the site root to <code>/tech/</code>. You
        should arrive in a moment.
      </p>
      <Link href={to} className="mt-6 font-medium text-[#1457D9] underline-offset-4 hover:underline">
        Go there now
      </Link>
    </main>
  );
}

/** The `<head>` half: canonical plus the refresh. */
export function movedMetadata(to: string) {
  return {
    title: "Moved",
    robots: { index: false, follow: true },
    alternates: { canonical: `${SITE_URL}${to}` },
    other: { refresh: `0; url=${to}` },
  };
}
