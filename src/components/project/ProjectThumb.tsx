import { useId } from 'react'
import type { Glyph } from '@/data/types'
import { hash } from '@/lib/utils'

interface Props {
  slug: string
  glyph: Glyph
  hue: number
  className?: string
}

/**
 * Deterministic illustrative thumbnail. It is generated from the project's
 * category and type and is never presented as a product screenshot.
 */
export function ProjectThumb({ slug, glyph, hue, className }: Props) {
  const id = useId().replace(/:/g, '')
  const h = hash(slug)
  const stroke = `hsl(${hue} 85% 72%)`
  const strokeSoft = `hsl(${hue} 60% 60% / 0.45)`
  const fill = `hsl(${hue} 70% 60% / 0.14)`
  const bg1 = `hsl(${hue} 45% 11%)`
  const bg2 = `hsl(${(hue + 40) % 360} 40% 7%)`
  const accent = `hsl(${(hue + 150) % 360} 80% 70%)`

  return (
    <svg
      viewBox="0 0 400 250"
      role="img"
      aria-label="Illustrative project thumbnail"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={bg1} />
          <stop offset="1" stopColor={bg2} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.8" cy="0.15" r="0.7">
          <stop offset="0" stopColor={`hsl(${hue} 80% 60% / 0.35)`} />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
        <pattern id={`${id}-dots`} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.08)" />
        </pattern>
      </defs>
      <rect width="400" height="250" fill={`url(#${id}-bg)`} />
      <rect width="400" height="250" fill={`url(#${id}-glow)`} />
      <rect width="400" height="250" fill={`url(#${id}-dots)`} />
      <g stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {glyph === 'pipeline' && <Pipeline h={h} fill={fill} soft={strokeSoft} accent={accent} />}
        {glyph === 'bot' && <Bot fill={fill} soft={strokeSoft} accent={accent} />}
        {glyph === 'chart' && <Chart h={h} fill={fill} soft={strokeSoft} accent={accent} />}
        {glyph === 'app' && <AppWindow fill={fill} soft={strokeSoft} accent={accent} />}
        {glyph === 'doc' && <Doc fill={fill} soft={strokeSoft} accent={accent} />}
        {glyph === 'map' && <MapGlyph fill={fill} soft={strokeSoft} accent={accent} />}
        {glyph === 'api' && <Api fill={fill} soft={strokeSoft} accent={accent} />}
        {glyph === 'alert' && <Alert h={h} fill={fill} soft={strokeSoft} accent={accent} />}
      </g>
    </svg>
  )
}

type G = { fill: string; soft: string; accent: string; h?: number }

function Pipeline({ h = 0, fill, soft, accent }: G) {
  const xs = [48, 142, 236, 330]
  return (
    <>
      {/* source cylinder */}
      <ellipse cx={xs[0]} cy={100} rx={22} ry={8} fill={fill} />
      <path d={`M${xs[0] - 22} 100v44a22 8 0 0 0 44 0v-44`} fill={fill} />
      {xs.slice(1, 3).map((x, i) => (
        <rect key={x} x={x - 30} y={102} width={60} height={40} rx={8} fill={fill} opacity={0.9 + i * 0.05} />
      ))}
      <rect x={xs[3] - 30} y={102} width={60} height={40} rx={8} fill={fill} stroke={accent} />
      {xs.slice(0, -1).map((x, i) => (
        <path key={i} d={`M${x + 24} 122h${xs[i + 1] - x - 54}m-8 -6l8 6-8 6`} stroke={soft} />
      ))}
      {/* schedule tick marks */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={60 + i * 48} y={190} width={24} height={6 + ((h >> (i * 3)) & 7)} rx={2} fill={fill} stroke="none" />
      ))}
      <path d="M48 178h304" stroke={soft} strokeDasharray="3 6" />
      <circle cx={xs[3]} cy={70} r={4} fill={accent} stroke="none" />
    </>
  )
}

function Bot({ fill, soft, accent }: G) {
  return (
    <>
      <rect x={150} y={60} width={100} height={72} rx={18} fill={fill} />
      <circle cx={182} cy={94} r={7} fill={accent} stroke="none" />
      <circle cx={218} cy={94} r={7} fill={accent} stroke="none" />
      <path d="M200 60v-16" />
      <circle cx={200} cy={40} r={5} fill={fill} />
      <path d="M62 160h130a10 10 0 0 1 10 10v28a10 10 0 0 1-10 10H92l-20 16v-16H62a10 10 0 0 1-10-10v-28a10 10 0 0 1 10-10z" fill={fill} stroke={soft} />
      <path d="M72 180h90M72 194h60" stroke={soft} />
      <path d="M338 150H228a10 10 0 0 0-10 10v24a10 10 0 0 0 10 10h80l20 14v-14h10a10 10 0 0 0 10-10v-24a10 10 0 0 0-10-10z" fill={fill} />
      <path d="M232 170h86M232 184h50" stroke={soft} />
    </>
  )
}

function Chart({ h = 0, fill, soft, accent }: G) {
  const bars = [0, 1, 2, 3, 4, 5, 6].map((i) => 30 + ((h >> (i * 4)) & 15) * 5)
  return (
    <>
      <path d="M60 200h280M60 60v140" stroke={soft} />
      {bars.map((b, i) => (
        <rect key={i} x={78 + i * 38} y={200 - b} width={22} height={b} rx={4} fill={fill} />
      ))}
      <path
        d={bars.map((b, i) => `${i === 0 ? 'M' : 'L'}${89 + i * 38} ${190 - b - 20}`).join(' ')}
        stroke={accent}
        strokeWidth={2.5}
      />
      {bars.map((b, i) => (
        <circle key={i} cx={89 + i * 38} cy={190 - b - 20} r={3.5} fill={accent} stroke="none" />
      ))}
    </>
  )
}

function AppWindow({ fill, soft, accent }: G) {
  return (
    <>
      <rect x={48} y={44} width={304} height={176} rx={12} fill={fill} />
      <path d="M48 76h304" stroke={soft} />
      <circle cx={66} cy={60} r={4} fill={soft} stroke="none" />
      <circle cx={80} cy={60} r={4} fill={soft} stroke="none" />
      <circle cx={94} cy={60} r={4} fill={soft} stroke="none" />
      <rect x={62} y={92} width={70} height={112} rx={6} stroke={soft} />
      <rect x={148} y={92} width={88} height={48} rx={6} stroke={soft} />
      <rect x={250} y={92} width={88} height={48} rx={6} stroke={soft} />
      <rect x={148} y={154} width={190} height={50} rx={6} stroke={soft} />
      <path d="M160 190l24-18 22 10 30-22 26 8 32-20" stroke={accent} />
      <path d="M72 108h50M72 124h36M72 140h44" stroke={soft} />
    </>
  )
}

function Doc({ fill, soft, accent }: G) {
  return (
    <>
      <path d="M86 52h84l30 30v120a8 8 0 0 1-8 8H86a8 8 0 0 1-8-8V60a8 8 0 0 1 8-8z" fill={fill} />
      <path d="M170 52v30h30" stroke={soft} />
      <path d="M98 110h80M98 126h64M98 142h76M98 158h50" stroke={soft} />
      <path d="M218 130h44m-8-8l8 8-8 8" stroke={accent} />
      <rect x={272} y={60} width={60} height={150} rx={8} stroke={soft} fill={fill} />
      <path d="M284 84h36M284 100h24M284 116h36M284 132h30M284 148h36M284 164h20" stroke={soft} />
    </>
  )
}

function MapGlyph({ fill, soft, accent }: G) {
  return (
    <>
      <path
        d="M90 70c30-22 70-16 100-2s62-6 92 10 36 46 20 70-54 36-86 42-74 10-104-8-44-54-30-80 0-24 8-32z"
        fill={fill}
      />
      <path d="M120 100c40 6 70 30 110 26M140 170c30-10 60 0 100-16" stroke={soft} strokeDasharray="4 6" />
      {[
        [150, 110],
        [236, 92],
        [262, 156],
      ].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} ${y - 24}a12 12 0 0 1 12 12c0 10-12 24-12 24s-12-14-12-24a12 12 0 0 1 12-12z`} fill={accent} stroke="none" />
          <circle cx={x} cy={y - 12} r={4} fill="#0b0f17" stroke="none" />
        </g>
      ))}
    </>
  )
}

function Api({ fill, soft, accent }: G) {
  return (
    <>
      <rect x={52} y={48} width={296} height={160} rx={12} fill={fill} />
      <path d="M52 78h296" stroke={soft} />
      <path d="M72 108h16l-8 8 8 8" stroke={accent} />
      <path d="M104 116h80M104 136h120M104 156h60M104 176h100" stroke={soft} />
      <path d="M300 104c-10 0-10 10-10 10v10c0 6-6 8-6 8s6 2 6 8v10c0 10 10 10 10 10M320 104c10 0 10 10 10 10v10c0 6 6 8 6 8s-6 2-6 8v10c0 10-10 10-10 10" stroke={accent} />
    </>
  )
}

function Alert({ h = 0, fill, soft, accent }: G) {
  const pts = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => 150 - ((h >> (i * 2)) & 7) * 3)
  pts[5] = 86
  return (
    <>
      <path d={pts.map((y, i) => `${i === 0 ? 'M' : 'L'}${60 + i * 34} ${y}`).join(' ')} stroke={soft} />
      <circle cx={60 + 5 * 34} cy={86} r={5} fill={accent} stroke="none" />
      <circle cx={60 + 5 * 34} cy={86} r={14} stroke={accent} opacity={0.6} />
      <circle cx={60 + 5 * 34} cy={86} r={24} stroke={accent} opacity={0.3} />
      <path d="M60 196h280" stroke={soft} strokeDasharray="3 6" />
      <rect x={290} y={150} width={60} height={40} rx={8} fill={fill} />
      <path d="M300 164h40M300 176h28" stroke={soft} />
    </>
  )
}
