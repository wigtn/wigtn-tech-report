import type { MetadataRoute } from "next";
import { RESEARCH_PROJECTS } from "@/mockups/research-hub/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://research.wigtn.com";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-07-26"),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...RESEARCH_PROJECTS.map((project) => ({
      url: `${baseUrl}/${project.slug}/`,
      lastModified: new Date(
        /^\d{4}\.\d{2}\.\d{2}$/.test(project.date)
          ? project.date.replaceAll(".", "-")
          : "2026-07-26",
      ),
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.9 : 0.8,
    })),
  ];
}
