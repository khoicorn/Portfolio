import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
  as?: 'h1' | 'h2'
}

export function SectionHeading({ eyebrow, title, description, action, className, as = 'h2' }: Props) {
  const Tag = as
  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="label-mono mb-3">{eyebrow}</p>}
        <Tag className={cn('font-semibold tracking-tight', as === 'h1' ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl')}>
          {title}
        </Tag>
        {description && <p className="mt-3 text-base leading-relaxed text-muted">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
