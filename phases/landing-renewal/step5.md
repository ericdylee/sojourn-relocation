# Step 5: consultation-form

## 읽어야 할 파일

- `/AGENTS.md`
- `/docs/PRD.md`
- `/docs/ARCHITECTURE.md`
- `/docs/UI_GUIDE.md`
- `/node_modules/next/dist/docs/01-app/02-guides/forms.md`
- `/lib/form/schema.ts`
- `/app/api/contact/route.ts`
- `/app/page.tsx`
- `/app/tour/page.tsx`
- `/components/ui/Button.tsx`
- `/components/ui/Section.tsx`

## 작업

1. `components/form/ConsultationForm.tsx`를 생성한다.
   - Client Component로 만든다.
   - interest selector: `Relocation`, `Private Tour`.
   - 공통 필드: Name, Email, WhatsApp optional, Company optional, City, Message.
   - Relocation 선택 시: services multi-select/checklist, move timeline.
   - Private Tour 선택 시: preferred date, guest count, half/full day.
   - honeypot field `website`는 시각적으로 숨기되 form data에 포함한다.
   - submit 중 disabled/loading state를 제공한다.
   - 성공/실패 메시지는 인라인으로 표시한다.
2. `app/page.tsx` 하단에 `#contact` 섹션을 추가하고 form을 relocation 기본값으로 마운트한다.
3. `app/tour/page.tsx` 하단에도 같은 form을 tour 기본값으로 마운트한다.
4. Header/Footer의 `/#contact` 링크가 실제 섹션으로 이동하는지 확인한다.

## Acceptance Criteria

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

브라우저 확인:

- `/`에서 contact form이 relocation 기본 상태로 보인다.
- `/tour`에서 contact form이 tour 기본 상태로 보인다.
- interest 전환 시 관련 필드만 표시된다.
- 모바일에서 label/input/button 텍스트가 겹치지 않는다.

## 검증 절차

1. 폼 상태 전환 또는 제출 관련 테스트가 필요한 경우 먼저 테스트를 작성한다.
2. AC 커맨드와 브라우저 확인을 실행한다.
3. `/phases/landing-renewal/index.json`의 step 5를 업데이트한다.

## 금지사항

- 실제 이메일 전송 성공을 UI에서 단정하지 마라. 이유: provider 결과에 따라 success/error를 표시해야 한다.
- form schema와 중복되는 별도 validation 규칙을 많이 만들지 마라. 이유: 서버 schema가 검증의 기준이다.
- 모달 폼으로 만들지 마라. 이유: MVP는 페이지 내 상담 섹션이다.
