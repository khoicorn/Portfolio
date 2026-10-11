import { useEffect, useState } from 'react'
import { repoFromUrl } from './utils'

export interface RepoMeta {
  stars: number
  forks: number
  language: string | null
  pushedAt: string
  description: string | null
  htmlUrl: string
}

const cache = new Map<string, RepoMeta | null>()

async function fetchRepo(owner: string, repo: string): Promise<RepoMeta | null> {
  const key = `${owner}/${repo}`
  if (cache.has(key)) return cache.get(key) ?? null
  try {
    const stored = sessionStorage.getItem(`gh:${key}`)
    if (stored) {
      const parsed = JSON.parse(stored) as RepoMeta
      cache.set(key, parsed)
      return parsed
    }
  } catch {
    /* storage unavailable */
  }
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) {
      cache.set(key, null)
      return null
    }
    const j = (await res.json()) as {
      stargazers_count: number
      forks_count: number
      language: string | null
      pushed_at: string
      description: string | null
      html_url: string
    }
    const meta: RepoMeta = {
      stars: j.stargazers_count,
      forks: j.forks_count,
      language: j.language,
      pushedAt: j.pushed_at,
      description: j.description,
      htmlUrl: j.html_url,
    }
    cache.set(key, meta)
    try {
      sessionStorage.setItem(`gh:${key}`, JSON.stringify(meta))
    } catch {
      /* storage unavailable */
    }
    return meta
  } catch {
    cache.set(key, null)
    return null
  }
}

/** Public repo metadata. Resolves to null when offline, private, or rate-limited. */
export function useRepoMeta(url?: string): RepoMeta | null | undefined {
  const [meta, setMeta] = useState<RepoMeta | null | undefined>(undefined)
  useEffect(() => {
    const r = repoFromUrl(url)
    if (!r) {
      setMeta(null)
      return
    }
    let alive = true
    fetchRepo(r.owner, r.repo).then((m) => {
      if (alive) setMeta(m)
    })
    return () => {
      alive = false
    }
  }, [url])
  return meta
}
