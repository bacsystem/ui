# Public API Contract: @bacsystem/ui v1.2.0

## New exports from `@bacsystem/ui`

```typescript
// Tooltip
export { Tooltip } from './components/Tooltip'
export type { TooltipProps, TooltipPlacement } from './components/Tooltip'

// Skeleton
export { Skeleton } from './components/Skeleton'
export type { SkeletonProps, SkeletonVariant } from './components/Skeleton'

// Select
export { Select } from './components/Select'
export type { SelectProps, SelectOption } from './components/Select'

// Breadcrumb
export { Breadcrumb } from './components/Breadcrumb'
export type { BreadcrumbProps, BreadcrumbItem } from './components/Breadcrumb'
```

## Component signatures

### Tooltip
```typescript
function Tooltip(props: TooltipProps): JSX.Element

interface TooltipProps {
  readonly content: React.ReactNode        // texto o JSX del tooltip
  readonly children: React.ReactElement    // elemento disparador
  readonly placement?: TooltipPlacement    // default: 'top'
  readonly disabled?: boolean              // default: false
  readonly className?: string
}
type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
```

### Skeleton
```typescript
function Skeleton(props: SkeletonProps): JSX.Element

interface SkeletonProps {
  readonly variant?: SkeletonVariant       // default: 'rect'
  readonly width?: string | number
  readonly height?: string | number
  readonly className?: string
}
type SkeletonVariant = 'text' | 'circle' | 'rect'
```

### Select
```typescript
function Select(props: SelectProps): JSX.Element

interface SelectProps {
  readonly options: SelectOption[]
  readonly label?: string
  readonly placeholder?: string
  readonly hint?: string
  readonly error?: string
  readonly success?: string
  readonly disabled?: boolean
  readonly inputSize?: 'sm' | 'md' | 'lg' // default: 'md'
  readonly value?: string                  // controlled
  readonly defaultValue?: string           // uncontrolled
  readonly onChange?: (value: string) => void
  readonly className?: string
}
interface SelectOption {
  readonly value: string
  readonly label: string
  readonly disabled?: boolean
}
```

### Breadcrumb
```typescript
function Breadcrumb(props: BreadcrumbProps): JSX.Element

interface BreadcrumbProps {
  readonly items: BreadcrumbItem[]
  readonly separator?: string              // default: '/'
  readonly className?: string
}
interface BreadcrumbItem {
  readonly label: string
  readonly href?: string
}
```

## CSS classes added to `dist/styles.css`

- `.bac-tooltip__wrapper` — inline-flex wrapper con position:relative
- `.bac-tooltip__content` — el globo del tooltip, position:absolute
- `.bac-tooltip--top/bottom/left/right` — variantes de placement
- `.bac-skeleton` — base + shimmer animation
- `.bac-skeleton--text/circle/rect` — variantes de forma
- `.bac-select` — wrapper del select
- `.bac-select__field` — el `<select>` nativo estilizado
- `.bac-select__caret` — el icono ChevronDown
- `.bac-select--sm/md/lg` — tamaños
- `.bac-select--error/success/disabled` — estados
- `.bac-breadcrumb` — nav container
- `.bac-breadcrumb__list` — ol
- `.bac-breadcrumb__item` — li con `--current` para el último
- `.bac-breadcrumb__separator` — el separador entre items
