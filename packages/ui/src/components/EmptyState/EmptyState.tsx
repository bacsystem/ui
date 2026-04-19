'use client'

import { createElement, isValidElement } from 'react'
import type { ElementType, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface EmptyStateProps {
  readonly title: string
  readonly description?: string
  readonly icon?: LucideIcon | ReactNode
  readonly actions?: ReactNode
  readonly className?: string
}

function renderEmptyStateIcon(icon: EmptyStateProps['icon']): ReactNode {
  if (!icon) {
    return null
  }

  if (isValidElement(icon)) {
    return <div className="bac-empty-state__icon" aria-hidden="true">{icon}</div>
  }

  return createElement(icon as ElementType, {
    className: 'bac-empty-state__icon',
    size: 32,
    'aria-hidden': 'true',
  })
}

export function EmptyState({ title, description, icon, actions, className = '' }: Readonly<EmptyStateProps>) {
  return (
    <div className={cn('bac-empty-state', className)}>
      {renderEmptyStateIcon(icon)}
      <h3 className="bac-empty-state__title">{title}</h3>
      {description ? <p className="bac-empty-state__description">{description}</p> : null}
      {actions ? <div className="bac-empty-state__actions">{actions}</div> : null}
    </div>
  )
}