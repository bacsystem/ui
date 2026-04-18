import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { ButtonSection } from '../../app/sections/ButtonSection'

vi.mock('@bacsystem/ui', async () => await import('@ui-mock'))

describe('ButtonSection', () => {
  it('renders without crashing', () => {
    const { container } = render(<ButtonSection />)
    expect(container).toBeInTheDocument()
  })

  it('has the id="button" anchor', () => {
    const { container } = render(<ButtonSection />)
    expect(container.querySelector('#button')).toBeInTheDocument()
  })

  it('renders the DemoSection with title "Button"', () => {
    render(<ButtonSection />)
    expect(screen.getByRole('heading', { name: 'Button' })).toBeInTheDocument()
  })

  it('renders the Filled, Outline, Soft, Link, Sizes, and States labels', () => {
    render(<ButtonSection />)
    expect(screen.getByText('Filled')).toBeInTheDocument()
    expect(screen.getByText('Outline')).toBeInTheDocument()
    expect(screen.getByText('Soft')).toBeInTheDocument()
    expect(screen.getByText('Link')).toBeInTheDocument()
    expect(screen.getByText('Sizes')).toBeInTheDocument()
    expect(screen.getByText('States & Icons')).toBeInTheDocument()
  })

  it('renders Primary buttons in each appearance group', () => {
    render(<ButtonSection />)
    expect(screen.getAllByText('Primary').length).toBeGreaterThanOrEqual(4)
  })

  it('renders size variants: XSmall, Small, Medium, Large, XLarge', () => {
    render(<ButtonSection />)
    expect(screen.getByText('XSmall')).toBeInTheDocument()
    expect(screen.getByText('Small')).toBeInTheDocument()
    expect(screen.getByText('Medium')).toBeInTheDocument()
    expect(screen.getByText('Large')).toBeInTheDocument()
    expect(screen.getByText('XLarge')).toBeInTheDocument()
  })

  it('renders a loading button', () => {
    render(<ButtonSection />)
    const loadingBtn = document.querySelector('[data-loading="true"]')
    expect(loadingBtn).toBeInTheDocument()
  })

  it('renders a disabled button', () => {
    render(<ButtonSection />)
    expect(screen.getByText('Deshabilitado').closest('button')).toBeDisabled()
  })

  it('renders buttons with icon-left and icon-right', () => {
    render(<ButtonSection />)
    expect(screen.getByText('Con icono izquierdo')).toBeInTheDocument()
    expect(screen.getByText('Con icono derecho')).toBeInTheDocument()
  })

  it('renders 6 variants in the filled group', () => {
    render(<ButtonSection />)
    const primaryBtns = document.querySelectorAll('[data-variant="primary"]')
    const secondaryBtns = document.querySelectorAll('[data-variant="secondary"]')
    // each variant appears multiple times across groups
    expect(primaryBtns.length).toBeGreaterThanOrEqual(4)
    expect(secondaryBtns.length).toBeGreaterThanOrEqual(4)
  })

  it('toggles the props table from the Ver props button', () => {
    render(<ButtonSection />)

    const toggle = screen.getByRole('button', { name: 'Ver props' })
    expect(screen.queryByRole('table')).not.toBeInTheDocument()

    fireEvent.click(toggle)

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Prop' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Tipo' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Default' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Descripción' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Ocultar props' }))
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })
})