import { Link } from 'react-router-dom'
import { ArrowUpRight, Lock, Server, Star, User } from 'lucide-react'
import type { Project } from '@/data/types'
import { categoryHue, getCategory } from '@/data'
import { spot, withBase } from '@/lib/utils'
import { ProjectThumb } from './ProjectThumb'
import { GitHubIcon } from '@/components/layout/Icons'

interface Props {
  project: Project
  compact?: boolean
}

export function ProjectCard({ project, compact }: Props) {
  const cat = getCategory(project.category)
  const hue = categoryHue(project.category)
  const cover = project.images[0]
  // Hosting has its own chip, so it is not counted in the tool list.
  const tools = project.tech.filter((t) => t.name !== project.hosting)
  const shown = tools.slice(0, compact ? 3 : 4)
  const more = tools.length - shown.length

  return (
    <article onMouseMove={spot} className="group card spotlight relative flex h-full min-w-0 flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_48px_-24px_var(--glow)]">
      <Link to={`/projects/${project.slug}`} className="block min-w-0" aria-label={`${project.name} case study`}>
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-bg-2">
          {cover ? (
            <img
              src={withBase(cover.src)}
              alt={cover.alt}
              loading="lazy"
              className="block h-full w-full max-w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <ProjectThumb
              slug={project.slug}
              glyph={project.glyph}
              hue={hue}
              className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}
          {cover?.recreated && (
            <span className="absolute bottom-3 right-3 rounded-md border border-white/15 bg-black/60 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-white/80 backdrop-blur">
              Recreated · sample data
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="label-mono" style={{ color: `hsl(${hue} 70% 60%)` }}>
            {cat?.label ?? project.category}
          </span>
          <span className="inline-flex shrink-0 items-center gap-2.5 font-mono text-[10px] text-muted">
            {project.featured && (
              <span className="inline-flex items-center gap-1 text-fg-2"><Star size={10} className="fill-current text-amber-400" /> featured</span>
            )}
            {project.personal && (
              <span className="inline-flex items-center gap-1"><User size={10} /> personal</span>
            )}
            {project.confidential && (
              <span className="inline-flex items-center gap-1" title="Sanitized company case study"><Lock size={10} /> sanitized</span>
            )}
          </span>
        </div>
        <h3 className="mt-2 text-base font-semibold tracking-tight">
          <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {project.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{project.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {shown.map((t) => (
            <span key={t.name} className="chip">
              {t.name}
            </span>
          ))}
          {more > 0 && <span className="chip text-muted">+{more}</span>}
          {project.hosting && (
            <span className="chip text-muted"><Server size={10} /> {project.hosting}</span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 text-sm">
          <span className="inline-flex items-center gap-1 font-medium text-fg-2 group-hover:text-fg">
            Case study <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-muted hover:text-fg"
              aria-label={`${project.name} on GitHub`}
            >
              <GitHubIcon /> <span className="font-mono text-xs">repo</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
