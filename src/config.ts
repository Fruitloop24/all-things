/**
 * ============================================================================
 * SITE CONFIG — Edit this file to customize everything
 * ============================================================================
 *
 * One file. Change it here, it changes everywhere.
 * All pages and components import from this file.
 */

const R2 = 'https://social.cerul.org/all-thing/site-images'

export const CONFIG = {
  // ─── BRAND ───
  appName: 'All Things Flooring & Tile',
  tagline: 'Your Local Flooring Experts',
  yearStarted: 2009,
  trustCount: '2,500+',

  // ─── IMAGES (R2 CDN) ───
  images: {
    logo: `${R2}/logo-full.png`,
    logoTransparent: `${R2}/logo_transparent.png`,
    logoSmall: `${R2}/logo.jpg`,
    hero: `${R2}/hero.jpg`,
    floorSamples: `${R2}/floor-samples.jpg`,
    team: {
      ron: `${R2}/ron.jpg`,
      jamie: `${R2}/jamie-hat.png`,
      landin: `${R2}/landin.png`,
      gavin: `${R2}/gavin.png`,
    },
    projects: [
      { src: `${R2}/carpet-hardwood.png`, title: 'Living Room Hardwood', location: 'Dodge County' },
      { src: `${R2}/laminate-ceramic.png`, title: 'Kitchen Tile Transformation', location: 'Eastman, GA' },
      { src: `${R2}/bathroom-lam-tile.png`, title: 'Bathroom Luxury Vinyl', location: 'McRae-Helena' },
      { src: `${R2}/dining-carpet-hard.png`, title: 'Dining Room Hardwood', location: 'Eastman, GA' },
      { src: `${R2}/bed-carp-hardlam.png`, title: 'Master Suite Laminate', location: 'Cochran, GA' },
    ],
  },

  // ─── CONTACT ───
  phone: {
    raw: '4782317935',
    display: '(478) 231-7935',
    href: 'tel:4782317935',
  },
  address: {
    street: '1245 College St',
    city: 'Eastman',
    state: 'GA',
    zip: '31023',
    full: '1245 College St, Eastman, GA 31023',
    region: 'Eastman & Dodge County',
  },
  hours: {
    weekday: 'Monday – Friday: 8:00 AM – 4:00 PM',
    weekend: 'Saturday & Sunday: Closed',
  },

  // ─── CTA ───
  booking: 'https://calendar.app.google/jEpBKp2efYqVynnk6',
  cta: {
    primary: {
      text: 'Book a Free Estimate',
      href: 'https://calendar.app.google/jEpBKp2efYqVynnk6',
    },
    secondary: {
      text: 'Try Our Floor Visualizer',
      href: '/studio',
    },
    quote: {
      text: 'Book Your Free Quote',
      href: 'https://calendar.app.google/jEpBKp2efYqVynnk6',
    },
    call: {
      text: 'Call (478) 231-7935',
      href: 'tel:4782317935',
    },
    email: {
      text: 'Email Us',
      href: 'mailto:kc@cerul.org',
    },
    mobileCta: {
      text: 'Book a Free Estimate',
      href: 'https://calendar.app.google/jEpBKp2efYqVynnk6',
    },
  },

  // ─── NAVIGATION ───
  nav: [
    { to: '/', label: 'Home' },
    { to: '/studio', label: 'Design Studio' },
    { to: '/newsletter', label: 'Newsletter' },
    { to: '/about', label: 'About Us' },
    { to: '/community', label: 'Community' },
    { to: '/resources', label: 'Resources' },
    { to: '/partners', label: 'Partners' },
  ],
  mobileNav: [
    { to: '/', label: 'Home', icon: 'home' },
    { to: '/studio', label: 'Studio', icon: 'studio' },
    { to: '/community', label: 'Community', icon: 'community' },
    { to: 'tel:4782317935', label: 'Call', icon: 'phone', external: true },
  ],

  // ─── HERO ───
  hero: {
    badge: 'Serving Eastman & Dodge County Since 2009',
    headline: 'Your Local Flooring Experts in',
    headlineAccent: 'Eastman, GA',
    subheadline: 'We transform spaces with premium flooring — from hardwood and tile to luxury vinyl and carpet. Visit our showroom or get an instant AI-powered estimate online.',
    features: [
      { label: 'Free Estimates', icon: '📋' },
      { label: 'AI-Powered Quotes', icon: '🤖' },
      { label: 'Expert Installation', icon: '🔨' },
      { label: 'Tool Rental', icon: '🛠️' },
    ],
  },

  // ─── SERVICES ───
  services: {
    headline: 'Flooring for Every Space & Style',
    subheadline: "Whether you're renovating a single room or building from the ground up, we carry top-brand materials and provide expert installation.",
    items: [
      { title: 'Vinyl Flooring', desc: 'Waterproof luxury vinyl plank & tile — perfect for kitchens, baths, and busy households.', icon: 'sparkle' },
      { title: 'Hardwood', desc: 'Timeless solid and engineered hardwood with professional installation and finishing.', icon: 'grid' },
      { title: 'Carpet', desc: 'Soft, cozy wall-to-wall carpet and custom area rugs for bedrooms and living spaces.', icon: 'carpet' },
      { title: 'Tile & Stone', desc: 'Porcelain, ceramic, and natural stone for kitchens, bathrooms, entryways, and more.', icon: 'tile' },
      { title: 'VCT', desc: 'Commercial-grade vinyl composition tile — durable, affordable, and easy to maintain.', icon: 'commercial' },
      { title: 'Installation & Tool Rental', desc: 'Professional installation services plus tool rentals for the confident DIYer.', icon: 'tools' },
    ],
  },

  // ─── BEFORE / AFTER PROJECTS (Landing) ───
  beforeAfterProjects: [
    { title: 'Kitchen Tile Transformation', location: 'Eastman, GA', beforeLabel: 'Old Linoleum', afterLabel: 'Porcelain Herringbone', beforeColor: '#b8a99a', afterColor: '#8B7355', pattern: 'tile' },
    { title: 'Living Room Hardwood', location: 'Dodge County', beforeLabel: 'Worn Carpet', afterLabel: 'White Oak Hardwood', beforeColor: '#a89b8c', afterColor: '#6B4E2F', pattern: 'wood' },
    { title: 'Bathroom Luxury Vinyl', location: 'McRae-Helena', beforeLabel: 'Damaged Tile', afterLabel: 'Waterproof LVP', beforeColor: '#9e9589', afterColor: '#7A6B5D', pattern: 'plank' },
  ],

  // ─── TESTIMONIALS ───
  testimonials: [
    { name: 'Sarah Mitchell', location: 'Eastman, GA', text: 'They transformed our entire first floor with beautiful hardwood. The team was professional, on time, and the result is absolutely stunning. Could not be happier!', rating: 5, project: 'Whole-Home Hardwood' },
    { name: 'James & Linda Price', location: 'Dodge County', text: "Best tile work we've ever seen. Our kitchen backsplash and floor are works of art. Highly recommend All Things Flooring to anyone in the area!", rating: 5, project: 'Kitchen Remodel' },
    { name: 'Marcus Thompson', location: 'McRae-Helena', text: "The luxury vinyl they installed in our rental properties looks amazing and is incredibly durable. Great value and the fastest turnaround of any contractor we've used.", rating: 5, project: 'Multi-Unit LVP Install' },
    { name: 'Donna Wilkes', location: 'Eastman, GA', text: 'Rented a tile saw and got amazing advice from the staff. Even as a DIYer they made me feel welcome. Will definitely be back for our next bathroom project.', rating: 5, project: 'DIY Bathroom Tile' },
    { name: 'Robert & Kim Chen', location: 'Cochran, GA', text: "From the estimate to the final walk-through, everything was seamless. The AI estimate tool on their website was spot-on with the final invoice. Incredible experience.", rating: 5, project: 'Living Room & Hallway' },
  ],

  // ─── SUPPLIERS ───
  suppliers: [
    { name: 'Shaw Floors', logo: `${R2}/Shaw-Floors-Logo-Vector.svg-.webp` },
    { name: 'Mohawk Industries', logo: `${R2}/mohawk.webp` },
    { name: 'Armstrong Flooring', logo: `${R2}/armstrong-logo.webp` },
    { name: 'Daltile', logo: `${R2}/daltile-logo-png_seeklogo-377089.webp` },
    { name: 'COREtec', logo: `${R2}/COREtec-FLOORS_logo_Q.webp` },
  ],

  // ─── SOCIAL LINKS ───
  // Set href to a real URL to enable. Anything left as '#' is hidden everywhere.
  // facebookGroup is the join-our-community link (separate from main page).
  socials: [
    {
      name: 'Facebook',
      handle: 'All Things Flooring & Tile',
      href: 'https://www.facebook.com/profile.php?id=61556405672441',
      brandColor: '#1877F2',
      icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
    },
    {
      name: 'Instagram',
      handle: '@all_things_flooring_tile',
      href: 'https://www.instagram.com/all_things_flooring_tile/',
      brandColor: '#E1306C',
      icon: 'M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm4.5-7.5a1 1 0 110-2 1 1 0 010 2z',
    },
    {
      name: 'TikTok',
      handle: '@all_things_flooring_tile',
      href: 'https://www.tiktok.com/@all_things_flooring_tile',
      brandColor: '#010101',
      icon: 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43V8.55a8.16 8.16 0 004.77 1.52V6.69h-1.84z',
    },
  ],
  facebookGroup: '#', // Join our community link — replace with real Facebook Group URL (different from main page)

  // ─── GOOGLE MAP EMBED (showroom location) ───
  // Free embed, no API key needed. Update if address changes.
  mapEmbed: 'https://maps.google.com/maps?q=1245+College+St,+Eastman,+GA+31023&t=&z=15&ie=UTF8&iwloc=&output=embed',
  mapDirections: 'https://www.google.com/maps/dir/?api=1&destination=1245+College+St,+Eastman,+GA+31023',

  // ─── SHOWROOM SECTION ───
  showroom: {
    headline: 'Visit Our Showroom in Eastman',
    subheadline: 'See and feel hundreds of flooring samples in person. Our team is ready to help you pick the perfect floor and provide a free, no-obligation estimate.',
    aiBadge: 'Invoice Ninja AI — Get an instant estimate 24/7 from our website',
  },

  // ─── TEAM ───
  team: {
    management: [
      {
        name: 'Ron Whittington',
        role: 'Sales & Showroom',
        initials: 'RW',
        photo: 'ron',
        bio: "Born and raised right here in Eastman. Ron's been in the flooring business for decades and knows every product in the showroom inside and out. When he's not helping customers find the perfect floor, you'll find him at church, coaching up the next generation, or spending time with his daughter. A lifelong Georgia Bulldogs fan — and he won't let you forget it.",
        funFact: 'Go Dawgs!',
      },
      {
        name: 'Jamie Fordham',
        role: 'Sales & Installation',
        initials: 'JF',
        photo: 'jamie',
        bio: "Another Eastman original. Jamie grew up playing baseball for the Dodge County Indians and never left — because why would you? He knows flooring like he knows a fastball: get it right, get it done, and make it look good. Family man, ballgame regular, and the guy who'll give you the honest answer even if it's not the expensive one. Fair warning: he pulls for Alabama. Nobody's perfect.",
        funFact: 'Roll Tide (sorry)',
      },
    ],
    crew: [
      {
        name: 'Landin Fordham',
        role: 'Installation',
        initials: 'LF',
        photo: 'landin',
        bio: "Jamie's oldest. Landin grew up on job sites and played baseball at DCHS just like his dad. He brings precision to every install — tile, hardwood, LVP, you name it. Quiet worker, loud results. And yes, by some unfortunate twist of fate, he also pulls for Alabama.",
        funFact: 'DCHS Baseball alum',
      },
      {
        name: 'Gavin Fordham',
        role: 'Installation',
        initials: 'GF',
        photo: 'gavin',
        bio: "The youngest Fordham on the crew but don't let that fool you — Gavin's been helping his dad install floors since before he could drive. Another DCHS ballplayer with a serious work ethic and an eye for the details that matter. The Alabama thing? Blame Jamie.",
        funFact: 'Blame his dad',
      },
    ],
  },

  // ─── COMMUNITY PAGE ───
  community: {
    headline: 'More Than Floors',
    subheadline: 'We live here. We worship here. We coach little league here. All Things Flooring & Tile is proud to be part of the fabric of Dodge County.',
    quote: "We don't just lay floors in this community — we raise up families, build up churches, and pour into the next generation.",
    quoteAuthor: 'Ron Whittington, Sales & Showroom',
    involvement: [
      { icon: '⛪', title: 'Houses of Worship', desc: 'Donated flooring and discounted installation for churches across Dodge County and beyond.' },
      { icon: '⚾', title: 'Youth Sports', desc: 'Proud sponsor of Dodge County rec league baseball, football, and basketball. Every kid deserves a shot.' },
      { icon: '🏠', title: 'Habitat for Humanity', desc: 'Partnering with Heart of Georgia Habitat to provide flooring for families getting their first home.' },
      { icon: '🎓', title: 'Dodge County Schools', desc: 'Career day talks, supply donations, and mentoring students interested in the trades.' },
    ],
    events: [
      { date: 'April 2026', title: 'Dodge County Rec League Opening Day', desc: 'Come out to the fields and look for our banner behind home plate. Stop by and say hey!', icon: '⚾' },
      { date: 'May 2026', title: 'New Hope Baptist VBS Flooring Project', desc: "Donating new flooring for the children's wing just in time for Vacation Bible School.", icon: '⛪' },
      { date: 'June 2026', title: 'Heart of Georgia Habitat Build Day', desc: "Laying floors in a new Habitat home in Telfair County. Volunteers welcome — no experience needed.", icon: '🏠' },
      { date: 'August 2026', title: 'Back to School Supply Drive', desc: 'Drop off school supplies at our shop on College St and we\'ll deliver them to Dodge County Elementary.', icon: '🎒' },
      { date: 'September 2026', title: 'Dodge County Football Season Kickoff', desc: 'Proud sponsor of Dodge County Indians football. See you under the Friday night lights!', icon: '🏈' },
      { date: 'November 2026', title: 'Thanksgiving Food & Supply Drive', desc: 'Collecting canned goods and household supplies for families in need across Dodge County.', icon: '🍂' },
    ],
  },

  // ─── FAQ (homepage + JSON-LD schema) ───
  faqs: [
    {
      q: 'Do you offer free estimates?',
      a: "Yes — every estimate is free and no-obligation. Book online or give us a call and we'll come measure, answer your questions, and give you a straight-up price with no pressure.",
    },
    {
      q: 'What areas do you serve?',
      a: 'We serve Eastman, Dodge County, McRae-Helena, Cochran, Telfair County, and surrounding Middle Georgia communities. Not sure whether we cover your area? Just call us at (478) 231-7935.',
    },
    {
      q: 'What types of flooring do you install?',
      a: 'Hardwood, luxury vinyl plank (LVP), tile and stone, carpet, laminate, and commercial VCT. Whole-home or single-room, residential or commercial — we handle it.',
    },
    {
      q: 'Can I see what new floors will look like in my room before I buy?',
      a: "Yes — and we're the only flooring store in the area that can do this. Our free AI Room Visualizer lets you upload a photo of your room, pick a floor, and see it installed instantly. Try it on our Design Studio page.",
    },
    {
      q: 'How long does flooring installation usually take?',
      a: "Most single-room jobs are done in 1-2 days. Whole-house installs typically run 3-7 days depending on size, material, and subfloor prep. We'll give you an exact timeline with your written estimate.",
    },
    {
      q: 'Do you remove old flooring and handle subfloor prep?',
      a: 'Absolutely. We handle demo, haul-off, leveling, and any subfloor prep needed before the new floor goes down. Everything is itemized on your estimate — no hidden fees, no surprises.',
    },
    {
      q: 'What flooring brands do you carry?',
      a: 'We carry Shaw Floors, Mohawk, Armstrong, Daltile, COREtec, and more top-tier brands. Come by the Eastman showroom to see and feel hundreds of samples in person.',
    },
    {
      q: 'Do you rent tools for DIY projects?',
      a: "Yes — we rent professional flooring tools like tile saws, nailers, and rollers. Stop by the showroom and we're happy to give you DIY advice while you're picking up what you need.",
    },
  ],

  // ─── STUDIO PAGE FAQ ───
  studioFaqs: [
    {
      q: 'Is the AI Room Visualizer really free?',
      a: "Yes — completely free, no signup, no email required. Upload a photo, pick a floor, and see your room transformed in about 15-30 seconds.",
    },
    {
      q: 'How accurate is the AI render?',
      a: "Very — but it's a visualization, not a final spec. The AI shows you what the floor type, color, and pattern will look like in your space. The real floors will match the look but exact wood grain, tile veining, and lighting will vary slightly.",
    },
    {
      q: 'How accurate is the cost calculator?',
      a: "Our calculator uses real local pricing for materials and labor in Middle Georgia. Most projects come in at or below the low end of the estimate. For a final, exact quote we'll come measure your space — book a free estimate and we'll lock it in.",
    },
    {
      q: 'What kind of room photo gives the best result?',
      a: "A well-lit photo taken from about head height showing as much floor space as possible. Avoid heavy shadows or cluttered floors. Phone cameras work great — no fancy gear needed.",
    },
    {
      q: 'Can I save or share my visualizer result?',
      a: "Yes — after generating, hit Save Image to download the result, or Share to send it to friends, your contractor, or post it. Share it on Facebook or Instagram and tag us!",
    },
    {
      q: 'Do I have to buy from you to use this?',
      a: "Nope — the tool is free for anyone. We built it because we want folks in Eastman and Dodge County to feel confident about their flooring decisions. That said, if you like what you see, give us a call — we'd love to install it for you.",
    },
  ],

  // ─── RESOURCES PAGE ───
  resources: {
    youtube: [
      { id: 'p0WgkJG-B_Y', title: 'How to Calculate Square Footage', channel: 'YouTube' },
      { id: 'gQKhj-VmiHk', title: 'Odd-Shaped Rooms — Measuring Sq Ft', channel: 'YouTube' },
      { id: 'WOjKCK16FBE', title: 'Types of Flooring Explained', channel: 'YouTube' },
    ],
  },

  // ─── FOOTER ───
  footer: {
    tagline: "Eastman, Georgia's trusted source for premium flooring solutions. From hardwood to tile, we bring your vision to life.",
    links: [
      { label: 'Home', to: '/' },
      { label: 'Design Studio', to: '/studio' },
      { label: 'Newsletter', to: '/newsletter' },
      { label: 'About Us', to: '/about' },
      { label: 'Community', to: '/community' },
      { label: 'Resources', to: '/resources' },
      { label: 'Partners', to: '/partners' },
    ],
  },

  // ─── DESIGN STUDIO ───
  studio: {
    workerUrl: 'https://room-studio-worker.k-c-sheffield012376.workers.dev',
    suggestions: [
      'Warm honey oak hardwood',
      'Light gray vinyl plank',
      'Dark walnut wide plank',
      'White marble tile',
      'Soft cream carpet',
      'Rustic hickory',
      'Herringbone oak',
      'Slate gray tile',
    ],
  },

  // ─── CALCULATOR PRICING ───
  pricing: {
    margin: 0.30,
    taxRate: 0.08,
    taxName: 'GA Sales Tax',
    minJobCharge: 500,
    floorTypes: {
      hardwood: { label: 'Hardwood', icon: '🌳', waste: 0.10, material: 4.50, labor: 3.00, perSqft: { underlayment: 0.50, finish: 1.50 } },
      tile: { label: 'Tile', icon: '🔲', waste: 0.12, material: 3.00, labor: 4.00, perSqft: { thinset: 0.35, backerboard: 0.75, grout: 0.30 }, patternUpcharge: 0.20 },
      laminate: { label: 'Laminate', icon: '📋', waste: 0.08, material: 2.50, labor: 1.75, perSqft: { underlayment: 0.35 } },
      lvp: { label: 'LVP', icon: '🪵', waste: 0.08, material: 3.25, labor: 2.00, perSqft: { underlayment: 0.30 } },
      carpet: { label: 'Carpet', icon: '🧶', waste: 0.10, material: 2.75, labor: 1.50, perSqft: { pad: 0.65 } },
    },
    prep: { demo: 1.25, haulOff: 150, leveling: 1.75, furnitureMove: 50 },
    extras: {
      doorwayTransition: 25, baseboard: { material: 1.10, labor: 1.50 },
      quarterRound: { material: 0.55, labor: 0.75 }, toiletPull: 75,
    },
  },

  // ─── ROOM PRESETS (calculator) ───
  roomPresets: [
    { name: 'Living Room', emoji: '🛋️', w: 15, l: 20 },
    { name: 'Kitchen', emoji: '🍳', w: 12, l: 14 },
    { name: 'Bathroom', emoji: '🚿', w: 8, l: 10 },
    { name: 'Bedroom', emoji: '🛏️', w: 14, l: 16 },
  ],
}
