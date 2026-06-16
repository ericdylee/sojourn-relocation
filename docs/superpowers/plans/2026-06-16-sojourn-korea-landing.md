# SOJOURN KOREA Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a renewed, English-only marketing site for SOJOURN KOREA — a service-first relocation landing page (`/`) plus a private tour page (`/tour`) — with a scroll-scrub hero, real content, and a unified consultation form.

**Architecture:** Next.js (App Router, TS) + Tailwind v4 on Vercel. All copy/data centralized in `lib/content/*` so pages are thin compositions of section components. The hero is a scroll-driven `<canvas>` webp frame sequence with a video/poster fallback. One consultation form (branches Relocation/Tour) posts to a provider-agnostic email adapter (Web3Forms default).

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, Vitest + Testing Library, zod, ffmpeg + cwebp (build-time hero frames), Web3Forms (email).

**Design quality:** UI section tasks should be built with the `frontend-design:frontend-design` skill for high polish, and should follow the design principles in the user-referenced supanova skill (fetch `https://raw.githubusercontent.com/uxjoseph/supanova-design-skill/main/SKILL.md` at execution and follow it). Brand tone = "Trust & Calm" navy. Avoid generic AI aesthetics.

**Spec:** `docs/superpowers/specs/2026-06-16-sojourn-korea-landing-design.md`

---

## Conventions

- **Package manager:** npm.
- **Testing philosophy:** TDD for pure logic and data (form schema, scroll→frame mapping, content-shape invariants, contact handler). Visual section components are verified by typecheck + build + a visual screenshot check (no brittle DOM snapshot tests).
- **Commit after every task.** Conventional commit messages.
- **Verify command (run after most tasks):** `npm run typecheck && npm run lint` and, for logic, `npm run test`.
- Branch for this work: `feat/landing-renewal` (created in Task 1).

---

## File Structure (decomposition)

```
app/
  layout.tsx                 # root: fonts, Header, Footer, metadata
  page.tsx                   # landing (composition of sections)
  tour/page.tsx              # tour page (composition)
  api/contact/route.ts       # form POST handler
  globals.css                # Tailwind v4 import + @theme brand tokens
  sitemap.ts, robots.ts
components/
  ui/{Container,Section,Button,Reveal}.tsx
  layout/{Header,Footer}.tsx
  hero/{Hero.tsx,useScrollFrames.ts}
  sections/landing/{TrustStrip,Services,WhySojourn,Process,Testimonials,TourTeaser}.tsx
  sections/tour/{TourHero,WhyTour,BusanCourses,SeoulCourses,CruiseHalfFull,Gallery}.tsx
  form/{ConsultationForm.tsx}
lib/
  content/{site.ts,services.ts,testimonials.ts,process.ts,tour.ts}
  hero/frame-map.ts          # pure scroll→frame index util
  form/{schema.ts,sendLead.ts}  # zod schema + email adapter
scripts/build-hero-frames.sh # ffmpeg+cwebp -> public/hero/frames
public/
  logo.png, logo-mark.svg
  hero/frames/frame_0001.webp ... , hero/poster.jpg, hero/haeundae.mp4
  images/*.jpg
```

---

## Phase 0 — Project Setup

### Task 1: Scaffold Next.js into the existing repo

**Files:**
- Create: `package.json`, `app/*`, `tsconfig.json`, `next.config.ts`, etc. (via create-next-app)
- Preserve: existing `.git`, `docs/`, `assets/`, `.gitignore`

- [ ] **Step 1: Create work branch**

```bash
cd /Users/eric/projects/sojourn-relocation
git checkout -b feat/landing-renewal
```

- [ ] **Step 2: Scaffold into a temp subdir (avoids non-empty-dir conflicts)**

```bash
npx create-next-app@latest _scaffold \
  --ts --tailwind --eslint --app --no-src-dir \
  --import-alias "@/*" --use-npm --yes
```
Expected: a Next.js app generated in `_scaffold/`.

- [ ] **Step 3: Move scaffold up into repo root, keep our files**

```bash
# copy everything except the nested git repo
rsync -a --exclude '.git' _scaffold/ ./
rm -rf _scaffold
# merge: keep OUR .gitignore (already has .superpowers/ etc.); append next.js ignores if missing
grep -q '/.next/' .gitignore || printf '\n# next.js\n/.next/\n/out/\n/build/\nnext-env.d.ts\n' >> .gitignore
```

- [ ] **Step 4: Add scripts to package.json**

Add to `"scripts"`: `"typecheck": "tsc --noEmit"`. (Vitest `test` added in Task 2.)

- [ ] **Step 5: Verify dev build boots**

```bash
npm run build
```
Expected: build succeeds (default template page).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold next.js app (app router, ts, tailwind v4)"
```

---

### Task 2: Configure Vitest

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Modify: `package.json` (scripts, devDeps)

- [ ] **Step 1: Install deps**

```bash
npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", setupFiles: ["./vitest.setup.ts"], globals: true },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
});
```

- [ ] **Step 3: Create `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom";
```

- [ ] **Step 4: Add test scripts**

In `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 5: Smoke test**

Create `lib/__smoke__.test.ts`:
```ts
import { describe, it, expect } from "vitest";
describe("env", () => it("runs", () => expect(1 + 1).toBe(2)));
```
Run: `npm run test` → Expected: PASS. Then delete the smoke file.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "test: add vitest setup"
```

---

### Task 3: Brand tokens, fonts, global styles

**Files:**
- Modify: `app/globals.css`, `app/layout.tsx`

- [ ] **Step 1: Define brand theme in `app/globals.css`** (Tailwind v4 `@theme`)

```css
@import "tailwindcss";

@theme {
  --color-navy-950: #08162d;
  --color-navy-900: #0e2a4f;
  --color-navy-800: #143a68;
  --color-steel-500: #3b82f6;
  --color-steel-300: #8fb4e8;
  --color-sand-50: #f3ece2;   /* tour accent surface */
  --color-sunset-500: #c1703d; /* tour accent */
  --color-ink: #0f1722;
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}

html { scroll-behavior: smooth; }
body { color: var(--color-ink); background: #ffffff; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
```

- [ ] **Step 2: Wire Inter font in `app/layout.tsx`**

```tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// apply className={`${inter.variable} font-sans antialiased`} on <body>
```

- [ ] **Step 3: Verify**

`npm run build` → Expected: success. Visually confirm navy utility (`bg-navy-900`) works on a temp element, then revert temp.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "style: add brand theme tokens and Inter font"
```

---

## Phase 1 — Content & Shared Shell

### Task 4: Centralized content data (+ shape test)

**Files:**
- Create: `lib/content/site.ts`, `services.ts`, `testimonials.ts`, `process.ts`, `tour.ts`
- Test: `lib/content/content.test.ts`

- [ ] **Step 1: Write the failing test** (`lib/content/content.test.ts`)

```ts
import { describe, it, expect } from "vitest";
import { services } from "./services";
import { testimonials } from "./testimonials";
import { processSteps } from "./process";
import { busanCourses, seoulCourses } from "./tour";
import { site } from "./site";

describe("content invariants", () => {
  it("has 6 services, each with id/title/desc/items", () => {
    expect(services).toHaveLength(6);
    for (const s of services) {
      expect(s.id && s.title && s.summary).toBeTruthy();
      expect(Array.isArray(s.items)).toBe(true);
    }
  });
  it("has 5 named testimonials with quote+author", () => {
    expect(testimonials).toHaveLength(5);
    for (const t of testimonials) expect(t.quote && t.author).toBeTruthy();
  });
  it("has a process timeline", () => expect(processSteps.length).toBeGreaterThanOrEqual(4));
  it("has busan and seoul courses", () => {
    expect(busanCourses.length).toBeGreaterThanOrEqual(3);
    expect(seoulCourses.length).toBeGreaterThanOrEqual(3);
  });
  it("has contact details", () => {
    expect(site.email).toBe("rosh.yum@sojournkorea.net");
    expect(site.whatsapp).toContain("+82");
  });
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm run test -- content` → Expected: FAIL (modules not found).

- [ ] **Step 3: Create `lib/content/site.ts`**

```ts
export const site = {
  name: "SOJOURN KOREA",
  since: 2011,
  tagline: "Total Solution for Visa and Relocation",
  subTagline: "Settle-in Easy.",
  director: 'Rosh Yum ("Rosh", 염강)',
  email: "rosh.yum@sojournkorea.net",
  whatsapp: "+82-10-2066-1977",
  linkedin: "https://www.linkedin.com/company/sojourn-korea",
  address: "38 Marine-City 2-ro, Haeundae-gu, Busan, Korea",
  kita: "Member, Korea International Trade Association (KITA)",
  marqueeClient: "KHNP (Korea Hydro & Nuclear Power)",
} as const;
```

- [ ] **Step 4: Create `lib/content/services.ts`** (real copy from spec §6)

```ts
export type Service = { id: string; title: string; summary: string; items: string[]; image: string };
export const services: Service[] = [
  { id: "visa", title: "Korea Visa & Immigration", summary: "Every visa type, handled end to end.",
    items: ["All visa types (work & non-work)","Document prep, submission & interview support","In-person accompaniment to the immigration office","Alien Registration Card (ARC)","Stay extension, status & address-change reports"],
    image: "/images/visa.jpg" },
  { id: "settle", title: "Settling-in & Documentation", summary: "The paperwork that makes life work.",
    items: ["Fingerprint registration accompaniment","Korean driver's license","Car purchase / lease / rental & registration","Mobile phone account setup","Bank account setup","FDI enterprise registration, domestic-help visa"],
    image: "/images/settle.jpg" },
  { id: "home", title: "Home Finding", summary: "The right home is the key to an easy move.",
    items: ["Housing matched to your preferences","Family or individual, fully customized","Local-market knowledge you can trust"],
    image: "/images/home.jpg" },
  { id: "tenancy", title: "Tenancy Management", summary: "Support that continues after move-in.",
    items: ["Utilities payment management","House inspection","Repair & maintenance","Lease negotiation & renewal support"],
    image: "/images/tenancy.jpg" },
  { id: "transport", title: "Transportation & Escort", summary: "Get everywhere, from day one.",
    items: ["Airport transfers","Escort to schools, hospitals, shopping","Pet escorting","Long-term rental-car lease","Large-vehicle goods delivery"],
    image: "/images/transport.jpg" },
  { id: "tour", title: "Private Tours", summary: "Discover Busan & Seoul, privately.", items: ["English-speaking guides","Half-day & full-day","Families, buyers & cruise guests"], image: "/images/tour-busan.jpg" },
];
```

- [ ] **Step 5: Create `lib/content/testimonials.ts`** (verbatim, spec §10 — full names approved)

```ts
export type Testimonial = { quote: string; author: string; role: string; year: string };
export const testimonials: Testimonial[] = [
  { quote: "Instead of having to spend hours at the immigration office, Ros managed to secure the necessary visa in less than 30 minutes. Need a rental car?…no problem, cell phone?…no problem, apartment?…no problem. Ros and his partner are worth their weight in gold.",
    author: "Mark Taylor", role: "Training Consultant, KHNP", year: "2014" },
  { quote: "For the past four years Ros has assisted me with living arrangements in Korea. He has made my stay almost effortless. His work is outstanding, always timely — a true professional and absolutely reliable. My very highest recommendation.",
    author: "Gerald F. Moody", role: "Senior Consultant to KHNP", year: "2015" },
  { quote: "Rosh is completely professional, completely reliable, and remarkably knowledgeable. Without him I would have been unable to focus on the KHNP work as quickly. He greatly reduces the inconvenience and expense of international work.",
    author: "Thomas E. Anderson", role: "Foreign expert, KHNP APR1400", year: "2015" },
  { quote: "Ros is extremely customer oriented and always willing to help — a place to live, my visa, driver's license, a leased vehicle. What impresses me most is his attention to detail. I mention some need and Ros does not forget — even after I forget!",
    author: "Frank Wurster", role: "Relocated to Busan", year: "2015" },
  { quote: "Ros is incredibly valuable — kind, friendly, honest, and trustworthy. He takes care of everything. Without Ros, I would probably still be looking for a place to live. The man works magic.",
    author: "Miles Bradley", role: "Relocated to Busan", year: "2015" },
];
```

- [ ] **Step 6: Create `lib/content/process.ts`**

```ts
export type Step = { n: number; title: string; desc: string };
export const processSteps: Step[] = [
  { n: 1, title: "Before you arrive", desc: "We plan your visa route, housing options and arrival logistics from your home country." },
  { n: 2, title: "Airport & first night", desc: "We meet you at the airport and make sure your first night is sorted — no jet-lagged guesswork." },
  { n: 3, title: "Visa & paperwork", desc: "ARC, immigration, bank account, phone and driver's license — accompanied, in person." },
  { n: 4, title: "Home & settle-in", desc: "We find the right home, negotiate the lease, and set up utilities." },
  { n: 5, title: "Ongoing care", desc: "Tenancy management, renewals and day-to-day support for as long as you're here." },
];
```

- [ ] **Step 7: Create `lib/content/tour.ts`** (spec §7)

```ts
export type Course = { id: string; title: string; length: "Half day" | "Full day"; stops: string[]; image: string };
export const busanCourses: Course[] = [
  { id: "busan-highlights", title: "Busan Highlights", length: "Full day",
    stops: ["Gamcheon Culture Village","Jagalchi & Gukje traditional markets (street food)","Haedong Yonggungsa Temple","Haeundae Blue Line Sky Capsule + Gwangalli night view"], image: "/images/gamcheon.jpg" },
  { id: "busan-markets", title: "Markets & Food", length: "Half day",
    stops: ["Jagalchi Fish Market","Gukje Market","Bujeon Market","Street-food tasting"], image: "/images/jagalchi.jpg" },
  { id: "busan-coast", title: "Coast & Culture", length: "Half day",
    stops: ["Haeundae Beach","Huinnyeoul Culture Village","Songdo Skywalk / Taejongdae"], image: "/images/haeundae.jpg" },
];
export const seoulCourses: Course[] = [
  { id: "seoul-palaces", title: "Palaces & Hanok", length: "Full day",
    stops: ["Gyeongbokgung Palace","Bukchon Hanok Village","Insadong"], image: "/images/gyeongbokgung.jpg" },
  { id: "seoul-markets", title: "Traditional Markets", length: "Half day",
    stops: ["Gwangjang Market","Namdaemun Market"], image: "/images/gwangjang.jpg" },
  { id: "seoul-city", title: "City Highlights", length: "Half day",
    stops: ["Myeongdong","N Seoul Tower","Hongdae"], image: "/images/seoul-city.jpg" },
];
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npm run test -- content` → Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "feat(content): add centralized site/services/testimonials/tour data"
```

---

### Task 5: UI primitives

**Files:**
- Create: `components/ui/Container.tsx`, `Section.tsx`, `Button.tsx`

- [ ] **Step 1: `Container.tsx`** — max-width wrapper.

```tsx
export function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}
```

- [ ] **Step 2: `Section.tsx`** — vertical rhythm + optional id + tone.

```tsx
import { Container } from "./Container";
export function Section({ id, tone = "light", className = "", children }:
  { id?: string; tone?: "light" | "navy" | "sand"; className?: string; children: React.ReactNode }) {
  const bg = tone === "navy" ? "bg-navy-900 text-white" : tone === "sand" ? "bg-sand-50" : "bg-white";
  return <section id={id} className={`py-20 sm:py-28 ${bg} ${className}`}><Container>{children}</Container></section>;
}
```

- [ ] **Step 3: `Button.tsx`** — link-style CTA, primary/ghost variants. Primary = `bg-steel-500 text-white rounded-full`. Render as `<a>` (accepts `href`).

- [ ] **Step 4: Verify** `npm run typecheck` → PASS.

- [ ] **Step 5: Commit** `git add -A && git commit -m "feat(ui): add Container, Section, Button primitives"`

---

### Task 6: Header, Footer, root layout

**Files:**
- Create: `components/layout/Header.tsx`, `Footer.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: `Header.tsx`** — **solid white sticky header** (avoids needing a light-logo variant over the dark hero).
  - Left: `<Image src="/logo.png" .../>` (navy logo on white). Right nav: `Services` (#services), `Process` (#process), `Private Tour` (/tour), and a primary `Request a consultation` button (#contact). Mobile: hamburger → slide-down menu. `sticky top-0 z-50 bg-white/90 backdrop-blur border-b`.

- [ ] **Step 2: `Footer.tsx`** — `tone navy`. Wordmark "SOJOURN KOREA" in white text + tagline; columns: contact (email mailto, WhatsApp, LinkedIn, address), quick links, "Since 2011 · KITA member". Copyright.

- [ ] **Step 3: Wire into `app/layout.tsx`** — `<Header/>{children}<Footer/>`. Set base metadata (refined in Task 23).

- [ ] **Step 4: Verify** `npm run build` → PASS. (Logo file added in Task 7; use a temporary text wordmark until then so build passes, replace in Task 7.)

- [ ] **Step 5: Commit** `git add -A && git commit -m "feat(layout): add header, footer, root layout"`

---

## Phase 2 — Assets Pipeline

### Task 7: Logo asset (transparent PNG)

**Files:**
- Create: `public/logo.png` (and `public/logo-mark.svg` if feasible)

- [ ] **Step 1: Ensure ImageMagick**

```bash
which magick || brew install imagemagick
```

- [ ] **Step 2: Make white background transparent + trim** from the cleanest source jpg

```bash
magick "assets/raw/LOGO/SJK-logo_resize.jpg" -fuzz 8% -transparent white -trim +repage \
  -resize x96 "public/logo.png"
```
Expected: `public/logo.png` ~ navy logo on transparent, height 96px.

- [ ] **Step 3: Visual check** — open `public/logo.png`; confirm clean edges (raise `-fuzz` to 12% if halo remains). If the .ai is needed for crispness, convert: `magick "assets/raw/LOGO/SOJOURN KOREA_logo.ai" -density 300 -background none -trim +repage -resize x96 public/logo.png` (try if jpg trace is poor).

- [ ] **Step 4: Swap temporary wordmark in `Header.tsx` for `<Image src="/logo.png" width={..} height={48} alt="SOJOURN KOREA" priority/>`**

- [ ] **Step 5: Verify** `npm run build` → PASS; header shows logo.

- [ ] **Step 6: Commit** `git add -A && git commit -m "feat(brand): add transparent logo and use in header"`

---

### Task 8: Hero frame generation (webp sequence)

**Files:**
- Create: `scripts/build-hero-frames.sh`, `public/hero/frames/*.webp`, `public/hero/poster.jpg`, `public/hero/haeundae.mp4`

- [ ] **Step 1: Ensure cwebp**

```bash
which cwebp || brew install webp
```

- [ ] **Step 2: Write `scripts/build-hero-frames.sh`**

```bash
#!/usr/bin/env bash
set -euo pipefail
SRC="${1:-$HOME/Movies/이_이미지를_바탕으로_천천히_화면이_돌아가는_동영상을.mp4}"
OUT="public/hero/frames"
TMP="$(mktemp -d)"
mkdir -p "$OUT" public/hero
# 1) copy source video for fallback
cp "$SRC" public/hero/haeundae.mp4
# 2) extract ~144 frames (every other frame of 240 -> 120; use fps to control)
ffmpeg -hide_banner -y -i "$SRC" -vf "fps=14" "$TMP/f_%04d.png"
# 3) encode each PNG to webp q80 (sequential numbering)
i=1
for f in "$TMP"/f_*.png; do
  printf -v n "%04d" "$i"
  cwebp -quiet -q 80 "$f" -o "$OUT/frame_$n.webp"
  i=$((i+1))
done
# 4) poster = first frame at full quality jpg
ffmpeg -hide_banner -y -ss 0 -i "$SRC" -frames:v 1 public/hero/poster.jpg
echo "frames: $((i-1)) ; total size:"; du -sh "$OUT"
rm -rf "$TMP"
```
(`fps=14` over 10s ≈ 140 frames. Adjust down to `fps=12` if total > ~7MB.)

- [ ] **Step 3: Run it**

```bash
chmod +x scripts/build-hero-frames.sh && ./scripts/build-hero-frames.sh
```
Expected: ~120–144 webp frames; `du -sh` ≤ ~7MB (if larger, re-run with lower fps in the script).

- [ ] **Step 4: Record frame count** — note the exact count (e.g., 140) for `Hero.tsx` (`FRAME_COUNT`).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat(hero): generate webp frame sequence + poster + mp4 fallback"
```

---

### Task 9: Curate section & tour photos

**Files:**
- Create: `public/images/*.jpg` (referenced by `services.ts` and `tour.ts`)

- [ ] **Step 1: Audit existing assets** — review `assets/raw/sojourn-korea-imgs/*.jpg` (Busan night skyline etc.). Copy any high-quality, on-theme shots into `public/images/` with the target names where they fit (e.g., a Busan skyline → `home.jpg` or `settle.jpg`).

- [ ] **Step 2: Fill gaps with license-safe images.** For each missing filename referenced in `services.ts`/`tour.ts` (`visa,settle,home,tenancy,transport,tour-busan,gamcheon,jagalchi,haeundae,gyeongbokgung,gwangjang,seoul-city`), select a high-quality, license-safe photo (Unsplash) and **download to `public/images/<name>.jpg`** (self-hosted, optimized to ≤ ~300KB, width ~1600). Subjects: visa→documents/passport; settle→Korean street/admin; home→modern Busan apartment; tenancy→keys/apartment interior; transport→car/airport; tour/gamcheon/jagalchi/haeundae/gyeongbokgung/gwangjang/seoul-city→named landmarks.

- [ ] **Step 3: Verify** every `image:` path in `lib/content/*` resolves to a file in `public/images/` (or `public/hero` for tour-busan if reused). Quick check:
```bash
for p in $(grep -ohE '/images/[a-z0-9-]+\.jpg' lib/content/*.ts | sort -u); do test -f "public$p" || echo "MISSING $p"; done
```
Expected: no MISSING output.

- [ ] **Step 4: Commit** `git add -A && git commit -m "feat(media): curate self-hosted section & tour images"`

---

## Phase 3 — Hero (scroll-scrub)

### Task 10: Frame-mapping util (+ test)

**Files:**
- Create: `lib/hero/frame-map.ts`
- Test: `lib/hero/frame-map.test.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect } from "vitest";
import { frameForProgress } from "./frame-map";
describe("frameForProgress", () => {
  it("clamps to first frame at/under 0", () => {
    expect(frameForProgress(-0.5, 100)).toBe(0);
    expect(frameForProgress(0, 100)).toBe(0);
  });
  it("clamps to last frame at/over 1", () => {
    expect(frameForProgress(1, 100)).toBe(99);
    expect(frameForProgress(2, 100)).toBe(99);
  });
  it("maps midpoint", () => expect(frameForProgress(0.5, 100)).toBe(50));
});
```

- [ ] **Step 2: Run → FAIL.** `npm run test -- frame-map`

- [ ] **Step 3: Implement `frame-map.ts`**

```ts
export function frameForProgress(progress: number, frameCount: number): number {
  const p = Math.min(1, Math.max(0, progress));
  return Math.min(frameCount - 1, Math.floor(p * frameCount));
}
```

- [ ] **Step 4: Run → PASS.**

- [ ] **Step 5: Commit** `git add -A && git commit -m "feat(hero): add frame-mapping util with tests"`

---

### Task 11: Hero component (canvas + preload + fallback)

**Files:**
- Create: `components/hero/useScrollFrames.ts`, `components/hero/Hero.tsx`

- [ ] **Step 1: `useScrollFrames.ts`** — client hook: preloads `frame_0001..frame_{count}.webp`, tracks pin-section scroll progress, draws current frame to a passed `<canvas>` ref via rAF. Returns `{ loaded }`. Key points:
  - `"use client"`. Props: `{ canvasRef, sectionRef, frameCount, basePath }`.
  - Preload all frames into `HTMLImageElement[]`; mark `loaded` when frame 0 ready (draw immediately), continue loading rest.
  - On scroll/resize: `progress = clamp((vh - rect.top) / (rect.height - vh))` over the pinned section; `idx = frameForProgress(progress, frameCount)`; draw in rAF (skip if idx unchanged).
  - Honor `window.matchMedia("(prefers-reduced-motion: reduce)")` and a coarse-pointer/`max-width:768px` check → set `disabled` and skip scrubbing.

- [ ] **Step 2: `Hero.tsx`**

  - `"use client"`. Renders a pinned wrapper `sectionRef` with `height: 280vh` (desktop) and a `sticky top-0 h-screen` inner holding the `<canvas>` (full-cover) + gradient overlay + headline/subtitle/CTA overlay.
  - `FRAME_COUNT` = exact count from Task 8 Step 4. `basePath="/hero/frames"`.
  - **Fallback path:** if `disabled` (reduced-motion / mobile), render `<video src="/hero/haeundae.mp4" autoPlay muted loop playsInline poster="/hero/poster.jpg" className="h-screen w-full object-cover"/>` with the same overlay, and set wrapper height to `100vh` (no pin).
  - Always render `poster.jpg` as the canvas's initial background to avoid an empty first paint.
  - Overlay copy (spec §6.1): eyebrow `SOJOURN KOREA · SINCE 2011`, H1 `Your move to Korea, handled.`, sub, primary CTA → `#contact`. Fade/translate overlay with scroll progress on desktop.

- [ ] **Step 3: Mount on landing temporarily** (`app/page.tsx` → just `<Hero/>`), run `npm run dev`, scroll, confirm scrub is smooth and mobile shows the looping video.

- [ ] **Step 4: Screenshot check** — capture desktop hero top + a mid-scroll frame; confirm no fl. (Use the `run`/screenshot tooling.)

- [ ] **Step 5: Commit** `git add -A && git commit -m "feat(hero): scroll-scrub canvas hero with video/reduced-motion fallback"`

---

## Phase 4 — Landing Sections

> Build each with the frontend-design skill. Each task: implement component → mount on `app/page.tsx` → `npm run typecheck` + visual screenshot → commit. Use content from `lib/content/*`. Wrap reveal-on-scroll with `<Reveal>` (Task 24; until then plain).

### Task 12: TrustStrip
**Files:** Create `components/sections/landing/TrustStrip.tsx`
- [ ] **Step 1:** Horizontal strip under hero (navy or white): `site.marqueeClient` ("Trusted by experts at KHNP"), `site.kita`, `Since 2011`, `★★★★★ from relocated expats`. Small, confident, single row → stacks on mobile.
- [ ] **Step 2:** Verify typecheck + screenshot. **Step 3:** Commit `feat(landing): trust strip`.

### Task 13: Services grid
**Files:** Create `components/sections/landing/Services.tsx`
- [ ] **Step 1:** `Section id="services"`. Heading "Everything your relocation needs — in one team." 6 cards from `services` (title, summary, `items` list, `image`). Card grid `sm:grid-cols-2 lg:grid-cols-3`. The `tour` card links to `/tour`. Use `next/image`.
- [ ] **Step 2:** Verify + screenshot. **Step 3:** Commit `feat(landing): services grid`.

### Task 14: WhySojourn
**Files:** Create `components/sections/landing/WhySojourn.tsx`
- [ ] **Step 1:** 4 value props (1:1 managing · local best-partner network · "truly honest service, listening to every need" · one-stop). Icon + title + line each. Navy tone optional.
- [ ] **Step 2:** Verify + screenshot. **Step 3:** Commit `feat(landing): why-sojourn`.

### Task 15: Process timeline
**Files:** Create `components/sections/landing/Process.tsx`
- [ ] **Step 1:** `Section id="process"`. Render `processSteps` as a vertical (mobile) / horizontal (desktop) numbered timeline with connectors.
- [ ] **Step 2:** Verify + screenshot. **Step 3:** Commit `feat(landing): process timeline`.

### Task 16: Testimonials
**Files:** Create `components/sections/landing/Testimonials.tsx`
- [ ] **Step 1:** Heading "From people who actually moved here." Render 5 `testimonials` as quote cards (quote, author, role, year). Lead with the KHNP marquee line. Grid or carousel; keep simple (grid, 2-up desktop).
- [ ] **Step 2:** Verify + screenshot. **Step 3:** Commit `feat(landing): testimonials`.

### Task 17: TourTeaser
**Files:** Create `components/sections/landing/TourTeaser.tsx`
- [ ] **Step 1:** Sand/sunset-accented band. "Beyond relocation — discover Busan & Seoul, privately." 3 thumbnail previews (Gamcheon/Haeundae/Gyeongbokgung) + CTA `Explore private tours` → `/tour`.
- [ ] **Step 2:** Verify + screenshot. **Step 3:** Commit `feat(landing): tour teaser`.

### Task 18: Assemble landing page
**Files:** Modify `app/page.tsx`
- [ ] **Step 1:** Compose: `<Hero/><TrustStrip/><Services/><WhySojourn/><Process/><Testimonials/><TourTeaser/>` + `<ConsultationForm context="relocation"/>` (Task 22) in a `Section id="contact"`.
- [ ] **Step 2:** `npm run build` → PASS; full-page screenshot desktop + mobile.
- [ ] **Step 3:** Commit `feat(landing): assemble full landing page`.

---

## Phase 5 — Tour Page

### Task 19: Tour page sections + assembly
**Files:** Create `components/sections/tour/{TourHero,WhyTour,BusanCourses,SeoulCourses,CruiseHalfFull,Gallery}.tsx`; `app/tour/page.tsx`
- [ ] **Step 1: `TourHero.tsx`** — static image hero (sunset Busan), H1 "Discover Busan & Seoul, privately.", CTA → `#contact`. (No scroll-scrub here.)
- [ ] **Step 2: `WhyTour.tsx`** — English-speaking guides (Busan ×1, Seoul ×1), tailored itineraries, families/buyers/tourists/cruise guests, half- & full-day.
- [ ] **Step 3: `BusanCourses.tsx`** — render `busanCourses` as cards (title, `length` badge, `stops` list, image).
- [ ] **Step 4: `SeoulCourses.tsx`** — render `seoulCourses` similarly.
- [ ] **Step 5: `CruiseHalfFull.tsx`** — short note for cruise/port-call day tours; "tell us your dates in the form."
- [ ] **Step 6: `Gallery.tsx`** — responsive image grid of Busan/Seoul spots from `public/images`.
- [ ] **Step 7: `app/tour/page.tsx`** — compose all + `<ConsultationForm context="tour"/>` in `Section id="contact"`.
- [ ] **Step 8:** `npm run build` → PASS; full-page screenshot. Commit `feat(tour): build private tour page`.

---

## Phase 6 — Consultation Form

### Task 20: Form schema (+ test)
**Files:** Create `lib/form/schema.ts`; Test `lib/form/schema.test.ts`
- [ ] **Step 1: Failing test**

```ts
import { describe, it, expect } from "vitest";
import { leadSchema } from "./schema";
describe("leadSchema", () => {
  const base = { intent: "relocation", name: "A", email: "a@b.com", message: "hi", company: "", phone: "", website: "" };
  it("accepts a valid relocation lead", () => expect(leadSchema.safeParse(base).success).toBe(true));
  it("rejects bad email", () => expect(leadSchema.safeParse({ ...base, email: "nope" }).success).toBe(false));
  it("flags honeypot (website filled)", () => expect(leadSchema.safeParse({ ...base, website: "x" }).success).toBe(false));
  it("requires tour fields when intent=tour", () => {
    expect(leadSchema.safeParse({ ...base, intent: "tour" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...base, intent: "tour", tourDate: "2026-07-01", partySize: 2, duration: "full" }).success).toBe(true);
  });
});
```

- [ ] **Step 2: Run → FAIL.** `npm i zod` then `npm run test -- schema`.

- [ ] **Step 3: Implement `schema.ts`**

```ts
import { z } from "zod";
export const leadSchema = z.object({
  intent: z.enum(["relocation", "tour"]),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  company: z.string().optional().default(""),
  city: z.enum(["Busan", "Seoul", "Other"]).optional(),
  services: z.array(z.string()).optional(),
  timeline: z.string().optional(),
  tourDate: z.string().optional(),
  partySize: z.coerce.number().int().positive().optional(),
  duration: z.enum(["half", "full"]).optional(),
  message: z.string().min(1),
  website: z.string().max(0).optional().default(""), // honeypot: must be empty
}).superRefine((v, ctx) => {
  if (v.intent === "tour") {
    if (!v.tourDate) ctx.addIssue({ code: "custom", path: ["tourDate"], message: "Required" });
    if (!v.partySize) ctx.addIssue({ code: "custom", path: ["partySize"], message: "Required" });
    if (!v.duration) ctx.addIssue({ code: "custom", path: ["duration"], message: "Required" });
  }
});
export type Lead = z.infer<typeof leadSchema>;
```

- [ ] **Step 4: Run → PASS.** **Step 5: Commit** `feat(form): lead validation schema`.

### Task 21: Email adapter + API route (+ test)
**Files:** Create `lib/form/sendLead.ts`, `app/api/contact/route.ts`; Test `lib/form/sendLead.test.ts`
- [ ] **Step 1: Failing test** for `sendLead` (mock `fetch`, assert it posts to Web3Forms with `access_key` and lead fields; returns `{ ok: true }` on 200).
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement `sendLead.ts`** — provider-agnostic; reads `process.env.WEB3FORMS_KEY`; `POST https://api.web3forms.com/submit` with JSON `{ access_key, subject, from_name, ...lead }`; returns `{ ok: boolean, error?: string }`. (Adapter boundary so Resend can replace it later.)
- [ ] **Step 4: Implement `app/api/contact/route.ts`** — `POST`: parse JSON → `leadSchema.safeParse` → 400 on failure → `sendLead` → 200 `{ ok: true }` / 502 on send failure.
- [ ] **Step 5: Run → PASS.** **Step 6: Commit** `feat(form): web3forms adapter + contact route`.

### Task 22: ConsultationForm component
**Files:** Create `components/form/ConsultationForm.tsx`
- [ ] **Step 1:** `"use client"`. Prop `context: "relocation" | "tour"` sets the initial `intent`. Intent toggle (Relocation / Private Tour). Common fields: name, email, WhatsApp (opt), company (opt), city, message + hidden honeypot `website`. Relocation: services checkboxes + timeline. Tour: date, party size, half/full. Submit → `POST /api/contact` (JSON) → inline success ("Thanks — Rosh will be in touch shortly.") / error. Disable button while sending. Client-side mirror of `leadSchema` for inline errors.
- [ ] **Step 2:** Already mounted via Tasks 18 & 19 in `#contact`. Verify: `npm run build`; manually submit on dev with a test `WEB3FORMS_KEY` (or stub) → success state shows; check the recipient is `rosh.yum@sojournkorea.net` (configured in Web3Forms dashboard / subject).
- [ ] **Step 3:** Commit `feat(form): consultation form with relocation/tour branches`.

---

## Phase 7 — SEO, A11y, Polish

### Task 23: Metadata, OG, sitemap, robots, favicon
**Files:** Modify `app/layout.tsx`; Create `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` (or static), `app/icon.png`
- [ ] **Step 1:** Rich `metadata` (title template, description, keywords, `metadataBase`, OpenGraph using `/hero/poster.jpg`, twitter card). Per-page metadata on `/` and `/tour`.
- [ ] **Step 2:** `sitemap.ts` (`/`, `/tour`), `robots.ts` (allow all + sitemap). Favicon from logo.
- [ ] **Step 3:** `npm run build` → PASS. Commit `feat(seo): metadata, og image, sitemap, robots`.

### Task 24: Scroll-reveal + reduced-motion + responsive QA
**Files:** Create `components/ui/Reveal.tsx`; wrap section roots
- [ ] **Step 1:** `Reveal.tsx` — `"use client"`, IntersectionObserver adds a fade/translate-up class once in view; **no-ops under `prefers-reduced-motion`**. Wrap each landing/tour section's content.
- [ ] **Step 2:** Responsive pass at 375 / 768 / 1280 widths (screenshots): header menu, hero fallback, grids, form. Fix overflow/spacing issues found.
- [ ] **Step 3:** Commit `feat(ui): scroll-reveal animations + responsive polish`.

### Task 25: README, env, final verification
**Files:** Create `README.md`, `.env.example`
- [ ] **Step 1:** `.env.example` with `WEB3FORMS_KEY=`. `README.md`: setup (`npm i`, `brew install webp imagemagick`, `./scripts/build-hero-frames.sh`, `npm run dev`), env, deploy to Vercel + domain note, where content lives (`lib/content`).
- [ ] **Step 2: Full verification**

```bash
npm run typecheck && npm run lint && npm run test && npm run build
```
Expected: all PASS.

- [ ] **Step 3:** (Optional) Lighthouse on `npm run start` — confirm Perf ≥ 80 desktop, A11y ≥ 95; note results in README.
- [ ] **Step 4:** Commit `docs: add README and env example` and stop (deploy is a separate, user-triggered step).

---

## Self-Review

**Spec coverage:** §1–2 → Tasks 1,4,6,18,19,22. §3 stack → 1,2,21. §4 brand → 3,7. §5 hero → 8,10,11. §6 landing sections → 12–18. §7 tour → 19. §8 form → 20–22. §9 media → 7,9. §10 content → 4. §11 a11y/perf/responsive → 11,24,25. §13 setup → 7,8,25. §14 acceptance → covered across. §15 out-of-scope → not built (correct). No gaps found.

**Placeholders:** Logic/config/content/test steps contain full code. Visual-section steps are intentionally spec+verify (built via frontend-design skill) — acceptable for marketing UI; each has concrete content source, layout, and a verify+commit. Image selection (Task 9) and frame count (Task 8) are runtime values captured during execution, not code placeholders.

**Type consistency:** `Service.items`, `Testimonial.{quote,author,role,year}`, `Course.{length,stops,image}`, `processSteps[].{n,title,desc}`, `leadSchema`/`Lead`, `frameForProgress(progress,count)` are used consistently across tasks. `site.email`/`site.whatsapp` match the content test.
