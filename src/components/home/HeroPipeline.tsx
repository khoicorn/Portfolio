/** Animated sketch of the kind of system I build: sources → Python → outputs, with data dots flowing along the lines. */
const SOURCES = ['REST APIs', 'Google Sheets', 'Parquet files', 'Web scraping']
const OUTPUTS = ['Power BI', 'Lark bot', 'Excel report']
const SRC_Y = [58, 122, 186, 250]
const OUT_Y = [80, 154, 228]
const CENTER = { x: 196, y: 104, w: 128, h: 100 }
const MID_Y = CENTER.y + CENTER.h / 2

const srcPath = (y: number) => `M136 ${y} C170 ${y} 162 ${MID_Y} ${CENTER.x} ${MID_Y}`
const outPath = (y: number) => `M${CENTER.x + CENTER.w} ${MID_Y} C${CENTER.x + CENTER.w + 34} ${MID_Y} 350 ${y} 384 ${y}`

function Pill({ x, y, label, tone }: { x: number; y: number; label: string; tone: 'in' | 'out' }) {
  return (
    <g>
      <rect x={x} y={y - 17} width="120" height="34" rx="10" className="fill-surface stroke-line-2" strokeWidth="1" />
      <circle cx={x + 16} cy={y} r="4" className={tone === 'in' ? 'fill-accent' : 'fill-accent-3'} />
      <text x={x + 28} y={y + 4.5} className="fill-fg" fontSize="12.5" fontWeight="600">{label}</text>
    </g>
  )
}

export function HeroPipeline() {
  return (
    <figure className="card relative overflow-hidden" aria-label="Animated diagram: data sources flow into Python, then out to Power BI, a Lark bot and Excel reports">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2/70 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-muted">pipeline.py</span>
        <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-500">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-500 text-emerald-500" /> running
        </span>
      </div>

      <svg viewBox="0 0 520 300" className="block w-full" role="presentation">
        <defs>
          <radialGradient id="core-glow">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity=".45" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="core-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>

        {SRC_Y.map((y) => <path key={y} d={srcPath(y)} fill="none" className="stroke-line-2" strokeWidth="1.5" />)}
        {OUT_Y.map((y) => <path key={y} d={outPath(y)} fill="none" className="stroke-line-2" strokeWidth="1.5" />)}

        {SRC_Y.map((y, i) => (
          <circle key={`d${y}`} r="3.5" className="flow-dot fill-accent">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${-i * 0.6}s`} path={srcPath(y)} />
          </circle>
        ))}
        {OUT_Y.map((y, i) => (
          <circle key={`o${y}`} r="3.5" className="flow-dot fill-accent-3">
            <animateMotion dur="2s" repeatCount="indefinite" begin={`${-i * 0.66 - 0.3}s`} path={outPath(y)} />
          </circle>
        ))}

        {SOURCES.map((s, i) => <Pill key={s} x={16} y={SRC_Y[i]} label={s} tone="in" />)}
        {OUTPUTS.map((s, i) => <Pill key={s} x={384} y={OUT_Y[i]} label={s} tone="out" />)}

        <circle cx={CENTER.x + CENTER.w / 2} cy={MID_Y} r="96" fill="url(#core-glow)" />
        <rect x={CENTER.x} y={CENTER.y} width={CENTER.w} height={CENTER.h} rx="20" fill="url(#core-fill)" />
        <text x={CENTER.x + CENTER.w / 2} y={CENTER.y + 38} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700">Python</text>
        <text x={CENTER.x + CENTER.w / 2} y={CENTER.y + 56} textAnchor="middle" fill="#fff" fillOpacity=".8" fontSize="11">pandas · FastAPI · SQL</text>
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <rect
            key={n}
            x={CENTER.x + 30 + n * 12}
            y={CENTER.y + 66}
            width="7"
            height="20"
            rx="2"
            fill="#fff"
            fillOpacity=".85"
            className="eq-bar"
            style={{ animationDelay: `${-n * 0.17}s` }}
          />
        ))}
      </svg>

      <div className="border-t border-line bg-surface-2/50 px-4 py-3 font-mono text-[11px] leading-6 text-muted">
        <p><span className="text-emerald-500">✓</span> 4 sources collected and cleaned</p>
        <p><span className="text-emerald-500">✓</span> 15 checks passed</p>
        <p><span className="text-accent">→</span> report sent to Lark<span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-muted" /></p>
      </div>
    </figure>
  )
}
