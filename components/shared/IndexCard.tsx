import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { assetPath } from "@/lib/site";

/**
 * The card both indexes use.
 *
 * Extracted from ReportHubPage rather than copied into the feed. The two lists
 * are meant to look like one site, and a duplicated card is a promise to keep
 * two files in sync by hand, which is a promise nobody keeps. Everything that
 * made the report card work is preserved here and the notes travel with it.
 */

export type IndexCardItem = {
  href: string;
  title: string;
  date: string;
  image?: { src: string; alt: string; contain?: boolean };
  /* Shown in the frame when there is no image. Reports use it for a metric
   * tile; the feed has a cover on every post and never passes one. */
  fallback?: ReactNode;
  lang?: string;
};

export function IndexCard({
  item,
  index,
  locale = "en",
}: {
  item: IndexCardItem;
  index: number;
  locale?: "en" | "ko";
}) {
  return (
    <article lang={item.lang ?? "en"} className="group h-full">
      {/* Column + mt-auto footer: titles run two or three lines and vary per
          item, so the date/arrow row has to be pinned or the cards in a grid
          row stop lining up along the bottom. */}
      <Link
        href={item.href}
        className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1457D9]"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#F2F4F7]">
          {item.image ? (
            <Image
              src={assetPath(item.image.src)}
              alt={item.image.alt}
              fill
              priority={index < 3}
              sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
              className={`transition-transform duration-300 group-hover:scale-[1.02] ${
                item.image.contain ? "object-contain p-5" : "object-cover"
              }`}
            />
          ) : (
            item.fallback
          )}
        </div>

        {/* Image, headline, date. The track/status/format row and the dek were
            both dropped from the report card: a grid of nine-pixel labels
            reading "Engineering note · Workflow architecture" told the reader
            nothing, and three lines of clamped dek under every card turned an
            index into a wall. The feed inherits that decision. */}
        <h3
          className={`mt-5 font-semibold transition-colors group-hover:text-[#1457D9] ${
            locale === "ko"
              ? "font-sans text-[1.5rem] leading-[1.34] tracking-[-0.03em] [word-break:keep-all] [text-wrap:balance]"
              : "text-balance font-report-display text-[1.5625rem] leading-[1.26] tracking-[-0.02em]"
          }`}
        >
          {item.title}
        </h3>

        <div className="mt-auto flex items-center justify-between gap-5 pt-5">
          <time className="font-report-mono text-[12px] text-[#667085]">{item.date}</time>
          <ArrowRight
            aria-hidden
            size={16}
            className="text-[#1457D9] transition-transform group-hover:translate-x-1"
          />
        </div>
      </Link>
    </article>
  );
}

/** The grid the cards sit in. Shared for the same reason the card is. */
export function IndexGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

/** Section heading with the item count on the right. */
export function IndexHeading({
  id,
  title,
  count,
  unit,
}: {
  id: string;
  title: string;
  count: number;
  unit: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <h2 id={id} className="font-report-display text-[1.75rem] font-semibold tracking-[-0.02em]">
        {title}
      </h2>
      <span className="font-report-mono text-[12px] text-[#667085]">
        {String(count).padStart(2, "0")} {unit}
      </span>
    </div>
  );
}
