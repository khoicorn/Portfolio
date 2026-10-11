import { useEffect } from 'react'

const SITE = 'Khoi Ngo'

export function useTitle(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : `${SITE} — Senior Data Analyst | Beyond Analytics`
    if (description) {
      let el = document.querySelector<HTMLMetaElement>('meta[name="description"]')
      if (!el) {
        el = document.createElement('meta')
        el.name = 'description'
        document.head.appendChild(el)
      }
      el.content = description
    }
  }, [title, description])
}
