import type { Metadata } from "next";
import { MovedPage, movedMetadata } from "@/components/shared/MovedPage";
import {
  RESEARCH_PROJECTS,
  getResearchProject,
} from "@/components/technical-reports/data";

/**
 * Redirects for the report URLs that used to live at the site root.
 *
 * Every one of these was live and is linked from wigtn.com and from outside
 * it, so moving the reports under /tech could not just drop them. Params come
 * from RESEARCH_PROJECTS, the same list the real route uses, so a report can
 * never exist without its redirect.
 *
 * The static routes /tech and /feed take precedence over this segment, the way
 * static routes always do.
 */
export function generateStaticParams() {
  return RESEARCH_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return movedMetadata(`/tech/${slug}/`);
}

export default async function MovedReportRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getResearchProject(slug);
  return <MovedPage to={`/tech/${slug}/`} title={project?.shortTitle ?? "This report"} />;
}
