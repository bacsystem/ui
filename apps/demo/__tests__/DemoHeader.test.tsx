import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DemoHeader } from '../app/DemoHeader'
import { useTheme, useBreakpoint } from '@bacsystem/ui'

vi.mock('@bacsystem/ui', async () => await import('@ui-mock'))

describe('DemoHeader', () => {
  const mockSetTheme = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      resolvedTheme: 'light',
      setTheme: mockSetTheme,
      toggleTheme: vi.fn(),
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
    expect(screen.getByText('viewport')).toBeInTheDocument()
    expect(screen.getByText('md')).toBeInTheDocument()
  })

  it('renders the three theme options', () => {
    render(<DemoHeader />)
    expect(screen.getByRole('button', { name: 'Aplicar tema claro' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Aplicar tema oscuro' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Aplicar tema sistema' })).toBeInTheDocument()
  })

  it('shows the resolved active theme', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'system',
      resolvedTheme: 'dark',
      setTheme: mockSetTheme,
      toggleTheme: vi.fn(),
    })
    render(<DemoHeader />)
    expect(screen.getByText('activo')).toBeInTheDocument()
    expect(screen.getByText('dark')).toBeInTheDocument()
  })

  it('calls setTheme when a theme option is clicked', () => {
    render(<DemoHeader />)
    fireEvent.click(screen.getByRole('button', { name: 'Aplicar tema oscuro' }))
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('updates the displayed breakpoint when useBreakpoint returns a different value', () => {
    vi.mocked(useBreakpoint).mockReturnValue({
      current: 'xl',
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    })
    render(<DemoHeader />)
    expect(screen.getByText('xl')).toBeInTheDocument()
  })

  it('displays "sm" breakpoint correctly', () => {
    vi.mocked(useBreakpoint).mockReturnValue({
      current: 'sm',
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    })
    render(<DemoHeader />)
    expect(screen.getByText('sm')).toBeInTheDocument()
  })
})