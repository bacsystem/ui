'use client'

import { Input, Label } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'
import { labelPropRows } from '../../components/propTables'

export function LabelSection() {
  return (
    <div id="label">
      <DemoSection
        title="Label"
        tag="Component"
        description="Label accesible con soporte de htmlFor y marcador de requerido."
        props={labelPropRows}
        code={`
import { Input, Label } from '@bacsystem/ui'

<Label htmlFor="email">Correo electrónico</Label>
<Input id="email" placeholder="correo@ejemplo.com" />

<Label htmlFor="sku" required>SKU del producto</Label>
<Input id="sku" defaultValue="SKU-001" />
`}
      >
        <div style={{ display: 'grid', gap: 'var(--sp-6)' }}>
          <div style={{ display: 'grid', gap: 'var(--sp-2)' }}>
            <Label htmlFor="demo-email">Correo electrónico</Label>
            <Input id="demo-email" placeholder="correo@ejemplo.com" />
          </div>

          <div style={{ display: 'grid', gap: 'var(--sp-2)' }}>
            <Label htmlFor="demo-sku" required>SKU del producto</Label>
            <Input id="demo-sku" defaultValue="SKU-001" />
          </div>
        </div>
      </DemoSection>
    </div>
  )
}