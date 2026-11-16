# All Things Flooring & Tile

Website for All Things Flooring & Tile in Eastman, GA: cabinets first, then floors, tile and remodels. Astro (static) + Preact islands + Tailwind CSS 4, deployed on Cloudflare Pages with a Cloudflare Worker backend for the room visualizer.

## Tech Stack

- **Frontend:** Astro 6 (pure static output — no adapter), Preact islands for interactivity, Tailwind CSS 4 (via `@tailwindcss/vite`)
- **SEO/PWA:** `astro-seo`, `@astrojs/sitemap`, `@vite-pwa/astro` (autoUpdate), JSON-LD `HomeAndConstructionBusiness` schema
- **Backend:** Cloudflare Worker (`worker/src/index.js`) — single `/generate` POST endpoint, wide-open CORS
- **AI:** Gemini 2.5 Flash (primary) with OpenAI GPT-Image-1 fallback for room visualization
- **Storage:** Cloudflare R2 bucket `cerul-social-media` (paths: `all-thing/uploads/`, `all-thing/downloads/`)
- **Deploy:** Cloudflare Pages (frontend, `astro build` → `dist/`), `cd worker && wrangler deploy` (worker)

## Project Structure

```
src/
  config.ts                      # Single source of truth: content, photos (PHOTOS), CTAs, reviews, cabinets, pricing
  prefill.ts                     # sessionStorage key: Cabinet Planner -> /book message
  layouts/Base.astro             # SEO, OG, geo meta, PWA manifest link, Header + slot + Footer + MobileNav
  components/
    Header.astro / Footer.astro / MobileNav.astro   # nav from CONFIG.nav / footer.links / mobileNav
    SchemaLocalBusiness.astro    # JSON-LD HomeAndConstructionBusiness (services from CONFIG.seo, no opening hours)
    FAQ.astro                    # FAQ list + FAQPage JSON-LD
    Suppliers.astro              # Supplier logo bar (landing + /book)
    PhotoGrid.astro              # Masonry grid of real job photos
    EstimateCta.astro            # "Set up an estimate" closing block
    Studio.tsx                   # island: room visualizer + flooring cost calculator (/studio)
    CabinetPlanner.tsx           # island: cabinet planner (/cabinets, client:visible)
    BookingForm.tsx              # island: /book quick-connect form (Cerul-backed)
    SqFtChallenge.tsx            # island: sq ft game (/resources)
  pages/
    index.astro                  # Hero rotating gallery, what we do, halfway/finished, reviews, suppliers, app, FAQ, CTA
    cabinets.astro               # Cabinet gallery by room + Cabinet Planner
    custom.astro                 # Custom work (barrel table), stairs, built-ins
    book.astro                   # Set up an estimate (BookingForm) + supplier bar
    studio.astro, about.astro, resources.astro
public/_redirects                # /newsletter /community /partners -> / (301), pages removed 2026-11
worker/                          # Room visualizer worker. Do not touch from site work.
```

## Key Architecture Decisions

- **Config-driven:** Everything flows from `src/config.ts` — business info, CTAs, nav, pricing, testimonials, suppliers, team, studio worker URL. Edit config, not components.
- **Static output, no CF adapter:** `astro build` emits a plain `dist/` of HTML + assets. No `@astrojs/cloudflare` adapter — adding it splits output and breaks CF Pages routing.
- **Interactivity via islands only:** Four Preact islands: `Studio.tsx`, `CabinetPlanner.tsx`, `BookingForm.tsx`, `SqFtChallenge.tsx`. Landing hero gallery, review carousel and mobile menu are vanilla `<script>` blocks in Astro files.
- **Photos:** real job photos only, on R2 at `https://social.cerul.org/all-thing/site-images/work/<name>.webp` (bucket `cerul-social-media`, prefix `all-thing/site-images/`). Listed once in `PHOTOS` in config with alt + pixel size. No stock, no generated images. Mid-job shots are labelled "Halfway" / "Finished", never "Before" / "After".
- **Showroom is closed (since 2026-08-31).** No showroom, walk-in, "stop by" or store-hours copy anywhere (pages, FAQ, team bios, JSON-LD, manifest). Phone and the site are the only ways in. Street address stays in footer + JSON-LD only.
- **Copy rules:** no em-dashes, never "AI" in customer-facing copy, reviews in `testimonials` are real Google reviews, verbatim. No invented prices, towns or counts.
- **Cabinet prices:** `CONFIG.cabinets.pricing` is `null` until Ron sends numbers (typed `CabinetPricing`: per-linear-foot low/high by grade + countertop adders). While null the planner shows no dollar figures.
- **/book is a quick-connect, not a booking.** CTAs say "Set up an estimate", never "Book". Visitor sends what they need + a preferred day/time; Ron or Jamie call or text to settle it. The server decides `request_received` vs live slots; slot step reads "Times that could work". Island talks to Cerul's 2-endpoint backend at `hetzner.cerul.org` (contract in `docs/adding-booking.md`, do not change it from the site). The planner prefills the message via sessionStorage (`src/prefill.ts`) or `?message=`.
- **Worker AI pipeline:** Upload room + flooring images → R2 storage → Gemini analyzes both → Gemini edits room with new floor → saves to R2 → returns base64. Falls back to OpenAI if Gemini fails.
- **Worker security:** Origin allowlist (`allthingsflooringntile.com`, `www.` variant, `*.all-things.pages.dev` previews, localhost dev ports) enforced on `/generate`. `/health` is open. Rate limited to 10 req / 60s / IP via Cloudflare's native `[[unsafe.bindings]] type = "ratelimit"` binding.

## Commands

```bash
npm run dev          # Astro dev server (frontend)
npm run build        # Production build -> dist/
npm run preview      # Preview production build

cd worker && npx wrangler dev        # Worker local dev
cd worker && wrangler deploy         # Deploy worker
```

## Worker Secrets

The worker requires these secrets (set via `wrangler secret put`):
- `GEMINI_KEY` — Google Gemini API key
- `OPENAI_KEY` — OpenAI API key (fallback, optional but recommended)

## Coding Conventions

- `.astro` files for pages, layouts, and static components. Frontmatter is TypeScript.
- `.tsx` files for Preact islands. Imports come from `preact/hooks`, not `react`. `className` and `class` both accepted.
- All site content/copy lives in `src/config.ts`, not hardcoded in components.
- Tailwind CSS 4 utility classes (no separate config file — `@theme` block in `src/styles/global.css`).
- No runtime React — `tsconfig.json` aliases `react` and `react-dom` to `preact/compat` as a safety net.

## Current TODO

- [ ] `CONFIG.cabinets.pricing`: waiting on Ron's per-linear-foot numbers by grade + countertop adders.
- [ ] Expand `areaServed` / per-town landing pages (config-driven). See `docs/TODO.md`.
- [ ] GBP name collision (blocked): directory listings wait until the name is locked. See `docs/TODO.md`.
