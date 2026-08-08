/* The site ships English only.
 *
 * The Korean translation still exists as `data-ko.ts`, but it is untracked and
 * gitignored, so it is present on the machine that wrote it and nowhere else.
 * This module must therefore not import it: a fresh clone has no such file, and
 * a static import would fail the build for everyone but one person.
 *
 * The `locale` parameter and the "ko" branches in the components are kept on
 * purpose. They cost nothing, and they are what makes restoring Korean a matter
 * of putting three things back rather than rewriting the render path:
 *
 *   1. `app/ko/page.tsx` and `app/ko/[slug]/page.tsx`, deleted in this change.
 *   2. The language switch and the hreflang alternate in ReportChrome.
 *   3. The merge below, whose last tracked version is in git history.
 *
 * The merge was positional: EN and KO were zipped by array index, not by id, so
 * a section added on one side and not the other broke the Korean build or
 * silently shipped an English caption. `.wigtn/checks.sh` still counts both
 * sides when the file is present, and skips when it is not.
 */
import { RESEARCH_PROJECTS } from "./data";

export type ReportLocale = "en" | "ko";

export function getResearchProjects(_locale: ReportLocale = "en") {
  return RESEARCH_PROJECTS;
}

export function getLocalizedResearchProject(
  slug: string,
  _locale: ReportLocale = "en",
) {
  return RESEARCH_PROJECTS.find((project) => project.slug === slug);
}
