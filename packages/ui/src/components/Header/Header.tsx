'use client'

import { forwardRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface HeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  readonly title?: string | ReactNode
  readonly subtitle?: string | ReactNode
  readonly actions?: ReactNode
  readonly left?: ReactNode
  readonly center?: ReactNode
  readonly right?: ReactNode
}

export const Header = forwardRef<HTMLElement, HeaderProps>(({ title, subtitle, actions, left, center, right, className = '', ...props }, ref) => {
  const hasSlots = !!(left || center || right)

  if (hasSlots) {
    return (
      <header ref={ref} className={cn('bac-header bac-header--slots', className)} {...props}>
        <div className="bac-header__slot--left">{left}</div>
        <div className="bac-header__slot--center">{center}</div>
        <div className="bac-header__slot--right">{right}</div>
      </header>
    )
  }

  return (
    <header ref={ref} className={cn('bac-header', className)} {...props}>
      <div className="bac-header__content">
        {title ? <div className="bac-header__title">{title}</div> : null}
        {subtitle ? <div className="bac-header__subtitle">{subtitle}</div> : null}
      </div>
      {actions ? <div className="bac-header__actions">{actions}</div> : null}
    </header>
  )
})

Header.displayName = 'Header'