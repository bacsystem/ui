'use client'

import { useTheme, useBreakpoint } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'

export function HooksSection() {
  const { theme, setTheme, toggleTheme } = useTheme()
  const { isMobile, isTablet, isDesktop, current } = useBreakpoint()

  return (
    <div id="hooks">
      <DemoSection title="Hooks" tag="Hook" description="useTheme and useBreakpoint live values">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-8)', width: '100%' }}>

          <div>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--sp-3)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
              useTheme()
            </h3>
            <div style={{ backgroundColor: 'var(--color-neutral-50)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-base)', padding: 'var(--sp-4)', marginBottom: 'var(--sp-4)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>
              <p>theme: <strong style={{ color: 'var(--color-primary-700)' }}>&quot;{theme}&quot;</strong></p>
            </div>
            <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
              <button
                onClick={() => setTheme('light')}
                style={{ padding: '6px 16px', borderRadius: 'var(--radius-base)', border: '1px solid var(--color-border)', cursor: 'pointer', backgroundColor: theme === 'light' ? 'var(--color-primary-100)' : 'var(--color-bg-card)', color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)' }}
              >
                setTheme(&apos;light&apos;)
              </button>
              <button
                onClick={() => setTheme('dark')}
                style={{ padding: '6px 16px', borderRadius: 'var(--radius-base)', border: '1px solid var(--color-border)', cursor: 'pointer', backgroundColor: theme === 'dark' ? 'var(--color-primary-100)' : 'var(--color-bg-card)', color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)' }}
              >
                setTheme(&apos;dark&apos;)
              </button>
              <button
                onClick={toggleTheme}
                style={{ padding: '6px 16px', borderRadius: 'var(--radius-base)', border: '1px solid var(--color-border)', cursor: 'pointer', backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)' }}
              >
                toggleTheme()
              </button>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--sp-3)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
              useBreakpoint()
            </h3>
            <div style={{ backgroundColor: 'var(--color-neutral-50)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-base)', padding: 'var(--sp-4)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
              <p>current: <strong style={{ color: 'var(--color-primary-700)' }}>&quot;{current}&quot;</strong></p>
              <p>isMobile: <strong style={{ color: isMobile ? 'var(--color-success-base)' : 'var(--color-text-secondary)' }}>{String(isMobile)}</strong></p>
              <p>isTablet: <strong style={{ color: isTablet ? 'var(--color-success-base)' : 'var(--color-text-secondary)' }}>{String(isTablet)}</strong></p>
              <p>isDesktop: <strong style={{ color: isDesktop ? 'var(--color-success-base)' : 'var(--color-text-secondary)' }}>{String(isDesktop)}</strong></p>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--sp-2)' }}>
              Redimensiona la ventana para ver los valores actualizarse en tiempo real.
            </p>
          </div>

        </div>
      </DemoSection>
    </div>
  )
}
