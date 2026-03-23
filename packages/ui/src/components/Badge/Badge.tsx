export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type BadgeAppearance = 'soft' | 'filled' | 'outline'

export interface BadgeProps {
  variant?: BadgeVariant
  appearance?: BadgeAppearance
  /** @deprecated use appearance="outline" */
  outline?: boolean
  className?: string
  children: React.ReactNode
}

export function Badge({
  variant = 'default',
  appearance = 'soft',
  outline = false,
  className = '',
  children,
}: BadgeProps) {
  const resolved = outline ? 'outline' : appearance
  const appearanceClass = resolved === 'soft' ? '' : ` bac-badge--${resolved}`
  return (
    <span className={`bac-badge bac-badge--${variant}${appearanceClass}${className ? ` ${className}` : ''}`}>
      {children}
    </span>
  )
}
