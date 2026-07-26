import type { Metadata } from "next";
import { ResearchHubPage } from "@/mockups/research-hub/ResearchHubPage";

export const metadata: Metadata = {
  title: "WIGTN Research",
  alternates: {
    canonical: "https://research.wigtn.com/",
  },
};

export default function HomePage() {
  return <ResearchHubPage />;
}
