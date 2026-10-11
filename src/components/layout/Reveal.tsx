import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
}

/** Fade-and-rise once when the element enters the viewport. */
export function Reveal({ children, delay = 0, className }: Props) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98], delay }}
    >
      {children}
    </motion.div>
  )
}
