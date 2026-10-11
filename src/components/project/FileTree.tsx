import { useState } from 'react'
import { ChevronRight, File, FileCode2, FileText, Folder, FolderOpen } from 'lucide-react'
import type { FileNode } from '@/data/types'
import { cn } from '@/lib/utils'

function iconFor(name: string) {
  if (/\.(py|js|ts|tsx|jsx|sql|sh|ps1|mjs|rs|java|go)$/i.test(name)) return <FileCode2 size={14} className="text-accent" />
  if (/\.(md|txt|json|yml|yaml|toml|ipynb|csv)$/i.test(name)) return <FileText size={14} className="text-muted" />
  return <File size={14} className="text-muted" />
}

function Node({ node, depth }: { node: FileNode; depth: number }) {
  const isDir = Array.isArray(node.children)
  const [open, setOpen] = useState(depth < 1)
  const pad = { paddingLeft: `${depth * 16 + 8}px` }

  if (!isDir) {
    return (
      <li>
        <div className="flex items-center gap-2 py-1 pr-2" style={pad}>
          <span className="w-3.5" />
          {iconFor(node.name)}
          <span className="truncate">{node.name}</span>
        </div>
      </li>
    )
  }
  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 rounded-md py-1 pr-2 text-left hover:bg-surface-2"
        style={pad}
      >
        <ChevronRight size={14} className={cn('shrink-0 text-muted transition-transform', open && 'rotate-90')} />
        {open ? <FolderOpen size={14} className="text-accent-2" /> : <Folder size={14} className="text-accent-2" />}
        <span className="truncate font-medium">{node.name}</span>
      </button>
      {open && node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((c) => (
            <Node key={c.name} node={c} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

/** GitHub-style read-only tree of the project structure. */
export function FileTree({ nodes, root }: { nodes: FileNode[]; root: string }) {
  return (
    <div className="card overflow-hidden font-mono text-[13px]">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-3 py-2 text-xs text-muted">
        <Folder size={14} />
        {root}
      </div>
      <ul className="py-1.5">
        {nodes.map((n) => (
          <Node key={n.name} node={n} depth={0} />
        ))}
      </ul>
    </div>
  )
}
