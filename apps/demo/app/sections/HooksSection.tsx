'use client'

import { useEffect, useState } from 'react'
import { useTheme, useBreakpoint } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'

const panelStyle = {
  backgroundColor: 'var(--demo-surface-soft)',
  border: '1px solid var(--demo-border-strong)',
  borderRadius: 'var(--radius-base)',
  padding: 'var(--sp-4)',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-sm)',
} as const

const buttonBaseStyle = {
  padding: '6px 16px',
  borderRadius: 'var(--radius-base)',
  border: '1px solid var(--demo-border-strong)',
  cursor: 'pointer',
  color: 'var(--color-text-primary)',
  fontSize: 'var(--text-sm)',
} as const

/**
 * Renders a demo section displaying live values and controls for `useTheme` and `useBreakpoint`.
 *
 * Shows the current theme with buttons to set or toggle it, and displays the current breakpoint plus `isMobile`, `isTablet`, and `isDesktop` flags, which update as the viewport changes.
 *
 * @returns A React element containing the Hooks demo UI
 */
export function HooksSection() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()
  const { isMobile, isTablet, isDesktop, current } = useBreakpoint()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const displayedTheme = mounted ? theme : '...'
  const displayedResolvedTheme = mounted ? resolvedTheme : '...'
  const displayedBreakpoint = mounted ? current : '...'
  const displayedIsMobile = mounted ? String(isMobile) : '...'
  const displayedIsTablet = mounted ? String(isTablet) : '...'
  const displayedIsDesktop = mounted ? String(isDesktop) : '...'
  const themeActions = [
    { label: "setTheme('light')", value: 'light' as const },
    { label: "setTheme('dark')", value: 'dark' as const },
    { label: "setTheme('system')", value: 'system' as const },
  ]
  const breakpointRows = [
    { label: 'isMobile', value: displayedIsMobile, active: mounted && isMobile },
    { label: 'isTablet', value: displayedIsTablet, active: mounted && isTablet },
    { label: 'isDesktop', value: displayedIsDesktop, active: mounted && isDesktop },
  ]

  return (
    <div id="hooks">
      <DemoSection title="Hooks" tag="Hook" description="useTheme and useBreakpoint live values">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-8)', width: '100%' }}>

          <div>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--sp-3)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
              useTheme()
            </h3>
            <div style={{ ...panelStyle, marginBottom: 'var(--sp-4)' }}>
              <p suppressHydrationWarning>theme: <strong style={{ color: 'var(--demo-accent-strong)' }}>&quot;{displayedTheme}&quot;</strong></p>
              <p suppressHydrationWarning>resolvedTheme: <strong style={{ color: 'var(--demo-accent-strong)' }}>&quot;{displayedResolvedTheme}&quot;</strong></p>
            </div>
            <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
              {themeActions.map((action) => (
                <button
                  key={action.value}
                  onClick={() => setTheme(action.value)}
                  style={{
                    ...buttonBaseStyle,
                    backgroundColor: mounted && theme === action.value ? 'var(--demo-accent-soft)' : 'var(--color-bg-card)',
                  }}
                >
                  {action.label}
                </button>
              ))}
              <button
                onClick={toggleTheme}
                style={{ ...buttonBaseStyle, backgroundColor: 'var(--color-bg-card)' }}
              >
                toggleTheme()
              </button>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--sp-3)', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)' }}>
              useBreakpoint()
            </h3>
            <div style={{ ...panelStyle, display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
              <p suppressHydrationWarning>current: <strong style={{ color: 'var(--demo-accent-strong)' }}>&quot;{displayedBreakpoint}&quot;</strong></p>
              {breakpointRows.map((row) => (
                <p key={row.label} suppressHydrationWarning>
                  {row.label}: <strong style={{ color: row.active ? 'var(--color-success-base)' : 'var(--color-text-secondary)' }}>{row.value}</strong>
                </p>
              ))}
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
