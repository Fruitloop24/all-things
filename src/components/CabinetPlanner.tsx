import { useState } from 'preact/hooks'
import { CONFIG } from '../config'
import type { CabinetPricing, PriceRange } from '../config'
import { PREFILL_KEY } from '../prefill'

const P = CONFIG.cabinets.planner
const PRICING: CabinetPricing | null = CONFIG.cabinets.pricing
const RON = CONFIG.team.management[0].name.split(' ')[0]
const JAMIE = CONFIG.team.management[1].name.split(' ')[0]

type Option = { key: string; label: string }

const labelOf = (opts: Option[], key: string) => opts.find((o) => o.key === key)?.label ?? ''
const money = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`

function Chips({ name, options, value, onChange }: { name: string; options: Option[]; value: string; onChange: (v: string) => void }) {
  return (
    <div role="radiogroup" aria-label={name} class="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value === o.key
        return (
          <button
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(on ? '' : o.key)}
            class={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors cursor-pointer ${on ? 'bg-warm-700 border-warm-700 text-white' : 'bg-white border-warm-200 text-stone-700 hover:border-warm-400'}`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

/** Price lines, only when CONFIG.cabinets.pricing is filled in and a wall length is given. */
function priceLines(feet: number, countertop: string): { label: string; range: PriceRange }[] {
  if (!PRICING || !(feet > 0)) return []
  const top = (PRICING.countertopPerLinearFoot as Record<string, PriceRange | undefined>)[countertop]
  return PRICING.grades.map((g) => ({
    label: g.label,
    range: {
      low: feet * (g.perLinearFoot.low + (top?.low ?? 0)),
      high: feet * (g.perLinearFoot.high + (top?.high ?? 0)),
    },
  }))
}

export default function CabinetPlanner() {
  const [room, setRoom] = useState('')
  const [feet, setFeet] = useState('')
  const [look, setLook] = useState('')
  const [countertop, setCountertop] = useState('')
  const [timing, setTiming] = useState('')

  const ft = Number(feet)
  const rows: [string, string][] = [
    ['Room', labelOf(P.rooms, room)],
    ['Wall length', ft > 0 ? `about ${ft} ft` : ''],
    ['Look', labelOf(P.looks, look)],
    ['Countertop', labelOf(P.countertops, countertop)],
    ['Timing', labelOf(P.timings, timing)],
  ]
  const filled = rows.filter(([, v]) => v)
  const prices = priceLines(ft, countertop)

  function summaryText(): string {
    return ['Cabinet Planner', ...filled.map(([k, v]) => `${k}: ${v}`)].join('\n')
  }

  function send() {
    const msg = summaryText()
    try {
      sessionStorage.setItem(PREFILL_KEY, msg)
      window.location.href = CONFIG.booking
    } catch {
      window.location.href = `${CONFIG.booking}?message=${encodeURIComponent(msg)}`
    }
  }

  const label = 'block text-sm font-semibold text-stone-700 mb-2'

  return (
    <div class="bg-white rounded-2xl border border-warm-100 p-6 md:p-8 shadow-sm">
      <div class="mb-6">
        <p class="text-warm-700 text-xs font-semibold tracking-widest uppercase mb-1">{P.eyebrow}</p>
        <h2 class="font-heading text-2xl md:text-3xl font-bold text-stone-900">{P.headline}</h2>
        <p class="text-stone-500 text-sm mt-1.5">{P.subheadline}</p>
      </div>

      <div class="space-y-6">
        <div>
          <span class={label}>Which room?</span>
          <Chips name="Room" options={P.rooms} value={room} onChange={setRoom} />
        </div>

        <div>
          <label for="planner-feet" class={label}>
            Rough wall length <span class="text-stone-400 font-normal">(feet, optional)</span>
          </label>
          <input
            id="planner-feet"
            type="number"
            inputMode="numeric"
            min={1}
            max={200}
            step={1}
            value={feet}
            onInput={(e) => setFeet((e.target as HTMLInputElement).value)}
            placeholder="14"
            class="w-32 px-4 py-2.5 border border-warm-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-warm-500 bg-white"
          />
          <p class="text-xs text-stone-500 mt-1">Add up the walls that get cabinets. A guess is fine.</p>
        </div>

        <div>
          <span class={label}>Look</span>
          <Chips name="Look" options={P.looks} value={look} onChange={setLook} />
        </div>

        <div>
          <span class={label}>Countertop</span>
          <Chips name="Countertop" options={P.countertops} value={countertop} onChange={setCountertop} />
        </div>

        <div>
          <span class={label}>Timing</span>
          <Chips name="Timing" options={P.timings} value={timing} onChange={setTiming} />
        </div>
      </div>

      <div class="mt-8 bg-warm-50 border border-warm-100 rounded-xl p-5" aria-live="polite">
        <div class="font-semibold text-stone-900 mb-2">Your summary</div>
        {filled.length === 0 ? (
          <p class="text-sm text-stone-500">Pick a few options above and your summary shows up here.</p>
        ) : (
          <dl class="text-sm text-stone-700 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            {filled.map(([k, v]) => (
              <>
                <dt class="text-stone-500">{k}</dt>
                <dd class="font-medium">{v}</dd>
              </>
            ))}
          </dl>
        )}

        {prices.length > 0 && (
          <div class="mt-4 pt-4 border-t border-warm-200">
            <div class="text-sm font-semibold text-stone-900 mb-1">Ballpark range</div>
            <ul class="text-sm text-stone-700 space-y-0.5">
              {prices.map((p) => (
                <li>
                  {p.label}: {money(p.range.low)} to {money(p.range.high)}
                </li>
              ))}
            </ul>
            {PRICING?.note && <p class="text-xs text-stone-500 mt-2">{PRICING.note}</p>}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={send}
        disabled={filled.length === 0}
        class="mt-6 w-full bg-warm-700 hover:bg-warm-800 text-white px-6 py-3.5 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Send this to {RON} and {JAMIE} <span aria-hidden="true">→</span>
      </button>
      <p class="text-xs text-stone-500 text-center mt-2">Opens the estimate form with your summary filled in. Nothing is sent until you hit send there.</p>
    </div>
  )
}
