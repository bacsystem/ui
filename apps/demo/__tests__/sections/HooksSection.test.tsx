import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { HooksSection } from '../../app/sections/HooksSection'
import { useTheme, useBreakpoint } from '@bacsystem/ui'

vi.mock('@bacsystem/ui', async () => await import('@ui-mock'))

describe('HooksSection', () => {
  const mockSetTheme = vi.fn()
  const mockToggleTheme = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      resolvedTheme: 'light',
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
    const themeRow = screen.getByText((_, element) => element?.textContent === 'theme: "light"')
    expect(themeRow).toBeInTheDocument()
  })

  it('displays theme as "dark" when useTheme returns dark', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      resolvedTheme: 'dark',
      setTheme: mockSetTheme,
      toggleTheme: mockToggleTheme,
    })
    render(<HooksSection />)
    const themeRow = screen.getByText((_, element) => element?.textContent === 'theme: "dark"')
    expect(themeRow).toBeInTheDocument()
  })

  it('displays the resolved theme value', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'system',
      resolvedTheme: 'dark',
      setTheme: mockSetTheme,
      toggleTheme: mockToggleTheme,
    })
    render(<HooksSection />)
    expect(screen.getAllByText(/resolvedTheme:/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/"dark"/).length).toBeGreaterThan(0)
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

  it('calls setTheme("system") when system button is clicked', () => {
    render(<HooksSection />)
    fireEvent.click(screen.getByText("setTheme('system')"))
    expect(mockSetTheme).toHaveBeenCalledWith('system')
  })

  it('calls toggleTheme when the toggle button is clicked', () => {
    render(<HooksSection />)
    fireEvent.click(screen.getAllByText('toggleTheme()')[0])
    expect(mockToggleTheme).toHaveBeenCalledTimes(1)
  })

  it('displays the current breakpoint value', () => {
    render(<HooksSection />)
    expect(screen.getByText(/"md"/)).toBeInTheDocument()
  })

  it('displays isMobile as "false"', () => {
    render(<HooksSection />)
    const text = screen.getAllByText('isMobile:', { exact: false })[0]
    expect(text.parentElement?.textContent).toContain('false')
  })

  it('displays isTablet as "true" when isTablet is true', () => {
    render(<HooksSection />)
    const text = screen.getAllByText('isTablet:', { exact: false })[0]
    expect(text.parentElement?.textContent).toContain('true')
  })

  it('displays isDesktop as "false"', () => {
    render(<HooksSection />)
    const text = screen.getAllByText('isDesktop:', { exact: false })[0]
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

  it('renders the dynamic motion showcase for hooks', () => {
    render(<HooksSection />)
    expect(screen.getByText('Dynamic Motion')).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Hooks motion playground' })).toBeInTheDocument()
  })
})