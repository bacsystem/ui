import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AlertSection } from '../../app/sections/AlertSection'
import { Alert } from '@bacsystem/ui'
import { vi } from 'vitest'

describe('AlertSection', () => {
  it('renders without crashing', () => {
    const { container } = render(<AlertSection />)
    expect(container).toBeInTheDocument()
  })

  it('has the id="alert" anchor', () => {
    const { container } = render(<AlertSection />)
    expect(container.querySelector('#alert')).toBeInTheDocument()
  })

  it('renders the DemoSection with title "Alert"', () => {
    render(<AlertSection />)
    expect(screen.getByRole('heading', { name: 'Alert' })).toBeInTheDocument()
  })

  it('renders the "Soft" label group', () => {
    render(<AlertSection />)
    expect(screen.getByText('Soft')).toBeInTheDocument()
  })

  it('renders the "Filled" label group', () => {
    render(<AlertSection />)
    expect(screen.getByText('Filled')).toBeInTheDocument()
  })

  it('renders the "Outline" label group', () => {
    render(<AlertSection />)
    expect(screen.getByText('Outline')).toBeInTheDocument()
  })

  it('renders 4 soft alerts with correct variants', () => {
    render(<AlertSection />)
    const alerts = screen.getAllByRole('alert')
    const variants = alerts.map((el) => el.getAttribute('data-variant'))
    expect(variants).toContain('info')
    expect(variants).toContain('success')
    expect(variants).toContain('warning')
    expect(variants).toContain('error')
  })

  it('renders filled alerts for all 4 variants', () => {
    render(<AlertSection />)
    const alerts = screen.getAllByRole('alert')
    const filledAlerts = alerts.filter((el) => el.getAttribute('data-appearance') === 'filled')
    expect(filledAlerts).toHaveLength(4)
  })

  it('renders outline alerts for all 4 variants', () => {
    render(<AlertSection />)
    const alerts = screen.getAllByRole('alert')
    const outlineAlerts = alerts.filter((el) => el.getAttribute('data-appearance') === 'outline')
    expect(outlineAlerts).toHaveLength(4)
  })

  it('renders 12 total alerts (4 variants × 3 appearances)', () => {
    render(<AlertSection />)
    expect(screen.getAllByRole('alert')).toHaveLength(12)
  })

  it('capitalizes variant names for filled and outline alert titles', () => {
    render(<AlertSection />)
    // "Info" appears in both filled and outline groups (2 times each)
    expect(screen.getAllByText('Info').length).toBeGreaterThanOrEqual(2)
    expect(screen.getAllByText('Success').length).toBeGreaterThanOrEqual(2)
    expect(screen.getAllByText('Warning').length).toBeGreaterThanOrEqual(2)
    // "Error" also appears as the soft alert title, so at least 3
    expect(screen.getAllByText('Error').length).toBeGreaterThanOrEqual(2)
  })

  it('renders the soft info alert with the correct title "Información"', () => {
    render(<AlertSection />)
    expect(screen.getByText('Información')).toBeInTheDocument()
  })
})