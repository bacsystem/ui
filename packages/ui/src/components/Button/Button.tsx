import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger' | 'success'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ButtonAppearance = 'filled' | 'outline' | 'soft' | 'link'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  appearance?: ButtonAppearance
  outline?: boolean
  loading?: boolean
  iconLeft?: LucideIcon
  iconRight?: LucideIcon
  className?: string
}

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'bac-btn--xs',
  sm: 'bac-btn--sm',
  md: 'bac-btn--md',
  lg: 'bac-btn--lg',
  xl: 'bac-btn--xl',
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bac-btn--primary',
  secondary: 'bac-btn--secondary',
  accent: 'bac-btn--accent',
  ghost: 'bac-btn--ghost',
  danger: 'bac-btn--danger',
  success: 'bac-btn--success',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      appearance: appearanceProp,
      outline = false,
      loading = false,
      iconLeft: IconLeft,
      iconRight: IconRight,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading
    const resolvedAppearance = appearanceProp !== undefined ? appearanceProp : (outline ? 'outline' : 'filled')
    const appearanceClass = resolvedAppearance === 'filled' ? '' : `bac-btn--${resolvedAppearance}`
    const classes = ['bac-btn', variantStyles[variant], sizeStyles[size], appearanceClass, loading && 'bac-btn--loading', className].filter(Boolean).join(' ')

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={classes}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="bac-btn__icon bac-btn__icon--spin" aria-hidden="true" />
            <span className="bac-sr-only">Loading…</span>
          </>
        ) : (
          IconLeft && <IconLeft className="bac-btn__icon bac-btn__icon--left" aria-hidden="true" />
        )}
        {children}
        {!loading && IconRight && (
          <IconRight className="bac-btn__icon bac-btn__icon--right" aria-hidden="true" />
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
