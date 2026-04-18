'use client'

import { useId } from 'react'
import { ChevronDown, AlertCircle, CheckCircle2 } from 'lucide-react'

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly disabled?: boolean
}

export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectProps {
  readonly options: SelectOption[]
  readonly label?: string
  readonly placeholder?: string
  readonly hint?: string
  readonly error?: string
  readonly success?: string
  readonly disabled?: boolean
  readonly inputSize?: SelectSize
  readonly value?: string
  readonly defaultValue?: string
  readonly onChange?: (value: string) => void
  readonly className?: string
  readonly id?: string
}

function buildSelectClasses(options: {
  readonly inputSize: SelectSize
  readonly error?: string
  readonly success?: string
  readonly disabled?: boolean
  readonly className: string
}): string {
  const sizeClass = options.inputSize === 'md' ? '' : `bac-select--${options.inputSize}`
  let stateClass = ''

  if (options.error) {
    stateClass = 'bac-select--error'
  } else if (options.success) {
    stateClass = 'bac-select--success'
  }

  return [
    'bac-select',
    sizeClass,
    stateClass,
    options.disabled ? 'bac-select--disabled' : '',
    options.className,
  ].filter(Boolean).join(' ')
}

function getDescribedByIds(ids: Array<string | undefined>): string | undefined {
  const filteredIds = ids.filter(Boolean)
  return filteredIds.length > 0 ? filteredIds.join(' ') : undefined
}

function getSelectIcon(error?: string, success?: string) {
  if (error) return <AlertCircle size={16} />
  if (success) return <CheckCircle2 size={16} />
  return <ChevronDown size={16} />
}

export function Select({
  options,
  label,
  placeholder,
  hint,
  error,
  success,
  disabled,
  inputSize = 'md',
  value,
  defaultValue,
  onChange,
  className = '',
  id,
}: SelectProps) {
  const uid = useId()
  const selectId = id ?? `bac-select-${uid.replaceAll(':', '')}`
  const errorId   = error             ? `${selectId}-error`   : undefined
  const hintId    = hint && !error    ? `${selectId}-hint`    : undefined
  const successId = success && !error ? `${selectId}-success` : undefined
  const describedBy = getDescribedByIds([errorId, hintId, successId])
  const isControlled = value !== undefined
  const placeholderValue = placeholder ? '' : undefined
  const resolvedDefaultValue = isControlled
    ? undefined
    : defaultValue ?? placeholderValue
  const wrapperClasses = buildSelectClasses({
    inputSize,
    error,
    success: error ? undefined : success,
    disabled,
    className,
  })
  const statusIcon = getSelectIcon(error, error ? undefined : success)

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={selectId} className="bac-select__label">
          {label}
        </label>
      )}
      <div className="bac-select__field-wrapper">
        <select
          id={selectId}
          className="bac-select__field"
          disabled={disabled}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          value={value ?? undefined}
          defaultValue={resolvedDefaultValue}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="bac-select__caret" aria-hidden="true">
          {statusIcon}
        </span>
      </div>
      {error             && <p id={errorId}   className="bac-select__error-text"   role="alert">{error}</p>}
      {!error && success && <p id={successId} className="bac-select__success-text">{success}</p>}
      {!error && !success && hint && <p id={hintId} className="bac-select__hint">{hint}</p>}
    </div>
  )
}

Select.displayName = 'Select'
