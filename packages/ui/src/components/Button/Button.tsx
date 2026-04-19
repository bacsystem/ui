import { createElement, forwardRef, isValidElement, type ButtonHTMLAttributes, type ElementType, type MouseEvent, type ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Spinner } from '../Spinner'

export type ButtonModernVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger' | 'success'
export type ButtonLegacyVariant = 'default' | 'destructive' | 'outline'
export type ButtonVariant = ButtonModernVariant | ButtonLegacyVariant
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ButtonAppearance = 'filled' | 'outline' | 'soft' | 'link'
export type ButtonIcon = LucideIcon | ReactNode

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant
  readonly size?: ButtonSize
  readonly appearance?: ButtonAppearance
  readonly outline?: boolean
  readonly loading?: boolean
  readonly iconLeft?: ButtonIcon
  readonly iconRight?: ButtonIcon
  readonly asChild?: boolean
  readonly className?: string
}

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'bac-btn--xs',
  sm: 'bac-btn--sm',
  md: 'bac-btn--md',
  lg: 'bac-btn--lg',
  xl: 'bac-btn--xl',
}

const variantStyles: Record<ButtonModernVariant, string> = {
  primary: 'bac-btn--primary',
  secondary: 'bac-btn--secondary',
  accent: 'bac-btn--accent',
  ghost: 'bac-btn--ghost',
  danger: 'bac-btn--danger',
  success: 'bac-btn--success',
}

interface ResolvedButtonStyle {
  readonly variant: ButtonModernVariant
  readonly appearance: ButtonAppearance
}

function resolveButtonStyle(variant: ButtonVariant, appearance?: ButtonAppearance, outline = false): ResolvedButtonStyle {
  if (variant === 'default') {
    return { variant: 'primary', appearance: appearance ?? (outline ? 'outline' : 'filled') }
  }

  if (variant === 'destructive') {
    return { variant: 'danger', appearance: appearance ?? (outline ? 'outline' : 'filled') }
  }

  if (variant === 'outline') {
    return { variant: 'secondary', appearance: appearance ?? 'outline' }
  }

  return {
    variant,
    appearance: appearance ?? (outline ? 'outline' : 'filled'),
  }
}

function renderButtonIcon(icon: ButtonIcon | undefined, className: string): ReactNode {
  if (!icon) {
    return null
  }

  if (isValidElement(icon)) {
    return <span className={className} aria-hidden="true">{icon}</span>
  }

  return createElement(icon as ElementType, { className, 'aria-hidden': 'true' })
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
      asChild = false,
      type = 'button',
      disabled,
      className = '',
      children,
      onClick,
      ...props
    }: Readonly<ButtonProps>,
    ref
  ) => {
    const isDisabled = disabled || loading
    const resolvedStyle = resolveButtonStyle(variant, appearanceProp, outline)
    const resolvedAppearance = resolvedStyle.appearance
    const appearanceClass = resolvedAppearance === 'filled' ? '' : `bac-btn--${resolvedAppearance}`
    const classes = cn('bac-btn', variantStyles[resolvedStyle.variant], sizeStyles[size], appearanceClass, loading && 'bac-btn--loading', className)
    let spinnerSize: 'sm' | 'md' | 'lg' = 'md'

    if (size === 'xs' || size === 'sm') {
      spinnerSize = 'sm'
    } else if (size === 'lg' || size === 'xl') {
      spinnerSize = 'lg'
    }

    const content = (
      <>
        {loading
          ? <Spinner size={spinnerSize} className="bac-btn__spinner" />
          : renderButtonIcon(IconLeft, 'bac-btn__icon bac-btn__icon--left')}
        <span className="bac-btn__label">{children}</span>
        {!loading && renderButtonIcon(IconRight, 'bac-btn__icon bac-btn__icon--right')}
        {loading && <span className="bac-sr-only">Loading…</span>}
      </>
    )

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      onClick?.(event)
    }

    if (asChild) {
      return (
        <Slot
          ref={ref}
          aria-busy={loading || undefined}
          aria-disabled={isDisabled || undefined}
          data-disabled={isDisabled ? 'true' : undefined}
          className={classes}
          onClick={handleClick}
          {...props}
        >
          {content}
        </Slot>
      )
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={classes}
        onClick={handleClick}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'
