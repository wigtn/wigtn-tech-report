import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { ReportProjectPage } from "@/components/technical-reports/ReportProjectPage";
import {
  RESEARCH_PROJECTS,
  getResearchProject,
} from "@/components/technical-reports/data";

/* The static route /feed takes precedence over this segment, the way static
 * routes always do, so report slugs and the feed can share the root. */
export function generateStaticParams() {
  return RESEARCH_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getResearchProject(slug);

  if (!project) {
    return {};
  }

  const canonical = `${SITE_URL}/${project.slug}/`;

  return {
    // Brand token first: SERP truncates the tail, and `title` alone drops the
    // product name out of every report page's title tag.
    title: `${project.shortTitle}: ${project.title}`,
    description: project.dek,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${project.shortTitle}: ${project.title}`,
      description: project.dek,
      url: canonical,
      siteName: "WIGTN TECH",
      type: "article",
      /* Report dates are dot-separated ("2026.07.28", "2026.07");
         article:published_time must be ISO 8601, and both full dates and
         year-month reduced precision survive the same swap. */
      publishedTime: project.date.replaceAll(".", "-"),
    },
  };
}

export default async function ResearchProjectRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ReportProjectPage slug={slug} />;
}
