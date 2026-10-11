import type { CSSProperties } from 'react'
import { ChevronRight } from 'lucide-react'
import type { ArchStep } from '@/data/types'

interface Props {
  steps: ArchStep[]
  hue: number
}

/** Left-to-right flow with every step visible. Stacks vertically on small screens. */
export function FlowDiagram({ steps, hue }: Props) {
  if (steps.length === 0) return null
  // More than 5 steps get too narrow in one row, so wrap them into rows of 3.
  const columns = steps.length > 5 ? 3 : steps.length

  return (
    <ol
      className="grid gap-3 lg:gap-4 lg:[grid-template-columns:repeat(var(--steps),minmax(0,1fr))]"
      style={{ '--steps': columns } as CSSProperties}
      aria-label="System flow"
    >
      {steps.map((step, i) => (
        <li key={step.label} className="card relative flex flex-col p-4">
          <div className="flex items-center gap-2.5">
            <span
              className="grid h-6 w-6 shrink-0 place-items-center rounded-md font-mono text-[11px] font-semibold text-white"
              style={{ background: `hsl(${hue} 70% 48%)` }}
            >
              {i + 1}
            </span>
            <h3 className="text-sm font-semibold">{step.label}</h3>
          </div>
          <p className="mt-2.5 text-sm leading-relaxed text-fg-2">{step.detail}</p>
          {step.planned && (
            <p className="mt-3 rounded-lg border border-dashed border-line-2 px-2.5 py-2 text-xs leading-relaxed text-muted">
              <span className="mr-1 font-mono text-[10px] font-semibold uppercase tracking-wider" style={{ color: `hsl(${hue} 70% 60%)` }}>
                Planned
              </span>
              {step.planned}
            </p>
          )}
          {i < steps.length - 1 && (i + 1) % columns !== 0 && (
            <ChevronRight
              size={14}
              className="absolute -right-[15px] top-1/2 z-10 hidden -translate-y-1/2 text-muted lg:block"
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ol>
  )
}
