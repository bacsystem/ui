'use client'

import { StatCard } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'

const cards = [
  { title: 'Ingresos', value: 'S/ 48,200', trend: 'up', trendValue: '+12.5%', color: 'blue' },
  { title: 'Clientes', value: '1,284', trend: 'up', trendValue: '+8.3%', color: 'teal' },
  { title: 'Ticket prom.', value: 'S/ 1,450', trend: 'down', trendValue: '-2.1%', color: 'amber' },
  { title: 'Pedidos', value: '342', trend: 'up', trendValue: '+24%', color: 'green' },
  { title: 'Retención', value: '94.7%', trend: 'neutral', trendValue: '0%', color: 'purple' },
] as const

/**
 * Renders a demo section showcasing StatCard components in three appearances: soft (default), filled, and outline, each displaying the predefined set of cards.
 *
 * @returns The JSX element containing labeled groups ("Soft", "Filled", "Outline"), each rendering a StatCard for every entry in the `cards` array.
 */
export function StatCardSection() {
  return (
    <div id="statcard">
      <DemoSection title="StatCard" tag="Component" description="5 colores × 3 estilos: soft, filled y outline">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)', width: '100%' }}>

          <div>
            <p className="demo-label">Soft</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-4)' }}>
              {cards.map((c) => (
                <StatCard key={c.color} title={c.title} value={c.value} trend={c.trend} trendValue={c.trendValue} color={c.color} />
              ))}
            </div>
          </div>

          <div>
            <p className="demo-label">Filled</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-4)' }}>
              {cards.map((c) => (
                <StatCard key={c.color} title={c.title} value={c.value} trend={c.trend} trendValue={c.trendValue} color={c.color} appearance="filled" />
              ))}
            </div>
          </div>

          <div>
            <p className="demo-label">Outline</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-4)' }}>
              {cards.map((c) => (
                <StatCard key={c.color} title={c.title} value={c.value} trend={c.trend} trendValue={c.trendValue} color={c.color} appearance="outline" />
              ))}
            </div>
          </div>

        </div>
      </DemoSection>
    </div>
  )
}
