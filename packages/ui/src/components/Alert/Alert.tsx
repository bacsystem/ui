import { Info, CheckCircle2, AlertTriangle, XCircle, X, type LucideIcon } from 'lucide-react'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'
export type AlertAppearance = 'soft' | 'filled' | 'outline'

export interface AlertProps {
  variant?: AlertVariant
  appearance?: AlertAppearance
  title?: string
  onClose?: () => void
  className?: string
  children: React.ReactNode
}

const icons: Record<AlertVariant, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
}

/**
 * Renders a styled alert with an icon, optional title, body content, and an optional close button.
 *
 * The component applies variant and appearance modifier classes to the root element and includes
 * an icon that corresponds to the chosen `variant`.
 *
 * @param variant - Visual intent of the alert; one of `'info' | 'success' | 'warning' | 'error'`. Defaults to `'info'`.
 * @param appearance - Visual style modifier; one of `'soft' | 'filled' | 'outline'`. Defaults to `'soft'`.
 * @param title - Optional heading text displayed above the body content.
 * @param onClose - Optional callback invoked when the close button is clicked. When provided, a close button is rendered.
 * @param className - Optional additional class name(s) appended to the root element.
 * @param children - Content to display inside the alert body.
 * @returns A JSX element representing the alert.
 */
export function Alert({
  variant = 'info',
  appearance = 'soft',
  title,
  onClose,
  className = '',
  children,
}: AlertProps) {
  const Icon = icons[variant]
  const appearanceClass = appearance === 'soft' ? '' : ` bac-alert--${appearance}`

  return (
    <div
      role="alert"
      className={`bac-alert bac-alert--${variant}${appearanceClass}${className ? ` ${className}` : ''}`}
    >
      <Icon className="bac-alert__icon" size={18} aria-hidden="true" />
      <div className="bac-alert__content">
        {title && <p className="bac-alert__title">{title}</p>}
        <div className="bac-alert__body">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          className="bac-alert__close"
          onClick={onClose}
          aria-label="Cerrar alerta"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
