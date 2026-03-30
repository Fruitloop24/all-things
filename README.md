# All Things Flooring & Tile

Website for All Things Flooring & Tile — Eastman, GA.
React + Vite + Tailwind CSS 4, deployed on Cloudflare Pages.

## Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/pages/Landing.jsx` | Hero, services, before/after, testimonials, showroom CTA |
| `/studio` | `src/pages/Studio.jsx` | AI Visualizer (Gemini image edit) + Cost Calculator (real pricing) |
| `/community` | `src/pages/Community.jsx` | Project gallery with filters, share-your-project form |

## Config-Driven Architecture

**`src/config.js`** — single source of truth for the entire site.
Change business name, phone, address, hours, CTAs, pricing, testimonials, etc. in one place.

All components import from config:
- `src/components/Header.jsx` — nav links, phone, business name
- `src/components/Footer.jsx` — links, contact, copyright
- `src/components/MobileNav.jsx` — bottom nav, phone link
- `src/pages/Landing.jsx` — hero, testimonials, suppliers, showroom details
- `src/pages/Studio.jsx` — worker URL, pricing tables, suggestions, CTAs
- `src/pages/Community.jsx` — social links, page copy

### Swapping CTAs to a scheduler

In `src/config.js`, update `cta.primary.href`, `cta.quote.href`, `cta.mobileCta.href`, and `mobileNav[3].to` from `tel:` links to a scheduler URL (Calendly, Cal.com, etc.). That's it.

## Cloudflare Worker

**`worker/src/index.js`** — single `/generate` POST endpoint.

Flow: upload room + flooring to R2 → Gemini 2.5 Flash scans both → Gemini 2.5 Flash Image edits room with new floor + warm lighting → saves to R2 → returns base64 image.

- R2 bucket: `cerul-social-media` (folders: `all-thing/uploads/`, `all-thing/downloads/`)
- Falls back to OpenAI if Gemini fails
- Deploy: `cd worker && wrangler deploy`

## Calculator

Real pricing from `flooring-config.json` (30% margin, 8% GA tax on materials only).
5 floor types with per-type extras. DIY mode hides labor/service questions. Shows price range with disclaimer.

## Status / TODO

- [x] AI Visualizer — working end-to-end
- [x] Cost Calculator — rebuilt with real pricing, DIY/Pro toggle, per-type questions
- [x] Config-driven architecture — `src/config.js` created, all components wired up
- [ ] Verify build after config refactor (need to test build)
- [ ] Swap CTA links to scheduler URL
- [ ] Remove `react-compare-slider` from Landing.jsx (replace with real project photos)
- [ ] Social links — update with real URLs
- [ ] PWA setup

## Dev

```bash
npm run dev          # start dev server
cd worker && npx wrangler dev   # worker dev
```
