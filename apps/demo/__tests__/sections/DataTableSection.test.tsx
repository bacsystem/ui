import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DataTableSection } from '../../app/sections/DataTableSection'

describe('DataTableSection', () => {
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders without crashing', () => {
    render(<DataTableSection />)
    expect(screen.getByRole('heading', { name: 'DataTable' })).toBeInTheDocument()
  })

  it('has the id="datatable" anchor', () => {
    const { container } = render(<DataTableSection />)
    expect(container.querySelector('#datatable')).toBeInTheDocument()
  })

  it('renders the DemoSection with title "DataTable"', () => {
    render(<DataTableSection />)
    expect(screen.getByRole('heading', { name: 'DataTable' })).toBeInTheDocument()
  })

  it('renders the three state-toggle buttons', () => {
    render(<DataTableSection />)
    expect(screen.getByText('Con datos')).toBeInTheDocument()
    expect(screen.getByText('Cargando')).toBeInTheDocument()
    expect(screen.getByText('Vacío')).toBeInTheDocument()
  })

  it('shows data rows by default', () => {
    render(<DataTableSection />)
    expect(screen.getByText('F-0001')).toBeInTheDocument()
    expect(screen.getByText('F-0002')).toBeInTheDocument()
    expect(screen.getByText('F-0003')).toBeInTheDocument()
  })

  it('shows all 5 invoice rows in data state', () => {
    render(<DataTableSection />)
    expect(screen.getByText('F-0001')).toBeInTheDocument()
    expect(screen.getByText('F-0002')).toBeInTheDocument()
    expect(screen.getByText('F-0003')).toBeInTheDocument()
    expect(screen.getByText('F-0004')).toBeInTheDocument()
    expect(screen.getByText('F-0005')).toBeInTheDocument()
  })

  it('shows column headers', () => {
    render(<DataTableSection />)
    expect(screen.getByText('N°')).toBeInTheDocument()
    expect(screen.getByText('Cliente')).toBeInTheDocument()
    expect(screen.getByText('Total PEN')).toBeInTheDocument()
    expect(screen.getByText('Estado')).toBeInTheDocument()
    expect(screen.getByText('Acciones')).toBeInTheDocument()
  })

  it('switches to loading state when "Cargando" is clicked', () => {
    render(<DataTableSection />)
    fireEvent.click(screen.getByText('Cargando'))
    expect(screen.getByTestId('datatable-loading')).toBeInTheDocument()
  })

  it('hides data rows in loading state', () => {
    render(<DataTableSection />)
    fireEvent.click(screen.getByText('Cargando'))
    expect(screen.queryByText('F-0001')).not.toBeInTheDocument()
  })

  it('switches to empty state when "Vacío" is clicked', () => {
    render(<DataTableSection />)
    fireEvent.click(screen.getByText('Vacío'))
    expect(screen.getByTestId('datatable-empty')).toBeInTheDocument()
    expect(screen.getByText('No hay facturas registradas')).toBeInTheDocument()
  })

  it('returns to data state when "Con datos" is clicked after empty', () => {
    render(<DataTableSection />)
    fireEvent.click(screen.getByText('Vacío'))
    fireEvent.click(screen.getByText('Con datos'))
    expect(screen.getByText('F-0001')).toBeInTheDocument()
  })

  it('renders status badges for invoice rows', () => {
    render(<DataTableSection />)
    // 2 invoices have 'pagado', 2 have 'pendiente', 1 has 'vencido'
    expect(screen.getAllByText('pagado')).toHaveLength(2)
    expect(screen.getAllByText('pendiente')).toHaveLength(2)
    expect(screen.getAllByText('vencido')).toHaveLength(1)
  })

  it('renders view action button for invoice F-0001', () => {
    render(<DataTableSection />)
    expect(screen.getByLabelText('Ver F-0001')).toBeInTheDocument()
  })

  it('renders edit action button for invoice F-0001', () => {
    render(<DataTableSection />)
    expect(screen.getByLabelText('Editar F-0001')).toBeInTheDocument()
  })

  it('renders delete action button for invoice F-0001', () => {
    render(<DataTableSection />)
    expect(screen.getByLabelText('Eliminar F-0001')).toBeInTheDocument()
  })

  it('calls alert when view action is clicked', () => {
    render(<DataTableSection />)
    fireEvent.click(screen.getByLabelText('Ver F-0001'))
    expect(window.alert).toHaveBeenCalledWith('Ver: F-0001')
    expect(window.alert).toHaveBeenCalledTimes(1)
  })

  it('calls alert when edit action is clicked', () => {
    render(<DataTableSection />)
    fireEvent.click(screen.getByLabelText('Editar F-0002'))
    expect(window.alert).toHaveBeenCalledWith('Editar: F-0002')
    expect(window.alert).toHaveBeenCalledTimes(1)
  })

  it('calls alert when delete action is clicked', () => {
    render(<DataTableSection />)
    fireEvent.click(screen.getByLabelText('Eliminar F-0003'))
    expect(window.alert).toHaveBeenCalledWith('Eliminar: F-0003')
    expect(window.alert).toHaveBeenCalledTimes(1)
  })
})