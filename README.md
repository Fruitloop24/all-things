# All Things Flooring & Tile

Website and PWA for **All Things Flooring & Tile** — a flooring business in Eastman, GA serving Dodge County and surrounding areas since 2009.

**Live site:** https://allthingsflooringntile.com (Cloudflare Pages — build command: `npm run build`, output: `dist`)

## What This Is

A full-featured business website with:

- **AI Room Visualizer** — upload a photo of your room, pick a floor, see it transformed instantly using Gemini AI
- **Cost Calculator** — real pricing with 5 floor types, DIY/Pro toggle, prep options, and a live price range
- **PWA** — installable app with offline caching, home screen icon, the works
- **QR Code Install** — landing page has a QR code + instructions for customers to install the app
- **Sq Ft Challenge Game** — interactive game on the Resources page to practice calculating square footage of odd-shaped rooms
- **Newsletter** — Google Forms integration for email signups
- **Community Page** — involvement cards, events timeline, Facebook group link
- **Config-driven** — all business info, pricing, CTAs, and content lives in `src/config.ts`

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
| `/` | Hero, services, project showcase, testimonials, supplier logos, QR install, showroom CTA |
| `/studio` | AI Visualizer + Cost Calculator (Preact island) |
| `/about` | Team bios — Ron, Jamie, Landin, Gavin |
| `/community` | Community involvement, events timeline, Facebook group, contact |
| `/resources` | Sq ft guide, Sq Ft Challenge game (Preact island), YouTube videos, newsletter signup |
| `/newsletter` | Dedicated newsletter signup page |
| `/partners` | Supplier partnerships and materials |

## Project Structure

```
src/
  config.ts                    # Single source of truth for ALL content & pricing
  env.d.ts                     # Astro + PWA type refs
  pwa.ts                       # Service worker registration
  layouts/
    Base.astro                 # SEO, OG, geo meta, PWA manifest, header/footer shell
  components/
    Header.astro               # Desktop nav + mobile toggle
    Footer.astro               # Links, contact, copyright
    MobileNav.astro            # Bottom nav bar for mobile
    SchemaLocalBusiness.astro  # JSON-LD structured data
    Studio.tsx                 # Preact island — AI Visualizer + Cost Calculator
    SqFtChallenge.tsx          # Preact island — sq ft practice game
  pages/
    index.astro                # Landing
    studio.astro               # Mounts <Studio client:load />
    about.astro                # Team bios
    community.astro            # Events, involvement, connect
    resources.astro            # Guides, YouTube, sq ft game
    newsletter.astro           # Email signup
    partners.astro             # Supplier partnerships
  styles/
    global.css                 # Tailwind import + @theme CSS vars
public/
  favicon.svg                  # Brown AT monogram
  pwa-192.png, pwa-512.png     # PWA icons
  apple-touch-icon.png         # iOS home screen icon
worker/
  src/index.js                 # Cloudflare Worker — /generate endpoint
  wrangler.toml                # R2 binding + rate limiter binding
astro.config.ts                # Integrations + PWA manifest config
```

## Config-Driven Architecture

**`src/config.ts`** is the single source of truth. Edit it to change:

- Business name, phone, address, hours
- All CTA buttons and links (booking, email, phone)
- Navigation links
- Hero content, services, testimonials
- Team bios and photos
- Calculator pricing (materials, labor, margins, tax)
- Community events and involvement
- YouTube video IDs
- Supplier logos
- Studio worker URL

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
- **Phone:** (478) 231-7935
- **Email:** kc@cerul.org
- **Hours:** Monday-Friday 8am-4pm
