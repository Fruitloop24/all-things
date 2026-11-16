// Planner for /custom and /build: chips + short fields, plus a ballpark from general ranges
// (CONFIG.<page>.planner.pricing). The chips field named by `priceField` picks the price item;
// the number field named by `sizeField` is the size (sq ft or linear ft). Flat items need no size.
import { useState } from 'preact/hooks'
import { CONFIG } from '../../config'
import type { PriceRange, RangeItem, RangePricing, SimplePlannerConfig } from '../../config'
import { BallparkBox, Chips, PlannerCard, PriceTable, fieldLabel, inputClass, labelOf, rangeText, roundTo, sendToBook, summaryText } from './kit'

const PLANNERS: Record<'custom' | 'build', SimplePlannerConfig> = {
  custom: CONFIG.custom.planner,
  build: CONFIG.build.planner,
}

const UNIT_SUFFIX = { sqft: ' per sq ft', lf: ' per ft' } as const

function tableValue(item: RangeItem): string {
  if (item.unit === 'none' || !item.range) return 'Tell us about it'
  if (item.unit === 'flat') return rangeText(item.range) + (item.per ? ` ${item.per}` : '')
  return rangeText(item.range) + UNIT_SUFFIX[item.unit]
}

/** Ballpark for one item: flat = its range; sqft/lf = size x range; none or no size = null. */
export function itemBallpark(pricing: RangePricing, item: RangeItem | undefined, size: number): PriceRange | null {
  if (!item || !item.range || item.unit === 'none') return null
  const mult = item.unit === 'flat' ? 1 : size
  if (!(mult > 0)) return null
  return { low: roundTo(item.range.low * mult, pricing.roundTo), high: roundTo(item.range.high * mult, pricing.roundTo) }
}

export default function SimplePlanner({ kind }: { kind: keyof typeof PLANNERS }) {
  const cfg = PLANNERS[kind]
  const pricing = cfg.pricing ?? null
  const [values, setValues] = useState<Record<string, string>>({})
  const set = (k: string) => (v: string) => setValues((prev) => ({ ...prev, [k]: v }))

  const item = pricing && cfg.priceField ? pricing.items.find((i) => i.key === values[cfg.priceField!]) : undefined
  const sizeUnit = item && (item.unit === 'sqft' || item.unit === 'lf') ? item.unit : null
  const hideSize = (key: string) => key === cfg.sizeField && !!item && !sizeUnit
  const sizeLabel = (fallback: string) => (sizeUnit && cfg.sizeLabels ? cfg.sizeLabels[sizeUnit] : fallback)
  const size = cfg.sizeField ? Number(values[cfg.sizeField] ?? '') : 0
  const bp = pricing ? itemBallpark(pricing, item, size) : null

  const rows: [string, string][] = cfg.fields
    .filter((f) => !hideSize(f.key))
    .map((f) => {
      const v = (values[f.key] ?? '').trim()
      if (f.type === 'chips') return [f.short ?? f.label, labelOf(f.options ?? [], v)]
      if (f.key === cfg.sizeField && v) return [f.short ?? f.label, `about ${v}${sizeUnit === 'sqft' ? ' sq ft' : sizeUnit === 'lf' ? ' ft' : ''}`]
      return [f.short ?? f.label, v]
    })

  function send() {
    const sendRows: [string, string][] = bp ? [...rows, ['Ballpark', `${rangeText(bp)} (ballpark only)`]] : rows
    sendToBook(summaryText(cfg.summaryTitle, sendRows))
  }

  let extra = null
  if (bp) extra = <BallparkBox total={bp} />
  else if (item && item.unit === 'none') extra = <BallparkBox text="No set number for this one. Tell us about it and we will put one together." />
  else if (item && sizeUnit) extra = <BallparkBox text={`Add the ${sizeUnit === 'sqft' ? 'square feet' : 'length'} for a ballpark.`} />

  return (
    <PlannerCard
      eyebrow={cfg.eyebrow}
      headline={cfg.headline}
      subheadline={cfg.subheadline}
      rows={rows}
      extra={extra}
      disclaimer={pricing?.disclaimer}
      onSend={send}
    >
      {pricing && <PriceTable title="General numbers" rows={pricing.items.map((i) => [i.label, tableValue(i)] as [string, string])} />}

      {cfg.fields.map((f) => {
        if (hideSize(f.key)) return null
        const id = `planner-${kind}-${f.key}`
        if (f.type === 'chips')
          return (
            <div>
              <span class={fieldLabel}>{f.label}</span>
              <Chips name={f.label} options={f.options ?? []} value={values[f.key] ?? ''} onChange={set(f.key)} />
            </div>
          )
        const isNumber = f.type === 'number'
        return (
          <div>
            <label for={id} class={fieldLabel}>
              {f.key === cfg.sizeField ? sizeLabel(f.label) : f.label}
              {!isNumber && <span class="text-stone-400 font-normal"> (optional)</span>}
            </label>
            <input
              id={id}
              type={isNumber ? 'number' : 'text'}
              inputMode={isNumber ? 'numeric' : undefined}
              min={isNumber ? 1 : undefined}
              step={isNumber ? 1 : undefined}
              maxLength={isNumber ? undefined : 120}
              value={values[f.key] ?? ''}
              onInput={(e) => set(f.key)((e.target as HTMLInputElement).value)}
              placeholder={f.placeholder}
              class={`${isNumber ? 'w-40' : 'w-full'} ${inputClass}`}
            />
            {f.hint && <p class="text-xs text-stone-500 mt-1">{f.hint}</p>}
          </div>
        )
      })}
    </PlannerCard>
  )
}
