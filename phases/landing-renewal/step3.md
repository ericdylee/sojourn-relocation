# Step 3: tour-page

## 읽어야 할 파일

- `/AGENTS.md`
- `/docs/PRD.md`
- `/docs/ARCHITECTURE.md`
- `/docs/UI_GUIDE.md`
- `/node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
- `/node_modules/next/dist/docs/01-app/01-getting-started/12-images.md`
- `/lib/content/tour.ts`
- `/components/ui/Button.tsx`
- `/components/ui/Section.tsx`
- `/public/images/CREDITS.md`

## 작업

1. `app/tour/page.tsx`를 생성한다.
2. 필요한 경우 tour 전용 섹션을 아래 경로에 생성한다.
   - `components/sections/tour/TourHero.tsx`
   - `components/sections/tour/WhyTour.tsx`
   - `components/sections/tour/CourseGrid.tsx`
   - `components/sections/tour/Gallery.tsx`
3. 페이지 구성은 아래를 포함한다.
   - Hero: "Discover Busan & Seoul, privately."
   - Why private tour: 영어 가이드, 맞춤 일정, 가족/바이어/크루즈 승객, half/full day.
   - Busan courses: `busanCourses`
   - Seoul courses: `seoulCourses`
   - Cruise / half-day / full-day 안내
   - Gallery with self-hosted images
   - CTA to `/#contact`
4. course data는 `lib/content/tour.ts`를 사용하고 새 데이터를 중복 생성하지 않는다.

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

- `http://localhost:3000/tour`가 200으로 로드된다.
- 부산 3개 코스와 서울 3개 코스가 모두 표시된다.
- 모든 이미지에 구체적인 alt 텍스트가 있다.

## 검증 절차

1. AC 커맨드와 브라우저 확인을 실행한다.
2. `/phases/landing-renewal/index.json`의 step 3을 업데이트한다.

## 금지사항

- 예약/결제 기능을 만들지 마라. 이유: MVP 범위 밖이다.
- 외부 이미지 URL을 직접 사용하지 마라. 이유: 성능과 안정성을 위해 자체 호스팅 이미지를 사용한다.
- Header/Footer를 수정하지 마라. 이유: 현재 nav는 `/tour`를 이미 포함한다.
