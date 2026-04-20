# Public API Contract: @bacsystem/ui v1.3.0

**Feature**: 005-close-consumer-gaps
**Date**: 2026-04-20

## Package Exports

All exports from `@bacsystem/ui` main entry point (`src/index.ts`).

### New Exports (this feature)

```typescript
// New component
export { Textarea } from './components/Textarea'
export type { TextareaProps, TextareaResize } from './components/Textarea'

// New hook
export { useReducedMotion } from './hooks/useReducedMotion'
```

### Modified Exports (this feature)

```typescript
// ProgressBar — new types added
export type { ProgressBarVariant, ProgressBarSize } from './components/ProgressBar'
// ProgressBarProps already exported — interface gains variant?, size?, max?

// Header — HeaderProps gains left?, center?, right?; title becomes optional
// No new named exports, only interface expansion

// Sidebar — SidebarProps gains collapsible?, collapsed?, defaultCollapsed?, onCollapsedChange?
// No new named exports, only interface expansion
```

### New index.ts Line

```typescript
export * from './components/Textarea'
export * from './hooks/useReducedMotion'
```

### Existing Exports (unchanged)

All existing exports from v1.2.0 remain unchanged:

```typescript
// Components
export { Button, Badge, Input, Label, Spinner, ProgressBar, Card, CardHeader, CardTitle,
  CardDescription, CardContent, CardFooter, Table, TableHeader, TableBody, TableFooter,
  TableRow, TableHead, TableCell, TableCaption, Alert, Avatar, Toggle, Modal, DataTable,
  StatCard, Tabs, TabsList, TabsTrigger, TabsContent, DropdownMenu, DropdownMenuTrigger,
  DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem,
  DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuSubTrigger,
  DropdownMenuSubContent, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub,
  DropdownMenuRadioGroup, Tooltip, Skeleton, Select, Breadcrumb, EmptyState, Stepper,
  StepperStep, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarNav,
  SidebarNavItem, SidebarNavGroup, Header } from '...'

// Hooks
export { useTheme, useBreakpoint, useControllableState, useDisclosure } from '...'

// Utilities
export { cn } from '...'
```

### CSS Entry Point (unchanged path)

```
@bacsystem/ui/styles.css  →  dist/styles.css  (globals.css + components.css merged)
```

New CSS rules are appended to `components.css`. No new CSS files.

## Breaking Change Assessment

**None.** All changes are additive:

| Change | Type | Breaking? |
|--------|------|-----------|
| ProgressBar gains `variant`, `size`, `max` props | Optional props added | No |
| `ProgressBarVariant`, `ProgressBarSize` types exported | New type exports | No |
| New `Textarea` component + `TextareaProps` type | New export | No |
| New `useReducedMotion` hook | New export | No |
| Header `title` becomes optional | Required → optional | No |
| Header gains `left`, `center`, `right` props | Optional props added | No |
| Sidebar gains `collapsible`, `collapsed`, `defaultCollapsed`, `onCollapsedChange` | Optional props added | No |
| New CSS classes (`.bac-progress--*`, `.bac-textarea*`, `.bac-header__slot--*`, `.bac-sidebar--collapsed`) | New selectors | No |

**Version bump**: v1.2.0 → v1.3.0 (minor, per Constitution IV)

## BEM Class Naming Convention

### New CSS Classes

| Component | Base/Element/Modifier | Purpose |
|-----------|----------------------|---------|
| ProgressBar | `.bac-progress--success` | Success variant color |
| ProgressBar | `.bac-progress--warning` | Warning variant color |
| ProgressBar | `.bac-progress--danger` | Danger variant color |
| ProgressBar | `.bac-progress--xs` | 4px height |
| ProgressBar | `.bac-progress--sm` | 6px height |
| ProgressBar | `.bac-progress--lg` | 16px height |
| Textarea | `.bac-textarea` | Base |
| Textarea | `.bac-textarea__wrapper` | Outer container |
| Textarea | `.bac-textarea__label` | Label element |
| Textarea | `.bac-textarea__field` | The `<textarea>` element |
| Textarea | `.bac-textarea--error` | Error state |
| Textarea | `.bac-textarea--success` | Success state |
| Textarea | `.bac-textarea--disabled` | Disabled state |
| Textarea | `.bac-textarea__error-text` | Error message |
| Textarea | `.bac-textarea__success-text` | Success message |
| Textarea | `.bac-textarea__hint` | Hint message |
| Header | `.bac-header--slots` | Slot-based layout mode |
| Header | `.bac-header__slot--left` | Left slot |
| Header | `.bac-header__slot--center` | Center slot |
| Header | `.bac-header__slot--right` | Right slot |
| Sidebar | `.bac-sidebar--collapsible` | Collapsible enabled |
| Sidebar | `.bac-sidebar--collapsed` | Collapsed state (rail mode) |

### Existing Classes (unchanged)

All existing `bac-progress__*`, `bac-header__*`, `bac-sidebar__*` classes remain untouched.
