import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type BadgeModernVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type BadgeLegacyVariant = 'secondary' | 'outline' | 'destructive' | 'gradient' | 'premium'
export type BadgeVariant = BadgeModernVariant | BadgeLegacyVariant
export type BadgeAppearance = 'soft' | 'filled' | 'outline'

export interface BadgeProps {
  readonly variant?: BadgeVariant
  readonly appearance?: BadgeAppearance
  /** @deprecated use appearance="outline" */
  readonly outline?: boolean
  readonly className?: string
  readonly children: ReactNode
}

interface ResolvedBadgeStyle {
  readonly variant: BadgeModernVariant
  readonly appearance: BadgeAppearance
  readonly extraClassName?: string
}

function resolveBadgeStyle(variant: BadgeVariant, appearance?: BadgeAppearance, outline = false): ResolvedBadgeStyle {
  if (variant === 'secondary') {
    return { variant: 'default', appearance: appearance ?? (outline ? 'outline' : 'soft') }
  }

  if (variant === 'outline') {
    return { variant: 'default', appearance: appearance ?? 'outline' }
  }

  if (variant === 'destructive') {
    return { variant: 'danger', appearance: appearance ?? (outline ? 'outline' : 'soft') }
  }

  if (variant === 'gradient') {
    return { variant: 'primary', appearance: appearance ?? 'filled', extraClassName: 'bac-badge--gradient' }
  }

  if (variant === 'premium') {
    return { variant: 'warning', appearance: appearance ?? 'filled', extraClassName: 'bac-badge--premium' }
  }

  return {
    variant,
    appearance: appearance ?? (outline ? 'outline' : 'soft'),
  }
}

/**
 * Render a styled badge as a <span> containing the provided children.
 *
 * The `appearance` prop determines the visual style. If `appearance` is not
 * provided, the deprecated `outline` flag will cause an outline appearance;
 * otherwise a soft appearance is used.
 *
 * @param variant - Visual variant of the badge (e.g., `primary`, `success`)
 * @param appearance - Visual appearance style: `soft`, `filled`, or `outline`
 * @param outline - Deprecated. When true and `appearance` is unset, use `outline`
 * @param className - Optional additional CSS class names to append
 * @param children - Content to render inside the badge
 * @returns The badge rendered as a `<span>` element
 */
export function Badge({
  variant = 'default',
  appearance: appearanceProp,
  outline: outlineProp = false,
  className = '',
  children,
}: Readonly<BadgeProps>) {
  const resolvedStyle = resolveBadgeStyle(variant, appearanceProp, outlineProp)
  const appearanceClass = resolvedStyle.appearance === 'soft' ? '' : `bac-badge--${resolvedStyle.appearance}`
  const badgeClassName = cn('bac-badge', `bac-badge--${resolvedStyle.variant}`, appearanceClass, resolvedStyle.extraClassName, className)

  return (
    <span className={badgeClassName}>
      {children}
    </span>
  )
}
