#!/usr/bin/env node
/**
 * Draft project metadata from a local folder.
 *
 *   node scripts/discover.mjs "path/to/project" [--out drafts]
 *
 * Reads README / CLAUDE.md / AGENTS.md / package.json / requirements.txt,
 * counts source files by extension, detects common technologies, and writes
 * drafts/<slug>.json in the Project shape used by src/data/projects.ts.
 *
 * It never opens .env, token or credential files, data exports, or logs.
 * Review every field before pasting the draft into projects.ts.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { basename, extname, join, resolve } from 'node:path'

const SKIP_DIRS = new Set(['node_modules', '.git', '.venv', 'venv', 'env', 'dist', 'build', '__pycache__', '.pytest_cache', '.ruff_cache', 'graphify-out', 'logs', '.vendor', 'target', '.next', 'coverage'])
const SECRET_FILE = /(^\.env|token|secret|credential|service[-_ ]?account|\.pem$|\.key$|\.clasp\.json$)/i
const DATA_FILE = /\.(csv|xlsx|xls|parquet|db|sqlite|jsonl|log)$/i
const CODE_EXT = new Set(['.py', '.js', '.ts', '.tsx', '.jsx', '.mjs', '.sql', '.sh', '.ps1', '.ipynb', '.html', '.css', '.rs', '.go', '.java'])

const args = process.argv.slice(2)
const target = args.find((a) => !a.startsWith('--'))
const outDir = args.includes('--out') ? args[args.indexOf('--out') + 1] : 'drafts'
if (!target) {
  console.error('Usage: node scripts/discover.mjs <folder> [--out drafts]')
  process.exit(1)
}
const root = resolve(target)
if (!existsSync(root) || !statSync(root).isDirectory()) {
  console.error(`Not a folder: ${root}`)
  process.exit(1)
}

const counts = {}
const docs = []
const tree = []
let fileCount = 0

function walk(dir, depth) {
  let entries = []
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name) || e.name.startsWith('.')) continue
      if (depth < 2) tree.push({ depth, name: e.name + '/' })
      walk(join(dir, e.name), depth + 1)
      continue
    }
    fileCount++
    const ext = extname(e.name).toLowerCase()
    counts[ext] = (counts[ext] ?? 0) + 1
    if (depth < 2 && !SECRET_FILE.test(e.name) && !DATA_FILE.test(e.name)) tree.push({ depth, name: e.name })
    if (/^(readme|claude|agents|project_context|runbook|documentation)/i.test(e.name) && ext === '.md') {
      docs.push(join(dir, e.name))
    }
  }
}
walk(root, 0)

const readText = (p, max = 6000) => {
  try {
    return readFileSync(p, 'utf8').slice(0, max)
  } catch {
    return ''
  }
}

const readme = docs.map((d) => `--- ${basename(d)} ---\n${readText(d)}`).join('\n\n')
const pkg = existsSync(join(root, 'package.json')) ? readText(join(root, 'package.json')) : ''
const reqs = ['requirements.txt', 'environment.yml', 'pyproject.toml'].map((f) => readText(join(root, f))).join('\n')

// Technology detection. Keep this list in the same vocabulary as projects.ts.
const SIGNALS = [
  ['Python', 'Languages', () => counts['.py'] > 0],
  ['TypeScript', 'Languages', () => counts['.ts'] + (counts['.tsx'] ?? 0) > 0],
  ['JavaScript', 'Languages', () => counts['.js'] + (counts['.mjs'] ?? 0) > 0],
  ['SQL', 'Languages', () => counts['.sql'] > 0],
  ['PowerShell', 'Languages', () => counts['.ps1'] > 0],
  ['BigQuery', 'Data & Analytics', () => /bigquery/i.test(reqs + readme)],
  ['pandas', 'Data & Analytics', () => /\bpandas\b/i.test(reqs + readme)],
  ['Jupyter', 'Data & Analytics', () => counts['.ipynb'] > 0],
  ['Google Sheets API', 'Data & Analytics', () => /gspread|sheets\.googleapis|google-api-python-client/i.test(reqs + readme)],
  ['Power BI', 'Data & Analytics', () => /power ?bi|\.pbix/i.test(readme) || counts['.pbix'] > 0],
  ['Anthropic Claude API', 'AI & LLM', () => /\banthropic\b/i.test(reqs + pkg)],
  ['OpenAI API', 'AI & LLM', () => /\bopenai\b/i.test(reqs + pkg)],
  ['Google Cloud', 'Cloud & Infra', () => /google-cloud|gcloud|cloud run/i.test(reqs + readme)],
  ['Docker', 'Cloud & Infra', () => existsSync(join(root, 'Dockerfile')) || existsSync(join(root, 'docker-compose.yml'))],
  ['GitHub Actions', 'Tooling', () => existsSync(join(root, '.github', 'workflows'))],
  ['Telegram Bot API', 'Automation & Messaging', () => /telegram|telebot|aiogram/i.test(reqs + readme)],
  ['Lark / Feishu API', 'Automation & Messaging', () => /lark|feishu/i.test(reqs + readme)],
  ['Google Apps Script', 'Automation & Messaging', () => existsSync(join(root, 'appsscript.json')) || counts['.gs'] > 0],
  ['Playwright', 'Tooling', () => /playwright/i.test(reqs + pkg)],
  ['Selenium', 'Tooling', () => /selenium/i.test(reqs)],
  ['React', 'Frontend', () => /"react"/.test(pkg)],
  ['Vite', 'Frontend', () => /"vite"/.test(pkg)],
  ['Tailwind CSS', 'Frontend', () => /tailwindcss/.test(pkg)],
  ['Tauri', 'Frontend', () => /tauri/.test(pkg) || existsSync(join(root, 'src-tauri'))],
  ['pytest', 'Tooling', () => /pytest/i.test(reqs) || existsSync(join(root, 'tests'))],
]
const tech = SIGNALS.filter(([, , test]) => {
  try {
    return test()
  } catch {
    return false
  }
}).map(([name, group]) => ({ name, group }))

const slug = basename(root)
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

function toNodes(items) {
  const rootNodes = []
  const stack = [{ depth: -1, children: rootNodes }]
  for (const it of items) {
    while (stack.length && stack[stack.length - 1].depth >= it.depth) stack.pop()
    const node = it.name.endsWith('/') ? { name: it.name.slice(0, -1), children: [] } : { name: it.name }
    stack[stack.length - 1].children.push(node)
    if (node.children) stack.push({ depth: it.depth, children: node.children })
  }
  return rootNodes
}

const codeFiles = Object.entries(counts)
  .filter(([ext]) => CODE_EXT.has(ext))
  .sort((a, b) => b[1] - a[1])
  .map(([ext, n]) => `${n} ${ext.slice(1)}`)
  .join(', ')

const firstLine = readme.split('\n').find((l) => l.trim() && !l.startsWith('---') && !l.startsWith('#'))?.trim() ?? ''

const draft = {
  slug,
  name: basename(root),
  tagline: firstLine.slice(0, 110) || 'TODO: one line on what it does',
  summary: 'TODO: 2-3 sentences. Source notes below.\n\n' + readme.slice(0, 1200),
  category: 'TODO: category id from projects.ts',
  featured: false,
  order: 99,
  domain: 'TODO',
  problem: 'TODO',
  solution: 'TODO',
  howItWorks: 'TODO',
  architecture: [],
  features: [],
  tech,
  challenges: [],
  results: [],
  images: [],
  links: {},
  fileTree: toNodes(tree),
  dateRange: 'TODO',
  size: `${fileCount} files (${codeFiles})`,
  confidential: false,
  aiAssisted: docs.some((d) => /claude|agents/i.test(basename(d))),
  glyph: 'pipeline',
}

mkdirSync(outDir, { recursive: true })
const out = join(outDir, `${slug}.json`)
writeFileSync(out, JSON.stringify(draft, null, 2))
console.log(`Draft written: ${out}`)
console.log(`Detected tech: ${tech.map((t) => t.name).join(', ') || 'none'}`)
console.log('Fill every TODO, then paste the object into src/data/projects.ts.')
