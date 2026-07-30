import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { ReportHubPage } from "@/components/technical-reports/ReportHubPage";

export const metadata: Metadata = {
  title: "WIGTN Tech",
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      en: `${SITE_URL}/`,
      ko: `${SITE_URL}/ko/`,
    },
  },
};

export default function HomePage() {
  return <ReportHubPage />;
}
