# All Things Flooring & Tile

Website and PWA for **All Things Flooring & Tile**: cabinets, flooring, tile and remodels in Eastman, GA, serving Dodge County and surrounding areas since 2009. The showroom closed 2026-08-31; phone and the site are the only ways in.

**Live site:** https://allthingsflooringntile.com (Cloudflare Pages — build command: `npm run build`, output: `dist`)

## What This Is

- **Cabinets first:** landing hero is a rotating gallery of real jobs; `/cabinets` with a **Cabinet Planner** that shows a ballpark from general installed ranges (`CONFIG.cabinets.pricing`, to be replaced by Ron's numbers) and hands the summary to `/book`
- **Build and remodel** (`/build`): new houses and barndominium kits built start to finish, additions, porches, remodels; planner, no prices
- **Custom work** (`/custom`): barrel table, one-off pieces; planner, no prices
- **Set up an estimate** (`/book`): quick-connect form, not a booked appointment. Ron or Jayme call or text to settle the time
- **Design Studio** (`/studio`): room visualizer + flooring cost calculator
- **Real Google reviews** (verbatim) and real job photos only (R2: `all-thing/site-images/work/`)
- **PWA** with QR install, **Sq Ft Challenge** game on Resources
- **Config-driven:** all content lives in `src/config.ts`

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Astro 6 (static output), Preact islands, Tailwind CSS 4 (`@tailwindcss/vite`) |
| SEO | `astro-seo`, `@astrojs/sitemap`, JSON-LD `HomeAndConstructionBusiness` schema |
| PWA | `@vite-pwa/astro` with Workbox, auto-update service worker |
| Backend | Cloudflare Worker (`worker/src/index.js`) — origin allowlist + rate limit |
| AI | Gemini 2.5 Flash (primary), OpenAI GPT-Image-1 (fallback) |
| Storage | Cloudflare R2 bucket `cerul-social-media` |
| Deploy | Cloudflare Pages (frontend), Wrangler (worker) |

## Pages

| Route | What It Does |
|-------|-------------|
| `/` | Rotating hero gallery, pick-where-to-start cards, reviews, suppliers, app install, FAQ, CTA |
| `/cabinets` | Banner, Cabinet Planner with ballpark, cabinet photos by room |
| `/build` | Banner, build planner, new builds, barndominium kits, remodels |
| `/custom` | Banner, custom planner, custom work, stairs, built-ins |
| `/book` | Set up an estimate (BookingForm island) + supplier bar |
| `/studio` | Room visualizer + cost calculator (Preact island) |
| `/about` | Team bios: Ron, Jayme, Landin, Gavin |
| `/resources` | Sq ft guide, Sq Ft Challenge game, YouTube videos, newsletter signup |

Removed 2026-11: `/newsletter`, `/community`, `/partners` (301 to `/` via `public/_redirects`).

File layout: see `CLAUDE.md`.

## Config-Driven Architecture

**`src/config.ts`** is the single source of truth. Edit it to change:

- Business name, phone, address (no store hours: showroom closed)
- CTAs ("Set up an estimate", never "Book"), navigation, footer links
- Job photos (`PHOTOS`), hero panels (each with its headline word), section cards
- Reviews (real, verbatim), FAQ, team bios
- Cabinets / build / custom pages + planner options, `cabinets.pricing` (general ranges until Ron's numbers)
- Flooring calculator pricing, YouTube IDs, supplier logos, studio worker URL

## Commands

```bash
npm run dev              # Astro dev server
npm run build            # Production build -> dist/
npm run preview          # Preview production build

cd worker && npx wrangler dev    # Worker local dev
cd worker && wrangler deploy     # Deploy worker
```

## Worker Secrets

Set via `wrangler secret put` (these do NOT go in the frontend):

- `GEMINI_KEY` — Google Gemini API key
- `OPENAI_KEY` — OpenAI API key (fallback)

## Worker Security

- **Origin allowlist** — only accepts browser requests from `allthingsflooringntile.com`, `*.all-things.pages.dev` previews, and localhost dev ports
- **Rate limit** — 10 requests / 60 seconds / IP via Cloudflare's native ratelimit binding
- `/health` endpoint is open (no origin check, no rate limit)

## Cloudflare Pages Setup

1. Connect this GitHub repo in Cloudflare Pages dashboard
2. Build command: `npm run build`
3. Output directory: `dist`
4. Custom domain: `allthingsflooringntile.com`
5. Push to `master` = auto deploy

## Contact

- **Business:** All Things Flooring & Tile
- **Location:** 1245 College St, Eastman, GA 31023
- **Phone:** (478) 298-6012
- **Email:** kc@cerul.org
