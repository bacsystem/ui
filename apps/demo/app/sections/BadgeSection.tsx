'use client'

import { Badge } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'

const variants = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const

/**
 * Render a demo section showcasing the Badge component across six variants and three appearances (soft, filled, outline).
 *
 * @returns A React element containing the Badge demo layout with grouped examples for each appearance.
 */
export function BadgeSection() {
  return (
    <div id="badge">
      <DemoSection title="Badge" tag="Component" description="6 variantes × 3 estilos: soft, filled y outline" code={`
import { Badge } from '@bacsystem/ui'

// Soft (default)
<Badge variant="primary">primary</Badge>
<Badge variant="success">success</Badge>
<Badge variant="warning">warning</Badge>
<Badge variant="danger">danger</Badge>
<Badge variant="info">info</Badge>

// Filled
<Badge variant="success" appearance="filled">success</Badge>
<Badge variant="warning" appearance="filled">warning</Badge>

// Outline
<Badge variant="primary" appearance="outline">primary</Badge>
`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)', width: '100%' }}>

          <div>
            <p className="demo-label">Soft</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
              {variants.map((v) => <Badge key={v} variant={v}>{v}</Badge>)}
            </div>
          </div>

          <div>
            <p className="demo-label">Filled</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
              {variants.map((v) => <Badge key={v} variant={v} appearance="filled">{v}</Badge>)}
            </div>
          </div>

          <div>
            <p className="demo-label">Outline</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
              {variants.map((v) => <Badge key={v} variant={v} appearance="outline">{v}</Badge>)}
            </div>
          </div>

        </div>
      </DemoSection>
    </div>
  )
}
