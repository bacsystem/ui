import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BadgeSection } from '../../app/sections/BadgeSection'

vi.mock('@bacsystem/ui', async () => await import('@ui-mock'))

describe('BadgeSection', () => {
  it('renders without crashing', () => {
    const { container } = render(<BadgeSection />)
    expect(container).toBeInTheDocument()
  })

  it('has the id="badge" anchor', () => {
    const { container } = render(<BadgeSection />)
    expect(container.querySelector('#badge')).toBeInTheDocument()
  })

  it('renders the DemoSection with title "Badge"', () => {
    render(<BadgeSection />)
    expect(screen.getByRole('heading', { name: 'Badge' })).toBeInTheDocument()
  })

  it('renders Soft, Filled, and Outline label groups', () => {
    render(<BadgeSection />)
    expect(screen.getByText('Soft')).toBeInTheDocument()
    expect(screen.getByText('Filled')).toBeInTheDocument()
    expect(screen.getByText('Outline')).toBeInTheDocument()
  })

  it('renders 18 badges total (6 variants × 3 appearances)', () => {
    render(<BadgeSection />)
    // Badge mock renders spans; count by text matches
    const variants = ['default', 'primary', 'success', 'warning', 'danger', 'info']
    // each variant appears 3 times (soft, filled, outline)
    for (const v of variants) {
      expect(screen.getAllByText(v).length).toBeGreaterThanOrEqual(3)
    }
  })

  it('renders all 6 variants across all appearance groups', () => {
    const { container } = render(<BadgeSection />)
    const badges = container.querySelectorAll('[data-variant]')
    const variantValues = Array.from(badges).map((b) => (b as HTMLElement).dataset['variant'])
    expect(variantValues).toContain('default')
    expect(variantValues).toContain('primary')
    expect(variantValues).toContain('success')
    expect(variantValues).toContain('warning')
    expect(variantValues).toContain('danger')
    expect(variantValues).toContain('info')
  })

  it('renders filled badges with appearance="filled"', () => {
    render(<BadgeSection />)
    const filledBadges = document.querySelectorAll('[data-appearance="filled"]')
    expect(filledBadges.length).toBeGreaterThanOrEqual(6)
  })

  it('renders outline badges with appearance="outline"', () => {
    render(<BadgeSection />)
    const outlineBadges = document.querySelectorAll('[data-appearance="outline"]')
    expect(outlineBadges.length).toBeGreaterThanOrEqual(6)
  })
})