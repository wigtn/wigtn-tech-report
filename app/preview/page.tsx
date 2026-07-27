import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { PreviewHubPage } from "@/mockups/research-preview/PreviewHubPage";

export const metadata: Metadata = {
  title: "Design preview",
  description: "An alternate visual treatment for the WIGTN technical report archive.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

export default function PreviewPage() {
  return <PreviewHubPage />;
}
