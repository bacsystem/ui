# Data Model: @bacsystem/ui — React Component Library

**Phase**: 1 | **Date**: 2026-03-22 | **Plan**: [plan.md](./plan.md)

This document defines the TypeScript prop interfaces, token schema, and hook return types
that form the library's public data contracts.

---

## Component Prop Interfaces

### Button

```ts
type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger' | 'success'
type ButtonSize    = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  ButtonVariant   // default: 'primary'
  size?:     ButtonSize      // default: 'md'
  loading?:  boolean         // shows Loader2 icon; disables interaction
  iconLeft?: React.ReactNode // node rendered before label
  iconRight?: React.ReactNode
  className?: string
}
```

### Badge

```ts
type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'

interface BadgeProps {
  variant?:  BadgeVariant    // default: 'default'
  children:  React.ReactNode
  className?: string
}
```

### Input

```ts
type InputVariant = 'default' | 'error' | 'disabled'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?:        string
  error?:        string      // triggers error variant + AlertCircle icon
  helperText?:   string
  className?:    string
}
```

### Card

```ts
type CardVariant = 'default' | 'elevated' | 'outlined' | 'tinted'
type CardSize    = 'sm' | 'md' | 'lg'

interface CardProps {
  variant?:  CardVariant     // default: 'default'
  size?:     CardSize        // default: 'md'
  children:  React.ReactNode
  className?: string
}
```

### Alert

```ts
type AlertVariant = 'info' | 'success' | 'warning' | 'error'

interface AlertProps {
  variant:   AlertVariant
  title?:    string
  children:  React.ReactNode
  onClose?:  () => void      // renders X button when provided
  className?: string
}
```

### Avatar

```ts
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  src?:       string         // image URL
  initials?:  string         // 1-2 chars; shown when no src
  alt?:       string         // img alt text when src provided
  size?:      AvatarSize     // default: 'md'
  className?: string
  // Fallback chain: src → initials → User icon
}
```

### Toggle

```ts
type ToggleSize = 'sm' | 'md' | 'lg'

interface ToggleProps {
  checked:    boolean
  onChange:   (checked: boolean) => void
  disabled?:  boolean
  size?:      ToggleSize     // default: 'md'
  label?:     string         // aria-label when provided
  className?: string
}
```

### Modal

```ts
type ModalSize = 'sm' | 'md' | 'lg'

interface ModalProps {
  open:       boolean
  onClose:    () => void
  title?:     string
  size?:      ModalSize      // default: 'md'
  children:   React.ReactNode
  className?: string
  // Closes on Escape keypress and backdrop click
}
```

### DataTable

```ts
interface DataTableColumn<T> {
  key:      keyof T
  header:   string
  render?:  (value: T[keyof T], row: T) => React.ReactNode
  width?:   string
}

interface DataTableProps<T extends object> {
  columns:    DataTableColumn<T>[]
  data:       T[]
  loading?:   boolean        // shows Loader2 state
  emptyText?: string         // shown with Inbox icon when data is empty
  className?: string
}
```

### StatCard

```ts
type StatCardColor = 'blue' | 'teal' | 'amber' | 'green' | 'purple'
type StatCardTrend = 'up' | 'down' | 'neutral'

interface StatCardProps {
  title:      string
  value:      string | number
  color?:     StatCardColor  // default: 'blue'
  trend?:     StatCardTrend
  trendValue?: string        // e.g. "+12%" shown beside trend icon
  icon?:      React.ReactNode
  className?: string
}
```

### Tabs

```ts
interface TabItem {
  id:       string
  label:    string
  content:  React.ReactNode
  disabled?: boolean
}

interface TabsProps {
  items:     TabItem[]
  defaultTab?: string        // id of initially active tab
  onChange?: (id: string) => void
  className?: string
}
```

---

## Hook Return Types

### useTheme

```ts
type Theme = 'light' | 'dark'

interface UseThemeReturn {
  theme:       Theme
  setTheme:    (theme: Theme) => void
  toggleTheme: () => void
}

// Persistence: localStorage key = 'bacsystem-ui-theme'
// SSR safety: reads localStorage only on client; defaults to 'light'
```

### useBreakpoint

```ts
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl'

interface UseBreakpointReturn {
  isMobile:   boolean        // current === 'sm'
  isTablet:   boolean        // current === 'md'
  isDesktop:  boolean        // current === 'lg' || current === 'xl'
  current:    Breakpoint
}

// Breakpoint thresholds (matches common responsive conventions):
//   sm:  0–767px   (isMobile)
//   md:  768–1023px (isTablet)
//   lg:  1024–1279px (isDesktop)
//   xl:  1280px+   (isDesktop)
// Cleanup: ResizeObserver/listener removed automatically on unmount
```

---

## Token Schema

### Color Token Naming Convention

```
--color-{scale}-{shade}

Scales:  primary | accent | success | warning | error | info | neutral
Shades:  50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
         base | light | dark   (semantic shades for semantic scales)
```

### Spacing Token Naming Convention

```
--sp-{n}     where n ∈ {1, 2, 3, 4, 5, 6, 8, 10, 12, 16}
Values:      n × 4px  (e.g. --sp-4 = 16px)
```

### Border-Radius Token Naming Convention

```
--radius-{size}

Sizes:  sm (4px) | base (8px) | md (12px) | lg (16px) | xl (24px) | full (9999px)
```

### Shadow Token Naming Convention

```
--shadow-{size}

Sizes:  sm | md | lg | xl
Usage:  sm → subtle; md → Card elevated; lg → dropdowns; xl → Modal
```

### Typography Token Naming Convention

```
--font-{role}

Roles:  display (Plus Jakarta Sans) | body (Inter) | mono (JetBrains Mono)
```

---

## Demo Sample Data (DataTable Section)

The demo DataTable uses OperaAI invoice domain data:

```ts
interface DemoInvoice {
  numero:   string   // e.g. "F001-00123"
  cliente:  string   // e.g. "Empresa Peruana S.A.C."
  total:    number   // e.g. 1250.00 (PEN)
  estado:   'pagado' | 'pendiente' | 'vencido'
}
```

Sample rows (5 records sufficient for demo purposes):

| N° | Cliente | Total (PEN) | Estado |
|----|---------|-------------|--------|
| F001-00121 | Tech Solutions S.A.C. | 3,200.00 | pagado |
| F001-00122 | Distribuidora Lima E.I.R.L. | 850.50 | pendiente |
| F001-00123 | Consultora Andina S.A. | 12,400.00 | pagado |
| F001-00124 | Importaciones Pacífico S.R.L. | 6,750.00 | vencido |
| F001-00125 | Servicios Digitales Peru S.A.C. | 2,100.00 | pendiente |
