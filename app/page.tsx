import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { ResearchHubPage } from "@/mockups/research-hub/ResearchHubPage";

export const metadata: Metadata = {
  title: "WIGTN Tech",
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

export default function HomePage() {
  return <ResearchHubPage />;
}
