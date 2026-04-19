'use client'

import { useState } from 'react'
import { Button, Skeleton } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'
import { skeletonPropRows } from '../../components/propTables'

export function SkeletonSection() {
  const [loading, setLoading] = useState(true)

  return (
    <div id="skeleton">
      <DemoSection
        title="Skeleton"
        tag="Component"
        description="Animación shimmer 60fps en GPU — text, circle, rect"
        props={skeletonPropRows}
        code={`
import { Skeleton } from '@bacsystem/ui'

// Text lines
<Skeleton variant="text" width="80%" height={20} />
<Skeleton variant="text" width="60%" height={20} />

// Circle (avatar placeholder)
<Skeleton variant="circle" width={48} height={48} />

// Rect (card/image placeholder)
<Skeleton variant="rect" width="100%" height={120} />

// Card skeleton pattern
<div style={{ display: 'flex', gap: 12 }}>
  <Skeleton variant="circle" width={40} height={40} />
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
    <Skeleton variant="text" width="70%" height={16} />
    <Skeleton variant="text" width="40%" height={14} />
  </div>
</div>
`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)', width: '100%' }}>

          <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setLoading((v) => !v)}
            >
              {loading ? 'Mostrar contenido' : 'Simular carga'}
            </Button>
          </div>

          <div>
            <p className="demo-label">Text</p>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="70%" height={20} />
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', fontSize: 'var(--text-sm)' }}>
                <p>Este es el texto real que reemplaza el skeleton.</p>
                <p>Segunda línea de contenido real.</p>
                <p>Tercera línea del párrafo.</p>
              </div>
            )}
          </div>

          <div>
            <p className="demo-label">Circle + Card pattern</p>
            {loading ? (
              <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center' }}>
                <Skeleton variant="circle" width={48} height={48} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                  <Skeleton variant="text" width="70%" height={16} />
                  <Skeleton variant="text" width="40%" height={14} />
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--demo-accent-soft)', border: '1px solid var(--demo-accent-soft-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--demo-accent-strong)' }}>JD</div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>Juan Díaz</p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>juan@empresa.com</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <p className="demo-label">Rect (image/card placeholder)</p>
            {loading ? (
              <Skeleton variant="rect" width="100%" height={120} />
            ) : (
              <div style={{ width: '100%', height: 120, background: 'var(--demo-surface-muted)', border: '1px solid var(--demo-accent-soft-border)', borderRadius: 'var(--radius-base)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--demo-accent-strong)', fontWeight: 600 }}>
                Imagen cargada
              </div>
            )}
          </div>

        </div>
      </DemoSection>
    </div>
  )
}
