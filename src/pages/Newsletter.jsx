import { CONFIG } from '../config'

export default function Newsletter() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-warm-900 via-warm-800 to-warm-700 text-white py-16 md:py-24 text-center">
        <div className="relative max-w-3xl mx-auto px-4">
          <p className="text-warm-300 text-sm font-semibold tracking-widest uppercase mb-3">Stay Connected</p>
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            The All Things <span className="text-warm-300">Newsletter</span>
          </h1>
          <p className="text-warm-200/90 text-lg leading-relaxed max-w-xl mx-auto">
            Flooring tips, seasonal deals, project ideas, and community updates — straight from our crew to your inbox.
          </p>
        </div>
      </section>

      {/* ── What You Get ── */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            <div className="bg-white rounded-2xl p-6 border border-warm-100 text-center">
              <div className="w-12 h-12 bg-warm-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-warm-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-bold text-stone-900 mb-2">Tips & Tricks</h3>
              <p className="text-stone-500 text-sm">DIY advice, maintenance tips, and pro secrets to keep your floors looking great.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-warm-100 text-center">
              <div className="w-12 h-12 bg-warm-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-warm-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-bold text-stone-900 mb-2">Deals & Specials</h3>
              <p className="text-stone-500 text-sm">Be the first to know about seasonal sales, clearance events, and exclusive offers.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-warm-100 text-center">
              <div className="w-12 h-12 bg-warm-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-warm-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-bold text-stone-900 mb-2">Project Inspiration</h3>
              <p className="text-stone-500 text-sm">Real before-and-after projects from right here in Dodge County and beyond.</p>
            </div>
          </div>

          {/* ── The Form ── */}
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-stone-900 mb-6 text-center">Sign Up — It's Free</h2>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScynL1leHYPZlZNng9AVmOpbBlNzO-913rA5-tWmmcxD5I7HQ/viewform?embedded=true"
              className="w-full border-0 rounded-xl bg-white"
              style={{ minHeight: '400px' }}
              title="Newsletter Signup"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-heading text-2xl font-bold text-stone-900 mb-4">Rather Talk to a Human?</h2>
          <p className="text-stone-500 mb-8">We get it. Shoot us an email or give us a call — we love hearing from you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CONFIG.cta.email.href}
              className="inline-flex items-center justify-center gap-2 bg-warm-700 hover:bg-warm-800 text-white px-8 py-4 rounded-xl font-semibold transition-all no-underline shadow-md"
            >
              {CONFIG.cta.email.text}
            </a>
            <a
              href={CONFIG.cta.call.href}
              className="inline-flex items-center justify-center gap-2 border-2 border-warm-300 text-warm-700 hover:bg-warm-100 px-8 py-4 rounded-xl font-semibold transition-all no-underline"
            >
              {CONFIG.cta.call.text}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
