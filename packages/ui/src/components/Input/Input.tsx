import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  success?: string
  inputSize?: InputSize
  iconLeft?: LucideIcon
  iconRight?: LucideIcon
  floating?: boolean
  prefix?: string
  suffix?: string
  className?: string
}

const sizeMap: Record<InputSize, string> = {
  sm: 'bac-input--sm',
  md: '',
  lg: 'bac-input--lg',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      success,
      inputSize = 'md',
      iconLeft: IconLeft,
      iconRight: IconRight,
      floating = false,
      prefix,
      suffix,
      disabled,
      className = '',
      id,
      placeholder,
      ...props
    },
    ref
  ) => {
    const uid = useId()
    const inputId = id ?? `bac-input-${uid.replace(/:/g, '')}`
    const errorId     = error                    ? `${inputId}-error`   : undefined
    const hintId      = hint && !error           ? `${inputId}-hint`    : undefined
    const successId   = success && !error        ? `${inputId}-success` : undefined
    const describedBy = [errorId, hintId, successId].filter(Boolean).join(' ') || undefined

    const hasRightIcon = !!(error || success || IconRight)

    const classes = [
      'bac-input',
      sizeMap[inputSize],
      error   ? 'bac-input--error'   : success ? 'bac-input--success' : '',
      disabled                       ? 'bac-input--disabled'   : '',
      floating                       ? 'bac-input--floating'   : '',
      IconLeft                       ? 'bac-input--icon-left'  : '',
      hasRightIcon                   ? 'bac-input--icon-right' : '',
      prefix                         ? 'bac-input--with-prefix': '',
      suffix                         ? 'bac-input--with-suffix': '',
      className,
    ].filter(Boolean).join(' ')

    return (
      <div className="bac-input__wrapper">
        {label && !floating && (
          <label htmlFor={inputId} className="bac-input__label">
            {label}
          </label>
        )}

        <div className="bac-input__addon-wrapper">
          {prefix && (
            <span className="bac-input__addon bac-input__addon--prefix">{prefix}</span>
          )}

          <div className="bac-input__field-wrapper" style={{ flex: 1 }}>
            {IconLeft && (
              <IconLeft
                className="bac-input__icon bac-input__icon--left"
                size={16}
                aria-hidden="true"
              />
            )}

            <input
              ref={ref}
              id={inputId}
              disabled={disabled}
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={describedBy}
              className={classes}
              placeholder={floating && label ? ' ' : placeholder}
              {...props}
            />

            {floating && label && (
              <label
                htmlFor={inputId}
                className="bac-input__label bac-input__label--floating"
              >
                {label}
              </label>
            )}

            {error && (
              <AlertCircle
                className="bac-input__error-icon"
                aria-hidden="true"
                size={16}
              />
            )}
            {!error && success && (
              <CheckCircle2
                className="bac-input__success-icon"
                aria-hidden="true"
                size={16}
              />
            )}
            {!error && !success && IconRight && (
              <IconRight
                className="bac-input__icon bac-input__icon--right"
                size={16}
                aria-hidden="true"
              />
            )}
          </div>

          {suffix && (
            <span className="bac-input__addon bac-input__addon--suffix">{suffix}</span>
          )}
        </div>

        {error              && <p id={errorId} className="bac-input__error-text"   role="alert">{error}</p>}
        {!error && success  && <p id={successId} className="bac-input__success-text">{success}</p>}
        {!error && !success && hint && (
          <p id={hintId} className="bac-input__hint">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
