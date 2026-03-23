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
 * Renders a styled badge as a <span> containing the provided children.
 *
 * The `outline` flag, if true, is treated as `appearance = "outline"`. When
 * `appearance` is `"soft"`, no additional appearance class is added.
 *
 * @param variant - Visual variant of the badge (e.g., `primary`, `success`)
 * @param appearance - Visual appearance style (`soft`, `filled`, or `outline`)
 * @param outline - Deprecated: use `appearance = "outline"` instead
 * @param className - Optional additional CSS class names to append
 * @param children - Content to render inside the badge
 * @returns A `<span>` element with badge classes and the given `children`
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
