import { ReportShell } from "../technical-reports/ReportChrome";
import type { ReportLocale } from "../technical-reports/localized-data";
import { IndexCard, IndexGrid, IndexHeading } from "../shared/IndexCard";
import { SectionTabs } from "./SectionTabs";
import { FEED_POSTS, feedHref } from "./data";

/**
 * Feed index.
 *
 * Same masthead, same tab bar, same card grid as the reports index, because
 * they are two halves of one site and a reader crossing between them should
 * not feel a seam. The card is literally the same component
 * (`shared/IndexCard`), so the two lists cannot drift apart by accident.
 *
 * The first pass had a lead post with a large image and a dated list under it.
 * That was a second layout for a page whose whole job is to sit beside another
 * one, and the hierarchy it added was not real: four posts do not need a
 * headline act.
 */
const HUB_COPY = {
  en: {
    title: "Feed",
    description:
      "Conferences, hackathons and the weekends in between. What we went to, what we built there, and what the room taught us.",
    allPosts: "All posts",
    /* "posts", not "articles". The reports index counts articles because a
     * report is one: a piece with a method and a claim. A trip report is a
     * post, and using one word for both flattened the distinction the two
     * tabs exist to draw. */
    post: "post",
    posts: "posts",
  },
  ko: {
    title: "피드",
    description:
      "학회와 해커톤, 그 사이의 주말들. 어디에 다녀왔고 거기서 무엇을 만들었는지 기록합니다.",
    allPosts: "전체 글",
    post: "편",
    posts: "편",
  },
} as const;

export function FeedListPage({ locale = "en" }: { locale?: ReportLocale }) {
  const copy = HUB_COPY[locale];

  return (
    <ReportShell locale={locale}>
      <header className="border-b border-[#E4E7EC]">
        <div className="mx-auto max-w-[1180px] px-5 py-16 text-center md:px-8 md:py-24">
          <p className="font-report-mono text-[20px] font-medium uppercase tracking-[0.12em] text-[#1457D9]">
            WIG-log
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
          <p
            className={`mx-auto mt-5 max-w-[54rem] text-pretty text-[16px] leading-7 text-[#667085] ${
              locale === "ko" ? "[word-break:keep-all]" : ""
            }`}
          >
            {copy.description}
          </p>
        </div>
      </header>

      <SectionTabs active="feed" />

      <section aria-labelledby="feed-index-title">
        <div className="mx-auto max-w-[1180px] px-5 py-14 md:px-8 md:py-20">
          <IndexHeading
            id="feed-index-title"
            title={copy.allPosts}
            count={FEED_POSTS.length}
            unit={FEED_POSTS.length === 1 ? copy.post : copy.posts}
          />

          <IndexGrid>
            {FEED_POSTS.map((post, index) => (
              <IndexCard
                key={post.slug}
                index={index}
                locale={locale}
                item={{
                  href: feedHref(post.slug),
                  title: post.title,
                  date: post.date,
                  image: { src: post.cover.src, alt: post.cover.alt },
                }}
              />
            ))}
          </IndexGrid>
        </div>
      </section>
    </ReportShell>
  );
}
