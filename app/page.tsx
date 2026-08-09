import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { ReportHubPage } from "@/components/technical-reports/ReportHubPage";

export const metadata: Metadata = {
  /* `absolute` so the template does not render "WIG-log | WIG-log". */
  title: { absolute: "WIG-log" },
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

export default function HomePage() {
  return <ReportHubPage />;
}
