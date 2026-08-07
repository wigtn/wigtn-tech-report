import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { assetPath } from "@/lib/site";
import {
  getResearchProjects,
  type ReportLocale,
} from "./localized-data";
import { ReportShell, reportHref } from "./ReportChrome";

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

  return (
    <ReportShell locale={locale}>
      <header className="border-b border-[#E4E7EC]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 text-center md:px-8 md:py-24">
          <p className="font-report-mono text-[20px] font-medium uppercase tracking-[0.12em] text-[#1457D9]">
            WIGTN Tech
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

      <section aria-labelledby="report-index-title">
        <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20">
          <div className="mb-8 flex items-end justify-between">
            <h2
              id="report-index-title"
              className="font-report-display text-[1.75rem] font-semibold tracking-[-0.02em]"
            >
              {copy.allReports}
            </h2>
            <span className="font-report-mono text-[9px] text-[#667085]">
              {String(projects.length).padStart(2, "0")}{" "}
              {projects.length === 1 ? copy.article : copy.articles}
            </span>
          </div>

          <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.slug}
                lang={project.language ?? "en"}
                className="group h-full"
              >
                {/* Column + mt-auto footer: titles are now 2-3 lines and vary
                    per project, so the date/arrow row has to be pinned or the
                    cards in a grid row stop lining up along the bottom. */}
                <Link
                  href={reportHref(project.slug, locale)}
                  className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1457D9]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#F2F4F7]">
                    {project.heroFigure ? (
                      <Image
                        src={assetPath(project.heroFigure.src)}
                        alt={project.heroFigure.alt}
                        fill
                        priority={index < 3}
                        sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
                        className={`transition-transform duration-300 group-hover:scale-[1.02] ${
                          project.heroFigure.contain ? "object-contain p-5" : "object-cover"
                        }`}
                      />
                    ) : (
                      <div className="flex h-full flex-col justify-between bg-[#EEF4FF] p-6">
                        <span className="font-report-mono text-[9px] uppercase tracking-[0.08em] text-[#1457D9]">
                          {copy.workflow}
                        </span>
                        <div className="grid grid-cols-3 gap-3">
                          {project.metrics.slice(0, 3).map((metric) => (
                            <div key={metric.label}>
                              <strong className="block text-2xl font-medium tracking-[-0.04em]">
                                {metric.value}
                              </strong>
                              <span className="mt-1 block text-[10px] leading-4 text-[#667085]">
                                {metric.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-4 font-report-mono text-[9px] uppercase leading-5 tracking-[0.07em]">
                    <span className="mt-5">
                      <span className="block normal-case tracking-[0.02em] text-[#1457D9]">
                        {project.shortTitle}
                      </span>
                      <span className="block text-[#667085]">
                        {project.status}
                        <span className="ml-4">{project.format}</span>
                      </span>
                    </span>
                    <span className="mt-5 text-[#98A2B3]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3
                    className={`mt-4 font-semibold transition-colors group-hover:text-[#1457D9] ${
                      locale === "ko"
                        ? "font-sans text-[1.375rem] leading-[1.32] tracking-[-0.03em] [word-break:keep-all] [text-wrap:pretty]"
                        : "text-balance font-report-display text-[1.5rem] leading-[1.22] tracking-[-0.02em]"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`mt-2 line-clamp-3 max-w-[32rem] text-[14px] leading-6 text-[#667085] ${
                      locale === "ko" ? "[word-break:keep-all]" : ""
                    }`}
                  >
                    {project.dek}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-5 pt-5">
                    <time className="font-report-mono text-[9px] text-[#667085]">
                      {project.date}
                    </time>
                    <ArrowRight
                      aria-hidden
                      size={16}
                      className="text-[#1457D9] transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </ReportShell>
  );
}
