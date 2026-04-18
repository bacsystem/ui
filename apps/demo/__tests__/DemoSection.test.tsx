import { describe, it, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { DemoSection } from '../components/DemoSection'

describe('DemoSection', () => {
  it('renders the title', () => {
    render(<DemoSection title="My Section"><p>content</p></DemoSection>)
    expect(screen.getByText('My Section')).toBeInTheDocument()
  })

  it('renders children inside the content area', () => {
    render(<DemoSection title="Test"><span data-testid="child">hello</span></DemoSection>)
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('renders the tag when provided', () => {
    render(<DemoSection title="Test" tag="Component"><p>x</p></DemoSection>)
    expect(screen.getByText('Component')).toBeInTheDocument()
  })

  it('does not render the tag element when tag prop is omitted', () => {
    render(<DemoSection title="Test"><p>x</p></DemoSection>)
    expect(document.querySelector('.demo-section__tag')).toBeNull()
  })

  it('renders the description when provided', () => {
    render(<DemoSection title="Test" description="A helpful description"><p>x</p></DemoSection>)
    expect(screen.getByText('A helpful description')).toBeInTheDocument()
  })

  it('does not render the description element when description prop is omitted', () => {
    render(<DemoSection title="Test"><p>x</p></DemoSection>)
    expect(document.querySelector('.demo-section__description')).toBeNull()
  })

  it('uses a <section> element as root', () => {
    const { container } = render(<DemoSection title="Test"><p>x</p></DemoSection>)
    expect(container.querySelector('section.demo-section')).toBeInTheDocument()
  })

  it('renders title inside an h2', () => {
    render(<DemoSection title="My Title"><p>x</p></DemoSection>)
    expect(screen.getByRole('heading', { level: 2, name: 'My Title' })).toBeInTheDocument()
  })

  it('renders the header and content divs with correct BEM classes', () => {
    const { container } = render(<DemoSection title="Test"><p>x</p></DemoSection>)
    expect(container.querySelector('.demo-section__header')).toBeInTheDocument()
    expect(container.querySelector('.demo-section__content')).toBeInTheDocument()
  })

  it('renders all three optional props together without error', () => {
    render(
      <DemoSection title="All Props" tag="Hook" description="Desc">
        <div>child content</div>
      </DemoSection>
    )
    expect(screen.getByText('All Props')).toBeInTheDocument()
    expect(screen.getByText('Hook')).toBeInTheDocument()
    expect(screen.getByText('Desc')).toBeInTheDocument()
    expect(screen.getByText('child content')).toBeInTheDocument()
  })

  it('renders an empty string title without crashing', () => {
    render(<DemoSection title=""><p>x</p></DemoSection>)
    expect(document.querySelector('.demo-section__title')).toBeInTheDocument()
  })

  it('toggles the props table when props are provided', () => {
    render(
      <DemoSection
        title="With Props"
        props={[
          { prop: 'label', type: 'string', default: '—', description: 'Etiqueta visible' },
        ]}
      >
        <p>x</p>
      </DemoSection>
    )

    const toggle = screen.getByRole('button', { name: 'Ver props' })
    expect(screen.queryByRole('table')).not.toBeInTheDocument()

    fireEvent.click(toggle)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('label')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Ocultar props' }))
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })
})