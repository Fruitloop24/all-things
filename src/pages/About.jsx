import { CONFIG } from '../config'

const allTeam = [...CONFIG.team.management, ...CONFIG.team.crew]

export default function About() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-warm-900 via-warm-800 to-warm-700 text-white py-16 md:py-24 text-center">
        <div className="relative max-w-3xl mx-auto px-4">
          <p className="text-warm-300 text-sm font-semibold tracking-widest uppercase mb-3">About Us</p>
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Just Good People Who<br />
            <span className="text-warm-300">Love Good Floors</span>
          </h1>
          <p className="text-warm-200/90 text-lg leading-relaxed max-w-xl mx-auto">
            We're a family crew from Eastman, Georgia — been laying floors and serving our neighbors since {CONFIG.yearStarted}. No corporate office, no call center. Just us.
          </p>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-16 md:py-24 bg-warm-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-warm-500 text-sm font-semibold tracking-widest uppercase mb-2">Meet the Crew</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900">The Folks Behind Your Floors</h2>
          </div>

          <div className="space-y-10">
            {allTeam.map((person, idx) => (
              <div
                key={person.name}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-warm-100 hover:shadow-lg transition-all duration-300 flex flex-col ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Photo */}
                <div className="md:w-2/5 h-72 md:h-auto bg-gradient-to-br from-warm-700 to-warm-600 relative overflow-hidden shrink-0">
                  {person.photo && CONFIG.images.team[person.photo] ? (
                    <img
                      src={CONFIG.images.team[person.photo]}
                      alt={person.name}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-heading text-6xl font-bold text-white/80">{person.initials}</span>
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div className="p-8 md:p-10 flex flex-col justify-center flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-heading text-2xl font-bold text-stone-900">{person.name}</h3>
                    {person.funFact && (
                      <span className="text-xs font-bold bg-warm-100 text-warm-600 px-3 py-1 rounded-full whitespace-nowrap">
                        {person.funFact}
                      </span>
                    )}
                  </div>
                  <p className="text-warm-500 text-sm font-semibold mb-4">{person.role}</p>
                  <p className="text-stone-600 leading-relaxed">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote Banner ── */}
      <section className="bg-warm-900 py-12 md:py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 58px, rgba(255,255,255,0.2) 58px, rgba(255,255,255,0.2) 60px)',
        }} />
        <div className="relative max-w-3xl mx-auto px-4">
          <blockquote className="font-heading text-xl md:text-2xl text-white italic leading-relaxed mb-4">
            "We don't just lay floors in this community — we raise families, build up churches, and pour into the next generation."
          </blockquote>
          <cite className="text-warm-300 text-sm font-semibold not-italic">— The All Things Crew</cite>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-warm-50 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900 mb-4">Ready to Get Started?</h2>
          <p className="text-stone-500 mb-8">Book a free on-site estimate or give us a call — we'd love to hear from you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CONFIG.cta.primary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-warm-700 hover:bg-warm-800 text-white px-8 py-4 rounded-xl font-semibold transition-all no-underline shadow-md"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              {CONFIG.cta.primary.text}
            </a>
            <a
              href={CONFIG.cta.call.href}
              className="inline-flex items-center justify-center gap-2 border-2 border-warm-300 text-warm-700 hover:bg-warm-100 px-8 py-4 rounded-xl font-semibold transition-all no-underline"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              {CONFIG.cta.call.text}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
