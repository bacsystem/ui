import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useTheme, useBreakpoint } from '@bacsystem/ui'
import Home from '../app/page'

vi.mock('@bacsystem/ui')

describe('Home page', () => {
  beforeEach(() => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: vi.fn(),
      toggleTheme: vi.fn(),
    })
    vi.mocked(useBreakpoint).mockReturnValue({
      current: 'md',
      isMobile: false,
      isTablet: true,
      isDesktop: false,
    })
  })

  it('renders without crashing', () => {
    const { container } = render(<Home />)
    expect(container).toBeInTheDocument()
  })

  it('renders all key section headings', () => {
    render(<Home />)
    // TokensSection renders Colors/Typography/Spacing/Shadows sub-sections; others use their own title
    const expectedTitles = [
      'Colors',   // TokensSection sub-section
      'Button',
      'Badge',
      'Card',
      'Alert',
      'Avatar',
      'Toggle',
      'Modal',
      'DataTable',
      'StatCard',
      'Tabs',
      'Hooks',
    ]
    const headings = screen.getAllByRole('heading').map((h) => h.textContent)
    for (const title of expectedTitles) {
      expect(headings).toContain(title)
    }
  })

  it('renders the TokensSection with id="tokens"', () => {
    const { container } = render(<Home />)
    expect(container.querySelector('#tokens')).toBeInTheDocument()
  })

  it('renders the ButtonSection with id="button"', () => {
    const { container } = render(<Home />)
    expect(container.querySelector('#button')).toBeInTheDocument()
  })

  it('renders the BadgeSection with id="badge"', () => {
    const { container } = render(<Home />)
    expect(container.querySelector('#badge')).toBeInTheDocument()
  })

  it('renders the AlertSection with id="alert"', () => {
    const { container } = render(<Home />)
    expect(container.querySelector('#alert')).toBeInTheDocument()
  })

  it('renders the ModalSection with id="modal"', () => {
    const { container } = render(<Home />)
    expect(container.querySelector('#modal')).toBeInTheDocument()
  })

  it('renders the DataTableSection with id="datatable"', () => {
    const { container } = render(<Home />)
    expect(container.querySelector('#datatable')).toBeInTheDocument()
  })

  it('renders the HooksSection with id="hooks"', () => {
    const { container } = render(<Home />)
    expect(container.querySelector('#hooks')).toBeInTheDocument()
  })
})