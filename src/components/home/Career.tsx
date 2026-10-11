import { motion, useReducedMotion } from 'motion/react'
import { Award, Briefcase, GraduationCap, Languages } from 'lucide-react'
import { profile } from '@/data'
import { spot } from '@/lib/utils'

/** Jobs as a timeline: left to right on wide screens, top to bottom on phones. Newest first. */
export function Experience() {
  const reduce = useReducedMotion()
  const jobs = profile.experience

  return (
    <div className="relative">
      {/* Connecting line that draws itself when it scrolls into view. */}
      <motion.div
        className="absolute left-[19px] top-5 bottom-5 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3 md:bottom-auto md:left-[16.67%] md:right-[16.67%] md:top-[19px] md:h-px md:w-auto md:origin-left md:bg-gradient-to-r"
        initial={reduce ? false : { scaleX: 0, scaleY: 0 }}
        whileInView={{ scaleX: 1, scaleY: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        aria-hidden="true"
      />
      <ol className="relative grid gap-5 md:grid-cols-3 md:gap-6">
        {jobs.map((job, i) => (
          <motion.li
            key={job.company}
            className="flex gap-4 md:flex-col md:items-center md:gap-0 md:text-center"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
          >
            <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-white shadow-[0_8px_24px_-8px_var(--glow)] ring-4 ring-bg">
              <Briefcase size={17} />
            </span>
            <div onMouseMove={spot} className="card spotlight relative w-full overflow-hidden p-4 md:mt-4 md:flex-1 md:p-5">
              <p className="font-mono text-xs text-muted">{job.period}</p>
              <p className="mt-1.5 text-base font-semibold tracking-tight">{job.title}</p>
              <p className="mt-0.5 text-sm font-medium text-fg-2">{job.company}</p>
              {job.note && <p className="mt-0.5 text-xs text-muted">{job.note}</p>}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}

/** Degree, certificate and language scores. */
export function Credentials() {
  const study = profile.credentials.filter((c) => c.kind !== 'language')
  const langs = profile.credentials.filter((c) => c.kind === 'language')

  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {study.map((c) => {
          const Icon = c.kind === 'degree' ? GraduationCap : Award
          return (
            <li key={c.title} onMouseMove={spot} className="card spotlight relative flex gap-3.5 overflow-hidden p-4 sm:p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon size={19} />
              </span>
              <div className="min-w-0">
                <p className="font-semibold leading-snug tracking-tight">{c.title}</p>
                <p className="mt-1 text-sm text-fg-2">{c.org}</p>
                {c.period && <p className="mt-1 font-mono text-xs text-muted">{c.period}</p>}
              </div>
            </li>
          )
        })}
      </ul>
      <div className="card p-4 sm:p-5">
        <p className="label-mono inline-flex items-center gap-1.5"><Languages size={12} /> Languages</p>
        <ul className="mt-3 space-y-2">
          {langs.map((l) => (
            <li key={l.title} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface-2/60 px-3 py-2">
              <span className="text-sm font-medium">{l.title}</span>
              <span className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-xs font-semibold text-accent">{l.org}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
