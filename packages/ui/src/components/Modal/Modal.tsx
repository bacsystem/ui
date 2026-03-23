import { useEffect, useRef, useCallback, useId } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

export type ModalSize = 'sm' | 'md' | 'lg'

export interface ModalProps {
  open: boolean
  onClose: () => void
  size?: ModalSize
  title?: string
  closeLabel?: string
  className?: string
  children: ReactNode
}

/**
 * Render a focus-trapping, accessible modal dialog when open.
 *
 * The modal disables background scrolling while open, traps keyboard focus within the dialog,
 * closes on Escape, overlay click, or the close button, and attempts to restore focus to the
 * previously focused element when closed.
 *
 * @param open - Whether the modal is visible
 * @param onClose - Callback invoked to request closing the modal
 * @param size - Optional size variant for the modal ('sm' | 'md' | 'lg'); defaults to 'md'
 * @param title - Optional title text; when provided, it is used as the dialog label
 * @param className - Optional additional CSS class names to apply to the dialog container
 * @param children - Content rendered inside the modal body
 * @returns The modal element when `open` is true, `null` otherwise.
 */
export function Modal({
  open,
  onClose,
  size = 'md',
  title,
  closeLabel = 'Close modal',
  className = '',
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<Element | null>(null)
  const titleId = useId()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      // Focus trap
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )

        if (focusable.length === 0) {
          e.preventDefault()
          dialogRef.current.focus()
          return
        }

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (!open) return

    previousActiveElement.current = document.activeElement
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    // Focus the dialog
    setTimeout(() => dialogRef.current?.focus(), 0)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus()
      }
    }
  }, [open, handleKeyDown])

  if (!open) return null

  return (
    <div
      className="bac-modal__overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? titleId : undefined}
    >
      <div
        ref={dialogRef}
        className={`bac-modal bac-modal--${size}${className ? ` ${className}` : ''}`}
        tabIndex={-1}
      >
        <div className="bac-modal__header">
          {title && (
            <h2 id={titleId} className="bac-modal__title">
              {title}
            </h2>
          )}
          <button
            type="button"
            className="bac-modal__close"
            onClick={onClose}
            aria-label={closeLabel}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="bac-modal__body">{children}</div>
      </div>
    </div>
  )
}
