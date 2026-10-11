import { useCallback, useState } from 'react'
import { Maximize2 } from 'lucide-react'
import type { ProjectImage } from '@/data/types'
import { cn, withBase } from '@/lib/utils'
import { Lightbox } from './Lightbox'

export function Gallery({ images }: { images: ProjectImage[] }) {
  const [idx, setIdx] = useState<number | null>(null)
  const close = useCallback(() => setIdx(null), [])
  const step = useCallback(
    (d: number) => setIdx((i) => (i === null ? null : (i + d + images.length) % images.length)),
    [images.length],
  )

  if (images.length === 0) return null

  return (
    <>
      <ul className={cn('grid gap-4 sm:grid-cols-2', images.length === 3 && 'lg:grid-cols-3')}>
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => setIdx(i)}
              className="card group block w-full overflow-hidden text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
              aria-label={`Open image: ${img.alt}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-bg-2">
                <img
                  src={withBase(img.src)}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-lg bg-black/55 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  <Maximize2 size={14} />
                </span>
              </div>
              {img.caption && <p className="px-3 py-2 text-xs text-muted">{img.caption}</p>}
            </button>
          </li>
        ))}
      </ul>
      <Lightbox images={images} index={idx} onClose={close} onStep={step} />
    </>
  )
}
