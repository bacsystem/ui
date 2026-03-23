'use client'

import { Alert } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'

const variants = ['info', 'success', 'warning', 'error'] as const

export function AlertSection() {
  return (
    <div id="alert">
      <DemoSection title="Alert" tag="Component" description="4 variantes × 3 estilos: soft, filled y outline">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)', width: '100%' }}>

          <div>
            <p className="demo-label">Soft</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              <Alert variant="info" title="Información">Esta es una alerta informativa para el usuario.</Alert>
              <Alert variant="success" title="¡Éxito!">La operación se completó correctamente.</Alert>
              <Alert variant="warning" title="Advertencia">Revisa los datos antes de continuar.</Alert>
              <Alert variant="error" title="Error">No se pudo procesar la solicitud.</Alert>
            </div>
          </div>

          <div>
            <p className="demo-label">Filled</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              {variants.map((v) => (
                <Alert key={v} variant={v} appearance="filled" title={v.charAt(0).toUpperCase() + v.slice(1)}>
                  Mensaje de alerta con estilo filled.
                </Alert>
              ))}
            </div>
          </div>

          <div>
            <p className="demo-label">Outline</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              {variants.map((v) => (
                <Alert key={v} variant={v} appearance="outline" title={v.charAt(0).toUpperCase() + v.slice(1)}>
                  Mensaje de alerta con estilo outline.
                </Alert>
              ))}
            </div>
          </div>

        </div>
      </DemoSection>
    </div>
  )
}
