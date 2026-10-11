import { Link } from 'react-router-dom'
import { BrainCircuit, Cloud, Code2, Database, MessageSquare, MonitorSmartphone, Wrench } from 'lucide-react'
import type { TechGroup, TechGroupEntry } from '@/data/types'

const ICONS: Record<TechGroup, typeof Database> = {
  Languages: Code2,
  'Data & Analytics': Database,
  'AI & LLM': BrainCircuit,
  'Cloud & Infra': Cloud,
  'Automation & Messaging': MessageSquare,
  Frontend: MonitorSmartphone,
  Tooling: Wrench,
}

export function TechGallery({ groups }: { groups: TechGroupEntry[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {groups.map((g) => {
        const Icon = ICONS[g.group]
        return (
          <section key={g.group} className="card p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-accent-soft text-accent">
                <Icon size={15} />
              </span>
              {g.group}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((t) => (
                <li key={t.name}>
                  <Link
                    to={`/projects?tech=${encodeURIComponent(t.name)}`}
                    className="group inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-sm transition-colors hover:border-accent hover:bg-accent-soft"
                    title={`${t.projectSlugs.length} project${t.projectSlugs.length === 1 ? '' : 's'}`}
                  >
                    {t.name}
                    <span className="font-mono text-[11px] text-muted group-hover:text-fg-2">{t.projectSlugs.length}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
