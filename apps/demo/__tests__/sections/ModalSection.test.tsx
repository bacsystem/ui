import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ModalSection } from '../../app/sections/ModalSection'

describe('ModalSection', () => {
  it('renders without crashing', () => {
    render(<ModalSection />)
    expect(screen.getByText('Abrir Modal')).toBeInTheDocument()
  })

  it('has the id="modal" anchor', () => {
    const { container } = render(<ModalSection />)
    expect(container.querySelector('#modal')).toBeInTheDocument()
  })

  it('renders the DemoSection with title "Modal"', () => {
    render(<ModalSection />)
    expect(screen.getByRole('heading', { name: 'Modal' })).toBeInTheDocument()
  })

  it('renders the "Abrir Modal" button', () => {
    render(<ModalSection />)
    expect(screen.getByText('Abrir Modal')).toBeInTheDocument()
  })

  it('modal is closed by default (dialog not present)', () => {
    render(<ModalSection />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens the modal when "Abrir Modal" button is clicked', () => {
    render(<ModalSection />)
    fireEvent.click(screen.getByText('Abrir Modal'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('displays the modal title "Modal de ejemplo"', () => {
    render(<ModalSection />)
    fireEvent.click(screen.getByText('Abrir Modal'))
    expect(screen.getByText('Modal de ejemplo')).toBeInTheDocument()
  })

  it('displays modal body text after opening', () => {
    render(<ModalSection />)
    fireEvent.click(screen.getByText('Abrir Modal'))
    expect(screen.getByText(/Este modal tiene focus trap activado/i)).toBeInTheDocument()
  })

  it('closes the modal when "Cancelar" is clicked', () => {
    render(<ModalSection />)
    fireEvent.click(screen.getByText('Abrir Modal'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Cancelar'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes the modal when "Confirmar" is clicked', () => {
    render(<ModalSection />)
    fireEvent.click(screen.getByText('Abrir Modal'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Confirmar'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes the modal when the close button (×) is clicked', () => {
    render(<ModalSection />)
    fireEvent.click(screen.getByText('Abrir Modal'))
    fireEvent.click(screen.getByLabelText('close'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('can be opened again after being closed', () => {
    render(<ModalSection />)
    fireEvent.click(screen.getByText('Abrir Modal'))
    fireEvent.click(screen.getByText('Cancelar'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('Abrir Modal'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('renders the modal with size="md"', () => {
    render(<ModalSection />)
    fireEvent.click(screen.getByText('Abrir Modal'))
    expect(screen.getByRole('dialog')).toHaveAttribute('data-size', 'md')
  })
})