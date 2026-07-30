import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { assetPath } from "@/lib/site";
import { RESEARCH_PROJECTS } from "./data";
import { ReportShell, reportHref } from "./ReportChrome";

export function ReportHubPage() {
  return (
    <ReportShell>
      <header className="border-b border-[#E4E7EC]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 text-center md:px-8 md:py-24">
          <p className="font-report-mono text-[10px] uppercase tracking-[0.12em] text-[#1457D9]">
            WIGTN Tech
          </p>
          <h1 className="mt-4 font-report-display text-[clamp(2.75rem,5vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
            Technical reports
          </h1>
          <p className="mx-auto mt-5 max-w-[42rem] text-[16px] leading-7 text-[#667085]">
            Models, systems and engineering decisions documented with methods,
            measurements and limitations.
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
              All reports
            </h2>
            <span className="font-report-mono text-[9px] text-[#667085]">
              {String(RESEARCH_PROJECTS.length).padStart(2, "0")} articles
            </span>
          </div>

          <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {RESEARCH_PROJECTS.map((project, index) => (
              <article
                key={project.slug}
                lang={project.language ?? "en"}
                className="group"
              >
                <Link
                  href={reportHref(project.slug)}
                  className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1457D9]"
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
                          Workflow architecture
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
                      <span className="text-[#1457D9]">{project.status}</span>
                      <span className="ml-4 text-[#667085]">{project.format}</span>
                    </span>
                    <span className="mt-5 text-[#98A2B3]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-4 font-report-display text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] transition-colors group-hover:text-[#1457D9]">
                    {project.shortTitle}
                  </h3>
                  <p className="mt-2 max-w-[32rem] text-[15px] leading-6 text-[#475467]">
                    {project.title}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-5">
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
