# Contract: Public API — @bacsystem/ui

**Type**: Library barrel export contract
**File**: `packages/ui/src/index.ts`

This contract defines every named export that consumers of `@bacsystem/ui` can import.
Any symbol listed here is part of the public API and governed by SemVer (Principle IV).
Removing or renaming any export is a MAJOR breaking change.

---

## Named Exports

### Components

| Export | Type | Description |
|--------|------|-------------|
| `Button` | `React.FC<ButtonProps>` | Primary action component |
| `ButtonProps` | `interface` | Props interface for Button |
| `Badge` | `React.FC<BadgeProps>` | Status label component |
| `BadgeProps` | `interface` | Props interface for Badge |
| `Input` | `React.FC<InputProps>` | Form input component |
| `InputProps` | `interface` | Props interface for Input |
| `Card` | `React.FC<CardProps>` | Content container component |
| `CardProps` | `interface` | Props interface for Card |
| `Alert` | `React.FC<AlertProps>` | Feedback message component |
| `AlertProps` | `interface` | Props interface for Alert |
| `Avatar` | `React.FC<AvatarProps>` | User representation component |
| `AvatarProps` | `interface` | Props interface for Avatar |
| `Toggle` | `React.FC<ToggleProps>` | Boolean switch component |
| `ToggleProps` | `interface` | Props interface for Toggle |
| `Modal` | `React.FC<ModalProps>` | Dialog overlay component |
| `ModalProps` | `interface` | Props interface for Modal |
| `DataTable` | `React.FC<DataTableProps<any>>` | Tabular data component |
| `DataTableProps` | `interface` | Props interface for DataTable |
| `DataTableColumn` | `interface` | Column definition for DataTable |
| `StatCard` | `React.FC<StatCardProps>` | Metric display component |
| `StatCardProps` | `interface` | Props interface for StatCard |
| `Tabs` | `React.FC<TabsProps>` | Tab navigation component |
| `TabsProps` | `interface` | Props interface for Tabs |
| `TabItem` | `interface` | Tab item definition |

### Hooks

| Export | Return type | Description |
|--------|-------------|-------------|
| `useTheme` | `UseThemeReturn` | Theme state + localStorage persistence |
| `UseThemeReturn` | `interface` | Return type interface for useTheme |
| `useBreakpoint` | `UseBreakpointReturn` | Reactive viewport breakpoint |
| `UseBreakpointReturn` | `interface` | Return type interface for useBreakpoint |

### Type Aliases (exported for consumer extension)

| Export | Values |
|--------|--------|
| `ButtonVariant` | `'primary' \| 'secondary' \| 'accent' \| 'ghost' \| 'danger' \| 'success'` |
| `ButtonSize` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` |
| `BadgeVariant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` |
| `CardVariant` | `'default' \| 'elevated' \| 'outlined' \| 'tinted'` |
| `CardSize` | `'sm' \| 'md' \| 'lg'` |
| `AlertVariant` | `'info' \| 'success' \| 'warning' \| 'error'` |
| `AvatarSize` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` |
| `ToggleSize` | `'sm' \| 'md' \| 'lg'` |
| `ModalSize` | `'sm' \| 'md' \| 'lg'` |
| `StatCardColor` | `'blue' \| 'teal' \| 'amber' \| 'green' \| 'purple'` |
| `StatCardTrend` | `'up' \| 'down' \| 'neutral'` |
| `Theme` | `'light' \| 'dark'` |
| `Breakpoint` | `'sm' \| 'md' \| 'lg' \| 'xl'` |

---

## Stylesheet Export

| Import path | File | Description |
|-------------|------|-------------|
| `@bacsystem/ui/styles.css` | `dist/styles.css` | All CSS custom properties (tokens) |

Consumers MUST import this stylesheet explicitly in their app entry point.
It is never auto-injected.
