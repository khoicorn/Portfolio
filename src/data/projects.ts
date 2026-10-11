import type { Category, Project, Strength, TechGroup, TechGroupEntry } from './types'

export const categories: Category[] = [
  {
    id: 'automation-data',
    label: 'Data Engineering & Automation',
    description: 'Pipelines, bots and integrations that replace manual steps with reliable systems.',
  },
  {
    id: 'data-analytics',
    label: 'Data Analytics & BI',
    description: 'Repeatable analysis, reporting models and dashboards that support decisions.',
  },
  {
    id: 'web-apps',
    label: 'Web & Desktop Apps',
    description: 'Focused apps built around a real workflow, from browser apps to offline desktop tools.',
  },
  {
    id: 'developer-tools',
    label: 'Developer Tools',
    description: 'Tools that turn awkward source files into clean, usable output.',
  },
]

export const projects: Project[] = [
  {
    slug: 'market-intelligence-hub',
    name: 'Market Intelligence Hub',
    tagline: 'A Power Apps portal that puts 12 Power BI reports on the market, the economy and surveys in one place.',
    summary:
      'A Power Apps home page for a market intelligence team. Every Power BI report has its own card, grouped by topic, with the data period and how often it updates. One click opens the full report.',
    category: 'data-analytics',
    featured: true,
    order: 1,
    domain: 'Higher-education market intelligence',
    problem:
      'The team had 12 reports on the market, the economy and student surveys. People needed one place to find the right report and see how current its data is.',
    solution:
      'A Power Apps portal with one card per report, grouped into Market & Economics and Survey Tracking. Each card shows the data period and update cycle, and opens the Power BI report.',
    architecture: [
      { label: 'Build', detail: '12 Power BI reports on market, economic and survey data.' },
      { label: 'Automate', detail: 'Python collects website data every week for 2 of the reports.' },
      { label: 'Group', detail: 'Reports are sorted into Market & Economics and Survey Tracking.' },
      { label: 'Label', detail: 'Each card shows the data period and update cycle: weekly, monthly, quarterly, per semester or yearly.' },
      { label: 'Open', detail: 'One click opens the full Power BI report.' },
    ],
    tech: [
      { name: 'Power Apps', group: 'Frontend' },
      { name: 'Power BI', group: 'Data & Analytics' },
      { name: 'Python', group: 'Languages' },
    ],
    stack: [
      { layer: 'Portal', tools: ['Power Apps'], use: 'One home page with a card for every report.' },
      { layer: 'Reports', tools: ['Power BI'], use: '12 dashboards on the market, the economy and surveys.' },
      { layer: 'Data', tools: ['Python'], use: 'Weekly website data collection for 2 dashboards.' },
    ],
    skills: ['Power Apps', 'Power BI', 'Report portfolio design', 'Reporting automation', 'Working with business teams'],
    challenges: [
      'Make 12 reports easy to find for people who are not data experts.',
      'Show how fresh each report is before anyone opens it.',
      'Keep weekly, monthly and yearly update cycles on track.',
    ],
    results: [
      '12 Power BI reports in one portal, 2 of them with weekly automated data collection.',
      'Manual reporting work cut by 80%.',
    ],
    images: [
      { src: 'images/mi-hub/hub-home.png', alt: 'Market Intelligence Hub home page in Power Apps with report cards grouped into Market & Economics and Survey Tracking', caption: 'Hub home page: one card per report, with its data period and update cycle.' },
    ],
    links: {},
    dateRange: '2023–2025',
    size: '12 reports · 2 groups',
    confidential: false,
    aiAssisted: false,
    glyph: 'app',
  },
  {
    slug: 'brand-health-tracking',
    name: 'Brand Health Tracking Dashboard',
    tagline: 'A Power BI survey dashboard that compares brand awareness and preference across universities.',
    summary:
      'A yearly brand survey turned into a Power BI dashboard. It shows a 4-stage brand funnel for each university, with benchmarks against the total market and the top 10 competitors, and filters for student type, university tier, discipline, city and year.',
    category: 'data-analytics',
    featured: true,
    order: 3,
    domain: 'Higher-education brand research',
    problem:
      'A yearly brand survey produced a lot of numbers. The team needed to compare its brand with competitors by student type, city and year without building new charts each time.',
    solution:
      'A Power BI dashboard with a market view and a university deep-dive, 5 topic pages and a brand funnel with benchmarks for the total market and the top 10 competitors.',
    architecture: [
      { label: 'Survey', detail: 'Yearly survey results are cleaned into tables for each question group.' },
      { label: 'Measure', detail: 'DAX measures turn answers into a 4-stage funnel: awareness, consideration, 1st choice, preferred.' },
      { label: 'Compare', detail: 'Each university is set against the total market and the top 10 competitors.' },
      { label: 'Explore', detail: 'Filters for student type, university tier, discipline, city and year.' },
      { label: 'Read', detail: '5 topic pages: awareness, funnel, imagery, functional value and emotional value.' },
    ],
    tech: [
      { name: 'Power BI', group: 'Data & Analytics' },
      { name: 'DAX', group: 'Data & Analytics' },
      { name: 'Excel', group: 'Data & Analytics' },
      { name: 'Survey Analytics', group: 'Data & Analytics' },
    ],
    stack: [
      { layer: 'Data', tools: ['Excel', 'Survey Analytics'], use: 'Yearly survey results in clean tables.' },
      { layer: 'Measures', tools: ['DAX'], use: 'Funnel percentages and the conversion rate between stages.' },
      { layer: 'Report', tools: ['Power BI'], use: 'Market view, university deep-dive and 5 topic pages.' },
    ],
    skills: ['Survey analytics', 'Brand funnel analysis', 'DAX measures', 'Competitor benchmarking', 'Dashboard design'],
    challenges: [
      'Fit a 4-stage funnel and conversion rates for many universities on one page.',
      'Keep results comparable across cities, years and student types.',
      'Show the sample size so readers do not over-read small groups.',
    ],
    results: [
      'Yearly brand tracking since 2023, with a market view and a university deep-dive.',
      'Funnel benchmarks against the total market and the top 10 competitors.',
    ],
    images: [
      { src: 'images/brand-health/brand-funnel.png', alt: 'Brand Health Tracking Power BI page showing the brand funnel for eight universities next to market and competitor benchmarks', caption: 'Brand funnel page: each university next to the market and top 10 competitor benchmarks.' },
    ],
    links: {},
    dateRange: '2023–2025',
    size: '5 topic pages · yearly survey',
    confidential: false,
    aiAssisted: false,
    glyph: 'chart',
  },
  {
    slug: 'vietnam-macro-intelligence',
    name: 'Vietnam Macroeconomic Intelligence Platform',
    tagline: 'Python pipelines that collect public economic data every day and feed an 11-page Power BI dashboard.',
    summary:
      'A macroeconomic analytics platform for GDP, inflation, foreign investment, trade, business, workforce and consumer confidence. Python notebooks collect and clean releases from Vietnamese and international sources, Papermill runs the daily refresh, and Power BI shows everything in one dashboard.',
    category: 'automation-data',
    featured: true,
    order: 2,
    domain: 'Economic & market intelligence',
    problem:
      'Vietnam economic data sits across many agencies, file types and release dates. Analysts rebuilt each source by hand before they could compare indicators over time.',
    solution:
      'Python collectors and cleaning notebooks that turn GSO, MPI, IMF and World Bank releases into one Power BI model. A daily run refreshes only the sources that changed.',
    architecture: [
      { label: 'Collect', detail: 'Pull new releases from GSO pages, MPI files, IMF XML feeds and World Bank APIs. OCR reads numbers from consumer-confidence charts.' },
      { label: 'Clean', detail: 'Make dates, units, provinces, industries and indicator names match shared mapping tables.' },
      {
        label: 'Schedule',
        detail: 'Papermill runs the GSO, IMF and World Bank notebooks every day, logs the last update and sends a desktop alert.',
        planned: 'Apache Airflow DAGs for task order, retries, failure alerts and backfills.',
      },
      { label: 'Model', detail: 'Clean tables load into one Power BI data model.' },
      { label: 'Report', detail: '11 pages, from the national overview down to sector, trade and consumer detail.' },
    ],
    tech: [
      { name: 'Python', group: 'Languages' },
      { name: 'pandas', group: 'Data & Analytics' },
      { name: 'REST APIs', group: 'Automation & Messaging' },
      { name: 'XML / SDMX', group: 'Data & Analytics' },
      { name: 'Tesseract OCR', group: 'Tooling' },
      { name: 'Papermill', group: 'Automation & Messaging' },
      { name: 'Power BI', group: 'Data & Analytics' },
    ],
    stack: [
      { layer: 'Collect', tools: ['Python', 'Requests', 'XML / SDMX', 'REST APIs'], use: 'Scrape GSO release pages; call IMF and World Bank APIs.' },
      { layer: 'Read images', tools: ['Tesseract OCR'], use: 'Read consumer-confidence numbers from published chart images.' },
      { layer: 'Clean', tools: ['pandas', 'unidecode'], use: 'Make dates, units, Vietnamese place names and industries consistent.' },
      {
        layer: 'Schedule',
        tools: ['Papermill'],
        planned: ['Apache Airflow'],
        use: 'Run the daily notebooks and log each update. Airflow is the next step for retries, alerts and backfills.',
      },
      { layer: 'Report', tools: ['Power BI'], use: 'One data model and 11 report pages.' },
    ],
    skills: ['Data pipeline design', 'Web scraping & APIs', 'Data cleaning', 'Pipeline scheduling', 'Power BI data modeling'],
    challenges: [
      'Each source uses its own time periods, names and revised history.',
      'Some files have no fixed download link, so the code finds the link and the right sheet.',
      'Daily updates must give the same result as a full rebuild from scratch.',
    ],
    results: [
      '11-page Power BI report: overview, GDP/CPI, sector GDP, FDI, trade, business, workforce and consumer confidence.',
      'Daily refresh for GSO, IMF and World Bank sources, with a last-update log.',
    ],
    images: [
      { src: 'images/macro/gdp-cpi.png', alt: 'Vietnam Economics Power BI report, GDP-CPI page with CPI growth, an IMF inflation table and a map of Southeast Asia', caption: 'GDP-CPI page: CPI growth, IMF forecasts by country and the top price-rise industries. Public data from GSO and IMF.' },
    ],
    links: {},
    dateRange: '2023–2024',
    size: '11 report pages · daily refresh',
    confidential: false,
    aiAssisted: false,
    glyph: 'chart',
  },
  {
    slug: 'healthcare-market-intelligence',
    name: 'Healthcare Market Intelligence Data Model',
    tagline: 'Matches messy hospital and doctor records into clean data for a 14-page Power BI market view.',
    summary:
      'A healthcare market-intelligence workflow that turns inconsistent hospital and doctor records into clean, matched data. It combines rule-based cleaning, fuzzy matching and AI-assisted review with a Power BI model covering providers, departments, geography and year-over-year comparisons.',
    category: 'data-analytics',
    featured: true,
    order: 5,
    domain: 'Healthcare market intelligence',
    problem:
      'Hospital and doctor names came with spelling variants, Vietnamese accents, old and new province names and duplicate specialties. Simple joins failed and coverage numbers were wrong.',
    solution:
      'A matching workflow: clean the text, apply exact rules, score close matches, then send unclear rows to AI-assisted review that a person approves. Clean tables feed a 14-page Power BI report.',
    architecture: [
      { label: 'Clean', detail: 'Fix accents, abbreviations, addresses and facility-name patterns.' },
      { label: 'Match', detail: 'Exact matches against a reference list first, then a similarity score for the rest.' },
      { label: 'Review', detail: 'Unclear rows go out in batches. AI suggests a match and a person approves it.' },
      { label: 'Model', detail: 'Build clean hospital, doctor and department tables.' },
      { label: 'Report', detail: 'Power BI shows coverage by province, facility, doctor and department.' },
    ],
    tech: [
      { name: 'Python', group: 'Languages' },
      { name: 'Power BI', group: 'Data & Analytics' },
      { name: 'pandas', group: 'Data & Analytics' },
      { name: 'RapidFuzz', group: 'Data & Analytics' },
      { name: 'OpenAI API', group: 'AI & LLM' },
      { name: 'Excel', group: 'Data & Analytics' },
    ],
    stack: [
      { layer: 'Clean', tools: ['Python', 'pandas'], use: 'Standardize Vietnamese text, abbreviations, addresses and facility names.' },
      { layer: 'Match', tools: ['RapidFuzz'], use: 'Score how similar two names are and keep the best options.' },
      { layer: 'Review', tools: ['OpenAI API', 'Excel'], use: 'AI suggests labels for hard rows; a person approves them in Excel.' },
      { layer: 'Report', tools: ['Power BI'], use: 'Data model and 14 report pages.' },
    ],
    skills: ['Record matching', 'Fuzzy matching', 'Data quality rules', 'AI with human review', 'Power BI data modeling'],
    challenges: [
      'One hospital can appear under several names, languages and addresses.',
      'Doctors and facilities link to many specialties at once.',
      'AI suggestions need a confidence check and human approval before they reach the report.',
    ],
    results: [
      '14-page Power BI report across hospitals, doctors, provinces and departments.',
      'Unclear matches go to a person for review instead of being forced into the data.',
    ],
    images: [
      { src: 'images/case-studies/healthcare-dashboard.svg', alt: 'Recreated healthcare dashboard with a district map of Vietnam and five highlighted provinces, using sample data', caption: 'Recreated with fictional values. No healthcare records are shown.', recreated: true },
    ],
    links: {},
    dateRange: '2025',
    size: '14 report pages · record matching',
    confidential: true,
    aiAssisted: true,
    glyph: 'map',
  },
  {
    slug: 'payout-alert-bot',
    name: 'Payout & Wallet Alert Bot',
    tagline: 'A Lark bot that turns approved payment requests into crypto payouts, tracks each one until it is paid, and reports every wallet movement.',
    summary:
      'A Python and FastAPI service for a finance payments team. It checks each payment request with 15 rules and an AI second opinion, creates the payout through a crypto wallet platform API, keeps one live Lark card per payment, sends reminders when a step is slow, alerts on wallet movements and low balances, and sends daily and weekly reports checked against wallet history. Runs in Docker on AWS EC2.',
    category: 'automation-data',
    featured: true,
    order: 4,
    domain: 'Finance operations · crypto payments',
    problem:
      'Payment requests came through a free-text Lark form, and the wallet platform sends no update while a payout waits for approval or signature. Transfers made by hand in the wallet app never showed up in Lark.',
    solution:
      'A Python service that checks each request, creates the payout through the wallet API and keeps one live Lark card per payment until it is paid. It also chases slow steps and posts every wallet movement.',
    architecture: [
      { label: 'Receive', detail: 'A Lark form sends each payment request to the bot through a secured webhook.' },
      { label: 'Check', detail: '15 rules flag risks such as a bad address, a duplicate or an unusual amount. AI adds notes.' },
      { label: 'Pay', detail: 'The first person to claim the ticket creates the payout. Signing stays in the wallet app.' },
      { label: 'Track', detail: 'Callbacks, 30-second status checks and a wallet-history sweep update one Lark card per payment.' },
      { label: 'Remind', detail: 'Reminders fire when a ticket waits too long. Alerts fire when a wallet runs low.' },
      { label: 'Close', detail: 'The card shows the on-chain proof. Daily and weekly reports are checked against wallet history.' },
    ],
    tech: [
      { name: 'Python', group: 'Languages' },
      { name: 'FastAPI', group: 'Cloud & Infra' },
      { name: 'Lark API', group: 'Automation & Messaging' },
      { name: 'Wallet Platform API', group: 'Automation & Messaging' },
      { name: 'OpenAI API', group: 'AI & LLM' },
      { name: 'SQLite', group: 'Data & Analytics' },
      { name: 'APScheduler', group: 'Automation & Messaging' },
      { name: 'Docker', group: 'Cloud & Infra' },
      { name: 'AWS EC2', group: 'Cloud & Infra' },
      { name: 'pytest', group: 'Tooling' },
    ],
    stack: [
      { layer: 'Service', tools: ['Python', 'FastAPI'], use: 'Receives form webhooks and payment callbacks; runs the background jobs.' },
      { layer: 'Payments', tools: ['Wallet Platform API'], use: 'Create payouts and read status, balances and wallet history. Every request is signed.' },
      { layer: 'Chat', tools: ['Lark API'], use: 'Live cards, buttons, threads, reminders and chart reports.' },
      { layer: 'Review', tools: ['OpenAI API'], use: 'Second opinion on risky requests. It can add notes but never remove a rule flag.' },
      { layer: 'Storage', tools: ['SQLite'], use: '12 tables: requests, audit log, card state, alert levels and report history.' },
      { layer: 'Schedule', tools: ['APScheduler'], use: 'Daily and weekly reports, backups, status checks and reminder loops.' },
      { layer: 'Hosting', tools: ['Docker', 'AWS EC2'], use: 'Runs 24/7 with Docker Compose on an AWS EC2 server.' },
      { layer: 'Test', tools: ['pytest'], use: '1,500+ tests for payouts, duplicates, reminders, alerts and reports.' },
    ],
    skills: ['Payment workflow design', 'API integration', 'No-duplicate processing', 'Monitoring & alerts', 'Cloud hosting (AWS)', 'Automated testing'],
    challenges: [
      'Never pay twice: the payout key is the ticket number, and it changes only after a clear refusal, never after a timeout.',
      'Never miss an update: each callback is saved once, failed checks wait longer each time (60 s up to 15 min), and a wallet sweep catches manual transfers.',
      'Alert without noise: balance alerts fire only when a wallet crosses a line, and each reminder step fires once.',
    ],
    results: [
      'Each payment runs from form to on-chain proof in one Lark thread, with daily and weekly reports.',
      '1,500+ automated tests cover payouts, duplicates, reminders, alerts and reconciliation.',
    ],
    images: [
      { src: 'images/payout-alert-bot/payout-card.svg', alt: 'Sample Lark payout card with a status tracker, flagged checks and a wallet alert feed', caption: 'Recreated with fictional names and values. No real payments are shown.', recreated: true },
    ],
    links: {},
    dateRange: '2026 · active',
    size: '6-step payment flow · 1,500+ tests',
    confidential: true,
    hosting: 'AWS EC2',
    aiAssisted: true,
    glyph: 'bot',
  },
  {
    slug: 'telecom-camera-analytics',
    name: 'Telecom Camera Adoption Analytics',
    tagline: 'Links device, network, browsing and telesales data to show who buys a telecom camera product.',
    summary:
      'An analytics workflow for a telecom camera product. Python combines monthly Parquet files on devices, network use, browsing, contracts and telesales; Power BI gives analysts a deep-dive report and managers a short weekly view.',
    category: 'data-analytics',
    featured: false,
    order: 7,
    domain: 'Telecom product analytics',
    problem:
      'Product data sat in large monthly files across devices, network logs, browsing and sales. The team needed to see who uses the camera, who might buy it, and a simple weekly view for managers.',
    solution:
      'Python (pandas) links the monthly files by contract and exports small tables for Power BI: one deep-dive report for analysts and one 5-page weekly dashboard.',
    architecture: [
      { label: 'Load', detail: 'Read monthly Parquet files for devices, browsing, network logs and customer profiles.' },
      { label: 'Join', detail: 'Line up the monthly file formats and link every source through the contract ID.' },
      { label: 'Segment', detail: 'Split current users, interested users and telesales targets.' },
      { label: 'Publish', detail: 'Save small, reusable tables for the reports.' },
      { label: 'Report', detail: 'Deep-dive report for analysts; 5-page weekly dashboard for managers.' },
    ],
    tech: [
      { name: 'Python', group: 'Languages' },
      { name: 'Power BI', group: 'Data & Analytics' },
      { name: 'pandas', group: 'Data & Analytics' },
      { name: 'Apache Parquet', group: 'Data & Analytics' },
      { name: 'PyArrow', group: 'Data & Analytics' },
    ],
    stack: [
      { layer: 'Load', tools: ['Python', 'PyArrow', 'Apache Parquet'], use: 'Read monthly files from 7 data sources.' },
      { layer: 'Transform', tools: ['pandas'], use: 'Join the sources by contract and build customer groups.' },
      { layer: 'Report', tools: ['Power BI'], use: 'Deep-dive model plus a 5-page weekly dashboard.' },
    ],
    skills: ['Data exploration', 'Large-file processing', 'Customer segmentation', 'Power BI reporting', 'Reporting for managers'],
    challenges: [
      'Large event files needed staged extracts instead of full reloads.',
      'Each source had a different level of detail, so all were linked by contract.',
      'Deep analysis and weekly reporting needed different report sizes.',
    ],
    results: [
      'Deep-dive Power BI model plus a 5-page weekly dashboard.',
      'Device, browsing, network, profile and telesales data linked by contract.',
    ],
    images: [
      { src: 'images/case-studies/telecom-dashboard.svg', alt: 'Recreated telecom camera dashboard using sample data', caption: 'Recreated with fictional groups and sample values. No subscriber data is shown.', recreated: true },
    ],
    links: {},
    dateRange: '2022',
    size: '7 data sources · deep-dive + weekly BI',
    confidential: true,
    aiAssisted: false,
    glyph: 'chart',
  },
  {
    slug: 'retail-fieldwork-dashboard',
    name: 'Retail Fieldwork & Mystery Shopping Dashboard',
    tagline: 'A 10-page Power BI report for interviews, mystery shopping and fieldwork progress, reused across 2 survey waves.',
    summary:
      'A market-research dashboard that brings interview and mystery-shopping surveys into one report. Two survey waves use the same 10-page layout, so pricing, engagement, display, trade programs and fieldwork progress can be compared directly.',
    category: 'data-analytics',
    featured: false,
    order: 8,
    domain: 'Retail & market research',
    problem:
      'Survey results spread across many sections and measures. Field teams also needed to track progress, and outlet-level detail had to stay apart from management summaries.',
    solution:
      'One Power BI layout over interview and mystery-shopping tables: summary pages, topic pages, fieldwork tracking and an outlet detail page. Wave 2 reused the same layout for direct comparison.',
    architecture: [
      { label: 'Structure', detail: 'Turn each survey section into a clean reporting table.' },
      { label: 'Model', detail: 'Build shared filters and measures for research and fieldwork pages.' },
      { label: 'Report', detail: 'Order the overview, pricing, engagement, display and trade-program pages by decision.' },
      { label: 'Track', detail: 'Follow interview and mystery-shopping progress separately.' },
      { label: 'Review', detail: 'One outlet-level page for quality checks and follow-up.' },
    ],
    tech: [
      { name: 'Power BI', group: 'Data & Analytics' },
      { name: 'Excel', group: 'Data & Analytics' },
      { name: 'Survey Analytics', group: 'Data & Analytics' },
    ],
    stack: [
      { layer: 'Prepare', tools: ['Excel'], use: 'Turn survey sections into clean reporting tables.' },
      { layer: 'Model', tools: ['Power BI'], use: 'Shared filters and measures across research and fieldwork.' },
      { layer: 'Report', tools: ['Power BI'], use: '10 pages: summary, topics, fieldwork progress and outlet detail.' },
    ],
    skills: ['Survey analytics', 'Report layout design', 'Power BI data modeling', 'Fieldwork tracking', 'Data checks'],
    challenges: [
      'Survey sections mixed different answer types.',
      'Two waves needed stable comparisons while inputs were still changing.',
      'Outlet records had to stay apart from summary pages.',
    ],
    results: [
      '2 delivered survey waves with the same 10-page layout.',
      'Each wave covers findings, fieldwork progress and outlet-level review.',
    ],
    images: [
      { src: 'images/case-studies/retail-dashboard.svg', alt: 'Recreated retail fieldwork dashboard using sample data', caption: 'Recreated with fictional categories and sample values. No respondent or client data is shown.', recreated: true },
    ],
    links: {},
    dateRange: '2022',
    size: '2 waves · 10 report pages each',
    confidential: true,
    aiAssisted: false,
    glyph: 'chart',
  },
  {
    slug: 'qbo-automation-bot',
    name: 'Accounting Automation Pipeline',
    tagline: 'Turns monthly Google Sheets data into QuickBooks journals, then posts and checks them. Runs on AWS EC2.',
    summary:
      'A Python accounting pipeline that turns monthly client sheets into QuickBooks journals, expenses and transfers. Staff start each stage from a status cell in Google Sheets; the service writes progress and errors back to the same sheet. Hosted on AWS EC2.',
    category: 'automation-data',
    featured: false,
    order: 6,
    domain: 'Finance operations',
    problem:
      'Monthly accounting data came in a different sheet format for each client. Cleaning, posting and checking were manual, and re-runs risked duplicate or wrong bookings.',
    solution:
      'A Python pipeline controlled from Google Sheets: clean the data, build journals, post to QuickBooks without duplicates, then check both sides. Status and errors are written back to the sheet.',
    architecture: [
      { label: 'Start', detail: 'A status cell in Google Sheets marks which company, month and stage is ready.' },
      { label: 'Clean', detail: 'Each client’s sheet layout is mapped into one standard format.' },
      { label: 'Build', detail: 'Rules build balanced journals, expenses and transfers, and write checks back to the sheet.' },
      { label: 'Post', detail: 'Approved rows go to QuickBooks with locks, retries and duplicate checks.' },
      { label: 'Check', detail: 'Compare source rows to built rows, and built rows to QuickBooks.' },
    ],
    tech: [
      { name: 'Python', group: 'Languages' },
      { name: 'Google Sheets API', group: 'Data & Analytics' },
      { name: 'QuickBooks Online API', group: 'Automation & Messaging' },
      { name: 'Google Apps Script', group: 'Automation & Messaging' },
      { name: 'AWS EC2', group: 'Cloud & Infra' },
      { name: 'pytest', group: 'Tooling' },
    ],
    stack: [
      { layer: 'Control', tools: ['Google Sheets API', 'Google Apps Script'], use: 'Status cells start each stage and show progress and errors.' },
      { layer: 'Transform', tools: ['Python'], use: 'Map changing sheet layouts to one format and build balanced journals.' },
      { layer: 'Post', tools: ['QuickBooks Online API'], use: 'Post approved rows with locks, retries and duplicate checks.' },
      { layer: 'Hosting', tools: ['AWS EC2'], use: 'The pipeline runs on an AWS EC2 server.' },
      { layer: 'Test', tools: ['pytest'], use: 'Automated tests for the pipeline logic.' },
    ],
    skills: ['Finance automation', 'API integration', 'Safe re-runs (no duplicates)', 'Reconciliation', 'Cloud hosting (AWS)', 'Python testing'],
    challenges: [
      'Client sheets had different, sometimes moving header rows.',
      'An old save point after a crash could post the same entries twice.',
      'Similar account names made guessing unsafe, so an unclear name stops the run.',
    ],
    results: [
      'One control sheet per company runs build, posting and a 2-way check.',
      'Duplicate checks, save points and run locks make re-runs safe.',
    ],
    images: [],
    links: {},
    fileTree: [
      { name: 'run_ingestion.py' },
      { name: 'run_syncing.py' },
      { name: 'run_reconciliation.py' },
      { name: 'src', children: [{ name: 'logic' }, { name: 'services' }, { name: 'clients' }] },
      { name: 'tests' },
    ],
    dateRange: '2026 · active',
    size: 'Multi-stage pipeline',
    confidential: true,
    hosting: 'AWS EC2',
    aiAssisted: true,
    glyph: 'pipeline',
  },
  {
    slug: 'referral-coefficient',
    name: 'Referral Coefficient Analytics',
    tagline: 'BigQuery SQL and Python build a weekly referral tracker by market and product.',
    summary:
      'A repeatable job that measures the referral funnel, from people who refer to new users, paying users, qualified users and revenue. SQL does the counting in BigQuery; Python builds a formatted Excel tracker with definitions, comparisons and short notes.',
    category: 'data-analytics',
    featured: false,
    order: 9,
    domain: 'Growth analytics',
    problem:
      'Referral performance was answered with one-off data pulls. Stakeholders needed one metric definition, comparable segments and a clear view of query cost.',
    solution:
      'A weekly job: BigQuery SQL builds the referral funnel and Python rebuilds a formatted Excel tracker. Heavier queries run only when needed, after a cost check.',
    architecture: [
      { label: 'Define', detail: 'Shared SQL sets each funnel stage and how segments are split.' },
      { label: 'Estimate', detail: 'Dry runs show how much data BigQuery will scan before heavy queries run.' },
      { label: 'Count', detail: 'BigQuery counts the funnel and the revenue that referrals bring in.' },
      { label: 'Transform', detail: 'Python checks the exports and builds account and person views.' },
      { label: 'Report', detail: 'OpenPyXL rebuilds a styled workbook with trends, definitions and notes.' },
    ],
    tech: [
      { name: 'SQL', group: 'Languages' },
      { name: 'Python', group: 'Languages' },
      { name: 'BigQuery', group: 'Data & Analytics' },
      { name: 'pandas', group: 'Data & Analytics' },
      { name: 'OpenPyXL', group: 'Data & Analytics' },
      { name: 'Google Cloud', group: 'Cloud & Infra' },
    ],
    stack: [
      { layer: 'Query', tools: ['SQL', 'BigQuery', 'Google Cloud'], use: 'Funnel stages and revenue share by segment; dry runs check cost first.' },
      { layer: 'Transform', tools: ['Python', 'pandas'], use: 'Check exports; build account-level and person-level views.' },
      { layer: 'Report', tools: ['OpenPyXL'], use: 'Rebuild the styled Excel tracker with trends and a glossary.' },
    ],
    skills: ['Metric definition', 'SQL analytics', 'Cloud cost control', 'Report automation', 'Growth analytics'],
    challenges: [
      'Keep metric definitions the same across weekly and one-off queries.',
      'Count unique people by phone and email while keeping an account-level view.',
      'Keep BigQuery cost low for heavy snapshot analysis.',
    ],
    results: [
      'Weekly tracker with 5 defined metrics, segment views and week-over-week changes.',
      'Dry runs show the query cost before the heavy analysis runs.',
    ],
    images: [],
    links: {},
    dateRange: '2026 · active',
    size: 'SQL + Python reporting job',
    confidential: true,
    aiAssisted: true,
    glyph: 'chart',
  },
  {
    slug: 'fb-ads-research-bot',
    name: 'Advertising Research Bot',
    tagline: 'A Lark bot that searches the public Facebook Ads Library and sends back Excel reports and media files. Runs on AWS EC2.',
    summary:
      'A Python and Selenium service that lets analysts research a website from a Lark command. It searches the public Facebook Ads Library, finds related advertisers, builds an Excel report and zips the ad media. Chats can also save websites for daily runs. Hosted on AWS EC2.',
    category: 'automation-data',
    featured: false,
    order: 10,
    domain: 'Marketing intelligence',
    problem:
      'Competitor ad research meant browsing a fast-changing site and copying ad IDs, dates, text, links and media into sheets by hand.',
    solution:
      'A chat bot with a one-browser queue, progress cards, cancel and daily schedules. Selenium collects the ads with backup selectors; results come back as Excel plus zipped media.',
    architecture: [
      { label: 'Command', detail: 'Lark handles commands, schedules and cancel requests for each user.' },
      { label: 'Queue', detail: 'One shared queue runs a single browser at a time.' },
      { label: 'Collect', detail: 'Selenium searches by advertiser and falls back to visible text when the page code changes.' },
      { label: 'Package', detail: 'Build an Excel report (CSV as backup) and size-limited media zips.' },
      { label: 'Deliver', detail: 'Post progress and final files back to the original Lark thread.' },
    ],
    tech: [
      { name: 'Python', group: 'Languages' },
      { name: 'Flask', group: 'Cloud & Infra' },
      { name: 'Selenium', group: 'Tooling' },
      { name: 'Lark API', group: 'Automation & Messaging' },
      { name: 'Gunicorn', group: 'Cloud & Infra' },
      { name: 'systemd', group: 'Cloud & Infra' },
      { name: 'AWS EC2', group: 'Cloud & Infra' },
    ],
    stack: [
      { layer: 'Chat', tools: ['Lark API'], use: 'Commands, schedules, progress cards and file delivery.' },
      { layer: 'Service', tools: ['Python', 'Flask', 'Gunicorn'], use: 'Receive chat events and run the job queue.' },
      { layer: 'Collect', tools: ['Selenium'], use: 'Headless Chrome search with text-based backup selectors.' },
      { layer: 'Hosting', tools: ['AWS EC2', 'systemd'], use: 'Runs 24/7 on an AWS EC2 server; systemd restarts it if it stops.' },
    ],
    skills: ['Browser automation', 'Bot development', 'Job queue design', 'Reliable web scraping', 'Cloud hosting (AWS)'],
    challenges: [
      'The site changes its page code often.',
      'Each browser uses a lot of memory, so only one runs at a time.',
      'Large media downloads need size limits and a backup plan.',
    ],
    results: [
      'On-demand and daily scheduled searches with queue position and progress updates.',
      'A CSV backup still delivers results if the Excel file or upload fails.',
    ],
    images: [],
    links: {},
    dateRange: '2026 · active',
    size: 'Chat bot + browser automation',
    confidential: true,
    hosting: 'AWS EC2',
    aiAssisted: true,
    glyph: 'bot',
  },
  {
    slug: 'cs-bsc-scorecard',
    name: 'Customer Service Scorecard',
    tagline: 'One Apps Script system that builds daily, bi-weekly and monthly service scorecards.',
    summary:
      'A Google Apps Script system that combines service performance, team structure, attendance and quality-review data into one scorecard workbook. It scores KPIs from shared settings and rebuilds detailed and management views on a schedule.',
    category: 'data-analytics',
    featured: false,
    order: 11,
    domain: 'Service operations',
    problem:
      'Reporting ran on many separate scripts and sheets with copied code and fragile links between sheets. One KPI change had to be repeated everywhere.',
    solution:
      'One Apps Script project, one agent list and one central workbook. KPI targets live in settings tables, so rules change in one place.',
    architecture: [
      { label: 'Collect', detail: 'A daily trigger pulls performance data and other sheet inputs.' },
      { label: 'Map', detail: 'One agent list sets name, role, team and manager.' },
      { label: 'Score', detail: 'Targets in the settings turn raw numbers into scorecard results.' },
      { label: 'Publish', detail: 'Rebuild staff, leader, QA and management tabs in one workbook.' },
    ],
    tech: [
      { name: 'JavaScript', group: 'Languages' },
      { name: 'Google Apps Script', group: 'Automation & Messaging' },
      { name: 'Google Sheets API', group: 'Data & Analytics' },
      { name: 'LiveChat API', group: 'Automation & Messaging' },
      { name: 'clasp', group: 'Tooling' },
    ],
    stack: [
      { layer: 'Collect', tools: ['Google Apps Script', 'LiveChat API'], use: 'Daily trigger pulls service performance data.' },
      { layer: 'Score', tools: ['JavaScript'], use: 'Join agent, team, attendance and QA data; apply KPI targets.' },
      { layer: 'Publish', tools: ['Google Sheets API'], use: 'Rebuild bi-weekly, monthly and management tabs.' },
      { layer: 'Deploy', tools: ['clasp'], use: 'Keep the script in version control and deploy it.' },
    ],
    skills: ['KPI design', 'Report automation', 'Central settings for rules', 'Merging many reports into one', 'Google Apps Script'],
    challenges: [
      'Make data from several teams and roles fit one format.',
      'Remove fragile links between sheets but keep the outputs people know.',
      'Let managers change targets and periods from settings.',
    ],
    results: [
      'Replaced 22 Apps Script projects and 23 spreadsheets with one system.',
      'Score rules now live in one settings table, not in each report.',
    ],
    images: [],
    links: {},
    dateRange: '2026 · active',
    size: 'Central reporting system',
    confidential: true,
    aiAssisted: true,
    glyph: 'chart',
  },
  {
    slug: 'powerbi-geomap',
    name: 'Power BI Geographic Demo Kit',
    tagline: 'Clean map shapes, keys, DAX measures and a theme for reliable custom maps in Power BI.',
    summary:
      'A ready-to-use kit for Power BI shape maps of Vietnam. It includes cleaned boundaries, matching keys, a theme, DAX measures and a rebuild script. All health numbers are dummy data, so the kit shows the method without passing fake numbers off as real.',
    category: 'data-analytics',
    featured: false,
    order: 12,
    domain: 'Map analytics in BI',
    problem:
      'Raw boundary files are too big for Power BI shape maps. Repeated district names and mismatched keys leave areas blank or put numbers on the wrong area.',
    solution:
      'A kit that filters and simplifies the boundaries, adds stable district keys and ships matching demo data, DAX measures, a theme and a setup guide. One PowerShell script rebuilds every file.',
    architecture: [
      { label: 'Filter', detail: 'Keep only the districts in scope.' },
      { label: 'Simplify', detail: 'Mapshaper makes small GeoJSON and TopoJSON files for Power BI.' },
      { label: 'Key', detail: 'Stable district keys link each shape to the demo data.' },
      { label: 'Measure', detail: 'DAX measures calculate totals, per-person rates and rank.' },
      { label: 'Present', detail: 'A theme and setup guide give a consistent, checked map.' },
    ],
    tech: [
      { name: 'Power BI', group: 'Data & Analytics' },
      { name: 'DAX', group: 'Data & Analytics' },
      { name: 'PowerShell', group: 'Languages' },
      { name: 'GeoJSON / TopoJSON', group: 'Data & Analytics' },
      { name: 'Mapshaper', group: 'Tooling' },
    ],
    stack: [
      { layer: 'Prepare', tools: ['PowerShell', 'Mapshaper'], use: 'Filter and simplify boundaries; rebuild all files with one script.' },
      { layer: 'Shapes', tools: ['GeoJSON / TopoJSON'], use: 'Small map files with stable district keys.' },
      { layer: 'Measure', tools: ['DAX'], use: 'Totals, per-person rates and rank.' },
      { layer: 'Present', tools: ['Power BI'], use: 'Shape map with a theme and a key check.' },
    ],
    skills: ['Map data preparation', 'Power BI shape maps', 'DAX', 'Repeatable scripts', 'Data checks'],
    challenges: [
      'District names repeat across provinces, so names alone are unsafe keys.',
      'Power BI needs small map files to stay fast.',
      'Old Ho Chi Minh City districts must be kept apart from today’s official map.',
    ],
    results: [
      'Checked 24-district Ho Chi Minh City demo plus a 708-area nationwide demo.',
      'Every number is labeled as dummy data.',
    ],
    images: [],
    links: {},
    dateRange: '2026',
    size: 'BI demo kit',
    confidential: false,
    aiAssisted: true,
    glyph: 'map',
  },
  {
    slug: 'ielts-upgrade-notebook',
    name: 'IELTS Upgrade Notebook',
    tagline: 'A browser app that saves English corrections and brings them back for spaced review.',
    summary:
      'A Progressive Web App for saving speaking and writing corrections, grouping repeated mistakes and reviewing them over time. Everything stays in the browser with IndexedDB, so it works with no account, no server and no cloud database.',
    category: 'web-apps',
    featured: false,
    personal: true,
    order: 13,
    domain: 'Learning tools',
    problem:
      'Corrections from lessons were easy to collect but hard to review. Note apps saved the text but did not link the mistake, the better version and the next review date.',
    solution:
      'A browser app with one loop: save a correction, tag the mistake type, then practise recalling the better version on a schedule. All data stays on the device.',
    architecture: [
      { label: 'Capture', detail: 'Quick-add saves the original wording, the correction, the context and the mistake type.' },
      { label: 'Organize', detail: 'Notes are grouped by speaking or writing, mistake type, topic, tags and priority.' },
      { label: 'Store', detail: 'Dexie saves everything in the browser (IndexedDB). No account or server.' },
      { label: 'Review', detail: 'A review queue shows due notes and picks the next date from how well you remembered.' },
      { label: 'Back up', detail: 'Export and import keep a portable copy of the notebook.' },
    ],
    tech: [
      { name: 'TypeScript', group: 'Languages' },
      { name: 'React', group: 'Frontend' },
      { name: 'Vite', group: 'Frontend' },
      { name: 'Tailwind CSS', group: 'Frontend' },
      { name: 'Dexie / IndexedDB', group: 'Data & Analytics' },
      { name: 'PWA', group: 'Frontend' },
      { name: 'Vitest', group: 'Tooling' },
      { name: 'Playwright', group: 'Tooling' },
    ],
    stack: [
      { layer: 'Interface', tools: ['React', 'TypeScript', 'Tailwind CSS'], use: 'Capture, review and browse screens in light and dark themes.' },
      { layer: 'Storage', tools: ['Dexie / IndexedDB'], use: 'Save notes, review dates and settings in the browser.' },
      { layer: 'App shell', tools: ['Vite', 'PWA'], use: 'Fast build; can be installed and works offline.' },
      { layer: 'Test', tools: ['Vitest', 'Playwright'], use: 'Unit tests for review logic; browser tests for the main flows.' },
    ],
    skills: ['Product design', 'Frontend engineering', 'Offline data storage', 'Spaced review logic', 'Automated testing'],
    challenges: [
      'One data model had to fit both speaking and writing notes.',
      'Review dates had to be testable, so the current time is passed in, not read from the clock.',
      'Full keyboard use and a polished look with no backend.',
    ],
    results: [
      'Working app with capture, review, search, mistake groups and backup.',
      'Unit tests with a fake browser database plus Playwright browser tests.',
    ],
    images: [
      { src: 'images/ielts/today-dark.png', alt: 'IELTS Upgrade Notebook today screen in dark mode', caption: 'Today: due reviews, recent corrections and navigation.' },
      { src: 'images/ielts/review-dark.png', alt: 'IELTS Upgrade Notebook review screen', caption: 'Review: show the better sentence, then rate how well you remembered.' },
      { src: 'images/ielts/quick-add-dark.png', alt: 'IELTS Upgrade Notebook writing correction form', caption: 'Capture: correction, mistake type and study tags in one form.' },
    ],
    links: {},
    fileTree: [
      { name: 'src', children: [{ name: 'components' }, { name: 'features' }, { name: 'lib' }, { name: 'styles' }] },
      { name: 'docs', children: [{ name: 'product-brief.md' }, { name: 'mockups' }, { name: 'superpowers' }] },
      { name: 'tests' },
      { name: 'playwright.config.ts' },
    ],
    dateRange: '2026 · active',
    size: 'Offline browser app',
    confidential: false,
    aiAssisted: true,
    glyph: 'app',
  },
  {
    slug: 'cozy-quest',
    name: 'Cozy Quest',
    tagline: 'An offline Windows task manager that turns work and personal goals into a calm quest log.',
    summary:
      'An offline desktop productivity app built with Tauri, React and SQLite. It combines quick-add, recurring tasks, project planning, a Kanban board and a focus timer with a light game layer, with no account, subscription or cloud storage.',
    category: 'web-apps',
    featured: false,
    personal: true,
    order: 14,
    domain: 'Personal productivity',
    problem:
      'Normal task apps make small daily work feel like admin, and heavily gamified apps distract. I wanted one fast desktop tool with separate work and personal spaces.',
    solution:
      'A Tauri desktop app: tasks are quests, projects show progress and a focus timer grows a mushroom. Quick-add, recurring tasks, reminders and offline storage come first; rewards stay light.',
    architecture: [
      { label: 'Capture', detail: 'Quick-add reads tags, project, priority, points and dates like “tomorrow 3pm”.' },
      { label: 'Plan', detail: 'Today, Upcoming, list, board and project views all use the same quest data.' },
      { label: 'Focus', detail: 'A timer linked to one quest records the session and adds progress.' },
      { label: 'Save', detail: 'Rust code writes to SQLite and upgrades the database safely.' },
      { label: 'Remind', detail: 'Tauri sends Windows reminders and runs the tray icon, auto-start and a global shortcut.' },
    ],
    tech: [
      { name: 'TypeScript', group: 'Languages' },
      { name: 'Rust', group: 'Languages' },
      { name: 'React', group: 'Frontend' },
      { name: 'Tauri', group: 'Frontend' },
      { name: 'SQLite', group: 'Data & Analytics' },
      { name: 'Zustand', group: 'Frontend' },
      { name: 'Vitest', group: 'Tooling' },
    ],
    stack: [
      { layer: 'Interface', tools: ['React', 'TypeScript', 'Zustand'], use: 'Today, list, board and project screens, plus app state.' },
      { layer: 'Desktop', tools: ['Tauri'], use: 'Native window, tray icon, reminders, auto-start and global shortcut.' },
      { layer: 'Backend', tools: ['Rust'], use: 'Reads and writes data and runs database upgrades.' },
      { layer: 'Storage', tools: ['SQLite'], use: 'Local database for quests, projects and focus sessions.' },
      { layer: 'Test', tools: ['Vitest'], use: 'Tests for the screens, plus Rust tests for data, reminders and focus.' },
    ],
    skills: ['Desktop app engineering', 'Product & UX design', 'React + TypeScript', 'Rust', 'Offline data storage'],
    challenges: [
      'Recurring tasks must stay correct across restarts and date changes.',
      'Screens, Windows reminders, tray icon and database upgrades must stay in sync.',
      'Game elements must not get in the way of the task list.',
    ],
    results: [
      'Ships as a Windows .exe and installer. All data stays in a local SQLite file.',
      'Tests cover the screens and the Rust code for data, upgrades, reminders and focus.',
    ],
    images: [
      { src: 'images/cozy-quest/today.png', alt: 'Cozy Quest Today screen in night theme', caption: 'Today: planned quests, daily progress, EXP and the companion.' },
      { src: 'images/cozy-quest/board.png', alt: 'Cozy Quest Kanban board in night theme', caption: 'Board: drag quests from To do to In progress to Completed.' },
      { src: 'images/cozy-quest/focus.png', alt: 'Cozy Quest Mushroom Focus timer', caption: 'Focus: a timer linked to one quest records the session.' },
      { src: 'images/cozy-quest/projects.png', alt: 'Cozy Quest project view', caption: 'Projects: progress, points, deadline and the next quest.' },
    ],
    links: {},
    dateRange: '2026 · active',
    size: 'Offline desktop app',
    confidential: false,
    aiAssisted: true,
    glyph: 'app',
  },
  {
    slug: 'pdf-to-html-kindle',
    name: 'PDF to HTML for Kindle',
    tagline: 'Turns textbook PDFs into searchable web pages and Kindle-ready e-books.',
    summary:
      'A Python tool that converts textbook PDFs into web and Kindle editions. It rebuilds reading order, headings, lists, code, tables and footnotes from the PDF layout, and keeps charts and complex formulas as sharp images when text would be risky.',
    category: 'developer-tools',
    featured: false,
    personal: true,
    order: 15,
    domain: 'Document conversion',
    problem:
      'Fixed-layout PDFs read badly on e-readers. Saving each page as an image loses search, highlights and navigation.',
    solution:
      'A Python tool that rebuilds the text structure from the PDF layout and keeps charts and complex math as sharp image crops. It outputs HTML, EPUB and Kindle files.',
    architecture: [
      { label: 'Parse', detail: 'PyMuPDF reads text, fonts, drawings and positions on each page.' },
      { label: 'Reflow', detail: 'Rules rebuild reading order, paragraphs, headings, lists, code, tables and footnotes.' },
      { label: 'Fallback', detail: 'Unclear tables, scans and complex math stay as images instead of guessed text.' },
      { label: 'Package', detail: 'Build linked HTML, EPUB and optional Kindle files.' },
      { label: 'Verify', detail: 'Check links, navigation, images and that every source page is included.' },
    ],
    tech: [
      { name: 'Python', group: 'Languages' },
      { name: 'HTML / CSS', group: 'Frontend' },
      { name: 'PyMuPDF', group: 'Tooling' },
      { name: 'EPUB', group: 'Tooling' },
      { name: 'Calibre', group: 'Tooling' },
    ],
    stack: [
      { layer: 'Parse', tools: ['Python', 'PyMuPDF'], use: 'Read text, fonts, drawings and positions from each page.' },
      { layer: 'Rebuild', tools: ['Python'], use: 'Rebuild reading order and document structure from the layout.' },
      { layer: 'Package', tools: ['HTML / CSS', 'EPUB', 'Calibre'], use: 'Build web, EPUB and Kindle editions.' },
    ],
    skills: ['Document conversion', 'Layout analysis', 'Python tooling', 'Output checks', 'E-book packaging'],
    challenges: [
      'Reading order must come from positions on the page, not from the file structure.',
      'Decide when a table or formula is safe as text and when it must stay an image.',
      'Keep navigation and page links working in both HTML and EPUB.',
    ],
    results: [
      'Test book: all 422 pages converted into a searchable edition.',
      'Image tuning cut the EPUB from 50.1 MB to 9.7 MB.',
    ],
    images: [
      { src: 'images/pdf-to-html/before-after.svg', alt: 'Illustration of a two-column PDF page converted into a reflowing e-book page', caption: 'Illustration with placeholder text. No book content is shown.' },
    ],
    links: {},
    dateRange: '2026',
    size: 'Command-line tool',
    confidential: false,
    aiAssisted: true,
    glyph: 'doc',
  },
]

const groupOrder: TechGroup[] = [
  'Languages',
  'Data & Analytics',
  'AI & LLM',
  'Cloud & Infra',
  'Automation & Messaging',
  'Frontend',
  'Tooling',
]

export const techGroups: TechGroupEntry[] = groupOrder
  .map((group) => {
    const items = new Map<string, string[]>()
    for (const project of projects) {
      for (const tech of project.tech.filter((item) => item.group === group)) {
        items.set(tech.name, [...(items.get(tech.name) ?? []), project.slug])
      }
    }
    return {
      group,
      items: [...items.entries()]
        .map(([name, projectSlugs]) => ({ name, projectSlugs }))
        .sort((a, b) => b.projectSlugs.length - a.projectSlugs.length || a.name.localeCompare(b.name)),
    }
  })
  .filter((entry) => entry.items.length > 0)

export const strengths: Strength[] = [
  {
    title: 'Business analytics & BI',
    evidence: 'I turn unclear questions into agreed metrics, easy-to-use Power BI reports and clear next steps.',
    icon: 'bar-chart',
    projects: ['market-intelligence-hub', 'vietnam-macro-intelligence', 'brand-health-tracking'],
  },
  {
    title: 'Data engineering',
    evidence: 'I combine APIs, web releases, large files and messy spreadsheets into staged data models that refresh on their own.',
    icon: 'database',
    projects: ['vietnam-macro-intelligence', 'telecom-camera-analytics', 'qbo-automation-bot'],
  },
  {
    title: 'Automation & integrations',
    evidence: 'I build Python services, API integrations and chat bots that run 24/7 on AWS EC2.',
    icon: 'workflow',
    projects: ['payout-alert-bot', 'qbo-automation-bot', 'fb-ads-research-bot'],
  },
  {
    title: 'Data quality & matching',
    evidence: 'I make messy names, categories and links between records trustworthy with rules, matching and human review.',
    icon: 'code',
    projects: ['healthcare-market-intelligence', 'qbo-automation-bot', 'powerbi-geomap'],
  },
  {
    title: 'Analytics product thinking',
    evidence: 'I design for the reader and how often they decide, from executive overview to analyst detail and weekly operations.',
    icon: 'layout',
    projects: ['market-intelligence-hub', 'brand-health-tracking', 'telecom-camera-analytics'],
  },
  {
    title: 'Applied AI with controls',
    evidence: 'I use AI where it helps, with limits, confidence checks and human review for unsure results.',
    icon: 'sparkles',
    projects: ['healthcare-market-intelligence', 'payout-alert-bot'],
  },
]
