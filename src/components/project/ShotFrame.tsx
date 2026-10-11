import type { MouseEvent, ReactNode } from 'react'
import { motion, useReducedMotion, useSpring } from 'motion/react'
import { Maximize2 } from 'lucide-react'
import type { ProjectImage } from '@/data/types'
import { cn, withBase } from '@/lib/utils'

/** Tilts its child a few degrees toward the pointer. Flat when motion is reduced. */
export function Tilt({ children, className, max = 5 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion()
  const rx = useSpring(0, { stiffness: 160, damping: 18 })
  const ry = useSpring(0, { stiffness: 160, damping: 18 })
  if (reduce) return <div className={className}>{children}</div>

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <div className={className} style={{ perspective: 1400 }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}>{children}</motion.div>
    </div>
  )
}

interface FrameProps {
  image: ProjectImage
  /** Text in the address bar. */
  label: string
  onZoom?: () => void
  className?: string
}

/** A screenshot inside a simple browser window. Click to zoom when onZoom is set. */
export function ShotFrame({ image, label, onZoom, className }: FrameProps) {
  const body = (
    <div className="relative overflow-hidden bg-bg-2">
      <img src={withBase(image.src)} alt={image.alt} className="block w-full" />
      {onZoom && (
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 size={12} /> Click to zoom
        </span>
      )}
    </div>
  )

  return (
    <div className={cn('card overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)]', className)}>
      <div className="flex items-center gap-2 border-b border-line bg-surface-2/80 px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="mx-auto max-w-[70%] truncate rounded-md bg-bg/70 px-3 py-0.5 text-center font-mono text-[11px] text-muted">{label}</span>
        {image.recreated ? (
          <span className="shrink-0 rounded-md border border-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted">sample data</span>
        ) : (
          <span className="w-10 shrink-0" aria-hidden="true" />
        )}
      </div>
      {onZoom ? (
        <button type="button" onClick={onZoom} className="group block w-full cursor-zoom-in text-left" aria-label={`Zoom image: ${image.alt}`}>
          {body}
        </button>
      ) : (
        body
      )}
    </div>
  )
}
