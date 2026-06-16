# PRD: SOJOURN KOREA Landing Renewal

## 목표
SOJOURN KOREA의 노후 사이트를 영어 전용 이주 서비스 마케팅 사이트로 리뉴얼해 외국인 주재원, 가족, 기업 HR의 상담 리드를 확보한다.

## 사용자
- 외국인 주재원, 임직원, 투자자, 바이어
- 외국인 임직원을 한국으로 파견하는 기업 HR
- 부산 또는 서울에서 영어 프라이빗 투어를 원하는 가족, 바이어, 크루즈 승객

## 핵심 기능
1. `/` Relocation 랜딩 페이지: Hero, trust strip, 6개 서비스, Why Sojourn, process, testimonials, tour teaser, 상담 CTA.
2. `/tour` Private Tour 페이지: 부산/서울 추천 코스, 크루즈/반나절/종일 안내, 갤러리, 상담 CTA.
3. 통합 상담 폼: Relocation/Tour 분기, 서버 검증, honeypot, Web3Forms 이메일 전송 어댑터.
4. 신뢰 콘텐츠: KHNP 추천서 기반 실명 후기 5건, Since 2011, KITA 회원, 부산 해운대 오피스 정보.
5. SEO와 운영 준비: metadata, OpenGraph, sitemap, robots, Vercel 배포 준비.

## MVP 제외 사항
- 한국어 i18n
- CMS, 블로그, 관리자 페이지
- 온라인 예약, 결제, 캘린더 예약 확정
- 무역 컨설팅 전용 페이지
- 제3자 로고 사용

## 디자인
- 방향: 일반 SaaS 랜딩이 아니라 한국/부산 맥락이 드러나는 신뢰감 있는 서비스 사이트.
- 톤: Trust & Calm, 차분한 네이비 기반, 실제 장소 이미지 중심.
- 색상: navy `#0E2A4F`, steel blue `#3B82F6`, white/neutral, tour 보조 accent sunset `#C1703D`.
- 전환: 모든 주요 섹션은 `#contact` 상담 신청 또는 `/tour` 탐색으로 이어져야 한다.

## 수용 기준
- 데스크톱 Hero scroll-scrub canvas가 동작하고 모바일/저감 모션에서는 video/poster fallback이 보인다.
- `/`에 6개 서비스, process, 실명 후기 5건, tour teaser가 실제 콘텐츠로 표시된다.
- `/tour`에 부산/서울 코스와 크루즈/반나절/종일 안내가 표시된다.
- 상담 폼은 Relocation/Tour 분기 필드를 검증하고 `rosh.yum@sojournkorea.net` 수신용 payload를 만든다.
- `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build`가 통과한다.
