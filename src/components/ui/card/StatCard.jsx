import React from 'react'
import Card from '../Card'
import Metric from '@/components/typography/Metric'
import Paragraph from '@/components/typography/Paragraph'

export function StatCard({
  metric,
  label,
  description,
  trend, // positive | negative | none
  trendText,
  ...props
}) {
  return (
    <Card padding="8" border={true} className="space-y-4" {...props}>
      <div className="flex items-start justify-between">
        <Metric label={label}>{metric}</Metric>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            trend === 'positive' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
          }`}>
            {trend === 'positive' ? '↑' : '↓'} {trendText}
          </span>
        )}
      </div>
      {description && <Paragraph className="text-sm">{description}</Paragraph>}
    </Card>
  )
}

export default StatCard
