/* authors.ts의 직함이 wigtn-webpage 크루 로스터와 일치하는지 확인한다.
 *
 * authors.ts는 로스터를 import하지 않고 복사한다. 두 사이트가 각각 독립적인
 * static export라, import하면 상대 사이트가 움직일 때 바이라인이 깨지기
 * 때문이다. 대가는 드리프트다. 실제로 로스터가 정정된 뒤(575fece) 이쪽이 옛
 * 직함을 계속 들고 있었고, 두 건 중 한 건만 사람 눈에 띄었다.
 *
 * 이 검사는 로스터를 들고 있는 개발자 머신에서만 의미가 있다. CI에는 옆
 * 레포가 체크아웃되지 않으므로 항상 건너뛴다 — 그래서 이건 CI 게이트가 아니라
 * 커밋 전 로컬 검사다. 그 사실을 숨기지 않으려고 건너뛸 때도 이유를 찍는다.
 *
 * 실행: npm run check:authors
 */
import { readFileSync, existsSync } from "node:fs";

const ROSTER = "../wigtn-webpage/mockups/research-led/data.ts";
const COPY = "components/technical-reports/authors.ts";

if (!existsSync(ROSTER)) {
  console.log(`wigtn-webpage 없음 — 작성자 로스터 대조 건너뜀 (${ROSTER})`);
  process.exit(0);
}

/* name: "..." 마다 잘라 각 조각의 첫 role:을 집는다.
 *
 * 정규식 하나로 name에서 role까지 가로지르게 짰다가, 앞 엔트리의 매치가 다음
 * 사람의 role을 삼켜 없는 드리프트를 보고하고 사람을 통째로 빠뜨렸다. 조각내는
 * 쪽이 짧고 틀릴 구석이 없다. */
function roles(text, from, to) {
  const start = text.indexOf(from);
  if (start < 0) throw new Error(`앵커를 찾을 수 없음: ${from}`);
  const end = to ? text.indexOf(to, start) : -1;
  const body = text.slice(start, end < 0 ? text.length : end);

  const out = new Map();
  for (const chunk of body.split(/name:\s*"/).slice(1)) {
    const name = chunk.slice(0, chunk.indexOf('"'));
    const m = chunk.match(/\n\s*role:\s*"([^"]+)"/);
    if (m) out.set(name, m[1]);
  }
  return out;
}

const roster = roles(
  readFileSync(ROSTER, "utf8"),
  "export const TEAM: TeamMember[]",
  "export const MILESTONES",
);
const copied = roles(readFileSync(COPY, "utf8"), "export const REPORT_AUTHORS");

if (copied.size === 0) throw new Error(`${COPY}에서 작성자를 하나도 읽지 못했다`);

let bad = 0;
for (const [name, role] of copied) {
  const truth = roster.get(name);
  if (truth === undefined) {
    console.error(`${name}: 로스터에 없음`);
    bad++;
  } else if (truth !== role) {
    console.error(`${name}: roster="${truth}"  authors.ts="${role}"`);
    bad++;
  }
}

if (bad) {
  console.error("");
  console.error("authors.ts는 로스터의 복사본이다. 원본이 바뀌면 여기도 바꿔야 한다.");
  console.error(`원본: ${ROSTER}`);
  process.exit(1);
}

console.log(`작성자 ${copied.size}명 직함이 wigtn-webpage 로스터와 일치`);
