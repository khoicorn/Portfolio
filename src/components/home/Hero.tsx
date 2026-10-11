import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { profile, projects, techCounts } from '@/data'
import { spot } from '@/lib/utils'
import { GitHubIcon } from '@/components/layout/Icons'
import { useContact } from '@/components/layout/ContactDialog'
import { CountUp, RotatingWords, TechMarquee } from './HeroBits'
import { HeroPipeline } from './HeroPipeline'

const BUILDS = ['Power BI dashboards', 'data pipelines', 'chat bots on AWS', 'API integrations', 'desktop apps']

const stats = [
  { value: projects.length, label: 'projects' },
  { value: projects.filter((p) => p.confidential).length, label: 'company case studies' },
  { value: projects.filter((p) => p.hosting).length, label: 'services on AWS EC2' },
  { value: techCounts.length, label: 'tools used' },
]

export function Hero() {
  const openContact = useContact()
  const reduce = useReducedMotion()
  const rise = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] as const } }

  return (
    <section className="relative">
      <div className="container-x grid items-center gap-12 pb-12 pt-10 sm:pt-14 lg:grid-cols-[1.08fr_0.92fr] lg:pb-16 lg:pt-20">
        <div>
          <motion.p {...rise(0)} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-2 backdrop-blur">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-500 text-emerald-500" />
            {profile.name} · {profile.role}
          </motion.p>

          <motion.h1 {...rise(0.06)} className="mt-6 text-[2.6rem] font-bold leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-[3.5rem] xl:text-[3.9rem]">
            Senior Data Analyst.
            <br />
            <span className="text-gradient">Beyond Analytics.</span>
          </motion.h1>

          <motion.p {...rise(0.12)} className="mt-6 text-xl font-semibold tracking-tight text-fg-2 sm:text-2xl">
            I build{' '}
            <span className="text-fg">
              <RotatingWords words={BUILDS} />
            </span>
          </motion.p>

          <motion.p {...rise(0.18)} className="mt-4 max-w-xl text-base leading-relaxed text-muted">{profile.subhead}</motion.p>

          <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Link to="/projects" className="btn-primary group h-11 px-4 shadow-[0_10px_30px_-10px_var(--glow)] sm:px-5">
              Explore projects <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button type="button" onClick={openContact} className="btn-ghost h-11 px-4 sm:px-5">
              <Mail size={16} /> Contact
            </button>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost h-11 w-11 px-0" aria-label="GitHub profile">
              <GitHubIcon className="text-lg" />
            </a>
          </motion.div>
        </div>

        <motion.div {...(reduce ? {} : { initial: { opacity: 0, y: 24, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] } })} className="relative">
          <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] opacity-70 blur-2xl" style={{ background: 'radial-gradient(60% 60% at 50% 50%, var(--glow), transparent 70%)' }} aria-hidden="true" />
          <HeroPipeline />
        </motion.div>
      </div>

      <div className="container-x">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s) => (
            <li key={s.label} className="card spotlight relative overflow-hidden px-5 py-4" onMouseMove={spot}>
              <p className="text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="text-gradient"><CountUp value={s.value} /></span>
              </p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 border-y border-line bg-surface/30 py-5 backdrop-blur-sm">
        <p className="container-x label-mono mb-3">Tools I work with</p>
        <TechMarquee items={techCounts.slice(0, 32).map((t) => t.name)} />
      </div>
    </section>
  )
}

