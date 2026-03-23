'use client'

import { useState } from 'react'
import { Modal, Button } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'

/**
 * Renders a demo section with a controllable modal, including an open button and actions to close it.
 *
 * The modal demonstrates focus trapping and can be closed via the Escape key, backdrop click, or the provided
 * "Cancelar" and "Confirmar" buttons.
 *
 * @returns The component's rendered JSX element containing the demo section and modal
 */
export function ModalSection() {
  const [open, setOpen] = useState(false)

  return (
    <div id="modal">
      <DemoSection title="Modal" tag="Component" description="Focus trap, Escape key, backdrop click to close">
        <Button onClick={() => setOpen(true)}>Abrir Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Modal de ejemplo" size="md">
          <p style={{ color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-6)' }}>
            Este modal tiene focus trap activado. Presiona Escape o haz clic en el backdrop para cerrarlo.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => setOpen(false)}>Confirmar</Button>
          </div>
        </Modal>
      </DemoSection>
    </div>
  )
}
