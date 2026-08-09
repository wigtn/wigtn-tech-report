import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { ReportHubPage } from "@/components/technical-reports/ReportHubPage";

/**
 * The root is the reports hub, as it has been since launch. This repo
 * publishes technical reports and nothing else, so the site's front door and
 * its one real section are the same page. Title comes from layout.tsx, which
 * already names the site; the canonical is pinned here because the layout
 * default lacks the trailing slash, and GitHub Pages only serves this page
 * at the slashed URL — the sitemap and every report page agree on that form.
 */
export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

export default function RootRoute() {
  return <ReportHubPage />;
}
