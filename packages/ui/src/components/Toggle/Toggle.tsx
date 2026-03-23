import { useState, useRef, useCallback, type ChangeEvent, type KeyboardEvent } from 'react'
import { Check } from 'lucide-react'

export type ToggleSize = 'sm' | 'md' | 'lg'

export interface ToggleProps {
  readonly checked?: boolean
  readonly defaultChecked?: boolean
  readonly onChange?: (checked: boolean) => void
  readonly disabled?: boolean
  readonly size?: ToggleSize
  readonly label?: string
  readonly ariaLabel?: string
  readonly 'aria-labelledby'?: string
  readonly className?: string
}

/**
 * Renders an accessible switch-style toggle that supports both controlled and uncontrolled usage.
 *
 * Supports keyboard activation via Space and Enter, exposes ARIA `role="switch"` and `aria-checked`,
 * and visually indicates checked state with an icon.
 *
 * @param checked - Controlled checked state; when provided the component does not manage internal state.
 * @param defaultChecked - Initial checked value for uncontrolled usage (ignored when `checked` is provided).
 * @param onChange - Called with the new checked value whenever the toggle changes via mouse, touch, or keyboard.
 * @param disabled - When `true`, disables interaction and removes keyboard focus.
 * @param size - Visual size of the toggle; one of `'sm' | 'md' | 'lg'`.
 * @param label - Optional label text displayed next to the toggle.
 * @param className - Additional CSS class names applied to the root element.
 *
 * @returns The rendered toggle element.
 */
export function Toggle({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  size = 'md',
  label,
  ariaLabel,
  'aria-labelledby': ariaLabelledby,
  className = '',
}: Readonly<ToggleProps>) {
  const isControlled = checked !== undefined
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentChecked = isControlled ? checked : internalChecked

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked)
      }
      onChange?.(e.target.checked)
    },
    [isControlled, onChange]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
        e.preventDefault()
        inputRef.current?.click()
      }
    },
    [disabled]
  )

  const handleClick = useCallback(() => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }, [disabled])

  const disabledClass = disabled ? ' bac-toggle--disabled' : ''
  const extraClass = className ? ` ${className}` : ''

  return (
    <div
      className={`bac-toggle bac-toggle--${size}${disabledClass}${extraClass}`}
      role="switch"
      aria-checked={currentChecked}
      aria-disabled={disabled}
      aria-label={label ? undefined : ariaLabel}
      aria-labelledby={label ? undefined : ariaLabelledby}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      tabIndex={disabled ? -1 : 0}
    >
      <input
        ref={inputRef}
        type="checkbox"
        checked={isControlled ? checked : undefined}
        defaultChecked={isControlled ? undefined : defaultChecked}
        onChange={handleChange}
        disabled={disabled}
        className="bac-toggle__input"
        aria-hidden="true"
        tabIndex={-1}
      />
      <span className="bac-toggle__track">
        <span className="bac-toggle__dot">
          {currentChecked && (
            <Check className="bac-toggle__check" size={10} aria-hidden="true" />
          )}
        </span>
      </span>
      {label && <span className="bac-toggle__label">{label}</span>}
    </div>
  )
}
