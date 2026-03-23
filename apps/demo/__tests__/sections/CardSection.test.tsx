import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CardSection } from '../../app/sections/CardSection'

describe('CardSection', () => {
  it('renders without crashing', () => {
    const { container } = render(<CardSection />)
    expect(container).toBeInTheDocument()
  })

  it('has the id="card" anchor', () => {
    const { container } = render(<CardSection />)
    expect(container.querySelector('#card')).toBeInTheDocument()
  })

  it('renders the DemoSection with title "Card"', () => {
    render(<CardSection />)
    expect(screen.getByRole('heading', { name: 'Card' })).toBeInTheDocument()
  })

  it('renders all 4 card variants', () => {
    render(<CardSection />)
    const variants = ['default', 'elevated', 'outlined', 'tinted']
    for (const v of variants) {
      expect(screen.getByText(v)).toBeInTheDocument()
    }
  })

  it('renders cards with data-variant attributes', () => {
    render(<CardSection />)
    expect(document.querySelector('[data-variant="default"]')).toBeInTheDocument()
    expect(document.querySelector('[data-variant="elevated"]')).toBeInTheDocument()
    expect(document.querySelector('[data-variant="outlined"]')).toBeInTheDocument()
    expect(document.querySelector('[data-variant="tinted"]')).toBeInTheDocument()
  })

  it('renders 4 total cards', () => {
    render(<CardSection />)
    const cards = document.querySelectorAll('[data-variant]')
    expect(cards).toHaveLength(4)
  })

  it('renders each card with the "md" size', () => {
    render(<CardSection />)
    const cards = document.querySelectorAll('[data-size="md"]')
    expect(cards).toHaveLength(4)
  })

  it('renders the card content text', () => {
    render(<CardSection />)
    const contentTexts = screen.getAllByText('Contenido de la card')
    expect(contentTexts).toHaveLength(4)
  })
})