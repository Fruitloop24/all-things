// Planner for /custom and /build: pick the job, set a rough size if it is priced by size,
// get a ballpark from CONFIG.<page>.planner.pricing. Flat items need no size.
import { useState } from 'preact/hooks'
import { CONFIG } from '../../config'
import type { PriceRange, RangeItem, RangePricing, SimplePlannerConfig } from '../../config'
import { Chips, PlannerCard, Slider, fieldLabel, rangeText, roundTo, sendToBook, summaryText } from './kit'

const PLANNERS: Record<'custom' | 'build', SimplePlannerConfig> = {
  custom: CONFIG.custom.planner,
  build: CONFIG.build.planner,
}

const UNIT = { sqft: 'sq ft', lf: 'feet' } as const

/** Ballpark for one item: flat = its range; sqft/lf = size x range; none = null. */
export function itemBallpark(pricing: RangePricing, item: RangeItem | undefined, size: number): PriceRange | null {
  if (!item || !item.range || item.unit === 'none') return null
  const mult = item.unit === 'flat' ? 1 : size
  if (!(mult > 0)) return null
  return { low: roundTo(item.range.low * mult, pricing.roundTo), high: roundTo(item.range.high * mult, pricing.roundTo) }
}

export default function SimplePlanner({ kind }: { kind: keyof typeof PLANNERS }) {
  const cfg = PLANNERS[kind]
  const pricing = cfg.pricing
  const [key, setKey] = useState(cfg.defaultItem)
  const [sizes, setSizes] = useState<Record<string, number>>({})

  const item = pricing.items.find((i) => i.key === (key || cfg.defaultItem))!
  const sized = item.unit === 'sqft' || item.unit === 'lf' ? item.size : undefined
  const size = sized ? (sizes[item.key] ?? sized.start) : 0
  const bp = itemBallpark(pricing, item, size)
  const unit = item.unit === 'sqft' || item.unit === 'lf' ? UNIT[item.unit] : ''
  const line = bp ? `${item.label}${sized ? `, about ${size.toLocaleString('en-US')} ${unit}` : ''}.` : undefined

  function send() {
    const rows: [string, string][] = [
      [cfg.itemShort, item.label],
      ['Size', sized ? `about ${size.toLocaleString('en-US')} ${unit}` : ''],
      ['Ballpark', bp ? `${rangeText(bp)} (ballpark only)` : ''],
    ]
    sendToBook(summaryText(cfg.summaryTitle, rows))
  }

  return (
    <PlannerCard
      eyebrow={cfg.eyebrow}
      headline={cfg.headline}
      subheadline={cfg.subheadline}
      total={bp}
      line={line}
      text="Every one of these is different. Send it over or call and we will put a number on it."
      disclaimer={bp ? pricing.disclaimer : undefined}
      onSend={send}
    >
      <div>
        <span class={fieldLabel}>{cfg.itemLabel}</span>
        <Chips name={cfg.itemShort} options={pricing.items} value={item.key} onChange={setKey} />
      </div>

      {sized && (
        <Slider
          id={`planner-${kind}-size`}
          label={item.unit === 'sqft' ? 'About how big?' : 'About how long?'}
          value={size}
          min={sized.min}
          max={sized.max}
          step={sized.step}
          unit={unit}
          hint="A guess is fine."
          onChange={(v) => setSizes((prev) => ({ ...prev, [item.key]: v }))}
        />
      )}
    </PlannerCard>
  )
}
