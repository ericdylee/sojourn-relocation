# UI 디자인 가이드

## 디자인 원칙
1. 부산과 한국 맥락이 첫 화면과 주요 섹션에서 보여야 한다. 추상 장식보다 실제 장소 이미지와 서비스 증거를 우선한다.
2. 신뢰감 있는 서비스 사이트여야 한다. 과장된 SaaS hero, 네온 글로우, 장식용 카드 남발을 피한다.
3. 반복 사용 가능한 상담 흐름을 명확히 한다. CTA는 `Request a consultation`, tour 탐색은 `/tour`로 일관되게 연결한다.

## AI 슬롭 안티패턴 - 하지 마라
| 금지 사항 | 이유 |
|-----------|------|
| gradient orb 또는 blur blob 배경 | 일반 AI 랜딩처럼 보이고 한국/부산 맥락을 흐린다 |
| 보라/인디고 중심 팔레트 | 브랜드 네이비와 맞지 않고 AI SaaS 클리셰가 강하다 |
| glass morphism 과도 사용 | 신뢰 서비스보다 템플릿처럼 보인다 |
| 제3자 회사 로고 임의 사용 | 상표/승인 문제가 있다. KHNP/KITA는 텍스트로만 표기한다 |
| 카드 안에 카드 배치 | 정보 위계가 흐려지고 모바일에서 답답해진다 |
| 랜딩 설명문으로 기능 사용법을 장황하게 쓰기 | 마케팅 전환을 방해한다 |

## 색상
### 배경
| 용도 | 값 |
|------|------|
| 기본 페이지 | `#FFFFFF`, `bg-white` |
| 네이비 섹션 | `bg-navy-900` (`#0E2A4F`) |
| 짙은 푸터 | `bg-navy-950` |
| 투어 보조 표면 | `bg-sand-50` |

### 텍스트
| 용도 | 값 |
|------|------|
| 기본 제목 | `text-navy-900` |
| 기본 본문 | `text-navy-900/70` |
| 네이비 섹션 제목 | `text-white` |
| 네이비 섹션 본문 | `text-white/70` |
| 보조 라벨 | `text-steel-500` 또는 `text-steel-300` |

### 시맨틱 색상
| 용도 | 값 |
|------|------|
| Primary CTA | `bg-steel-500 text-white` |
| Error | `#B42318` 또는 Tailwind red 계열 |
| Success | `#027A48` 또는 Tailwind green 계열 |

## 컴포넌트
### 섹션
```text
Section: py-20 sm:py-28, Container max-w-6xl px-5 sm:px-8
```

### 카드
```text
rounded-2xl border border-navy-900/10 bg-white shadow-sm
```
단, 큰 page section 자체를 카드처럼 띄우지 않는다.

### 버튼
```text
Primary: rounded-full bg-steel-500 text-white hover:bg-navy-900
Ghost: rounded-full bg-transparent text-navy-900 ring-1 ring-navy-900/20
```

### 입력 필드
```text
rounded-xl border border-navy-900/15 bg-white px-4 py-3
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel-500
```

## 레이아웃
- 전체 너비: `max-w-6xl`.
- 모바일 우선으로 단일 컬럼을 만들고 `sm`, `lg`에서 2-4 컬럼으로 확장한다.
- 고정 비율 이미지에는 `aspect-*`를 명시해 layout shift를 막는다.
- 헤더 CTA는 desktop nav에만 충분히 노출하고 mobile menu에서는 full-width 버튼으로 제공한다.

## 타이포그래피
| 용도 | 스타일 |
|------|--------|
| 섹션 eyebrow | `text-xs font-semibold uppercase tracking-[0.2em]` |
| 섹션 제목 | `text-3xl sm:text-4xl font-bold leading-tight tracking-tight` |
| 카드 제목 | `text-lg font-bold` |
| 본문 | `text-sm sm:text-base leading-relaxed` |

## 애니메이션
- Hero scroll-scrub은 desktop에서만 핵심 모션으로 사용한다.
- `prefers-reduced-motion`에서는 scroll-scrub을 끄고 video/poster fallback을 사용한다.
- Reveal animation은 `opacity`와 `translateY` 수준으로 제한한다.

## 아이콘
- 기존 컴포넌트의 inline SVG 스타일을 유지한다: `strokeWidth={1.6}` 내외, `aria-hidden="true"`.
- 장식용 아이콘은 정보 전달을 방해하지 않게 작게 사용한다.
