import { GitFork, Star, Clock } from 'lucide-react'
import { useRepoMeta } from '@/lib/github'

/** Live public-repo facts from the GitHub API. Renders nothing when unavailable. */
export function GitHubStats({ url }: { url?: string }) {
  const meta = useRepoMeta(url)
  if (!meta) return null
  const pushed = new Date(meta.pushedAt)
  const when = isNaN(pushed.getTime()) ? null : pushed.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  return (
    <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted" aria-label="GitHub repository stats">
      <span className="inline-flex items-center gap-1">
        <Star size={12} /> {meta.stars}
      </span>
      <span className="inline-flex items-center gap-1">
        <GitFork size={12} /> {meta.forks}
      </span>
      {meta.language && <span>{meta.language}</span>}
      {when && (
        <span className="inline-flex items-center gap-1">
          <Clock size={12} /> pushed {when}
        </span>
      )}
    </div>
  )
}
