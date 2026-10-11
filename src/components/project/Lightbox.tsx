import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { ProjectImage } from '@/data/types'
import { withBase } from '@/lib/utils'

interface Props {
  images: ProjectImage[]
  /** Open image index, or null when closed. */
  index: number | null
  onClose: () => void
  onStep: (delta: number) => void
}

/** Full-screen image viewer. Arrow keys move, Escape or a backdrop click closes. */
export function Lightbox({ images, index, onClose, onStep }: Props) {
  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [index, onClose, onStep])

  const img = index === null ? null : images[index]

  return (
    <AnimatePresence>
      {img && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={img.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
        >
          <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20">
            <X size={18} />
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onStep(-1) }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onStep(1) }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          <motion.figure
            key={img.src}
            className="flex max-h-full max-w-[min(96vw,1400px)] flex-col items-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={withBase(img.src)} alt={img.alt} className="max-h-[84vh] w-auto rounded-lg bg-white/5 shadow-2xl" />
            <figcaption className="mt-3 max-w-3xl text-center text-sm text-white/80">
              {img.caption ?? img.alt}
              {images.length > 1 && <span className="ml-2 font-mono text-xs text-white/50">{(index ?? 0) + 1}/{images.length}</span>}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
