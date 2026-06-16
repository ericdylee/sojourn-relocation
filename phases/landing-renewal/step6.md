# Step 6: seo-polish

## 읽어야 할 파일

- `/AGENTS.md`
- `/docs/PRD.md`
- `/docs/ARCHITECTURE.md`
- `/docs/UI_GUIDE.md`
- `/node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`
- `/node_modules/next/dist/docs/01-app/02-guides/production-checklist.md`
- `/app/layout.tsx`
- `/app/page.tsx`
- `/app/tour/page.tsx`
- `/public/hero/poster.jpg`

## 작업

1. SEO metadata를 점검한다.
   - root metadata는 SOJOURN KOREA relocation 중심으로 유지한다.
   - `/tour` 페이지에 tour-specific metadata를 추가한다.
   - OpenGraph image는 `/hero/poster.jpg` 또는 적합한 자체 호스팅 이미지를 사용한다.
2. `app/sitemap.ts`를 생성한다.
   - `/`
   - `/tour`
3. `app/robots.ts`를 생성한다.
   - 기본 allow.
   - sitemap URL은 production base URL이 정해지지 않았으면 상대적으로 안전한 기본값을 사용하거나 명확히 주석 없이 코드로 표현한다.
4. 필요한 경우 `components/ui/Reveal.tsx`를 추가한다.
   - IntersectionObserver 기반.
   - `prefers-reduced-motion`에서는 즉시 표시.
   - 과한 stagger나 motion은 금지.
5. 최종 responsive/accessibility 점검을 수행한다.

## Acceptance Criteria

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

브라우저 확인:

- `/`와 `/tour`가 desktop/mobile에서 텍스트 겹침 없이 보인다.
- keyboard focus가 Header nav, CTA, form fields에서 보인다.
- reduced motion 설정에서 Hero fallback이 동작한다.

## 검증 절차

1. AC 커맨드를 모두 실행한다.
2. 브라우저로 `/`와 `/tour`를 확인한다.
3. `/phases/landing-renewal/index.json`의 step 6을 업데이트한다.

## 금지사항

- Lighthouse 점수를 올리기 위해 핵심 이미지나 Hero를 제거하지 마라. 이유: 부산 맥락은 제품 요구사항이다.
- production domain을 임의로 확정하지 마라. 이유: 도메인 연결은 별도 운영 결정이다.
- 범위 밖 기능(i18n, CMS, 결제)을 추가하지 마라.
