import type React from 'react'

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'tinted'
export type CardSize = 'sm' | 'md' | 'lg'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly variant?: CardVariant
  readonly size?: CardSize
  readonly children: React.ReactNode
}

/**
 * Renders a container div styled as a card with configurable visual variant and size.
 *
 * @param variant - Visual style of the card: `'default' | 'elevated' | 'outlined' | 'tinted'`
 * @param size - Size of the card: `'sm' | 'md' | 'lg'`
 * @param className - Additional CSS classes appended to the card's class list
 * @param children - Content rendered inside the card
 * @param rest - Other HTML attributes spread onto the root `<div>`
 * @returns The rendered `<div>` element with composed `bac-card` class names and provided children
 */
export function Card({ variant = 'default', size = 'md', className = '', children, ...rest }: CardProps) {
  return (
    <div
      className={`bac-card bac-card--${variant} bac-card--${size}${className ? ` ${className}` : ''}`}
      {...rest}
    >
      {children}
    </div>
  )
}
