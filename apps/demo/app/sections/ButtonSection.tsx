'use client'

import { Button } from '@bacsystem/ui'
import { Mail, ArrowRight } from 'lucide-react'
import { DemoSection } from '../../components/DemoSection'

/**
 * Renders the Button demo section showcasing variants, appearances, sizes, states, and icon examples.
 *
 * The section is wrapped in a container with id "button" and uses `DemoSection` to present:
 * filled, outline, soft, and link appearances across six variants; five sizes; and examples of loading,
 * disabled, and icon-left/right states.
 *
 * @returns A JSX element containing grouped Button examples for demonstration purposes.
 */
export function ButtonSection() {
  return (
    <div id="button">
      <DemoSection title="Button" tag="Component" description="6 variants × 4 estilos × 5 tamaños — filled, outline, soft y link">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)', width: '100%' }}>

          <div>
            <p className="demo-label">Filled</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
            </div>
          </div>

          <div>
            <p className="demo-label">Outline</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)' }}>
              <Button variant="primary" appearance="outline">Primary</Button>
              <Button variant="secondary" appearance="outline">Secondary</Button>
              <Button variant="accent" appearance="outline">Accent</Button>
              <Button variant="ghost" appearance="outline">Ghost</Button>
              <Button variant="danger" appearance="outline">Danger</Button>
              <Button variant="success" appearance="outline">Success</Button>
            </div>
          </div>

          <div>
            <p className="demo-label">Soft</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)' }}>
              <Button variant="primary" appearance="soft">Primary</Button>
              <Button variant="secondary" appearance="soft">Secondary</Button>
              <Button variant="accent" appearance="soft">Accent</Button>
              <Button variant="ghost" appearance="soft">Ghost</Button>
              <Button variant="danger" appearance="soft">Danger</Button>
              <Button variant="success" appearance="soft">Success</Button>
            </div>
          </div>

          <div>
            <p className="demo-label">Link</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-4)', alignItems: 'center' }}>
              <Button variant="primary" appearance="link">Primary</Button>
              <Button variant="secondary" appearance="link">Secondary</Button>
              <Button variant="accent" appearance="link">Accent</Button>
              <Button variant="ghost" appearance="link">Ghost</Button>
              <Button variant="danger" appearance="link">Danger</Button>
              <Button variant="success" appearance="link">Success</Button>
            </div>
          </div>

          <div>
            <p className="demo-label">Sizes</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)', alignItems: 'center' }}>
              <Button size="xs">XSmall</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">XLarge</Button>
            </div>
          </div>

          <div>
            <p className="demo-label">States & Icons</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)', alignItems: 'center' }}>
              <Button loading>Cargando…</Button>
              <Button iconLeft={Mail}>Con icono izquierdo</Button>
              <Button iconRight={ArrowRight} variant="secondary">Con icono derecho</Button>
              <Button disabled>Deshabilitado</Button>
            </div>
          </div>

        </div>
      </DemoSection>
    </div>
  )
}
