import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { PreviewProjectPage } from "@/mockups/research-preview/PreviewProjectPage";
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

  return {
    title: `${project.shortTitle} · Design preview`,
    description: project.dek,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${SITE_URL}/${project.slug}/`,
    },
  };
}

export default async function PreviewProjectRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PreviewProjectPage slug={slug} />;
}
