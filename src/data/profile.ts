import type { Profile } from './types'

export const profile: Profile = {
  name: 'Khoi Ngo',
  fullName: 'Ngo Hoang Khoi',
  role: 'Senior Data Analyst',
  headline: 'Senior Data Analyst. Beyond Analytics.',
  subhead:
    'I turn business problems into working tools: dashboards and analysis, Python automation, API integrations, cloud services and AI features.',
  heroWords: ['analytics', 'automation', 'data products', 'decision systems'],
  location: 'Vietnam',
  email: 'ngohoangkhoi05@gmail.com',
  github: 'https://github.com/khoicorn',
  githubUser: 'khoicorn',
  experience: [
    { title: 'Data Analyst', company: 'Microsoft', note: 'Contract via Beyondsoft', period: '2025 – 2026' },
    { title: 'Market Intelligence Analyst', company: 'RMIT University Vietnam', period: '2023 – 2025' },
    { title: 'Data Analyst', company: 'FPT Telecom', period: '2021 – 2023' },
  ],
  credentials: [
    { title: 'Bachelor of Commerce', org: 'University of Economics Ho Chi Minh City (UEH)', period: '2017 – 2020', kind: 'degree' },
    { title: 'Certificate in Machine Learning', org: 'University of Science, VNU-HCM', period: '2020 – 2021', kind: 'certificate' },
    { title: 'English', org: 'IELTS 7.5', kind: 'language' },
    { title: 'Chinese', org: 'HSK 5', kind: 'language' },
    { title: 'Vietnamese', org: 'Native', kind: 'language' },
  ],
  bio: [
    'I am a data analyst with 5 years of experience in BI, market research and customer data. I go past the dashboard: I find the real business question, build the data model and the report, then automate the work so the numbers stay up to date.',
    'I work with Power BI, Power Apps, SQL and Python, plus APIs, cloud services and AI tools. Each case study on this site shows what I built and which tools I used.',
  ],
}
