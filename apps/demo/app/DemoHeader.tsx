'use client'

import { useTheme, useBreakpoint } from '@bacsystem/ui'
import { Sun, Moon } from 'lucide-react'

export function DemoHeader() {
  const { theme, toggleTheme } = useTheme()
  const { current } = useBreakpoint()

  return (
    <header className="demo-header">
      <span className="demo-header__breakpoint">
        breakpoint: {current}
      </span>
      <button
        onClick={toggleTheme}
        aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--sp-2)',
          padding: '6px 12px',
          borderRadius: 'var(--radius-base)',
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-bg-card)',
          color: 'var(--color-text-primary)',
          cursor: 'pointer',
          fontSize: 'var(--text-sm)',
          fontFamily: 'var(--font-body)',
        }}
      >
        {theme === 'light' ? (
          <><Moon size={16} aria-hidden="true" /> Dark mode</>
        ) : (
          <><Sun size={16} aria-hidden="true" /> Light mode</>
        )}
      </button>
    </header>
  )
}
