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
  type ResearchFigure,
  type ResearchTable,
} from "./data";
import {
  AUTHOR_AFFILIATION,
  getReportAuthor,
  type ReportAuthor,
} from "./authors";
import {
  getLocalizedResearchProject,
  getResearchProjects,
  type ReportLocale,
} from "./localized-data";
import {
  ReportShell,
  reportHomeHref,
  reportHref,
} from "./ReportChrome";

const PROJECT_COPY = {
  en: {
    notFound: "Report not found",
    backToIndex: "Back to report index",
    reportIndex: "Report index",
    systemVideo: "System video",
    limitations: "Limitations",
    claimStops: "Where the claim stops",
    sources: "Sources",
    continue: "Continue reading",
    allReports: "All reports",
    readReport: "Read report",
  },
  ko: {
    notFound: "리포트를 찾을 수 없습니다",
    backToIndex: "리포트 목록으로 돌아가기",
    reportIndex: "리포트 목록",
    systemVideo: "시스템 영상",
    limitations: "한계",
    claimStops: "평가의 한계",
    sources: "자료",
    continue: "다른 리포트",
    allReports: "전체 리포트",
    readReport: "리포트 읽기",
  },
} as const;

/* Figures render at their own aspect ratio, with no frame around them.
 *
 * The previous version put every image inside a fixed 16:9 box with a border, a
 * grey fill and up to 32px of padding, then used object-contain. The images in
 * this repository run from 0.64:1 to 3.18:1, so that box was mostly empty for
 * most of them: the OmniDocBench chart is 3.18:1 and was losing 44% of its
 * height to grey, and the WIGVO pipeline diagram is taller than it is wide and
 * came out small in the middle of a landscape frame. A chart is already a
 * rectangle on white. Framing it adds a second rectangle and nothing else.
 *
 * The width cap comes from the measured ratio rather than a hand-set flag,
 * because the failure it prevents is a portrait image rendering 1300px tall. */
function figureMaxWidth(figure: ResearchFigure) {
  if (figure.portrait) return "max-w-[28rem]";
  if (!figure.width || !figure.height) return "max-w-[52rem]";
  const ratio = figure.width / figure.height;
  if (ratio < 1) return "max-w-[28rem]";
  if (ratio < 1.6) return "max-w-[42rem]";
  return "max-w-[52rem]";
}

/* The byline names a person, not a department.
 *
 * It used to be a text run: "WIGTN Engineering · 2026.08.04". Four of the five
 * reports said "WIGTN Engineering" or "WIGTN Research", which identifies nobody
 * and is the same string a reader has already seen on the card and the footer.
 * A named face is the one thing on the page that says a person stands behind
 * the measurements.
 *
 * It is now the only credit on the page. A "Suggested citation" box used to sit
 * under the sources; it came out because nobody cites these — WIGVO's readers
 * cite the ACL paper, and the other four are web notes. The box was inviting a
 * citation nobody was going to write, in a form that made unreviewed notes look
 * like publications.
 *
 * The portrait needs no per-person framing: authors.ts stores square crops
 * already centred on the face, so the circle is a plain `rounded-full`. It is
 * decorative here — the name sits in the adjacent text, so a screen reader that
 * also announced the image would say the name twice. Hence alt="".
 *
 * `authors` renders only when it carries names the byline does not — in
 * practice the WIGVO paper's five. It sits under the byline rather than
 * replacing it, so the report has an author and the paper keeps its authors. */
function ReportByline({
  author,
  date,
  authors,
}: {
  author: ReportAuthor;
  date: string;
  authors?: string;
}) {
  return (
    <div className="mt-7">
      <div className="flex items-center gap-4">
        <Image
          src={assetPath(author.image)}
          alt=""
          width={author.width}
          height={author.height}
          sizes="56px"
          className="h-14 w-14 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className="text-[17px] font-semibold leading-6 text-[#1457D9]">
            {author.name}
          </div>
          <div className="mt-0.5 text-[15px] leading-6 text-[#667085]">
            {author.role}, {AUTHOR_AFFILIATION}
            <span aria-hidden className="mx-2 text-[#98A2B3]">
              ·
            </span>
            <time>{date}</time>
          </div>
        </div>
      </div>
      {authors && (
        <p className="mt-3 text-[15px] leading-6 text-[#667085]">
          <span className="text-[#98A2B3]">Paper authors</span> {authors}
        </p>
      )}
    </div>
  );
}

function ReportFigure({ figure }: { figure: ResearchFigure }) {
  return (
    <figure className={`my-9 ${figureMaxWidth(figure)}`}>
      <Image
        src={assetPath(figure.src)}
        alt={figure.alt}
        width={figure.width ?? 1600}
        height={figure.height ?? 900}
        sizes="(min-width: 1024px) 832px, 100vw"
        className="h-auto w-full"
      />
      <figcaption className="mt-4 grid grid-cols-[2.5rem_1fr] gap-3 font-report-mono text-[12px] leading-5 text-[#667085]">
        <span className="text-[#1457D9]">FIG.</span>
        <span>{figure.caption}</span>
      </figcaption>
    </figure>
  );
}

function ReportTable({ table }: { table: ResearchTable }) {
  return (
    <div className="my-8">
      <p className="mb-3 font-report-mono text-[12px] uppercase tracking-[0.08em] text-[#667085]">
        {table.caption}
      </p>
      <div className="overflow-x-auto border-y border-[#98A2B3]">
        <table className="w-full min-w-[620px] border-collapse text-left">
          <thead>
            <tr>
              {table.headers.map((header) => (
                <th
                  key={header}
                  className="border-b border-[#98A2B3] bg-[#F7F8FA] px-4 py-3 font-report-mono text-[12px] font-medium uppercase tracking-[0.06em] text-[#475467]"
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
                    className={`border-b border-[#E4E7EC] px-4 py-3 text-[15px] leading-6 ${
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

export function ReportProjectPage({
  slug,
  locale = "en",
}: {
  slug: string;
  locale?: ReportLocale;
}) {
  const project = getLocalizedResearchProject(slug, locale);
  const copy = PROJECT_COPY[locale];

  if (!project) {
    return (
      <ReportShell locale={locale}>
        <div className="mx-auto max-w-3xl px-5 py-32 text-center">
          <h1 className="font-report-display text-4xl font-semibold tracking-[-0.02em]">
            {copy.notFound}
          </h1>
          <Link
            href={reportHomeHref(locale)}
            className="mt-8 inline-flex items-center gap-2 text-sm text-[#1457D9]"
          >
            <ArrowLeft aria-hidden size={14} /> {copy.backToIndex}
          </Link>
        </div>
      </ReportShell>
    );
  }

  /* Section numbers run continuously over what actually renders. Limitations is
   * skipped when the list is empty, so Sources takes its number instead of
   * leaving a hole in the sequence. */
  const sourcesIndex = project.sections.length + (project.limitations.length > 0 ? 2 : 1);
  const videoLink = project.links.find((link) => link.href.includes("youtube.com"));
  const embedUrl = videoLink ? youtubeEmbedUrl(videoLink.href) : undefined;
  const related = getResearchProjects(locale)
    .filter((candidate) => candidate.slug !== slug)
    .slice(0, 3);

  return (
    <ReportShell locale={locale} slug={slug}>
      <header lang={locale}>
        <div className="mx-auto w-full max-w-[960px] px-6 pb-10 pt-10 md:px-8 md:pb-12 md:pt-14">
          <div className="mx-auto max-w-[820px]">
            <Link
              href={reportHomeHref(locale)}
              className="inline-flex items-center gap-2 font-report-mono text-[12px] uppercase tracking-[0.09em] text-[#667085] transition-colors hover:text-[#1457D9]"
            >
              <ArrowLeft aria-hidden size={12} /> {copy.reportIndex}
            </Link>

            <div className="mt-8">
              {/* Only the venue survives from what used to be a five-item
                  taxonomy row. "WIGTN Plugin · Engineering note · Workflow
                  architecture · Agentic engineering" was four labels a reader
                  cannot act on, stacked above the one line that tells them
                  something: where the work was published. The fields are still
                  in the data and still drive sorting and metadata. */}
              {project.venue && (
                <div className="font-report-mono text-[12px] uppercase tracking-[0.08em] text-[#667085]">
                  {project.venue}
                </div>
              )}
              <h1
                className={`${project.venue ? "mt-5" : ""} font-semibold ${
                  locale === "ko"
                    ? "max-w-[780px] font-sans text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.18] tracking-[-0.035em] [word-break:keep-all] [text-wrap:pretty]"
                    : "text-balance font-report-display text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.08] tracking-[-0.022em]"
                }`}
              >
                {locale === "ko" && project.titleLines
                  ? project.titleLines.map((line) => (
                      <span key={line} className="md:block">
                        {line}{" "}
                      </span>
                    ))
                  : project.title}
              </h1>
              <p
                className={`mt-5 text-[17px] leading-[1.75] text-[#475467] ${
                  locale === "ko"
                    ? "max-w-[760px] [word-break:keep-all] [text-wrap:pretty]"
                    : ""
                }`}
              >
                {project.dek}
              </p>

              <ReportByline
                author={getReportAuthor(project.authorId)}
                date={project.date}
                authors={project.authors}
              />

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                {project.links.slice(0, 4).map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border-b border-[#98A2B3] pb-1 text-[13px] font-medium text-[#344054] transition-colors hover:border-[#1457D9] hover:text-[#1457D9]"
                  >
                    {link.href.includes("youtube.com") && (
                      <Play aria-hidden size={11} fill="currentColor" />
                    )}
                    {link.label} <ArrowUpRight aria-hidden size={11} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        lang={locale}
        className="mx-auto w-full max-w-[960px] px-6 pb-12 md:px-8 md:pb-16"
      >
        <article className="border-t border-[#D8DDE5]">
          {project.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-20 border-b border-[#E4E7EC] py-9 md:py-12"
            >
              <div className="mx-auto max-w-[820px]">
                <header className="flex gap-3 font-report-mono text-[12px] uppercase tracking-[0.08em] text-[#667085]">
                  <span className="text-[#1457D9]">{section.index}</span>
                  <span>{section.eyebrow}</span>
                </header>
                {/* Type scale, body-relative: label 12 / body 17 / lead 19 /
                    heading 30-40. The old scale ran 9 / 16 / 16 / 27-36, which
                    put every mono label at 56% of body. At that size the eyebrow,
                    the figure caption and the table header stopped being read at
                    all, so the numbers a table exists to show arrived unlabelled. */}
                <div className="mt-5 min-w-0">
                  <h2
                    className={`font-semibold ${
                      locale === "ko"
                        ? "max-w-[760px] font-sans text-[clamp(1.8rem,2.6vw,2.4rem)] leading-[1.3] tracking-[-0.028em] [word-break:keep-all] [text-wrap:pretty]"
                        : "font-report-display text-[clamp(1.875rem,2.9vw,2.5rem)] leading-[1.18] tracking-[-0.018em]"
                    }`}
                  >
                    {section.title}
                  </h2>
                  {section.lead && (
                    <p
                      className={`mt-5 text-[19px] leading-[1.7] text-[#344054] ${
                        locale === "ko" ? "[word-break:keep-all]" : ""
                      }`}
                    >
                      {section.lead}
                    </p>
                  )}
                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className={`mt-4 text-[17px] leading-[1.75] text-[#475467] ${
                        locale === "ko" ? "[word-break:keep-all]" : ""
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}

                {project.heroFigure && project.heroSectionId === section.id && (
                  <ReportFigure figure={project.heroFigure} />
                )}

                {section.steps && (
                  <div className="mt-8 border-t border-[#98A2B3]">
                    {section.steps.map((step) => (
                      <div
                        key={`${section.id}-${step.label}`}
                        className="grid gap-3 border-b border-[#E4E7EC] py-4 sm:grid-cols-[5rem_9rem_minmax(0,1fr)]"
                      >
                        <span className="font-report-mono text-[12px] uppercase text-[#1457D9]">
                          {step.label}
                        </span>
                        <strong className="text-[16px] font-medium">{step.title}</strong>
                        <p className="text-[15px] leading-6 text-[#667085]">{step.body}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.figures?.map((figure) => (
                  <ReportFigure key={figure.src} figure={figure} />
                ))}
                {section.table && <ReportTable table={section.table} />}

                {section.bullets && (
                  <ul className="mt-8 border-t border-[#98A2B3]">
                    {section.bullets.map((bullet, index) => (
                      <li
                        key={bullet}
                        className="grid grid-cols-[2.25rem_1fr] gap-4 border-b border-[#E4E7EC] py-4"
                      >
                        <span className="font-report-mono text-[12px] text-[#1457D9]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[17px] leading-[1.7] text-[#475467]">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                  {section.callout && (
                    <aside className="mt-8 border-l-2 border-[#1457D9] pl-5">
                      <span className="font-report-mono text-[12px] uppercase tracking-[0.08em] text-[#1457D9]">
                        {section.callout.label}
                      </span>
                      <p className="mt-2 text-[17px] leading-[1.7] text-[#475467]">
                        {section.callout.text}
                      </p>
                    </aside>
                  )}
                </div>
              </div>
            </section>
          ))}

          {embedUrl && (
            <section className="border-b border-[#E4E7EC] py-9 md:py-12">
              <div className="mx-auto max-w-[820px]">
                <header className="mb-5 font-report-mono text-[12px] uppercase tracking-[0.08em] text-[#667085]">
                  {copy.systemVideo}
                </header>
                <div className="aspect-video overflow-hidden rounded-lg bg-[#111827]">
                  <iframe
                    src={embedUrl}
                    title={`${project.shortTitle} system video`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </section>
          )}

          {/* No limitations listed, no Limitations section — rather than the
              heading "Where the claim stops" above an empty rule. The empty
              heading is worse than the absence: on a page that has not yet
              stated its bounds, it reads as a claim whose bounds are none.
              `sections` needs no guard; it maps over nothing. */}
          {project.limitations.length > 0 && (
          <section
            id="limitations"
            className="scroll-mt-20 border-b border-[#E4E7EC] py-9 md:py-12"
          >
            <div className="mx-auto max-w-[820px]">
              <header className="flex gap-3 font-report-mono text-[12px] uppercase tracking-[0.08em] text-[#667085]">
                <span className="text-[#1457D9]">
                  {String(project.sections.length + 1).padStart(2, "0")}
                </span>
                <span>{copy.limitations}</span>
                {/* Numbered from the sections above it; `sourcesIndex` below
                    counts this one only when it renders. */}
              </header>
              <div className="mt-5">
                <h2
                  className={`font-semibold ${
                    locale === "ko"
                      ? "font-sans text-[clamp(1.65rem,2.35vw,2.15rem)] leading-[1.3] tracking-[-0.028em] [word-break:keep-all]"
                      : "font-report-display text-[clamp(1.7rem,2.6vw,2.25rem)] leading-[1.18] tracking-[-0.018em]"
                  }`}
                >
                  {copy.claimStops}
                </h2>
                <ul className="mt-7 border-t border-[#98A2B3]">
                  {project.limitations.map((limitation, index) => (
                    <li
                      key={limitation}
                      className="grid grid-cols-[2.25rem_1fr] gap-4 border-b border-[#E4E7EC] py-4"
                    >
                      <span className="font-report-mono text-[12px] text-[#1457D9]">
                        L{String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[17px] leading-[1.7] text-[#475467]">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          )}

          <section
            id="sources"
            className="scroll-mt-20 py-9 md:py-12"
          >
            <div className="mx-auto max-w-[820px]">
              <header className="flex gap-3 font-report-mono text-[12px] uppercase tracking-[0.08em] text-[#667085]">
                <span className="text-[#1457D9]">
                  {String(sourcesIndex).padStart(2, "0")}
                </span>
                <span>{copy.sources}</span>
              </header>
              <div className="mt-5">
                <div className="border-t border-[#98A2B3]">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-5 border-b border-[#D8DDE5] py-5"
                    >
                      <span>
                        <strong className="block text-[15px] font-medium">{link.label}</strong>
                        <span className="mt-1 block break-all font-report-mono text-[12px] leading-5 text-[#667085]">
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
              </div>
            </div>
          </section>
        </article>
      </div>

      <section className="border-t border-[#D8DDE5] bg-[#F7F8FA]">
        <div className="mx-auto max-w-[1180px] px-5 py-12 md:px-8 md:py-16">
          <div className="mb-5 flex items-center justify-between border-b-2 border-[#111827] pb-3">
            <span className="font-report-mono text-[12px] uppercase tracking-[0.08em] text-[#667085]">
              {copy.continue}
            </span>
            <Link
              href={reportHomeHref(locale)}
              className="text-[13px] font-medium text-[#1457D9]"
            >
              {copy.allReports}
            </Link>
          </div>
          <div className="grid md:grid-cols-3">
            {related.map((candidate) => (
              <Link
                key={candidate.slug}
                lang={candidate.language ?? "en"}
                href={reportHref(candidate.slug, locale)}
                className="group border-b border-[#D8DDE5] py-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
              >
                <span className="flex flex-wrap gap-x-3 font-report-mono text-[12px] uppercase tracking-[0.06em]">
                  <span className="normal-case tracking-[0.02em] text-[#1457D9]">
                    {candidate.shortTitle}
                  </span>
                  <span className="text-[#667085]">{candidate.status}</span>
                </span>
                <h3
                  className={`mt-3 font-semibold ${
                    locale === "ko"
                      ? "font-sans text-[1.15rem] leading-[1.35] tracking-[-0.03em] [word-break:keep-all]"
                      : "text-balance font-report-display text-[1.25rem] leading-[1.25] tracking-[-0.015em]"
                  }`}
                >
                  {candidate.title}
                </h3>
                <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-[#1457D9]">
                  {copy.readReport}{" "}
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
    </ReportShell>
  );
}
