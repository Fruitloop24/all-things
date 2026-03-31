# All Things Flooring & Tile

Website and PWA for **All Things Flooring & Tile** — a flooring business in Eastman, GA serving Dodge County and surrounding areas since 2009.

**Live site:** Cloudflare Pages (connect this repo, build command: `npm run build`, output: `dist`)

## What This Is

A full-featured business website with:

- **AI Room Visualizer** — upload a photo of your room, pick a floor, see it transformed instantly using Gemini AI
- **Cost Calculator** — real pricing with 5 floor types, DIY/Pro toggle, prep options, and a live price range
- **PWA** — installable app with offline caching, home screen icon, the works
- **QR Code Install** — landing page has a QR code + instructions for customers to install the app
- **Sq Ft Challenge Game** — interactive game on the Resources page to practice calculating square footage of odd-shaped rooms
- **Newsletter** — Google Forms integration for email signups
- **Community Page** — involvement cards, events timeline, Facebook group link
- **Config-driven** — all business info, pricing, CTAs, and content lives in `src/config.js`

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, React Router 7, Tailwind CSS 4 (`@tailwindcss/vite`), Vite 8 |
| PWA | `vite-plugin-pwa` with Workbox, auto-update service worker |
| Backend | Cloudflare Worker (`worker/src/index.js`) |
| AI | Gemini 2.5 Flash (primary), OpenAI GPT-Image-1 (fallback) |
| Storage | Cloudflare R2 bucket `cerul-social-media` |
| Deploy | Cloudflare Pages (frontend), Wrangler (worker) |

## Pages

| Route | What It Does |
|-------|-------------|
| `/` | Hero, services, project showcase, testimonials, supplier logos, QR install, showroom CTA |
| `/studio` | AI Visualizer + Cost Calculator (tabbed) |
| `/about` | Team bios — Ron, Jamie, Landin, Gavin |
| `/community` | Community involvement, events timeline, Facebook group, contact |
| `/resources` | Sq ft guide, Sq Ft Challenge game, YouTube videos, newsletter signup |
| `/newsletter` | Dedicated newsletter signup page |
| `/partners` | Supplier partnerships and materials |

## Project Structure

```
src/
  config.js              # Single source of truth for ALL content & pricing
  main.jsx               # Router setup
  index.css              # Tailwind imports + custom theme
  components/
    Layout.jsx           # Header + Outlet + Footer + MobileNav
    Header.jsx           # Desktop nav, phone, booking button
    Footer.jsx           # Links, contact, copyright
    MobileNav.jsx        # Bottom nav bar for mobile
  pages/
    Landing.jsx          # Main landing page
    Studio.jsx           # AI Visualizer + Cost Calculator
    About.jsx            # Team bios
    Community.jsx        # Events, involvement, connect
    Resources.jsx        # Guides, YouTube, sq ft game
    Newsletter.jsx       # Email signup
    Partners.jsx         # Supplier partnerships
public/
  favicon.svg            # SVG favicon (tile diamond design)
  pwa-192.png            # PWA icon 192x192
  pwa-512.png            # PWA icon 512x512
  apple-touch-icon.png   # iOS home screen icon
worker/
  src/index.js           # Cloudflare Worker — /generate endpoint
  wrangler.toml          # Worker config
```

## Config-Driven Architecture

**`src/config.js`** is the single source of truth. Edit it to change:

- Business name, phone, address, hours
- All CTA buttons and links (booking, email, phone)
- Navigation links
- Hero content, services, testimonials
- Team bios and photos
- Calculator pricing (materials, labor, margins, tax)
- Community events and involvement
- YouTube video IDs
- Supplier logos

## Commands

```bash
npm run dev              # Vite dev server
npm run build            # Production build -> dist/
npm run preview          # Preview production build
npm run lint             # ESLint

cd worker && npx wrangler dev    # Worker local dev
cd worker && wrangler deploy     # Deploy worker
```

## Worker Secrets

Set via `wrangler secret put` (these do NOT go in the frontend):

- `GEMINI_KEY` — Google Gemini API key
- `OPENAI_KEY` — OpenAI API key (fallback)

## Cloudflare Pages Setup

1. Connect this GitHub repo in Cloudflare Pages dashboard
2. Build command: `npm run build`
3. Output directory: `dist`
4. That's it — push to `master` = auto deploy

## Contact

- **Business:** All Things Flooring & Tile
- **Location:** 1245 College St, Eastman, GA 31023
- **Phone:** (478) 231-7935
- **Email:** kc@cerul.org
- **Hours:** Monday-Friday 8am-4pm
