import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { InputSection } from '../../app/sections/InputSection'

describe('InputSection', () => {
  it('renders without crashing', () => {
    const { container } = render(<InputSection />)
    expect(container).toBeInTheDocument()
  })

  it('has the id="input" anchor', () => {
    const { container } = render(<InputSection />)
    expect(container.querySelector('#input')).toBeInTheDocument()
  })

  it('renders a DemoSection with title "Input"', () => {
    render(<InputSection />)
    const headings = screen.getAllByRole('heading')
    expect(headings.some((h) => h.textContent === 'Input')).toBe(true)
  })

  it('renders "States" section label fields', () => {
    render(<InputSection />)
    // "Email" appears in States and Floating Label; "Con éxito"/"Con error" appear in States and Floating Label icons sections
    expect(screen.getAllByText('Email').length).toBeGreaterThanOrEqual(2)
    expect(screen.getByText('Con hint')).toBeInTheDocument()
    expect(screen.getAllByText('Con éxito').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Con error').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Deshabilitado')).toBeInTheDocument()
  })

  it('renders a disabled input', () => {
    render(<InputSection />)
    const inputs = screen.getAllByRole('textbox')
    const disabledInputs = inputs.filter((el) => (el as HTMLInputElement).disabled)
    expect(disabledInputs.length).toBeGreaterThanOrEqual(1)
  })

  it('renders the size labels (Small, Medium, Large)', () => {
    render(<InputSection />)
    expect(screen.getByText('Small')).toBeInTheDocument()
    expect(screen.getByText('Medium')).toBeInTheDocument()
    expect(screen.getByText('Large')).toBeInTheDocument()
  })

  it('renders inputs with error attribute for error state', () => {
    render(<InputSection />)
    const errorInputs = screen.getAllByRole('textbox').filter(
      (el) => el.getAttribute('aria-invalid') === 'true'
    )
    expect(errorInputs.length).toBeGreaterThanOrEqual(1)
  })

  it('renders "Icons" section with icon-related labels', () => {
    render(<InputSection />)
    expect(screen.getByText('Icono izquierdo')).toBeInTheDocument()
    expect(screen.getByText('Icono derecho')).toBeInTheDocument()
    expect(screen.getByText('Ambos iconos')).toBeInTheDocument()
  })

  it('renders Prefix & Suffix section', () => {
    render(<InputSection />)
    expect(screen.getByText('Prefijo URL')).toBeInTheDocument()
    expect(screen.getByText('Precio')).toBeInTheDocument()
    expect(screen.getByText('Peso')).toBeInTheDocument()
  })

  it('renders prefix addons', () => {
    render(<InputSection />)
    const prefixEls = document.querySelectorAll('[data-addon="prefix"]')
    expect(prefixEls.length).toBeGreaterThanOrEqual(3)
  })

  it('renders suffix addons', () => {
    render(<InputSection />)
    const suffixEls = document.querySelectorAll('[data-addon="suffix"]')
    expect(suffixEls.length).toBeGreaterThanOrEqual(2)
  })

  it('renders Floating Label section', () => {
    render(<InputSection />)
    expect(screen.getByText('Nombre completo')).toBeInTheDocument()
  })

  it('renders floating inputs', () => {
    render(<InputSection />)
    const floatingInputs = document.querySelectorAll('[data-floating="true"]')
    expect(floatingInputs.length).toBeGreaterThanOrEqual(5)
  })
})