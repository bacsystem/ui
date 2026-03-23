import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly label?: string
  readonly error?: string
  readonly hint?: string
  readonly success?: string
  readonly inputSize?: InputSize
  readonly iconLeft?: LucideIcon
  readonly iconRight?: LucideIcon
  readonly floating?: boolean
  readonly prefix?: string
  readonly suffix?: string
  readonly className?: string
}

const sizeMap: Record<InputSize, string> = {
  sm: 'bac-input--sm',
  md: '',
  lg: 'bac-input--lg',
}

interface InputClassConfig {
  readonly inputSize: InputSize
  readonly error?: string
  readonly success?: string
  readonly disabled?: boolean
  readonly floating: boolean
  readonly hasIconLeft: boolean
  readonly hasRightIcon: boolean
  readonly prefix?: string
  readonly suffix?: string
  readonly className: string
}

/**
 * Constructs the space-separated CSS class list for an input element from a configuration object.
 *
 * @param cfg - Configuration that controls which base and modifier classes are included. If `cfg.error` is set the state class will be `bac-input--error`; otherwise if `cfg.success` is set the state class will be `bac-input--success`. Other boolean flags enable corresponding `bac-input--*` modifier classes (disabled, floating, icon/prefix/suffix presence) and `cfg.className` is appended verbatim.
 * @returns The final space-separated CSS class string for the input element.
 */
function buildInputClasses(cfg: InputClassConfig): string {
  let stateClass = ''
  if (cfg.error) stateClass = 'bac-input--error'
  else if (cfg.success) stateClass = 'bac-input--success'

  return [
    'bac-input',
    sizeMap[cfg.inputSize],
    stateClass,
    cfg.disabled     ? 'bac-input--disabled'    : '',
    cfg.floating     ? 'bac-input--floating'    : '',
    cfg.hasIconLeft  ? 'bac-input--icon-left'   : '',
    cfg.hasRightIcon ? 'bac-input--icon-right'  : '',
    cfg.prefix       ? 'bac-input--with-prefix' : '',
    cfg.suffix       ? 'bac-input--with-suffix' : '',
    cfg.className,
  ].filter(Boolean).join(' ')
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
    }: Readonly<InputProps>,
    ref
  ) => {
    const uid = useId()
    const inputId = id ?? `bac-input-${uid.replaceAll(':', '')}`
    const errorId     = error             ? `${inputId}-error`   : undefined
    const hintId      = hint && !error    ? `${inputId}-hint`    : undefined
    const successId   = success && !error ? `${inputId}-success` : undefined
    const describedBy = [errorId, hintId, successId].filter(Boolean).join(' ') || undefined

    const hasRightIcon = !!(error || success || IconRight)
    const classes = buildInputClasses({
      inputSize,
      error,
      success,
      disabled,
      floating,
      hasIconLeft: !!IconLeft,
      hasRightIcon,
      prefix,
      suffix,
      className,
    })

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

        {error             && <p id={errorId}   className="bac-input__error-text"   role="alert">{error}</p>}
        {!error && success && <p id={successId} className="bac-input__success-text">{success}</p>}
        {!error && !success && hint && (
          <p id={hintId} className="bac-input__hint">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
