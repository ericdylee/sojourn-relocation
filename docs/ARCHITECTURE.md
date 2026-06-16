# 아키텍처

## 디렉토리 구조
```text
app/
├── layout.tsx              # 공통 metadata, font, Header/Footer shell
├── page.tsx                # relocation landing composition
├── tour/page.tsx           # private tour page composition
├── api/contact/route.ts    # consultation form POST handler
├── sitemap.ts              # sitemap
└── robots.ts               # robots
components/
├── hero/                   # scroll-scrub hero and frame hook
├── layout/                 # Header, Footer
├── sections/landing/       # landing page sections
├── sections/tour/          # tour page sections
├── form/                   # ConsultationForm client component
└── ui/                     # Container, Section, Button, Reveal
lib/
├── content/                # site copy, services, process, testimonials, tours
├── form/                   # schema and sendLead adapter
└── hero/                   # frame map and frame list utilities
public/
├── hero/                   # frame sequence, poster, mp4 fallback
└── images/                 # self-hosted section and tour images
scripts/
├── build-hero-frames.sh    # media pipeline
└── execute.py              # Codex harness phase executor
phases/
└── landing-renewal/        # executable harness plan
```

## 패턴
- Next.js 16 App Router를 사용한다. 코드를 작성하기 전 관련 문서는 `node_modules/next/dist/docs/01-app/*`에서 확인한다.
- Server Component를 기본값으로 사용한다. 브라우저 상태, 스크롤, 폼 상호작용이 필요한 컴포넌트만 `"use client"`를 선언한다.
- 페이지 파일은 얇은 composition이어야 한다. 섹션 UI는 `components/sections/*`, 카피와 구조화 데이터는 `lib/content/*`에 둔다.
- 폼 처리는 client component -> route handler -> email adapter 순서로 흐른다. 외부 전송 구현은 `lib/form/sendLead.ts` 안에 격리한다.
- 공통 layout primitive는 `components/ui/Container.tsx`, `Section.tsx`, `Button.tsx`를 우선 재사용한다.

## 데이터 흐름
```text
lib/content/* -> section components -> app/page.tsx, app/tour/page.tsx

사용자 폼 입력
-> components/form/ConsultationForm.tsx
-> POST /api/contact
-> lib/form/schema.ts 서버 검증 + honeypot
-> lib/form/sendLead.ts Web3Forms adapter
-> inline success/error state
```

## 상태 관리
- 서버 상태 관리 라이브러리는 도입하지 않는다.
- 정적 콘텐츠는 모듈 import로 읽는다.
- Hero scroll state는 `components/hero/useScrollFrames.ts` 내부에서 관리한다.
- 폼 상태는 `ConsultationForm`의 `useState`/`useTransition` 범위에 한정한다.

## 검증
- 모든 phase step은 최소 `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build` 중 해당 AC를 실행한다.
- 순수 로직은 Vitest로 테스트한다: hero frame mapping, content invariant, form schema, contact route.
- UI step은 typecheck/build에 더해 로컬 브라우저에서 desktop/mobile 시각 확인을 수행한다.
