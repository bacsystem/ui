import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TokensSection } from '../../app/sections/TokensSection'

describe('TokensSection', () => {
  it('renders the token sections and their dynamic showcases', () => {
    render(<TokensSection />)

    expect(screen.getByRole('heading', { name: 'Colors' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Typography' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Spacing & Radius' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Shadows' })).toBeInTheDocument()

    expect(screen.getAllByText('Dynamic Motion').length).toBe(4)
    expect(screen.getByRole('region', { name: 'Colors motion playground' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Typography motion playground' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Spacing and Radius motion playground' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Shadows motion playground' })).toBeInTheDocument()
  })
})