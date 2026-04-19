'use client'

import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type SpinnerSize = 'sm' | 'md' | 'lg'

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  readonly size?: SpinnerSize
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(({ size = 'md', className = '', ...props }, ref) => (
  <span
    ref={ref}
    className={cn('bac-spinner', `bac-spinner--${size}`, className)}
    aria-hidden="true"
    {...props}
  />
))

Spinner.displayName = 'Spinner'