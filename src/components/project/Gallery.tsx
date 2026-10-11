import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { ProjectImage } from '@/data/types'
import { cn, withBase } from '@/lib/utils'

export function Gallery({ images }: { images: ProjectImage[] }) {
  const [idx, setIdx] = useState<number | null>(null)

  const close = useCallback(() => setIdx(null), [])
  const step = useCallback(
    (d: number) => setIdx((i) => (i === null ? null : (i + d + images.length) % images.length)),
    [images.length],
  )

  useEffect(() => {
    if (idx === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [idx, close, step])

  if (images.length === 0) return null

  return (
    <>
      <ul className={cn('grid gap-4 sm:grid-cols-2', images.length === 3 && 'lg:grid-cols-3')}>
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => setIdx(i)}
              className="card group block w-full overflow-hidden text-left"
              aria-label={`Open image: ${img.alt}`}
            >
              <div className="aspect-[16/10] overflow-hidden bg-bg-2">
                <img
                  src={withBase(img.src)}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              {img.caption && <p className="px-3 py-2 text-xs text-muted">{img.caption}</p>}
            </button>
          </li>
        ))}
      </ul>

      {idx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={images[idx].alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X size={18} />
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(-1)
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  step(1)
                }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={withBase(images[idx].src)} alt={images[idx].alt} className="max-h-[80vh] w-auto rounded-lg" />
            <figcaption className="mt-3 text-center text-sm text-white/80">
              {images[idx].caption ?? images[idx].alt}
              <span className="ml-2 font-mono text-xs text-white/50">
                {idx + 1}/{images.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
