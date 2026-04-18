'use client'

import { Button, Tooltip } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'
import { tooltipPropRows } from '../../components/propTables'

export function TooltipSection() {
  return (
    <div id="tooltip">
      <DemoSection
        title="Tooltip"
        tag="Component"
        description="CSS puro, 4 posiciones, accesible via focus y hover"
        props={tooltipPropRows}
        code={`
import { Tooltip } from '@bacsystem/ui'

// Posiciones
<Tooltip content="Top tooltip" placement="top">
  <Button variant="primary">Top</Button>
</Tooltip>

<Tooltip content="Bottom tooltip" placement="bottom">
  <Button variant="secondary">Bottom</Button>
</Tooltip>

<Tooltip content="Left tooltip" placement="left">
  <Button variant="secondary">Left</Button>
</Tooltip>

<Tooltip content="Right tooltip" placement="right">
  <Button variant="secondary">Right</Button>
</Tooltip>

// Deshabilitado
<Tooltip content="No se muestra" disabled>
  <Button variant="ghost">Disabled tooltip</Button>
</Tooltip>
`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)', width: '100%' }}>

          <div>
            <p className="demo-label">Placements</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-4)', alignItems: 'center' }}>
              <Tooltip content="Top tooltip" placement="top">
                <Button variant="primary">Top</Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" placement="bottom">
                <Button variant="secondary">Bottom</Button>
              </Tooltip>
              <Tooltip content="Left tooltip" placement="left">
                <Button variant="secondary">Left</Button>
              </Tooltip>
              <Tooltip content="Right tooltip" placement="right">
                <Button variant="secondary">Right</Button>
              </Tooltip>
            </div>
          </div>

          <div>
            <p className="demo-label">Long content</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-4)', alignItems: 'center' }}>
              <Tooltip content="Eliminar este registro de forma permanente" placement="top">
                <Button variant="danger" size="sm">Eliminar</Button>
              </Tooltip>
              <Tooltip content="Guardar cambios en el servidor" placement="right">
                <Button variant="success" size="sm">Guardar</Button>
              </Tooltip>
            </div>
          </div>

          <div>
            <p className="demo-label">Disabled</p>
            <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'center' }}>
              <Tooltip content="Este tooltip no se mostrará" disabled>
                <Button variant="ghost">Tooltip deshabilitado</Button>
              </Tooltip>
            </div>
          </div>

        </div>
      </DemoSection>
    </div>
  )
}
