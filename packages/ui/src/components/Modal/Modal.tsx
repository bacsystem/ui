import { useEffect, useRef, useCallback } from 'react'
import { X } from 'lucide-react'

export type ModalSize = 'sm' | 'md' | 'lg'

export interface ModalProps {
  open: boolean
  onClose: () => void
  size?: ModalSize
  title?: string
  className?: string
  children: React.ReactNode
}

export function Modal({
  open,
  onClose,
  size = 'md',
  title,
  className = '',
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<Element | null>(null)

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
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last?.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first?.focus()
          }
        }
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      // Focus the dialog
      setTimeout(() => dialogRef.current?.focus(), 0)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus()
      }
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
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
      aria-labelledby={title ? 'bac-modal-title' : undefined}
    >
      <div
        ref={dialogRef}
        className={`bac-modal bac-modal--${size}${className ? ` ${className}` : ''}`}
        tabIndex={-1}
      >
        <div className="bac-modal__header">
          {title && (
            <h2 id="bac-modal-title" className="bac-modal__title">
              {title}
            </h2>
          )}
          <button
            type="button"
            className="bac-modal__close"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="bac-modal__body">{children}</div>
      </div>
    </div>
  )
}
