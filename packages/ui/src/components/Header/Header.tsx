'use client'

import { forwardRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface HeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  readonly title: string | ReactNode
  readonly subtitle?: string | ReactNode
  readonly actions?: ReactNode
}

export const Header = forwardRef<HTMLElement, HeaderProps>(({ title, subtitle, actions, className = '', ...props }, ref) => (
  <header ref={ref} className={cn('bac-header', className)} {...props}>
    <div className="bac-header__content">
      <div className="bac-header__title">{title}</div>
      {subtitle ? <div className="bac-header__subtitle">{subtitle}</div> : null}
    </div>
    {actions ? <div className="bac-header__actions">{actions}</div> : null}
  </header>
))

Header.displayName = 'Header'