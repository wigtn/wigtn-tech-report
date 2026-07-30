import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { ReportProjectPage } from "@/components/technical-reports/ReportProjectPage";
import { RESEARCH_PROJECTS } from "@/components/technical-reports/data";
import { getLocalizedResearchProject } from "@/components/technical-reports/localized-data";

export function generateStaticParams() {
  return RESEARCH_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getLocalizedResearchProject(slug, "ko");

  if (!project) {
    return {};
  }

  const canonical = `${SITE_URL}/ko/${project.slug}/`;

  return {
    title: project.shortTitle,
    description: project.dek,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/${project.slug}/`,
        ko: canonical,
      },
    },
    openGraph: {
      title: `${project.shortTitle}: ${project.title}`,
      description: project.dek,
      url: canonical,
      locale: "ko_KR",
      siteName: "WIGTN Tech",
      type: "article",
      publishedTime: project.date,
    },
  };
}

export default async function KoreanResearchProjectRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ReportProjectPage slug={slug} locale="ko" />;
}
