import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'
import { categories, profile, projects, strengths, techGroups } from '@/data'
import { useTitle } from '@/lib/useTitle'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Reveal } from '@/components/layout/Reveal'
import { Strengths } from '@/components/home/Strengths'
import { TechGallery } from '@/components/home/TechGallery'
import { Contact } from '@/components/home/Contact'
import { GitHubIcon } from '@/components/layout/Icons'

export default function About() {
  useTitle('About', 'Khoi Ngo: Senior Data Analyst working across Power BI, SQL, Python, automation, APIs and AI applications.')
  const byCategory = categories.map((c) => ({ c, n: projects.filter((p) => p.category === c.id).length }))

  return (
    <div className="container-x py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <SectionHeading as="h1" eyebrow="About" title={`${profile.fullName}, known as ${profile.name}`} />
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-fg-2">
            {profile.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary">
              <Mail size={15} /> Email me
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">
              <GitHubIcon /> GitHub
            </a>
          </div>
        </div>
        <aside className="card h-fit p-5">
          <p className="label-mono">At a glance</p>
          <dl className="mt-3 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Role</dt>
              <dd className="text-right font-medium">{profile.role}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="inline-flex items-center gap-1 text-muted">
                <MapPin size={12} /> Based in
              </dt>
              <dd className="font-medium">{profile.location}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Projects on this site</dt>
              <dd className="font-mono font-medium">{projects.length}</dd>
            </div>
          </dl>
          <p className="label-mono mt-5">By category</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {byCategory.map(({ c, n }) => (
              <li key={c.id} className="flex justify-between gap-4">
                <Link to={`/projects?cat=${c.id}`} className="text-fg-2 hover:text-fg">
                  {c.label}
                </Link>
                <span className="font-mono text-muted">{n}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <section className="mt-16" aria-labelledby="strengths-h">
        <Reveal>
          <SectionHeading eyebrow="Strengths" title="What the projects show" description="Each statement below is backed by named projects. No percentages, no claims without code behind them." />
        </Reveal>
        <div className="mt-8">
          <Strengths items={strengths} />
        </div>
      </section>

      <section id="stack" className="mt-16 scroll-mt-24" aria-labelledby="stack-h">
        <Reveal>
          <SectionHeading eyebrow="Tech stack" title="Technology gallery" description="Grouped by role. The number is how many projects use it. Click to filter the explorer." />
        </Reveal>
        <div className="mt-8">
          <TechGallery groups={techGroups} />
        </div>
      </section>

      <section className="mt-16" aria-labelledby="timeline-h">
        <Reveal>
          <SectionHeading eyebrow="Timeline" title="Projects by period" />
        </Reveal>
        <ol className="mt-8 space-y-0 border-l border-line">
          {[...projects]
            .sort((a, b) => (a.dateRange < b.dateRange ? 1 : -1))
            .map((p) => (
              <li key={p.slug} className="relative pl-6 pb-6">
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent" aria-hidden="true" />
                <p className="font-mono text-xs text-muted">{p.dateRange}</p>
                <Link to={`/projects/${p.slug}`} className="mt-0.5 block font-medium hover:text-accent">
                  {p.name}
                </Link>
                <p className="text-sm text-muted">{p.tagline}</p>
              </li>
            ))}
        </ol>
      </section>

      <section className="mt-16">
        <Reveal>
          <Contact />
        </Reveal>
      </section>
    </div>
  )
}
