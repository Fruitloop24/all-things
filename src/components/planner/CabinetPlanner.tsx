import { useState } from 'preact/hooks'
import { CONFIG } from '../../config'
import type { CabinetPricing, PriceRange } from '../../config'
import { Chips, PlannerCard, Slider, fieldLabel, labelOf, rangeText, roundTo, sendToBook, summaryText } from './kit'

const P = CONFIG.cabinets.planner
const PRICING: CabinetPricing | null = CONFIG.cabinets.pricing
const round100 = (n: number) => roundTo(n, 100)

/** Ballpark total, rounded to the nearest $100. Null without pricing, a wall length or a grade. */
export function ballpark(pricing: CabinetPricing | null, feet: number, grade: string, countertop: string): PriceRange | null {
  const per = pricing?.grades.find((g) => g.key === grade)?.perLinearFoot
  if (!pricing || !per || !(feet > 0)) return null
  const top = (pricing.countertopPerSqFt as Record<string, PriceRange | undefined>)[countertop]
  const sqft = feet * pricing.countertopSqFtPerLinearFoot
  return {
    low: round100(feet * per.low + (top ? sqft * top.low : 0)),
    high: round100(feet * per.high + (top ? sqft * top.high : 0)),
  }
}

export default function CabinetPlanner() {
  const [room, setRoom] = useState(P.defaults.room)
  const [feet, setFeet] = useState(P.defaults.feet)
  const [grade, setGrade] = useState(P.defaults.grade)
  const [countertop, setCountertop] = useState(P.defaults.countertop)

  // Chips can be tapped off; fall back to the default so there is always a number.
  const g = grade || P.defaults.grade
  const c = countertop || P.defaults.countertop
  const bp = ballpark(PRICING, feet, g, c)
  const hasTop = c !== 'none'
  const line = `${feet} feet of ${labelOf(P.grades, g).toLowerCase()} cabinets${hasTop ? ` with a ${labelOf(P.countertops, c).toLowerCase()} countertop` : ''}, installed.`

  function send() {
    const rows: [string, string][] = [
      ['Room', labelOf(P.rooms, room)],
      ['Wall length', `about ${feet} ft`],
      ['Cabinets', labelOf(P.grades, g)],
      ['Countertop', labelOf(P.countertops, c)],
      ['Ballpark', bp ? `${rangeText(bp)} (ballpark only)` : ''],
    ]
    sendToBook(summaryText('Cabinet Planner', rows))
  }

  return (
    <PlannerCard
      eyebrow={P.eyebrow}
      headline={P.headline}
      subheadline={P.subheadline}
      total={bp}
      line={line}
      text="Tell us about it and we will put a number on it."
      disclaimer={PRICING?.disclaimer}
      onSend={send}
    >
      <div>
        <span class={fieldLabel}>Which room?</span>
        <Chips name="Room" options={P.rooms} value={room} onChange={setRoom} />
      </div>

      <Slider
        id="planner-feet"
        label="How much wall gets cabinets?"
        value={feet}
        min={4}
        max={40}
        step={1}
        unit="feet"
        hint={P.feetHint}
        onChange={setFeet}
      />

      <div>
        <span class={fieldLabel}>What kind of cabinets?</span>
        <Chips name="Cabinets" options={P.grades} value={g} onChange={setGrade} />
      </div>

      <div>
        <span class={fieldLabel}>New countertop?</span>
        <Chips name="Countertop" options={P.countertops} value={c} onChange={setCountertop} />
      </div>
    </PlannerCard>
  )
}
