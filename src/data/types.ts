export type TechGroup =
  | 'Languages'
  | 'Data & Analytics'
  | 'AI & LLM'
  | 'Cloud & Infra'
  | 'Automation & Messaging'
  | 'Frontend'
  | 'Tooling'

export interface Category {
  id: string
  label: string
  description: string
}

export interface Tech {
  name: string
  group: TechGroup
}

export interface ArchStep {
  label: string
  detail: string
  /** Future upgrade for this step. Rendered with a "Planned" tag, never as implemented. */
  planned?: string
}

export interface StackRow {
  /** Role of this layer in the system, e.g. "Collect". */
  layer: string
  tools: string[]
  /** One short line: what the tools do in this project. */
  use: string
  /** Tools not built yet. Rendered with a "planned" tag. */
  planned?: string[]
}

export interface ProjectImage {
  /** Path under public/, e.g. "images/qbo/flow.png" */
  src: string
  alt: string
  caption?: string
}

export interface ProjectLinks {
  github?: string
  live?: string
  docs?: string
}

export interface FileNode {
  name: string
  children?: FileNode[]
}

export type Glyph = 'pipeline' | 'bot' | 'chart' | 'app' | 'doc' | 'map' | 'api' | 'alert'

export interface Project {
  slug: string
  name: string
  tagline: string
  summary: string
  category: string
  featured: boolean
  order: number
  domain: string
  /** Why the project exists. One or two short sentences. */
  problem: string
  /** What was built. One or two short sentences. */
  solution: string
  /** Ordered system flow. */
  architecture: ArchStep[]
  /** Tool list used for filters, cards and the home tech gallery. */
  tech: Tech[]
  /** Tech stack table on the case-study page: layer, tools, what they do. */
  stack: StackRow[]
  /** Curated skills shown on the case-study page. */
  skills: string[]
  challenges: string[]
  /** Only outcomes documented in the project files. May be empty. */
  results: string[]
  images: ProjectImage[]
  links: ProjectLinks
  fileTree?: FileNode[]
  dateRange: string
  size: string
  /** True for company work shown as a sanitized case study. */
  confidential: boolean
  /** Personal side project. Listed after work projects. */
  personal?: boolean
  /** Where the project runs, e.g. "AWS EC2". Shown as a badge in the page header. */
  hosting?: string
  aiAssisted: boolean
  glyph: Glyph
}

export type StrengthIcon =
  | 'database'
  | 'bot'
  | 'workflow'
  | 'layout'
  | 'sparkles'
  | 'lightbulb'
  | 'bar-chart'
  | 'code'

export interface Strength {
  title: string
  evidence: string
  icon: StrengthIcon
  /** Slugs of projects that prove this strength. */
  projects: string[]
}

export interface TechGroupEntry {
  group: TechGroup
  items: { name: string; projectSlugs: string[] }[]
}

export interface Profile {
  name: string
  fullName: string
  role: string
  headline: string
  subhead: string
  heroWords: string[]
  location: string
  email: string
  github: string
  githubUser: string
  bio: string[]
}
