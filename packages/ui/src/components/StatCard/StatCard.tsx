import { TrendingUp, TrendingDown } from 'lucide-react'

export type StatCardColor = 'blue' | 'teal' | 'amber' | 'green' | 'purple'
export type StatCardTrend = 'up' | 'down' | 'neutral'
export type StatCardAppearance = 'soft' | 'filled' | 'outline'

export interface StatCardProps {
  readonly title: string
  readonly value: string | number
  readonly description?: string
  readonly color?: StatCardColor
  readonly trend?: StatCardTrend
  readonly trendValue?: string
  readonly appearance?: StatCardAppearance
  readonly className?: string
}

/**
 * Render a compact statistic card showing a title, a value, and an optional footer with a trend indicator and description.
 *
 * The footer is rendered only when `trendValue` or `description` is provided. When `trendValue` is present, a trend
 * label is shown and an icon is included for `trend === 'up'` or `trend === 'down'`; the trend element is styled
 * according to the `trend` value.
 *
 * @param title - Visible title for the card
 * @param value - Primary value displayed prominently
 * @param description - Optional supplemental text shown in the card footer
 * @param color - Visual color theme for the card; one of `'blue' | 'teal' | 'amber' | 'green' | 'purple'`. Defaults to `'blue'`.
 * @param trend - Trend direction used to style the trend indicator; one of `'up' | 'down' | 'neutral'`. Defaults to `'neutral'`.
 * @param trendValue - Optional text label for the trend (shown alongside the trend icon when provided)
 * @param appearance - Visual appearance variant that toggles modifier classes; one of `'soft' | 'filled' | 'outline'`. Defaults to `'soft'`.
 * @param className - Additional CSS class names appended to the root element
 * @returns The JSX element representing the stat card
 */
export function StatCard({
  title,
  value,
  description,
  color = 'blue',
  trend = 'neutral',
  trendValue,
  appearance = 'soft',
  className = '',
}: Readonly<StatCardProps>) {
  const appearanceClass = appearance === 'soft' ? '' : ` bac-statcard--${appearance}`
  const extraClass = className ? ` ${className}` : ''
  return (
    <div className={`bac-statcard bac-statcard--${color}${appearanceClass}${extraClass}`}>
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
