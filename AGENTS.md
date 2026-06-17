<!-- BEGIN:nextjs-agent-rules -->
# 이 저장소의 Next.js는 익숙한 Next.js와 다를 수 있음

이 버전에는 breaking change가 있다. API, 관례, 파일 구조가 학습 데이터와 다를 수 있으므로 코드를 작성하기 전에 `node_modules/next/dist/docs/`의 관련 가이드를 먼저 읽고, deprecation 안내를 따른다.
<!-- END:nextjs-agent-rules -->

# 저장소 작업 핵심

- 스택: Next.js 16.2.9 App Router, React 19, Tailwind CSS 4, TypeScript, Vitest. 검증은 `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build`를 사용한다.
- 제품 목표: SOJOURN KOREA를 영어 전용 이주 서비스 마케팅 사이트로 리뉴얼한다. `/`는 relocation, `/tour`는 private tour용이다.
- 기준 문서: 스펙은 `docs/superpowers/specs/2026-06-16-sojourn-korea-landing-design.md`, 구현 계획은 `docs/superpowers/plans/2026-06-16-sojourn-korea-landing.md`를 따른다. UI 작업은 `docs/UI_GUIDE.md`의 디자인 제약(색 토큰, 금지 패턴, 컴포넌트 규격)을 반드시 지킨다.
- 작업 방식: 계획 문서의 작은 태스크 단위로 진행한다. 지정된 파일을 구현하고, 태스크가 요구할 때만 페이지에 마운트하고, 검증한 뒤 명시 요청 또는 계획의 커밋 단계가 있을 때만 커밋한다.
- 수정 범위: 요청과 직접 관련된 부분만 바꾼다. 요청하지 않은 기능, 광범위한 리팩터링, 추측성 추상화는 넣지 않는다. 이미 있는 사용자 변경은 보존한다.
- 병렬 워크플로: `.codex/`, `phases/`, `scripts/execute.py`는 별도 Codex 하네스가 관리한다 — 실행·수정하지 않는다. `docs/{PRD,ARCHITECTURE,UI_GUIDE,ADR}.md`도 그 산출물이니 참고만 하고 임의로 고치지 않는다.
- 재사용 우선: 새 데이터나 자산을 만들기 전에 `lib/content/*`, `components/ui/*`, `public/images`, `public/hero`를 먼저 재사용한다.
- 디자인 방향: 일반 SaaS 랜딩이 아니라 한국/부산 맥락이 드러나는 신뢰감 있는 서비스 사이트로 만든다. 장식용 그래픽만 쓰지 않고, 반응형에서 텍스트와 레이아웃이 겹치지 않게 한다.
- React 19 함정: effect 본문에서 동기 `setState` 금지(lint 에러). 상태 변경은 `requestAnimationFrame`이나 옵저버/이벤트 콜백으로 미룬다.
- 시각 QA 함정: 모든 `Section`은 스크롤 진입 시 `Reveal`로 페이드인하고 이미지는 lazy-load라, Playwright `fullPage` 캡처에 하단 섹션·이미지가 비어 나온다. QA 시 `*{transition:none} .opacity-0{opacity:1} .translate-y-4{transform:none}` 주입 또는 컴파일 후 재캡처한다.
