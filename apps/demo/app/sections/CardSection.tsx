'use client'

import { Card } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'

export function CardSection() {
  return (
    <div id="card">
      <DemoSection title="Card" tag="Component" description="4 variants × 3 sizes">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-4)', width: '100%' }}>
          {(['default', 'elevated', 'outlined', 'tinted'] as const).map((variant) => (
            <Card key={variant} variant={variant} size="md" style={{ minWidth: 160 } as React.CSSProperties}>
              <p style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)', marginBottom: 'var(--sp-2)' }}>{variant}</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>Contenido de la card</p>
            </Card>
          ))}
        </div>
      </DemoSection>
    </div>
  )
}
