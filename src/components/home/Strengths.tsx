import { Link } from 'react-router-dom'
import { BarChart3, Bot, Code2, Database, LayoutDashboard, Lightbulb, Sparkles, Workflow } from 'lucide-react'
import type { StrengthIcon, Strength } from '@/data/types'
import { getProject } from '@/data'
import { Reveal } from '@/components/layout/Reveal'

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

export function Strengths({ items, limit }: { items: Strength[]; limit?: number }) {
  const shown = limit ? items.slice(0, limit) : items
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {shown.map((s, i) => {
        const Icon = ICONS[s.icon]
        return (
          <Reveal key={s.title} delay={i * 0.04}>
            <li className="card flex h-full flex-col p-5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent">
                <Icon size={18} />
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.evidence}</p>
              {s.projects.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.projects.map((slug) => {
                    const p = getProject(slug)
                    if (!p) return null
                    return (
                      <Link key={slug} to={`/projects/${slug}`} className="chip hover:border-line-2 hover:text-fg">
                        {p.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </li>
          </Reveal>
        )
      })}
    </ul>
  )
}
