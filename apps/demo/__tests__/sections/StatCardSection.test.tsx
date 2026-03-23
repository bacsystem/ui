import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatCardSection } from '../../app/sections/StatCardSection'

describe('StatCardSection', () => {
  it('renders without crashing', () => {
    const { container } = render(<StatCardSection />)
    expect(container).toBeInTheDocument()
  })

  it('has the id="statcard" anchor', () => {
    const { container } = render(<StatCardSection />)
    expect(container.querySelector('#statcard')).toBeInTheDocument()
  })

  it('renders the DemoSection with title "StatCard"', () => {
    render(<StatCardSection />)
    expect(screen.getByRole('heading', { name: 'StatCard' })).toBeInTheDocument()
  })

  it('renders Soft, Filled, and Outline label groups', () => {
    render(<StatCardSection />)
    expect(screen.getByText('Soft')).toBeInTheDocument()
    expect(screen.getByText('Filled')).toBeInTheDocument()
    expect(screen.getByText('Outline')).toBeInTheDocument()
  })

  it('renders 5 colors: blue, teal, amber, green, purple', () => {
    render(<StatCardSection />)
    const colors = ['blue', 'teal', 'amber', 'green', 'purple']
    for (const c of colors) {
      const cards = document.querySelectorAll(`[data-color="${c}"]`)
      // 3 appearances × 1 per color = 3
      expect(cards).toHaveLength(3)
    }
  })

  it('renders card titles (Ingresos, Clientes, etc.) in each group', () => {
    render(<StatCardSection />)
    const titles = screen.getAllByTestId('statcard-title')
    const titleTexts = titles.map((t) => t.textContent)
    expect(titleTexts).toContain('Ingresos')
    expect(titleTexts).toContain('Clientes')
    expect(titleTexts).toContain('Ticket prom.')
    expect(titleTexts).toContain('Pedidos')
    expect(titleTexts).toContain('Retención')
  })

  it('renders 15 total stat cards (5 colors × 3 appearances)', () => {
    render(<StatCardSection />)
    expect(screen.getAllByTestId('statcard-title')).toHaveLength(15)
  })

  it('renders filled stat cards with appearance="filled"', () => {
    render(<StatCardSection />)
    const filledCards = document.querySelectorAll('[data-appearance="filled"]')
    expect(filledCards).toHaveLength(5)
  })

  it('renders outline stat cards with appearance="outline"', () => {
    render(<StatCardSection />)
    const outlineCards = document.querySelectorAll('[data-appearance="outline"]')
    expect(outlineCards).toHaveLength(5)
  })

  it('renders trend values like +12.5%, +8.3%', () => {
    render(<StatCardSection />)
    expect(screen.getAllByText('+12.5%').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('+8.3%').length).toBeGreaterThanOrEqual(1)
  })
})