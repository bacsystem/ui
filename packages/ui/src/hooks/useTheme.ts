import { useState, useEffect, useCallback } from 'react'

export type Theme = 'light' | 'dark'

export interface UseThemeReturn {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const STORAGE_KEY = 'bacsystem-ui-theme'

/**
 * Applies the given theme to the document by updating the root element's `data-theme` attribute.
 *
 * @param theme - The theme to apply; `'dark'` sets `data-theme="dark"`, `'light'` removes the attribute to use the default/light appearance
 */
function applyTheme(theme: Theme): void {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

/**
 * Manages the application's color theme and synchronizes it with the DOM and localStorage.
 *
 * On mount, applies a stored preference if present; otherwise defaults to "light".
 *
 * @returns An object containing:
 *  - `theme` — the current theme, either `'light'` or `'dark'`
 *  - `setTheme(theme)` — sets the theme to the provided value
 *  - `toggleTheme()` — switches the theme between `'light'` and `'dark'`
 */
export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<Theme>('light')

  // Sync from localStorage after hydration (client-only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'dark' || stored === 'light') {
        setThemeState(stored)
        applyTheme(stored)
        return
      }
    } catch {
      // localStorage not available
    }
    applyTheme('light')
  }, [])

  useEffect(() => {
    applyTheme(theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // localStorage not available
    }
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  return { theme, setTheme, toggleTheme }
}
