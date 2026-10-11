import { useTitle } from '@/lib/useTitle'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { ProjectExplorer } from '@/components/project/ProjectExplorer'
import { projects } from '@/data'

export default function Projects() {
  useTitle('Projects', 'Explore senior data analytics, dashboards, data engineering, automation and AI projects by Khoi Ngo.')
  return (
    <div className="container-x py-12 sm:py-16">
      <SectionHeading
        as="h1"
        eyebrow="Project explorer"
        title={`${projects.length} projects, searchable`}
        description="Filter by category or technology, or search for a problem. Company projects are shown as sanitized case studies."
      />
      <div className="mt-8">
        <ProjectExplorer />
      </div>
    </div>
  )
}
