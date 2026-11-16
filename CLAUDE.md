# All Things Flooring & Tile

Website for All Things Flooring & Tile in Eastman, GA: cabinets first, then builds and remodels, custom work, floors and tile. Astro (static) + Preact islands + Tailwind CSS 4, deployed on Cloudflare Pages with a Cloudflare Worker backend for the room visualizer.

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
  layouts/Base.astro             # SEO, OG, geo meta, PWA manifest link, Header + slot + Footer + MobileNav
  components/
    Header.astro / Footer.astro / MobileNav.astro   # nav from CONFIG.nav / footer.links / mobileNav
    SchemaLocalBusiness.astro    # JSON-LD HomeAndConstructionBusiness (services from CONFIG.seo, no opening hours)
    FAQ.astro                    # FAQ list + FAQPage JSON-LD
    Suppliers.astro              # Supplier logo bar (landing + /book)
    PhotoGrid.astro              # Masonry grid of real job photos
    EstimateCta.astro            # "Set up an estimate" closing block
    PageBanner.astro             # Full-bleed photo banner + H1 + intro (/cabinets, /custom, /build)
    planner/
      kit.tsx                    # shared: Chips, PriceTable, BallparkBox, PlannerCard, money helpers, sendToBook
      prefill.ts                 # sessionStorage key: planner summary -> /book message
      CabinetPlanner.tsx         # island: cabinets ballpark (/cabinets)
      SimplePlanner.tsx          # island: ballpark planner from RangePricing, kind="custom" | "build"
    Studio.tsx                   # island: room visualizer + flooring cost calculator (/studio)
    BookingForm.tsx              # island: /book quick-connect form (Cerul-backed)
  pages/
    index.astro                  # Hero gallery (word synced to panel), pick-where-to-start cards, reviews, suppliers, app, FAQ, CTA
    cabinets.astro               # Banner, intro, Cabinet Planner, gallery by room, page FAQ
    build.astro                  # Banner, intro, build planner, new builds, barndominium kits, remodels, porch review, page FAQ
    custom.astro                 # Banner, intro, custom planner, barrel table, other one-off work, page FAQ
    book.astro                   # Set up an estimate (BookingForm) + supplier bar
    studio.astro                 # "Flooring & Design" (URL stays /studio): visualizer + flooring calculator
    about.astro
public/_redirects                # /newsletter /community /partners /resources -> / (301), pages removed 2026-11
worker/                          # Room visualizer worker. Do not touch from site work.
```

## Key Architecture Decisions

- **Config-driven:** Everything flows from `src/config.ts` — business info, CTAs, nav, pricing, testimonials, suppliers, team, studio worker URL. Edit config, not components.
- **Static output, no CF adapter:** `astro build` emits a plain `dist/` of HTML + assets. No `@astrojs/cloudflare` adapter — adding it splits output and breaks CF Pages routing.
- **Interactivity via islands only:** Preact islands: `Studio.tsx`, `planner/CabinetPlanner.tsx`, `planner/SimplePlanner.tsx`, `BookingForm.tsx`. Landing hero gallery, review carousel and mobile menu are vanilla `<script>` blocks. The hero is one timeline: `show()` sets the panel and its `data-word` together.
- **Photos:** real job photos only, on R2 at `https://social.cerul.org/all-thing/site-images/work/<name>.webp` (bucket `cerul-social-media`, prefix `all-thing/site-images/`). Listed once in `PHOTOS` in config with alt + pixel size. No stock, no generated images, with one exception: `PHOTOS.barndoExample` is an owner-approved example image (alt text says "Example"; owner chose no caption). Swap it when a real photo comes. No during/after pairs (owner found them confusing); the `before-*` photos are not used.
- **Showroom is closed (since 2026-08-31).** No showroom, walk-in, "stop by" or store-hours copy anywhere (pages, FAQ, team bios, JSON-LD, manifest). Phone and the site are the only ways in. Street address stays in footer + JSON-LD only.
- **Copy rules:** no em-dashes, never "AI" in customer-facing copy, reviews in `testimonials` are real Google reviews, verbatim. No invented prices, towns or counts.
- **Ballpark planners (funnel, not quotes):** all three section pages have one. Ranges are GENERAL typical prices, not Ron's list, marked so in config: `cabinets.pricing` (per ft of wall by grade + countertop per sq ft, 2 sq ft of top per ft, rounds to $100), `build.planner.pricing` (per sq ft or flat, rounds to $1,000), `custom.planner.pricing` (flat / per ft / per sq ft, rounds to $100). Each shows a static table up top, a ballpark once sized (flat items need no size), ONE short disclaimer, and sends the ballpark to /book marked "ballpark only". Replace with Ron's numbers when he sends them; `null` hides dollar figures. Copy is confident: no hedging beyond that one line.
- **Page order on section pages:** banner, intro, planner, photo galleries, page FAQ (FAQPage JSON-LD via `FAQ.astro`), CTA. The FAQs carry the SEO now that /resources is gone.
- **Type system:** headings `font-heading` (Playfair Display), everything else the body face (Inter; `--font-sans` is set to Inter so unstyled elements never fall back). Scale: page H1 `text-3xl md:text-5xl`, section H2 `text-3xl md:text-4xl`, card titles (planners, booking form) `text-2xl md:text-3xl`, sub-group H3 `text-xl md:text-2xl`.
- **/book is a quick-connect, not a booking.** CTAs say "Set up an estimate", never "Book". Form fields: name required, phone OR email required, address / preferred day / time of day / message optional; no day = no `preferred_start_iso` in the request. Tap-to-call, text and email buttons sit at the top of /book. Ron or Jayme call or text to settle the time. The server decides `request_received` vs live slots; slot step reads "Times that could work". Island talks to Cerul's 2-endpoint backend at `hetzner.cerul.org` (contract in `docs/adding-booking.md`, do not change it from the site). Planners prefill the message via sessionStorage (`planner/prefill.ts`) or `?message=`.
- **Team name spelling:** it is Jayme (Fordham), not Jamie. Image file `jamie-hat.png` and key `photo: 'jamie'` keep the old spelling on purpose.
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

- [ ] `CONFIG.cabinets.pricing`: general ranges live; swap in Ron's own numbers when he sends them.
- [ ] Real barndominium photo to replace `PHOTOS.barndoExample`.
- [ ] Expand `areaServed` / per-town landing pages (config-driven). See `docs/TODO.md`.
- [ ] GBP name collision (blocked): directory listings wait until the name is locked. See `docs/TODO.md`.
