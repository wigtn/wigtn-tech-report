import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RESEARCH_PROJECTS } from "@/mockups/research-hub/data";
import { PreviewShell, previewHref } from "./PreviewChrome";

export function PreviewHubPage() {
  return (
    <PreviewShell>
      <header className="border-b border-[#D8DDE5]">
        <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20">
          <div className="flex items-center justify-between border-b border-[#D8DDE5] pb-4 font-report-mono text-[9px] uppercase tracking-[0.1em]">
            <span className="text-[#1457D9]">WIGTN Tech</span>
            <span className="text-[#667085]">
              {String(RESEARCH_PROJECTS.length).padStart(2, "0")} reports
            </span>
          </div>
          <div>
            <h1 className="mt-8 max-w-3xl text-[clamp(2.75rem,5vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.055em]">
              Technical reports
            </h1>
            <p className="mt-5 max-w-[46rem] text-[16px] leading-7 text-[#475467]">
              Papers, model reports and engineering notes with protocols, failure modes and
              artifacts behind each claim.
            </p>
          </div>
        </div>
      </header>

      <section aria-labelledby="report-index-title">
        <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20">
          <div className="mb-8 flex items-center justify-between">
            <h2
              id="report-index-title"
              className="font-report-mono text-[10px] font-medium uppercase tracking-[0.1em]"
            >
              Report archive
            </h2>
            <span className="font-report-mono text-[9px] text-[#667085]">
              01—{String(RESEARCH_PROJECTS.length).padStart(2, "0")}
            </span>
          </div>

          <div className="grid border-t-2 border-[#111827] md:grid-cols-2">
            {RESEARCH_PROJECTS.map((project, index) => (
              <article
                key={project.slug}
                className={`group border-b border-[#D8DDE5] ${
                  index % 2 === 0 ? "md:border-r md:pr-8" : "md:pl-8"
                }`}
              >
                <Link
                  href={previewHref(project.slug)}
                  className="flex min-h-[21rem] flex-col py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1457D9] md:py-10"
                >
                  <div className="flex items-start justify-between gap-4 font-report-mono text-[9px] uppercase leading-5 tracking-[0.07em]">
                    <span>
                      <span className="text-[#1457D9]">{project.status}</span>
                      <span className="ml-4 text-[#667085]">{project.format}</span>
                    </span>
                    <span className="text-[#667085]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-8 text-3xl font-medium leading-tight tracking-[-0.045em]">
                    {project.shortTitle}
                  </h3>
                  <p className="mt-2 max-w-[32rem] text-lg font-medium leading-7 tracking-[-0.02em] text-[#344054]">
                    {project.title}
                  </p>
                  <p className="mt-5 max-w-[34rem] text-sm leading-6 text-[#667085]">
                    {project.dek}
                  </p>

                  <div className="mt-auto flex items-end justify-between gap-5 pt-10">
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
    </PreviewShell>
  );
}
