import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'
import { categories, profile, projects } from '@/data'
import { useTitle } from '@/lib/useTitle'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Reveal } from '@/components/layout/Reveal'
import { Credentials, Experience } from '@/components/home/Career'
import { Toolkit } from '@/components/home/Toolkit'
import { Contact } from '@/components/home/Contact'
import { GitHubIcon } from '@/components/layout/Icons'
import { useContact } from '@/components/layout/ContactDialog'

export default function About() {
  const openContact = useContact()
  useTitle('About', 'Khoi Ngo: data analyst working with Power BI, Power Apps, SQL, Python, automation and AI tools.')
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
            <button type="button" onClick={openContact} className="btn-primary">
              <Mail size={15} /> Email me
            </button>
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

      <section className="mt-16" aria-labelledby="career-h">
        <Reveal>
          <SectionHeading id="career-h" eyebrow="Career" title="Where I have worked" />
        </Reveal>
        <div className="mt-10">
          <Experience />
        </div>
      </section>

      <section className="mt-16" aria-labelledby="edu-h">
        <Reveal>
          <SectionHeading id="edu-h" eyebrow="Education" title="Education & languages" />
        </Reveal>
        <div className="mt-8">
          <Credentials />
        </div>
      </section>

      <section id="stack" className="mt-16 scroll-mt-24" aria-labelledby="stack-h">
        <Reveal>
          <SectionHeading id="stack-h" eyebrow="Tech stack" title="Tools I use" description="Click a tool to see the projects that use it." />
        </Reveal>
        <div className="mt-8">
          <Toolkit />
        </div>
      </section>

      <section className="mt-16">
        <Reveal>
          <Contact />
        </Reveal>
      </section>
    </div>
  )
}
