# All Things Flooring & Tile

Website for a flooring business in Eastman, GA. Astro (static) + Preact islands + Tailwind CSS 4, deployed on Cloudflare Pages with a Cloudflare Worker backend for AI image generation.

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
  config.ts                      # Single source of truth for ALL site content, pricing, CTAs
  env.d.ts                       # Astro + PWA type refs
  pwa.ts                         # Service worker registration
  layouts/
    Base.astro                   # SEO, OG, geo meta, PWA manifest link, Header + slot + Footer + MobileNav
  components/
    Header.astro                 # Desktop nav + mobile toggle, phone, booking CTA (vanilla JS for menu)
    Footer.astro                 # Links, contact, copyright (desktop only)
    MobileNav.astro              # Bottom nav bar (mobile only)
    SchemaLocalBusiness.astro    # JSON-LD — HomeAndConstructionBusiness
    Studio.tsx                   # Preact island — AI Visualizer + Cost Calculator
    SqFtChallenge.tsx            # Preact island — sq ft practice game on Resources page
  pages/
    index.astro                  # Landing: hero, studio cards, projects, testimonials, suppliers, QR, showroom
    studio.astro                 # Mounts <Studio client:load />
    about.astro                  # Team bios (Ron, Jamie, Landin, Gavin), quote banner
    community.astro              # Giving back, events, Facebook group connect
    resources.astro              # Newsletter iframe, sq ft article, <SqFtChallenge client:visible />, YouTube
    partners.astro               # Materials + installation partnerships, supplier bar
    newsletter.astro             # Newsletter signup iframe
  styles/
    global.css                   # Tailwind import + @theme CSS vars (warm/stone palette)
  assets/                        # Legacy local images (most site imagery lives on R2)
public/
  favicon.svg                    # Brown AT monogram
  apple-touch-icon.png, pwa-192.png, pwa-512.png   # PWA icons
worker/
  src/index.js                   # Cloudflare Worker — /generate and /health endpoints
  wrangler.toml                  # Worker config (R2 binding, vars)
astro.config.ts                  # Integrations: preact, sitemap, astro-icon, compress, @vite-pwa/astro, tailwindcss
tsconfig.json                    # Strict, Preact JSX runtime, react/react-dom aliased to preact/compat
```

## Key Architecture Decisions

- **Config-driven:** Everything flows from `src/config.ts` — business info, CTAs, nav, pricing, testimonials, suppliers, team, studio worker URL. Edit config, not components.
- **Static output, no CF adapter:** `astro build` emits a plain `dist/` of HTML + assets. No `@astrojs/cloudflare` adapter — adding it splits output and breaks CF Pages routing.
- **Interactivity via islands only:** The marketing site is static. Two Preact islands: `Studio.tsx` (`client:load` — AI visualizer + calculator) and `SqFtChallenge.tsx` (`client:visible` — sq ft game). Landing carousels and mobile menu use vanilla `<script>` blocks in Astro files.
- **Booking CTA:** Primary CTAs point to Google Calendar booking (`CONFIG.booking`). Phone number is secondary. Header shows both.
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

- [ ] Swap CTA links to scheduler URL (verify `CONFIG.booking` is still correct)
- [ ] Social links — update with real URLs
- [ ] Replace placeholder before/after project images once real photos are ready
