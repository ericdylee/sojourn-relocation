<!-- BEGIN:nextjs-agent-rules -->
# 이 저장소의 Next.js는 익숙한 Next.js와 다를 수 있음

이 버전에는 breaking change가 있다. API, 관례, 파일 구조가 학습 데이터와 다를 수 있으므로 코드를 작성하기 전에 `node_modules/next/dist/docs/`의 관련 가이드를 먼저 읽고, deprecation 안내를 따른다.
<!-- END:nextjs-agent-rules -->

# 저장소 작업 핵심

- 스택: Next.js 16.2.9 App Router, React 19, Tailwind CSS 4, TypeScript, Vitest. 검증은 `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build`를 사용한다.
- 제품 목표: SOJOURN KOREA를 영어 전용 이주 서비스 마케팅 사이트로 리뉴얼한다. `/`는 relocation, `/tour`는 private tour용이다.
- 기준 문서: 스펙은 `docs/superpowers/specs/2026-06-16-sojourn-korea-landing-design.md`, 구현 계획은 `docs/superpowers/plans/2026-06-16-sojourn-korea-landing.md`를 따른다.
- 작업 방식: 계획 문서의 작은 태스크 단위로 진행한다. 지정된 파일을 구현하고, 태스크가 요구할 때만 페이지에 마운트하고, 검증한 뒤 명시 요청 또는 계획의 커밋 단계가 있을 때만 커밋한다.
- 수정 범위: 요청과 직접 관련된 부분만 바꾼다. 요청하지 않은 기능, 광범위한 리팩터링, 추측성 추상화는 넣지 않는다. 이미 있는 사용자 변경은 보존한다.
- 재사용 우선: 새 데이터나 자산을 만들기 전에 `lib/content/*`, `components/ui/*`, `public/images`, `public/hero`를 먼저 재사용한다.
- 디자인 방향: 일반 SaaS 랜딩이 아니라 한국/부산 맥락이 드러나는 신뢰감 있는 서비스 사이트로 만든다. 장식용 그래픽만 쓰지 않고, 반응형에서 텍스트와 레이아웃이 겹치지 않게 한다.
