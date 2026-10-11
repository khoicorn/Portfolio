import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { featuredProjects, projects, strengths } from '@/data'
import { useTitle } from '@/lib/useTitle'
import { Hero } from '@/components/home/Hero'
import { Strengths } from '@/components/home/Strengths'
import { Contact } from '@/components/home/Contact'
import { SpotlightProject } from '@/components/home/SpotlightProject'
import { Credentials, Experience } from '@/components/home/Career'
import { ProjectCard } from '@/components/project/ProjectCard'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Reveal } from '@/components/layout/Reveal'

export default function Home() {
  useTitle()
  const [lead, ...rest] = featuredProjects.length ? featuredProjects : projects
  const grid = rest.slice(0, 4)

  return (
    <>
      <Hero />

      <section className="container-x py-14 sm:py-20" aria-labelledby="featured">
        <Reveal>
          <SectionHeading
            id="featured"
            eyebrow="Featured work"
            title="Selected projects"
            description="Real problems, the tools I used and what changed."
            action={
              <Link to="/projects" className="btn-ghost">
                All {projects.length} projects <ArrowRight size={14} />
              </Link>
            }
          />
        </Reveal>
        <div className="mt-8">
          <Reveal>
            <SpotlightProject project={lead} />
          </Reveal>
        </div>
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {grid.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <li className="h-full min-w-0">
                <ProjectCard project={p} />
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="container-x py-14 sm:py-20" aria-labelledby="career">
        <Reveal>
          <SectionHeading id="career" eyebrow="Career" title="Where I have worked" />
        </Reveal>
        <div className="mt-10">
          <Experience />
        </div>
        <Reveal>
          <h3 className="label-mono mb-4 mt-12">Education & languages</h3>
        </Reveal>
        <Reveal>
          <Credentials />
        </Reveal>
      </section>

      <section className="container-x py-14 sm:py-20" aria-labelledby="strengths">
        <Reveal>
          <SectionHeading id="strengths" eyebrow="Skills" title="What I bring" description="Each skill links to the projects that prove it." />
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
