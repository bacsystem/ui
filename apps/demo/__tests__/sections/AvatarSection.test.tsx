import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AvatarSection } from '../../app/sections/AvatarSection'

vi.mock('@bacsystem/ui', async () => await import('@ui-mock'))

describe('AvatarSection', () => {
  it('renders without crashing', () => {
    const { container } = render(<AvatarSection />)
    expect(container).toBeInTheDocument()
  })

  it('has the id="avatar" anchor', () => {
    const { container } = render(<AvatarSection />)
    expect(container.querySelector('#avatar')).toBeInTheDocument()
  })

  it('renders the DemoSection with title "Avatar"', () => {
    render(<AvatarSection />)
    expect(screen.getByRole('heading', { name: 'Avatar' })).toBeInTheDocument()
  })

  it('renders the Soft, Filled, and Outline label groups', () => {
    render(<AvatarSection />)
    expect(screen.getByText('Soft')).toBeInTheDocument()
    expect(screen.getByText('Filled')).toBeInTheDocument()
    expect(screen.getByText('Outline')).toBeInTheDocument()
  })

  it('renders avatars for xs, sm, md, lg, xl sizes', () => {
    render(<AvatarSection />)
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
    for (const s of sizes) {
      const avatars = document.querySelectorAll(`[data-size="${s}"]`)
      // 3 appearances × 1 per appearance row = at least 3 per size
      expect(avatars.length).toBeGreaterThanOrEqual(3)
    }
  })

  it('renders filled avatars with appearance="filled"', () => {
    render(<AvatarSection />)
    const filledAvatars = document.querySelectorAll('[data-appearance="filled"]')
    // 5 sizes + 1 image + 1 fallback per row = 7 per appearance group
    expect(filledAvatars.length).toBeGreaterThanOrEqual(7)
  })

  it('renders outline avatars with appearance="outline"', () => {
    render(<AvatarSection />)
    const outlineAvatars = document.querySelectorAll('[data-appearance="outline"]')
    expect(outlineAvatars.length).toBeGreaterThanOrEqual(7)
  })

  it('renders avatars with initials "AB"', () => {
    render(<AvatarSection />)
    const initials = screen.getAllByText('AB')
    expect(initials.length).toBeGreaterThanOrEqual(15) // 5 sizes × 3 appearances
  })

  it('renders image avatars with alt="Usuario"', () => {
    render(<AvatarSection />)
    const images = screen.getAllByAltText('Usuario')
    expect(images).toHaveLength(3) // one per appearance group
  })
})