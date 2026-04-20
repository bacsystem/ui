import { useState, useEffect } from 'react'

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof globalThis.matchMedia !== 'function') return

    const mql = globalThis.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mql.matches)

    const handler = (event: MediaQueryListEvent) => {
      setReduced(event.matches)
    }

    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return reduced
}
