import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DemoHeader } from '../app/DemoHeader'
import { useTheme, useBreakpoint } from '@bacsystem/ui'

vi.mock('@bacsystem/ui', async () => await import('@ui-mock'))

describe('DemoHeader', () => {
  const mockToggleTheme = vi.fn()
  const mockSetTheme = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      toggleTheme: mockToggleTheme,
    })
    vi.mocked(useBreakpoint).mockReturnValue({
      current: 'md',
      isMobile: false,
      isTablet: true,
      isDesktop: false,
    })
  })

  it('renders a <header> element', () => {
    render(<DemoHeader />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('displays the current breakpoint', () => {
    render(<DemoHeader />)
    expect(screen.getByText(/breakpoint: md/i)).toBeInTheDocument()
  })

  it('shows "Dark mode" text and correct aria-label when theme is light', () => {
    render(<DemoHeader />)
    expect(screen.getByText('Dark mode')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Activate dark mode')
  })

  it('shows "Light mode" text and correct aria-label when theme is dark', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      toggleTheme: mockToggleTheme,
    })
    render(<DemoHeader />)
    expect(screen.getByText('Light mode')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Activate light mode')
  })

  it('calls toggleTheme when the button is clicked', () => {
    render(<DemoHeader />)
    fireEvent.click(screen.getByRole('button'))
    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })

  it('updates the displayed breakpoint when useBreakpoint returns a different value', () => {
    vi.mocked(useBreakpoint).mockReturnValue({
      current: 'xl',
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    })
    render(<DemoHeader />)
    expect(screen.getByText(/breakpoint: xl/i)).toBeInTheDocument()
  })

  it('displays "sm" breakpoint correctly', () => {
    vi.mocked(useBreakpoint).mockReturnValue({
      current: 'sm',
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    })
    render(<DemoHeader />)
    expect(screen.getByText(/breakpoint: sm/i)).toBeInTheDocument()
  })
})