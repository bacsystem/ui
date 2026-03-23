import { useState, useEffect, useCallback } from 'react'

export type Theme = 'light' | 'dark'

export interface UseThemeReturn {
  readonly theme: Theme
  readonly setTheme: (theme: Theme) => void
  readonly toggleTheme: () => void
}

const STORAGE_KEY = 'bacsystem-ui-theme'

/**
 * Applies the given theme to the document by updating the root element's `data-theme` attribute.
 *
 * @param theme - The theme to apply; `'dark'` sets `data-theme="dark"`, `'light'` removes the attribute to use the default/light appearance
 */
function applyTheme(theme: Theme): void {
  if (theme === 'dark') {
    document.documentElement.dataset['theme'] = 'dark'
  } else {
    delete document.documentElement.dataset['theme']
  }
}

/**
 * Reads the persisted UI theme from storage, defaulting to light when no valid value is available or storage is inaccessible.
 *
 * @returns `'dark'` if a stored value of `'dark'` is found, `'light'` otherwise.
 */
function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    // localStorage not available
  }
  return 'light'
}

/**
 * Provides the current UI color theme and controls to update it while keeping the document and localStorage in sync.
 *
 * The hook persists the selected theme to `localStorage` when available and applies the theme to the document root.
 *
 * @returns An object with:
 *  - `theme` — the current theme, either `'light'` or `'dark'`
 *  - `setTheme(theme)` — set the theme to the provided value
 *  - `toggleTheme()` — switch the theme between `'light'` and `'dark'`
 */
export function useTheme(): UseThemeReturn {
  const [theme, setTheme] = useState<Theme>(readStoredTheme)

  useEffect(() => {
    applyTheme(theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // localStorage not available
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [setTheme])

  return { theme, setTheme, toggleTheme }
}
