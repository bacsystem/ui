import { useState, useEffect } from 'react'

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl'

export interface UseBreakpointReturn {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  current: Breakpoint
}

function getBreakpoint(width: number): Breakpoint {
  if (width >= 1280) return 'xl'
  if (width >= 1024) return 'lg'
  if (width >= 768) return 'md'
  return 'sm'
}

export function useBreakpoint(): UseBreakpointReturn {
  const [current, setCurrent] = useState<Breakpoint>('sm')

  useEffect(() => {
    setCurrent(getBreakpoint(window.innerWidth))

    const handleResize = () => {
      setCurrent(getBreakpoint(window.innerWidth))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    isMobile: current === 'sm',
    isTablet: current === 'md',
    isDesktop: current === 'lg' || current === 'xl',
    current,
  }
}
