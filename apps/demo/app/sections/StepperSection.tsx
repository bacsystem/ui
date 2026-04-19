'use client'

import { Stepper, StepperStep } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'
import { stepperPropRows } from '../../components/propTables'

export function StepperSection() {
  return (
    <div id="stepper">
      <DemoSection
        title="Stepper"
        tag="Component"
        description="Indicador visual para flujos multi-paso en orientación horizontal o vertical."
        props={stepperPropRows}
        code={`
import { Stepper, StepperStep } from '@bacsystem/ui'

<Stepper>
  <StepperStep status="completed" label="Datos base" />
  <StepperStep status="current" label="Precios" />
  <StepperStep status="pending" label="Publicación" />
</Stepper>
`}
      >
        <div style={{ display: 'grid', gap: 'var(--sp-8)' }}>
          <div>
            <p className="demo-label">Horizontal</p>
            <Stepper>
              <StepperStep status="completed" label="Datos base" description="Nombre y categoría" />
              <StepperStep status="current" label="Precios" description="Margen y promociones" />
              <StepperStep status="pending" label="Publicación" description="Canales de venta" />
            </Stepper>
          </div>

          <div>
            <p className="demo-label">Vertical con error</p>
            <Stepper orientation="vertical">
              <StepperStep status="completed" label="Cuenta conectada" description="ERP vinculado" />
              <StepperStep status="error" label="Inventario" description="Faltan centros de costo" />
              <StepperStep status="pending" label="Lanzamiento" description="Pendiente de aprobación" />
            </Stepper>
          </div>
        </div>
      </DemoSection>
    </div>
  )
}