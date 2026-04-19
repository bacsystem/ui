# Feature Specification: Absorb Local UI Components into @bacsystem/ui

**Feature Branch**: `004-absorb-local-components`  
**Created**: 2026-04-17  
**Status**: Draft  
**Input**: User description: "Absorb local UI components, hooks, and Radix wrappers from consumer app into @bacsystem/ui to eliminate local barrel duplication"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consumer App Replaces Local Primitives (Priority: P1)

A developer working on a consumer app currently imports UI primitives (Label, Spinner, ProgressBar) from a local `components/ui/index.ts` barrel. After this feature, the developer removes the local component files and imports directly from `@bacsystem/ui`. All existing usage continues to work without code changes beyond import path updates.

**Why this priority**: These are foundational primitives used across every page of consumer apps. Eliminating local copies removes the highest volume of duplicated code and is the simplest migration path.

**Independent Test**: Can be fully tested by replacing local imports of Label, Spinner, and ProgressBar with `@bacsystem/ui` imports and verifying all existing usage renders correctly.

**Acceptance Scenarios**:

1. **Given** a consumer app imports `Label` from a local barrel, **When** the developer changes the import to `@bacsystem/ui`, **Then** all form labels render identically with correct accessibility attributes (htmlFor linkage).
2. **Given** a consumer app uses `Spinner` with size and className props, **When** the developer imports from `@bacsystem/ui`, **Then** all spinner instances render at the correct sizes with custom classes applied.
3. **Given** a consumer app uses `ProgressBar` with value, label, and showLabel props, **When** the developer imports from `@bacsystem/ui`, **Then** progress bars display correct fill, labels, and ARIA attributes.

---

### User Story 2 - Consumer App Replaces Local Composite Components (Priority: P1)

A developer currently maintains local implementations of Table, EmptyState, Stepper, Header, and Sidebar. After this feature, these components are available from `@bacsystem/ui` with APIs suitable for multiple consumer apps (admin panels, dashboards, multi-step wizards).

**Why this priority**: These composite components contain significant logic and styling that is duplicated across consumer apps. Absorbing them delivers the highest reduction in maintenance burden.

**Independent Test**: Can be fully tested by importing Table, EmptyState, Stepper, Header, and Sidebar from `@bacsystem/ui` and verifying they render in an admin dashboard layout with correct behavior.

**Acceptance Scenarios**:

1. **Given** a consumer app uses a local `Table` with composable primitives (Table, TableHeader, TableBody, TableRow, TableHead, TableCell), **When** the developer imports from `@bacsystem/ui`, **Then** all table layouts render correctly with consistent styling.
2. **Given** a consumer app displays an `EmptyState` with title, description, icon, and action buttons, **When** the developer imports from `@bacsystem/ui`, **Then** the empty state renders all elements with correct visual hierarchy.
3. **Given** a consumer app uses a `Stepper` for a multi-step wizard with pending, current, completed, and error states, **When** the developer imports from `@bacsystem/ui`, **Then** all step states render with correct visual indicators and ARIA attributes.
4. **Given** a consumer app uses a `Header` with title and action buttons, **When** the developer imports from `@bacsystem/ui`, **Then** the header renders with main content and secondary actions.
5. **Given** a consumer app uses `Sidebar` primitives for navigation, **When** the developer imports from `@bacsystem/ui`, **Then** the sidebar renders with navigation groups that can expand/collapse their sub-items.

---

### User Story 3 - Legacy Variant Compatibility for Button and Badge (Priority: P2)

A developer currently uses a local wrapper around `@bacsystem/ui` Button that maps legacy variants (`default`, `destructive`, `outline`) and a local Badge wrapper mapping legacy variants (`secondary`, `outline`, `destructive`, `gradient`, `premium`). After this feature, the developer removes the local wrappers because `@bacsystem/ui` already handles legacy variant mapping internally.

**Why this priority**: Button and Badge already exist in `@bacsystem/ui` with legacy support. This story confirms and validates that the existing implementations satisfy the consumer's needs without any wrapper layer.

**Independent Test**: Can be fully tested by removing local Button/Badge wrappers and importing directly from `@bacsystem/ui`, verifying all legacy variants render correctly.

**Acceptance Scenarios**:

1. **Given** a consumer app uses `<Button variant="default">`, **When** imported from `@bacsystem/ui`, **Then** the button renders as the primary filled variant.
2. **Given** a consumer app uses `<Button variant="destructive" loading>`, **When** imported from `@bacsystem/ui`, **Then** the button renders as danger filled with a loading spinner.
3. **Given** a consumer app uses `<Badge variant="gradient">`, **When** imported from `@bacsystem/ui`, **Then** the badge renders with the gradient visual treatment.
4. **Given** a consumer app uses `<Badge variant="premium">`, **When** imported from `@bacsystem/ui`, **Then** the badge renders with the premium visual treatment.

---

### User Story 4 - Tabs and DropdownMenu Already Covered (Priority: P2)

A developer currently maintains local Radix wrapper components for Tabs and DropdownMenu. After this feature, the developer confirms `@bacsystem/ui` already exports composable Radix-based Tabs and DropdownMenu primitives that match the consumer's existing API, and removes local wrappers.

**Why this priority**: These are already implemented in `@bacsystem/ui`. This story validates the composable API covers all sub-components the consumer expects.

**Independent Test**: Can be fully tested by replacing local Radix wrapper imports with `@bacsystem/ui` and verifying tabs and dropdown menus render and behave identically.

**Acceptance Scenarios**:

1. **Given** a consumer app uses `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` from local wrappers, **When** imported from `@bacsystem/ui`, **Then** all tab interfaces render with correct selection, keyboard navigation, and styling.
2. **Given** a consumer app uses `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuGroup`, `DropdownMenuPortal`, `DropdownMenuSub`, `DropdownMenuRadioGroup` from local wrappers, **When** imported from `@bacsystem/ui`, **Then** all dropdown menus render with correct behavior, accessibility, and styling.

---

### User Story 5 - Hooks and Utilities Available from Package (Priority: P3)

A developer currently copies generic UI hooks (`useControllableState`, `useDisclosure`) into their local project. After this feature, these hooks are available directly from `@bacsystem/ui`.

**Why this priority**: Hooks are already implemented. This story confirms they are exported and usable, reducing copy-paste across consumer apps.

**Independent Test**: Can be fully tested by importing hooks from `@bacsystem/ui` and verifying controlled/uncontrolled state management and disclosure toggling work correctly.

**Acceptance Scenarios**:

1. **Given** a consumer app uses a local `useControllableState` hook, **When** imported from `@bacsystem/ui`, **Then** controlled and uncontrolled state management works identically.
2. **Given** a consumer app uses a local `useDisclosure` hook, **When** imported from `@bacsystem/ui`, **Then** open/close/toggle behavior works identically.

---

### Edge Cases

- What happens when a consumer app passes an unrecognized legacy variant to Button or Badge? The component should render gracefully with a default fallback style, not crash.
- How does Stepper handle zero steps or a single step? It should render empty or a single step gracefully without errors.
- How does EmptyState render without optional props (no icon, no actions)? It should render title and description at minimum.
- How does Sidebar behave when no navigation items are provided? It should render an empty container without errors.
- What happens when Table is used with zero rows? It should render headers only, composable with EmptyState for the empty case.
- How does ProgressBar handle values outside 0-100 range? It should clamp to 0 or 100.

## Clarifications

### Session 2026-04-17

- Q: Should the entire Sidebar be collapsible (rail mode) or only navigation groups within it? → A: Only nav groups within Sidebar are collapsible (expand/collapse sub-items); full sidebar collapse is consumer responsibility at the layout level.
- Q: Should Stepper support horizontal, vertical, or both orientations? → A: Both orientations via an `orientation` prop, defaulting to horizontal.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Package MUST export Label, Spinner, ProgressBar, Table, EmptyState, Stepper, Sidebar, and Header as new components
- **FR-002**: Package MUST continue exporting Button, Badge, Card (with sub-components), Tabs, DropdownMenu, Skeleton with their existing APIs unchanged
- **FR-003**: Button MUST support legacy variants (`default`, `destructive`, `outline`) mapped internally to modern variants, plus `variant`, `appearance`, `size`, `loading`, `disabled`, `iconLeft`, `iconRight`, `asChild`
- **FR-004**: Badge MUST support legacy variants (`secondary`, `outline`, `destructive`, `gradient`, `premium`) mapped internally, plus `appearance`
- **FR-005**: Label MUST be an accessible form label primitive that links to associated controls via `htmlFor`
- **FR-006**: Spinner MUST support configurable sizes and custom `className`
- **FR-007**: ProgressBar MUST support `value` (0-100), `label`, `showLabel`, and correct ARIA attributes (`role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`)
- **FR-008**: Table MUST provide composable primitives (Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter, TableCaption) suitable for admin panels and listing views
- **FR-009**: EmptyState MUST support `title`, `description`, `icon`, and `actions` (React nodes for action buttons)
- **FR-010**: Stepper MUST support step states: pending, current, completed, error; an `orientation` prop (`horizontal` | `vertical`, default `horizontal`); and provide a clear composable API for multi-step wizards
- **FR-011**: Sidebar MUST provide modular primitives (Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarNav, SidebarNavItem, SidebarNavGroup) that compose flexibly for different app shells. SidebarNavGroup MUST support expand/collapse behavior. Full sidebar collapse (rail mode) is NOT in scope — consumers handle that at the layout level
- **FR-012**: Header MUST support main content (title/subtitle) and secondary actions area
- **FR-013**: All new components MUST be accessible (correct ARIA roles, keyboard navigation where applicable)
- **FR-014**: All components and types MUST be exported from the package's main barrel (`src/index.ts`)
- **FR-015**: Package MUST NOT introduce TypeScript `any` types
- **FR-016**: Hooks (`useControllableState`, `useDisclosure`) and utility (`cn`) MUST remain exported
- **FR-017**: Table primitives MUST coexist with the existing DataTable component; they serve different purposes (Table = static composable markup, DataTable = feature-rich interactive tables)

### Key Entities

- **Component**: A reusable React UI primitive with typed props, consistent BEM-style class naming (`bac-*`), and accessibility support
- **Legacy Variant**: A variant name used by consumer apps that maps internally to the modern design system variant within the package
- **Composable Primitive**: A low-level component designed to be composed with siblings to build complex layouts (e.g., Table + TableRow + TableCell)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Consumer apps can replace 100% of their local UI barrel re-exports with direct `@bacsystem/ui` imports for all 15 specified component groups
- **SC-002**: Zero breaking changes to existing `@bacsystem/ui` APIs - all current consumers continue to work without modification
- **SC-003**: All legacy variant values used by consumers produce correct visual output when passed directly to `@bacsystem/ui` components
- **SC-004**: All new components pass accessibility requirements: correct ARIA roles, keyboard-navigable interactive elements, screen-reader-friendly labels
- **SC-005**: Consumer migration requires only import path changes - no prop renaming, no wrapper code, no behavioral adjustments

## Assumptions

- Consumer apps use the BEM-style `bac-*` class naming convention already established in `@bacsystem/ui`
- The Sidebar component is a layout primitive, not a full application shell solution - it provides composable pieces that each consumer app assembles into its own layout
- The Header component is a page/section header, not a global app bar - it provides a title area and actions slot
- Table primitives follow the same HTML semantics as native `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` elements with styled wrappers
- Stepper is a visual indicator component, not a form wizard controller - it displays step state but does not manage navigation logic
- Only generic, domain-agnostic hooks are absorbed; any hooks tied to specific business logic remain in consumer apps
