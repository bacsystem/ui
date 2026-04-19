'use client'

import { Children, cloneElement, forwardRef, isValidElement } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { AlertCircle, Check } from 'lucide-react'
import { cn } from '../../lib/cn'

export type StepStatus = 'pending' | 'current' | 'completed' | 'error'
export type StepperOrientation = 'horizontal' | 'vertical'

export interface StepperProps extends HTMLAttributes<HTMLOListElement> {
  readonly orientation?: StepperOrientation
  readonly children: ReactNode
}

export interface StepperStepProps extends HTMLAttributes<HTMLLIElement> {
  readonly status?: StepStatus
  readonly label: string
  readonly description?: string
  readonly children?: ReactNode
  readonly isLast?: boolean
  readonly stepNumber?: number
  readonly orientation?: StepperOrientation
}

function getIndicatorContent(status: StepStatus, stepNumber: number): ReactNode {
  if (status === 'completed') {
    return <Check size={14} aria-hidden="true" />
  }

  if (status === 'error') {
    return <AlertCircle size={14} aria-hidden="true" />
  }

  return <span>{stepNumber}</span>
}

export const Stepper = forwardRef<HTMLOListElement, StepperProps>(({ orientation = 'horizontal', className = '', children, ...props }, ref) => {
  const steps = Children.toArray(children)

  return (
    <ol ref={ref} className={cn('bac-stepper', `bac-stepper--${orientation}`, className)} {...props}>
      {steps.map((child, index) => {
        if (!isValidElement<StepperStepProps>(child)) {
          return child
        }

        return cloneElement(child, {
          isLast: index === steps.length - 1,
          orientation,
          stepNumber: index + 1,
        })
      })}
    </ol>
  )
})

Stepper.displayName = 'Stepper'

export const StepperStep = forwardRef<HTMLLIElement, StepperStepProps>(({ status = 'pending', label, description, className = '', children, isLast = false, stepNumber = 1, orientation = 'horizontal', ...props }, ref) => {
  const connector = isLast
    ? null
    : <span className={cn('bac-stepper__connector', `bac-stepper__connector--${orientation}`)} aria-hidden="true" />

  return (
    <li
      ref={ref}
      className={cn('bac-stepper__step', `bac-stepper__step--${status}`, !isLast && 'bac-stepper__step--with-connector', className)}
      aria-current={status === 'current' ? 'step' : undefined}
      {...props}
    >
      <div className="bac-stepper__indicator-wrap">
        <span className="bac-stepper__indicator">{getIndicatorContent(status, stepNumber)}</span>
        {connector}
      </div>
      <div className="bac-stepper__content">
        <span className="bac-stepper__label">{label}</span>
        {description ? <span className="bac-stepper__description">{description}</span> : null}
        {children}
      </div>
    </li>
  )
})

StepperStep.displayName = 'StepperStep'