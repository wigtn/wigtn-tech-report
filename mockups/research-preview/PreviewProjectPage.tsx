import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
} from "lucide-react";
import { assetPath } from "@/lib/site";
import {
  RESEARCH_PROJECTS,
  getResearchProject,
  type ResearchFigure,
  type ResearchTable,
} from "@/mockups/research-hub/data";
import { PreviewShell, previewHref } from "./PreviewChrome";

function PreviewFigure({ figure }: { figure: ResearchFigure }) {
  return (
    <figure className={`my-10 ${figure.portrait ? "max-w-[34rem]" : "max-w-[46rem]"}`}>
      <div
        className={`relative overflow-hidden border border-[#D8DDE5] bg-[#F7F8FA] ${
          figure.portrait ? "aspect-[4/5]" : "aspect-[16/9]"
        }`}
      >
        <Image
          src={assetPath(figure.src)}
          alt={figure.alt}
          fill
          sizes="(min-width: 1024px) 736px, 100vw"
          className={figure.contain ? "object-contain p-4 md:p-8" : "object-cover"}
          style={figure.focalPoint ? { objectPosition: figure.focalPoint } : undefined}
        />
      </div>
      <figcaption className="mt-3 grid grid-cols-[2.5rem_1fr] gap-3 font-report-mono text-[9px] leading-5 text-[#667085]">
        <span className="text-[#1457D9]">FIG.</span>
        <span>{figure.caption}</span>
      </figcaption>
    </figure>
  );
}

function PreviewTable({ table }: { table: ResearchTable }) {
  return (
    <div className="my-10">
      <p className="mb-3 font-report-mono text-[9px] uppercase tracking-[0.08em] text-[#667085]">
        {table.caption}
      </p>
      <div className="overflow-x-auto border-y border-[#98A2B3]">
        <table className="w-full min-w-[620px] border-collapse text-left">
          <thead>
            <tr>
              {table.headers.map((header) => (
                <th
                  key={header}
                  className="border-b border-[#98A2B3] bg-[#F7F8FA] px-4 py-3 font-report-mono text-[9px] font-medium uppercase tracking-[0.06em] text-[#475467]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={`${row.cells[0]}-${rowIndex}`} className={row.highlight ? "bg-[#EEF4FF]" : ""}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`${cell}-${cellIndex}`}
                    className={`border-b border-[#E4E7EC] px-4 py-3 text-sm leading-5 ${
                      cellIndex === 0 ? "font-medium text-[#111827]" : "text-[#475467]"
                    } ${row.highlight ? "font-medium text-[#194185]" : ""}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function youtubeEmbedUrl(url: string) {
  const id = url.match(/[?&]v=([^&]+)/)?.[1] ?? url.match(/youtu\.be\/([^?]+)/)?.[1];
  return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0` : undefined;
}

export function PreviewProjectPage({ slug }: { slug: string }) {
  const project = getResearchProject(slug);

  if (!project) {
    return (
      <PreviewShell>
        <div className="mx-auto max-w-3xl px-5 py-32 text-center">
          <h1 className="text-4xl font-medium tracking-[-0.04em]">Report not found</h1>
          <Link
            href="/preview/"
            className="mt-8 inline-flex items-center gap-2 text-sm text-[#1457D9]"
          >
            <ArrowLeft aria-hidden size={14} /> Back to report index
          </Link>
        </div>
      </PreviewShell>
    );
  }

  const videoLink = project.links.find((link) => link.href.includes("youtube.com"));
  const embedUrl = videoLink ? youtubeEmbedUrl(videoLink.href) : undefined;
  const related = RESEARCH_PROJECTS.filter((candidate) => candidate.slug !== slug).slice(0, 3);

  return (
    <PreviewShell>
      <header className="border-b border-[#D8DDE5]">
        <div className="mx-auto max-w-[1180px] px-5 py-10 md:px-8 md:py-16">
          <Link
            href="/preview/"
            className="inline-flex items-center gap-2 font-report-mono text-[9px] uppercase tracking-[0.09em] text-[#667085] transition-colors hover:text-[#1457D9]"
          >
            <ArrowLeft aria-hidden size={12} /> Report index
          </Link>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem]">
            <div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 font-report-mono text-[9px] uppercase tracking-[0.08em]">
                <span className="text-[#1457D9]">{project.status}</span>
                <span className="text-[#475467]">{project.track}</span>
                <span className="text-[#667085]">{project.format}</span>
              </div>
              <p className="mt-8 text-base font-semibold text-[#1457D9]">
                {project.shortTitle}
              </p>
              <h1 className="mt-3 max-w-[900px] text-balance text-[clamp(2.6rem,5.8vw,5.35rem)] font-medium leading-[0.96] tracking-[-0.06em]">
                {project.title}
              </h1>
              <p className="mt-7 max-w-[68ch] text-[17px] leading-8 text-[#475467]">
                {project.dek}
              </p>
            </div>

            <dl className="border-t-2 border-[#111827] pt-4 font-report-mono text-[9px] leading-5 text-[#667085] lg:self-end">
              <div className="grid grid-cols-[4.5rem_1fr] gap-3">
                <dt>Author</dt>
                <dd className="text-[#344054]">{project.authors}</dd>
              </div>
              <div className="mt-2 grid grid-cols-[4.5rem_1fr] gap-3">
                <dt>Date</dt>
                <dd className="text-[#344054]">{project.date}</dd>
              </div>
              {project.venue && (
                <div className="mt-2 grid grid-cols-[4.5rem_1fr] gap-3">
                  <dt>Venue</dt>
                  <dd className="text-[#1457D9]">{project.venue}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="mt-10 flex flex-wrap gap-2 border-t border-[#D8DDE5] pt-5">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 border px-4 py-2.5 font-report-mono text-[9px] font-medium uppercase tracking-[0.05em] transition-colors ${
                  link.primary
                    ? "border-[#111827] bg-[#111827] text-white hover:bg-[#1457D9]"
                    : "border-[#98A2B3] text-[#344054] hover:border-[#1457D9] hover:text-[#1457D9]"
                }`}
              >
                {link.href.includes("youtube.com") && <Play aria-hidden size={11} fill="currentColor" />}
                {link.label} <ArrowUpRight aria-hidden size={11} />
              </a>
            ))}
          </div>
        </div>
      </header>

      <section className="border-b border-[#D8DDE5] bg-[#F7F8FA]">
        <div className="mx-auto grid max-w-[1180px] sm:grid-cols-2 lg:grid-cols-4">
          {project.metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`px-5 py-7 md:px-8 ${
                index > 0 ? "border-t border-[#D8DDE5] sm:border-l sm:border-t-0" : ""
              } ${index === 2 ? "sm:border-l-0 lg:border-l" : ""}`}
            >
              <strong className="text-3xl font-medium tracking-[-0.04em] text-[#1457D9]">
                {metric.value}
              </strong>
              <span className="mt-3 block text-sm font-medium">{metric.label}</span>
              <span className="mt-1 block text-xs leading-5 text-[#667085]">{metric.detail}</span>
            </div>
          ))}
        </div>
      </section>

      <nav className="sticky top-14 z-40 border-b border-[#D8DDE5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1180px] gap-x-5 overflow-x-auto px-5 py-3 font-report-mono text-[9px] uppercase tracking-[0.06em] text-[#667085] md:px-8">
          {project.sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="shrink-0 hover:text-[#1457D9]">
              {section.index} {section.eyebrow}
            </a>
          ))}
          <a href="#limitations" className="shrink-0 hover:text-[#1457D9]">
            {String(project.sections.length + 1).padStart(2, "0")} Limitations
          </a>
          <a href="#sources" className="shrink-0 hover:text-[#1457D9]">
            {String(project.sections.length + 2).padStart(2, "0")} Sources
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-16 lg:grid-cols-[10rem_minmax(0,46rem)] lg:justify-between">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <span className="font-report-mono text-[9px] uppercase tracking-[0.08em] text-[#667085]">
                Contents
              </span>
              <ol className="mt-5 border-t border-[#D8DDE5]">
                {project.sections.map((section) => (
                  <li key={section.id} className="border-b border-[#E4E7EC]">
                    <a
                      href={`#${section.id}`}
                      className="grid grid-cols-[1.5rem_1fr] gap-2 py-3 font-report-mono text-[9px] leading-4 text-[#667085] hover:text-[#1457D9]"
                    >
                      <span>{section.index}</span>
                      <span>{section.eyebrow}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <article className="min-w-0">
            {project.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-t border-[#98A2B3] py-14 first:pt-0 md:py-20"
              >
                <div className="mb-8 flex gap-3 font-report-mono text-[9px] uppercase tracking-[0.08em] text-[#667085]">
                  <span className="text-[#1457D9]">{section.index}</span>
                  <span>{section.eyebrow}</span>
                </div>
                <h2 className="max-w-[680px] text-[clamp(2rem,4vw,3.35rem)] font-medium leading-[1.02] tracking-[-0.05em]">
                  {section.title}
                </h2>
                {section.lead && (
                  <p className="mt-6 max-w-[68ch] text-lg leading-8 text-[#344054]">
                    {section.lead}
                  </p>
                )}
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-6 max-w-[68ch] text-[16px] leading-8 text-[#475467]">
                    {paragraph}
                  </p>
                ))}

                {project.heroFigure && project.heroSectionId === section.id && (
                  <PreviewFigure figure={project.heroFigure} />
                )}

                {section.steps && (
                  <div className="mt-10 border-t-2 border-[#111827]">
                    {section.steps.map((step) => (
                      <div
                        key={`${section.id}-${step.label}`}
                        className="grid gap-3 border-b border-[#D8DDE5] py-5 sm:grid-cols-[6rem_11rem_minmax(0,1fr)]"
                      >
                        <span className="font-report-mono text-[9px] uppercase text-[#1457D9]">
                          {step.label}
                        </span>
                        <strong className="text-[15px] font-medium">{step.title}</strong>
                        <p className="text-sm leading-6 text-[#667085]">{step.body}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.figures?.map((figure) => (
                  <PreviewFigure key={figure.src} figure={figure} />
                ))}
                {section.table && <PreviewTable table={section.table} />}

                {section.bullets && (
                  <ul className="mt-9 border-t-2 border-[#111827]">
                    {section.bullets.map((bullet, index) => (
                      <li
                        key={bullet}
                        className="grid grid-cols-[2.25rem_1fr] gap-4 border-b border-[#D8DDE5] py-5"
                      >
                        <span className="font-report-mono text-[9px] text-[#1457D9]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] leading-7 text-[#475467]">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.callout && (
                  <aside className="mt-10 border-y border-[#98A2B3] bg-[#F7F8FA] px-5 py-6 md:px-7">
                    <span className="font-report-mono text-[9px] uppercase tracking-[0.08em] text-[#1457D9]">
                      {section.callout.label}
                    </span>
                    <p className="mt-3 text-[16px] leading-7 text-[#344054]">{section.callout.text}</p>
                  </aside>
                )}
              </section>
            ))}

            {embedUrl && (
              <section className="border-t border-[#98A2B3] py-14 md:py-20">
                <div className="mb-6 font-report-mono text-[9px] uppercase tracking-[0.08em] text-[#667085]">
                  System video
                </div>
                <div className="aspect-video max-w-[42rem] overflow-hidden border border-[#98A2B3] bg-[#111827]">
                  <iframe
                    src={embedUrl}
                    title={`${project.shortTitle} system video`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </section>
            )}

            <section id="limitations" className="scroll-mt-28 border-t border-[#98A2B3] py-14 md:py-20">
              <div className="mb-8 flex gap-3 font-report-mono text-[9px] uppercase tracking-[0.08em] text-[#667085]">
                <span className="text-[#1457D9]">
                  {String(project.sections.length + 1).padStart(2, "0")}
                </span>
                <span>Limitations</span>
              </div>
              <h2 className="text-3xl font-medium tracking-[-0.04em]">Where the claim stops</h2>
              <ul className="mt-8 border-t-2 border-[#111827]">
                {project.limitations.map((limitation, index) => (
                  <li
                    key={limitation}
                    className="grid grid-cols-[2.25rem_1fr] gap-4 border-b border-[#D8DDE5] py-5"
                  >
                    <span className="font-report-mono text-[9px] text-[#1457D9]">
                      L{String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] leading-7 text-[#475467]">{limitation}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="sources" className="scroll-mt-28 border-t border-[#98A2B3] py-14 md:py-20">
              <div className="mb-8 flex gap-3 font-report-mono text-[9px] uppercase tracking-[0.08em] text-[#667085]">
                <span className="text-[#1457D9]">
                  {String(project.sections.length + 2).padStart(2, "0")}
                </span>
                <span>Sources & citation</span>
              </div>
              <div className="border-t-2 border-[#111827]">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-5 border-b border-[#D8DDE5] py-5"
                  >
                    <span>
                      <strong className="block text-sm font-medium">{link.label}</strong>
                      <span className="mt-1 block break-all font-report-mono text-[9px] leading-4 text-[#667085]">
                        {link.href}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      size={14}
                      className="shrink-0 text-[#1457D9] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                ))}
              </div>
              <div className="mt-10 border border-[#D8DDE5] bg-[#F7F8FA] p-5">
                <span className="font-report-mono text-[9px] uppercase tracking-[0.08em] text-[#1457D9]">
                  Suggested citation
                </span>
                <code className="mt-3 block whitespace-pre-wrap font-report-mono text-[10px] leading-6 text-[#475467]">
                  {project.citation}
                </code>
              </div>
            </section>
          </article>
        </div>
      </div>

      <section className="border-t border-[#D8DDE5] bg-[#F7F8FA]">
        <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20">
          <div className="mb-5 flex items-center justify-between border-b-2 border-[#111827] pb-3">
            <span className="font-report-mono text-[9px] uppercase tracking-[0.08em] text-[#667085]">
              Continue reading
            </span>
            <Link href="/preview/" className="text-xs font-medium text-[#1457D9]">
              All reports
            </Link>
          </div>
          <div className="grid md:grid-cols-3">
            {related.map((candidate) => (
              <Link
                key={candidate.slug}
                href={previewHref(candidate.slug)}
                className="group border-b border-[#D8DDE5] py-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
              >
                <span className="font-report-mono text-[9px] uppercase tracking-[0.06em] text-[#1457D9]">
                  {candidate.status}
                </span>
                <h3 className="mt-3 text-xl font-medium tracking-[-0.03em]">
                  {candidate.shortTitle}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#667085]">{candidate.title}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-[#1457D9]">
                  Read report{" "}
                  <ArrowRight
                    aria-hidden
                    size={13}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PreviewShell>
  );
}
