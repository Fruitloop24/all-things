import { useState, useMemo, useEffect, useRef } from 'preact/hooks'
import type { JSX } from 'preact'
import { CONFIG } from '../config'

const WORKER_URL = CONFIG.studio.workerUrl
const FLOOR_TYPES = CONFIG.pricing.floorTypes as Record<string, any>
const PREP = CONFIG.pricing.prep
const EXTRAS_PRICING = CONFIG.pricing.extras
const MARGIN = CONFIG.pricing.margin
const TAX_RATE = CONFIG.pricing.taxRate

const fmt = (n: number) =>
  n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const suggestions = CONFIG.studio.suggestions

export default function Studio() {
  const [tab, setTab] = useState<'visualizer' | 'calculator'>('visualizer')
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-center mb-5">
        <div className="inline-flex bg-warm-100 rounded-xl p-1 gap-1">
          {(['visualizer', 'calculator'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                tab === t ? 'bg-white text-warm-800 shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              {t === 'visualizer' ? 'AI Visualizer' : 'Cost Calculator'}
            </button>
          ))}
        </div>
      </div>
      {tab === 'visualizer' ? <VisualizerTab /> : <CalculatorTab />}
    </div>
  )
}

function VisualizerTab() {
  const [roomImage, setRoomImage] = useState<string | null>(null)
  const [roomFile, setRoomFile] = useState<File | null>(null)
  const [sampleImage, setSampleImage] = useState<string | null>(null)
  const [sampleFile, setSampleFile] = useState<File | null>(null)
  const [prompt, setPrompt] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const roomRef = useRef<HTMLInputElement>(null)
  const sampleRef = useRef<HTMLInputElement>(null)

  const handleRoomFile = (file: File | null | undefined) => {
    if (!file?.type.startsWith('image/')) return
    setRoomFile(file)
    const r = new FileReader()
    r.onload = (e) => setRoomImage(e.target?.result as string)
    r.readAsDataURL(file)
    setResultImage(null)
    setError(null)
  }

  const handleSampleFile = (file: File | null | undefined) => {
    if (!file?.type.startsWith('image/')) return
    setSampleFile(file)
    const r = new FileReader()
    r.onload = (e) => setSampleImage(e.target?.result as string)
    r.readAsDataURL(file)
    setPrompt('')
    setResultImage(null)
    setError(null)
  }

  const hasFlooring = sampleFile || prompt.trim().length > 3
  const canGenerate = !!roomFile && !!hasFlooring && !isProcessing

  const handleGenerate = async () => {
    if (!canGenerate) return
    setIsProcessing(true)
    setError(null)
    setResultImage(null)
    try {
      const form = new FormData()
      form.append('roomImage', roomFile!)
      if (sampleFile) form.append('flooringImage', sampleFile)
      else form.append('flooringDescription', prompt.trim())

      const res = await fetch(`${WORKER_URL}/generate`, { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || data.detail || 'Something went wrong')
      if (data.imageBase64 && data.imageMime) setResultImage(`data:${data.imageMime};base64,${data.imageBase64}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsProcessing(false)
    }
  }

  const reset = () => {
    setRoomImage(null)
    setRoomFile(null)
    setSampleImage(null)
    setSampleFile(null)
    setPrompt('')
    setResultImage(null)
    setError(null)
  }

  if (resultImage) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-warm-100 overflow-hidden">
        <div className="grid grid-cols-2">
          <div className="relative">
            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md z-10">Original</div>
            <img src={roomImage ?? ''} alt="Original" className="w-full h-[480px] object-cover" />
          </div>
          <div className="relative">
            <div className="absolute top-3 left-3 bg-warm-600 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md z-10 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              New Floor
            </div>
            <img src={resultImage} alt="AI result" className="w-full h-[480px] object-cover" />
          </div>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-warm-100">
          <div className="flex items-center gap-2">
            <a
              href={CONFIG.cta.quote.href}
              className="inline-flex items-center gap-1.5 bg-warm-700 hover:bg-warm-800 text-white px-5 py-2.5 rounded-lg font-semibold text-xs transition-all no-underline active:scale-[0.98]"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              {CONFIG.cta.quote.text}
            </a>
            <button
              onClick={() => {
                const a = document.createElement('a')
                a.download = 'my-new-floor.jpg'
                a.href = resultImage
                a.click()
              }}
              className="px-5 py-2.5 rounded-lg border border-warm-300 text-warm-700 text-xs font-semibold hover:bg-warm-50 transition-all cursor-pointer"
            >
              Save Image
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setResultImage(null)}
              className="px-4 py-2.5 rounded-lg border border-stone-200 text-stone-500 text-xs font-semibold hover:bg-stone-50 transition-all cursor-pointer"
            >
              Try Different Floor
            </button>
            <button
              onClick={reset}
              className="px-4 py-2.5 rounded-lg border border-stone-200 text-stone-500 text-xs font-semibold hover:bg-stone-50 transition-all cursor-pointer"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isProcessing) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-warm-100 flex items-center justify-center h-[540px]">
        <div className="text-center">
          <div className="relative w-14 h-14 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-warm-200 rounded-full" />
            <div className="absolute inset-0 border-4 border-warm-600 rounded-full border-t-transparent animate-spin" />
          </div>
          <p className="text-stone-700 font-semibold">Transforming your room...</p>
          <p className="text-stone-400 text-xs mt-1">This usually takes 15–30 seconds</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="bg-warm-50 border border-warm-200 rounded-xl px-5 py-3.5 mb-4 flex items-start gap-3">
        <span className="text-lg mt-0.5">📸</span>
        <div className="text-sm text-stone-600 leading-relaxed">
          <strong className="text-stone-800">Pro tip:</strong> Use a well-lit photo taken from about head height showing as much floor as possible — that gives the best results.
          <span className="text-stone-400 ml-1">
            Upload your room, pick a floor, and hit Visualize. Not sure what type? See our{' '}
            <a href="/resources" className="text-warm-600 hover:text-warm-700 underline">flooring guide</a>.
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-warm-100 overflow-hidden">
        <div className="flex">
          <div className="flex-1 min-w-0">
            {!roomImage ? (
              <div
                className="h-[360px] flex flex-col items-center justify-center cursor-pointer hover:bg-warm-50/30 transition-all border-r border-warm-100"
                onClick={() => roomRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  handleRoomFile(e.dataTransfer?.files?.[0])
                }}
              >
                <svg className="w-12 h-12 text-warm-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                </svg>
                <p className="text-stone-700 font-semibold text-sm">Upload your room photo</p>
                <p className="text-stone-400 text-xs mt-1">Well-lit with visible floor space works best</p>
                <input
                  ref={roomRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handleRoomFile((e.currentTarget as HTMLInputElement).files?.[0])}
                />
              </div>
            ) : (
              <div className="relative h-[360px]">
                <img src={roomImage} alt="Your room" className="w-full h-full object-cover" />
                <button
                  onClick={() => {
                    setRoomImage(null)
                    setRoomFile(null)
                    if (roomRef.current) roomRef.current.value = ''
                  }}
                  className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white w-7 h-7 rounded-full flex items-center justify-center cursor-pointer text-xs backdrop-blur-sm"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="w-44 shrink-0 border-l border-warm-100 flex flex-col">
            <div className="px-3 py-2.5 border-b border-warm-100 bg-warm-50/50">
              <p className="text-[10px] font-semibold text-stone-700 uppercase tracking-wider">Flooring Sample</p>
              <p className="text-[10px] text-stone-400">Optional photo</p>
            </div>
            {!sampleImage ? (
              <div
                className="flex-1 flex flex-col items-center justify-center cursor-pointer hover:bg-warm-50/30 transition-all px-3"
                onClick={() => sampleRef.current?.click()}
              >
                <svg className="w-8 h-8 text-warm-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p className="text-stone-500 text-[11px] font-medium text-center">Upload a photo of any flooring</p>
                <p className="text-stone-400 text-[10px] mt-1 text-center">Or just describe it below</p>
                <input
                  ref={sampleRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleSampleFile((e.currentTarget as HTMLInputElement).files?.[0])}
                />
              </div>
            ) : (
              <div className="flex-1 relative">
                <img src={sampleImage} alt="Sample" className="w-full h-full object-cover" />
                <button
                  onClick={() => {
                    setSampleImage(null)
                    setSampleFile(null)
                    if (sampleRef.current) sampleRef.current.value = ''
                  }}
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer text-[10px] backdrop-blur-sm"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="px-4 py-3 border-t border-warm-100 bg-stone-50/50">
          <div className="relative mb-2.5">
            <input
              type="text"
              value={prompt}
              onInput={(e) => {
                setPrompt((e.currentTarget as HTMLInputElement).value)
                if (sampleFile) {
                  setSampleFile(null)
                  setSampleImage(null)
                }
              }}
              placeholder={
                sampleFile
                  ? 'Using uploaded sample — or type here to describe instead'
                  : 'Describe the flooring you want — e.g. "dark walnut hardwood planks"'
              }
              className="w-full pl-4 pr-32 py-3 rounded-xl border border-warm-200 focus:border-warm-500 focus:ring-2 focus:ring-warm-200/50 outline-none text-sm text-stone-800 placeholder:text-stone-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && canGenerate) handleGenerate()
              }}
              disabled={!!sampleFile}
            />
            <button
              onClick={handleGenerate}
              disabled={!canGenerate}
              className={`absolute right-1.5 top-1.5 bottom-1.5 px-5 rounded-lg font-semibold text-xs transition-all flex items-center gap-1.5 ${
                canGenerate
                  ? 'bg-warm-700 hover:bg-warm-800 text-white cursor-pointer active:scale-[0.98]'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              Visualize
            </button>
          </div>

          {!sampleFile && (
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setPrompt(s)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                    prompt === s
                      ? 'bg-warm-700 text-white'
                      : 'bg-white text-stone-500 border border-warm-200 hover:border-warm-400 hover:text-stone-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {error && (
            <div className="mt-2.5 bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center justify-between">
              <p className="text-red-600 text-xs">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-600 text-xs cursor-pointer ml-3"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

type NumInputProps = {
  label: string
  value: number
  onChange: (v: number) => void
  max?: number
}

function NumInput({ label, value, onChange, max = 20 }: NumInputProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-stone-600">{label}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-9 h-9 rounded-lg bg-warm-100 hover:bg-warm-200 active:bg-warm-300 text-warm-800 text-lg font-bold flex items-center justify-center cursor-pointer transition-colors select-none"
        >
          -
        </button>
        <span className="w-8 text-center text-sm font-bold text-stone-800">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-9 h-9 rounded-lg bg-warm-100 hover:bg-warm-200 active:bg-warm-300 text-warm-800 text-lg font-bold flex items-center justify-center cursor-pointer transition-colors select-none"
        >
          +
        </button>
      </div>
    </div>
  )
}

type ToggleProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-stone-600">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`w-9 h-5 rounded-full transition-all cursor-pointer relative ${checked ? 'bg-warm-600' : 'bg-stone-200'}`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white shadow-sm absolute top-0.5 transition-all ${checked ? 'left-[18px]' : 'left-0.5'}`}
        />
      </button>
    </div>
  )
}

function CalculatorTab() {
  const [inputMode, setInputMode] = useState<'dimensions' | 'sqft'>('dimensions')
  const [width, setWidth] = useState('')
  const [length, setLength] = useState('')
  const [totalSqft, setTotalSqft] = useState('')
  const [floorType, setFloorType] = useState('lvp')
  const [installType, setInstallType] = useState<'pro' | 'diy'>('pro')

  const [demoOldFloor, setDemoOldFloor] = useState(false)
  const [furnitureRooms, setFurnitureRooms] = useState(0)
  const [doorways, setDoorways] = useState(0)
  const [baseboardLf, setBaseboardLf] = useState(0)
  const [quarterRoundLf, setQuarterRoundLf] = useState(0)
  const [toiletPulls, setToiletPulls] = useState(0)
  const [needsLeveling, setNeedsLeveling] = useState(false)
  const [tilePattern, setTilePattern] = useState(false)

  const isPro = installType === 'pro'
  const floor = FLOOR_TYPES[floorType]

  const sqft = useMemo(() => {
    if (inputMode === 'sqft') return parseFloat(totalSqft) || 0
    const w = parseFloat(width)
    const l = parseFloat(length)
    return w > 0 && l > 0 ? w * l : 0
  }, [inputMode, width, length, totalSqft])

  const estimate = useMemo(() => {
    if (!sqft || !floor) return null
    const coveredSqft = sqft * (1 + floor.waste)

    let materialPerSqft = floor.material
    for (const v of Object.values(floor.perSqft) as number[]) materialPerSqft += v
    if (floorType === 'tile' && tilePattern) materialPerSqft *= 1 + floor.patternUpcharge

    const materialsCost = coveredSqft * materialPerSqft

    let laborCost = 0
    if (isPro) laborCost = sqft * floor.labor

    let prepCost = 0
    let extrasCost = 0
    if (isPro) {
      if (demoOldFloor) prepCost += sqft * PREP.demo + PREP.haulOff
      if (needsLeveling) prepCost += sqft * PREP.leveling
      prepCost += furnitureRooms * PREP.furnitureMove
      extrasCost += doorways * EXTRAS_PRICING.doorwayTransition
      extrasCost += toiletPulls * EXTRAS_PRICING.toiletPull
      extrasCost += baseboardLf * (EXTRAS_PRICING.baseboard.material + EXTRAS_PRICING.baseboard.labor)
      extrasCost += quarterRoundLf * (EXTRAS_PRICING.quarterRound.material + EXTRAS_PRICING.quarterRound.labor)
    } else {
      extrasCost += doorways * EXTRAS_PRICING.doorwayTransition
      extrasCost += baseboardLf * EXTRAS_PRICING.baseboard.material
      extrasCost += quarterRoundLf * EXTRAS_PRICING.quarterRound.material
    }

    const tax =
      (materialsCost +
        baseboardLf * EXTRAS_PRICING.baseboard.material +
        quarterRoundLf * EXTRAS_PRICING.quarterRound.material +
        doorways * EXTRAS_PRICING.doorwayTransition) *
      TAX_RATE

    const subtotal = materialsCost + laborCost + prepCost + extrasCost
    const withMargin = subtotal * (1 + MARGIN)
    const total = withMargin + tax

    const low = total
    const high = total * 1.15

    return { materialsCost, laborCost, prepCost, extrasCost, tax, low, high, coveredSqft, sqft, materialPerSqft }
  }, [sqft, floor, floorType, isPro, demoOldFloor, furnitureRooms, doorways, baseboardLf, quarterRoundLf, toiletPulls, needsLeveling, tilePattern])

  const [displayLow, setDisplayLow] = useState(0)
  const [displayHigh, setDisplayHigh] = useState(0)
  const animRef = useRef<number | null>(null)
  useEffect(() => {
    const targetLow = estimate?.low || 0
    const targetHigh = estimate?.high || 0
    const startLow = displayLow
    const startHigh = displayHigh
    let frame = 0
    if (animRef.current !== null) cancelAnimationFrame(animRef.current)
    const tick = () => {
      frame++
      const ease = 1 - Math.pow(1 - frame / 20, 3)
      setDisplayLow(startLow + (targetLow - startLow) * ease)
      setDisplayHigh(startHigh + (targetHigh - startHigh) * ease)
      if (frame < 20) animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current)
    }
  }, [estimate?.low, estimate?.high])

  const presets = CONFIG.roomPresets

  return (
    <div>
      <div className="bg-warm-50 border border-warm-200 rounded-xl px-5 py-3.5 mb-5 flex items-start gap-3">
        <span className="text-lg mt-0.5">🧮</span>
        <div className="text-sm text-stone-600 leading-relaxed">
          <strong className="text-stone-800">Pick a floor, enter your room size, and add extras</strong> — you'll get an estimated range instantly.
          <span className="text-stone-400 ml-1">
            Need help measuring? Try our{' '}
            <a href="/resources" className="text-warm-600 hover:text-warm-700 underline">sq ft guide &amp; practice game</a>.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-warm-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading text-sm font-semibold text-stone-900">Flooring Type</h2>
              <div className="flex bg-stone-100 rounded-lg p-0.5 text-xs">
                <button
                  onClick={() => setInstallType('pro')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${isPro ? 'bg-white text-warm-700 shadow-sm' : 'text-stone-500'}`}
                >
                  Pro Install
                </button>
                <button
                  onClick={() => setInstallType('diy')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${!isPro ? 'bg-white text-warm-700 shadow-sm' : 'text-stone-500'}`}
                >
                  DIY
                </button>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {Object.entries(FLOOR_TYPES).map(([id, f]) => (
                <button
                  key={id}
                  onClick={() => {
                    setFloorType(id)
                    if (id !== 'tile') setTilePattern(false)
                  }}
                  className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border-2 transition-all cursor-pointer ${floorType === id ? 'border-warm-500 bg-warm-50' : 'border-warm-100 hover:border-warm-300'}`}
                >
                  <span className="text-base">{(f as any).icon}</span>
                  <span className="text-[10px] font-semibold text-stone-700 text-center leading-tight">{(f as any).label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-warm-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading text-sm font-semibold text-stone-900">Room Size</h2>
              <div className="flex bg-stone-100 rounded-lg p-0.5 text-xs">
                <button
                  onClick={() => setInputMode('dimensions')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${inputMode === 'dimensions' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500'}`}
                >
                  L x W
                </button>
                <button
                  onClick={() => setInputMode('sqft')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${inputMode === 'sqft' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500'}`}
                >
                  Sq Ft
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {presets.map((r) => (
                <button
                  key={r.name}
                  onClick={() => {
                    setInputMode('dimensions')
                    setWidth(String(r.w))
                    setLength(String(r.l))
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium rounded-lg border border-warm-200 text-stone-600 hover:bg-warm-100 transition-all cursor-pointer"
                >
                  <span>{r.emoji}</span>
                  {r.name}
                </button>
              ))}
            </div>
            {inputMode === 'dimensions' ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-medium text-stone-500 mb-1 uppercase tracking-wide">Length (ft)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={length}
                    onInput={(e) => setLength((e.currentTarget as HTMLInputElement).value)}
                    placeholder="0"
                    className="w-full px-3 py-2.5 rounded-xl border border-warm-200 focus:border-warm-500 focus:ring-2 focus:ring-warm-200/50 outline-none text-base font-semibold text-stone-800 bg-stone-50/50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-stone-500 mb-1 uppercase tracking-wide">Width (ft)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={width}
                    onInput={(e) => setWidth((e.currentTarget as HTMLInputElement).value)}
                    placeholder="0"
                    className="w-full px-3 py-2.5 rounded-xl border border-warm-200 focus:border-warm-500 focus:ring-2 focus:ring-warm-200/50 outline-none text-base font-semibold text-stone-800 bg-stone-50/50"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-[10px] font-medium text-stone-500 mb-1 uppercase tracking-wide">Total Square Feet</label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={totalSqft}
                  onInput={(e) => setTotalSqft((e.currentTarget as HTMLInputElement).value)}
                  placeholder="e.g. 200"
                  className="w-full px-3 py-2.5 rounded-xl border border-warm-200 focus:border-warm-500 focus:ring-2 focus:ring-warm-200/50 outline-none text-base font-semibold text-stone-800 bg-stone-50/50"
                />
              </div>
            )}
            {sqft > 0 && (
              <div className="mt-2 flex items-center justify-center gap-2 py-2 bg-warm-50 rounded-xl">
                <span className="text-base font-bold text-warm-700">{sqft.toLocaleString()}</span>
                <span className="text-stone-500 text-[10px]">sq ft</span>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-warm-100">
            <h2 className="font-heading text-sm font-semibold text-stone-900 mb-3">Project Details</h2>
            <div className="space-y-2.5">
              <NumInput label="Doorway transitions" value={doorways} onChange={setDoorways} />
              <NumInput label="Baseboard (linear ft)" value={baseboardLf} onChange={setBaseboardLf} max={500} />
              <NumInput label="Quarter round (linear ft)" value={quarterRoundLf} onChange={setQuarterRoundLf} max={500} />

              {floorType === 'tile' && (
                <Toggle label="Pattern layout (herringbone, diagonal)" checked={tilePattern} onChange={setTilePattern} />
              )}

              {isPro && (
                <>
                  <div className="border-t border-stone-100 pt-2 mt-2">
                    <span className="text-[10px] text-stone-400 font-medium uppercase tracking-wide">Pro Service Options</span>
                  </div>
                  <Toggle label="Remove old flooring" checked={demoOldFloor} onChange={setDemoOldFloor} />
                  <Toggle label="Floor leveling needed" checked={needsLeveling} onChange={setNeedsLeveling} />
                  <NumInput label="Rooms to move furniture" value={furnitureRooms} onChange={setFurnitureRooms} max={10} />
                  <NumInput label="Toilets to pull & reset" value={toiletPulls} onChange={setToiletPulls} max={5} />
                </>
              )}
            </div>
            <div className="mt-3 text-[10px] text-stone-400 bg-stone-50 rounded-lg px-3 py-2">
              {floorType === 'hardwood' && 'Includes underlayment + stain/finish'}
              {floorType === 'tile' && 'Includes thinset, backerboard & grout'}
              {floorType === 'carpet' && 'Includes carpet pad'}
              {(floorType === 'lvp' || floorType === 'laminate') && 'Includes underlayment'}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="bg-gradient-to-br from-warm-800 to-warm-900 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-warm-600/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <span className="text-[10px] text-warm-300 font-medium uppercase tracking-wider">Estimated Range</span>
                {sqft > 0 && estimate ? (
                  <>
                    <div className="text-3xl font-bold tracking-tight mt-1">
                      ${fmt(displayLow)} – ${fmt(displayHigh)}
                    </div>
                    <div className="text-warm-400 text-xs mt-1">
                      {floor.label} · {sqft.toLocaleString()} sf · {isPro ? 'Pro Install' : 'DIY'}
                    </div>
                  </>
                ) : (
                  <div className="text-3xl font-bold tracking-tight mt-1 text-warm-500">$—</div>
                )}
              </div>
            </div>

            {estimate && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-warm-100">
                <h3 className="text-xs font-semibold text-stone-900 mb-3">Breakdown</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">
                      Materials ({Math.ceil(estimate.coveredSqft)} sf incl. {Math.round(floor.waste * 100)}% waste)
                    </span>
                    <span className="font-semibold text-stone-800">${fmt(estimate.materialsCost)}</span>
                  </div>
                  {isPro && estimate.laborCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-stone-500">Installation labor</span>
                      <span className="font-semibold text-stone-800">${fmt(estimate.laborCost)}</span>
                    </div>
                  )}
                  {estimate.prepCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-stone-500">Prep (demo, leveling, furniture)</span>
                      <span className="font-semibold text-stone-800">${fmt(estimate.prepCost)}</span>
                    </div>
                  )}
                  {estimate.extrasCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-stone-500">Extras (transitions, trim, etc.)</span>
                      <span className="font-semibold text-stone-800">${fmt(estimate.extrasCost)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1.5 border-t border-stone-100">
                    <span className="text-stone-400">
                      {CONFIG.pricing.taxName} {Math.round(TAX_RATE * 100)}% (materials)
                    </span>
                    <span className="text-stone-500">${fmt(estimate.tax)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t-2 border-warm-200">
                    <span className="font-bold text-stone-900">Range</span>
                    <span className="font-bold text-warm-700">
                      ${fmt(estimate.low)} – ${fmt(estimate.high)}
                    </span>
                  </div>
                  <div className="text-center text-[10px] text-stone-400 pt-1">
                    That's{' '}
                    <strong className="text-stone-600">
                      ${(estimate.low / sqft).toFixed(2)} – ${(estimate.high / sqft).toFixed(2)}
                    </strong>{' '}
                    per sf {isPro ? 'installed' : 'materials'}
                  </div>
                </div>

                <div className="mt-4 bg-warm-50 rounded-xl px-3 py-2.5 text-[10px] text-warm-700 text-center leading-relaxed">
                  This is an estimate — most projects come in at or below the low end. Call for an exact quote tailored to your space.
                </div>

                <a
                  href={CONFIG.cta.quote.href}
                  className="mt-3 w-full bg-warm-700 hover:bg-warm-800 text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center no-underline transition-all active:scale-[0.98]"
                >
                  {CONFIG.cta.quote.text}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
