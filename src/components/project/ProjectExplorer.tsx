import { useDeferredValue, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { categories, projects, techCounts } from '@/data'
import { cn } from '@/lib/utils'
import { ProjectCard } from './ProjectCard'
import { TechBadge } from './TechBadge'

const TOP_TECH = 14

export function ProjectExplorer() {
  const [params, setParams] = useSearchParams()
  const reduce = useReducedMotion()
  const q = params.get('q') ?? ''
  const cat = params.get('cat') ?? 'all'
  const tech = useMemo(() => (params.get('tech') ?? '').split(',').filter(Boolean), [params])
  const [showAllTech, setShowAllTech] = useState(false)
  const dq = useDeferredValue(q.trim().toLowerCase())

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(patch)) {
      if (!v) next.delete(k)
      else next.set(k, v)
    }
    setParams(next, { replace: true })
  }

  const toggleTech = (name: string) => {
    const set = new Set(tech)
    if (set.has(name)) set.delete(name)
    else set.add(name)
    update({ tech: [...set].join(',') || null })
  }

  const results = useMemo(() => {
    return projects.filter((p) => {
      if (cat !== 'all' && p.category !== cat) return false
      if (tech.length && !tech.every((t) => p.tech.some((x) => x.name === t))) return false
      if (dq) {
        const hay = [p.name, p.tagline, p.summary, p.domain, ...p.tech.map((t) => t.name)].join(' ').toLowerCase()
        if (!hay.includes(dq)) return false
      }
      return true
    })
  }, [cat, tech, dq])

  const groups = [
    { id: 'work', label: 'Work projects', note: 'Data, BI and automation. Company projects are sanitized.', items: results.filter((p) => !p.personal) },
    { id: 'personal', label: 'Personal projects', note: 'Side projects I designed and built', items: results.filter((p) => p.personal) },
  ].filter((group) => group.items.length > 0)
  const showGroupHeadings = groups.length > 1

  const visibleTech = showAllTech ? techCounts : techCounts.slice(0, TOP_TECH)
  const hasFilters = q !== '' || cat !== 'all' || tech.length > 0

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search projects</span>
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={q}
            onChange={(e) => update({ q: e.target.value || null })}
            placeholder="Search by name, problem, or technology"
            className="h-11 w-full rounded-xl border border-line bg-surface pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </label>
        {hasFilters && (
          <button type="button" onClick={() => setParams({}, { replace: true })} className="btn-ghost h-11">
            <X size={14} /> Clear filters
          </button>
        )}
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Category">
        {[{ id: 'all', label: 'All projects' }, ...categories].map((c) => {
          const n = c.id === 'all' ? projects.length : projects.filter((p) => p.category === c.id).length
          const active = cat === c.id
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => update({ cat: c.id === 'all' ? null : c.id })}
              className={cn(
                'inline-flex shrink-0 items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors',
                active ? 'border-fg bg-fg text-bg' : 'border-line bg-surface text-fg-2 hover:border-line-2 hover:text-fg',
              )}
            >
              {c.label}
              <span className={cn('font-mono text-[11px]', active ? 'opacity-70' : 'text-muted')}>{n}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 inline-flex items-center gap-1 label-mono">
          <SlidersHorizontal size={12} /> Tech
        </span>
        {visibleTech.map((t) => (
          <TechBadge key={t.name} name={t.name} count={t.count} active={tech.includes(t.name)} onClick={() => toggleTech(t.name)} />
        ))}
        {techCounts.length > TOP_TECH && (
          <button type="button" onClick={() => setShowAllTech((s) => !s)} className="chip text-muted hover:text-fg">
            {showAllTech ? 'Show fewer' : `+${techCounts.length - TOP_TECH} more`}
          </button>
        )}
      </div>

      <p className="mt-6 font-mono text-xs text-muted" aria-live="polite">
        {results.length} {results.length === 1 ? 'project' : 'projects'}
        {hasFilters ? ' match' : ''}
      </p>

      {results.length === 0 ? (
        <div className="card mt-4 flex flex-col items-center gap-3 px-6 py-16 text-center">
          <p className="text-sm text-muted">No project matches these filters.</p>
          <button type="button" onClick={() => setParams({}, { replace: true })} className="btn-ghost">
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-4 space-y-10">
          {groups.map((group) => (
            <section key={group.id} aria-label={group.label}>
              {showGroupHeadings && (
                <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line pb-2">
                  <h2 className="text-lg font-semibold tracking-tight">{group.label}</h2>
                  <span className="text-sm text-muted">{group.note}</span>
                </div>
              )}
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence initial={false}>
                  {group.items.map((p) => (
                    <motion.li
                      key={p.slug}
                      layout={!reduce}
                      initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                    >
                      <ProjectCard project={p} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
