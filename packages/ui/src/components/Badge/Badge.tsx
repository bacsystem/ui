import type { ReactNode } from 'react'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type BadgeAppearance = 'soft' | 'filled' | 'outline'

export interface BadgeProps {
  readonly variant?: BadgeVariant
  readonly appearance?: BadgeAppearance
  /** @deprecated use appearance="outline" */
  readonly outline?: boolean
  readonly className?: string
  readonly children: ReactNode
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
  outline = false, // NOSONAR: intentionally handling the deprecated prop for backward compat
  className = '',
  children,
}: Readonly<BadgeProps>) {
  const resolved = appearanceProp ?? (outline ? 'outline' : 'soft')
  const appearanceClass = resolved === 'soft' ? '' : ` bac-badge--${resolved}`
  const extraClass = className ? ` ${className}` : ''
  return (
    <span className={`bac-badge bac-badge--${variant}${appearanceClass}${extraClass}`}>
      {children}
    </span>
  )
}
