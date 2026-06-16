# Step 0: landing-process

## 읽어야 할 파일

먼저 아래 파일을 읽고 현재 구조와 디자인 의도를 파악하라:

- `/AGENTS.md`
- `/docs/PRD.md`
- `/docs/ARCHITECTURE.md`
- `/docs/UI_GUIDE.md`
- `/docs/ADR.md`
- `/docs/superpowers/specs/2026-06-16-sojourn-korea-landing-design.md`
- `/docs/superpowers/plans/2026-06-16-sojourn-korea-landing.md`
- `/node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
- `/components/sections/landing/WhySojourn.tsx`
- `/components/ui/Section.tsx`
- `/lib/content/process.ts`

## 현재 상태

- `WhySojourn.tsx` 초안은 존재하지만 아직 `/app/page.tsx`에 마운트되지 않았다.
- `Process` 섹션은 아직 없다.
- `/`는 현재 `Hero`만 렌더링한다.

## 작업

1. `components/sections/landing/WhySojourn.tsx`를 검토하고 필요한 최소 polish만 적용한다.
   - 4개 value prop은 유지한다: `1:1 managing`, `Local best-partner network`, `Truly honest service`, `One-stop, end to end`.
   - 섹션 tone은 navy로 유지한다.
   - 카드 안 카드 구조를 만들지 않는다.
2. `components/sections/landing/Process.tsx`를 생성한다.
   - `processSteps` from `@/lib/content/process`를 사용한다.
   - 모바일은 세로 타임라인, desktop은 가로 또는 넓은 grid 타임라인으로 구성한다.
   - 각 step은 `n`, `title`, `desc`를 표시한다.
   - `Section` primitive를 사용하고 `id="process"`를 지정한다.
3. 이 step에서는 `app/page.tsx`를 수정하지 않는다. 페이지 조립은 Step 2에서 한다.

## Acceptance Criteria

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

## 검증 절차

1. 위 AC 커맨드를 모두 실행한다.
2. `components/sections/landing/Process.tsx`가 `processSteps` 외 새 데이터를 만들지 않는지 확인한다.
3. 결과에 따라 `/phases/landing-renewal/index.json`의 step 0을 업데이트한다:
   - 성공: `"status": "completed"`, `"summary": "WhySojourn polish and Process section added"`
   - 3회 수정 후 실패: `"status": "error"`, `"error_message": "구체적 실패 원인"`
   - 사용자 개입 필요: `"status": "blocked"`, `"blocked_reason": "구체적 사유"`

## 금지사항

- `app/page.tsx`를 수정하지 마라. 이유: 섹션 조립은 Step 2의 단일 책임이다.
- 새 process 데이터를 만들지 마라. 이유: `lib/content/process.ts`가 단일 콘텐츠 출처다.
- 과한 애니메이션이나 장식 배경을 추가하지 마라. 이유: UI_GUIDE의 신뢰감 있는 서비스 톤을 지켜야 한다.
