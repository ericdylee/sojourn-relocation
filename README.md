# SOJOURN KOREA

Marketing site for [SOJOURN KOREA](https://www.sojournkorea.net) — an
English-only visa & relocation service for expats and their employers in Busan
and Seoul (operating since 2011), plus a private tour offering.

- `/` — relocation landing (service-first), with a scroll-scrub hero.
- `/tour` — private Busan & Seoul day tours.
- A single consultation form (relocation / tour branches) emails leads to
  `rosh.yum@sojournkorea.net` via [Web3Forms](https://web3forms.com).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · TypeScript ·
Vitest. No database — content is static and lives in `lib/content/`.

## Setup

```bash
npm install

# One-time, only if you need to (re)generate the hero scroll-scrub frames.
# Requires ffmpeg + cwebp (webp) and ImageMagick:
brew install webp imagemagick
./scripts/build-hero-frames.sh   # reads the source video, writes public/hero/*

npm run dev                      # http://localhost:3000
```

The generated hero frames (`public/hero/`) and `lib/hero/frames.ts` are
committed, so `build-hero-frames.sh` is only needed when the source video
changes.

## Environment

Copy `.env.example` to `.env.local` and fill in the key:

```bash
cp .env.example .env.local
```

| Variable        | Purpose                                                        |
| --------------- | ------------------------------------------------------------- |
| `WEB3FORMS_KEY` | Web3Forms access key the contact API uses to deliver leads.   |

Without it, the form returns a configuration error instead of sending.

## Verify

```bash
npm run typecheck && npm run lint && npm run test && npm run build
```

## Where things live

- `lib/content/*` — all copy and data (site details, services, testimonials,
  process steps, tour courses). Edit here to change page content.
- `components/sections/{landing,tour}/*` — the page sections.
- `components/ui/*` — shared primitives (`Section`, `Container`, `Button`,
  `Reveal`).
- `components/form/*` + `app/api/contact` + `lib/form/*` — the consultation
  form, its API route, validation schema and email adapter.
- `public/images`, `public/hero` — photography and hero assets
  (`public/images/CREDITS.md` lists image licenses).
- `docs/` — product spec, plan and the UI guide.

## Deploy

Deploy on [Vercel](https://vercel.com/new): import the repo and set
`WEB3FORMS_KEY` as an environment variable. After adding the production domain
(`www.sojournkorea.net`), update `site.url` in `lib/content/site.ts` if it
differs — it drives `metadataBase`, the sitemap and robots.
