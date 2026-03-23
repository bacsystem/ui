import { useEffect, useRef, useCallback, useId } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

export type ModalSize = 'sm' | 'md' | 'lg'

export interface ModalProps {
  readonly open: boolean
  readonly onClose: () => void
  readonly size?: ModalSize
  readonly title?: string
  readonly closeLabel?: string
  readonly className?: string
  readonly children: ReactNode
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
}: Readonly<ModalProps>) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const previousActiveElement = useRef<Element | null>(null)
  const titleId = useId()

  const handleDocumentKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
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
        } else if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (!open) return

    previousActiveElement.current = document.activeElement
    document.addEventListener('keydown', handleDocumentKeyDown)
    document.body.style.overflow = 'hidden'
    setTimeout(() => dialogRef.current?.focus(), 0)

    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown)
      document.body.style.overflow = ''
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus()
      }
    }
  }, [open, handleDocumentKeyDown])

  if (!open) return null

  const extraClass = className ? ` ${className}` : ''

  return (
    <div className="bac-modal__overlay">
      <dialog
        ref={dialogRef}
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={`bac-modal bac-modal--${size}${extraClass}`}
        tabIndex={-1}
        open
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
      </dialog>
    </div>
  )
}
