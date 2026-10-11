import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface Props {
  name: string
  linked?: boolean
  active?: boolean
  onClick?: () => void
  count?: number
}

export function TechBadge({ name, linked, active, onClick, count }: Props) {
  const cls = cn(
    'chip transition-colors',
    active && 'border-accent bg-accent-soft text-fg',
    (linked || onClick) && 'hover:border-line-2 hover:text-fg',
  )
  const body = (
    <>
      {name}
      {typeof count === 'number' && <span className="text-muted">{count}</span>}
    </>
  )
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cls} aria-pressed={active}>
        {body}
      </button>
    )
  }
  if (linked) {
    return (
      <Link to={`/projects?tech=${encodeURIComponent(name)}`} className={cls}>
        {body}
      </Link>
    )
  }
  return <span className={cls}>{body}</span>
}
