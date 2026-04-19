import { forwardRef } from 'react'
import type React from 'react'
import { cn } from '../../lib/cn'

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'tinted'
export type CardSize = 'sm' | 'md' | 'lg'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly variant?: CardVariant
  readonly size?: CardSize
  readonly children: React.ReactNode
}

export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: React.ReactNode
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  readonly children: React.ReactNode
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
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
export const Card = forwardRef<HTMLDivElement, CardProps>(({ variant = 'default', size = 'md', className = '', children, ...rest }, ref) => (
  <div
    ref={ref}
    className={cn('bac-card', `bac-card--${variant}`, `bac-card--${size}`, className)}
    {...rest}
  >
    {children}
  </div>
))

Card.displayName = 'Card'

export const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={cn('bac-card__header', className)} {...props}>{children}</div>
))

CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({ className = '', children, ...props }, ref) => (
  <h3 ref={ref} className={cn('bac-card__title', className)} {...props}>{children}</h3>
))

CardTitle.displayName = 'CardTitle'

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(({ className = '', children, ...props }, ref) => (
  <p ref={ref} className={cn('bac-card__description', className)} {...props}>{children}</p>
))

CardDescription.displayName = 'CardDescription'

export const CardContent = forwardRef<HTMLDivElement, CardSectionProps>(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={cn('bac-card__content', className)} {...props}>{children}</div>
))

CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={cn('bac-card__footer', className)} {...props}>{children}</div>
))

CardFooter.displayName = 'CardFooter'
