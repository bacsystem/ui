import React from 'react'
import { vi } from 'vitest'

// ── Hooks ──────────────────────────────────────────────────────────────────

const mockToggleTheme = vi.fn()
const mockSetTheme = vi.fn()

export const useTheme = vi.fn(() => ({
  theme: 'light' as 'light' | 'dark' | 'system',
  resolvedTheme: 'light' as 'light' | 'dark',
  setTheme: mockSetTheme,
  toggleTheme: mockToggleTheme,
}))

export const useBreakpoint = vi.fn(() => ({
  current: 'md' as 'sm' | 'md' | 'lg' | 'xl',
  isMobile: false,
  isTablet: true,
  isDesktop: false,
}))

function renderMockIcon(icon: unknown) {
  if (!icon) {
    return null
  }

  if (React.isValidElement(icon)) {
    return icon
  }

  if (typeof icon === 'function') {
    const IconComponent = icon as React.ComponentType<{ size?: number }>
    return <IconComponent size={16} />
  }

  return null
}

// ── Components ─────────────────────────────────────────────────────────────

export const Button = vi.fn(({ children, onClick, variant, size, loading, disabled, iconLeft: IconLeft, iconRight: IconRight, ...rest }: any) => (
  <button onClick={onClick} disabled={disabled || loading} data-variant={variant} data-size={size} data-loading={loading} {...rest}>
    {renderMockIcon(IconLeft)}
    {children}
    {renderMockIcon(IconRight)}
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

export const Label = vi.fn(({ children, required, ...rest }: any) => (
  <label {...rest}>
    {children}
    {required ? <span aria-hidden="true">*</span> : null}
  </label>
))

export const Spinner = vi.fn(({ size }: any) => (
  <span aria-label="loading" data-size={size} />
))

export const ProgressBar = vi.fn(({ value = 0, label, showLabel }: any) => (
  <div role="progressbar" aria-label={label} aria-valuenow={value}>
    {showLabel ? <span>{label} {value}%</span> : null}
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
                {col.render ? col.render(row) : row[col.key] as React.ReactNode}
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

export const Tooltip = vi.fn(({ children, content, placement, disabled }: any) => (
  <span data-tooltip={typeof content === 'string' ? content : 'node'} data-placement={placement} data-disabled={disabled}>
    {children}
  </span>
))

export const Skeleton = vi.fn(({ variant, width, height, className }: any) => (
  <span data-variant={variant} data-width={width} data-height={height} className={className} aria-hidden="true" />
))

export const Select = vi.fn(({ label, options = [], placeholder, value, defaultValue, disabled, error, success, hint, onChange }: any) => (
  <label>
    {label && <span>{label}</span>}
    <select
      aria-label={label}
      defaultValue={defaultValue}
      value={value}
      disabled={disabled}
      onChange={(event) => onChange?.(event.target.value)}
      aria-invalid={!!error}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option: any) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <span data-error>{error}</span>}
    {success && <span data-success>{success}</span>}
    {hint && <span data-hint>{hint}</span>}
  </label>
))

export const Breadcrumb = vi.fn(({ items, separator = '/' }: any) => (
  <nav aria-label="Breadcrumb">
    <ol>
      {items.map((item: any, index: number) => (
        <li key={`${item.label}-${index}`}>
          {index > 0 ? <span aria-hidden="true">{separator}</span> : null}
          {index === items.length - 1 || !item.href ? <span aria-current={index === items.length - 1 ? 'page' : undefined}>{item.label}</span> : <a href={item.href}>{item.label}</a>}
        </li>
      ))}
    </ol>
  </nav>
))

export const Table = vi.fn(({ children, ...rest }: any) => <div data-testid="table" {...rest}>{children}</div>)
export const TableHeader = vi.fn(({ children }: any) => <div data-testid="table-header">{children}</div>)
export const TableBody = vi.fn(({ children }: any) => <div data-testid="table-body">{children}</div>)
export const TableFooter = vi.fn(({ children }: any) => <div data-testid="table-footer">{children}</div>)
export const TableRow = vi.fn(({ children }: any) => <div data-testid="table-row">{children}</div>)
export const TableHead = vi.fn(({ children }: any) => <span data-testid="table-head">{children}</span>)
export const TableCell = vi.fn(({ children, ...rest }: any) => <span data-testid="table-cell" {...rest}>{children}</span>)
export const TableCaption = vi.fn(({ children }: any) => <div data-testid="table-caption">{children}</div>)

export const EmptyState = vi.fn(({ title, description, actions }: any) => (
  <div data-testid="empty-state">
    <h3>{title}</h3>
    <p>{description}</p>
    <div>{actions}</div>
  </div>
))

export const Stepper = vi.fn(({ children, orientation }: any) => (
  <ol data-testid="stepper" data-orientation={orientation ?? 'horizontal'}>{children}</ol>
))

export const StepperStep = vi.fn(({ label, description, status }: any) => (
  <li data-testid="stepper-step" data-status={status}>
    <span>{label}</span>
    {description ? <span>{description}</span> : null}
  </li>
))

export const Header = vi.fn(({ title, subtitle, actions }: any) => (
  <div data-testid="header">
    <h3>{title}</h3>
    {subtitle ? <p>{subtitle}</p> : null}
    <div>{actions}</div>
  </div>
))

export const Sidebar = vi.fn(({ children, ...rest }: any) => <aside data-testid="sidebar" {...rest}>{children}</aside>)
export const SidebarHeader = vi.fn(({ children }: any) => <div data-testid="sidebar-header">{children}</div>)
export const SidebarContent = vi.fn(({ children }: any) => <div data-testid="sidebar-content">{children}</div>)
export const SidebarFooter = vi.fn(({ children }: any) => <div data-testid="sidebar-footer">{children}</div>)
export const SidebarNav = vi.fn(({ children }: any) => <nav data-testid="sidebar-nav">{children}</nav>)
export const SidebarNavGroup = vi.fn(({ children, label }: any) => (
  <div data-testid="sidebar-nav-group">
    <span>{label}</span>
    {children}
  </div>
))
export const SidebarNavItem = vi.fn(({ children, href, active }: any) => <a href={href} data-active={active}>{children}</a>)

// Types
export type DataTableColumn<T> = {
  key: keyof T | string
  header: string
  render?: (row: T) => React.ReactNode
  className?: string
}