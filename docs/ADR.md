# Architecture Decision Records

## 철학
빠른 런칭을 위해 정적 콘텐츠와 최소 서버 로직으로 시작한다. 신뢰를 만드는 실제 콘텐츠, 검증 가능한 폼 처리, 작은 단계별 커밋을 우선한다. 추후 CMS, i18n, 결제 같은 확장은 현재 MVP 밖으로 둔다.

---

### ADR-001: Next.js 16 App Router 선택
**결정**: Next.js 16.2.9 App Router와 TypeScript를 사용한다.  
**이유**: Vercel 배포, route handler, metadata, sitemap/robots를 같은 스택에서 처리할 수 있다.  
**트레이드오프**: Next.js 16의 변경점 때문에 작업 전 `node_modules/next/dist/docs/` 확인이 필요하다.

### ADR-002: 영어 전용 정적 콘텐츠 중앙화
**결정**: i18n 라이브러리 없이 `lib/content/*`에 영어 카피와 구조화 데이터를 둔다.  
**이유**: 현재 목표는 영어 전용 MVP이며, 카피를 한 곳에 모으면 추후 i18n 전환 여지도 유지된다.  
**트레이드오프**: 비개발자가 직접 CMS로 수정하는 기능은 제공하지 않는다.

### ADR-003: Hero는 frame sequence + fallback
**결정**: desktop Hero는 webp frame sequence를 canvas로 scroll-scrub하고, mobile/reduced-motion은 mp4/poster fallback을 사용한다.  
**이유**: 부산 해운대 영상이 브랜드 첫인상을 만든다. Canvas sequence는 Apple식 스크롤 경험을 구현하기 쉽다.  
**트레이드오프**: 프레임 용량 관리와 preload 성능 튜닝이 필요하다.

### ADR-004: Web3Forms 우선, email adapter로 격리
**결정**: 상담 폼 이메일 전송은 `lib/form/sendLead.ts` 어댑터 뒤에 두고 Web3Forms를 기본 provider로 사용한다.  
**이유**: DNS 설정 없이 빠르게 런칭할 수 있고, 추후 Resend 전환 시 route handler와 UI 변경을 최소화한다.  
**트레이드오프**: Web3Forms key가 없는 로컬/preview 환경에서는 실제 전송 대신 명확한 blocked 또는 mock 경로가 필요하다.

### ADR-005: Harness phase로 잔여 작업 관리
**결정**: `phases/landing-renewal`에 잔여 작업 step을 정의하고 `scripts/execute.py`가 Codex로 순차 실행한다.  
**이유**: 각 step을 독립 세션에서 실행해도 문서, 이전 summary, AC가 누적되어 작업을 이어갈 수 있다.  
**트레이드오프**: step 파일을 최신 상태로 유지해야 하며, 자동 실행 전에 변경 범위 검토가 필요하다.
