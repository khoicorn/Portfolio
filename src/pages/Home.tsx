import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { featuredProjects, projects, strengths } from '@/data'
import { useTitle } from '@/lib/useTitle'
import { Hero } from '@/components/home/Hero'
import { Strengths } from '@/components/home/Strengths'
import { Contact } from '@/components/home/Contact'
import { ProjectCard } from '@/components/project/ProjectCard'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Reveal } from '@/components/layout/Reveal'

export default function Home() {
  useTitle()
  const featured = featuredProjects.length ? featuredProjects.slice(0, 6) : projects.slice(0, 6)
  return (
    <>
      <Hero />

      <section className="container-x py-12 sm:py-16" aria-labelledby="featured">
        <Reveal>
          <SectionHeading
            eyebrow="Featured work"
            title="Selected projects"
            description="Business questions carried through to data models, dashboards and dependable working systems."
            action={
              <Link to="/projects" className="btn-ghost">
                All {projects.length} projects <ArrowRight size={14} />
              </Link>
            }
          />
        </Reveal>
        <ul className="mt-8 grid gap-5 [&>div]:min-w-0 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <li className="h-full min-w-0">
                <ProjectCard project={p} />
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="container-x py-12 sm:py-16" aria-labelledby="strengths">
        <Reveal>
          <SectionHeading
            eyebrow="Capabilities"
            title="From business question to working system"
            description="Six areas of ownership, each linked to evidence in the case studies."
          />
        </Reveal>
        <div className="mt-8">
          <Strengths items={strengths} limit={6} />
        </div>
      </section>

      <section className="container-x py-12 sm:py-16">
        <Reveal>
          <Contact />
        </Reveal>
      </section>
    </>
  )
}
