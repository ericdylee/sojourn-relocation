# Step 1: testimonials-tour-teaser

## 읽어야 할 파일

- `/AGENTS.md`
- `/docs/PRD.md`
- `/docs/ARCHITECTURE.md`
- `/docs/UI_GUIDE.md`
- `/components/sections/landing/Services.tsx`
- `/components/sections/landing/TrustStrip.tsx`
- `/components/ui/Button.tsx`
- `/components/ui/Section.tsx`
- `/lib/content/testimonials.ts`
- `/lib/content/tour.ts`
- `/public/images/CREDITS.md`

## 작업

1. `components/sections/landing/Testimonials.tsx`를 생성한다.
   - `testimonials` from `@/lib/content/testimonials`를 사용한다.
   - KHNP 프로젝트 신뢰 문구를 섹션 상단에 둔다.
   - 5개 실명 후기를 카드/grid로 렌더링한다.
   - quote, author, role, year가 모두 보이게 한다.
2. `components/sections/landing/TourTeaser.tsx`를 생성한다.
   - 부산/서울 private tour preview로 구성한다.
   - `busanCourses`와 `seoulCourses` from `@/lib/content/tour`를 사용한다.
   - 이미지 후보는 `/images/gamcheon.jpg`, `/images/haeundae.jpg`, `/images/gyeongbokgung.jpg`를 우선 사용한다.
   - CTA는 `/tour`로 연결한다.
3. 이 step에서는 `app/page.tsx`와 `app/tour/page.tsx`를 수정하지 않는다.

## Acceptance Criteria

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

## 검증 절차

1. 위 AC 커맨드를 모두 실행한다.
2. `Testimonials.tsx`가 5개 후기를 모두 렌더링하는지 코드로 확인한다.
3. `TourTeaser.tsx`의 모든 이미지에 구체적인 alt 텍스트가 있는지 확인한다.
4. `/phases/landing-renewal/index.json`의 step 1을 업데이트한다.

## 금지사항

- 후기 문구를 새로 창작하지 마라. 이유: 승인된 KHNP 추천서 기반 콘텐츠만 사용해야 한다.
- `/tour` 페이지를 만들지 마라. 이유: Step 3의 책임이다.
- 외부 이미지를 핫링크하지 마라. 이유: 이미 `public/images`에 자체 호스팅 이미지가 있다.
