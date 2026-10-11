import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, Copy, ExternalLink, Mail, X } from 'lucide-react'
import { profile } from '@/data'
import { GitHubIcon } from './Icons'

const OpenContact = createContext<() => void>(() => {})

/** Opens the contact panel from anywhere in the app. */
export function useContact() {
  return useContext(OpenContact)
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const opener = useRef<HTMLElement | null>(null)

  const show = useCallback(() => {
    opener.current = document.activeElement as HTMLElement | null
    setOpen(true)
  }, [])
  const close = useCallback(() => {
    setOpen(false)
    opener.current?.focus()
  }, [])

  return (
    <OpenContact.Provider value={show}>
      {children}
      <AnimatePresence>{open && <ContactPanel onClose={close} />}</AnimatePresence>
    </OpenContact.Provider>
  )
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Older browsers or blocked clipboard: fall back to a hidden textarea.
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    return ok
  }
}

function ContactPanel({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const emailText = useRef<HTMLSpanElement>(null)
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(`Hello ${profile.name.split(' ')[0]}`)}`

  useEffect(() => {
    closeBtn.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const onCopy = async () => {
    if (await copyText(profile.email)) {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } else if (emailText.current) {
      // Last resort: select the address so the visitor can copy it by hand.
      const range = document.createRange()
      range.selectNodeContents(emailText.current)
      window.getSelection()?.removeAllRanges()
      window.getSelection()?.addRange(range)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-4 backdrop-blur-sm sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        className="card relative w-full max-w-md overflow-hidden p-6 sm:p-7"
        initial={reduce ? false : { opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32"
          style={{ background: 'radial-gradient(60% 100% at 50% 0%, var(--glow), transparent 75%)' }}
          aria-hidden="true"
        />
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-fg"
        >
          <X size={16} />
        </button>

        <div className="relative">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-white shadow-lg">
            <Mail size={20} />
          </span>
          <h2 id="contact-title" className="mt-4 text-xl font-semibold tracking-tight">Let’s talk</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">Email is the fastest way to reach me.</p>

          <div className="mt-5 flex items-center gap-2 rounded-xl border border-line bg-surface-2 p-1.5 pl-4">
            <span ref={emailText} className="min-w-0 flex-1 truncate font-mono text-sm text-fg">{profile.email}</span>
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-fg px-3 py-2 text-xs font-semibold text-bg transition-opacity hover:opacity-90"
              aria-live="polite"
            >
              {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <a href={gmail} target="_blank" rel="noreferrer" className="btn-ghost justify-center">
              <ExternalLink size={15} /> Open in Gmail
            </a>
            <a href={`mailto:${profile.email}`} className="btn-ghost justify-center">
              <Mail size={15} /> Email app
            </a>
          </div>
          <a href={profile.github} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
            <GitHubIcon /> github.com/{profile.githubUser}
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
