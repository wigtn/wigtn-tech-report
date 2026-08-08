# wigtn-tech-report

WIGTN 테크 리포트 사이트. Next.js static export → GitHub Pages.

## 새 리포트를 추가할 때

**작성자를 추측하지 않는다. 반드시 물어본다.**

리포트를 추가하는 사람에게 이렇게 묻고, 그 사람이 고르게 한다:

> 작성자를 누구로 등록할까요?

커밋을 실행한 사람이 작성자라고 가정하지 않는다. 대신 실행한 사람이 답하게 한다.
후보는 `components/technical-reports/authors.ts`의 `REPORT_AUTHORS` 키다.

`ResearchProject.authorId`는 **필수**다. 빠뜨리면 `npx tsc --noEmit`이 실패한다.
"기억해서 물어보기"는 검사가 아니라서 타입으로 바꿨다 — 이 레포의 다른 강제 장치와 같은 이유다.

로스터에 없는 사람이면 `authors.ts`에 먼저 추가하되, 원본은
`wigtn-webpage`의 `mockups/research-led/data.ts` → `TEAM`이다. 거기 먼저 넣어야
두 사이트가 같은 이름·직함을 쓴다. 초상은 얼굴 중심 정사각형 320×320으로 잘라
`public/images/team/`에 넣고, **56px에서 눈으로 확인한 뒤** 커밋한다. 마크업만
보면 통과하지만 얼굴이 몇 픽셀로 뭉개지는 경우가 실제로 있었다.

`authors`(복수)는 다른 필드다. 논문의 공식 저자 목록처럼 바이라인이 담지 못하는
이름이 있을 때만 쓴다. WIGVO가 유일한 사례다 — ACL 5인 공저이므로, 리포트
작성자 한 명을 세우되 나머지 네 명을 지우지는 않는다.

## 검사

```bash
npx tsc --noEmit       # 타입 + authorId 누락 검출
npm run check:authors  # 작성자 직함이 wigtn-webpage 로스터와 일치하는지
bash .wigtn/checks.sh  # 위 둘 + EN/KO 정합 (data-ko.ts 있을 때만)
npm run build          # static export
```

`check:authors`는 `authors.ts`가 로스터의 **복사본**이라서 필요하다. 원본이
바뀌어도 자동으로 따라오지 않는다 — 실제로 로스터 정정 뒤 두 명의 직함이
어긋난 채 남아 있었고, 그중 한 명만 사람 눈에 띄었다. 옆 레포(`../wigtn-webpage`)가
없으면 건너뛰므로 CI에서는 항상 통과한다. **개발자 머신에서 도는 검사다.**

ESLint 설정이 없다. `npm run lint`는 대화형 프롬프트로 빠지므로 게이트로 쓰지 않는다.
CI(`.github/workflows/deploy-pages.yml`)는 `npm run build`만 돌린다.

## 이미지

`data.ts`의 모든 figure는 실제 픽셀 `width`/`height`를 갖는다. 추정하지 말고
`sips`로 재거나 SVG는 viewBox를 읽는다. 틀린 비율은 눈에 보이게 찌그러진다.

## 한국어

사이트는 영어 전용이다. `components/technical-reports/data-ko.ts`는 gitignore되고
`ko-translation` 브랜치(PR #4)에 보관된다. 복원 방법은 `localized-data.ts` 헤더 주석에 있다.
