import { Link } from 'react-router-dom'
import { ArrowRight, Check, Star } from 'lucide-react'
import type { Project } from '@/data/types'
import { categoryHue, getCategory } from '@/data'
import { ShotFrame, Tilt } from '@/components/project/ShotFrame'

/** Large featured card: screenshot on one side, the key facts on the other. */
export function SpotlightProject({ project }: { project: Project }) {
  const cover = project.images[0]
  const hue = categoryHue(project.category)
  const cat = getCategory(project.category)

  return (
    <article className="relative">
      <div className="glow-border pointer-events-none absolute -inset-px rounded-[1.6rem] opacity-60 blur-xl" aria-hidden="true" />
      <div className="glow-border relative rounded-[1.6rem] p-px">
        <div className="grid overflow-hidden rounded-[calc(1.6rem-1px)] bg-surface lg:grid-cols-[1.3fr_1fr]">
          <Link
            to={`/projects/${project.slug}`}
            className="relative block bg-bg-2/70 p-4 sm:p-7"
            aria-label={`${project.name} case study`}
            tabIndex={-1}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(70% 70% at 30% 20%, hsl(${hue} 80% 55% / 0.22), transparent 70%)` }}
              aria-hidden="true"
            />
            {cover && (
              <Tilt className="relative">
                <ShotFrame image={cover} label={project.name} />
              </Tilt>
            )}
          </Link>

          <div className="flex flex-col p-6 sm:p-8">
            <p className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-500">
                <Star size={10} className="fill-current" /> Top project
              </span>
              <span className="label-mono" style={{ color: `hsl(${hue} 70% 60%)` }}>{cat?.label}</span>
            </p>
            <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{project.name}</h3>
            <p className="mt-2 leading-relaxed text-muted">{project.tagline}</p>

            <ul className="mt-5 space-y-2.5">
              {project.results.slice(0, 2).map((r) => (
                <li key={r} className="flex gap-2.5 text-[15px] leading-relaxed text-fg-2">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {r}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t.name} className="chip">{t.name}</span>
              ))}
            </div>

            <Link to={`/projects/${project.slug}`} className="btn-primary group mt-7 h-11 self-start px-5">
              Read the case study <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
