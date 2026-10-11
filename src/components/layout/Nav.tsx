import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { profile } from '@/data'
import { ThemeToggle } from './ThemeToggle'
import { GitHubIcon } from './Icons'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects', end: false },
  { to: '/about', label: 'About', end: false },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Home">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-mono text-xs font-bold text-white">
            KN
          </span>
          <span className="text-sm font-semibold tracking-tight">{profile.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive ? 'bg-surface-2 text-fg' : 'text-muted hover:text-fg',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="hidden h-9 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-fg-2 transition-colors hover:border-line-2 hover:text-fg sm:inline-flex"
          >
            <GitHubIcon className="text-base" />
            <span className="font-mono text-xs">{profile.githubUser}</span>
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-fg-2 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-line bg-bg md:hidden" aria-label="Mobile">
          <div className="container-x flex flex-col py-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  cn('rounded-md px-3 py-2.5 text-sm font-medium', isActive ? 'bg-surface-2 text-fg' : 'text-muted')
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted"
            >
              <GitHubIcon /> GitHub
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
