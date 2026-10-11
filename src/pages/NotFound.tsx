import { Link } from 'react-router-dom'
import { useTitle } from '@/lib/useTitle'

export default function NotFound() {
  useTitle('Page not found')
  return (
    <div className="container-x py-24 text-center">
      <p className="label-mono">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">This page does not exist.</h1>
      <p className="mt-3 text-muted">The link may be old or the project may have been renamed.</p>
      <Link to="/projects" className="btn-primary mt-8">
        Browse projects
      </Link>
    </div>
  )
}
