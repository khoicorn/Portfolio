// Sample-data illustration of the payout card and alert feed for the Payout & Wallet Alert Bot case study.
import { writeFileSync } from 'node:fs'
const out = process.argv[2]
const T = '#eef3f7', M = '#8fa1b1', P = '#121a24', L = '#223040'
const B = '#3370ff', G = '#34d399', A = '#f4b85f', R = '#f87171'

const steps = [['Approved', 'done'], ['Claimed', 'done'], ['Created', 'done'], ['Signed', 'now'], ['Paid', 'todo']]
const stepRow = steps.map(([label, st], i) => {
  const x = 152 + i * 124, y = 252
  const line = i < steps.length - 1 ? `<rect x="${x + 12}" y="${y - 1.5}" width="100" height="3" rx="1.5" fill="${st === 'done' ? G : L}"/>` : ''
  const dot = st === 'done'
    ? `<circle cx="${x}" cy="${y}" r="11" fill="${G}"/><path d="M${x - 5} ${y}l3.5 3.5 6-7" fill="none" stroke="#06241a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`
    : st === 'now'
      ? `<circle cx="${x}" cy="${y}" r="15" fill="${A}" fill-opacity=".2"/><circle cx="${x}" cy="${y}" r="9" fill="${A}"/>`
      : `<circle cx="${x}" cy="${y}" r="9" fill="none" stroke="#3a4a5c" stroke-width="2.5"/>`
  return line + dot + `<text x="${x}" y="${y + 32}" fill="${st === 'todo' ? M : T}" font-size="13" text-anchor="middle"${st === 'now' ? ' font-weight="700"' : ''}>${label}</text>`
}).join('')

const fields = [['Payee', 'Supplier A · new'], ['Network', 'TRON (TRC-20)'], ['Amount', '2,400.00 USDT'], ['Deadline', 'Today 17:00'], ['Requested by', 'Finance team'], ['Ticket', 'PR-0412']]
const fieldGrid = fields.map(([k, v], i) => {
  const x = 138 + (i % 2) * 270, y = 330 + Math.floor(i / 2) * 44
  return `<text x="${x}" y="${y}" fill="${M}" font-size="12.5">${k}</text><text x="${x}" y="${y + 19}" fill="${T}" font-size="15" font-weight="700">${v}</text>`
}).join('')

const alerts = [
  [G, 'Incoming transfer', '+5,000 USDT to the ops wallet', '2 min ago'],
  [A, 'Reminder', 'PR-0409 unsigned for 30 min. Signers tagged.', '8 min ago'],
  [R, 'Low gas', 'Payout wallet fell below its alert line', '1 h ago'],
  [B, 'Daily report · 20:00', '18 paid · 0 missing from wallet history', 'yesterday'],
]
const alertCards = alerts.map(([c, t, d, when], i) => {
  const y = 158 + i * 104
  return `<rect x="738" y="${y}" width="420" height="88" rx="14" fill="${P}" stroke="${L}"/><rect x="738" y="${y}" width="5" height="88" rx="2.5" fill="${c}"/>` +
    `<circle cx="770" cy="${y + 30}" r="6" fill="${c}"/><text x="786" y="${y + 35}" fill="${T}" font-size="15" font-weight="700">${t}</text>` +
    `<text x="1140" y="${y + 35}" fill="${M}" font-size="12" text-anchor="end">${when}</text><text x="762" y="${y + 64}" fill="${M}" font-size="13.5">${d}</text>`
}).join('')

const stats = [['15', 'rule checks per request'], ['30 s', 'status polling per payout'], ['1,500+', 'automated tests'], ['24/7', 'Docker on AWS EC2']]
const statRow = stats.map(([v, l], i) => {
  const x = 40 + i * 284
  return `<rect x="${x}" y="634" width="268" height="76" rx="16" fill="${P}"/><text x="${x + 20}" y="667" fill="${T}" font-size="24" font-weight="700">${v}</text><text x="${x + 20}" y="691" fill="${M}" font-size="13">${l}</text>`
}).join('')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" role="img" aria-labelledby="t d">
<title id="t">Payout card and wallet alerts in Lark, sample data</title><desc id="d">Left: a Lark card for one payout request with a five-step status tracker, request details, two flagged checks and action buttons. Right: a feed of wallet alerts and reports. All names and values are fictional.</desc>
<rect width="1200" height="750" rx="28" fill="#0a0f15"/>
<g font-family="Arial, Helvetica, sans-serif">
<rect x="28" y="28" width="1144" height="62" rx="14" fill="${P}"/><rect x="50" y="44" width="30" height="30" rx="9" fill="${B}"/><path d="M58 59h14M65 52v14" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
<text x="94" y="67" fill="${T}" font-size="22" font-weight="700">Payments group</text><text x="1060" y="65" fill="${M}" font-size="14" letter-spacing="1">SAMPLE DATA</text>
<circle cx="62" cy="134" r="18" fill="${B}"/><text x="62" y="140" fill="#fff" font-size="14" font-weight="700" text-anchor="middle">PB</text>
<text x="92" y="131" fill="${T}" font-size="14" font-weight="700">Payout Bot</text><text x="176" y="131" fill="${M}" font-size="12">10:42 · card updates live</text>
<rect x="92" y="150" width="610" height="460" rx="16" fill="${P}" stroke="${L}"/>
<path d="M92 166a16 16 0 0 1 16-16h578a16 16 0 0 1 16 16v38h-610z" fill="#17233a"/>
<text x="116" y="185" fill="${T}" font-size="17" font-weight="700">Payout request PR-0412</text>
<rect x="526" y="165" width="156" height="28" rx="14" fill="${A}" fill-opacity=".16" stroke="${A}" stroke-opacity=".6"/><text x="604" y="184" fill="${A}" font-size="13" font-weight="700" text-anchor="middle">Awaiting signature</text>
${stepRow}
${fieldGrid}
<rect x="116" y="460" width="562" height="82" rx="10" fill="#1c1a12"/><rect x="116" y="460" width="4" height="82" rx="2" fill="${A}"/>
<text x="134" y="484" fill="${A}" font-size="13.5" font-weight="700">2 checks need a look</text>
<text x="134" y="506" fill="#d8cfb8" font-size="13">• New payee: first payout to this address</text><text x="134" y="527" fill="#d8cfb8" font-size="13">• Deadline found in the request text</text>
<text x="660" y="484" fill="${M}" font-size="11.5" text-anchor="end">AI note added</text>
<rect x="116" y="558" width="150" height="34" rx="9" fill="${B}"/><text x="191" y="580" fill="#fff" font-size="13.5" font-weight="700" text-anchor="middle">Open in wallet</text>
<rect x="278" y="558" width="130" height="34" rx="9" fill="none" stroke="#3a4a5c"/><text x="343" y="580" fill="${T}" font-size="13.5" text-anchor="middle">Mark as paid</text>
<rect x="420" y="558" width="110" height="34" rx="9" fill="none" stroke="#3a4a5c"/><text x="475" y="580" fill="${T}" font-size="13.5" text-anchor="middle">Reassign</text>
<text x="738" y="134" fill="${M}" font-size="13" font-weight="700" letter-spacing="1.2">WALLET ALERTS &amp; REPORTS</text>
${alertCards}
${statRow}
</g>
</svg>
`
writeFileSync(out, svg)
console.log('wrote', out, (svg.length / 1024).toFixed(1) + ' KB')
