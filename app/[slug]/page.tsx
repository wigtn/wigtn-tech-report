import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { ResearchProjectPage } from "@/mockups/research-hub/ResearchProjectPage";
import {
  RESEARCH_PROJECTS,
  getResearchProject,
} from "@/mockups/research-hub/data";

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
    title: project.shortTitle,
    description: project.dek,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${project.shortTitle}: ${project.title}`,
      description: project.dek,
      url: canonical,
      siteName: "WIGTN Tech",
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
  return <ResearchProjectPage slug={slug} />;
}
