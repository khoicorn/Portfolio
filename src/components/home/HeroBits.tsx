import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

/** Cycles through words in place. All words share one grid cell, so the line never jumps. */
export function RotatingWords({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce) return
    const t = window.setInterval(() => setI((n) => (n + 1) % words.length), interval)
    return () => window.clearInterval(t)
  }, [reduce, words.length, interval])

  return (
    <span className="relative inline-grid align-bottom" aria-live="polite">
      {words.map((w, n) => (
        <span
          key={w}
          aria-hidden={n !== i}
          className={cn(
            'col-start-1 row-start-1 whitespace-nowrap underline decoration-accent/60 decoration-2 underline-offset-[6px] transition-all duration-300 ease-out',
            n === i ? 'translate-y-0 opacity-100 blur-0' : n === (i - 1 + words.length) % words.length ? '-translate-y-3 opacity-0 blur-[2px]' : 'translate-y-3 opacity-0 blur-[2px]',
          )}
        >
          {w}
        </span>
      ))}
    </span>
  )
}

/** Counts up from 0 the first time the number scrolls into view. Always ends on the real value. */
export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setShown(value)
      return
    }
    const duration = 1400
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      setShown(Math.round(value * (1 - Math.pow(1 - p, 4))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    // If frames are paused (background tab), still land on the real number.
    const done = window.setTimeout(() => setShown(value), duration + 150)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(done)
    }
  }, [inView, reduce, value])

  return <span ref={ref}>{shown}{suffix}</span>
}

/** Endless row of tool names. Pauses on hover; static when motion is reduced. */
export function TechMarquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className={cn('flex shrink-0 gap-2.5 pr-2.5', hidden && 'motion-reduce:hidden')} aria-hidden={hidden || undefined}>
      {items.map((name) => (
        <li key={name} className="whitespace-nowrap rounded-full border border-line bg-surface/70 px-3.5 py-1.5 font-mono text-xs text-fg-2 backdrop-blur">
          {name}
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div className="marquee-track flex w-max motion-reduce:w-full motion-reduce:flex-wrap">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
