'use client'

import { Button, Header } from '@bacsystem/ui'
import { Download, Plus } from 'lucide-react'
import { DemoSection } from '../../components/DemoSection'
import { headerPropRows } from '../../components/propTables'

export function HeaderSection() {
  return (
    <div id="header">
      <DemoSection
        title="Header"
        tag="Component"
        description="Encabezado de página o bloque con subtítulo y acciones secundarias."
        props={headerPropRows}
        code={`
import { Button, Header } from '@bacsystem/ui'

<Header
  title="Inventario"
  subtitle="Vista consolidada de productos, stock y alertas."
  actions={
    <>
      <Button variant="secondary">Exportar</Button>
      <Button>Nuevo producto</Button>
    </>
  }
/>
`}
      >
        <Header
          title="Inventario"
          subtitle="Vista consolidada de productos, stock y alertas en tiempo real."
          actions={(
            <>
              <Button variant="secondary" iconLeft={Download}>Exportar</Button>
              <Button iconLeft={Plus}>Nuevo producto</Button>
            </>
          )}
        />
      </DemoSection>
    </div>
  )
}