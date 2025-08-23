import React, { useRef, useEffect, useState } from 'react'
import type { SalesTrend } from '../hooks/useDashboardData'

interface Props {
  trends: SalesTrend[]
}

function useAnimatedPath(points: string, duration = 900) {
  const [length, setLength] = useState(0)
  const ref = useRef<SVGPolylineElement | null>(null)
  useEffect(() => {
    if (!ref.current) return
    const totalLength = ref.current.getTotalLength()
    setLength(0)
    let start: number | null = null
    function animate(ts: number) {
      if (!start) start = ts
      const elapsed = ts - start
      const progress = Math.min(elapsed / duration, 1)
      setLength(totalLength * progress)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
    // eslint-disable-next-line
  }, [points])
  return { ref, length }
}

export function SalesTrendsChart({ trends }: Props) {
  // SVG chart dimensions
  const width = 400
  const height = 120
  const padding = 32
  const maxSales = Math.max(...trends.map(t => t.sales))
  const minSales = Math.min(...trends.map(t => t.sales))
  const yRange = maxSales - minSales || 1

  // Map data to SVG points
  const pointsArr = trends.map((t, i) => {
    const x = padding + (i * (width - 2 * padding)) / (trends.length - 1)
    const y = height - padding - ((t.sales - minSales) * (height - 2 * padding)) / yRange
    return `${x},${y}`
  })
  const points = pointsArr.join(' ')
  const { ref, length } = useAnimatedPath(points)

  return (
    <div className="bg-white/30 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 mb-8 relative overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-white/10 to-transparent opacity-60 pointer-events-none" />
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white z-10 relative">Sales Trends (Last 7 Days)</h3>
      <svg width={width} height={height} className="w-full h-32 z-10 relative">
        <defs>
          <linearGradient id="trendLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a5b4fc" />
          </linearGradient>
        </defs>
        {/* Animated line */}
        <polyline
          ref={ref}
          fill="none"
          stroke="url(#trendLine)"
          strokeWidth="4"
          points={points}
          strokeDasharray={length + ',10000'}
          style={{ transition: 'stroke-dasharray 0.5s' }}
        />
        {/* Axes */}
        <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="#e0e7ef" strokeWidth="2" />
        <line x1={padding} y1={padding} x2={padding} y2={height-padding} stroke="#e0e7ef" strokeWidth="2" />
        {/* Labels */}
        {trends.map((t, i) => {
          const x = padding + (i * (width - 2 * padding)) / (trends.length - 1)
          return (
            <text key={t.date} x={x} y={height - padding + 18} textAnchor="middle" fontSize="11" fill="#6b7280">
              {t.date.slice(5)}
            </text>
          )
        })}
        <text x={padding-10} y={padding+4} fontSize="11" fill="#6b7280" textAnchor="end">
          {maxSales}
        </text>
        <text x={padding-10} y={height-padding+4} fontSize="11" fill="#6b7280" textAnchor="end">
          {minSales}
        </text>
      </svg>
    </div>
  )
} 