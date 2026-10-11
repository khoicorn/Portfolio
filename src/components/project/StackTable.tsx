import type { StackRow } from '@/data/types'
import { TechBadge } from './TechBadge'

interface Props {
  rows: StackRow[]
  /** Tool names that exist in the project filter; these render as filter links. */
  linkable: Set<string>
}

/** Layer → tools → what they do. Rows stack on small screens. */
export function StackTable({ rows, linkable }: Props) {
  if (rows.length === 0) return null

  return (
    <div className="card overflow-hidden">
      <div className="hidden grid-cols-[120px_minmax(0,1fr)_minmax(0,1.3fr)] gap-4 border-b border-line bg-surface-2 px-5 py-2.5 md:grid">
        <span className="label-mono">Layer</span>
        <span className="label-mono">Tools</span>
        <span className="label-mono">Used for</span>
      </div>
      <ul className="divide-y divide-line">
        {rows.map((row) => (
          <li key={row.layer} className="grid gap-2 px-5 py-3.5 md:grid-cols-[120px_minmax(0,1fr)_minmax(0,1.3fr)] md:items-center md:gap-4">
            <span className="text-sm font-semibold">{row.layer}</span>
            <span className="flex flex-wrap gap-1.5">
              {row.tools.map((tool) => (
                <TechBadge key={tool} name={tool} linked={linkable.has(tool)} />
              ))}
              {row.planned?.map((tool) => (
                <span key={tool} className="chip border-dashed text-muted" title="Planned, not built yet">
                  {tool} <span className="text-[10px] uppercase tracking-wider">· planned</span>
                </span>
              ))}
            </span>
            <span className="text-sm leading-relaxed text-fg-2">{row.use}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
