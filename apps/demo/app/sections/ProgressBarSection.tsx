'use client'

import { ProgressBar } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'
import { progressBarPropRows } from '../../components/propTables'

export function ProgressBarSection() {
  return (
    <div id="progressbar">
      <DemoSection
        title="ProgressBar"
        tag="Component"
        description="Barra de progreso determinate con label accesible y porcentaje visible opcional."
        props={progressBarPropRows}
        code={`
import { ProgressBar } from '@bacsystem/ui'

<ProgressBar value={28} label="Carga inicial" showLabel />
<ProgressBar value={64} label="Sincronización" showLabel />
<ProgressBar value={100} label="Completado" showLabel />
`}
      >
        <div style={{ display: 'grid', gap: 'var(--sp-5)' }}>
          <ProgressBar value={28} label="Carga inicial" showLabel />
          <ProgressBar value={64} label="Sincronización de catálogo" showLabel />
          <ProgressBar value={100} label="Completado" showLabel />
        </div>
      </DemoSection>
    </div>
  )
}