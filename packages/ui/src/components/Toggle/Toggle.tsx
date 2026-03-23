import { useCallback, useRef } from 'react'
import { Check } from 'lucide-react'

export type ToggleSize = 'sm' | 'md' | 'lg'

export interface ToggleProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  size?: ToggleSize
  label?: string
  className?: string
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
  className = '',
}: ToggleProps) {
  const isControlled = checked !== undefined
  const internalRef = useRef(defaultChecked)

  const currentChecked = isControlled ? checked : internalRef.current

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        internalRef.current = e.target.checked
      }
      onChange?.(e.target.checked)
    },
    [isControlled, onChange]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLLabelElement>) => {
      if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
        e.preventDefault()
        const next = !currentChecked
        if (!isControlled) {
          internalRef.current = next
        }
        onChange?.(next)
      }
    },
    [currentChecked, disabled, isControlled, onChange]
  )

  return (
    <label
      className={`bac-toggle bac-toggle--${size}${disabled ? ' bac-toggle--disabled' : ''}${className ? ` ${className}` : ''}`}
      role="switch"
      aria-checked={currentChecked}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
    >
      <input
        type="checkbox"
        checked={isControlled ? checked : undefined}
        defaultChecked={!isControlled ? defaultChecked : undefined}
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
    </label>
  )
}
