'use client'

import { useState } from 'react'
import { Select } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'
import { selectPropRows } from '../../components/propTables'

const statusOptions = [
  { value: 'activo', label: 'Activo' },
  { value: 'inactivo', label: 'Inactivo' },
  { value: 'suspendido', label: 'Suspendido', disabled: true },
]

const countryOptions = [
  { value: 'mx', label: 'México' },
  { value: 'es', label: 'España' },
  { value: 'ar', label: 'Argentina' },
  { value: 'co', label: 'Colombia' },
  { value: 'cl', label: 'Chile' },
]

export function SelectSection() {
  const [estado, setEstado] = useState('')
  const [pais, setPais] = useState('mx')

  return (
    <div id="select">
      <DemoSection
        title="Select"
        tag="Component"
        description="Select nativo estilizado — label, hint, error, success, 3 tamaños"
        props={selectPropRows}
        code={`
import { Select } from '@bacsystem/ui'

// Básico con placeholder
<Select
  label="Estado"
  placeholder="Seleccionar estado"
  options={[
    { value: 'activo', label: 'Activo' },
    { value: 'inactivo', label: 'Inactivo' },
    { value: 'suspendido', label: 'Suspendido', disabled: true },
  ]}
  value={estado}
  onChange={setEstado}
/>

// Con hint
<Select label="País" hint="Selecciona tu país de residencia" options={countries} />

// Error y success
<Select label="Rol" error="Este campo es requerido" options={roles} />
<Select label="Plan" success="Plan disponible" options={plans} />

// Tamaños
<Select inputSize="sm" options={options} />
<Select inputSize="md" options={options} />
<Select inputSize="lg" options={options} />

// Deshabilitado
<Select label="Categoría" disabled options={options} />
`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)', width: '100%', maxWidth: 480 }}>

          <div>
            <p className="demo-label">Con placeholder y controlled</p>
            <Select
              label="Estado"
              placeholder="Seleccionar estado…"
              options={statusOptions}
              value={estado}
              onChange={setEstado}
              hint={estado ? `Seleccionado: ${estado}` : 'Selecciona un estado'}
            />
          </div>

          <div>
            <p className="demo-label">Con valor por defecto</p>
            <Select
              label="País"
              options={countryOptions}
              value={pais}
              onChange={setPais}
              hint="País de residencia"
            />
          </div>

          <div>
            <p className="demo-label">Estados (error / success)</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              <Select
                label="Rol"
                placeholder="Seleccionar rol…"
                options={[{ value: 'admin', label: 'Administrador' }, { value: 'user', label: 'Usuario' }]}
                error="Este campo es requerido"
              />
              <Select
                label="Plan"
                options={[{ value: 'pro', label: 'Pro' }, { value: 'free', label: 'Gratis' }]}
                defaultValue="pro"
                success="Plan disponible"
              />
            </div>
          </div>

          <div>
            <p className="demo-label">Tamaños</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              <Select inputSize="sm" placeholder="Small" options={countryOptions} />
              <Select inputSize="md" placeholder="Medium (default)" options={countryOptions} />
              <Select inputSize="lg" placeholder="Large" options={countryOptions} />
            </div>
          </div>

          <div>
            <p className="demo-label">Deshabilitado</p>
            <Select
              label="Categoría"
              disabled
              options={statusOptions}
              defaultValue="activo"
            />
          </div>

        </div>
      </DemoSection>
    </div>
  )
}
