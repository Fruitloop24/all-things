# All Things Flooring & Tile — TODO

Last updated: 2026-05-16

## Overall status

**Site is live, indexed, and structurally sound.** Google has all 7 pages indexed, Bing has the sitemap, structured data is rich, security headers are in place, all H1s present, alt text on every image. The fundamentals are done. What's left is local-SEO depth (town pages, Service schema), share polish (OG image), and one infrastructure fix (R2 custom domain).

---

## Booking flow — PICK UP HERE TOMORROW (2026-05-16 EOD state)

**What shipped today (commits `4c52958` + `9be3a2b` on master, auto-deployed by CF Pages):**
- `/book` page replaces the old Google Calendar deep link site-wide.
- Astro shell (`src/pages/book.astro`) + Preact island (`src/components/BookingForm.tsx`) wired to Cerul's stateless 2-endpoint contract: `POST hetzner.cerul.org/public/book/{request,confirm}`.
- All 8 booking CTAs flipped to internal `/book` (Header, index ×4, about, partners, resources). `target="_blank"` stripped — internal now.
- `CONFIG.bookingApi` block in `src/config.ts` (base URL, source_site, paths, hoursLabel).
- CSP `connect-src` extended to `hetzner.cerul.org` + Google Fonts (fixes a separate workbox-precache noise that was unrelated to booking).
- `docs/adding-booking.md` — full playbook for porting this same flow to the next contractor site. Includes the contract, the file diffs, the tenant SQL pattern, and every gotcha hit across the four contract iterations. Read this first if doing anything booking-related.

**Where we left off — what to test in the morning:**
- [ ] **CORS still failing in production at last check.** Browser console showed `No 'Access-Control-Allow-Origin' header is present` on the OPTIONS preflight to `/public/book/request`. Cerul side hadn't fully deployed when we tested, so revisit first thing — likely just needs their server-side deploy to land.
   - Quick verify command: `curl -i -X OPTIONS https://hetzner.cerul.org/public/book/request -H "Origin: https://allthingsflooringntile.com" -H "Access-Control-Request-Method: POST" -H "Access-Control-Request-Headers: Content-Type"` — should see `Access-Control-Allow-Origin: https://allthingsflooringntile.com` in the response.
- [ ] **End-to-end smoke test on the live site** once CORS is green: open https://allthingsflooringntile.com/book , fill form, watch Network tab for `request` → slots → `confirm` → 201. Confirm the `📞 CALL` event shows up on Ron's/Jamie's dashboard when you reject 6 slots.
- [ ] **Localhost dev option** if Cerul still isn't ready: `npm run dev` → http://localhost:4321/book . Cerul's allowlist already includes `localhost:4321` per the contract.

**Notes that bit us today, don't re-litigate:**
- Two endpoints only, not three — there's no separate `/callback`. Server creates the 📞 CALL event internally on the second rejection round (when `exclude_slot_ids.length >= 6`) and returns `handoff: true` in the same `/request` response. Don't reintroduce a client-side callback POST.
- `slot_id` is a composite key (`crew_id::iso`), NOT the same as `starts_at`. Use `slot_id` on both `exclude_slot_ids` and `/confirm`. Server v4 contract was explicit about this.
- No `lead_id` — frontend resends full customer info on `/confirm`. Pure-function backend, no DB row for incomplete leads. If the customer bails mid-form, nothing exists. That's intentional ("fuck it, can't do it all for them" — owner's words).

---

## P0 — Image hosting (DONE 2026-05-08)

- [x] **Switched R2 host from `pub-f2cd6c5142ad4f2aacad0d8e2f818744.r2.dev` to `social.cerul.org`.**
  - Custom domain was already bound on the `cerul-social-media` bucket.
  - Updated `src/config.ts` line 10 and `public/_headers` `img-src`.
  - Why: the public dev URL is rate-limited (per CF console), gets blocked by privacy filter lists in strict browser modes, and Cloudflare explicitly recommends a custom domain for production.

---

## SEO — high ROI, unblocked

### 1. 1200×630 OG share image
- [ ] Create `public/og-image.jpg` (1200×630, ~150 KB). Logo + tagline + a flooring shot.
- [ ] Update `src/layouts/Base.astro` to default `ogImage` to `/og-image.jpg` instead of `/pwa-512.png`.
- [ ] Add `og:image:alt` and `og:image:width`/`height` for completeness.
- Why: current OG image is a 512×512 PWA icon — Facebook/iMessage/LinkedIn previews crop it to a tiny logo. Single asset swap, big visible win on shares.

### 2. Per-town landing pages (not blocked by GBP)
- [ ] Build `src/pages/service-area/[town].astro` dynamic route with town list in `src/config.ts` (Eastman, McRae-Helena, Cochran, Hawkinsville, Chauncey, Dublin, Rhine, Milan, Cadwell, Abbeville).
- [ ] Each page: unique H1, town-specific copy paragraphs, list of services + local landmarks/neighborhoods, `Service` JSON-LD with `areaServed: { "@type": "City", name: town }`, contextual links to /studio and /partners.
- [ ] `src/pages/service-area/index.astro` hub that links to all towns.
- [ ] Add to sitemap (auto via @astrojs/sitemap).
- [ ] Internal-link from home page footer or a "We serve" strip.
- Why: biggest organic-rank lever for a local trade. GBP block is for off-site directories (NAP consistency); on-site town pages are independent of that and reusable as a template for other small-town clients.

### 3. Service schema + BreadcrumbList
- [ ] One `Service` JSON-LD entity per offering: Hardwood, LVP, Tile, Carpet, Refinishing, VCT, Tool Rental. Live on `/` (or split per page if expanded).
- [ ] `src/components/SchemaBreadcrumb.astro` component, accept `items` prop, drop on every non-home page.
- Why: rich-result eligibility, SERP shows breadcrumb path instead of raw URL.

### 4. Image performance
- [ ] Set explicit `width` and `height` on every `<img>` in `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/partners.astro`. Eliminates CLS — Core Web Vitals ranking factor.
- [ ] Re-upload project photos to R2 as WebP (currently PNG, ~8–9 MB each — that's the LCP killer):
  - `carpet-hardwood.png` → `.webp`
  - `laminate-ceramic.png` → `.webp`
  - `bathroom-lam-tile.png` → `.webp`
  - `dining-carpet-hard.png` → `.webp`
  - `bed-carp-hardlam.png` → `.webp`
  - Then update `src/config.ts` `images.projects[].src` extensions.
- Why: ~42 MB of project photos right now, even on a fast connection that's a slow LCP. WebP at 70–80% quality usually drops to <500 KB each with no visible quality loss.

### 5. Internal linking
- [ ] Add 3–5 contextual in-body links from `/` to deeper pages (Resources, Community, About). Currently only `/studio` is linked from the body.
- Why: crawlers weight in-body anchor text more than nav repetition. Distributes page authority better.

### 6. Polish
- [ ] Drop a 32×32 `favicon.ico` at `public/favicon.ico`. Some bots/old crawlers fetch `.ico` and 404.
- [ ] Consider `twitter:site` once a handle exists.

---

## SEO — BLOCKED on Google Business Profile

Per memory: Matt Oxley owns the "& Tile" GBP listing; team operating under "N Tile" variant. **Do not start directory submissions until GBP name is locked** — NAP inconsistency hurts local rank.

Once unblocked (single batch, in this order):

- [ ] GBP video verification (single continuous take, showroom + shop walkthrough, sign visible, name + address spoken). Team has TikTok video chops — easy.
- [ ] Bing Places, Apple Maps, Facebook Business, Yelp, BBB, Angi, HomeAdvisor, Nextdoor, Dodge County Chamber.
- [ ] Supplier "find a dealer" backlinks (Shaw, Mohawk, Daltile, COREtec).
- [ ] Embed Google Reviews + reach out for review collection.

---

## Content — placeholders to replace

- [ ] Project before/after images on `/` — `src/config.ts` `landing.beforeAfterProjects[]` uses color/pattern placeholders. Swap to real photos when available.
- [ ] Community events — `src/config.ts` `community.events[]` are plausible placeholders. Replace with confirmed sponsorships.
- [ ] `facebookGroup` in `src/config.ts` (line 185) still `'#'` — replace with real group URL once created.

---

## Already done (reference)

- ✅ All 7 pages indexed by Google (per memory 2026-04-23)
- ✅ Bing sitemap submitted at `https://allthingsflooringntile.com/sitemap-index.xml`
- ✅ H1 on every page incl. `/studio` (fixed 2026-04-23 — Bing's only flagged gap)
- ✅ `HomeAndConstructionBusiness` JSON-LD with full `areaServed` (10 cities + 6 counties), `sameAs`, `geo`, `openingHours`, `priceRange`
- ✅ `FAQPage` JSON-LD on `/studio` (closes Bing thin-content gap)
- ✅ Canonical + trailing-slash 308 redirect (`/about` → `/about/`)
- ✅ OG + Twitter meta on every page (size of OG image is the only remaining issue)
- ✅ Geo meta tags (`geo.region`, `geo.position`, `ICBM`)
- ✅ `robots.txt` + sitemap-index + sitemap-0
- ✅ HSTS, X-Content-Type-Options, Permissions-Policy, full CSP (`public/_headers`)
- ✅ `frame-src` includes Google Maps (fixed 2026-05-08)
- ✅ Footer social links wired (Facebook, Instagram, TikTok)
- ✅ `www` → apex 301
- ✅ Image alt text on every `<img>` (decorative hero correctly empty)
