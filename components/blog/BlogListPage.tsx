import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { assetPath } from "@/lib/site";
import { ReportShell } from "../technical-reports/ReportChrome";
import type { ReportLocale } from "../technical-reports/localized-data";
import { SectionTabs } from "./SectionTabs";
import { BLOG_POSTS, blogHref } from "./data";

/**
 * Blog index: the newest post as a lead, the rest as a plain list.
 *
 * Four posts do not need a grid. A three-up card wall would have set a trip
 * report that runs eleven minutes at the same weight as one that runs five,
 * which is the mistake the source page had already been corrected for. So the
 * newest gets the picture and the rest get a dated row, and the hierarchy
 * matches the reading time.
 */
export function BlogListPage({ locale = "en" }: { locale?: ReportLocale }) {
  const [lead, ...rest] = BLOG_POSTS;

  return (
    <ReportShell locale={locale}>
      <header className="border-b border-[#E4E7EC]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 text-center md:px-8 md:py-24">
          <p className="font-report-mono text-[20px] font-medium uppercase tracking-[0.12em] text-[#1457D9]">
            WIGTN Tech
          </p>
          <h1 className="mt-4 font-report-display text-[clamp(2.75rem,5vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
            Blog
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[17px] leading-[1.7] text-[#475467]">
            Conferences, hackathons and the weekends in between. What we went
            to, what we built there, and what the room taught us.
          </p>
        </div>
      </header>

      <SectionTabs active="blog" />

      <div className="mx-auto max-w-[1180px] px-5 py-16 md:px-8 md:py-20">
        {lead && (
          <Link
            href={blogHref(lead.slug)}
            className="group grid items-center gap-8 md:grid-cols-2 md:gap-12"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#F2F4F7]">
              <Image
                src={assetPath(lead.cover.src)}
                alt={lead.cover.alt}
                width={lead.cover.width}
                height={lead.cover.height}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                priority
              />
            </div>
            <div>
              <p className="font-report-mono text-[12px] uppercase tracking-[0.12em] text-[#1457D9]">
                {lead.tag}
              </p>
              <h2 className="mt-3 font-report-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#101828] transition-colors group-hover:text-[#1457D9]">
                {lead.title}
              </h2>
              <p className="mt-4 text-[16px] leading-[1.7] text-[#475467]">{lead.dek}</p>
              <p className="mt-5 font-report-mono text-[12px] uppercase tracking-[0.1em] text-[#667085]">
                {lead.date}
                {lead.place ? ` · ${lead.place}` : ""} · {lead.readTime}
              </p>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <ul className="mt-16 divide-y divide-[#E4E7EC] border-t border-[#E4E7EC]">
            {rest.map((post) => (
              <li key={post.slug}>
                <Link
                  href={blogHref(post.slug)}
                  className="group flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:gap-8"
                >
                  <span className="shrink-0 font-report-mono text-[12px] uppercase tracking-[0.1em] text-[#667085] md:w-32">
                    {post.date}
                  </span>
                  <span className="flex-1">
                    <span className="block font-report-display text-[20px] font-semibold leading-snug tracking-[-0.01em] text-[#101828] transition-colors group-hover:text-[#1457D9]">
                      {post.title}
                    </span>
                    <span className="mt-1 block text-[15px] leading-[1.65] text-[#475467]">
                      {post.dek}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    size={16}
                    className="mt-1 shrink-0 text-[#98A2B3] transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ReportShell>
  );
}
