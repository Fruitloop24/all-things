import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { CONFIG } from '../config'

/* ─── Intersection Observer Hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, visible]
}

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ─── Project showcase — real before/after photos from R2 ─── */
const projects = CONFIG.images.projects

const testimonials = CONFIG.testimonials
const suppliers = CONFIG.suppliers

/* ─── Component ─── */
export default function Landing() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentProject, setCurrentProject] = useState(0)
  const testimonialTimer = useRef(null)
  const projectTimer = useRef(null)

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    testimonialTimer.current = setInterval(nextTestimonial, 6000)
    return () => clearInterval(testimonialTimer.current)
  }, [nextTestimonial])

  const resetTimer = () => {
    clearInterval(testimonialTimer.current)
    testimonialTimer.current = setInterval(nextTestimonial, 6000)
  }

  // Auto-rotate projects every 3s
  useEffect(() => {
    projectTimer.current = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length)
    }, 3000)
    return () => clearInterval(projectTimer.current)
  }, [])

  return (
    <div>
      {/* ════════════ 1. HERO ════════════ */}
      <section className="relative overflow-hidden bg-warm-900 text-white min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img src={CONFIG.images.hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-warm-900/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-sm text-warm-200 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                {CONFIG.hero.badge}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
                Your Hometown{' '}
                <span className="text-warm-300">Flooring Experts</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-lg sm:text-xl text-warm-200/90 leading-relaxed mb-8 max-w-lg">
                Premium floors, honest prices, and neighbors you can trust. Visit our showroom in {CONFIG.address.city} or book a free on-site estimate.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={CONFIG.cta.primary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-white text-warm-800 hover:bg-warm-100 px-8 py-4 rounded-xl text-base font-semibold transition-all no-underline shadow-lg shadow-black/20 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  {CONFIG.cta.primary.text}
                </a>
                <a
                  href={CONFIG.cta.call.href}
                  className="inline-flex items-center justify-center gap-2.5 border-2 border-warm-400/60 text-white hover:bg-white/10 px-8 py-4 rounded-xl text-base font-semibold transition-all no-underline backdrop-blur-sm"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {CONFIG.cta.call.text}
                </a>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/10">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-warm-300 text-sm">Trusted by <strong className="text-white">{CONFIG.trustCount}</strong> homeowners</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════ 2. DESIGN STUDIO — the moat ════════════ */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        {/* Subtle floor plank texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 58px, rgba(0,0,0,0.15) 58px, rgba(0,0,0,0.15) 60px)',
        }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-warm-100 text-warm-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                <span className="w-1.5 h-1.5 bg-warm-500 rounded-full" />
                Only at All Things
              </div>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
                See Your New Floors <span className="text-warm-600">Before We Install</span>
              </h2>
              <p className="text-stone-500 text-lg max-w-2xl mx-auto">
                No other flooring store in the area can do this. Upload a photo of your room, pick a floor, and see it transformed — plus get a price estimate on the spot.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 — Visualizer */}
            <Reveal delay={0}>
              <Link to="/studio" className="group no-underline">
                <div className="relative bg-gradient-to-br from-warm-800 to-warm-900 rounded-2xl p-8 h-full overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-warm-700/30 rounded-full -translate-y-12 translate-x-12" />
                  <div className="relative">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                      <svg className="w-7 h-7 text-warm-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white mb-2">Room Visualizer</h3>
                    <p className="text-warm-300 text-sm leading-relaxed mb-6">
                      Upload a photo of any room. Pick your floor. See it installed — realistic, instant, free.
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-warm-300 text-sm font-semibold group-hover:text-white transition-colors">
                      Try it now
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* Card 2 — Calculator */}
            <Reveal delay={100}>
              <Link to="/studio" className="group no-underline">
                <div className="relative bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-8 h-full overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-stone-700/30 rounded-full -translate-y-12 translate-x-12" />
                  <div className="relative">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                      <svg className="w-7 h-7 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white mb-2">Cost Calculator</h3>
                    <p className="text-stone-300 text-sm leading-relaxed mb-6">
                      Pick your room size, floor type, and extras. Get a real estimate — materials, labor, the works.
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-stone-300 text-sm font-semibold group-hover:text-white transition-colors">
                      Try it out
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* Card 3 — Book Estimate */}
            <Reveal delay={200}>
              <a href={CONFIG.cta.primary.href} target="_blank" rel="noopener noreferrer" className="group no-underline">
                <div className="relative bg-gradient-to-br from-warm-600 to-warm-700 rounded-2xl p-8 h-full overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-warm-500/30 rounded-full -translate-y-12 translate-x-12" />
                  <div className="relative">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                      <svg className="w-7 h-7 text-warm-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-white mb-2">Free On-Site Estimate</h3>
                    <p className="text-warm-200 text-sm leading-relaxed mb-6">
                      Want us to come to you? Book a time and we'll measure, quote, and answer every question — no pressure.
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-warm-200 text-sm font-semibold group-hover:text-white transition-colors">
                      Book now
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════ 3. PROJECT SHOWCASE — auto-rotating ════════════ */}
      <section className="py-16 md:py-24 bg-warm-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-warm-500 text-sm font-semibold tracking-widest uppercase mb-3">Our Work</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-stone-900">
                Floors We're Proud Of
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative">
              {/* Main showcase image */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-warm-200 aspect-[16/9] relative">
                {projects.map((project, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-700 ${idx === currentProject ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <img src={project.src} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-heading text-xl font-bold text-white">{project.title}</h3>
                      <p className="text-white/70 text-sm">{project.location}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-5">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentProject(i)
                      clearInterval(projectTimer.current)
                      projectTimer.current = setInterval(() => setCurrentProject((p) => (p + 1) % projects.length), 3000)
                    }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === currentProject ? 'w-8 bg-warm-500' : 'w-1.5 bg-warm-200 hover:bg-warm-300'
                    }`}
                    aria-label={`View project ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ 4. TESTIMONIALS CAROUSEL ════════════ */}
      <section className="py-16 md:py-24 bg-white texture-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-warm-500 text-sm font-semibold tracking-widest uppercase mb-3">Testimonials</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-stone-900">
                What Our Customers Say
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="max-w-3xl mx-auto">
              <div className="bg-warm-50 rounded-2xl shadow-sm border border-warm-100 p-8 md:p-12 relative min-h-[260px] flex flex-col justify-between">
                <svg className="absolute top-6 left-8 w-10 h-10 text-warm-200/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>

                <div className="relative">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-stone-600 text-lg leading-relaxed mb-6 italic">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-stone-800">{testimonials[currentTestimonial].name}</div>
                    <div className="text-sm text-stone-400">
                      {testimonials[currentTestimonial].location} — {testimonials[currentTestimonial].project}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { prevTestimonial(); resetTimer() }}
                      className="w-10 h-10 rounded-full border border-warm-200 hover:bg-warm-100 flex items-center justify-center text-stone-500 hover:text-warm-700 transition-colors cursor-pointer"
                      aria-label="Previous testimonial"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button
                      onClick={() => { nextTestimonial(); resetTimer() }}
                      className="w-10 h-10 rounded-full border border-warm-200 hover:bg-warm-100 flex items-center justify-center text-stone-500 hover:text-warm-700 transition-colors cursor-pointer"
                      aria-label="Next testimonial"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex justify-center gap-2 mt-5">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setCurrentTestimonial(i); resetTimer() }}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        i === currentTestimonial ? 'w-8 bg-warm-500' : 'w-1.5 bg-warm-200 hover:bg-warm-300'
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ 5. SUPPLIER LOGOS BAR ════════════ */}
      <section className="py-14 bg-warm-50 border-y border-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-center text-xs font-semibold tracking-widest uppercase text-stone-400 mb-8">
              Proud to carry brands you trust
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {suppliers.map((supplier) => (
                <div
                  key={supplier.name}
                  className="flex items-center justify-center px-5 py-3 rounded-lg bg-white border border-stone-100 hover:border-warm-300 hover:shadow-sm transition-all"
                >
                  <img src={supplier.logo} alt={supplier.name} className="h-14 md:h-16 w-auto object-contain" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ 6. GET THE APP ════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="bg-gradient-to-br from-warm-50 to-warm-100 rounded-2xl border border-warm-200 p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <p className="text-warm-500 text-sm font-semibold tracking-widest uppercase mb-2">Get the App</p>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900 mb-4">
                    Take Us With You
                  </h2>
                  <p className="text-stone-600 leading-relaxed mb-6">
                    Get our app — AI floor visualizer, cost calculator, and more right on your phone. Scan the QR code or follow the steps below to install.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 bg-warm-700 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                      <p className="text-stone-600 text-sm"><strong className="text-stone-800">iPhone:</strong> Tap the share button (box with arrow) in Safari, then tap <strong>&quot;Add to Home Screen.&quot;</strong></p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 bg-warm-700 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                      <p className="text-stone-600 text-sm"><strong className="text-stone-800">Android:</strong> Tap the menu (three dots) in Chrome, then tap <strong>&quot;Add to Home Screen&quot;</strong> or <strong>&quot;Install App.&quot;</strong></p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 bg-warm-700 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                      <p className="text-stone-600 text-sm"><strong className="text-stone-800">That&apos;s it!</strong> It&apos;s an app — right on your home screen, always up to date.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-2xl p-6 shadow-md border border-warm-100">
                    <QRCodeSVG
                      value={typeof window !== 'undefined' ? window.location.origin : 'https://allthingsflooringandtile.com'}
                      size={200}
                      bgColor="#ffffff"
                      fgColor="#1a2744"
                      level="M"
                      includeMargin={false}
                    />
                  </div>
                  <p className="text-stone-400 text-xs mt-3 text-center">Scan with your phone camera to open the site</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ 7. SHOWROOM CTA ════════════ */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-warm-800 via-warm-800 to-warm-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 58px, rgba(255,255,255,0.2) 58px, rgba(255,255,255,0.2) 60px)',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                  {CONFIG.showroom.headline}
                </h2>
                <p className="text-warm-200 text-lg leading-relaxed mb-10 max-w-lg">
                  {CONFIG.showroom.subheadline}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={CONFIG.cta.primary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-white text-warm-800 hover:bg-warm-100 px-8 py-4 rounded-xl font-semibold transition-all no-underline shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    {CONFIG.cta.primary.text}
                  </a>
                  <a
                    href={CONFIG.cta.call.href}
                    className="inline-flex items-center justify-center gap-2.5 border-2 border-warm-400/60 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold transition-all no-underline"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    {CONFIG.cta.call.text}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-6">
                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-warm-600/30 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-warm-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">Address</div>
                    <div className="text-sm text-warm-300">{CONFIG.address.street}</div>
                    <div className="text-sm text-warm-300">{CONFIG.address.city}, {CONFIG.address.state} {CONFIG.address.zip}</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-warm-600/30 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-warm-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">Store Hours</div>
                    <div className="text-sm text-warm-300">{CONFIG.hours.weekday}</div>
                    <div className="text-sm text-warm-400">{CONFIG.hours.weekend}</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-warm-600/30 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-warm-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">Phone</div>
                    <a href={CONFIG.phone.href} className="text-sm text-warm-300 hover:text-white transition-colors no-underline">
                      {CONFIG.phone.display}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════ STICKY MOBILE CTA ════════════ */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 px-4 pb-2">
        <a
          href={CONFIG.cta.mobileCta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-warm-700 hover:bg-warm-800 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-warm-900/30 no-underline text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          {CONFIG.cta.mobileCta.text}
        </a>
      </div>
    </div>
  )
}
