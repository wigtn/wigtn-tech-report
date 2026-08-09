import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { assetPath } from "@/lib/site";
import { ReportShell } from "../technical-reports/ReportChrome";
import type { ReportLocale } from "../technical-reports/localized-data";
import { figureMaxWidth } from "../shared/figure";
import { getFeedPost, feedHref, FEED_POSTS, type FeedBlock, type FeedFigure } from "./data";

/**
 * A feed post, set to the same measure and the same type scale as a report.
 *
 * Every number in here is taken from ReportProjectPage rather than chosen:
 * the 960/820 column pair, the 17px body on 1.75, the 2.25-3.5rem headline,
 * the 12px mono labels, the figure caption gutter, the ratio-derived figure
 * caps. The two pages are a tab apart, and a reader crossing between them
 * should not feel the line length change under them.
 *
 * What is deliberately absent is what the data does not have. A report opens
 * on a venue and a named author who is answerable for a measurement; a trip
 * report opens on a tag and is the team's. The slots are the same size and in
 * the same place, and they carry what there is.
 */

function Figure({ figure }: { figure: FeedFigure }) {
  return (
    <figure className={`my-9 ${figureMaxWidth(figure)}`}>
      <Image
        src={assetPath(figure.src)}
        alt={figure.alt}
        width={figure.width}
        height={figure.height}
        sizes="(min-width: 1024px) 832px, 100vw"
        className="h-auto w-full rounded-xl"
      />
      {figure.caption && (
        <figcaption className="mt-4 grid grid-cols-[2.5rem_1fr] gap-3 font-report-mono text-[12px] leading-5 text-[#667085]">
          <span className="text-[#1457D9]">FIG.</span>
          <span>{figure.caption}</span>
        </figcaption>
      )}
    </figure>
  );
}

function Block({ block }: { block: FeedBlock }) {
  switch (block.t) {
    case "h":
      return (
        <h2 className="mt-12 font-report-display text-[clamp(1.875rem,2.9vw,2.5rem)] font-semibold leading-[1.18] tracking-[-0.018em] text-[#101828]">
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote className="my-9 border-l-2 border-[#1457D9] pl-5 text-[19px] font-medium leading-[1.7] text-[#101828]">
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <ul className="my-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1457D9]" />
              <span className="text-[17px] leading-[1.7] text-[#475467]">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "image":
      return <Figure figure={block.figure} />;
    case "gallery": {
      /* A gallery of one is a figure; only a real set gets columns, and the
         per-image ratio cap is what keeps a portrait from filling the column. */
      if (block.images.length === 1) return <Figure figure={block.images[0]} />;
      const cols = block.images.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
      return (
        <div className="my-9">
          <div className={`grid gap-4 ${cols}`}>
            {block.images.map((im, i) => (
              <figure key={i}>
                <Image
                  src={assetPath(im.src)}
                  alt={im.alt}
                  width={im.width}
                  height={im.height}
                  sizes="(min-width: 1024px) 270px, 100vw"
                  className="h-auto w-full rounded-xl"
                />
                {im.caption && (
                  <figcaption className="mt-3 font-report-mono text-[12px] leading-5 text-[#667085]">
                    {im.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
          {block.caption && (
            <p className="mt-4 grid grid-cols-[2.5rem_1fr] gap-3 font-report-mono text-[12px] leading-5 text-[#667085]">
              <span className="text-[#1457D9]">FIG.</span>
              <span>{block.caption}</span>
            </p>
          )}
        </div>
      );
    }
    default:
      return <p className="mt-4 text-[17px] leading-[1.75] text-[#475467]">{block.text}</p>;
  }
}

export function FeedPostPage({
  slug,
  locale = "en",
}: {
  slug: string;
  locale?: ReportLocale;
}) {
  const post = getFeedPost(slug);

  if (!post) {
    return (
      <ReportShell locale={locale}>
        <div className="mx-auto w-full max-w-[960px] px-6 py-32 text-center md:px-8">
          <h1 className="font-report-display text-3xl font-semibold">Post not found</h1>
          <Link href="/feed/" className="mt-6 inline-flex items-center gap-2 text-[#1457D9]">
            <ArrowLeft size={16} /> Back to the feed
          </Link>
        </div>
      </ReportShell>
    );
  }

  const more = FEED_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <ReportShell locale={locale} slug={slug}>
      <div className="mx-auto w-full max-w-[960px] px-6 pb-10 pt-10 md:px-8 md:pb-12 md:pt-14">
        <div className="mx-auto max-w-[820px]">
          <Link
            href="/feed/"
            className="inline-flex items-center gap-2 font-report-mono text-[12px] uppercase tracking-[0.09em] text-[#667085] transition-colors hover:text-[#1457D9]"
          >
            <ArrowLeft aria-hidden size={12} /> Feed
          </Link>

          <div className="mt-8">
            {/* The report's slot here is the venue. A trip report has no venue
                to cite, so it carries the tag, in the same size and colour. */}
            <div className="font-report-mono text-[12px] uppercase tracking-[0.08em] text-[#667085]">
              {post.tag}
            </div>
            <h1 className="mt-5 text-balance font-report-display text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.022em]">
              {post.title}
            </h1>
            <p className="mt-5 text-[17px] leading-[1.75] text-[#475467]">{post.dek}</p>

            {/* ReportByline's shape without the portrait: a report names a
                person who is answerable for a measurement, and this is the
                team's. Same two lines, same sizes, same place. */}
            <div className="mt-7">
              <div className="text-[17px] font-semibold leading-6 text-[#1457D9]">
                {post.byline}
              </div>
              <div className="mt-0.5 text-[15px] leading-6 text-[#667085]">
                <time>{post.date}</time>
                {post.place && (
                  <>
                    <span aria-hidden className="mx-2 text-[#98A2B3]">
                      ·
                    </span>
                    {post.place}
                  </>
                )}
                <span aria-hidden className="mx-2 text-[#98A2B3]">
                  ·
                </span>
                {post.readTime}
              </div>
            </div>

            {post.links && post.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {post.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#D0D5DD] px-4 py-2 text-[14px] font-medium text-[#344054] transition-colors hover:border-[#101828] hover:text-[#101828]"
                  >
                    {link.label} <ArrowUpRight aria-hidden size={14} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cover, in its own band at the same width the report's hero uses. */}
      <div className="mx-auto w-full max-w-[960px] px-6 pb-10 md:px-8 md:pb-12">
        <div className="mx-auto max-w-[820px]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#F2F4F7]">
            <Image
              src={assetPath(post.cover.src)}
              alt={post.cover.alt}
              fill
              priority
              sizes="(min-width: 900px) 820px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div lang={locale} className="mx-auto w-full max-w-[960px] px-6 pb-12 md:px-8 md:pb-16">
        <article className="border-t border-[#D8DDE5]">
          <div className="mx-auto max-w-[820px] py-9 md:py-12">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </article>
      </div>

      {more.length > 0 && (
        <section className="mx-auto max-w-[1180px] px-5 py-12 md:px-8 md:py-16">
          <h2 className="font-report-mono text-[12px] uppercase tracking-[0.08em] text-[#667085]">
            More from the feed
          </h2>
          <ul className="mt-6 divide-y divide-[#E4E7EC] border-t border-[#E4E7EC]">
            {more.map((p) => (
              <li key={p.slug}>
                <Link href={feedHref(p.slug)} className="group flex items-baseline gap-6 py-5">
                  <span className="shrink-0 font-report-mono text-[12px] uppercase tracking-[0.09em] text-[#667085] md:w-32">
                    {p.date}
                  </span>
                  <span className="font-report-display text-[18px] font-semibold leading-snug text-[#101828] transition-colors group-hover:text-[#1457D9]">
                    {p.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </ReportShell>
  );
}
