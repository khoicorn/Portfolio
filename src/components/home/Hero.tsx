import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import { profile } from '@/data'
import { GitHubIcon } from '@/components/layout/Icons'

const coreStack = ['Python', 'SQL', 'Power BI', 'BigQuery', 'APIs', 'AI']

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80"
        style={{ background: 'radial-gradient(55% 70% at 70% 0%, var(--glow), transparent 72%)' }}
        aria-hidden="true"
      />
      <div className="container-x relative py-14 sm:py-18 lg:py-20">
        <p className="label-mono mb-4 inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {profile.name} · {profile.role}
        </p>
        <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
          Senior Data Analyst. <span className="text-accent">Beyond Analytics.</span>
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">{profile.subhead}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/projects" className="btn-primary">
            Explore projects <ArrowRight size={16} />
          </Link>
          <a href={`mailto:${profile.email}`} className="btn-ghost">
            <Mail size={16} /> Contact
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">
            <GitHubIcon /> GitHub
          </a>
        </div>

        <div className="mt-10 border-t border-line pt-5">
          <p className="label-mono mb-3">Core stack · verified in project files</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-fg-2" aria-label="Core technologies">
            {coreStack.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
