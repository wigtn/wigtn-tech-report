/**
 * Feed posts: the narrative half of this site.
 *
 * A technical report and a conference trip report are both writing, but they
 * are not the same kind of writing, and `ResearchProject` is shaped for the
 * first: it requires `metrics`, `sections` and `limitations`, and its author is
 * one person who is answerable for a claim. A hackathon report has no metrics
 * to table and no limitations to qualify, and the thing it is answerable for is
 * "we were there and this is what happened".
 *
 * Forcing those posts into the report type would have meant either inventing
 * empty metrics or loosening the report type until it stopped catching the
 * omissions it was built to catch. So this is a second type, deliberately
 * looser, and the hub carries a tab for each.
 *
 * Moved here from wigtn-webpage, where they were the "Stories" half of
 * /news. That page keeps the release notes; long-form moved to sit next to the
 * reports, because a reader who wants the ACL trip report is the same reader
 * who wants the WIGVO report.
 *
 * Two differences from the source repo, both deliberate:
 *
 *   1. Images are `/images/feed/<slug>/<file>` strings resolved through
 *      `assetPath`, not colocated static imports. This site runs under a
 *      GitHub Pages `basePath`, and every existing figure already goes through
 *      that helper; one asset convention beats two.
 *   2. `authorId` is optional here and absent on all four posts. Reports name
 *      a person because someone must answer for the measurements. A trip
 *      report is the team's, and `byline` carries that instead.
 */

import type { ReportAuthorId } from "../technical-reports/authors";

export type FeedFigure = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  /* Display ratio for the frame. The intrinsic size above is what the browser
   * reserves to avoid layout shift; this is how the picture is cropped into
   * the column. Portrait sources ("3/4") are capped narrower when they run
   * alone, so a phone photo does not become a full-width wall. */
  aspect?: "16/9" | "3/4" | "1/1";
};

export type FeedBlock =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "quote"; text: string }
  | { t: "list"; items: string[] }
  | { t: "image"; figure: FeedFigure }
  | { t: "gallery"; images: FeedFigure[]; caption?: string };

export type FeedLink = { label: string; href: string };

export type FeedPost = {
  slug: string;
  /* Short label above the title: "ACL 2026", "TOP 6". Editorial, not a
   * taxonomy; nothing filters on it. */
  tag: string;
  title: string;
  /* One or two sentences under the title. Doubles as the card summary and the
   * meta description, so it has to stand alone away from the page. */
  dek: string;
  date: string;
  place?: string;
  readTime: string;
  /* Who gets the byline. Team by default, which is the honest credit for a
   * trip report: `authorId` exists for the case where one person is
   * answerable, and is unused today. */
  byline: string;
  authorId?: ReportAuthorId;
  cover: FeedFigure;
  links?: FeedLink[];
  body: FeedBlock[];
};

import { aclSanDiego2026 } from "./posts/acl-2026-san-diego";
import { snowflakeKorea2026 } from "./posts/snowflake-korea-2026";
import { traeSeoulGrandPrize } from "./posts/trae-seoul-grand-prize";
import { obaWeekendthonTop6 } from "./posts/oba-weekendthon-top6";

/* Newest first. Sorted here rather than at render so the order is a property
 * of the data and every consumer agrees. */
export const FEED_POSTS: FeedPost[] = [
  aclSanDiego2026,
  obaWeekendthonTop6,
  snowflakeKorea2026,
  traeSeoulGrandPrize,
].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export const feedHref = (slug: string) => `/feed/${slug}/`;

export const getFeedPost = (slug: string) =>
  FEED_POSTS.find((post) => post.slug === slug);
