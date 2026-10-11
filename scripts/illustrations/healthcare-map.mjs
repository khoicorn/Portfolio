// Builds public/images/case-studies/healthcare-dashboard.svg from the GeoMap kit's
// simplified district boundaries and its synthetic demo values.
// Usage: node build-healthcare-svg.mjs <districts.json> <outline.json> <dummy.csv> <out.svg>
import { readFileSync, writeFileSync } from 'node:fs'

const [districtsPath, outlinePath, csvPath, outPath] = process.argv.slice(2)
const districts = JSON.parse(readFileSync(districtsPath, 'utf8'))
const outline = JSON.parse(readFileSync(outlinePath, 'utf8'))

// Synthetic demo values: ShapeID -> { city, perTenK }
const rows = readFileSync(csvPath, 'utf8').replace(/^﻿/, '').trim().split(/\r?\n/).slice(1)
const values = new Map()
for (const line of rows) {
  const c = line.split('","').map((s) => s.replace(/"/g, ''))
  values.set(c[1], { city: c[3], perTenK: Number(c[10]) })
}

// Projection: equirectangular with cos(lat) correction, fitted into the map box.
const LON0 = 102.14, LAT1 = 23.39, KX = Math.cos((15.3 * Math.PI) / 180)
const S = 31.2, X0 = 52, Y0 = 192
const px = (lon) => X0 + (lon - LON0) * KX * S
const py = (lat) => Y0 + (LAT1 - lat) * S
const r1 = (n) => Math.round(n * 10) / 10

function ringPath(ring) {
  let d = '', last = ''
  for (const [lon, lat] of ring) {
    const pt = `${r1(px(lon))} ${r1(py(lat))}`
    if (pt === last) continue
    d += (d ? 'L' : 'M') + pt
    last = pt
  }
  return d + 'Z'
}
function geomPath(g) {
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates
  return polys.map((p) => p.map(ringPath).join('')).join('')
}

const BINS = [
  { max: 6.3, color: '#183640', label: 'Under 6' },
  { max: 9.3, color: '#1d4f52', label: '6 – 9' },
  { max: 12.7, color: '#24706a', label: '9 – 13' },
  { max: Infinity, color: '#2f9884', label: '13 and above' },
]
const CITY = '#f4b85f'
const ISLANDS = new Set(['Hoang Sa', 'Truong Sa'])

// Top-5 provinces to highlight. City field covers Hanoi, HCMC and Da Nang; Hai Phong and
// Can Tho are picked by district name plus a location box, because names repeat across provinces.
const HP = new Set(['Hong Bang', 'Ngo Quyen', 'Le Chan', 'Hai An', 'Kien An', 'Do Son', 'Duong Kinh', 'An Duong', 'An Lao', 'Kien Thuy', 'Tien Lang', 'Vinh Bao', 'Thuy Nguyen', 'Cat Hai'])
const CT = new Set(['Ninh Kieu', 'Binh Thuy', 'Cai Rang', 'O Mon', 'Thot Not', 'Phong Dien', 'Co Do', 'Thoi Lai', 'Vinh Thanh'])
function bbox(g) {
  const a = [1e9, -1e9, 1e9, -1e9]
  const w = (c) => { if (typeof c[0] === 'number') { a[0] = Math.min(a[0], c[0]); a[1] = Math.max(a[1], c[0]); a[2] = Math.min(a[2], c[1]); a[3] = Math.max(a[3], c[1]) } else c.forEach(w) }
  w(g.coordinates)
  return a
}
function highlightOf(f, v) {
  const [x0, x1, y0, y1] = bbox(f.geometry), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2
  const n = f.properties.shapeName
  if (v?.city === 'Hanoi') return 'Hà Nội'
  if (v?.city === 'HCMC') return 'TP.HCM'
  if (v?.city === 'Danang') return 'Đà Nẵng'
  if (HP.has(n) && cx > 106.3 && cx < 107.2 && cy > 20.5 && cy < 21.1) return 'Hải Phòng'
  if (CT.has(n) && cx > 105.3 && cx < 105.9 && cy > 9.9 && cy < 10.35) return 'Cần Thơ'
  return null
}

const groups = new Map()
const add = (key, d) => groups.set(key, (groups.get(key) ?? '') + d)
const hiBoxes = new Map()
let islands = ''
for (const f of districts.features) {
  const d = geomPath(f.geometry)
  if (ISLANDS.has(f.properties.shapeName)) { islands += d; continue }
  const v = values.get(f.properties.shapeID)
  const hi = highlightOf(f, v)
  if (hi) {
    add(CITY, d)
    const b = bbox(f.geometry), o = hiBoxes.get(hi) ?? [1e9, -1e9, 1e9, -1e9]
    hiBoxes.set(hi, [Math.min(o[0], b[0]), Math.max(o[1], b[1]), Math.min(o[2], b[2]), Math.max(o[3], b[3])])
    continue
  }
  const bin = BINS.find((b) => (v?.perTenK ?? 0) < b.max) ?? BINS[0]
  add(bin.color, d)
}
const outlineGeoms = outline.features?.map((f) => f.geometry) ?? outline.geometries ?? [outline]
const outlineD = outlineGeoms.map(geomPath).join('')

// Pill position (lx, ly = left/baseline) and which side the leader line attaches to.
const cities = [
  { name: 'Hà Nội', value: '1,284', lx: 300, ly: 346, side: 'left' },
  { name: 'Hải Phòng', value: '368', lx: 300, ly: 380, side: 'left' },
  { name: 'Đà Nẵng', value: '412', lx: 70, ly: 452, side: 'right' },
  { name: 'Cần Thơ', value: '297', lx: 44, ly: 646, side: 'right' },
  { name: 'TP.HCM', value: '1,902', lx: 60, ly: 694, side: 'right' },
]
const callouts = cities.map(({ name, value, lx, ly, side }) => {
  const [x0, x1, y0, y1] = hiBoxes.get(name)
  const x = r1(px((x0 + x1) / 2)), y = r1(py((y0 + y1) / 2))
  const w = r1(22 + (name.length + value.length) * 7.4)
  const ax = side === 'left' ? lx : lx + w, ay = ly - 15
  const ang = Math.atan2(ay - y, ax - x), R = 13
  const sx = r1(x + Math.cos(ang) * R), sy = r1(y + Math.sin(ang) * R)
  return `<circle cx="${x}" cy="${y}" r="${R}" fill="${CITY}" fill-opacity=".18" stroke="${CITY}" stroke-opacity=".9" stroke-width="1.4"/>` +
    `<path d="M${sx} ${sy}L${ax} ${ay}" stroke="${CITY}" stroke-opacity=".7" stroke-width="1.2"/>` +
    `<rect x="${lx}" y="${ly - 26}" width="${w}" height="22" rx="11" fill="#0b1820" stroke="${CITY}" stroke-opacity=".8"/>` +
    `<text x="${lx + 11}" y="${ly - 11}" fill="#f5fbf9" font-size="12.5" font-weight="700">${name} <tspan fill="${CITY}">${value}</tspan></text>`
}).join('')

const legendRows = [...BINS.map((b) => [b.color, b.label]), [CITY, 'Top 5 provinces']]
const legend = `<g transform="translate(330 202)"><rect width="196" height="122" rx="12" fill="#0f1b24"/>` +
  `<text x="14" y="22" fill="#90a6b1" font-size="11.5" font-weight="700" letter-spacing=".6">DOCTORS PER 10K PEOPLE</text>` +
  legendRows.map(([c, l], i) => `<rect x="14" y="${34 + i * 17}" width="14" height="11" rx="3" fill="${c}"/><text x="36" y="${44 + i * 17}" fill="#c9d6dc" font-size="12">${l}</text>`).join('') +
  `</g>`

const top = [
  ['TP.HCM', 1902, true], ['Hà Nội', 1284, true], ['Đà Nẵng', 412, true], ['Hải Phòng', 368, false], ['Cần Thơ', 297, false],
]
const bars = top.map(([n, v, hi], i) => {
  const y = 304 + i * 36, w = r1((v / 1902) * 330)
  return `<text x="594" y="${y + 13}" fill="#c9d6dc" font-size="14">${n}</text><rect x="704" y="${y}" width="330" height="16" rx="8" fill="#1b2d39"/>` +
    `<rect x="704" y="${y}" width="${w}" height="16" rx="8" fill="${CITY}"/><text x="${r1(704 + w + 10)}" y="${y + 13}" fill="#f5fbf9" font-size="13" font-weight="700">${v.toLocaleString('en-US')}</text>`
}).join('')

const match = [
  ['#42d6b7', 71, 'Exact rules', 'name and address match a reference list'],
  ['#2a7f74', 21, 'Fuzzy match', 'similarity score above the threshold'],
  [CITY, 8, 'Human review', 'AI suggests a match, a person approves'],
]
let mx = 594
const matchBar = match.map(([c, p]) => {
  const w = r1((p / 100) * 552), s = `<rect x="${mx}" y="566" width="${w}" height="24" fill="${c}"/>`
  mx += w
  return s
}).join('')
const matchRows = match.map(([c, p, n, why], i) => {
  const y = 628 + i * 26
  return `<circle cx="600" cy="${y - 4}" r="5" fill="${c}"/><text x="614" y="${y}" fill="#f5fbf9" font-size="13.5" font-weight="700">${n} ${p}%</text><text x="760" y="${y}" fill="#90a6b1" font-size="13">${why}</text>`
}).join('')

const kpis = [['Facilities', '428'], ['Doctors', '6,240'], ['Provinces', '34'], ['Records matched', '96.4%']]
const kpiTiles = kpis.map(([l, v], i) => {
  const x = 568 + i * 154
  return `<rect x="${x}" y="112" width="142" height="104" rx="16" fill="#13212c"/><text x="${x + 18}" y="144" fill="#90a6b1" font-size="13">${l}</text><text x="${x + 18}" y="188" fill="#f5fbf9" font-size="30" font-weight="700">${v}</text>`
}).join('')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" role="img" aria-labelledby="t d">
<title id="t">Healthcare provider landscape dashboard recreation</title><desc id="d">A dark dashboard with a district map of Vietnam colored by fictional doctor density, Hanoi, Da Nang and Ho Chi Minh City highlighted, the top provinces by doctors and how records were matched. All values are synthetic sample data.</desc>
<rect width="1200" height="750" rx="28" fill="#09131c"/>
<g font-family="Arial, Helvetica, sans-serif">
<rect x="28" y="28" width="1144" height="62" rx="14" fill="#13212c"/><path d="M58 48v22M47 59h22" stroke="#42d6b7" stroke-width="7" stroke-linecap="round"/><text x="86" y="67" fill="#f5fbf9" font-size="24" font-weight="700">Healthcare Provider Landscape</text><text x="1060" y="65" fill="#90a6b1" font-size="14" letter-spacing="1">SAMPLE DATA</text>
${kpiTiles}
<rect x="28" y="112" width="520" height="594" rx="18" fill="#13212c"/>
<text x="54" y="150" fill="#f5fbf9" font-size="18" font-weight="700">Coverage by province</text><text x="54" y="172" fill="#90a6b1" font-size="12.5">District level · fictional values</text>
<g stroke="#13212c" stroke-width=".35" stroke-linejoin="round">${[...groups].map(([c, d]) => `<path fill="${c}" d="${d}"/>`).join('')}</g>
<path d="${outlineD}" fill="none" stroke="#42d6b7" stroke-opacity=".45" stroke-width=".8" stroke-linejoin="round"/>
<path d="${islands}" fill="#2f9884" stroke="#2f9884" stroke-width="1.6" stroke-linejoin="round"/>
<text x="376" y="414" fill="#90a6b1" font-size="11.5" font-style="italic">Hoàng Sa</text><text x="420" y="556" fill="#90a6b1" font-size="11.5" font-style="italic">Trường Sa</text>
${legend}
${callouts}
<rect x="568" y="236" width="604" height="250" rx="18" fill="#13212c"/><text x="594" y="276" fill="#f5fbf9" font-size="18" font-weight="700">Top provinces by doctors</text>
${bars}
<rect x="568" y="506" width="604" height="200" rx="18" fill="#13212c"/><text x="594" y="546" fill="#f5fbf9" font-size="18" font-weight="700">How records were matched</text>
<clipPath id="mb"><rect x="594" y="566" width="552" height="24" rx="12"/></clipPath><g clip-path="url(#mb)">${matchBar}</g>
${matchRows}
</g>
</svg>
`
writeFileSync(outPath, svg)
console.log('wrote', outPath, (svg.length / 1024).toFixed(1) + ' KB')
