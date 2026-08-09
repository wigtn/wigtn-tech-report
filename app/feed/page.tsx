import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { FeedListPage } from "@/components/feed/FeedListPage";

export const metadata: Metadata = {
  /* Just the segment: layout.tsx owns the `%s | WIG-log` template. */
  title: "Feed",
  description:
    "Conferences, hackathons and the weekends in between. What WIGTN went to, what we built there, and what the room taught us.",
  alternates: {
    canonical: `${SITE_URL}/feed/`,
  },
};

export default function FeedRoute() {
  return <FeedListPage />;
}
