# Data Model: Close Consumer Gaps

**Feature**: 005-close-consumer-gaps
**Date**: 2026-04-20

## Component Props Interfaces

This feature has no persistent data model. The "entities" are component prop interfaces and hook return types.

### ProgressBar (extended)

```
ProgressBarVariant = 'default' | 'success' | 'warning' | 'danger'
ProgressBarSize    = 'xs' | 'sm' | 'md' | 'lg'

ProgressBarProps extends HTMLAttributes<HTMLDivElement>
  ├── value: number                     # Required, clamped to 0–max
  ├── max?: number                      # Default: 100, clamped min 1
  ├── variant?: ProgressBarVariant      # Default: 'default'
  ├── size?: ProgressBarSize            # Default: 'md'
  ├── label?: string                    # Accessible label text
  ├── showLabel?: boolean               # Display label visually (default: false)
  └── className?: string                # Forwarded to outer <div>
```

**Token mapping**:
- `default` → `--color-primary-600` / `--color-primary-400` gradient
- `success` → `--color-success-base`
- `warning` → `--color-warning-base`
- `danger`  → `--color-error-base`

**Size mapping**:
- `xs` → 4px, `sm` → 6px, `md` → 10px, `lg` → 16px

### Textarea (new)

```
TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both'

TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>
  ├── label?: string                    # Label above textarea
  ├── error?: string                    # Error message below; error border
  ├── hint?: string                     # Hint text below
  ├── success?: string                  # Success message below; success border
  ├── disabled?: boolean                # Disabled state
  ├── rows?: number                     # Visible text rows
  ├── resize?: TextareaResize           # Default: 'vertical'
  └── className?: string                # Forwarded to wrapper <div>
```

**State precedence**: error > success > hint (matches Input)

### useReducedMotion (new)

```
useReducedMotion() → boolean
  └── Returns true when prefers-reduced-motion: reduce is active
  └── Returns false during SSR or when no preference set
  └── Reactively updates on media query change
```

### Header (extended)

```
HeaderProps extends HTMLAttributes<HTMLElement>
  ├── title?: string | ReactNode        # Was required, now optional
  ├── subtitle?: string | ReactNode     # Subtitle below title
  ├── actions?: ReactNode               # Right-side actions (legacy)
  ├── left?: ReactNode                  # Left slot (slot-based API)
  ├── center?: ReactNode                # Center slot (slot-based API)
  ├── right?: ReactNode                 # Right slot (slot-based API)
  └── className?: string                # Forwarded to <header>
```

**Rendering logic**: `hasSlots = !!(left || center || right)` → slot layout; else → legacy layout.

### Sidebar (extended)

```
SidebarProps extends HTMLAttributes<HTMLElement>
  ├── collapsible?: boolean             # Enable collapse behavior (default: false)
  ├── collapsed?: boolean               # Controlled collapsed state
  ├── defaultCollapsed?: boolean        # Uncontrolled initial state (default: false)
  ├── onCollapsedChange?: (collapsed: boolean) => void
  └── className?: string                # Forwarded to <aside>
```

**State management**: `useControllableState({ value: collapsed, defaultValue: defaultCollapsed ?? false, onChange: onCollapsedChange })`

**CSS class**: When collapsed → `bac-sidebar--collapsed` applied to `<aside>`. Child `.bac-sidebar__nav-label` elements hidden via CSS cascade.
