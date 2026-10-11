// Before/after illustration for the PDF to HTML for Kindle case study. Placeholder lines only.
import { writeFileSync } from 'node:fs'

const out = process.argv[2]
const G = '#34d399', A = '#f4b85f'
let seed = 7
const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280)

function lines(x, y, w, n, gap, color, h = 5, lastShort = true) {
  let s = ''
  for (let i = 0; i < n; i++) {
    const lw = i === n - 1 && lastShort ? w * (0.35 + rnd() * 0.3) : w * (0.86 + rnd() * 0.14)
    s += `<rect x="${x}" y="${(y + i * gap).toFixed(1)}" width="${lw.toFixed(1)}" height="${h}" rx="${h / 2}" fill="${color}"/>`
  }
  return s
}

// Left: fixed-layout PDF page with two columns, a chart and a formula.
const px = 92, py = 150, pw = 340, ph = 440
const pdf = `
<rect x="${px + 8}" y="${py + 10}" width="${pw}" height="${ph}" rx="6" fill="#05090d" opacity=".6"/>
<rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="6" fill="#e8ecf0"/>
<rect x="${px + 24}" y="${py + 26}" width="170" height="11" rx="5" fill="#4b5966"/>
<rect x="${px + 24}" y="${py + 46}" width="110" height="6" rx="3" fill="#97a3ae"/>
${lines(px + 24, py + 72, 136, 9, 13, '#aab4be')}
${lines(px + 180, py + 72, 136, 5, 13, '#aab4be')}
<rect x="${px + 180}" y="${py + 140}" width="136" height="74" rx="4" fill="#d7dde3"/>
${[18, 34, 26, 46, 38].map((h, i) => `<rect x="${px + 194 + i * 23}" y="${py + 202 - h}" width="13" height="${h}" rx="2" fill="#7f8e9b"/>`).join('')}
${lines(px + 24, py + 196, 136, 6, 13, '#aab4be')}
${lines(px + 180, py + 228, 136, 4, 13, '#aab4be')}
<rect x="${px + 24}" y="${py + 286}" width="292" height="40" rx="4" fill="#d7dde3"/>
<text x="${px + 170}" y="${py + 312}" fill="#5d6b78" font-family="Georgia, serif" font-size="17" font-style="italic" text-anchor="middle">f(x) = Σ wᵢ · xᵢ + b</text>
${lines(px + 24, py + 344, 136, 6, 13, '#aab4be')}
${lines(px + 180, py + 344, 136, 6, 13, '#aab4be')}
<text x="${px + pw - 22}" y="${py + ph - 16}" fill="#97a3ae" font-family="Arial" font-size="11" text-anchor="end">p. 42</text>
`

// Middle: three conversion steps.
const steps = [['1', 'Parse', 'read text, fonts and layout'], ['2', 'Reflow', 'rebuild reading order'], ['3', 'Package', 'HTML · EPUB · Kindle']]
const sx = 486, sw = 236
const mid = steps.map(([n, t, d], i) => {
  const y = 214 + i * 112
  return `<rect x="${sx}" y="${y}" width="${sw}" height="76" rx="14" fill="#121c26" stroke="#223140"/>` +
    `<rect x="${sx + 16}" y="${y + 18}" width="26" height="26" rx="7" fill="${G}"/><text x="${sx + 29}" y="${y + 36}" fill="#062218" font-family="Arial" font-size="14" font-weight="700" text-anchor="middle">${n}</text>` +
    `<text x="${sx + 54}" y="${y + 35}" fill="#eef3f7" font-family="Arial" font-size="17" font-weight="700">${t}</text>` +
    `<text x="${sx + 54}" y="${y + 57}" fill="#8fa1b1" font-family="Arial" font-size="13">${d}</text>` +
    (i < 2 ? `<path d="M${sx + sw / 2} ${y + 82}v20m-6 -7l6 7 6-7" fill="none" stroke="#3b5163" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` : '')
}).join('') +
  `<path d="M440 370h36m-8 -8l8 8-8 8" fill="none" stroke="${G}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="M730 370h36m-8 -8l8 8-8 8" fill="none" stroke="${G}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`

// Right: e-reader with one reflowed column, the chart kept as an image and a linked footnote.
const ex = 786, ey = 136, ew = 316, eh = 468
const sxr = ex + 22, syr = ey + 26, swr = ew - 44
const reader = `
<rect x="${ex}" y="${ey}" width="${ew}" height="${eh}" rx="26" fill="#1b2632" stroke="#2a3a4a"/>
<rect x="${sxr}" y="${syr}" width="${swr}" height="${eh - 72}" rx="6" fill="#f3efe4"/>
<rect x="${sxr + 22}" y="${syr + 24}" width="150" height="10" rx="5" fill="#3d4650"/>
${lines(sxr + 22, syr + 48, swr - 44, 5, 15, '#a59f92', 6)}
<rect x="${sxr + 22}" y="${syr + 132}" width="${swr - 44}" height="80" rx="4" fill="#e3ddce"/>
${[22, 40, 30, 54, 44].map((h, i) => `<rect x="${sxr + 52 + i * 38}" y="${syr + 202 - h}" width="20" height="${h}" rx="2" fill="#8d8676"/>`).join('')}
<text x="${sxr + swr - 26}" y="${syr + 148}" fill="#8d8676" font-family="Arial" font-size="10" text-anchor="end">image</text>
${lines(sxr + 22, syr + 228, swr - 44, 4, 15, '#a59f92', 6)}
<text x="${sxr + 22 + (swr - 44) * 0.45}" y="${syr + 280}" fill="${G}" font-family="Arial" font-size="11" font-weight="700">[1]</text>
${lines(sxr + 22, syr + 294, swr - 44, 3, 15, '#a59f92', 6)}
<line x1="${sxr + 22}" y1="${syr + 352}" x2="${sxr + 110}" y2="${syr + 352}" stroke="#c9c2b2"/>
<text x="${sxr + 22}" y="${syr + 370}" fill="#8d8676" font-family="Arial" font-size="10.5">[1] Footnote stays linked</text>
<text x="${ex + ew / 2}" y="${ey + eh - 20}" fill="#8fa1b1" font-family="Arial" font-size="11" text-anchor="middle">Chapter 3 · 42%</text>
`

const stats = [['422 / 422', 'pages kept, all searchable'], ['50.1 → 9.7 MB', 'EPUB size after image tuning'], ['3 formats', 'HTML, EPUB and Kindle']]
const statRow = stats.map(([v, l], i) => {
  const x = 60 + i * 368
  return `<rect x="${x}" y="634" width="344" height="76" rx="16" fill="#121c26"/><text x="${x + 22}" y="668" fill="#eef3f7" font-family="Arial" font-size="24" font-weight="700">${v}</text><text x="${x + 22}" y="692" fill="#8fa1b1" font-family="Arial" font-size="13">${l}</text>`
}).join('')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" role="img" aria-labelledby="t d">
<title id="t">PDF to EPUB conversion, before and after</title><desc id="d">Left: a fixed two-column PDF page with a chart and a formula. Middle: three steps, parse, reflow and package. Right: the same content as one reflowing column on an e-reader, with the chart kept as an image and a linked footnote. Placeholder lines only.</desc>
<rect width="1200" height="750" rx="28" fill="#0b1118"/>
<g font-family="Arial, Helvetica, sans-serif">
<text x="92" y="112" fill="#8fa1b1" font-size="13" font-weight="700" letter-spacing="1.4">BEFORE · FIXED PDF</text>
<text x="486" y="112" fill="#8fa1b1" font-size="13" font-weight="700" letter-spacing="1.4">CONVERTER</text>
<text x="786" y="112" fill="${G}" font-size="13" font-weight="700" letter-spacing="1.4">AFTER · REFLOWABLE EPUB</text>
<text x="92" y="66" fill="#eef3f7" font-size="26" font-weight="700">Textbook PDF → Kindle-ready book</text>
${pdf}
${mid}
${reader}
${statRow}
</g>
</svg>
`
writeFileSync(out, svg)
console.log('wrote', out, (svg.length / 1024).toFixed(1) + ' KB')
