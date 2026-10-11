import { Mail } from 'lucide-react'
import { profile } from '@/data'
import { GitHubIcon } from '@/components/layout/Icons'
import { useContact } from '@/components/layout/ContactDialog'

export function Contact() {
  const openContact = useContact()
  return (
    <section id="contact" className="card relative overflow-hidden p-8 sm:p-12">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(50% 80% at 100% 0%, var(--glow), transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="label-mono mb-3">Contact</p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Have a data problem to solve?</h2>
          <p className="mt-3 text-muted">
            I am open to senior analytics, BI, data engineering and automation work. Email is the fastest way to reach me.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={openContact} className="btn-primary h-11 px-5 shadow-[0_10px_30px_-10px_var(--glow)]">
            <Mail size={16} /> {profile.email}
          </button>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">
            <GitHubIcon /> github.com/{profile.githubUser}
          </a>
        </div>
      </div>
    </section>
  )
}
