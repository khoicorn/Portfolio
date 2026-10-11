import { useTitle } from '@/lib/useTitle'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { ProjectExplorer } from '@/components/project/ProjectExplorer'
import { projects } from '@/data'

export default function Projects() {
  useTitle('Projects', 'Data analytics, Power BI, Power Apps, automation and AI projects by Khoi Ngo.')
  return (
    <div className="container-x py-12 sm:py-16">
      <SectionHeading
        as="h1"
        eyebrow="Project explorer"
        title={`${projects.length} projects, searchable`}
        description="Search, or filter by category and tool. Some company details are hidden to protect client data."
      />
      <div className="mt-8">
        <ProjectExplorer />
      </div>
    </div>
  )
}
