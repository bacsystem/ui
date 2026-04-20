'use client'

import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type ProgressBarVariant = 'default' | 'success' | 'warning' | 'danger'
export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg'

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  readonly value: number
  readonly label?: string
  readonly showLabel?: boolean
  readonly variant?: ProgressBarVariant
  readonly size?: ProgressBarSize
  readonly max?: number
}

function clampValue(value: number, max: number): number {
  const safeValue = Number.isFinite(value) ? value : 0
  return Math.min(max, Math.max(0, safeValue))
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(({ value, label, showLabel = false, variant = 'default', size = 'md', max = 100, className = '', ...props }, ref) => {
  const safeMax = Math.max(1, Number.isFinite(max) ? max : 100)
  const clampedValue = clampValue(value, safeMax)
  const percentage = Math.round((clampedValue / safeMax) * 100)
  const accessibleLabel = label ?? 'Progress'

  return (
    <div
      ref={ref}
      className={cn(
        'bac-progress',
        variant !== 'default' && `bac-progress--${variant}`,
        size !== 'md' && `bac-progress--${size}`,
        className,
      )}
      {...props}
    >
      <progress
        className="bac-progress__native"
        value={clampedValue}
        max={safeMax}
        aria-label={accessibleLabel}
      >
        {percentage}%
      </progress>
      {(showLabel || label) ? (
        <div className="bac-progress__meta">
          {label ? <span className="bac-progress__label">{label}</span> : <span />}
          {showLabel ? <span className="bac-progress__value">{percentage}%</span> : null}
        </div>
      ) : null}
      <div className="bac-progress__track">
        <div
          className="bac-progress__bar"
          aria-hidden="true"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
})

ProgressBar.displayName = 'ProgressBar'