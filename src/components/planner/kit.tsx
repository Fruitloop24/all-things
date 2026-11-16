// Shared bits for the planner islands (Cabinet, Custom, Build): option chips, money helpers,
// the ballpark result box, and the hand-off of the summary to the /book form.
import type { ComponentChildren } from 'preact'
import { CONFIG } from '../../config'
import type { PriceRange } from '../../config'
import { PREFILL_KEY } from './prefill'

export type Option = { key: string; label: string }

export const RON = CONFIG.team.management[0].name.split(' ')[0]
export const JAYME = CONFIG.team.management[1].name.split(' ')[0]

export const labelOf = (opts: Option[], key: string) => opts.find((o) => o.key === key)?.label ?? ''

export const fieldLabel = 'block text-sm font-semibold text-stone-700 mb-2'
export const inputClass =
  'px-4 py-2.5 border border-warm-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-warm-500 bg-white'

// ── Money helpers ──
export const money = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
export const roundTo = (n: number, step: number) => Math.round(n / step) * step
export const rangeText = (r: PriceRange) => money(r.low) + ' to ' + money(r.high)

export function Chips({ name, options, value, onChange }: { name: string; options: Option[]; value: string; onChange: (v: string) => void }) {
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

/** Build the plain-text message the /book form gets prefilled with. */
export function summaryText(title: string, rows: [string, string][]): string {
  return [title, ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)].join('\n')
}

/** Hand the summary to /book: sessionStorage first, ?message= if storage is blocked. */
export function sendToBook(message: string) {
  try {
    sessionStorage.setItem(PREFILL_KEY, message)
    window.location.href = CONFIG.booking
  } catch {
    window.location.href = `${CONFIG.booking}?message=${encodeURIComponent(message)}`
  }
}

/** Slider with the value read out next to it. Easier than typing a number on a phone. */
export function Slider({ id, label, value, min, max, step, unit, hint, onChange }: { id: string; label: string; value: number; min: number; max: number; step: number; unit: string; hint?: string; onChange: (v: number) => void }) {
  return (
    <div>
      <label for={id} class="flex items-baseline justify-between text-sm font-semibold text-stone-700 mb-2">
        <span>{label}</span>
        <span class="font-heading text-lg font-bold text-warm-800">
          {value.toLocaleString('en-US')} {unit}
        </span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={(e) => onChange(Number((e.target as HTMLInputElement).value))}
        class="w-full accent-warm-700 cursor-pointer"
      />
      {hint && <p class="text-xs text-stone-500 mt-1">{hint}</p>}
    </div>
  )
}

/**
 * Card shell: heading, a few fields (children), then one result box with the ballpark,
 * the send button and the phone number. Two columns on desktop, stacked on phones.
 */
export function PlannerCard({
  eyebrow,
  headline,
  subheadline,
  total,
  line,
  text,
  disclaimer,
  onSend,
  children,
}: {
  eyebrow: string
  headline: string
  subheadline: string
  /** The ballpark. Without it, `text` is shown instead. */
  total?: PriceRange | null
  /** One plain line under the number saying what it covers. */
  line?: string
  text?: string
  disclaimer?: string
  onSend: () => void
  children: ComponentChildren
}) {
  return (
    <div class="bg-white rounded-2xl border border-warm-100 p-6 md:p-8 shadow-sm">
      <div class="mb-6">
        <p class="text-warm-700 text-xs font-semibold tracking-widest uppercase mb-1">{eyebrow}</p>
        <h2 class="font-heading text-2xl md:text-3xl font-bold text-stone-900">{headline}</h2>
        <p class="text-stone-500 text-sm mt-1.5">{subheadline}</p>
      </div>

      <div class="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
        <div class="space-y-6">{children}</div>

        <div class="bg-warm-50 border border-warm-100 rounded-xl p-5 md:p-6 md:sticky md:top-36" aria-live="polite">
          <div class="text-xs font-semibold tracking-widest uppercase text-warm-700 mb-1">Your ballpark</div>
          {total ? (
            <div class="font-heading text-3xl font-bold text-stone-900 leading-tight">
              {money(total.low)} <span class="text-xl font-semibold text-stone-500">to</span> {money(total.high)}
            </div>
          ) : (
            <p class="font-heading text-xl font-bold text-stone-900">{text}</p>
          )}
          {line && <p class="text-sm text-stone-700 mt-2">{line}</p>}
          {disclaimer && <p class="text-xs text-stone-500 mt-2">{disclaimer}</p>}

          <button
            type="button"
            onClick={onSend}
            class="mt-5 w-full bg-warm-700 hover:bg-warm-800 text-white px-6 py-3.5 rounded-xl font-semibold transition-colors cursor-pointer"
          >
            Send this to {RON} and {JAYME} <span aria-hidden="true">→</span>
          </button>
          <a
            href={CONFIG.phone.href}
            class="mt-3 block w-full text-center border border-warm-300 hover:border-warm-500 text-warm-800 px-3 py-3 rounded-xl font-semibold no-underline whitespace-nowrap transition-colors"
          >
            Or call {CONFIG.phone.display}
          </a>
        </div>
      </div>
    </div>
  )
}
