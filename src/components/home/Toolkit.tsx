import { Link } from 'react-router-dom'
import { BarChart3, Bot, Code2, Database, LayoutDashboard, Lightbulb, Sparkles, Workflow } from 'lucide-react'
import type { StrengthIcon } from '@/data/types'
import { projects, toolkit, usesToolkitItem } from '@/data'

const ICONS: Record<StrengthIcon, typeof Database> = {
  database: Database,
  bot: Bot,
  workflow: Workflow,
  layout: LayoutDashboard,
  sparkles: Sparkles,
  lightbulb: Lightbulb,
  'bar-chart': BarChart3,
  code: Code2,
}

/** One card, one row per group. Each tool links to the projects that use it. */
export function Toolkit() {
  return (
    <div className="card divide-y divide-line">
      {toolkit.map((g) => {
        const Icon = ICONS[g.icon]
        return (
          <section key={g.group} className="grid gap-3 px-5 py-4 sm:grid-cols-[170px_1fr] sm:items-center">
            <h3 className="flex items-center gap-2.5 text-sm font-semibold">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-accent-soft text-accent">
                <Icon size={15} />
              </span>
              {g.group}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((item) => {
                const count = projects.filter((p) => usesToolkitItem(p, item)).length
                return (
                  <li key={item.label}>
                    <Link
                      to={`/projects?tools=${encodeURIComponent(item.label)}`}
                      title={`Includes ${item.tools.join(', ')}`}
                      className="group inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-sm font-medium transition-colors hover:border-accent hover:bg-accent-soft"
                    >
                      {item.label}
                      <span className="font-mono text-[11px] text-muted group-hover:text-fg-2" aria-label={`${count} projects`}>{count}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
