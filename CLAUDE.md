# All Things Flooring & Tile

Website for a flooring business in Eastman, GA. React + Vite + Tailwind CSS 4, deployed on Cloudflare Pages with a Cloudflare Worker backend for AI image generation.

## Tech Stack

- **Frontend:** React 19, React Router 7, Tailwind CSS 4 (via `@tailwindcss/vite`), Vite 8
- **Backend:** Cloudflare Worker (`worker/src/index.js`) — single `/generate` POST endpoint
- **AI:** Gemini 2.5 Flash (primary) with OpenAI GPT-Image-1 fallback for room visualization
- **Storage:** Cloudflare R2 bucket `cerul-social-media` (paths: `all-thing/uploads/`, `all-thing/downloads/`)
- **Deploy:** Cloudflare Pages (frontend), `cd worker && wrangler deploy` (worker)

## Project Structure

```
src/
  config.js          # Single source of truth for ALL site content, pricing, CTAs
  main.jsx           # Router setup: /, /studio, /about, /community, /resources, /partners
  index.css          # Tailwind imports
  components/
    Layout.jsx       # Shared layout wrapper (Header + Outlet + Footer + MobileNav)
    Header.jsx       # Desktop nav, phone, booking button, business name
    Footer.jsx       # Links, contact, copyright
    MobileNav.jsx    # Bottom nav bar, phone link
  pages/
    Landing.jsx      # Hero, services, before/after, testimonials, showroom CTA
    Studio.jsx       # AI Room Visualizer + Cost Calculator
    About.jsx        # Team bios (Ron, Jamie, Landin, Gavin), quote banner
    Community.jsx    # Events, community involvement (being rebuilt)
    Resources.jsx    # Newsletter signup, YouTube tips, DIY gallery teaser
    Partners.jsx     # Materials & installation partnerships, supplier bar
  assets/
    hero.png         # Hero background image
worker/
  src/index.js       # Cloudflare Worker — /generate and /health endpoints
  wrangler.toml      # Worker config (R2 binding, vars)
```

## Key Architecture Decisions

- **Config-driven:** Everything flows from `src/config.js` — business info, CTAs, nav, pricing, testimonials, etc. Edit config, not components.
- **Booking CTA:** Primary CTAs point to Google Calendar booking (`CONFIG.booking`). Phone number is secondary CTA. Header shows both.
- **Worker AI pipeline:** Upload room + flooring images -> R2 storage -> Gemini analyzes both -> Gemini edits room with new floor -> saves to R2 -> returns base64. Falls back to OpenAI if Gemini fails.

## Commands

```bash
npm run dev          # Vite dev server (frontend)
npm run build        # Production build -> dist/
npm run lint         # ESLint
npm run preview      # Preview production build

cd worker && npx wrangler dev    # Worker local dev
cd worker && wrangler deploy     # Deploy worker
```

## Worker Secrets

The worker requires these secrets (set via `wrangler secret put`):
- `GEMINI_KEY` — Google Gemini API key
- `OPENAI_KEY` — OpenAI API key (fallback, optional but recommended)

## Coding Conventions

- JSX components in PascalCase files (`.jsx`)
- All site content/copy lives in `src/config.js`, not hardcoded in components
- Tailwind CSS 4 utility classes (no separate config file — uses `@tailwindcss/vite` plugin)
- ESLint with react-hooks and react-refresh plugins
- No TypeScript — plain JS/JSX throughout

## Current TODO

- [ ] Verify build after config refactor
- [ ] Swap CTA links to scheduler URL
- [ ] Remove `react-compare-slider` from Landing.jsx (replace with real project photos)
- [ ] Social links — update with real URLs
- [ ] PWA setup
