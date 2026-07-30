import {
  RESEARCH_PROJECTS,
  type ResearchProject,
  type ResearchSection,
} from "./data";
import { KO_PROJECT_TRANSLATIONS } from "./data-ko";

export type ReportLocale = "en" | "ko";

function translateSection(
  section: ResearchSection,
  translation: (typeof KO_PROJECT_TRANSLATIONS)[string]["sections"][number],
): ResearchSection {
  return {
    ...section,
    ...translation,
    steps: section.steps?.map((step, index) => ({
      ...step,
      ...translation.steps?.[index],
    })),
    figures: section.figures?.map((figure, index) => ({
      ...figure,
      ...translation.figures?.[index],
    })),
    table:
      section.table && translation.table
        ? {
            ...section.table,
            caption: translation.table.caption,
            headers: translation.table.headers,
            rows: section.table.rows.map((row, index) => ({
              ...row,
              cells: translation.table?.rows[index] ?? row.cells,
            })),
          }
        : section.table,
  };
}

function translateProject(project: ResearchProject): ResearchProject {
  const translation = KO_PROJECT_TRANSLATIONS[project.slug];

  if (!translation) {
    return project;
  }

  return {
    ...project,
    shortTitle: translation.shortTitle,
    title: translation.title,
    titleLines: translation.titleLines,
    dek: translation.dek,
    language: "ko",
    track: translation.track as ResearchProject["track"],
    status: translation.status as ResearchProject["status"],
    format: translation.format,
    authors: translation.authors,
    venue: translation.venue,
    heroFigure:
      project.heroFigure && translation.heroFigure
        ? { ...project.heroFigure, ...translation.heroFigure }
        : project.heroFigure,
    links: project.links.map((link, index) => ({
      ...link,
      label: translation.links[index] ?? link.label,
    })),
    metrics: project.metrics.map((metric, index) => ({
      ...metric,
      ...translation.metrics[index],
    })),
    sections: project.sections.map((section, index) =>
      translateSection(section, translation.sections[index]),
    ),
    limitations: translation.limitations,
  };
}

export const KO_RESEARCH_PROJECTS = RESEARCH_PROJECTS.map(translateProject);

export function getResearchProjects(locale: ReportLocale = "en") {
  return locale === "ko" ? KO_RESEARCH_PROJECTS : RESEARCH_PROJECTS;
}

export function getLocalizedResearchProject(
  slug: string,
  locale: ReportLocale = "en",
) {
  return getResearchProjects(locale).find((project) => project.slug === slug);
}
