import { CONFIG } from '../config'

const NAV_LINKS = [
  { href: '#involvement', label: 'Giving Back' },
  { href: '#events', label: 'Events' },
  { href: '#connect', label: 'Connect' },
]

export default function Community() {
  const { community, cta } = CONFIG

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-warm-900 via-warm-800 to-warm-700 text-white py-16 md:py-20 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_80%,rgba(192,133,82,0.4),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_40%)]" />
        <div className="relative max-w-3xl mx-auto px-4">
          <p className="text-warm-300 text-sm font-semibold tracking-widest uppercase mb-3">Dodge County</p>
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            {community.headline}
          </h1>
          <p className="text-warm-200/90 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            {community.subheadline}
          </p>

          {/* In-page nav */}
          <div className="flex flex-wrap justify-center gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-semibold transition-all no-underline border border-white/15"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community Involvement ── */}
      <section id="involvement" className="py-16 bg-warm-50 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-warm-500 text-sm font-semibold tracking-widest uppercase mb-2">Giving Back</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900">Rooted in Dodge County</h2>
            <p className="text-stone-500 mt-2 max-w-lg mx-auto">From the sanctuary to the schoolhouse, we show up for our community.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {community.involvement.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border-l-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                style={{ borderLeftColor: i % 2 === 0 ? '#c08552' : '#6b472e' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: i % 2 === 0 ? 'rgba(192,133,82,0.12)' : 'rgba(107,71,46,0.1)' }}
                >
                  {item.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote Banner ── */}
      <section className="bg-warm-900 py-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <span className="font-heading text-[12rem] text-white absolute top-[-20px] left-1/2 -translate-x-1/2">&ldquo;</span>
        </div>
        <div className="relative max-w-3xl mx-auto px-4">
          <blockquote className="font-heading text-xl md:text-2xl text-white/90 italic leading-relaxed mb-4">
            &ldquo;{community.quote}&rdquo;
          </blockquote>
          <cite className="text-warm-300 text-sm font-medium not-italic">
            &mdash; {community.quoteAuthor}
          </cite>
        </div>
      </section>

      {/* ── Events & Upcoming ── */}
      <section id="events" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-warm-500 text-sm font-semibold tracking-widest uppercase mb-2">What&apos;s Coming</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900">Events & Drives</h2>
            <p className="text-stone-500 mt-2 max-w-lg mx-auto">Catch us around town — here&apos;s where we&apos;ll be this year.</p>
          </div>

          <div className="relative pl-8 border-l-[3px] border-gradient" style={{ borderImage: 'linear-gradient(to bottom, #c08552, #6b472e) 1' }}>
            {community.events.map((evt, i) => (
              <div key={i} className="relative pb-10 last:pb-0">
                {/* Timeline dot */}
                <div
                  className="absolute -left-[calc(2rem+7px)] w-[14px] h-[14px] rounded-full border-[3px] top-1"
                  style={{
                    background: i % 2 === 0 ? '#c08552' : '#6b472e',
                    borderColor: '#ffffff',
                    boxShadow: `0 0 0 3px ${i % 2 === 0 ? '#c08552' : '#6b472e'}`,
                  }}
                />
                <div className="bg-warm-50 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{evt.icon}</span>
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: i % 2 === 0 ? '#c08552' : '#6b472e' }}
                    >
                      {evt.date}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-stone-900 mb-1">{evt.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{evt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Connect / FB Group ── */}
      <section id="connect" className="py-16 bg-warm-50 scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-warm-100">
            <div className="w-16 h-16 bg-warm-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-warm-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900 mb-3">Drop Us a Line</h2>
            <p className="text-stone-500 mb-6 leading-relaxed">
              Got a project idea, want to sponsor a team, or just want to say hey? We&apos;d love to hear from you. Join our Facebook group to stay connected with everything happening at All Things Flooring & Tile.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#1565c0] text-white px-6 py-3 rounded-xl font-semibold transition-all no-underline shadow-md"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
                Join Our Facebook Group
              </a>
              <a
                href={cta.call.href}
                className="inline-flex items-center justify-center gap-2 border-2 border-warm-300 text-warm-700 hover:bg-warm-100 px-6 py-3 rounded-xl font-semibold transition-all no-underline"
              >
                {cta.call.text}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900 mb-3">Want to Partner With Us?</h2>
          <p className="text-stone-500 mb-8">Whether you need a sponsor, help with a church renovation, or just want to connect — we&apos;d love to hear from you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={cta.email.href}
              className="inline-flex items-center justify-center gap-2 bg-warm-700 hover:bg-warm-800 text-white px-8 py-4 rounded-xl font-semibold transition-all no-underline shadow-md"
            >
              {cta.email.text}
            </a>
            <a
              href={cta.call.href}
              className="inline-flex items-center justify-center gap-2 border-2 border-warm-300 text-warm-700 hover:bg-warm-100 px-8 py-4 rounded-xl font-semibold transition-all no-underline"
            >
              {cta.call.text}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
