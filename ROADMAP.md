# SOJOURN KOREA 리뉴얼 작업지시서

## 현재 상태

- 브랜치: `feat/landing-renewal`
- 기준 스펙: `docs/superpowers/specs/2026-06-16-sojourn-korea-landing-design.md`
- 상세 구현 계획: `docs/superpowers/plans/2026-06-16-sojourn-korea-landing.md`
- 최신 완료 커밋: `5552302 feat(landing): services grid`
- 현재 화면: `/`는 아직 `Hero`만 렌더링함
- 현재 미커밋 작업:
  - `AGENTS.md`: 저장소 작업 규칙 한글 요약 추가
  - `CLAUDE.md`: 작업 가이드라인 한글화
  - `components/sections/landing/WhySojourn.tsx`: Task 14 초안 구현

## 검증 상태

최근 확인 결과 모두 통과:

- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run build`

개발 서버:

- `npm run dev`
- Local: `http://localhost:3000`

## 큰 목표

SOJOURN KOREA 기존 사이트를 영어 전용 마케팅 사이트로 리뉴얼한다.

- `/`: relocation 중심 랜딩 페이지
- `/tour`: private tour 소개 페이지
- `#contact`: relocation/tour 공용 상담 신청 폼
- 핵심 톤: 신뢰감, 차분함, 한국/부산 맥락, 실제 서비스 중심

## 완료된 작업

- [x] 프로젝트 스펙과 구현 계획 작성
- [x] Next.js 16 App Router 프로젝트 세팅
- [x] Vitest 테스트 환경 세팅
- [x] 브랜드 컬러와 기본 전역 스타일 세팅
- [x] `lib/content/*`에 사이트/서비스/후기/투어/프로세스 데이터 정리
- [x] `Container`, `Section`, `Button` UI primitive 추가
- [x] Header, Footer, Root Layout 추가
- [x] 투명 로고 생성 및 헤더 반영
- [x] Hero 프레임 시퀀스, poster, mp4 fallback 생성
- [x] Hero scroll-scrub canvas 구현
- [x] Hero frame mapping 유틸과 테스트 추가
- [x] 섹션/투어 이미지 큐레이션
- [x] `TrustStrip` 구현 및 커밋
- [x] `Services` grid 구현 및 커밋

## 진행 중

- [ ] Task 14: `WhySojourn`
  - 파일: `components/sections/landing/WhySojourn.tsx`
  - 상태: 컴포넌트 초안 구현 완료, 검증 명령 통과
  - 남은 일: 시각 확인 후 필요 시 조정, 커밋 `feat(landing): why-sojourn`
  - 주의: 아직 `app/page.tsx`에 마운트되어 있지 않음

## 다음 작업 순서

1. `WhySojourn` 마무리
   - 현재 구현을 브라우저에서 보기 위해 임시 또는 정식으로 `app/page.tsx`에 마운트
   - 레이아웃, 모바일 줄바꿈, navy tone 대비 확인
   - 이상 없으면 커밋

2. Task 15: `Process`
   - 파일: `components/sections/landing/Process.tsx`
   - 데이터: `lib/content/process.ts`의 `processSteps`
   - 요구사항: 모바일 세로, 데스크톱 가로 타임라인

3. Task 16: `Testimonials`
   - 파일: `components/sections/landing/Testimonials.tsx`
   - 데이터: `lib/content/testimonials.ts`
   - 요구사항: KHNP 신뢰 문구를 앞세우고 5개 후기 카드 렌더링

4. Task 17: `TourTeaser`
   - 파일: `components/sections/landing/TourTeaser.tsx`
   - 이미지: `gamcheon`, `haeundae`, `gyeongbokgung`
   - CTA: `/tour`

5. Task 18: 랜딩 페이지 조립
   - 파일: `app/page.tsx`
   - 구성: `Hero`, `TrustStrip`, `Services`, `WhySojourn`, `Process`, `Testimonials`, `TourTeaser`
   - 폼은 Task 22 완료 후 `#contact`에 연결

6. Task 19: `/tour` 페이지
   - 파일: `app/tour/page.tsx`
   - 데이터: `lib/content/tour.ts`
   - Busan/Seoul private tour 코스와 상담 CTA 구성

7. Task 20-22: 상담 폼과 API
   - `lib/form/schema.ts`
   - `lib/form/sendLead.ts`
   - `app/api/contact/route.ts`
   - `components/form/ConsultationForm.tsx`
   - relocation/tour 분기, honeypot, 서버 검증, 이메일 어댑터 구현

8. Task 23-25: 마무리
   - SEO, sitemap, robots
   - reveal animation
   - 접근성, responsive, production build, 화면 캡처 점검

## 작업 규칙

- Next.js 코드를 바꾸기 전 `node_modules/next/dist/docs/`의 관련 문서를 확인한다.
- 새 데이터 추가보다 `lib/content/*` 재사용을 우선한다.
- 새 UI 패턴보다 `components/ui/*` 재사용을 우선한다.
- 페이지 마운트는 계획 문서의 태스크 흐름에 맞춰 진행한다.
- 각 태스크는 구현, 검증, 커밋 단위로 작게 끝낸다.
- 사용자가 만든 미커밋 변경은 되돌리지 않는다.

## 자주 볼 파일

- `app/page.tsx`: 랜딩 페이지 조립 지점
- `components/hero/Hero.tsx`: 현재 홈에서 보이는 Hero
- `components/sections/landing/*`: 랜딩 섹션 컴포넌트
- `components/ui/*`: 공통 UI primitive
- `lib/content/*`: 문구와 구조화 데이터
- `public/images/*`: 섹션 이미지
- `public/hero/*`: Hero media
- `.superpowers/brainstorm/69350-1781571494/content/*`: 초기 브레인스토밍 산출물
