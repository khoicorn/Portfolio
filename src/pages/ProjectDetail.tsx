import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Check, ExternalLink, Layers, Lock, Server, Sparkles, User } from 'lucide-react'
import { categoryHue, getCategory, getProject, neighbors } from '@/data'
import { useTitle } from '@/lib/useTitle'
import { ProjectThumb } from '@/components/project/ProjectThumb'
import { FlowDiagram } from '@/components/project/FlowDiagram'
import { Gallery } from '@/components/project/Gallery'
import { Lightbox } from '@/components/project/Lightbox'
import { SectionNav, type SectionLink } from '@/components/project/SectionNav'
import { ShotFrame, Tilt } from '@/components/project/ShotFrame'
import { StackTable } from '@/components/project/StackTable'
import { TechBadge } from '@/components/project/TechBadge'
import { GitHubIcon } from '@/components/layout/Icons'

function SummaryCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card p-5">
      <h2 className="label-mono">{title}</h2>
      <div className="mt-3 text-[15px] leading-relaxed text-fg-2">{children}</div>
    </section>
  )
}

function Section({ id, label, title, note, children }: { id: string; label: string; title: string; note?: string; children: ReactNode }) {
  return (
    <section id={id.replace(/-h$/, '')} aria-labelledby={id} className="scroll-mt-36">
      <p className="label-mono">{label}</p>
      <h2 id={id} className="mt-2 text-xl font-semibold tracking-tight">{title}</h2>
      {note && <p className="mt-1.5 text-sm text-muted">{note}</p>}
      <div className="mt-5">{children}</div>
    </section>
  )
}

export default function ProjectDetail() {
  const { slug = '' } = useParams()
  const project = getProject(slug)
  useTitle(project?.name, project?.tagline)
  const [zoom, setZoom] = useState<number | null>(null)
  const count = project?.images.length ?? 0
  const closeZoom = useCallback(() => setZoom(null), [])
  const stepZoom = useCallback((d: number) => setZoom((i) => (i === null ? null : (i + d + count) % count)), [count])
  const sections = useMemo<SectionLink[]>(() => {
    if (!project) return []
    return [
      { id: 'overview', label: 'Overview' },
      ...(project.images.length > 1 ? [{ id: 'screens', label: 'Screens' }] : []),
      { id: 'stack', label: 'Tech stack' },
      { id: 'flow', label: 'How it works' },
      ...(project.challenges.length ? [{ id: 'challenges', label: 'Challenges' }] : []),
    ]
  }, [project])
  if (!project) return <Navigate to="/projects" replace />

  const category = getCategory(project.category)
  const hue = categoryHue(project.category)
  const cover = project.images[0]
  const linkable = new Set(project.tech.map((item) => item.name))
  const { prev, next } = neighbors(project.slug)

  return (
    <article className="container-x py-10 sm:py-14">
      <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
        <ArrowLeft size={14} /> All projects
      </Link>

      <header className="mt-7 grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="label-mono" style={{ color: `hsl(${hue} 70% 60%)` }}>
              {category?.label ?? project.category}
            </span>
            {project.personal && (
              <span className="chip"><User size={11} /> personal project</span>
            )}
            {project.confidential && (
              <span className="chip"><Lock size={11} /> sanitized case study</span>
            )}
            {project.aiAssisted && (
              <span className="chip"><Sparkles size={11} /> AI-assisted</span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{project.name}</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{project.tagline}</p>

          <div className="mt-6">
            <p className="label-mono">Built with</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.tech.filter((item) => item.name !== project.hosting).map((item) => <TechBadge key={item.name} name={item.name} linked />)}
              {project.hosting && (
                <span className="chip border-accent/40 bg-accent-soft text-fg"><Server size={11} /> Hosted on {project.hosting}</span>
              )}
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-2.5 text-sm sm:grid-cols-3">
            {[
              { icon: Calendar, label: 'Timeline', value: project.dateRange },
              { icon: Layers, label: 'Scope', value: project.size },
              { icon: BookOpen, label: 'Domain', value: project.domain },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl border border-line bg-surface/60 px-3.5 py-2.5 backdrop-blur last:col-span-2 sm:last:col-span-1">
                <dt className="label-mono inline-flex items-center gap-1"><Icon size={11} /> {label}</dt>
                <dd className="mt-1 font-medium leading-snug">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="relative min-w-0">
          <div
            className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] opacity-90 blur-3xl"
            style={{ background: `radial-gradient(60% 60% at 50% 50%, hsl(${hue} 80% 55% / 0.32), transparent 72%)` }}
            aria-hidden="true"
          />
          {cover ? (
            <Tilt>
              <ShotFrame image={cover} label={project.name} onZoom={() => setZoom(0)} />
            </Tilt>
          ) : (
            <div className="card overflow-hidden">
              <div className="aspect-[16/10] bg-bg-2">
                <ProjectThumb slug={project.slug} glyph={project.glyph} hue={hue} className="h-full w-full" />
              </div>
            </div>
          )}
          <figcaption className="mt-3 px-1 text-xs leading-relaxed text-muted">
            {cover?.caption ?? 'Illustration only. No screenshots are published for this project.'}
          </figcaption>
        </figure>
      </header>

      <div className="mt-10 space-y-10">
        <SectionNav items={sections} />

        <div id="overview" className="grid scroll-mt-36 gap-4 md:grid-cols-3">
          <SummaryCard title="The problem"><p>{project.problem}</p></SummaryCard>
          <SummaryCard title="What I built"><p>{project.solution}</p></SummaryCard>
          <SummaryCard title="Result">
            <ul className="space-y-2.5">
              {project.results.slice(0, 2).map((item) => (
                <li key={item} className="flex gap-2">
                  <Check size={15} className="mt-1 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SummaryCard>
        </div>

        {project.images.length > 1 && (
          <Section id="screens-h" label="Screens" title="Inside the app" note="Demo data. Click a screen to enlarge.">
            <Gallery images={project.images} />
          </Section>
        )}

        <Section id="stack-h" label="Tech stack" title="Tools and what they do">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
            <StackTable rows={project.stack} linkable={linkable} />
            <aside className="card p-5 lg:self-start">
              <h3 className="label-mono">Skills shown</h3>
              <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:items-start">
                {project.skills.map((skill) => (
                  <li key={skill} className="inline-flex items-center gap-2 text-sm text-fg-2">
                    <Check size={14} className="shrink-0 text-accent" />
                    {skill}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Section>

        <Section id="flow-h" label="System flow" title="How it works">
          <FlowDiagram steps={project.architecture} hue={hue} />
        </Section>

        {project.challenges.length > 0 && (
          <Section id="challenges-h" label="Key challenges" title="What made it hard">
            <ul className="card divide-y divide-line">
              {project.challenges.slice(0, 3).map((item, i) => (
                <li key={item} className="flex gap-3 px-5 py-3.5 text-sm leading-relaxed text-fg-2">
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {(project.links.github || project.links.live || project.links.docs) && (
          <section className="flex flex-wrap gap-3 border-t border-line pt-8" aria-label="Project links">
            {project.links.github && <a href={project.links.github} target="_blank" rel="noreferrer" className="btn-ghost"><GitHubIcon /> Repository</a>}
            {project.links.live && <a href={project.links.live} target="_blank" rel="noreferrer" className="btn-ghost"><ExternalLink size={15} /> Live demo</a>}
            {project.links.docs && <a href={project.links.docs} target="_blank" rel="noreferrer" className="btn-ghost"><BookOpen size={15} /> Documentation</a>}
          </section>
        )}
      </div>

      <Lightbox images={project.images} index={zoom} onClose={closeZoom} onStep={stepZoom} />

      <nav className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2" aria-label="Project pagination">
        {prev ? (
          <Link to={`/projects/${prev.slug}`} className="card group p-4 transition-colors hover:border-line-2">
            <p className="label-mono inline-flex items-center gap-1"><ArrowLeft size={11} /> Previous</p>
            <p className="mt-1 font-semibold">{prev.name}</p>
          </Link>
        ) : <span />}
        {next && (
          <Link to={`/projects/${next.slug}`} className="card group p-4 text-right transition-colors hover:border-line-2">
            <p className="label-mono inline-flex items-center gap-1">Next <ArrowRight size={11} /></p>
            <p className="mt-1 font-semibold">{next.name}</p>
          </Link>
        )}
      </nav>
    </article>
  )
}
