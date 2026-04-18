'use client'

import { cloneElement, useId, useState, type FocusEvent, type KeyboardEvent, type ReactElement, type ReactNode } from 'react'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  readonly content: ReactNode
  readonly children: ReactElement
  readonly placement?: TooltipPlacement
  readonly disabled?: boolean
  readonly className?: string
}

function joinDescribedBy(existingValue: unknown, tooltipId: string): string {
  const values = [typeof existingValue === 'string' ? existingValue : '', tooltipId]
    .flatMap((value) => value.split(' '))
    .map((value) => value.trim())
    .filter(Boolean)

  return Array.from(new Set(values)).join(' ')
}

type TooltipTriggerProps = {
  readonly 'aria-describedby'?: string
  readonly onFocus?: (event: FocusEvent<HTMLElement>) => void
  readonly onBlur?: (event: FocusEvent<HTMLElement>) => void
  readonly onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void
}

export function Tooltip({
  content,
  children,
  placement = 'top',
  disabled = false,
  className = '',
}: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const uid = useId()
  const tooltipId = `bac-tooltip-${uid.replaceAll(':', '')}`
  const triggerElement = children as ReactElement<TooltipTriggerProps>
  const wrapperClassName = ['bac-tooltip__wrapper', `bac-tooltip--${placement}`, className].filter(Boolean).join(' ')

  const showTooltip = () => setVisible(true)
  const hideTooltip = () => setVisible(false)

  const triggerProps: TooltipTriggerProps = {
    'aria-describedby': joinDescribedBy(triggerElement.props['aria-describedby'], tooltipId),
    onFocus: (event: FocusEvent<HTMLElement>) => {
      triggerElement.props.onFocus?.(event)
      showTooltip()
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      triggerElement.props.onBlur?.(event)
      hideTooltip()
    },
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      triggerElement.props.onKeyDown?.(event)
      if (event.key === 'Escape') {
        hideTooltip()
      }
    },
  }

  if (disabled) return children

  return (
    <span className={wrapperClassName}>
      <span className="bac-tooltip__target">
        {cloneElement(triggerElement, triggerProps)}
      </span>
      <span
        id={tooltipId}
        role="tooltip"
        className={`bac-tooltip__content${visible ? ' bac-tooltip__content--visible' : ''}`}
      >
        {content}
      </span>
    </span>
  )
}

Tooltip.displayName = 'Tooltip'
