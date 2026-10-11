import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Mail, Menu, X } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { profile } from '@/data'
import { ThemeToggle } from './ThemeToggle'
import { GitHubIcon } from './Icons'
import { useContact } from './ContactDialog'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects', end: false },
  { to: '/about', label: 'About', end: false },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const openContact = useContact()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <div
        className={cn(
          'mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 rounded-2xl border px-3 transition-all duration-300 sm:px-4',
          scrolled ? 'border-line bg-bg/75 shadow-card backdrop-blur-xl' : 'border-transparent bg-transparent',
        )}
      >
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Home">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-mono text-xs font-bold text-white shadow-[0_6px_20px_-6px_var(--glow)] transition-transform group-hover:rotate-[-6deg]">
            KN
          </span>
          <span className="text-sm font-semibold tracking-tight">{profile.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-xl border border-line bg-surface/60 p-1 backdrop-blur md:flex" aria-label="Primary">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="relative rounded-lg px-3.5 py-1.5 text-sm font-medium">
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-surface-2 shadow-card ring-1 ring-line"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={cn('relative transition-colors', isActive ? 'text-fg' : 'text-muted hover:text-fg')}>{l.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-fg-2 transition-colors hover:border-line-2 hover:text-fg sm:inline-flex"
          >
            <GitHubIcon className="text-base" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={openContact}
            className="hidden h-9 items-center gap-2 rounded-lg bg-fg px-3.5 text-sm font-semibold text-bg shadow-[0_8px_24px_-10px_var(--glow)] transition-transform hover:-translate-y-px sm:inline-flex"
          >
            <Mail size={15} /> Contact
          </button>
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
        <nav id="mobile-nav" className="card mx-auto mt-2 max-w-[1200px] p-2 md:hidden" aria-label="Mobile">
          <div className="flex flex-col">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  cn('rounded-lg px-3 py-2.5 text-sm font-medium', isActive ? 'bg-surface-2 text-fg' : 'text-muted')
                }
              >
                {l.label}
              </NavLink>
            ))}
            <button type="button" onClick={openContact} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted">
              <Mail size={15} /> Contact
            </button>
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted">
              <GitHubIcon /> GitHub
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
