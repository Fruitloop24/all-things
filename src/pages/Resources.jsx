import { useState, useCallback } from 'react'
import { CONFIG } from '../config'

/* ── Sq Ft Challenge Game ── */
const SCALE = 16 // px per foot for drawing

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

function generateRoom() {
  const types = ['L', 'T', 'U', 'BUMP']
  const type = types[Math.floor(Math.random() * types.length)]

  switch (type) {
    case 'L': {
      // L-shape: full rectangle minus one corner
      const w = randomInt(14, 22)
      const h = randomInt(12, 20)
      const cutW = randomInt(4, Math.floor(w / 2))
      const cutH = randomInt(4, Math.floor(h / 2))
      const area = w * h - cutW * cutH
      return {
        name: 'L-Shaped Room',
        area,
        hint: `Break it into two rectangles.`,
        render: (s) => {
          const innerW = w - cutW
          return (
            <svg viewBox={`-32 -24 ${w * s + 64} ${h * s + 48}`} className="w-full max-w-sm mx-auto">
              <path
                d={`M 0 0 L ${innerW * s} 0 L ${innerW * s} ${cutH * s} L ${w * s} ${cutH * s} L ${w * s} ${h * s} L 0 ${h * s} Z`}
                fill="#e8d5b7" stroke="#6b472e" strokeWidth="2"
              />
              {/* Dimension labels */}
              <text x={innerW * s / 2} y={-8} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{innerW}&apos;</text>
              <text x={(innerW * s + w * s) / 2} y={cutH * s - 8} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{cutW}&apos;</text>
              <text x={-12} y={h * s / 2} textAnchor="middle" className="fill-stone-700 text-xs font-bold" transform={`rotate(-90 -12 ${h * s / 2})`}>{h}&apos;</text>
              <text x={w * s + 12} y={(cutH * s + h * s) / 2} textAnchor="middle" className="fill-stone-700 text-xs font-bold" transform={`rotate(90 ${w * s + 12} ${(cutH * s + h * s) / 2})`}>{h - cutH}&apos;</text>
              <text x={w * s / 2} y={h * s + 16} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{w}&apos;</text>
              <text x={innerW * s + 12} y={cutH * s / 2} textAnchor="middle" className="fill-stone-700 text-xs font-bold" transform={`rotate(90 ${innerW * s + 12} ${cutH * s / 2})`}>{cutH}&apos;</text>
            </svg>
          )
        },
      }
    }

    case 'T': {
      // T-shape: wide top bar + narrower bottom stem
      const topW = randomInt(16, 24)
      const topH = randomInt(4, 8)
      const stemW = randomInt(6, Math.floor(topW / 2))
      const stemH = randomInt(8, 14)
      const area = topW * topH + stemW * stemH
      const stemX = Math.floor((topW - stemW) / 2)
      return {
        name: 'T-Shaped Room',
        area,
        hint: `Top rectangle + bottom rectangle.`,
        render: (s) => (
          <svg viewBox={`-32 -24 ${topW * s + 64} ${(topH + stemH) * s + 48}`} className="w-full max-w-sm mx-auto">
            <path
              d={`M 0 0 L ${topW * s} 0 L ${topW * s} ${topH * s} L ${(stemX + stemW) * s} ${topH * s} L ${(stemX + stemW) * s} ${(topH + stemH) * s} L ${stemX * s} ${(topH + stemH) * s} L ${stemX * s} ${topH * s} L 0 ${topH * s} Z`}
              fill="#e8d5b7" stroke="#6b472e" strokeWidth="2"
            />
            <text x={topW * s / 2} y={-8} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{topW}&apos;</text>
            <text x={-12} y={topH * s / 2} textAnchor="middle" className="fill-stone-700 text-xs font-bold" transform={`rotate(-90 -12 ${topH * s / 2})`}>{topH}&apos;</text>
            <text x={(stemX + stemW) * s + 12} y={(topH * s + (topH + stemH) * s) / 2} textAnchor="middle" className="fill-stone-700 text-xs font-bold" transform={`rotate(90 ${(stemX + stemW) * s + 12} ${(topH * s + (topH + stemH) * s) / 2})`}>{stemH}&apos;</text>
            <text x={(stemX * s + (stemX + stemW) * s) / 2} y={(topH + stemH) * s + 16} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{stemW}&apos;</text>
          </svg>
        ),
      }
    }

    case 'U': {
      // U-shape: big rectangle with a notch cut from the top center
      const w = randomInt(18, 24)
      const h = randomInt(14, 20)
      const notchW = randomInt(4, Math.floor(w / 3))
      const notchH = randomInt(4, Math.floor(h / 2))
      const notchX = Math.floor((w - notchW) / 2)
      const area = w * h - notchW * notchH
      return {
        name: 'U-Shaped Room',
        area,
        hint: `Full rectangle minus the cutout.`,
        render: (s) => (
          <svg viewBox={`-32 -24 ${w * s + 64} ${h * s + 48}`} className="w-full max-w-sm mx-auto">
            <path
              d={`M 0 0 L ${notchX * s} 0 L ${notchX * s} ${notchH * s} L ${(notchX + notchW) * s} ${notchH * s} L ${(notchX + notchW) * s} 0 L ${w * s} 0 L ${w * s} ${h * s} L 0 ${h * s} Z`}
              fill="#e8d5b7" stroke="#6b472e" strokeWidth="2"
            />
            <text x={notchX * s / 2} y={-8} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{notchX}&apos;</text>
            <text x={(notchX * s + (notchX + notchW) * s) / 2} y={notchH * s + 16} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{notchW}&apos;</text>
            <text x={w * s + 12} y={h * s / 2} textAnchor="middle" className="fill-stone-700 text-xs font-bold" transform={`rotate(90 ${w * s + 12} ${h * s / 2})`}>{h}&apos;</text>
            <text x={w * s / 2} y={h * s + 16} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{w}&apos;</text>
            <text x={notchX * s - 12} y={notchH * s / 2} textAnchor="middle" className="fill-stone-700 text-xs font-bold" transform={`rotate(-90 ${notchX * s - 12} ${notchH * s / 2})`}>{notchH}&apos;</text>
          </svg>
        ),
      }
    }

    case 'BUMP':
    default: {
      // Rectangle with a bump-out (alcove) on one side
      const w = randomInt(12, 18)
      const h = randomInt(10, 16)
      const bumpW = randomInt(3, 6)
      const bumpH = randomInt(4, Math.floor(h / 2))
      const bumpY = randomInt(2, h - bumpH - 2)
      const area = w * h + bumpW * bumpH
      return {
        name: 'Room with Alcove',
        area,
        hint: `Main rectangle + the bump-out.`,
        render: (s) => (
          <svg viewBox={`-32 -24 ${(w + bumpW) * s + 64} ${h * s + 48}`} className="w-full max-w-sm mx-auto">
            <path
              d={`M 0 0 L ${w * s} 0 L ${w * s} ${bumpY * s} L ${(w + bumpW) * s} ${bumpY * s} L ${(w + bumpW) * s} ${(bumpY + bumpH) * s} L ${w * s} ${(bumpY + bumpH) * s} L ${w * s} ${h * s} L 0 ${h * s} Z`}
              fill="#e8d5b7" stroke="#6b472e" strokeWidth="2"
            />
            <text x={w * s / 2} y={-8} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{w}&apos;</text>
            <text x={-12} y={h * s / 2} textAnchor="middle" className="fill-stone-700 text-xs font-bold" transform={`rotate(-90 -12 ${h * s / 2})`}>{h}&apos;</text>
            <text x={(w * s + (w + bumpW) * s) / 2} y={bumpY * s - 8} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{bumpW}&apos;</text>
            <text x={(w + bumpW) * s + 12} y={(bumpY * s + (bumpY + bumpH) * s) / 2} textAnchor="middle" className="fill-stone-700 text-xs font-bold" transform={`rotate(90 ${(w + bumpW) * s + 12} ${(bumpY * s + (bumpY + bumpH) * s) / 2})`}>{bumpH}&apos;</text>
          </svg>
        ),
      }
    }
  }
}

function SqFtChallenge() {
  const [room, setRoom] = useState(null)
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [showHint, setShowHint] = useState(false)

  const newRoom = useCallback(() => {
    setRoom(generateRoom())
    setAnswer('')
    setResult(null)
    setShowHint(false)
  }, [])

  const checkAnswer = () => {
    if (!room || !answer) return
    const guess = parseInt(answer, 10)
    const correct = guess === room.area
    setResult(correct)
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
  }

  return (
    <div className="bg-white rounded-2xl border border-warm-100 overflow-hidden">
      <div className="bg-warm-800 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h3 className="font-heading text-lg font-bold">Sq Ft Challenge</h3>
          <p className="text-warm-200 text-xs">Can you calculate the square footage?</p>
        </div>
        {score.total > 0 && (
          <div className="text-right">
            <div className="text-warm-300 text-xs">Score</div>
            <div className="font-bold text-lg">{score.correct}/{score.total}</div>
          </div>
        )}
      </div>

      <div className="p-6">
        {!room ? (
          <div className="text-center py-8">
            <p className="text-stone-500 mb-4">We'll show you a room shape with dimensions. You calculate the total square footage!</p>
            <button
              onClick={newRoom}
              className="bg-warm-700 hover:bg-warm-800 text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              Start Challenge
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-2">
              <span className="text-xs font-bold text-warm-500 uppercase tracking-widest">{room.name}</span>
            </div>

            <div className="py-4">
              {room.render(SCALE)}
            </div>

            <div className="flex items-center gap-3 max-w-xs mx-auto mt-4">
              <input
                type="number"
                value={answer}
                onChange={(e) => { setAnswer(e.target.value); setResult(null) }}
                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                placeholder="Sq ft?"
                className="flex-1 border-2 border-warm-200 rounded-xl px-4 py-3 text-center text-lg font-bold focus:outline-none focus:border-warm-500 transition-colors"
                disabled={result !== null}
              />
              {result === null ? (
                <button
                  onClick={checkAnswer}
                  disabled={!answer}
                  className="bg-warm-700 hover:bg-warm-800 disabled:opacity-40 text-white px-5 py-3 rounded-xl font-semibold transition-all"
                >
                  Check
                </button>
              ) : (
                <button
                  onClick={newRoom}
                  className="bg-warm-700 hover:bg-warm-800 text-white px-5 py-3 rounded-xl font-semibold transition-all"
                >
                  Next
                </button>
              )}
            </div>

            {result !== null && (
              <div className={`text-center mt-4 p-3 rounded-xl text-sm font-semibold ${result ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {result
                  ? 'Nailed it! You got it right.'
                  : `Not quite — the answer is ${room.area} sq ft. ${room.hint}`}
              </div>
            )}

            {!showHint && result === null && (
              <button
                onClick={() => setShowHint(true)}
                className="block mx-auto mt-3 text-warm-500 hover:text-warm-700 text-xs font-medium transition-colors"
              >
                Need a hint?
              </button>
            )}
            {showHint && result === null && (
              <p className="text-center text-warm-500 text-xs mt-3 italic">{room.hint}</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

/* ── Main Resources Page ── */
export default function Resources() {
  const { resources } = CONFIG

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-warm-900 via-warm-800 to-warm-700 text-white py-16 md:py-20 text-center">
        <div className="relative max-w-3xl mx-auto px-4">
          <p className="text-warm-300 text-sm font-semibold tracking-widest uppercase mb-3">Learn & Grow</p>
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Flooring <span className="text-warm-300">Resources</span>
          </h1>
          <p className="text-warm-200/90 text-lg leading-relaxed max-w-xl mx-auto">
            Tips, how-to guides, and expert advice to help you make the best decisions for your floors — whether you hire us or DIY.
          </p>
        </div>
      </section>

      {/* ── Newsletter Signup ── */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-stone-900 mb-2">Stay in the Loop</h2>
          <p className="text-stone-500 text-sm mb-6">Get flooring tips, seasonal deals, and project inspiration delivered to your inbox.</p>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScynL1leHYPZlZNng9AVmOpbBlNzO-913rA5-tWmmcxD5I7HQ/viewform?embedded=true"
            className="w-full border-0 rounded-xl bg-white"
            style={{ minHeight: '320px' }}
            title="Newsletter Signup"
            loading="lazy"
          />
        </div>
      </section>

      {/* ── How to Measure Sq Ft Article ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-warm-500 text-sm font-semibold tracking-widest uppercase mb-2">Guides</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900">Helpful Articles</h2>
          </div>

          <article className="bg-warm-50 rounded-2xl p-6 md:p-8 border border-warm-100">
            <span className="text-xs font-bold text-warm-500 uppercase tracking-widest">DIY Basics</span>
            <h3 className="font-heading text-xl font-bold text-stone-900 mt-2 mb-3">How to Measure Your Room&apos;s Square Footage</h3>
            <p className="text-stone-600 leading-relaxed mb-4">
              Before you shop for flooring, you need to know how much you need. It&apos;s easier than you think — grab a tape measure, a pen, and follow these steps.
            </p>
            <ol className="text-stone-600 text-sm space-y-2 mb-4 list-decimal list-inside">
              <li><strong>Measure length and width</strong> of the room in feet. Round up to the nearest half-foot.</li>
              <li><strong>Multiply length x width</strong> to get your square footage. A 12ft x 14ft room = 168 sq ft.</li>
              <li><strong>Add 10% for waste</strong> — cuts, mistakes, and pattern matching. So 168 + 17 = 185 sq ft to order.</li>
              <li><strong>Odd-shaped rooms?</strong> Break them into rectangles, measure each one, and add them up.</li>
              <li><strong>Closets and nooks</strong> — measure separately and add to your total.</li>
            </ol>
            <p className="text-stone-500 text-sm">
              Want it done for you? <a href={CONFIG.cta.primary.href} target="_blank" rel="noopener noreferrer" className="text-warm-600 font-semibold hover:text-warm-700 no-underline">Book a free estimate</a> and we&apos;ll handle the measuring.
              Or try our <a href="/studio" className="text-warm-600 font-semibold hover:text-warm-700 no-underline">Cost Calculator</a> to get a ballpark price right now.
            </p>
          </article>
        </div>
      </section>

      {/* ── Sq Ft Challenge Game ── */}
      <section className="py-16 bg-warm-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-warm-500 text-sm font-semibold tracking-widest uppercase mb-2">Practice</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900 mb-2">Test Your Skills</h2>
            <p className="text-stone-500 max-w-lg mx-auto">Read the article above, then see if you can calculate the square footage of these odd-shaped rooms.</p>
          </div>
          <SqFtChallenge />
        </div>
      </section>

      {/* ── YouTube Tips ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-warm-500 text-sm font-semibold tracking-widest uppercase mb-2">Video Tips</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900 mb-2">DIY & Pro Tips</h2>
            <p className="text-stone-500 max-w-lg mx-auto">Helpful videos from around YouTube to get you started.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.youtube.map((vid, i) => (
              <div key={i} className="bg-warm-50 rounded-2xl overflow-hidden border border-warm-100">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${vid.id}`}
                    title={vid.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full border-0"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-sm font-bold text-stone-900">{vid.title}</h3>
                  <p className="text-stone-400 text-xs mt-1">{vid.channel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-warm-50 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-stone-900 mb-4">Got Questions?</h2>
          <p className="text-stone-500 mb-8">We&apos;re always happy to help — shoot us an email or give us a call.</p>
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
