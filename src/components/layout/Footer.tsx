import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { profile } from '@/data'
import { GitHubIcon } from './Icons'
import { useContact } from './ContactDialog'

export function Footer() {
  const openContact = useContact()
  return (
    <footer className="mt-24 border-t border-line bg-surface/30 backdrop-blur-sm">
      <div className="container-x flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.role}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link to="/projects" className="text-muted hover:text-fg">
            Projects
          </Link>
          <Link to="/about" className="text-muted hover:text-fg">
            About
          </Link>
          <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
            <GitHubIcon /> GitHub
          </a>
          <button type="button" onClick={openContact} className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
            <Mail size={14} /> Email
          </button>
        </div>
      </div>
      <div className="container-x pb-8">
        <p className="font-mono text-[11px] text-muted">
          Built with React, TypeScript, Vite, Tailwind CSS and Motion.
        </p>
      </div>
    </footer>
  )
}
