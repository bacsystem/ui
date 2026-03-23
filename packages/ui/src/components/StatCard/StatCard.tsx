import { TrendingUp, TrendingDown } from 'lucide-react'

export type StatCardColor = 'blue' | 'teal' | 'amber' | 'green' | 'purple'
export type StatCardTrend = 'up' | 'down' | 'neutral'
export type StatCardAppearance = 'soft' | 'filled' | 'outline'

export interface StatCardProps {
  title: string
  value: string | number
  description?: string
  color?: StatCardColor
  trend?: StatCardTrend
  trendValue?: string
  appearance?: StatCardAppearance
  className?: string
}

export function StatCard({
  title,
  value,
  description,
  color = 'blue',
  trend = 'neutral',
  trendValue,
  appearance = 'soft',
  className = '',
}: StatCardProps) {
  const appearanceClass = appearance === 'soft' ? '' : ` bac-statcard--${appearance}`
  return (
    <div className={`bac-statcard bac-statcard--${color}${appearanceClass}${className ? ` ${className}` : ''}`}>
      <p className="bac-statcard__title">{title}</p>
      <p className="bac-statcard__value">{value}</p>
      {(trendValue || description) && (
        <div className="bac-statcard__footer">
          {trendValue && (
            <span className={`bac-statcard__trend bac-statcard__trend--${trend}`}>
              {trend === 'up' && (
                <TrendingUp size={14} className="bac-statcard__trend-icon" aria-hidden="true" />
              )}
              {trend === 'down' && (
                <TrendingDown size={14} className="bac-statcard__trend-icon" aria-hidden="true" />
              )}
              {trendValue}
            </span>
          )}
          {description && (
            <span className="bac-statcard__description">{description}</span>
          )}
        </div>
      )}
    </div>
  )
}
