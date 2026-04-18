'use client'

import { Breadcrumb } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'
import { breadcrumbPropRows } from '../../components/propTables'

export function BreadcrumbSection() {
  return (
    <div id="breadcrumb">
      <DemoSection
        title="Breadcrumb"
        tag="Component"
        description="Navegación semántica — aria-current, separador configurable"
        props={breadcrumbPropRows}
        code={`
import { Breadcrumb } from '@bacsystem/ui'

// Básico
<Breadcrumb
  items={[
    { label: 'Inicio', href: '/' },
    { label: 'Ventas', href: '/ventas' },
    { label: 'Factura F-0042' },
  ]}
/>

// Separador personalizado
<Breadcrumb
  items={[...]}
  separator=">"
/>

// Solo texto (sin links)
<Breadcrumb
  items={[
    { label: 'Dashboard' },
    { label: 'Reportes' },
    { label: 'Enero 2026' },
  ]}
/>
`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)', width: '100%' }}>

          <div>
            <p className="demo-label">Con links</p>
            <Breadcrumb
              items={[
                { label: 'Inicio', href: '#' },
                { label: 'Ventas', href: '#' },
                { label: 'Factura F-0042' },
              ]}
            />
          </div>

          <div>
            <p className="demo-label">Separador personalizado</p>
            <Breadcrumb
              items={[
                { label: 'Dashboard', href: '#' },
                { label: 'Reportes', href: '#' },
                { label: 'Enero 2026' },
              ]}
              separator="›"
            />
          </div>

          <div>
            <p className="demo-label">Separador →</p>
            <Breadcrumb
              items={[
                { label: 'Admin', href: '#' },
                { label: 'Usuarios', href: '#' },
                { label: 'Juan Díaz', href: '#' },
                { label: 'Permisos' },
              ]}
              separator="→"
            />
          </div>

          <div>
            <p className="demo-label">Sin links (solo texto)</p>
            <Breadcrumb
              items={[
                { label: 'Dashboard' },
                { label: 'Reportes' },
                { label: 'Enero 2026' },
              ]}
            />
          </div>

        </div>
      </DemoSection>
    </div>
  )
}
