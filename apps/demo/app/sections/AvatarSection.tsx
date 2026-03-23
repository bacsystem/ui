'use client'

import { Avatar } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

/**
 * Renders the "Avatar" demo section showing avatars in five sizes (xs, sm, md, lg, xl) across three appearances: soft, filled, and outline.
 *
 * The section includes labeled rows for each appearance; each row displays one avatar per size, an avatar with an external image (`alt="Usuario"`), and a fallback avatar.
 *
 * @returns The JSX element for the Avatar demo section.
 */
export function AvatarSection() {
  return (
    <div id="avatar">
      <DemoSection title="Avatar" tag="Component" description="5 tamaños × 3 estilos: soft, filled y outline">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)', width: '100%' }}>

          <div>
            <p className="demo-label">Soft</p>
            <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'center' }}>
              {sizes.map((s) => <Avatar key={s} initials="AB" size={s} />)}
              <Avatar src="https://i.pravatar.cc/150?img=3" alt="Usuario" size="md" />
              <Avatar size="md" />
            </div>
          </div>

          <div>
            <p className="demo-label">Filled</p>
            <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'center' }}>
              {sizes.map((s) => <Avatar key={s} initials="AB" size={s} appearance="filled" />)}
              <Avatar src="https://i.pravatar.cc/150?img=5" alt="Usuario" size="md" appearance="filled" />
              <Avatar size="md" appearance="filled" />
            </div>
          </div>

          <div>
            <p className="demo-label">Outline</p>
            <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'center' }}>
              {sizes.map((s) => <Avatar key={s} initials="AB" size={s} appearance="outline" />)}
              <Avatar src="https://i.pravatar.cc/150?img=7" alt="Usuario" size="md" appearance="outline" />
              <Avatar size="md" appearance="outline" />
            </div>
          </div>

        </div>
      </DemoSection>
    </div>
  )
}
