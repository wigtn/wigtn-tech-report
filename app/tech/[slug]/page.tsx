import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { ReportProjectPage } from "@/components/technical-reports/ReportProjectPage";
import {
  RESEARCH_PROJECTS,
  getResearchProject,
} from "@/components/technical-reports/data";

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
      siteName: "WIG-log",
      type: "article",
      publishedTime: project.date,
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
