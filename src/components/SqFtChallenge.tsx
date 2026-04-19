import { useState, useCallback } from 'preact/hooks'
import type { JSX } from 'preact'

const SCALE = 16

function randomInt(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

type Room = {
  name: string
  area: number
  hint: string
  render: (s: number) => JSX.Element
}

function generateRoom(): Room {
  const types = ['L', 'T', 'U', 'BUMP'] as const
  const type = types[Math.floor(Math.random() * types.length)]

  if (type === 'L') {
    const w = randomInt(14, 22)
    const h = randomInt(12, 20)
    const cutW = randomInt(4, Math.floor(w / 2))
    const cutH = randomInt(4, Math.floor(h / 2))
    const area = w * h - cutW * cutH
    const innerW = w - cutW
    return {
      name: 'L-Shaped Room',
      area,
      hint: 'Break it into two rectangles.',
      render: (s) => (
        <svg viewBox={`-32 -24 ${w * s + 64} ${h * s + 48}`} className="w-full max-w-sm mx-auto">
          <path
            d={`M 0 0 L ${innerW * s} 0 L ${innerW * s} ${cutH * s} L ${w * s} ${cutH * s} L ${w * s} ${h * s} L 0 ${h * s} Z`}
            fill="#e8d5b7"
            stroke="#6b472e"
            strokeWidth="2"
          />
          <text x={(innerW * s) / 2} y={-8} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{innerW}'</text>
          <text x={(innerW * s + w * s) / 2} y={cutH * s - 8} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{cutW}'</text>
          <text x={-12} y={(h * s) / 2} textAnchor="middle" className="fill-stone-700 text-xs font-bold" transform={`rotate(-90 -12 ${(h * s) / 2})`}>{h}'</text>
          <text x={w * s + 12} y={(cutH * s + h * s) / 2} textAnchor="middle" className="fill-stone-700 text-xs font-bold" transform={`rotate(90 ${w * s + 12} ${(cutH * s + h * s) / 2})`}>{h - cutH}'</text>
          <text x={(w * s) / 2} y={h * s + 16} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{w}'</text>
          <text x={innerW * s + 12} y={(cutH * s) / 2} textAnchor="middle" className="fill-stone-700 text-xs font-bold" transform={`rotate(90 ${innerW * s + 12} ${(cutH * s) / 2})`}>{cutH}'</text>
        </svg>
      ),
    }
  }

  if (type === 'T') {
    const topW = randomInt(16, 24)
    const topH = randomInt(4, 8)
    const stemW = randomInt(6, Math.floor(topW / 2))
    const stemH = randomInt(8, 14)
    const area = topW * topH + stemW * stemH
    const stemX = Math.floor((topW - stemW) / 2)
    return {
      name: 'T-Shaped Room',
      area,
      hint: 'Top rectangle + bottom rectangle.',
      render: (s) => (
        <svg viewBox={`-32 -24 ${topW * s + 64} ${(topH + stemH) * s + 48}`} className="w-full max-w-sm mx-auto">
          <path
            d={`M 0 0 L ${topW * s} 0 L ${topW * s} ${topH * s} L ${(stemX + stemW) * s} ${topH * s} L ${(stemX + stemW) * s} ${(topH + stemH) * s} L ${stemX * s} ${(topH + stemH) * s} L ${stemX * s} ${topH * s} L 0 ${topH * s} Z`}
            fill="#e8d5b7"
            stroke="#6b472e"
            strokeWidth="2"
          />
          <text x={(topW * s) / 2} y={-8} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{topW}'</text>
          <text x={-12} y={(topH * s) / 2} textAnchor="middle" className="fill-stone-700 text-xs font-bold" transform={`rotate(-90 -12 ${(topH * s) / 2})`}>{topH}'</text>
          <text x={(stemX + stemW) * s + 12} y={(topH * s + (topH + stemH) * s) / 2} textAnchor="middle" className="fill-stone-700 text-xs font-bold" transform={`rotate(90 ${(stemX + stemW) * s + 12} ${(topH * s + (topH + stemH) * s) / 2})`}>{stemH}'</text>
          <text x={(stemX * s + (stemX + stemW) * s) / 2} y={(topH + stemH) * s + 16} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{stemW}'</text>
        </svg>
      ),
    }
  }

  if (type === 'U') {
    const w = randomInt(18, 24)
    const h = randomInt(14, 20)
    const notchW = randomInt(4, Math.floor(w / 3))
    const notchH = randomInt(4, Math.floor(h / 2))
    const notchX = Math.floor((w - notchW) / 2)
    const area = w * h - notchW * notchH
    return {
      name: 'U-Shaped Room',
      area,
      hint: 'Full rectangle minus the cutout.',
      render: (s) => (
        <svg viewBox={`-32 -24 ${w * s + 64} ${h * s + 48}`} className="w-full max-w-sm mx-auto">
          <path
            d={`M 0 0 L ${notchX * s} 0 L ${notchX * s} ${notchH * s} L ${(notchX + notchW) * s} ${notchH * s} L ${(notchX + notchW) * s} 0 L ${w * s} 0 L ${w * s} ${h * s} L 0 ${h * s} Z`}
            fill="#e8d5b7"
            stroke="#6b472e"
            strokeWidth="2"
          />
          <text x={(notchX * s) / 2} y={-8} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{notchX}'</text>
          <text x={(notchX * s + (notchX + notchW) * s) / 2} y={notchH * s + 16} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{notchW}'</text>
          <text x={w * s + 12} y={(h * s) / 2} textAnchor="middle" className="fill-stone-700 text-xs font-bold" transform={`rotate(90 ${w * s + 12} ${(h * s) / 2})`}>{h}'</text>
          <text x={(w * s) / 2} y={h * s + 16} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{w}'</text>
          <text x={notchX * s - 12} y={(notchH * s) / 2} textAnchor="middle" className="fill-stone-700 text-xs font-bold" transform={`rotate(-90 ${notchX * s - 12} ${(notchH * s) / 2})`}>{notchH}'</text>
        </svg>
      ),
    }
  }

  // BUMP
  const w = randomInt(12, 18)
  const h = randomInt(10, 16)
  const bumpW = randomInt(3, 6)
  const bumpH = randomInt(4, Math.floor(h / 2))
  const bumpY = randomInt(2, h - bumpH - 2)
  const area = w * h + bumpW * bumpH
  return {
    name: 'Room with Alcove',
    area,
    hint: 'Main rectangle + the bump-out.',
    render: (s) => (
      <svg viewBox={`-32 -24 ${(w + bumpW) * s + 64} ${h * s + 48}`} className="w-full max-w-sm mx-auto">
        <path
          d={`M 0 0 L ${w * s} 0 L ${w * s} ${bumpY * s} L ${(w + bumpW) * s} ${bumpY * s} L ${(w + bumpW) * s} ${(bumpY + bumpH) * s} L ${w * s} ${(bumpY + bumpH) * s} L ${w * s} ${h * s} L 0 ${h * s} Z`}
          fill="#e8d5b7"
          stroke="#6b472e"
          strokeWidth="2"
        />
        <text x={(w * s) / 2} y={-8} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{w}'</text>
        <text x={-12} y={(h * s) / 2} textAnchor="middle" className="fill-stone-700 text-xs font-bold" transform={`rotate(-90 -12 ${(h * s) / 2})`}>{h}'</text>
        <text x={(w * s + (w + bumpW) * s) / 2} y={bumpY * s - 8} textAnchor="middle" className="fill-stone-700 text-xs font-bold">{bumpW}'</text>
        <text x={(w + bumpW) * s + 12} y={(bumpY * s + (bumpY + bumpH) * s) / 2} textAnchor="middle" className="fill-stone-700 text-xs font-bold" transform={`rotate(90 ${(w + bumpW) * s + 12} ${(bumpY * s + (bumpY + bumpH) * s) / 2})`}>{bumpH}'</text>
      </svg>
    ),
  }
}

export default function SqFtChallenge() {
  const [room, setRoom] = useState<Room | null>(null)
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState<boolean | null>(null)
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
            <div className="font-bold text-lg">
              {score.correct}/{score.total}
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        {!room ? (
          <div className="text-center py-8">
            <p className="text-stone-500 mb-4">We'll show you a room shape with dimensions. You calculate the total square footage!</p>
            <button
              onClick={newRoom}
              className="bg-warm-700 hover:bg-warm-800 text-white px-6 py-3 rounded-xl font-semibold transition-all cursor-pointer"
            >
              Start Challenge
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-2">
              <span className="text-xs font-bold text-warm-500 uppercase tracking-widest">{room.name}</span>
            </div>

            <div className="py-4">{room.render(SCALE)}</div>

            <div className="flex items-center gap-3 max-w-xs mx-auto mt-4">
              <input
                type="number"
                value={answer}
                onInput={(e) => {
                  setAnswer((e.currentTarget as HTMLInputElement).value)
                  setResult(null)
                }}
                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                placeholder="Sq ft?"
                className="flex-1 border-2 border-warm-200 rounded-xl px-4 py-3 text-center text-lg font-bold focus:outline-none focus:border-warm-500 transition-colors"
                disabled={result !== null}
              />
              {result === null ? (
                <button
                  onClick={checkAnswer}
                  disabled={!answer}
                  className="bg-warm-700 hover:bg-warm-800 disabled:opacity-40 text-white px-5 py-3 rounded-xl font-semibold transition-all cursor-pointer"
                >
                  Check
                </button>
              ) : (
                <button
                  onClick={newRoom}
                  className="bg-warm-700 hover:bg-warm-800 text-white px-5 py-3 rounded-xl font-semibold transition-all cursor-pointer"
                >
                  Next
                </button>
              )}
            </div>

            {result !== null && (
              <div className={`text-center mt-4 p-3 rounded-xl text-sm font-semibold ${result ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {result ? 'Nailed it! You got it right.' : `Not quite — the answer is ${room.area} sq ft. ${room.hint}`}
              </div>
            )}

            {!showHint && result === null && (
              <button
                onClick={() => setShowHint(true)}
                className="block mx-auto mt-3 text-warm-500 hover:text-warm-700 text-xs font-medium transition-colors cursor-pointer"
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
