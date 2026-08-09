import {
  getResearchProjects,
  type ReportLocale,
} from "./localized-data";
import { ReportShell, reportHref } from "./ReportChrome";
import { HeroCarousel } from "./HeroCarousel";
import { IndexCard, IndexGrid, IndexHeading } from "../shared/IndexCard";

const HUB_COPY = {
  en: {
    title: "Technical reports",
    description:
      "Models, systems and engineering decisions documented with methods, measurements and limitations.",
    allReports: "All reports",
    article: "article",
    articles: "articles",
    workflow: "Workflow architecture",
  },
  ko: {
    title: "테크 리포트",
    description:
      "WIGTN이 만든 모델과 시스템을 어떻게 설계하고 검증했는지 기록합니다. 측정 결과와 아직 해결하지 못한 문제도 함께 공개합니다.",
    allReports: "전체 리포트",
    article: "편",
    articles: "편",
    workflow: "워크플로 구조",
  },
} as const;

export function ReportHubPage({ locale = "en" }: { locale?: ReportLocale }) {
  const projects = getResearchProjects(locale);
  const copy = HUB_COPY[locale];

  /* The three newest reports, picked here rather than curated: the array is
     already sorted newest-first, so a new report takes the strip on landing.
     Banner-less reports are skipped, not padded around — the split layout is
     half image, and the metric-tile fallback the grid uses would leave the
     hero half empty. */
  const heroSlides = projects
    .flatMap((project) =>
      project.heroFigure
        ? [
            {
              href: reportHref(project.slug, locale),
              title: project.title,
              dek: project.dek,
              date: project.date,
              lang: project.language ?? "en",
              image: {
                src: project.heroFigure.src,
                alt: project.heroFigure.alt,
              },
            },
          ]
        : [],
    )
    .slice(0, 3);

  return (
    <ReportShell locale={locale}>
      <header className="border-b border-[#E4E7EC]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 text-center md:px-8 md:py-24">
          <p className="font-report-mono text-[24px] font-medium uppercase tracking-[0.12em] text-[#1457D9] md:text-[28px]">
            WIGTN TECH
          </p>
          <h1
            className={`mt-4 font-semibold ${
              locale === "ko"
                ? "font-sans text-[clamp(2.5rem,4.5vw,4.25rem)] leading-[1.12] tracking-[-0.035em] [word-break:keep-all]"
                : "font-report-display text-[clamp(2.75rem,5vw,4.75rem)] leading-[1.02] tracking-[-0.025em]"
            }`}
          >
            {copy.title}
          </h1>
          {/* Wide enough that the English lead sits on one line and the Korean
              lead breaks at its sentence boundary rather than mid-clause. */}
          <p
            className={`mx-auto mt-5 max-w-[54rem] text-pretty text-[16px] leading-7 text-[#667085] ${
              locale === "ko" ? "[word-break:keep-all]" : ""
            }`}
          >
            {copy.description}
          </p>
        </div>
      </header>

      <HeroCarousel slides={heroSlides} locale={locale} />

      <section aria-labelledby="report-index-title">
        <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20">
          <IndexHeading
            id="report-index-title"
            title={copy.allReports}
            count={projects.length}
            unit={projects.length === 1 ? copy.article : copy.articles}
          />

          <IndexGrid>
            {projects.map((project, index) => (
              <IndexCard
                key={project.slug}
                index={index}
                locale={locale}
                item={{
                  href: reportHref(project.slug, locale),
                  title: project.cardTitle ?? project.title,
                  date: project.date,
                  lang: project.language ?? "en",
                  image: project.heroFigure && {
                    src: project.heroFigure.src,
                    alt: project.heroFigure.alt,
                    contain: project.heroFigure.contain,
                  },
                  /* Reports without a banner show their headline numbers
                     instead. `cardTitle` is an optional short form for the
                     products, where the banner already names the thing; the
                     two harness reports deliberately have none, because their
                     titles carry the series numbering a reader uses to find
                     part 2 from part 1. */
                  fallback: (
                    <div className="flex h-full flex-col justify-between bg-[#EEF4FF] p-6">
                      <span className="font-report-mono text-[12px] uppercase tracking-[0.08em] text-[#1457D9]">
                        {copy.workflow}
                      </span>
                      <div className="grid grid-cols-3 gap-3">
                        {project.metrics.slice(0, 3).map((metric) => (
                          <div key={metric.label}>
                            <strong className="block text-2xl font-medium tracking-[-0.04em]">
                              {metric.value}
                            </strong>
                            <span className="mt-1 block text-[13px] leading-5 text-[#667085]">
                              {metric.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                }}
              />
            ))}
          </IndexGrid>
        </div>
      </section>
    </ReportShell>
  );
}
