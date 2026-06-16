# Step 4: contact-api

## 읽어야 할 파일

- `/AGENTS.md`
- `/docs/PRD.md`
- `/docs/ARCHITECTURE.md`
- `/docs/ADR.md`
- `/node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md`
- `/node_modules/next/dist/docs/01-app/02-guides/environment-variables.md`
- `/package.json`
- `/lib/content/site.ts`

## 작업

1. `zod`가 설치되어 있지 않으면 설치한다.

```bash
npm i zod
```

2. `lib/form/schema.ts`를 생성한다.
   - `interest`는 `"relocation"` 또는 `"tour"`를 허용한다.
   - 공통 필드: `name`, `email`, `whatsapp`, `company`, `city`, `message`, `website` honeypot.
   - relocation 필드: `services: string[]`, `moveTimeline`.
   - tour 필드: `tourDate`, `guestCount`, `tourLength`.
   - honeypot `website`가 비어 있지 않으면 spam으로 처리할 수 있게 한다.
3. `lib/form/sendLead.ts`를 생성한다.
   - `sendLead(input)` 함수를 export한다.
   - 기본 provider는 Web3Forms다.
   - `WEB3FORMS_KEY`가 없으면 `{ ok: false, reason: "missing-key" }`처럼 명확한 결과를 반환한다. throw로 서버를 죽이지 않는다.
   - 수신처는 `site.email`을 사용한다.
4. `app/api/contact/route.ts`를 생성한다.
   - `POST`만 처리한다.
   - JSON body를 schema로 검증한다.
   - honeypot spam은 성공처럼 `{ ok: true }`를 반환해 bot에게 신호를 주지 않는다.
   - validation error는 400, provider failure는 502를 반환한다.
5. Vitest 테스트를 추가한다.
   - `lib/form/schema.test.ts`
   - `app/api/contact/route.test.ts` 또는 route handler를 테스트 가능한 helper로 분리한 테스트

## Acceptance Criteria

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

필수 테스트 케이스:

- valid relocation payload passes.
- valid tour payload passes.
- invalid email fails.
- honeypot payload returns ok without calling provider.
- missing `WEB3FORMS_KEY` returns controlled failure, not uncaught exception.

## 검증 절차

1. 테스트를 먼저 작성하고 실패를 확인한다.
2. 구현 후 AC 커맨드를 모두 실행한다.
3. `/phases/landing-renewal/index.json`의 step 4를 업데이트한다.

## 금지사항

- 클라이언트 컴포넌트에서 Web3Forms를 직접 호출하지 마라. 이유: API key와 validation은 서버에 있어야 한다.
- Resend를 구현하지 마라. 이유: ADR상 Web3Forms 우선이며 Resend는 추후 전환 대상이다.
- 실제 API key를 커밋하지 마라.
