# Research: Absorb Local UI Components

**Feature**: 004-absorb-local-components
**Date**: 2026-04-17

## Findings

### 1. No New Dependencies Required

**Decision**: All 8 new components are implemented with native HTML elements. No new Radix packages needed.

**Rationale**: Label, Spinner, ProgressBar, Table, EmptyState, Stepper, Sidebar, and Header are all simple enough to implement with native HTML + CSS. Using Radix for these would add unnecessary bundle weight. The existing Radix dependencies (tabs, dropdown-menu, slot) remain unchanged.

**Alternatives considered**:
- `@radix-ui/react-label` for Label — rejected because native `<label>` with `htmlFor` provides identical accessibility. Radix Label only adds a thin wrapper with no meaningful benefit for this use case.
- `@radix-ui/react-progress` for ProgressBar — rejected because native `<div role="progressbar">` with ARIA attributes is sufficient. Radix Progress adds indeterminate animation support we don't need.
- `@radix-ui/react-collapsible` for SidebarNavGroup — considered but rejected. A simple `useState` toggle with `useDisclosure` (already in the package) achieves the expand/collapse behavior without a new dependency.

### 2. Spinner Pattern

**Decision**: CSS-only spinner using `border` animation, matching existing `bac-spin` keyframe already in components.css.

**Rationale**: The existing Button component already uses a `Spinner` component (imported in Button.tsx line 6), so this component must be created for the existing code to build. The `bac-spin` keyframe is already defined. Size scale matches Button sizes (sm, md, lg) for consistency.

**Alternatives considered**:
- SVG-based spinner — more visually flexible but adds complexity; CSS border spinner matches the existing loading spinner pattern in DataTable.

### 3. Table vs DataTable Coexistence

**Decision**: Table provides composable HTML table primitives (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`, `<tfoot>`, `<caption>`). DataTable remains the feature-rich component with sorting, row hover effects, action buttons, and loading/empty states.

**Rationale**: Table serves a different purpose — static composable markup for admin panels where the developer controls the full table structure. DataTable is an opinionated, data-driven component. They address different use cases and should coexist.

### 4. Sidebar Architecture

**Decision**: Composable primitives (Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarNav, SidebarNavItem, SidebarNavGroup). No built-in collapse/rail mode — consumers control layout-level collapsing.

**Rationale**: Per spec clarification, only nav groups within the sidebar should be collapsible. The sidebar itself is a static layout container. Using `useDisclosure` for SidebarNavGroup collapse keeps the implementation lean and dependency-free.

### 5. Stepper Orientation

**Decision**: Support both `horizontal` and `vertical` via an `orientation` prop, defaulting to `horizontal`.

**Rationale**: Per spec clarification. Horizontal is the common case (checkout flows, onboarding). Vertical is used in vertical step-by-step guides. Both share the same step state logic; only CSS layout differs.

### 6. Button Already Imports Spinner

**Decision**: Spinner implementation is a **build blocker** — Button.tsx imports `../Spinner` which doesn't exist yet.

**Rationale**: The barrel `index.ts` also exports from `./components/Spinner` which doesn't exist. This must be the first component implemented to unblock the build.

## No Unresolved Items

All NEEDS CLARIFICATION items were resolved during the specification phase. No further research blockers.
