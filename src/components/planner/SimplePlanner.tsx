// Generic "tell us about it" planner (custom work, builds). No prices, by design.
import { useState } from 'preact/hooks'
import { CONFIG } from '../../config'
import type { SimplePlannerConfig } from '../../config'
import { Chips, PlannerCard, fieldLabel, inputClass, labelOf, sendToBook, summaryText } from './kit'

const PLANNERS: Record<'custom' | 'build', SimplePlannerConfig> = {
  custom: CONFIG.custom.planner,
  build: CONFIG.build.planner,
}

export default function SimplePlanner({ kind }: { kind: keyof typeof PLANNERS }) {
  const cfg = PLANNERS[kind]
  const [values, setValues] = useState<Record<string, string>>({})
  const set = (k: string) => (v: string) => setValues((prev) => ({ ...prev, [k]: v }))

  const rows: [string, string][] = cfg.fields.map((f) => {
    const v = values[f.key] ?? ''
    return [f.short ?? f.label, f.type === 'chips' ? labelOf(f.options ?? [], v) : v.trim()]
  })

  return (
    <PlannerCard
      eyebrow={cfg.eyebrow}
      headline={cfg.headline}
      subheadline={cfg.subheadline}
      rows={rows}
      onSend={() => sendToBook(summaryText(cfg.summaryTitle, rows))}
    >
      {cfg.fields.map((f) =>
        f.type === 'chips' ? (
          <div>
            <span class={fieldLabel}>{f.label}</span>
            <Chips name={f.label} options={f.options ?? []} value={values[f.key] ?? ''} onChange={set(f.key)} />
          </div>
        ) : (
          <div>
            <label for={`planner-${kind}-${f.key}`} class={fieldLabel}>
              {f.label} <span class="text-stone-400 font-normal">(optional)</span>
            </label>
            <input
              id={`planner-${kind}-${f.key}`}
              type="text"
              maxLength={120}
              value={values[f.key] ?? ''}
              onInput={(e) => set(f.key)((e.target as HTMLInputElement).value)}
              placeholder={f.placeholder}
              class={`w-full ${inputClass}`}
            />
            {f.hint && <p class="text-xs text-stone-500 mt-1">{f.hint}</p>}
          </div>
        )
      )}
    </PlannerCard>
  )
}
