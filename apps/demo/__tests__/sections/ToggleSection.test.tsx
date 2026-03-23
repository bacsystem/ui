import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ToggleSection } from '../../app/sections/ToggleSection'

describe('ToggleSection', () => {
  it('renders without crashing', () => {
    const { container } = render(<ToggleSection />)
    expect(container).toBeInTheDocument()
  })

  it('has the id="toggle" anchor', () => {
    const { container } = render(<ToggleSection />)
    expect(container.querySelector('#toggle')).toBeInTheDocument()
  })

  it('renders the DemoSection with title "Toggle"', () => {
    render(<ToggleSection />)
    expect(screen.getByRole('heading', { name: 'Toggle' })).toBeInTheDocument()
  })

  it('renders toggles for Small, Medium, and Large sizes', () => {
    render(<ToggleSection />)
    expect(screen.getByText('Small')).toBeInTheDocument()
    expect(screen.getByText('Medium')).toBeInTheDocument()
    expect(screen.getByText('Large')).toBeInTheDocument()
  })

  it('renders checked toggles (defaultChecked)', () => {
    render(<ToggleSection />)
    const checkboxes = screen.getAllByRole('switch')
    const checkedOnes = checkboxes.filter((el) => (el as HTMLInputElement).defaultChecked)
    expect(checkedOnes.length).toBeGreaterThanOrEqual(3)
  })

  it('renders an unchecked toggle with label "Unchecked"', () => {
    render(<ToggleSection />)
    expect(screen.getByText('Unchecked')).toBeInTheDocument()
  })

  it('renders disabled toggles', () => {
    render(<ToggleSection />)
    const checkboxes = screen.getAllByRole('switch')
    const disabledOnes = checkboxes.filter((el) => (el as HTMLInputElement).disabled)
    expect(disabledOnes).toHaveLength(2)
  })

  it('renders "Disabled on" and "Disabled off" labels', () => {
    render(<ToggleSection />)
    expect(screen.getByText('Disabled on')).toBeInTheDocument()
    expect(screen.getByText('Disabled off')).toBeInTheDocument()
  })

  it('renders 6 total toggle switches (3 checked + 1 unchecked + 2 disabled)', () => {
    render(<ToggleSection />)
    expect(screen.getAllByRole('switch')).toHaveLength(6)
  })
})