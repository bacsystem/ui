# Public API Contract: @bacsystem/ui v1.2.0

**Feature**: 004-absorb-local-components
**Date**: 2026-04-17

## Package Exports

All exports from `@bacsystem/ui` main entry point (`src/index.ts`).

### New Exports (this feature)

```typescript
// Components
export { Label } from './components/Label'
export type { LabelProps } from './components/Label'

export { Spinner } from './components/Spinner'
export type { SpinnerProps, SpinnerSize } from './components/Spinner'

export { ProgressBar } from './components/ProgressBar'
export type { ProgressBarProps } from './components/ProgressBar'

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from './components/Table'
export type { TableProps, TableHeaderProps, TableBodyProps, TableFooterProps, TableRowProps, TableHeadProps, TableCellProps, TableCaptionProps } from './components/Table'

export { EmptyState } from './components/EmptyState'
export type { EmptyStateProps } from './components/EmptyState'

export { Stepper, StepperStep } from './components/Stepper'
export type { StepperProps, StepperStepProps, StepStatus, StepperOrientation } from './components/Stepper'

export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarNav, SidebarNavItem, SidebarNavGroup } from './components/Sidebar'
export type { SidebarProps, SidebarHeaderProps, SidebarContentProps, SidebarFooterProps, SidebarNavProps, SidebarNavItemProps, SidebarNavGroupProps } from './components/Sidebar'

export { Header } from './components/Header'
export type { HeaderProps } from './components/Header'
```

### Existing Exports (unchanged)

```typescript
// Components — no modifications
export { Button } from './components/Button'
export { Badge } from './components/Badge'
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/Card'
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs'
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub, DropdownMenuRadioGroup } from './components/DropdownMenu'
export { Skeleton } from './components/Skeleton'
export { Input } from './components/Input'
export { Alert } from './components/Alert'
export { Avatar } from './components/Avatar'
export { Toggle } from './components/Toggle'
export { Modal } from './components/Modal'
export { DataTable } from './components/DataTable'
export { StatCard } from './components/StatCard'
export { Tooltip } from './components/Tooltip'
export { Select } from './components/Select'
export { Breadcrumb } from './components/Breadcrumb'

// Hooks — no modifications
export { useTheme } from './hooks/useTheme'
export { useBreakpoint } from './hooks/useBreakpoint'
export { useControllableState } from './hooks/useControllableState'
export { useDisclosure } from './hooks/useDisclosure'

// Utilities — no modifications
export { cn } from './lib/cn'
```

### CSS Entry Point (unchanged)

```
@bacsystem/ui/styles.css  →  dist/styles.css  (globals.css + components.css merged)
```

## Breaking Change Assessment

**None.** All changes are additive:
- New component exports
- New CSS class rules (no modification to existing rules)
- No dependency version changes
- No prop renames or removals

## BEM Class Naming Convention

New CSS classes follow the established `bac-{component}` pattern:

| Component | Base Class | Example Modifiers |
|-----------|-----------|-------------------|
| Label | `bac-label` | `bac-label--required` |
| Spinner | `bac-spinner` | `bac-spinner--sm`, `bac-spinner--md`, `bac-spinner--lg` |
| ProgressBar | `bac-progress` | `bac-progress__bar`, `bac-progress__label` |
| Table | `bac-table` | `bac-table__header`, `bac-table__body`, `bac-table__row`, `bac-table__head`, `bac-table__cell` |
| EmptyState | `bac-empty-state` | `bac-empty-state__icon`, `bac-empty-state__title`, `bac-empty-state__actions` |
| Stepper | `bac-stepper` | `bac-stepper--horizontal`, `bac-stepper--vertical`, `bac-stepper__step--completed`, `bac-stepper__step--error` |
| Sidebar | `bac-sidebar` | `bac-sidebar__header`, `bac-sidebar__content`, `bac-sidebar__nav`, `bac-sidebar__nav-item--active` |
| Header | `bac-header` | `bac-header__title`, `bac-header__subtitle`, `bac-header__actions` |
