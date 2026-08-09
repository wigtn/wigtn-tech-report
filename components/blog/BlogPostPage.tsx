import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { assetPath } from "@/lib/site";
import { ReportShell } from "../technical-reports/ReportChrome";
import type { ReportLocale } from "../technical-reports/localized-data";
import { getBlogPost, blogHref, BLOG_POSTS, type BlogBlock, type BlogFigure } from "./data";

/* A lone portrait photo at full column width becomes a wall. Capping it keeps
 * a phone snapshot the size it was taken at; the source page arrived at the
 * same number, so the caption copy still describes what you can make out. */
const SOLO_PORTRAIT_MAX = 460;

function Figure({ figure, solo }: { figure: BlogFigure; solo: boolean }) {
  const portrait = figure.aspect === "3/4";
  return (
    <figure
      className={solo && portrait ? "mx-auto" : undefined}
      style={solo && portrait ? { maxWidth: SOLO_PORTRAIT_MAX } : undefined}
    >
      <div
        className="relative overflow-hidden rounded-xl bg-[#F2F4F7]"
        style={{ aspectRatio: figure.aspect?.replace("/", " / ") ?? "16 / 9" }}
      >
        <Image
          src={assetPath(figure.src)}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      {figure.caption && (
        <figcaption className="mt-3 text-[14px] leading-[1.6] text-[#667085]">
          {figure.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.t) {
    case "h":
      return (
        <h2 className="mt-14 font-report-display text-[26px] font-semibold leading-tight tracking-[-0.015em] text-[#101828] md:text-[30px]">
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-[#1457D9] pl-5 text-[20px] font-medium leading-snug text-[#101828]">
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <ul className="my-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[17px] leading-[1.75] text-[#344054]">
              <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1457D9]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "image":
      return (
        <div className="my-10">
          <Figure figure={block.figure} solo />
        </div>
      );
    case "gallery": {
      const cols =
        block.images.length >= 3 ? "sm:grid-cols-3" : block.images.length === 2 ? "sm:grid-cols-2" : "";
      return (
        <div className="my-10">
          <div className={`grid gap-4 ${cols}`}>
            {block.images.map((im, i) => (
              <Figure key={i} figure={im} solo={block.images.length === 1} />
            ))}
          </div>
          {block.caption && (
            <p className="mt-3 text-[14px] leading-[1.6] text-[#667085]">{block.caption}</p>
          )}
        </div>
      );
    }
    default:
      return <p className="my-5 text-[17px] leading-[1.8] text-[#344054]">{block.text}</p>;
  }
}

export function BlogPostPage({
  slug,
  locale = "en",
}: {
  slug: string;
  locale?: ReportLocale;
}) {
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <ReportShell locale={locale}>
        <div className="mx-auto max-w-[720px] px-5 py-32 text-center md:px-8">
          <h1 className="font-report-display text-3xl font-semibold">Post not found</h1>
          <Link href="/blog/" className="mt-6 inline-flex items-center gap-2 text-[#1457D9]">
            <ArrowLeft size={16} /> Back to the blog
          </Link>
        </div>
      </ReportShell>
    );
  }

  const more = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <ReportShell locale={locale} slug={slug}>
      <article className="mx-auto max-w-[720px] px-5 pb-8 pt-16 md:px-8 md:pt-24">
        <Link
          href="/blog/"
          className="inline-flex items-center gap-1.5 font-report-mono text-[12px] uppercase tracking-[0.1em] text-[#667085] transition-colors hover:text-[#101828]"
        >
          <ArrowLeft aria-hidden size={13} /> Blog
        </Link>

        <p className="mt-8 font-report-mono text-[12px] uppercase tracking-[0.12em] text-[#1457D9]">
          {post.tag}
        </p>
        <h1 className="mt-3 font-report-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-[#101828]">
          {post.title}
        </h1>
        <p className="mt-5 text-[19px] leading-[1.7] text-[#475467]">{post.dek}</p>

        <p className="mt-6 font-report-mono text-[12px] uppercase tracking-[0.1em] text-[#667085]">
          {post.byline} · {post.date}
          {post.place ? ` · ${post.place}` : ""} · {post.readTime}
        </p>

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

        <div className="mt-10">
          <Figure figure={post.cover} solo={false} />
        </div>

        <div className="mt-4">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </article>

      {more.length > 0 && (
        <section className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-20">
          <h2 className="font-report-mono text-[12px] uppercase tracking-[0.12em] text-[#667085]">
            More from the blog
          </h2>
          <ul className="mt-6 divide-y divide-[#E4E7EC] border-t border-[#E4E7EC]">
            {more.map((p) => (
              <li key={p.slug}>
                <Link href={blogHref(p.slug)} className="group flex items-baseline gap-6 py-5">
                  <span className="shrink-0 font-report-mono text-[12px] uppercase tracking-[0.1em] text-[#667085] md:w-32">
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
