# Step 2: landing-assembly

## 읽어야 할 파일

- `/AGENTS.md`
- `/docs/PRD.md`
- `/docs/ARCHITECTURE.md`
- `/docs/UI_GUIDE.md`
- `/node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
- `/app/page.tsx`
- `/components/hero/Hero.tsx`
- `/components/sections/landing/TrustStrip.tsx`
- `/components/sections/landing/Services.tsx`
- `/components/sections/landing/WhySojourn.tsx`
- `/components/sections/landing/Process.tsx`
- `/components/sections/landing/Testimonials.tsx`
- `/components/sections/landing/TourTeaser.tsx`

## 작업

1. `app/page.tsx`를 landing composition으로 수정한다.
2. 섹션 순서는 아래와 같이 유지한다.
   - `Hero`
   - `TrustStrip`
   - `Services`
   - `WhySojourn`
   - `Process`
   - `Testimonials`
   - `TourTeaser`
3. 상담 폼은 아직 마운트하지 않는다. Step 5에서 `#contact`를 추가한다.
4. import 경로는 `@/components/...` alias를 사용한다.

## Acceptance Criteria

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

브라우저 확인:

```bash
npm run dev
```

- `http://localhost:3000`에서 모든 섹션이 순서대로 보인다.
- mobile width에서 텍스트 겹침이 없다.
- Header의 `Services`, `Process`, `Private Tour` 링크가 유효하다.

## 검증 절차

1. AC 커맨드를 모두 실행한다.
2. 로컬 브라우저에서 desktop/mobile 화면을 확인한다.
3. `/phases/landing-renewal/index.json`의 step 2를 업데이트한다.

## 금지사항

- 상담 폼 placeholder를 넣지 마라. 이유: Step 5에서 실제 폼을 구현한다.
- Hero 구현을 수정하지 마라. 이유: 이미 별도 task로 검증된 핵심 모션이다.
- layout shell인 `app/layout.tsx`를 수정하지 마라. 이유: 이 step은 landing composition만 다룬다.
