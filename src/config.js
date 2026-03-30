/**
 * ============================================================================
 * SITE CONFIG — Edit this file to customize everything
 * ============================================================================
 *
 * One file. Change it here, it changes everywhere.
 * All pages and components import from this file.
 */

const R2 = 'https://pub-f2cd6c5142ad4f2aacad0d8e2f818744.r2.dev/all-thing/site-images'

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
    raw: '4783412204',
    display: '(478) 341-2204',
    href: 'tel:4783412204',
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
  booking: 'https://calendar.app.google/LjFfVnMG14BtDwGo9',
  cta: {
    primary: {
      text: 'Book a Free Estimate',
      href: 'https://calendar.app.google/LjFfVnMG14BtDwGo9',
    },
    secondary: {
      text: 'Try Our Floor Visualizer',
      href: '/studio',
    },
    quote: {
      text: 'Book Your Free Quote',
      href: 'https://calendar.app.google/LjFfVnMG14BtDwGo9',
    },
    call: {
      text: 'Call (478) 341-2204',
      href: 'tel:4783412204',
    },
    email: {
      text: 'Email Us',
      href: 'mailto:kc@cerul.org',
    },
    mobileCta: {
      text: 'Book a Free Estimate',
      href: 'https://calendar.app.google/LjFfVnMG14BtDwGo9',
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
    { to: 'tel:4783412204', label: 'Call', icon: 'phone', external: true },
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
  socials: [
    { name: 'Facebook', href: '#', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
    { name: 'Instagram', href: '#', icon: 'M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm4.5-7.5a1 1 0 110-2 1 1 0 010 2z' },
    { name: 'TikTok', href: '#', icon: 'M12 2a1 1 0 011 1v13a2 2 0 11-3.5-1.3V8h-3v7a5 5 0 109-3V5a5 5 0 004 2V4a1 1 0 01-1-1h-6.5z' },
    { name: 'YouTube', href: '#', icon: 'M19.6 3.2H4.4A2.4 2.4 0 002 5.6v12.8a2.4 2.4 0 002.4 2.4h15.2a2.4 2.4 0 002.4-2.4V5.6a2.4 2.4 0 00-2.4-2.4zM10 15.5v-7l5.2 3.5L10 15.5z' },
  ],

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
