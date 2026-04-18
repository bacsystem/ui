'use client'

import { Toggle } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'
import { togglePropRows } from '../../components/propTables'

/**
 * Render a demo section that demonstrates Toggle variants: three sizes and examples of checked, unchecked, and disabled states.
 *
 * Displays a first row with small, medium, and large toggles set to checked, and a second row with an unchecked toggle and two disabled variants.
 *
 * @returns A JSX element containing the Toggle demo section
 */
export function ToggleSection() {
  return (
    <div id="toggle">
      <DemoSection title="Toggle" tag="Component" description="3 sizes with checked, unchecked, and disabled states" props={togglePropRows} code={`
import { Toggle } from '@bacsystem/ui'

// Uncontrolled (defaultChecked)
<Toggle label="Activado" defaultChecked />
<Toggle label="Desactivado" />

// Tamaños: 'sm' | 'md' | 'lg'
<Toggle size="sm" label="Small" defaultChecked />
<Toggle size="md" label="Medium" defaultChecked />
<Toggle size="lg" label="Large" defaultChecked />

// Estados deshabilitados
<Toggle label="Disabled on"  checked disabled />
<Toggle label="Disabled off" disabled />

// Controlled
<Toggle
  label="Controlled"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>
`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-6)', alignItems: 'center' }}>
            <Toggle size="sm" label="Small" defaultChecked />
            <Toggle size="md" label="Medium" defaultChecked />
            <Toggle size="lg" label="Large" defaultChecked />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-6)', alignItems: 'center' }}>
            <Toggle size="sm" label="Unchecked" />
            <Toggle size="md" label="Disabled on" checked disabled />
            <Toggle size="md" label="Disabled off" disabled />
          </div>
        </div>
      </DemoSection>
    </div>
  )
}
