import { useState, useEffect, useCallback } from 'react'

export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

export interface UseThemeReturn {
  readonly theme: Theme
  readonly resolvedTheme: ResolvedTheme
  readonly setTheme: (theme: Theme) => void
  readonly toggleTheme: () => void
}

const STORAGE_KEY = 'bacsystem-ui-theme'
const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)'
const DEFAULT_THEME: Theme = 'system'
const DEFAULT_RESOLVED_THEME: ResolvedTheme = 'light'

function getSystemTheme(): ResolvedTheme {
  if (!('matchMedia' in globalThis)) return 'light'
  return globalThis.matchMedia(SYSTEM_THEME_QUERY).matches ? 'dark' : 'light'
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === 'system' ? getSystemTheme() : theme
}

/**
 * Applies the given theme selection to the document and returns the resolved active theme.
 *
 * @param theme - The selected theme mode.
 * @returns The effective resolved theme applied to the document.
 */
function applyTheme(theme: Theme): ResolvedTheme {
  const resolvedTheme = resolveTheme(theme)
  document.documentElement.dataset['theme'] = resolvedTheme
  document.documentElement.dataset['themeMode'] = theme
  document.documentElement.style.colorScheme = resolvedTheme
  return resolvedTheme
}

/**
 * Reads the persisted UI theme from storage, defaulting to system when no valid value is available or storage is inaccessible.
 *
 * @returns The stored theme when available, otherwise `'system'`.
 */
function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark' || stored === 'light' || stored === 'system') return stored
  } catch {
    // localStorage not available
  }
  return 'system'
}

/**
 * Provides the current UI color theme and controls to update it while keeping the document and localStorage in sync.
 *
 * The hook persists the selected theme to `localStorage`, resolves `system` against `prefers-color-scheme`,
 * and applies the effective theme to the document root so all library components stay in sync.
 *
 * @returns An object with:
 *  - `theme` — the selected theme mode: `'light'`, `'dark'`, or `'system'`
 *  - `resolvedTheme` — the effective active theme after resolving `'system'`
 *  - `setTheme(theme)` — set the theme to the provided value
 *  - `toggleTheme()` — switch the theme between resolved light and dark modes
 */
export function useTheme(): UseThemeReturn {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME)
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(DEFAULT_RESOLVED_THEME)
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    const initialTheme = readStoredTheme()
    setTheme(initialTheme)
    setResolvedTheme(applyTheme(initialTheme))
    setHasHydrated(true)
  }, [])

  useEffect(() => {
    if (!hasHydrated) return

    const nextResolvedTheme = applyTheme(theme)
    setResolvedTheme(nextResolvedTheme)

    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // localStorage not available
    }
  }, [theme, hasHydrated])

  useEffect(() => {
    if (!hasHydrated || !('matchMedia' in globalThis)) return

    const mediaQuery = globalThis.matchMedia(SYSTEM_THEME_QUERY)
    const handleChange = () => {
      if (theme !== 'system') return
      setResolvedTheme(applyTheme('system'))
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, hasHydrated])

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return
      setTheme(readStoredTheme())
    }

    globalThis.addEventListener('storage', handleStorage)
    return () => globalThis.removeEventListener('storage', handleStorage)
  }, [])

  const setSelectedTheme = useCallback((next: Theme) => {
    setTheme(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (resolveTheme(currentTheme) === 'light' ? 'dark' : 'light'))
  }, [])

  return { theme, resolvedTheme, setTheme: setSelectedTheme, toggleTheme }
}
