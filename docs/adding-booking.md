# Adding the Booking Flow to a New Site

Copy-paste recipe for wiring the Cerul stateless-2-endpoint booking flow into a new contractor site (Astro + Preact + Tailwind). All Things Flooring & Tile was the prototype; this captures everything that would have made it a one-pass job instead of four contract revisions.

---

## Architecture in one paragraph

`/book` page renders a Preact island. Customer fills name/phone/email/address + preferred date + AM/PM/Anytime + optional message → island POSTs `/public/book/request` to Cerul Hetzner backend → backend returns 3 open slots OR `{handoff: true}` after 6 rejected (2 rounds × 3) → customer picks one → island POSTs `/public/book/confirm` → 201 booked or 409 race-with-`new_slots`. Two endpoints. Pure functions. No `lead_id`, no DB rows for incomplete leads ("if they bail mid-form, fuck it"). Server handles the 📞 CALL handoff event + Web Push to contractor internally on the second rejection round — frontend never POSTs a separate callback.

---

## Cerul side — ask the AI/operator to do this first

1. **Tenant config** in `cerul-scheduler` D1:
   ```sql
   -- Working hours per crew member
   UPDATE tenants SET config = json_set(config, '$.booking.working_hours',
     json('{"mon":"08:00-16:00","tue":"08:00-16:00","wed":"08:00-16:00","thu":"08:00-16:00","fri":"08:00-16:00","sat":null,"sun":null}'))
   WHERE id IN ('web-<crew-1>', 'web-<crew-2>');

   -- Booking URL — drives the + → Book Estimate pinned action in the cockpit
   UPDATE tenants SET config = json_set(config, '$.booking_url', 'https://<new-site>.com/book')
   WHERE id IN ('web-<crew-1>', 'web-<crew-2>');

   -- Display name override for slot labels (optional — defaults to id-extraction)
   UPDATE tenants SET config = json_set(config, '$.crew_name', 'Ron') WHERE id = 'web-<crew-1>';
   ```
2. **CORS allowlist** added on the Cerul server for: production domain (+ `www.`), `*.<site>.pages.dev` for CF previews, `http://localhost:4321` for dev.
3. Confirm the tenant exists and `source_site` routes to it correctly.

---

## Site side — checklist

### 1. `src/config.ts`

```ts
booking: '/book',
bookingApi: {
  base: 'https://hetzner.cerul.org',
  sourceSite: '<new-site>.com',          // exactly what server expects in source_site field
  hoursLabel: 'Mon – Fri · 8 AM – 4 PM', // shown on the form
  requestPath: '/public/book/request',
  confirmPath: '/public/book/confirm',
},
cta: {
  primary:   { text: 'Book a Free Estimate', href: '/book' },
  quote:     { text: 'Book Your Free Quote', href: '/book' },
  mobileCta: { text: 'Book a Free Estimate', href: '/book' },
  // ...
},
```

### 2. `public/_headers` — CSP `connect-src`

Add `https://hetzner.cerul.org` to `connect-src`. **Without this the browser blocks the fetch before it ever leaves, even with CORS green server-side.** This was the #1 thing I almost shipped broken.

```
connect-src 'self' https://hetzner.cerul.org;
```

### 3. Strip `target="_blank"` from booking CTAs

Find every site link pointing to the booking CTA and remove the `target="_blank" rel="noopener noreferrer"` — it's an internal route now, opening in a new tab is broken UX. Grep:

```bash
grep -rn 'target="_blank"' src/ | grep -v 'href={CONFIG.mapDirections' | grep -v socials
```

Confirm the only `target="_blank"`s left are external maps / social links.

### 4. Copy two files

- `src/pages/book.astro` — page shell (hero + form section + "rather just talk" fallback). Uses `CONFIG.team.management[0]/[1]` for sales-rep names; tweak if the new site's team structure differs.
- `src/components/BookingForm.tsx` — the island. Should work as-is once `CONFIG.bookingApi` is set right.

### 5. Build + smoke-test

```bash
npm run build                # confirm types are clean, /book/index.html emits
npm run dev                  # http://localhost:4321/book
```

Open the form in the browser. Submit. Network tab should show:
- `POST hetzner.cerul.org/public/book/request` → 200 with `slots` array (or `handoff: true`)
- Pick a slot → `POST .../public/book/confirm` → 201 with `confirmation_message`

---

## The contract (current as of 2026-05-16)

Base: `https://hetzner.cerul.org`. Two endpoints, stateless, no `lead_id`.

### `POST /public/book/request`

```jsonc
{
  "source_site": "...",                                  // routes to tenant
  "name": "Jane Doe",
  "phone": "555-1234",                                   // either phone OR email required
  "email": "jane@x.com",
  "address": "123 Main St, ...",
  "message": "",                                         // empty string fine
  "preferred_start_iso": "2026-06-03T13:00:00Z",         // defaults to now+1h
  "duration_minutes": 60,                                // defaults to 60
  "exclude_slot_ids": []                                 // populate on retry
}
```

**Response 200 (slots available):**
```jsonc
{
  "slots": [
    {
      "slot_id":       "web-ron-whittington::2026-06-03T13:00:00Z",
      "starts_at":     "2026-06-03T13:00:00Z",
      "ends_at":       "2026-06-03T14:00:00Z",
      "worker_name":   "Ron",
      "display_label": "Tue Jun 3 · 1:00 PM with Ron"
    } // x3
  ]
}
```

**Response 200 (handoff — after 2 rejected rounds OR fully booked 14d out):**
```jsonc
{
  "handoff": true,
  "handoff_message": "Thanks Jane — Ron will personally call you within 24 hours...",
  "slots": []
}
```
Server has already created the 📞 CALL event + pushed the contractor. Frontend just renders the message.

### `POST /public/book/confirm`

```jsonc
{
  "source_site": "...",
  "name": "Jane Doe", "phone": "...", "email": "...", "address": "...", "message": "",
  "slot_id": "web-ron-whittington::2026-06-03T13:00:00Z",
  "title": "LVP estimate",       // optional, server defaults
  "duration_minutes": 60         // optional
}
```

**Response 201 (booked):**
```jsonc
{ "ok": true, "event": {...}, "confirmation_message": "..." }
```

**Response 200 (race — slot taken between request and confirm):**
```jsonc
{ "ok": false, "reason": "slot_taken", "new_slots": [...x3] }
```

---

## Gotchas from the All Things build

- **CSP `connect-src`** is the silent killer — browser blocks fetches before they leave, no CORS error visible. Add the Cerul domain to `_headers` *and* test in production-equivalent (not just `npm run dev`, which often runs without CSP).
- **`slot_id` is a composite key** (`crew_id::iso`), not the same as `starts_at`. Use `slot_id` on `exclude_slot_ids` and on `/confirm`. Don't try to reconstruct it from other fields.
- **`display_label` already includes the worker name** — don't render a separate "with {worker_name}" subtext, you'll get duplication.
- **Accumulate `exclude_slot_ids` across rounds** — server's handoff threshold is `length >= 6` (cumulative). If you only send the most recent batch, handoff never fires.
- **No retry counting on the client.** The server owns the handoff decision via the threshold check. Trust the `handoff` flag.
- **No `lead_id` at all** — frontend re-sends customer info on `/confirm`. State lives in the form component. Server is a pure function.
- **`preferred_window` is NOT a payload field** — only `preferred_start_iso`. Encode morning/afternoon by setting the hour in the ISO (8am vs 1pm). The UI control is local-only.
- **Phone AND email both required client-side** even though contract allows either. Saves server an either-or branch and gives the contractor two contact channels.
- **HTTP status codes matter** — 201 = booked, 200 + `ok: false` = race, 400 = validation, 200 + `handoff: true` = handoff. Don't conflate.
- **Both phone and email always non-empty** when payload arrives at server — guarantee from client-side validation.

---

## Files this touches (for `git status` sanity check)

```
modified:   src/config.ts                  # add bookingApi + flip cta hrefs
modified:   src/components/Header.astro    # strip target=_blank on booking CTA
modified:   src/pages/index.astro          # strip target=_blank on booking CTAs (4 spots)
modified:   src/pages/about.astro          # same
modified:   src/pages/partners.astro       # same
modified:   src/pages/resources.astro      # same
modified:   public/_headers                # connect-src: + hetzner.cerul.org
new:        src/pages/book.astro
new:        src/components/BookingForm.tsx
```
