/**
 * ============================================================================
 * SITE CONFIG: Edit this file to customize everything
 * ============================================================================
 *
 * One file. Change it here, it changes everywhere.
 * All pages and components import from this file.
 */

const R2 = 'https://social.cerul.org/all-thing/site-images'
const WORK = `${R2}/work`

// ─── TYPES ───
/** A real job photo on R2. w/h are the file's pixel size (keeps layout stable). */
export interface Photo {
  src: string
  alt: string
  w: number
  h: number
}

export interface PriceRange {
  low: number
  high: number
}

/**
 * Cabinet pricing for the Cabinet Planner. Waiting on Ron's numbers.
 * While CONFIG.cabinets.pricing is null the planner shows NO dollar figures.
 */
export interface CabinetPricing {
  /** Installed cabinet cost per linear foot of wall, one entry per grade. */
  grades: { key: string; label: string; perLinearFoot: PriceRange }[]
  /** Countertop adders per linear foot, keyed by planner countertop key. */
  countertopPerLinearFoot: Partial<Record<'butcher' | 'stone' | 'laminate', PriceRange>>
  /** Optional fine print shown under the range. */
  note?: string
}

const photo = (name: string, alt: string, w: number, h: number): Photo => ({ src: `${WORK}/${name}.webp`, alt, w, h })

// Every photo below is a real job (or shop) photo. No stock, no generated images.
export const PHOTOS = {
  boy: { src: `${R2}/hero.jpg`, alt: 'A little boy standing between two displays of floor sample boards', w: 526, h: 701 },
  whiteKitchen: photo('cabinets-white-kitchen-wood-island', 'White kitchen cabinets with a stained wood island and pendant lights', 1600, 1200),
  whiteKitchenTall: photo('cabinets-white-kitchen-wood-island-tall', 'White kitchen with a stained wood island, stone tops and pendant lights', 1200, 1600),
  blueIsland: photo('cabinets-kitchen-blue-island', 'Open kitchen with white cabinets and a blue island with a butcher block top', 1600, 1060),
  rangeWall: photo('cabinets-range-wall-tile-mural', 'White cabinets around a gas range with a blue and white tile mural and wood hood', 1600, 1060),
  pantry: photo('cabinets-pantry', 'Pantry with white base cabinets, a butcher block top and open shelves', 1600, 1060),
  laundry: photo('cabinets-laundry-room', 'Laundry room with white upper and lower cabinets and a butcher block counter', 1600, 1060),
  laundry2: photo('cabinets-laundry-room-2', 'White laundry room cabinets above and beside the washer and dryer', 1600, 1060),
  bathVanity: photo('cabinets-bath-vanity', 'Bathroom with white vanity cabinets and black hardware', 1600, 1060),
  closet: photo('cabinets-closet-built-ins', 'Walk-in closet with white built-in shelves and hanging rods', 1600, 1060),
  closet2: photo('cabinets-closet-built-ins-2', 'Walk-in closet lined with white built-in shelving', 1600, 1060),
  porchBar: photo('cabinets-porch-wet-bar', 'Covered porch with a stained wood wet bar cabinet against a brick wall', 1600, 1060),
  fireplace: photo('cabinets-fireplace-built-ins', 'Brick fireplace with a wood mantel and white built-in cabinets and shelves on each side', 1200, 1600),
  greenKitchen: photo('cabinets-green-kitchen', 'Kitchen with green cabinets and butcher block countertops', 1600, 1200),
  greenKitchen2: photo('cabinets-green-kitchen-2', 'Green kitchen cabinets with butcher block tops under a window', 1600, 1200),
  stairs: photo('remodel-stairs-finished', 'Finished staircase with stained wood treads, white risers and a wood newel post', 1200, 1600),
  hallStairs: photo('remodel-hall-stairs-mudroom', 'Hallway with new floors, a staircase and a built-in mudroom bench', 1600, 1060),
  masterBath: photo('remodel-master-bath', 'Remodeled master bath with a clawfoot tub, white vanity and wood-look floor', 1600, 1060),
  bonusRoom: photo('remodel-bonus-room-floor', 'Bonus room with new wood-look flooring', 1600, 1060),
  clawfootTub: photo('remodel-clawfoot-tub', 'Clawfoot tub under a window next to a tiled shower', 1600, 1060),
  showerSubway: photo('tile-shower-subway', 'Shower with white subway tile, a niche and a pebble tile floor', 1600, 1060),
  showerBench: photo('tile-shower-marble-bench', 'Marble-look tile shower with a bench and mosaic floor', 900, 1600),
  showerNiche: photo('tile-shower-marble-niche', 'Marble-look tile shower with a mosaic niche and a bench', 1600, 1200),
  showerWalkIn: photo('tile-shower-walk-in', 'Walk-in tile shower with a pebble floor', 1600, 1060),
  halfwayMural: photo('before-tile-mural', 'Tile mural set on the range wall, cabinets and range not in yet', 1600, 1200),
  halfwayStairs: photo('before-stairs', 'Staircase mid-job with new treads going in', 1200, 1600),
  halfwayGreenKitchen: photo('before-green-kitchen', 'Green kitchen mid-job with butcher block tops in and a cabinet still open', 1600, 1200),
  barrelTable: photo('custom-barrel-table', 'Whiskey barrel table with a cabinet door in the side and a poured epoxy top', 880, 1640),
  barrelTableShop: photo('custom-barrel-table-shop', 'The whiskey barrel table standing in the shop', 880, 1640),
  epoxyTop: photo('custom-epoxy-top', 'Round poured epoxy table top with wood and antlers set in it', 880, 1640),
  epoxyTopAntlers: photo('custom-epoxy-top-antlers', 'Close-up of the epoxy top with antlers and wood set in it', 720, 1280),
} satisfies Record<string, Photo>

export const CONFIG = {
  // ─── BRAND ───
  appName: 'All Things Flooring & Tile',
  tagline: 'Cabinets, Flooring & Tile in Eastman, GA',
  yearStarted: 2009,

  // ─── SEO (default meta description, JSON-LD, PWA) ───
  seo: {
    description: 'Cabinets, flooring, tile showers and remodels in Eastman, GA and Dodge County. Set up a free estimate online or call (478) 298-6012.',
    services: ['Cabinets', 'Kitchen cabinets', 'Built-ins', 'Flooring', 'Flooring installation', 'Tile', 'Tile showers', 'Remodeling', 'Bathroom remodeling', 'Custom work'],
  },

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
  },

  // ─── CONTACT ───
  phone: {
    raw: '4782986012',
    display: '(478) 298-6012',
    href: 'tel:4782986012',
  },
  address: {
    street: '1245 College St',
    city: 'Eastman',
    state: 'GA',
    zip: '31023',
    full: '1245 College St, Eastman, GA 31023',
    region: 'Eastman & Dodge County',
  },
  // No store hours: the showroom closed 8/31/2026. Phone and the site are the only ways in.

  // ─── CTA ───
  booking: '/book',
  bookingApi: {
    base: 'https://hetzner.cerul.org',
    sourceSite: 'allthingsflooringntile.com',
    hoursLabel: 'Mon – Fri · 8 AM – 4 PM',
    requestPath: '/public/book/request',
    confirmPath: '/public/book/confirm',
  },
  cta: {
    // Wording rule: /book is a quick-connect, not a booking. CTAs say "Set up an estimate", never "Book".
    primary: {
      text: 'Set up an estimate',
      href: '/book',
    },
    secondary: {
      text: 'See our cabinets',
      href: '/cabinets',
    },
    quote: {
      text: 'Set up an estimate',
      href: '/book',
    },
    call: {
      text: 'Call (478) 298-6012',
      href: 'tel:4782986012',
    },
    email: {
      text: 'Email Us',
      href: 'mailto:kc@cerul.org',
    },
    mobileCta: {
      text: 'Set up an estimate',
      href: '/book',
    },
  },

  // ─── HIRING FLASH (set active: false to take the banner down) ───
  hiring: {
    active: true,
    label: 'NOW HIRING',
    text: 'Experienced floor installer',
    cta: 'Call or text Ron',
    phone: {
      display: '(478) 231-7935',
      href: 'tel:4782317935',
    },
  },

  // ─── NAVIGATION ───
  nav: [
    { to: '/', label: 'Home' },
    { to: '/cabinets', label: 'Cabinets' },
    { to: '/custom', label: 'Custom Work' },
    { to: '/studio', label: 'Design Studio' },
    { to: '/about', label: 'About Us' },
    { to: '/resources', label: 'Resources' },
  ],
  mobileNav: [
    { to: '/', label: 'Home', icon: 'home' },
    { to: '/cabinets', label: 'Cabinets', icon: 'cabinets' },
    { to: '/book', label: 'Estimate', icon: 'estimate' },
    { to: 'tel:4782986012', label: 'Call', icon: 'call' },
  ] as { to: string; label: string; icon: 'home' | 'cabinets' | 'estimate' | 'call' }[],

  // ─── HERO (landing rotating gallery) ───
  hero: {
    badge: 'Serving Eastman & Dodge County Since 2009',
    headline: 'Let us help with your next',
    rotatingWords: ['kitchen', 'bathroom', 'floor', 'build'],
    subheadline: 'Cabinets, floors, tile showers and remodels from a family crew in Eastman. Tell us what you need and we will set up a free estimate.',
    panels: [
      { label: 'Floors for the whole family', photos: [PHOTOS.boy] },
      { label: 'We handle cabinets', photos: [PHOTOS.whiteKitchen, PHOTOS.blueIsland, PHOTOS.laundry, PHOTOS.fireplace] },
      { label: 'Build or remodel', photos: [PHOTOS.stairs, PHOTOS.hallStairs, PHOTOS.masterBath, PHOTOS.bonusRoom] },
    ],
  },

  // ─── WHAT WE DO (landing cards) ───
  services: {
    eyebrow: 'What We Do',
    headline: 'Cabinets, Floors, Tile and Remodels',
    subheadline: 'One crew for the whole job, from the cabinets to the floor under them.',
    items: [
      { title: 'Cabinets', desc: 'Kitchens, baths, laundry rooms, pantries, closets and built-ins.', photo: PHOTOS.whiteKitchen, href: '/cabinets', linkText: 'See our cabinets' },
      { title: 'Floors', desc: 'Hardwood, luxury vinyl plank, tile, carpet, laminate and VCT. One room or the whole house.', photo: PHOTOS.bonusRoom, href: '/book', linkText: 'Set up an estimate',
        extra: { title: 'Design Studio', desc: 'See a new floor in a photo of your room and get a ballpark price.', href: '/studio', linkText: 'Try the Design Studio' } },
      { title: 'Tile and showers', desc: 'Walk-in showers, benches and niches, backsplashes and tile floors.', photo: PHOTOS.showerNiche, href: '/book', linkText: 'Set up an estimate' },
      { title: 'Build and remodel', desc: 'Bathroom remodels, stairs, porches and whole-house builds.', photo: PHOTOS.hallStairs, href: '/custom', linkText: 'See custom work' },
    ],
  },

  // ─── HALFWAY, THEN FINISHED (real mid-job / finished pairs) ───
  progress: {
    eyebrow: 'Our Work',
    headline: 'Halfway, Then Finished',
    subheadline: 'Real jobs, shot partway through and again when we wrapped up.',
    pairs: [
      { title: 'Range wall with a tile mural', halfway: PHOTOS.halfwayMural, finished: PHOTOS.rangeWall, aspect: '4/3' },
      { title: 'Staircase', halfway: PHOTOS.halfwayStairs, finished: PHOTOS.stairs, aspect: '3/4' },
      { title: 'Green kitchen with butcher block', halfway: PHOTOS.halfwayGreenKitchen, finished: PHOTOS.greenKitchen, aspect: '4/3' },
    ],
  },

  // ─── REVIEWS (real Google reviews, verbatim. Do not edit the text.) ───
  reviewsSummary: '4.7 on Google',
  testimonials: [
    { name: 'Scott Spitler', source: 'Google review', rating: 5, project: 'Remodels, countertops and tile', text: 'Can’t say enough good things about Ron and his crew. They show up for work when they say they are going to and do an excellent job. We’ve had them work on everything from bathroom, remodels,roofing, countertops, plumbing, painting and lots of tile work. We have been very pleased with everything.' },
    { name: 'Kimberly Peacock', source: 'Google review', rating: 5, project: 'Tile, countertops, stairs and closets', text: 'My tile, backsplash, and counter tops turned out better than I hoped! My staircase is beautiful! They did an amazing job! Love my floors! I get the most compliments on my master closet! Super friendly and helpful!' },
    { name: 'Stephanie Griffis', source: 'Google review', rating: 5, project: 'Covered porch build', text: 'Great new addition to my house is a covered porch that I contacted All Things Flooring and Tile to build for me. Such a pleasant experience from start to finish. Great work and great folks to deal with! Five Stars!!! Thanks guys!' },
    { name: 'Wendy Selph', source: 'Google review', rating: 5, project: 'Bathroom remodel', text: 'Ron from All Things Flooring and Tile did a great job helping me out with everything I needed for my bathroom remodel. Ron’s crew did an awesome job on demolition, installing shower, drywall, plumbing, flooring, painting, and clean-up.' },
    { name: 'Gary DeLoach', source: 'Google review', rating: 5, project: 'Google review', text: 'They did a great job for a fair price!!!' },
    { name: 'Whitney Rogers', source: 'Google review', rating: 5, project: 'Google review', text: 'Awesome work!!! Great guys to work with. THANK YOU!!!' },
  ],

  // ─── CABINETS PAGE + PLANNER ───
  cabinets: {
    title: 'Cabinets in Eastman, GA',
    description: 'Kitchen, bath, laundry, pantry, closet and built-in cabinets in Eastman, GA and Dodge County. See real jobs and plan yours with the Cabinet Planner.',
    eyebrow: 'Cabinets',
    headline: 'Cabinets in Eastman, GA',
    intro: 'Cabinets are a big part of what we do. Kitchens, baths, laundry rooms, pantries, closets and built-ins, plus the countertops, tile and floors that go with them. Here are some of our jobs. When you are ready, use the planner below to tell us about yours.',
    groups: [
      { title: 'Kitchens', photos: [PHOTOS.whiteKitchen, PHOTOS.blueIsland, PHOTOS.rangeWall, PHOTOS.greenKitchen, PHOTOS.greenKitchen2] },
      { title: 'Laundry, pantry and closets', photos: [PHOTOS.laundry, PHOTOS.laundry2, PHOTOS.pantry, PHOTOS.closet, PHOTOS.closet2] },
      { title: 'Baths', photos: [PHOTOS.bathVanity] },
      { title: 'Built-ins and outdoor', photos: [PHOTOS.fireplace, PHOTOS.porchBar] },
    ],
    planner: {
      eyebrow: 'Cabinet Planner',
      headline: 'Plan your cabinets',
      subheadline: 'Pick what fits. Rough is fine. We will go over the details when we come out to measure.',
      rooms: [
        { key: 'kitchen', label: 'Kitchen' },
        { key: 'bath', label: 'Bath' },
        { key: 'laundry', label: 'Laundry' },
        { key: 'pantry', label: 'Pantry' },
        { key: 'closet', label: 'Closet' },
        { key: 'builtin', label: 'Built-in' },
        { key: 'other', label: 'Other' },
      ],
      looks: [
        { key: 'white-shaker', label: 'White shaker' },
        { key: 'painted', label: 'Painted color' },
        { key: 'stained', label: 'Stained wood' },
        { key: 'unsure', label: 'Not sure' },
      ],
      countertops: [
        { key: 'butcher', label: 'Butcher block' },
        { key: 'stone', label: 'Stone or quartz' },
        { key: 'laminate', label: 'Laminate' },
        { key: 'unsure', label: 'Not sure / keeping mine' },
      ],
      timings: [
        { key: 'asap', label: 'ASAP' },
        { key: '1-3', label: '1 to 3 months' },
        { key: 'planning', label: 'Just planning' },
      ],
    },
    // Waiting on Ron's numbers. Leave null and the planner shows no prices at all.
    pricing: null as CabinetPricing | null,
  },

  // ─── CUSTOM WORK PAGE ───
  custom: {
    title: 'Custom Work',
    description: 'One-off custom pieces, stairs and built-ins from All Things Flooring & Tile in Eastman, GA. Tell us what you have in mind.',
    eyebrow: 'Custom Work',
    headline: 'Custom Work',
    intro: 'Some jobs are not on any list. If you have something in mind, tell us about it.',
    feature: {
      title: 'Whiskey barrel table',
      desc: 'A whiskey barrel turned into a table, with a cabinet door set into the side and a poured epoxy top with wood and antlers set in it.',
      photos: [PHOTOS.barrelTable, PHOTOS.barrelTableShop, PHOTOS.epoxyTop, PHOTOS.epoxyTopAntlers],
    },
    other: {
      title: 'Other one-off work',
      desc: 'Stairs, built-ins and the pieces that make a house yours.',
      photos: [PHOTOS.stairs, PHOTOS.fireplace, PHOTOS.closet, PHOTOS.hallStairs],
    },
    cta: {
      headline: 'Tell us what you have in mind',
      text: 'Send us a few lines about the idea and a good time to talk. We will call or text to go over it.',
    },
  },

  // ─── BOOK PAGE (quick-connect, not a booking) ───
  book: {
    title: 'Set up an estimate',
    description: 'Set up a free estimate for cabinets, flooring, tile or a remodel in Eastman, GA. Tell us what you need and a time that suits you, and we will call or text to settle it.',
    eyebrow: 'Free · No-Obligation',
    headline: 'Set up an estimate',
  },

  // ─── CLOSING CTA (landing) ───
  closing: {
    headline: 'Set up an estimate',
    text: 'Tell us what you need and a day and time that would suit you. We will call or text to settle the time. Free and no pressure.',
  },

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
  // ─── TEAM ───
  team: {
    management: [
      {
        name: 'Ron Whittington',
        role: 'Sales & Estimates',
        initials: 'RW',
        photo: 'ron',
        bio: "Born and raised right here in Eastman. Ron's been in the flooring business for decades and knows every product we carry inside and out. When he's not helping customers find the perfect floor, you'll find him at church, coaching up the next generation, or spending time with his daughter. A lifelong Georgia Bulldogs fan, and he won't let you forget it.",
        funFact: 'Go Dawgs!',
      },
      {
        name: 'Jamie Fordham',
        role: 'Sales & Installation',
        initials: 'JF',
        photo: 'jamie',
        bio: "Another Eastman original. Jamie grew up playing baseball for the Dodge County Indians and never left. Why would you? He knows flooring like he knows a fastball: get it right, get it done, and make it look good. Family man, ballgame regular, and the guy who'll give you the honest answer even if it's not the expensive one. Fair warning: he pulls for Alabama. Nobody's perfect.",
        funFact: 'Roll Tide (sorry)',
      },
    ],
    crew: [
      {
        name: 'Landin Fordham',
        role: 'Installation',
        initials: 'LF',
        photo: 'landin',
        bio: "Jamie's oldest. Landin grew up on job sites and played baseball at DCHS just like his dad. He brings precision to every install: tile, hardwood, LVP, you name it. Quiet worker, loud results. And yes, by some unfortunate twist of fate, he also pulls for Alabama.",
        funFact: 'DCHS Baseball alum',
      },
      {
        name: 'Gavin Fordham',
        role: 'Installation',
        initials: 'GF',
        photo: 'gavin',
        bio: "The youngest Fordham on the crew but don't let that fool you. Gavin's been helping his dad install floors since before he could drive. Another DCHS ballplayer with a serious work ethic and an eye for the details that matter. The Alabama thing? Blame Jamie.",
        funFact: 'Blame his dad',
      },
    ],
  },

  // ─── FAQ (homepage + JSON-LD schema) ───
  faqs: [
    {
      q: 'Do you offer free estimates?',
      a: "Yes. Every estimate is free and no-obligation. Set one up online or give us a call, and we'll come measure, answer your questions, and give you a straight-up price with no pressure.",
    },
    {
      q: 'Do you do cabinets?',
      a: 'Yes, cabinets are a big part of what we do: kitchens, baths, laundry rooms, pantries, closets and built-ins. See some of our jobs on the Cabinets page, or use the Cabinet Planner there to send us the basics.',
    },
    {
      q: 'How much do new cabinets cost?',
      a: 'It depends on the room, how much wall you are covering, the look and the countertop, so we price every cabinet job after we measure. Send us the basics with the Cabinet Planner or set up an estimate and we will go over it with you.',
    },
    {
      q: 'Can you do the countertops, tile and floors too?',
      a: 'Yes. We can handle the countertops, backsplash, tile and flooring along with the cabinets, so one crew covers the whole room.',
    },
    {
      q: 'Do you do remodels and builds?',
      a: 'Yes. Bathroom remodels, tile showers, stairs, porches and whole-house builds, plus custom one-off pieces. Tell us what you have in mind.',
    },
    {
      q: 'What areas do you serve?',
      a: 'We serve Eastman, Dodge County, McRae-Helena, Cochran, Telfair County, and surrounding Middle Georgia communities. Not sure whether we cover your area? Just call us at (478) 298-6012.',
    },
    {
      q: 'What types of flooring do you install?',
      a: 'Hardwood, luxury vinyl plank (LVP), tile and stone, carpet, laminate, and commercial VCT. Whole-home or single-room, residential or commercial, we handle it.',
    },
    {
      q: 'Can I see what new floors will look like in my room before I buy?',
      a: 'Yes. Our free Room Visualizer lets you upload a photo of your room, pick a floor, and see the floor in your room. Try it on our Design Studio page.',
    },
    {
      q: 'How long does flooring installation usually take?',
      a: "Most single-room jobs are done in 1-2 days. Whole-house installs typically run 3-7 days depending on size, material, and subfloor prep. We'll give you an exact timeline with your written estimate.",
    },
    {
      q: 'Do you remove old flooring and handle subfloor prep?',
      a: 'Absolutely. We handle demo, haul-off, leveling, and any subfloor prep needed before the new floor goes down. Everything is itemized on your estimate. No hidden fees, no surprises.',
    },
    {
      q: 'What flooring brands do you carry?',
      a: 'We carry Shaw Floors, Mohawk, Armstrong, Daltile, COREtec, and more top-tier brands. Call or text and we will help you narrow it down.',
    },
  ],

  // ─── STUDIO PAGE FAQ ───
  studioFaqs: [
    {
      q: 'Is the Room Visualizer really free?',
      a: 'Yes. Completely free, no signup, no email required. Upload a photo, pick a floor, and see your room with the new floor in about 15-30 seconds.',
    },
    {
      q: 'How close is the room preview to the real thing?',
      a: "Close, but it's a preview, not a final spec. It shows you what the floor type, color, and pattern will look like in your space. The real floors will match the look, but exact wood grain, tile veining, and lighting will vary slightly.",
    },
    {
      q: 'How accurate is the cost calculator?',
      a: "Our calculator uses real local pricing for materials and labor in Middle Georgia. Most projects come in at or below the low end of the estimate. For a final, exact quote we'll come measure your space. Set up an estimate and we'll lock it in.",
    },
    {
      q: 'What kind of room photo gives the best result?',
      a: 'A well-lit photo taken from about head height showing as much floor space as possible. Avoid heavy shadows or cluttered floors. Phone cameras work great, no fancy gear needed.',
    },
    {
      q: 'Can I save or share my visualizer result?',
      a: 'Yes. After generating, hit Save Image to download the result, or Share to send it to friends, your contractor, or post it. Share it on Facebook or Instagram and tag us!',
    },
    {
      q: 'Do I have to buy from you to use this?',
      a: "Nope. The tool is free for anyone. We built it because we want folks in Eastman and Dodge County to feel confident about their flooring decisions. That said, if you like what you see, give us a call. We'd love to install it for you.",
    },
  ],

  // ─── RESOURCES PAGE ───
  resources: {
    youtube: [
      { id: 'p0WgkJG-B_Y', title: 'How to Calculate Square Footage', channel: 'YouTube' },
      { id: 'gQKhj-VmiHk', title: 'Odd-Shaped Rooms: Measuring Sq Ft', channel: 'YouTube' },
      { id: 'WOjKCK16FBE', title: 'Types of Flooring Explained', channel: 'YouTube' },
    ],
  },

  // ─── FOOTER ───
  footer: {
    tagline: 'Cabinets, floors, tile and remodels for Eastman and Dodge County. Call, text, or set up an estimate online.',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Cabinets', to: '/cabinets' },
      { label: 'Custom Work', to: '/custom' },
      { label: 'Design Studio', to: '/studio' },
      { label: 'About Us', to: '/about' },
      { label: 'Resources', to: '/resources' },
      { label: 'Set up an estimate', to: '/book' },
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
