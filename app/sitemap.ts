import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { RESEARCH_PROJECTS } from "@/components/technical-reports/data";
import { FEED_POSTS } from "@/components/feed/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/tech/`,
      lastModified: new Date("2026-07-26"),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...RESEARCH_PROJECTS.map((project) => ({
      url: `${SITE_URL}/tech/${project.slug}/`,
      lastModified: new Date(
        /^\d{4}\.\d{2}\.\d{2}$/.test(project.date)
          ? project.date.replaceAll(".", "-")
          : "2026-07-26",
      ),
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.9 : 0.8,
    })),
    {
      url: `${SITE_URL}/feed/`,
      lastModified: new Date("2026-08-09"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...FEED_POSTS.map((post) => ({
      url: `${SITE_URL}/feed/${post.slug}/`,
      lastModified: new Date(
        /^\d{4}\.\d{2}\.\d{2}$/.test(post.date)
          ? post.date.replaceAll(".", "-")
          : "2026-08-09",
      ),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
