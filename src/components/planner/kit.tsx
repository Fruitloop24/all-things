// Shared bits for the planner islands (Cabinet, Custom, Build): option chips,
// the summary box, and the hand-off of the summary to the /book form.
import type { ComponentChildren } from 'preact'
import { CONFIG } from '../../config'
import { PREFILL_KEY } from './prefill'

export type Option = { key: string; label: string }

export const RON = CONFIG.team.management[0].name.split(' ')[0]
export const JAYME = CONFIG.team.management[1].name.split(' ')[0]

export const labelOf = (opts: Option[], key: string) => opts.find((o) => o.key === key)?.label ?? ''

export const fieldLabel = 'block text-sm font-semibold text-stone-700 mb-2'
export const inputClass =
  'px-4 py-2.5 border border-warm-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-warm-500 focus:border-warm-500 bg-white'

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

/** Card shell: heading, the fields (children), summary list, extra block, send button. */
export function PlannerCard({
  eyebrow,
  headline,
  subheadline,
  rows,
  extra,
  onSend,
  children,
}: {
  eyebrow: string
  headline: string
  subheadline: string
  rows: [string, string][]
  extra?: ComponentChildren
  onSend: () => void
  children: ComponentChildren
}) {
  const filled = rows.filter(([, v]) => v)
  return (
    <div class="bg-white rounded-2xl border border-warm-100 p-6 md:p-8 shadow-sm">
      <div class="mb-6">
        <p class="text-warm-700 text-xs font-semibold tracking-widest uppercase mb-1">{eyebrow}</p>
        <h2 class="font-heading text-2xl md:text-3xl font-bold text-stone-900">{headline}</h2>
        <p class="text-stone-500 text-sm mt-1.5">{subheadline}</p>
      </div>

      <div class="space-y-6">{children}</div>

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
        {extra}
      </div>

      <button
        type="button"
        onClick={onSend}
        disabled={filled.length === 0}
        class="mt-6 w-full bg-warm-700 hover:bg-warm-800 text-white px-6 py-3.5 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Send this to {RON} and {JAYME} <span aria-hidden="true">→</span>
      </button>
      <p class="text-xs text-stone-500 text-center mt-2">Opens the estimate form with your summary filled in. Nothing is sent until you hit send there.</p>
    </div>
  )
}
