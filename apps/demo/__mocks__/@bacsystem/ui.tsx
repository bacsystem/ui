import React from 'react'
import { vi } from 'vitest'

// ── Hooks ──────────────────────────────────────────────────────────────────

const mockToggleTheme = vi.fn()
const mockSetTheme = vi.fn()

export const useTheme = vi.fn(() => ({
  theme: 'light' as 'light' | 'dark',
  setTheme: mockSetTheme,
  toggleTheme: mockToggleTheme,
}))

export const useBreakpoint = vi.fn(() => ({
  current: 'md' as 'sm' | 'md' | 'lg' | 'xl',
  isMobile: false,
  isTablet: true,
  isDesktop: false,
}))

// ── Components ─────────────────────────────────────────────────────────────

export const Button = vi.fn(({ children, onClick, variant, size, loading, disabled, iconLeft: IconLeft, iconRight: IconRight, ...rest }: any) => (
  <button onClick={onClick} disabled={disabled || loading} data-variant={variant} data-size={size} data-loading={loading} {...rest}>
    {IconLeft && <IconLeft size={16} />}
    {children}
    {IconRight && <IconRight size={16} />}
  </button>
))

export const Badge = vi.fn(({ children, variant, appearance, outline }: any) => (
  <span data-variant={variant} data-appearance={appearance} data-outline={outline}>{children}</span>
))

export const Input = vi.fn(({ label, placeholder, error, success, hint, disabled, defaultValue, inputSize, iconLeft: IconLeft, iconRight: IconRight, prefix, suffix, floating }: any) => (
  <div>
    {label && <label>{label}</label>}
    {prefix && <span data-addon="prefix">{prefix}</span>}
    {IconLeft && <IconLeft size={16} aria-hidden="true" />}
    <input placeholder={placeholder} defaultValue={defaultValue} disabled={disabled} aria-invalid={!!error} data-size={inputSize} data-floating={floating} />
    {IconRight && <IconRight size={16} aria-hidden="true" />}
    {suffix && <span data-addon="suffix">{suffix}</span>}
    {error && <span data-error>{error}</span>}
    {success && <span data-success>{success}</span>}
    {hint && <span data-hint>{hint}</span>}
  </div>
))

export const Card = vi.fn(({ children, variant, size, style }: any) => (
  <div data-variant={variant} data-size={size} style={style}>{children}</div>
))

export const Alert = vi.fn(({ children, variant, appearance, title, onClose }: any) => (
  <div role="alert" data-variant={variant} data-appearance={appearance}>
    {title && <strong>{title}</strong>}
    <span>{children}</span>
    {onClose && <button onClick={onClose} aria-label="close">×</button>}
  </div>
))

export const Avatar = vi.fn(({ initials, src, alt, size, appearance }: Readonly<{
  initials?: string
  src?: string
  alt?: string
  size?: string
  appearance?: string
}>) => {
  let avatarContent: React.ReactNode
  if (src) {
    avatarContent = <img src={src} alt={alt} />
  } else if (initials) {
    avatarContent = <span>{initials}</span>
  } else {
    avatarContent = <span aria-hidden="true">icon</span>
  }
  return (
    <div data-size={size} data-appearance={appearance} aria-label={alt || initials || 'avatar'}>
      {avatarContent}
    </div>
  )
})

export const Toggle = vi.fn(({ label, size, checked, defaultChecked, disabled, onChange }: any) => (
  <label>
    <input
      type="checkbox"
      role="switch"
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onChange={onChange}
    />
    {label && <span>{label}</span>}
  </label>
))

export const Modal = vi.fn(({ open, onClose, title, size, children }: any) => {
  if (!open) return null
  return (
    <dialog open aria-modal="true" data-size={size}>
      <div>
        {title && <h2>{title}</h2>}
        <button onClick={onClose} aria-label="close">×</button>
      </div>
      <div>{children}</div>
    </dialog>
  )
})

export const DataTable = vi.fn(({ columns, data, loading, emptyText, getRowKey }: Readonly<{
  columns: DataTableColumn<Record<string, unknown>>[]
  data: Record<string, unknown>[]
  loading?: boolean
  emptyText?: string
  getRowKey?: (row: Record<string, unknown>, index: number) => string | number
}>) => {
  if (loading) return <div data-testid="datatable-loading">Loading...</div>
  if (!data || data.length === 0) return <div data-testid="datatable-empty">{emptyText}</div>
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => <th key={String(col.key)}>{col.header}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={getRowKey ? getRowKey(row, rowIndex) : String(rowIndex)}>
            {columns.map((col) => (
              <td key={String(col.key)}>
                {col.render ? col.render(row) : row[col.key as string] as React.ReactNode}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
})

export const StatCard = vi.fn(({ title, value, trend, trendValue, color, appearance }: any) => (
  <div data-color={color} data-appearance={appearance} data-trend={trend}>
    <span data-testid="statcard-title">{title}</span>
    <span data-testid="statcard-value">{value}</span>
    {trendValue && <span data-testid="statcard-trend">{trendValue}</span>}
  </div>
))

export const Tabs = vi.fn(({ items, defaultTab }: any) => {
  const safeItems: any[] = items || []
  const [active, setActive] = React.useState(defaultTab || (safeItems[0]?.id ?? ''))
  const current = safeItems.find((item: any) => item.id === active)
  return (
    <div>
      <div role="tablist">
        {safeItems.map((item: any) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={item.id === active}
            onClick={() => setActive(item.id)}
            disabled={item.disabled}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">
        {current?.content}
      </div>
    </div>
  )
})

// Types
export type DataTableColumn<T> = {
  key: keyof T | string
  header: string
  render?: (row: T) => React.ReactNode
  className?: string
}