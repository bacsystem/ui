import { useState, useEffect } from 'react'

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl'

export interface UseBreakpointReturn {
  readonly isMobile: boolean
  readonly isTablet: boolean
  readonly isDesktop: boolean
  readonly current: Breakpoint
}

/**
 * Map a numeric viewport width to a breakpoint label.
 *
 * @param width - Viewport width in pixels
 * @returns The corresponding breakpoint: `'xl'` for widths >= 1280, `'lg'` for widths >= 1024 and < 1280, `'md'` for widths >= 768 and < 1024, `'sm'` for widths < 768
 */
function getBreakpoint(width: number): Breakpoint {
  if (width >= 1280) return 'xl'
  if (width >= 1024) return 'lg'
  if (width >= 768) return 'md'
  return 'sm'
}

/**
 * Tracks the current viewport breakpoint and exposes convenient flags for layout.
 *
 * The returned values update automatically when the window is resized.
 *
 * @returns An object with:
 *  - `isMobile`: `true` when the active breakpoint is `'sm'`.
 *  - `isTablet`: `true` when the active breakpoint is `'md'`.
 *  - `isDesktop`: `true` when the active breakpoint is `'lg'` or `'xl'`.
 *  - `current`: the active breakpoint value (`'sm' | 'md' | 'lg' | 'xl'`).
 */
export function useBreakpoint(): UseBreakpointReturn {
  const [current, setCurrent] = useState<Breakpoint>('sm')

  useEffect(() => {
    setCurrent(getBreakpoint(globalThis.innerWidth))

    const handleResize = () => {
      setCurrent(getBreakpoint(globalThis.innerWidth))
    }

    globalThis.addEventListener('resize', handleResize)
    return () => globalThis.removeEventListener('resize', handleResize)
  }, [])

  return {
    isMobile: current === 'sm',
    isTablet: current === 'md',
    isDesktop: current === 'lg' || current === 'xl',
    current,
  }
}
