import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { ReportHubPage } from "@/components/technical-reports/ReportHubPage";

export const metadata: Metadata = {
  /* Just the segment: layout.tsx owns the `%s | WIG-log` template. */
  title: "Technical reports",
  alternates: {
    canonical: `${SITE_URL}/tech/`,
  },
};

export default function TechRoute() {
  return <ReportHubPage />;
}
