# Data Model: Absorb Local UI Components

**Feature**: 004-absorb-local-components
**Date**: 2026-04-17

## Component Props Interfaces

This feature has no persistent data model. The "entities" are component prop interfaces — the TypeScript contracts that consumers depend on.

### Label

```
LabelProps extends HTMLLabelAttributes
  ├── htmlFor?: string          # Links label to form control
  ├── required?: boolean        # Shows required indicator
  └── className?: string        # Forwarded to <label>
```

### Spinner

```
SpinnerSize = 'sm' | 'md' | 'lg'

SpinnerProps
  ├── size?: SpinnerSize        # Default: 'md'
  └── className?: string        # Forwarded to <span>
```

### ProgressBar

```
ProgressBarProps
  ├── value: number             # 0-100, clamped
  ├── label?: string            # Accessible label text
  ├── showLabel?: boolean       # Display label visually (default: false)
  └── className?: string        # Forwarded to outer <div>
```

### Table (composable primitives)

```
TableProps extends HTMLTableAttributes
  └── className?: string

TableHeaderProps extends HTMLTableSectionAttributes
  └── className?: string

TableBodyProps extends HTMLTableSectionAttributes
  └── className?: string

TableFooterProps extends HTMLTableSectionAttributes
  └── className?: string

TableRowProps extends HTMLTableRowAttributes
  └── className?: string

TableHeadProps extends HTMLTableCellAttributes
  └── className?: string

TableCellProps extends HTMLTableCellAttributes
  └── className?: string

TableCaptionProps extends HTMLAttributes
  └── className?: string
```

### EmptyState

```
EmptyStateProps
  ├── title: string                 # Required heading
  ├── description?: string          # Optional detail text
  ├── icon?: LucideIcon | ReactNode # Optional icon above title
  ├── actions?: ReactNode           # Optional action buttons area
  └── className?: string            # Forwarded to outer <div>
```

### Stepper

```
StepStatus = 'pending' | 'current' | 'completed' | 'error'
StepperOrientation = 'horizontal' | 'vertical'

StepperProps
  ├── orientation?: StepperOrientation  # Default: 'horizontal'
  ├── children: ReactNode               # StepperStep elements
  └── className?: string

StepperStepProps
  ├── status?: StepStatus        # Default: 'pending'
  ├── label: string              # Step title
  ├── description?: string       # Optional step detail
  └── className?: string
```

### Sidebar (composable primitives)

```
SidebarProps extends HTMLAttributes<aside>
  └── className?: string

SidebarHeaderProps extends HTMLDivAttributes
  └── className?: string

SidebarContentProps extends HTMLDivAttributes
  └── className?: string

SidebarFooterProps extends HTMLDivAttributes
  └── className?: string

SidebarNavProps extends HTMLAttributes<nav>
  ├── label?: string            # aria-label for <nav>
  └── className?: string

SidebarNavItemProps extends HTMLAttributes<a | button>
  ├── href?: string             # If provided, renders <a>; otherwise <button>
  ├── icon?: LucideIcon | ReactNode
  ├── active?: boolean          # Visually active state
  ├── disabled?: boolean
  └── className?: string

SidebarNavGroupProps
  ├── label: string             # Group heading text
  ├── icon?: LucideIcon | ReactNode
  ├── defaultOpen?: boolean     # Default: true
  ├── collapsible?: boolean     # Default: true
  ├── children: ReactNode       # SidebarNavItem elements
  └── className?: string
```

### Header

```
HeaderProps
  ├── title: string | ReactNode     # Main heading content
  ├── subtitle?: string | ReactNode # Optional subheading
  ├── actions?: ReactNode           # Right-aligned action area
  └── className?: string
```

## State Transitions

### StepperStep Status

```
pending ──→ current ──→ completed
                   └──→ error ──→ current (retry)
```

States are externally controlled — the consumer sets `status` on each step. The Stepper renders visual indicators but does not manage transitions.

### SidebarNavGroup Collapse

```
open ←──→ closed
```

Controlled internally via `useDisclosure`. `defaultOpen` sets initial state. Toggle triggered by clicking the group header.

## Relationships

- **Spinner** ← used by **Button** (already imported in Button.tsx)
- **EmptyState** can compose with **Table** (consumer renders EmptyState inside a TableCell spanning all columns)
- **SidebarNavGroup** contains **SidebarNavItem** children
- **Stepper** contains **StepperStep** children
- **Header** is independent — typically rendered above page content
