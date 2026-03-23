import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { HooksSection } from '../../app/sections/HooksSection'
import { useTheme, useBreakpoint } from '@bacsystem/ui'

describe('HooksSection', () => {
  const mockSetTheme = vi.fn()
  const mockToggleTheme = vi.fn()

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

  it('renders without crashing', () => {
    const { container } = render(<HooksSection />)
    expect(container).toBeInTheDocument()
  })

  it('has the id="hooks" anchor', () => {
    const { container } = render(<HooksSection />)
    expect(container.querySelector('#hooks')).toBeInTheDocument()
  })

  it('renders the DemoSection with title "Hooks"', () => {
    render(<HooksSection />)
    expect(screen.getByRole('heading', { name: 'Hooks' })).toBeInTheDocument()
  })

  it('displays the current theme value', () => {
    render(<HooksSection />)
    expect(screen.getByText(/"light"/)).toBeInTheDocument()
  })

  it('displays theme as "dark" when useTheme returns dark', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      toggleTheme: mockToggleTheme,
    })
    render(<HooksSection />)
    expect(screen.getByText(/"dark"/)).toBeInTheDocument()
  })

  it('calls setTheme("light") when setTheme light button is clicked', () => {
    render(<HooksSection />)
    fireEvent.click(screen.getByText("setTheme('light')"))
    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })

  it('calls setTheme("dark") when setTheme dark button is clicked', () => {
    render(<HooksSection />)
    fireEvent.click(screen.getByText("setTheme('dark')"))
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('calls toggleTheme when the toggle button is clicked', () => {
    render(<HooksSection />)
    fireEvent.click(screen.getByText('toggleTheme()'))
    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })

  it('displays the current breakpoint value', () => {
    render(<HooksSection />)
    expect(screen.getByText(/"md"/)).toBeInTheDocument()
  })

  it('displays isMobile as "false"', () => {
    render(<HooksSection />)
    const text = screen.getByText('isMobile:', { exact: false })
    expect(text.parentElement?.textContent).toContain('false')
  })

  it('displays isTablet as "true" when isTablet is true', () => {
    render(<HooksSection />)
    const text = screen.getByText('isTablet:', { exact: false })
    expect(text.parentElement?.textContent).toContain('true')
  })

  it('displays isDesktop as "false"', () => {
    render(<HooksSection />)
    const text = screen.getByText('isDesktop:', { exact: false })
    expect(text.parentElement?.textContent).toContain('false')
  })

  it('displays all breakpoint flags when mobile', () => {
    vi.mocked(useBreakpoint).mockReturnValue({
      current: 'sm',
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    })
    render(<HooksSection />)
    expect(screen.getByText(/"sm"/)).toBeInTheDocument()
  })

  it('renders the useTheme() and useBreakpoint() subheadings', () => {
    render(<HooksSection />)
    expect(screen.getByText('useTheme()')).toBeInTheDocument()
    expect(screen.getByText('useBreakpoint()')).toBeInTheDocument()
  })
})