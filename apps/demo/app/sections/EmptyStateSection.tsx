'use client'

import { Button, EmptyState } from '@bacsystem/ui'
import { DatabaseZap } from 'lucide-react'
import { DemoSection } from '../../components/DemoSection'
import { emptyStatePropRows } from '../../components/propTables'

export function EmptyStateSection() {
  return (
    <div id="emptystate">
      <DemoSection
        title="EmptyState"
        tag="Component"
        description="Estado vacío reutilizable para tableros, tablas y pantallas sin datos."
        props={emptyStatePropRows}
        code={`
import { Button, EmptyState } from '@bacsystem/ui'
import { DatabaseZap } from 'lucide-react'

<EmptyState
  title="No hay pedidos aún"
  description="Conecta tu tienda o crea un pedido manual para empezar."
  icon={DatabaseZap}
  actions={<Button>Crear pedido</Button>}
/>
`}
      >
        <EmptyState
          title="No hay pedidos aún"
          description="Conecta tu tienda o crea un pedido manual para empezar a ver actividad en este tablero."
          icon={DatabaseZap}
          actions={(
            <>
              <Button>Crear pedido</Button>
              <Button variant="secondary">Importar datos</Button>
            </>
          )}
        />
      </DemoSection>
    </div>
  )
}