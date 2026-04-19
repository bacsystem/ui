'use client'

import { forwardRef } from 'react'
import type { LabelHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  readonly required?: boolean
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(({ required = false, className = '', children, ...props }, ref) => (
  <label
    ref={ref}
    className={cn('bac-label', required && 'bac-label--required', className)}
    {...props}
  >
    {children}
    {required ? <span className="bac-label__required" aria-hidden="true">*</span> : null}
  </label>
))

Label.displayName = 'Label'