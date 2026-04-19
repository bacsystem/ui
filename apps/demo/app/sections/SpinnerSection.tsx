'use client'

import { Button, Spinner } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'
import { spinnerPropRows } from '../../components/propTables'

export function SpinnerSection() {
  return (
    <div id="spinner">
      <DemoSection
        title="Spinner"
        tag="Component"
        description="Indicador de carga liviano para botones, placeholders y estados de espera."
        props={spinnerPropRows}
        code={`
import { Button, Spinner } from '@bacsystem/ui'

<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />

<Button loading>Guardando cambios</Button>
`}
      >
        <div style={{ display: 'grid', gap: 'var(--sp-6)' }}>
          <div>
            <p className="demo-label">Escalas</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-6)', flexWrap: 'wrap' }}>
              <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--sp-2)' }}><Spinner size="sm" /><span style={{ fontSize: 'var(--text-xs)' }}>sm</span></div>
              <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--sp-2)' }}><Spinner size="md" /><span style={{ fontSize: 'var(--text-xs)' }}>md</span></div>
              <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--sp-2)' }}><Spinner size="lg" /><span style={{ fontSize: 'var(--text-xs)' }}>lg</span></div>
            </div>
          </div>

          <div>
            <p className="demo-label">Integrado con Button</p>
            <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
              <Button loading>Guardando cambios</Button>
              <Button variant="secondary" loading>Sincronizando</Button>
            </div>
          </div>
        </div>
      </DemoSection>
    </div>
  )
}