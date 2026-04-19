'use client'

import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  readonly value: number
  readonly label?: string
  readonly showLabel?: boolean
}

function clampValue(value: number): number {
  return Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0))
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(({ value, label, showLabel = false, className = '', ...props }, ref) => {
  const clampedValue = clampValue(value)
  const accessibleLabel = label ?? 'Progress'

  return (
    <div ref={ref} className={cn('bac-progress', className)} {...props}>
      <progress className="bac-progress__native" value={clampedValue} max={100} aria-label={accessibleLabel}>
        {clampedValue}%
      </progress>
      {(showLabel || label) ? (
        <div className="bac-progress__meta">
          {label ? <span className="bac-progress__label">{label}</span> : <span />}
          {showLabel ? <span className="bac-progress__value">{clampedValue}%</span> : null}
        </div>
      ) : null}
      <div className="bac-progress__track">
        <div
          className="bac-progress__bar"
          aria-hidden="true"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
})

ProgressBar.displayName = 'ProgressBar'