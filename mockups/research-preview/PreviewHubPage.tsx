import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RESEARCH_PROJECTS } from "@/mockups/research-hub/data";
import { PreviewShell, previewHref } from "./PreviewChrome";

export function PreviewHubPage() {
  return (
    <PreviewShell>
      <header className="border-b border-[#D8DDE5]">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-16 md:grid-cols-[minmax(0,1fr)_18rem] md:px-8 md:py-24">
          <div>
            <p className="font-report-mono text-[10px] uppercase tracking-[0.12em] text-[#1457D9]">
              WIGTN Tech
            </p>
            <h1 className="mt-4 max-w-3xl text-[clamp(2.75rem,6vw,5.25rem)] font-medium leading-[0.96] tracking-[-0.055em]">
              Technical reports
            </h1>
          </div>
          <p className="self-end text-[15px] leading-7 text-[#475467]">
            Papers, model reports and engineering notes with protocols, failure modes and
            artifacts behind each claim.
          </p>
        </div>
      </header>

      <section aria-labelledby="report-index-title">
        <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20">
          <div className="mb-5 flex items-center justify-between border-b-2 border-[#111827] pb-3">
            <h2
              id="report-index-title"
              className="font-report-mono text-[10px] font-medium uppercase tracking-[0.1em]"
            >
              Report index
            </h2>
            <span className="font-report-mono text-[9px] text-[#667085]">
              {String(RESEARCH_PROJECTS.length).padStart(2, "0")} entries
            </span>
          </div>

          <div>
            {RESEARCH_PROJECTS.map((project, index) => (
              <article key={project.slug} className="group border-b border-[#D8DDE5]">
                <Link
                  href={previewHref(project.slug)}
                  className="grid gap-4 py-7 transition-colors hover:bg-[#F7F8FA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1457D9] md:grid-cols-[4rem_10rem_minmax(0,1fr)_7rem_1.5rem] md:items-start md:px-2"
                >
                  <span className="font-report-mono text-[10px] text-[#667085]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="font-report-mono text-[9px] uppercase leading-5 tracking-[0.07em]">
                    <span className="block text-[#1457D9]">{project.status}</span>
                    <span className="block text-[#667085]">{project.format}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium leading-tight tracking-[-0.035em]">
                      {project.shortTitle}
                    </h3>
                    <p className="mt-1 text-[15px] font-medium text-[#344054]">
                      {project.title}
                    </p>
                    <p className="mt-3 max-w-[68ch] text-sm leading-6 text-[#667085]">
                      {project.dek}
                    </p>
                  </div>
                  <time className="font-report-mono text-[9px] text-[#667085]">
                    {project.date}
                  </time>
                  <ArrowRight
                    aria-hidden
                    size={16}
                    className="hidden text-[#1457D9] transition-transform group-hover:translate-x-1 md:block"
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PreviewShell>
  );
}
