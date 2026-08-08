/* Report bylines.
 *
 * The records come from the WIGTN crew roster in the wigtn-webpage repository,
 * `mockups/research-led/data.ts` → `TEAM`. They are copied rather than imported:
 * the two sites are separate static exports on separate deployments, so a
 * runtime dependency would mean a byline that breaks when the other site moves.
 * What is copied is narrowed to what a byline needs — name, discipline, portrait
 * — and the fields keep the roster's names so the two stay diffable by eye.
 *
 * The portraits are NOT the roster files as-is. The roster renders each person
 * large and rectangular and tunes the framing with an `imagePosition` per
 * person. That does not survive the trip to a 56px circle, because
 * `object-position` moves the crop but cannot tighten it: the roster shot of
 * one crew member is full-body, so at avatar size the face was a few pixels
 * across and nobody was recognisable. Rendering proved it; the markup looked
 * fine.
 *
 * So each portrait here is pre-cropped to a head-and-shoulders square around
 * the face and stored at 320×320. That is why there is no `imagePosition`
 * field: the crop is already the framing, every avatar carries the same visual
 * weight, and the byline needs no per-person CSS. It also cut the set from
 * 1.1MB to 80KB.
 *
 * To add a person: copy their roster entry, then crop their portrait to a
 * square centred on the face at 320×320 and check it at 56px before committing.
 * Do not invent an entry — if someone is not on the roster, add them there
 * first, so the two sites agree on how a person is named and titled.
 */
export type ReportAuthor = {
  /** Display name, verbatim from the roster: English and Korean together. */
  name: string;
  /** Discipline, not the full employment title. See AFFILIATION below. */
  role: string;
  /** Square head-and-shoulders crop in public/images/team/, 320x320. */
  image: string;
  width: number;
  height: number;
};

/* The roster carries both `role` (discipline, e.g. "AI Product Engineer") and
 * `currentRole` (full title with employer, e.g. "... , BrainCrew"). The byline
 * uses `role` plus this constant instead of `currentRole`, because this is
 * WIGTN's report site and the employer line varies per person on the roster —
 * rendering it here would put three different company names under five reports
 * published by one team. */
export const AUTHOR_AFFILIATION = "WIGTN";

export const REPORT_AUTHORS = {
  "hyeongseob-kim": {
    name: "Harrison Kim 김형섭",
    role: "AI Research Engineer",
    image: "/images/team/hyeongseob_kim.jpg",
    width: 320,
    height: 320,
  },
  "sangwoo-son": {
    name: "Diego Son 손상우",
    role: "AI Engineer",
    image: "/images/team/sangwoo_son.jpg",
    width: 320,
    height: 320,
  },
  "jinmo-kim": {
    name: "Eric Kim 김진모",
    role: "MLOps Engineer",
    image: "/images/team/jinmo_kim.jpg",
    width: 320,
    height: 320,
  },
  "hyeonsang-kim": {
    name: "Maximus Kim 김현상",
    role: "AI Product Engineer",
    image: "/images/team/hyeonsang_kim.jpeg",
    width: 320,
    height: 320,
  },
  "hyunwoo-cho": {
    name: "David Cho 조현우",
    role: "AI Product Engineer",
    image: "/images/team/hyunwoo_cho.jpg",
    width: 320,
    height: 320,
  },
} as const satisfies Record<string, ReportAuthor>;

export type ReportAuthorId = keyof typeof REPORT_AUTHORS;

export function getReportAuthor(id: ReportAuthorId): ReportAuthor {
  return REPORT_AUTHORS[id];
}
