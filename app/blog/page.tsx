import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { BlogListPage } from "@/components/blog/BlogListPage";

export const metadata: Metadata = {
  title: "Blog | WIGTN Tech",
  description:
    "Conferences, hackathons and the weekends in between. What WIGTN went to, what we built there, and what the room taught us.",
  alternates: {
    canonical: `${SITE_URL}/blog/`,
  },
};

export default function BlogRoute() {
  return <BlogListPage />;
}
