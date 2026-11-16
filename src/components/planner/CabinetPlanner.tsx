import { useState } from 'preact/hooks'
import { CONFIG } from '../../config'
import type { CabinetPricing, PriceRange } from '../../config'
import { Chips, PlannerCard, fieldLabel, inputClass, labelOf, sendToBook, summaryText } from './kit'

const P = CONFIG.cabinets.planner
const PRICING: CabinetPricing | null = CONFIG.cabinets.pricing

const money = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`
const round100 = (n: number) => Math.round(n / 100) * 100
const rangeText = (r: PriceRange) => `${money(r.low)} to ${money(r.high)}`

/** Per-foot cabinet range for a grade; no grade or "not sure" = lowest low to highest high. */
function gradeRange(pricing: CabinetPricing, grade: string): PriceRange {
  const g = pricing.grades.find((x) => x.key === grade)
  if (g) return g.perLinearFoot
  return {
    low: Math.min(...pricing.grades.map((x) => x.perLinearFoot.low)),
    high: Math.max(...pricing.grades.map((x) => x.perLinearFoot.high)),
  }
}

export interface Ballpark {
  cabinets: PriceRange
  countertop: PriceRange | null
  countertopSqFt: number
  total: PriceRange
}

/** Ballpark, rounded to the nearest $100. Null without pricing or a wall length. */
export function ballpark(pricing: CabinetPricing | null, feet: number, grade: string, countertop: string): Ballpark | null {
  if (!pricing || !(feet > 0)) return null
  const per = gradeRange(pricing, grade)
  const cab = { low: feet * per.low, high: feet * per.high }
  const top = (pricing.countertopPerSqFt as Record<string, PriceRange | undefined>)[countertop]
  const sqft = feet * pricing.countertopSqFtPerLinearFoot
  const ct = top ? { low: sqft * top.low, high: sqft * top.high } : null
  return {
    cabinets: { low: round100(cab.low), high: round100(cab.high) },
    countertop: ct ? { low: round100(ct.low), high: round100(ct.high) } : null,
    countertopSqFt: sqft,
    total: { low: round100(cab.low + (ct?.low ?? 0)), high: round100(cab.high + (ct?.high ?? 0)) },
  }
}

export default function CabinetPlanner() {
  const [room, setRoom] = useState('')
  const [feet, setFeet] = useState('')
  const [grade, setGrade] = useState('')
  const [look, setLook] = useState('')
  const [countertop, setCountertop] = useState('')
  const [timing, setTiming] = useState('')

  const ft = Number(feet)
  const bp = ballpark(PRICING, ft, grade, countertop)
  const rows: [string, string][] = [
    ['Room', labelOf(P.rooms, room)],
    ['Wall length', ft > 0 ? `about ${ft} ft` : ''],
    ['Cabinet grade', labelOf(P.grades, grade)],
    ['Look', labelOf(P.looks, look)],
    ['Countertop', labelOf(P.countertops, countertop)],
    ['Timing', labelOf(P.timings, timing)],
  ]

  function send() {
    const sendRows: [string, string][] = bp ? [...rows, ['Ballpark', `${rangeText(bp.total)} (ballpark only, not a quote)`]] : rows
    sendToBook(summaryText('Cabinet Planner', sendRows))
  }

  const disclaimer = PRICING && <p class="text-xs text-stone-500 mt-2">{PRICING.disclaimer}</p>

  const extra = bp && (
    <div class="mt-4 pt-4 border-t border-warm-200">
      <div class="text-sm font-semibold text-stone-900 mb-1">Ballpark</div>
      <ul class="text-sm text-stone-700 space-y-0.5">
        <li>Cabinets: {rangeText(bp.cabinets)}</li>
        {bp.countertop && (
          <li>
            Countertop (about {bp.countertopSqFt} sq ft): {rangeText(bp.countertop)}
          </li>
        )}
      </ul>
      <div class="text-lg font-bold text-warm-800 mt-2">About {rangeText(bp.total)}</div>
      {disclaimer}
    </div>
  )

  return (
    <PlannerCard eyebrow={P.eyebrow} headline={P.headline} subheadline={P.subheadline} rows={rows} extra={extra} onSend={send}>
      {PRICING && (
        <div class="bg-warm-50 border border-warm-100 rounded-xl p-4">
          <div class="text-sm font-semibold text-stone-900 mb-2">General numbers, installed, per foot of wall</div>
          <table class="w-full text-sm text-stone-700">
            <tbody>
              {PRICING.grades.map((g) => (
                <tr class="border-b border-warm-100 last:border-0">
                  <td class="py-1 pr-3 whitespace-nowrap">{g.label}</td>
                  <td class="py-1 text-right whitespace-nowrap">{rangeText(g.perLinearFoot)} per ft</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p class="text-xs text-stone-500 mt-2">
            Countertops add{' '}
            {P.countertops
              .map((c) => {
                const r = (PRICING.countertopPerSqFt as Record<string, PriceRange | undefined>)[c.key]
                return r ? `${c.label.toLowerCase()} ${rangeText(r)}` : ''
              })
              .filter(Boolean)
              .join(', ')}{' '}
            per sq ft.
          </p>
          {disclaimer}
        </div>
      )}

      <div>
        <span class={fieldLabel}>Which room?</span>
        <Chips name="Room" options={P.rooms} value={room} onChange={setRoom} />
      </div>

      <div>
        <label for="planner-feet" class={fieldLabel}>
          Rough wall length <span class="text-stone-400 font-normal">(feet)</span>
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
          class={`w-32 ${inputClass}`}
        />
        <p class="text-xs text-stone-500 mt-1">Add up the walls that get cabinets. A guess is fine.</p>
      </div>

      <div>
        <span class={fieldLabel}>Cabinet grade</span>
        <Chips name="Cabinet grade" options={P.grades} value={grade} onChange={setGrade} />
      </div>

      <div>
        <span class={fieldLabel}>Look</span>
        <Chips name="Look" options={P.looks} value={look} onChange={setLook} />
      </div>

      <div>
        <span class={fieldLabel}>Countertop</span>
        <Chips name="Countertop" options={P.countertops} value={countertop} onChange={setCountertop} />
      </div>

      <div>
        <span class={fieldLabel}>Timing</span>
        <Chips name="Timing" options={P.timings} value={timing} onChange={setTiming} />
      </div>
    </PlannerCard>
  )
}
