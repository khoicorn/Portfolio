import { categories, projects as raw, strengths, techGroups } from './projects'
import { profile } from './profile'
import type { Category, Project } from './types'

export { categories, strengths, techGroups, profile }

/** One global order. Work projects first, personal projects last. */
export const projects: Project[] = [...raw].sort((a, b) => {
  if (Boolean(a.personal) !== Boolean(b.personal)) return a.personal ? 1 : -1
  return a.order - b.order
})

export const featuredProjects: Project[] = projects.filter((p) => p.featured)

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

const HUES = [217, 262, 190, 160, 32, 340, 280]

/** Stable hue per category so thumbnails and chips share a color family. */
export function categoryHue(categoryId: string): number {
  const idx = categories.findIndex((c) => c.id === categoryId)
  return HUES[(idx < 0 ? 0 : idx) % HUES.length]
}

export interface TechCount {
  name: string
  count: number
}

/** Every technology used across projects, ordered by frequency. */
export const techCounts: TechCount[] = (() => {
  const m = new Map<string, number>()
  for (const p of projects) for (const t of p.tech) m.set(t.name, (m.get(t.name) ?? 0) + 1)
  return [...m.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
})()

export function projectsByTech(name: string): Project[] {
  return projects.filter((p) => p.tech.some((t) => t.name === name))
}

export function neighbors(slug: string): { prev?: Project; next?: Project } {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i < 0) return {}
  return { prev: projects[i - 1], next: projects[i + 1] }
}
