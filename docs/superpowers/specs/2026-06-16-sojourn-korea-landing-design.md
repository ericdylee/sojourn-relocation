# SOJOURN KOREA — Relocation & Private Tour 랜딩페이지 설계 스펙

- **작성일**: 2026-06-16
- **상태**: 설계 확정 대기 (사용자 리뷰)
- **목적**: 노후된 기존 사이트(sojournkorea.net, © 2014) 리뉴얼 — 외국인 주재원/기업 HR 대상 이주 상담 리드 확보 + 프라이빗 투어 홍보

---

## 1. 목표 & 타겟

- **주 목적**: 상담 신청 폼 전환(리드 확보)
- **언어**: 영어 전용 (추후 한국어 확장 여지를 위해 카피는 한 곳에 모아 관리. 단, 지금 i18n 라이브러리는 도입하지 않음 — YAGNI)
- **타겟**:
  - 개인: 외국인 주재원/임직원, 투자가, 바이어
  - 기업(B2B): 임직원을 파견하는 한국 기업 HR
- **지역**: 부산 중심 → 서울/전국 확장
- **메인 전환 행동**: 통합 상담 신청 폼 제출 → `rosh.yum@sojournkorea.net` 이메일

## 2. 정보 구조 (2개 페이지)

공통 헤더/푸터/디자인 시스템/상담 폼 공유.

- `/` — **Relocation 랜딩** (서비스 중심 구조)
- `/tour` — **Private Tour** 홍보 페이지

## 3. 기술 스택 & 아키텍처

- **Next.js (App Router, TypeScript) + Tailwind CSS**, Vercel 배포
- 구조: `app/layout.tsx`(공통 Header/Footer), `app/page.tsx`(랜딩), `app/tour/page.tsx`(투어), `components/*`, `lib/content/*`(카피·후기·코스 데이터 중앙화)
- **상담 폼 처리**: Route Handler(`app/api/contact/route.ts`) 또는 Server Action → 이메일 발송
  - **구현 기본값: Web3Forms** (`WEB3FORMS_KEY`, DNS 불필요) — 빠른 런칭. 발송 로직은 어댑터로 추상화하여 추후 **Resend**(`RESEND_API_KEY`, 도메인 인증)로 교체 용이하게.
  - 스팸 방지: 허니팟 필드 + 서버 검증(zod). 성공/실패 인라인 상태 표시.
- 이미지: `next/image`(정지컷). 히어로 프레임 시퀀스는 정적 webp로 직접 서빙.
- SEO: metadata/OpenGraph(히어로 포스터), `sitemap.ts`, `robots.ts`
- 분석: Vercel Analytics (선택, 기본 포함 가능)

## 4. 브랜드 / 비주얼 시스템

- **톤**: Trust & Calm
- **컬러**: 기존 로고 계승 — 네이비 `#0E2A4F` + 스틸블루 `#3B82F6` 계열, 화이트/뉴트럴. 투어 페이지 보조 액센트로 선셋 오렌지.
- **로고**: 보유 자산 사용 (`assets/raw/LOGO/`). `SOJOURN KOREA_logo.ai` → 투명 배경 SVG/PNG로 변환(웹 최적화). 실패 시 `SJK-logo_resize.jpg` 폴백.
- **타이포**: 영문 산세리프(Inter/Geist 계열) + 헤드라인 굵게
- **모션**: 부드러운 스크롤 리빌(IntersectionObserver, stagger) + 히어로 스크롤 스크럽. `prefers-reduced-motion` 존중.

## 5. 히어로 스크롤 스크럽 애니메이션 (핵심)

- **소스 영상**: `~/Movies/이_이미지를_바탕으로_천천히_화면이_돌아가는_동영상을.mp4`
  - 해운대 비치 & 마린시티 스카이라인 시네마틱 패닝. 1280×720, h264, 24fps, 10초, 240프레임.
- **프레임 변환 파이프라인**:
  1. `brew install webp`로 `cwebp` 설치(ffmpeg에 libwebp 미포함 확인됨)
  2. ffmpeg로 프레임 추출(PNG) → `cwebp`로 webp 인코딩(품질 ≈ 80)
  3. 출력: `public/hero/frames/frame_0001.webp …` (약 120~144 프레임)
  4. 해상도: 소스 최대치 1280×720 유지(업스케일 금지). 총 용량 목표 **≤ ~7MB**; 초과 시 프레임 수↓(≈120) 또는 가로 1100px로 다운스케일.
  5. 빌드 스크립트 `scripts/build-hero-frames.sh`로 재현 가능하게.
- **렌더링 기법(Apple식 시퀀스 스크럽)**:
  - 히어로 섹션을 `~280vh`로 핀(pin), 뷰포트 가득 `position:sticky` `<canvas>`.
  - 모든 프레임을 `Image`로 프리로드. 첫 프레임은 즉시 포스터로 표시(LQIP/정지 jpg 포스터 병행).
  - 스크롤 진행도(0→1) → 프레임 인덱스 매핑, `requestAnimationFrame`으로 canvas 드로우(끊김 방지).
  - 헤드라인/CTA 오버레이는 스크롤 진행에 따라 페이드/translate.
- **폴백(중요)**:
  - `prefers-reduced-motion` 또는 모바일/터치/소형 화면 → 핀/스크럽 비활성화, **음소거 자동재생 루프 `<video>`(mp4, 4.6MB) 배경** 또는 정지 포스터. 원본 mp4는 `public/hero/`에 동봉.
- **수용 기준**: 데스크톱에서 스크롤에 따라 부드럽게 스크럽, 모바일/모션최소화에서 우아한 폴백, 첫 화면 즉시 포스터 표시(빈 화면 없음).

## 6. 랜딩 페이지(`/`) 섹션 명세

1. **Hero** — 스크롤 스크럽(§5). 카피: "Your move to Korea, handled." / 서브: "Visa, housing, and settling-in — managed end to end, 1:1, by people who live here." / CTA: "Request a consultation"
2. **Trust strip** — KHNP(텍스트 레퍼런스) · KITA(한국무역협회) 회원 · "Since 2011" · ★★★★★ 후기. (제3자 로고는 상표 이슈로 미사용, 텍스트로 표기)
3. **Services 그리드(6)**:
   - Korea Visa & Immigration — 전 비자유형, 서류 준비/제출/인터뷰, 이민청 동행, ARC, 체류 연장, 자격/주소 변경 신고
   - Settling-in & Documentation — 지문등록 동행, 운전면허, 차량 구매/리스/렌트·등록, 휴대폰 개통, 은행 계좌, 외투기업 등록, 가사도우미 비자
   - Home Finding — 선호 기반 주거 탐색, 가족/개인 맞춤
   - Tenancy Management — 공과금 관리, 주택 점검, 수리/유지보수, 임대 협상, 재계약
   - Transportation & Escort — 공항/쇼핑/학교/병원/반려동물 에스코트, 렌터카 장기리스, 대형차 운송
   - Private Tour — `/tour` 연결
4. **Why Sojourn** — 1:1 매니징 · 현지 베스트 파트너 네트워크 · "truly honest service, listening to every need" · 원스톱
5. **Process 타임라인** — Before arrival → Airport & first night → Visa & paperwork → Home & settle-in → Ongoing care (Miles Bradley 후기 여정 기반)
6. **Testimonials** — 실명 후기 5건(§10)
7. **Private Tour 티저** — 부산/서울 코스 미리보기 → `/tour`
8. **상담 폼 + 푸터** — 폼(§8) + 연락처/해운대 오피스 지도/LinkedIn/WhatsApp

## 7. 투어 페이지(`/tour`) 섹션 명세

1. **Hero** — "Discover Busan & Seoul, privately." (부산 명소 비주얼)
2. **Why a private tour** — 영어 가이드(부산1·서울1) · 맞춤 일정 · 가족/바이어/일반 관광객/크루즈 승객 환영 · 반나절/종일
3. **Busan 추천 코스**
   - Busan Highlights (Full day): 감천문화마을 → 자갈치·국제시장·BIFF(전통시장·길거리음식) → 해동용궁사 → 해운대 블루라인파크 스카이캡슐 + 광안리 야경
   - Markets & Food (Half day): 자갈치·국제시장·부전시장 + 길거리 음식
   - Coast & Culture (Half day): 해운대·흰여울문화마을·송도 스카이워크/태종대
4. **Seoul 추천 코스**
   - Palaces & Hanok: 경복궁·북촌한옥마을·인사동
   - Traditional Markets: 광장시장·남대문시장
   - City Highlights: 명동·N서울타워 등
5. **Cruise / 반나절·종일** — 짧은 기항지 코스. 시간/일정은 폼에서 선택.
6. **Gallery** — 부산/서울 명소 사진
7. **상담/예약 폼** — 랜딩과 통합(투어 선택 시 날짜·인원·반나절/종일 필드 노출)

## 8. 통합 상담 폼

- 분기 셀렉터: "What can we help with?" → **Relocation** / **Private Tour**
- 공통 필드: Name, Email, WhatsApp(선택), Company(선택, HR), City(Busan/Seoul/Other), Message
- Relocation 선택 시: 관심 서비스(복수: Visa / Housing / Settling-in / Transportation), 이주 예정 시기
- Private Tour 선택 시: 희망 날짜, 인원수, 반나절/종일
- 처리: 서버 검증(zod) + 허니팟 → `rosh.yum@sojournkorea.net` 단일 수신(영업·투어 겸임) → 인라인 성공 메시지

## 9. 이미지 / 미디어 자산 계획

- **로고**: §4 변환 사용
- **히어로**: 영상 프레임 시퀀스(해운대)
- **서비스/섹션 컷**: `assets/raw/sojourn-korea-imgs/*.jpg`(부산 야경/스카이라인 등) 중 사용 가능분 감사(audit) 후 사용 → 부족/저화질분은 큐레이션된 고화질 이미지로 보강
- **투어 컷**: 감천문화마을·해동용궁사·해운대 블루라인·광안리·자갈치/국제시장·경복궁·북촌·광장시장 등 큐레이션 이미지
- **외부 이미지 처리**: 핫링크 대신 `public/images/`에 **자체 호스팅**(성능·안정성). 라이선스 안전한 소스(Unsplash 등)만 사용.
- **KHNP**: 텍스트 레퍼런스만(제3자 로고 미사용)

## 10. 콘텐츠 소스 — 실제 후기 전문 (실명 공개 승인됨)

> KHNP(한국수력원자력) APR1400 프로젝트 외국인 전문가들의 추천서. 출처: `assets/raw/sojourn-korea-imgs/*.pdf` (Mark Taylor, KHNP_recommendation2015 — Moody/Anderson/Wurster/Bradley 포함)

1. **Mark Taylor** — Training Consultant, KHNP (USA, 2014): "…instead of having to spend hours at the immigration office, Ros managed to secure the necessary visa in less than 30 minutes. Need a rental car?…no problem, cell phone?…no problem, apartment?…no problem. Ros and his business partner, Charlie, are worth their weight in gold."
2. **Gerald F. Moody** — Senior Consultant to KHNP (2015): "For the past four years Ros has assisted me with personal living arrangements in Korea… He has made my stay here almost effortless. His work is outstanding, always timely… a true professional and absolutely reliable. I have no hesitation giving him my very highest recommendation."
3. **Thomas E. Anderson** — Foreign expert, KHNP APR1400 (2015): "Rosh is always completely professional, completely reliable, and remarkably knowledgeable… Without help from Rosh Yum I would have been unable to focus on the KHNP work as quickly. He greatly reduces the inconvenience and expense from international work."
4. **Frank Wurster** — (2015): "Ros is extremely customer oriented and always willing to help… getting a place to live, my visa, driver's license, cable TV, a leased vehicle… One of the things I am most impressed with is Ros's attention to detail. I merely mention some kind of need and Ros does not forget — even after I forget!"
5. **Miles Bradley** — (2015): "Ros is an incredibly valuable individual who is kind, friendly, honest, and trustworthy. He takes care of everything… Without Ros, I would probably be still looking for a place to live. The man works magic."

**회사 사실(About/Footer용)**: SOJOURN KOREA(서전코리아), Since 2011 · 대표/Managing Director **Rosh Yum(염강)**, 파트너 Charlie · 오피스 38 Marine-City 2-ro, Haeundae-gu, Busan · WhatsApp/iPhone +82-10-2066-1977 · rosh.yum@sojournkorea.net · LinkedIn /company/sojourn-korea · KITA 회원사 · 슬로건 "Total Solution for Visa and Relocation", "Settle-in Easy!", "Relocate to Busan"

## 11. 접근성 / 성능 / 반응형

- WCAG AA 대비, 모든 이미지 alt, 키보드 접근 가능 폼·포커스 스타일, `prefers-reduced-motion` 폴백
- 모바일 퍼스트; 히어로는 모바일에서 폴백 비디오/포스터
- 성능 예산: 히어로 시퀀스 ≤ ~7MB, 첫 화면 즉시 포스터, 하단 이미지 lazy-load
- Lighthouse 목표: 데스크톱 Performance ≥ 80, Accessibility ≥ 95

## 12. 확정된 결정 (사용자 승인)

- (a) 후기 **실명 공개** ✅
- (b) **"Since 2011"** 그대로 표기 ✅
- (c) 폼 수신 **rosh.yum@sojournkorea.net** 단일(영업·투어 겸임) ✅
- 빌드 방식: **Next.js + Tailwind + Vercel** (안 A)
- 구조: **서비스 중심형** / 톤: **Trust & Calm(네이비)** / 언어: **영어 전용** / 메인 CTA: **상담 폼**

## 13. 배포 & 셋업 체크리스트

- `brew install webp` (cwebp) — 히어로 프레임 생성용
- 환경변수: `WEB3FORMS_KEY`(기본) — 추후 `RESEND_API_KEY`로 전환 가능
- 배포: Vercel → 추후 `sojournkorea.net`(또는 `.com`) 도메인 연결
- (선택) git 저장소 초기화 + 커밋

## 14. 수용 기준 (Acceptance Criteria)

- [ ] 히어로가 데스크톱에서 스크롤 스크럽으로 부드럽게 동작, 모바일/모션최소화 폴백 동작
- [ ] 6개 서비스 + Process + 실명 후기 5건이 실제 콘텐츠로 표시
- [ ] 투어 페이지에 부산/서울 코스 + 크루즈/반나절·종일 안내
- [ ] 통합 폼이 Relocation/Tour 분기, 검증·스팸가드·성공 상태, 이메일 수신처 정확
- [ ] 로고 네이비 브랜드 적용, 보유 자산 우선 사용 + 부족분 큐레이션
- [ ] 반응형/접근성/성능 기준 충족

## 15. 범위 밖 (Out of Scope, 향후)

- 한국어 i18n, CMS/블로그, 온라인 예약·결제, 무역(Trade Consulting) 사업 페이지
