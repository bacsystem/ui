'use client'

import { forwardRef, useId, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly label?: string
  readonly error?: string
  readonly hint?: string
  readonly success?: string
  readonly resize?: TextareaResize
  readonly className?: string
}

function buildTextareaClasses(cfg: {
  readonly error?: string
  readonly success?: string
  readonly disabled?: boolean
  readonly className: string
}): string {
  let stateClass = ''
  if (cfg.error) stateClass = 'bac-textarea--error'
  else if (cfg.success) stateClass = 'bac-textarea--success'

  return cn(
    'bac-textarea',
    stateClass,
    cfg.disabled && 'bac-textarea--disabled',
    cfg.className,
  )
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      success,
      resize = 'vertical',
      disabled,
      className = '',
      id,
      ...props
    },
    ref,
  ) => {
    const uid = useId()
    const textareaId = id ?? `bac-textarea-${uid.replaceAll(':', '')}`
    const errorId = error ? `${textareaId}-error` : undefined
    const hintId = hint && !error ? `${textareaId}-hint` : undefined
    const successId = success && !error ? `${textareaId}-success` : undefined
    const describedBy = [errorId, hintId, successId].filter(Boolean).join(' ') || undefined

    const classes = buildTextareaClasses({ error, success, disabled, className })

    return (
      <div className="bac-textarea__wrapper">
        {label && (
          <label htmlFor={textareaId} className="bac-textarea__label">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          className={classes}
          style={{ resize }}
          {...props}
        />

        {error && <p id={errorId} className="bac-textarea__error-text" role="alert">{error}</p>}
        {!error && success && <p id={successId} className="bac-textarea__success-text">{success}</p>}
        {!error && !success && hint && <p id={hintId} className="bac-textarea__hint">{hint}</p>}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
