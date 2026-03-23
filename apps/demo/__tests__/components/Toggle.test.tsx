import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toggle } from '../../../../packages/ui/src/components/Toggle/Toggle'

describe('Toggle – keyboard interaction', () => {
  it('toggles the hidden checkbox when Space is pressed (uncontrolled)', async () => {
    const user = userEvent.setup()
    render(<Toggle label="Test" defaultChecked={false} />)
    const switchEl = screen.getByRole('switch')
    const checkbox = switchEl.querySelector('input[type="checkbox"]') as HTMLInputElement

    expect(checkbox.checked).toBe(false)

    switchEl.focus()
    await user.keyboard(' ')

    expect(checkbox.checked).toBe(true)
  })

  it('fires onChange with the new value when Space is pressed (uncontrolled)', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Toggle label="Test" defaultChecked={false} onChange={onChange} />)

    screen.getByRole('switch').focus()
    await user.keyboard(' ')

    expect(onChange).toHaveBeenCalledOnce()
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('toggles the hidden checkbox when Enter is pressed', async () => {
    const user = userEvent.setup()
    render(<Toggle label="Test" defaultChecked={false} />)
    const switchEl = screen.getByRole('switch')
    const checkbox = switchEl.querySelector('input[type="checkbox"]') as HTMLInputElement

    switchEl.focus()
    await user.keyboard('{Enter}')

    expect(checkbox.checked).toBe(true)
  })

  it('does not toggle when disabled', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Toggle label="Test" defaultChecked={false} disabled onChange={onChange} />)

    screen.getByRole('switch').focus()
    await user.keyboard(' ')

    expect(onChange).not.toHaveBeenCalled()
  })

  it('calls onChange with correct value in controlled mode', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Toggle label="Test" checked={false} onChange={onChange} />)

    screen.getByRole('switch').focus()
    await user.keyboard(' ')

    expect(onChange).toHaveBeenCalledOnce()
    expect(onChange).toHaveBeenCalledWith(true)
  })
})
