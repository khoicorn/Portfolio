import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface SectionLink {
  id: string
  label: string
}

/** Sticky bar of section links. Highlights the section in view and scrolls to a section on click. */
export function SectionNav({ items }: { items: SectionLink[] }) {
  const [active, setActive] = useState(items[0]?.id)

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => Boolean(el))
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (seen[0]) setActive(seen[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [items])

  const go = (id: string) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav aria-label="On this page" className="sticky top-[76px] z-30 -mx-1 flex justify-center">
      <div className="flex max-w-full gap-1 overflow-x-auto rounded-xl border border-line bg-bg/80 p-1 shadow-card backdrop-blur-xl [scrollbar-width:none]">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => go(item.id)}
            aria-current={active === item.id ? 'true' : undefined}
            className="relative shrink-0 rounded-lg px-3 py-1.5 text-[13px] font-medium"
          >
            {active === item.id && (
              <motion.span layoutId="section-pill" className="absolute inset-0 rounded-lg bg-surface-2 ring-1 ring-line" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
            )}
            <span className={cn('relative transition-colors', active === item.id ? 'text-fg' : 'text-muted hover:text-fg')}>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
