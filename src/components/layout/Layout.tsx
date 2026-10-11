import type { CSSProperties, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { ContactProvider } from './ContactDialog'

/** Fixed color glows and a dot grid behind every page. */
function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="aurora" style={{ '--aurora-color': 'var(--accent)', top: '-38vmax', left: '-18vmax' } as CSSProperties} />
      <div className="aurora" style={{ '--aurora-color': 'var(--accent-2)', top: '-34vmax', right: '-26vmax', animationDelay: '-9s', animationDuration: '32s' } as CSSProperties} />
      <div className="aurora" style={{ '--aurora-color': 'var(--accent-3)', top: '45vh', left: '20vw', animationDelay: '-15s', animationDuration: '38s', opacity: 'calc(var(--aurora-opacity) * 0.55)' } as CSSProperties} />
      <div className="dot-grid absolute inset-x-0 top-0 h-[70vh]" />
    </div>
  )
}

/** Thin gradient bar that fills as the page scrolls. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 })
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  return (
    <ContactProvider>
      <div className="relative isolate flex min-h-screen flex-col overflow-x-clip">
        <Backdrop />
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            id="main"
            key={pathname}
            className="flex-1"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </ContactProvider>
  )
}
