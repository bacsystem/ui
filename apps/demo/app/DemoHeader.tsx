'use client'

import { useEffect, useState } from 'react'
import { useTheme, useBreakpoint } from '@bacsystem/ui'
import { Monitor, Moon, Sun } from 'lucide-react'

const themeOptions = [
  { value: 'light', label: 'Claro', icon: Sun },
  { value: 'dark', label: 'Oscuro', icon: Moon },
  { value: 'system', label: 'Sistema', icon: Monitor },
] as const

/**
 * Renders a header that displays the current responsive breakpoint and a button to toggle the app theme.
 *
 * The button updates its label, icon, and `aria-label` depending on the active theme and invokes the theme toggle when clicked.
 *
 * @returns A JSX element containing the breakpoint label and the theme toggle button.
 */
export function DemoHeader() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const { current } = useBreakpoint()
  const [mounted, setMounted] = useState(false)
  const [isCondensed, setIsCondensed] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const updateHeaderState = () => {
      setIsCondensed(window.scrollY > 72)
    }

    updateHeaderState()
    window.addEventListener('scroll', updateHeaderState, { passive: true })

    return () => window.removeEventListener('scroll', updateHeaderState)
  }, [])

  const displayedBreakpoint = mounted ? current : '...'
  const displayedTheme = mounted ? resolvedTheme : '...'
  const activeTheme = mounted ? theme : null

  return (
    <header className={`demo-header${isCondensed ? ' demo-header--condensed' : ''}`}>
      <div className="demo-header__shell">
        <div className="demo-header__intro">
          <span className="demo-header__eyebrow">Interactive component gallery</span>
          <div>
            <h2 className="demo-header__title">Showcase premium de interfaz</h2>
            <p className="demo-header__subtitle">Una vitrina más emocional, usable y visual para evaluar estados, densidad y polish del sistema.</p>
          </div>
          <div className="demo-header__status-row" aria-label="Estado del sistema de demostración">
            <span className="demo-header__signal">
              <span className="demo-header__signal-dot" aria-hidden="true" />
              <span>Demo en vivo</span>
            </span>
            <span className="demo-header__mini-note">tokens + primitives + wrappers listos para explorar</span>
          </div>
        </div>
        <div className="demo-header__controls">
          <div className="demo-header__pills">
            <span className="demo-header__pill demo-header__pill--breakpoint" suppressHydrationWarning>
              <span className="demo-header__pill-label">viewport</span>
              <span className="demo-header__pill-separator" aria-hidden="true">·</span>
              <span className="demo-header__pill-value">{displayedBreakpoint}</span>
            </span>
            <span className="demo-header__pill" suppressHydrationWarning>
              <span className="demo-header__pill-label">activo</span>
              <span className="demo-header__pill-separator" aria-hidden="true">·</span>
              <span className="demo-header__pill-value">{displayedTheme}</span>
            </span>
          </div>
          <fieldset className="demo-theme-switcher" aria-label="Seleccionar tema">
            {themeOptions.map((option) => {
              const Icon = option.icon

              return (
                <button
                  key={option.value}
                  type="button"
                  className={`demo-theme-toggle${activeTheme === option.value ? ' demo-theme-toggle--active' : ''}`}
                  onClick={() => setTheme(option.value)}
                  aria-pressed={activeTheme === option.value}
                  aria-label={`Aplicar tema ${option.label.toLowerCase()}`}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span className="demo-theme-toggle__label">{option.label}</span>
                </button>
              )
            })}
          </fieldset>
        </div>
      </div>
    </header>
  )
}
