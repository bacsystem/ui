import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TabsSection } from '../../app/sections/TabsSection'

vi.mock('@bacsystem/ui', async () => await import('@ui-mock'))

describe('TabsSection', () => {
  it('renders without crashing', () => {
    const { container } = render(<TabsSection />)
    expect(container).toBeInTheDocument()
  })

  it('has the id="tabs" anchor', () => {
    const { container } = render(<TabsSection />)
    expect(container.querySelector('#tabs')).toBeInTheDocument()
  })

  it('renders the DemoSection with title "Tabs"', () => {
    render(<TabsSection />)
    expect(screen.getByRole('heading', { name: 'Tabs' })).toBeInTheDocument()
  })

  it('renders all 6 tab labels', () => {
    render(<TabsSection />)
    const tabLabels = ['Resumen', 'Editar', 'Imágenes', 'Historial', 'Stock', 'Promociones']
    for (const label of tabLabels) {
      expect(screen.getByRole('tab', { name: label })).toBeInTheDocument()
    }
  })

  it('defaults to the "Resumen" tab', () => {
    render(<TabsSection />)
    expect(screen.getByRole('tab', { name: 'Resumen' })).toHaveAttribute('aria-selected', 'true')
  })

  it('shows the Resumen tab panel content by default (StatCards)', () => {
    render(<TabsSection />)
    expect(screen.getByText('Ventas del mes')).toBeInTheDocument()
  })

  it('switches to the "Editar" tab on click', async () => {
    render(<TabsSection />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('tab', { name: 'Editar' }))
    expect(screen.getByRole('tab', { name: 'Editar' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Nombre del producto')).toBeInTheDocument()
  })

  it('switches to the "Historial" tab on click', async () => {
    render(<TabsSection />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('tab', { name: 'Historial' }))
    expect(screen.getByText(/Precio actualizado/i)).toBeInTheDocument()
  })

  it('switches to the "Stock" tab on click', async () => {
    render(<TabsSection />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('tab', { name: 'Stock' }))
    expect(screen.getByText('Stock total')).toBeInTheDocument()
  })

  it('switches to the "Promociones" tab on click', async () => {
    render(<TabsSection />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('tab', { name: 'Promociones' }))
    expect(screen.getByText('Black Friday 2026')).toBeInTheDocument()
  })

  it('has a tablist container', () => {
    render(<TabsSection />)
    expect(screen.getAllByRole('tablist').length).toBeGreaterThanOrEqual(1)
  })

  it('has a tabpanel container', () => {
    render(<TabsSection />)
    expect(screen.getAllByRole('tabpanel').length).toBeGreaterThanOrEqual(1)
  })
})