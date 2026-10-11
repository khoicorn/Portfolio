import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from './components/layout/Layout'

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const About = lazy(() => import('./pages/About'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      let cancelled = false
      let timer = 0
      const scrollToHash = (attempt: number) => {
        if (cancelled) return
        const el = document.getElementById(hash.slice(1))
        if (el) {
          el.scrollIntoView({ block: 'start' })
        } else if (attempt < 10) {
          timer = window.setTimeout(() => scrollToHash(attempt + 1), 50)
        }
      }
      scrollToHash(0)
      return () => {
        cancelled = true
        window.clearTimeout(timer)
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])
  return null
}

function Fallback() {
  return (
    <div className="container-x py-24" aria-busy="true">
      <div className="h-8 w-48 animate-pulse rounded-md bg-surface-2" />
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
