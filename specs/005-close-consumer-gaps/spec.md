# Feature Specification: Close Consumer Gaps — lingo-fast-web Audit

**Feature Branch**: `005-close-consumer-gaps`
**Created**: 2026-04-20
**Status**: Draft
**Input**: Audit report "Auditoría de gaps vs lingo-fast-web" against `@bacsystem/ui ^1.2.0`

## Audit Reconciliation

Before defining requirements, two items from the audit are already resolved in v1.2.0:

| Audit Item | Status | Evidence |
|---|---|---|
| `Button.asChild` (Slot pattern) | **Already implemented** | `Button.tsx` imports `Slot` from `@radix-ui/react-slot`, accepts `asChild?: boolean`, renders `<Slot>` when true. Consumer can use `<Button asChild><Link href="...">` today. |
| `Badge` variants `secondary`/`outline`/`gradient`/`premium` | **Already implemented** | `Badge.tsx` defines `BadgeLegacyVariant = 'secondary' \| 'outline' \| 'destructive' \| 'gradient' \| 'premium'` with `resolveBadgeStyle()` mapping each to the modern system. |

These two items require **zero library changes** — only consumer-side import path migration.

The remaining five items are genuine gaps that this feature addresses.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — ProgressBar Supports Semantic Variants, Sizes, and Custom Max (Priority: P1)

A developer building a dashboard displays progress bars with different colors to indicate business status (green for success, amber for warning, red for danger) and at different heights depending on context (compact cards vs full-width dashboards). The current ProgressBar only supports `value`, `label`, and `showLabel` — there is no way to control color, height, or set a custom maximum.

**Why this priority**: Used in 6 pages across the consumer app. Every usage requires a local wrapper to inject inline styles for color and height, defeating the purpose of the library.

**Independent Test**: Render ProgressBar with `variant="success"`, `size="xs"`, and `value={3} max={5}` — verify the bar fills to 60% with green color at 4px height.

**Acceptance Scenarios**:

1. **Given** a progress bar with `variant="success"`, **When** rendered, **Then** the track fill uses the success color token (not the default primary color).
2. **Given** a progress bar with `variant="danger"`, **When** rendered, **Then** the track fill uses the danger color token.
3. **Given** a progress bar with `size="xs"`, **When** rendered, **Then** the track height is 4px.
4. **Given** a progress bar with `size="lg"`, **When** rendered, **Then** the track height is 16px.
5. **Given** a progress bar with `value={3} max={5}`, **When** rendered, **Then** the bar fills to 60% and `aria-valuemax` is 5.
6. **Given** a progress bar with no `variant` or `size`, **When** rendered, **Then** it renders identically to the current v1.2.0 behavior (default color, default height). **No breaking change.**

---

### User Story 2 — Textarea Component for Forms (Priority: P1)

A developer building profile and chat forms needs a multi-line text input. The library provides `Input` for single-line inputs but has no `Textarea`. The developer must maintain a local Textarea component with its own error/disabled/focus-ring styling that duplicates the Input token system.

**Why this priority**: Every form-heavy page in the consumer app needs Textarea. It shares the same visual language as Input (borders, focus ring, error state, disabled state) and should come from the same library.

**Independent Test**: Render `<Textarea error="Required" rows={4} />` — verify it renders a `<textarea>` element with error styling, 4 rows, and the same focus ring as Input.

**Acceptance Scenarios**:

1. **Given** a Textarea with `error="Required"`, **When** rendered, **Then** it displays with the error border color, error icon, and error message below — matching the visual pattern of Input in error state.
2. **Given** a Textarea with `disabled`, **When** rendered, **Then** it is visually muted and not focusable — matching Input's disabled behavior.
3. **Given** a Textarea with `rows={6}`, **When** rendered, **Then** the element renders with 6 visible rows.
4. **Given** a Textarea with `resize="none"`, **When** rendered, **Then** the user cannot drag-resize the element.
5. **Given** a Textarea with `resize="vertical"` (default), **When** rendered, **Then** the user can resize vertically but not horizontally.
6. **Given** a Textarea with `label="Bio"` and `hint="Max 500 chars"`, **When** rendered, **Then** the label appears above and the hint below — matching Input's label/hint pattern.
7. **Given** a Textarea with `className="custom"`, **When** rendered, **Then** the custom class is forwarded to the outermost element.

---

### User Story 3 — useReducedMotion Hook (Priority: P2)

A developer building animated UI (sidebar transitions, dashboard widget motion) needs to respect the user's `prefers-reduced-motion: reduce` OS setting. The library exports `useBreakpoint` and `useTheme` but not `useReducedMotion`. The developer copies a local implementation into every consumer app.

**Why this priority**: Only 2 files in the current consumer use it, but it is a foundational accessibility hook that benefits all consumer apps equally. Very low implementation cost.

**Independent Test**: Call `useReducedMotion()` in a component — verify it returns `true` when `prefers-reduced-motion: reduce` is active and `false` otherwise.

**Acceptance Scenarios**:

1. **Given** the OS has `prefers-reduced-motion: reduce` enabled, **When** a component calls `useReducedMotion()`, **Then** it returns `true`.
2. **Given** the OS has no motion preference (default), **When** a component calls `useReducedMotion()`, **Then** it returns `false`.
3. **Given** the user changes the OS motion preference while the app is running, **When** the media query changes, **Then** the hook reactively updates its return value.
4. **Given** SSR rendering, **When** the hook runs on the server, **Then** it returns `false` (safe default — no reduced motion assumed).

---

### User Story 4 — Header with Composable Slots (Priority: P2)

A developer building a page layout needs a header with a hamburger button on the left (to open a sidebar drawer), dynamic breadcrumbs in the center, and action buttons on the right (theme toggle, avatar). The current Header has a fixed `title`/`subtitle`/`actions` structure that doesn't accommodate a left-side trigger or center breadcrumbs without hacks.

**Why this priority**: Used in 1 layout file but it's the main app shell layout. The current Header works for simple pages but not for the app shell pattern where left/center/right slots are needed.

**Independent Test**: Render `<Header left={<HamburgerBtn />} center={<Breadcrumbs />} right={<ThemeToggle />} />` — verify all three slots render in the correct positions.

**Acceptance Scenarios**:

1. **Given** a Header with `left`, `center`, and `right` props, **When** rendered, **Then** each slot renders in its designated position with flex layout.
2. **Given** a Header with only `title` and `actions` (legacy API), **When** rendered, **Then** it renders identically to v1.2.0 — title on the left, actions on the right. **No breaking change.**
3. **Given** a Header with `left={<button>☰</button>}` and `title="Dashboard"`, **When** rendered, **Then** the hamburger appears before the title.
4. **Given** a Header with no props, **When** rendered, **Then** it renders an empty `<header>` element gracefully.

---

### User Story 5 — Sidebar with Collapsible State and CSS Transitions (Priority: P3)

A developer building an app shell needs the sidebar to support three visual modes: expanded (full width with labels), collapsed (icon-only rail), and hidden (mobile drawer). The current Sidebar is a set of composable primitives with no built-in collapse state or transition support. The developer must build all collapse logic, CSS transitions, and responsive behavior locally.

**Why this priority**: This is the central layout component of the consumer app and the most complex gap. However, the consumer's current implementation uses Framer Motion for animations, which is app-specific. The library should provide the **state management and CSS transitions** but not bundle a motion library. App-specific animation (Framer Motion) remains the consumer's responsibility.

**Independent Test**: Render `<Sidebar collapsible defaultCollapsed={false}>` and click a collapse trigger — verify the sidebar transitions to collapsed (rail) mode with icon-only display.

**Acceptance Scenarios**:

1. **Given** a Sidebar with `collapsible` and `defaultCollapsed={false}`, **When** the user triggers collapse, **Then** the sidebar transitions to a narrow rail showing only icons (labels hidden).
2. **Given** a Sidebar in collapsed state, **When** the user triggers expand, **Then** the sidebar transitions back to full width with labels visible.
3. **Given** a Sidebar with `collapsed` prop (controlled), **When** the parent changes the prop, **Then** the sidebar reflects the new state.
4. **Given** a Sidebar with `onCollapsedChange` callback, **When** the collapse state changes, **Then** the callback fires with the new boolean value.
5. **Given** a Sidebar without `collapsible` prop (default), **When** rendered, **Then** it behaves identically to v1.2.0 — always expanded, no collapse controls. **No breaking change.**
6. **Given** a collapsed Sidebar with a SidebarNavItem that has an `icon`, **When** rendered, **Then** only the icon is visible; the text label is hidden via CSS.
7. **Given** the viewport is below the mobile breakpoint, **When** the Sidebar is rendered with `collapsible`, **Then** the Sidebar can be used as a CSS-based off-canvas panel (consumer controls the trigger).

---

### Edge Cases

- What happens when ProgressBar receives `max={0}`? It should clamp to `max={1}` to avoid division by zero.
- What happens when ProgressBar receives `value` greater than `max`? The fill should clamp to 100%.
- What happens when Textarea receives both `error` and `success`? Error takes precedence (matching Input behavior).
- What happens when Header receives both `left`/`center`/`right` and `title`/`actions`? The slot-based API (`left`/`center`/`right`) takes priority; legacy props are ignored when slots are provided.
- What happens when Sidebar is collapsed and a SidebarNavGroup is expanded? The group items should be hidden in collapsed mode regardless of group state; they reappear when the sidebar expands.

## Clarifications

### Session 2026-04-20

- Q: The audit reports Button lacks `asChild` and Badge lacks legacy variants. Is this accurate? → A: No. Code review of `@bacsystem/ui` v1.2.0 confirms both are already implemented. Button uses `@radix-ui/react-slot` Slot pattern. Badge has `resolveBadgeStyle()` mapping all legacy variants. The audit was likely performed against an older version or the consumer app's local wrappers shadowed the library exports.
- Q: Should Sidebar bundle Framer Motion for collapse animations? → A: No. The library provides CSS transitions for collapse/expand. Consumers who need Framer Motion or other animation libraries wrap the Sidebar themselves. The library's `collapsible` prop manages state + CSS classes; the consumer controls the animation engine.
- Q: Should Header be backward-compatible with the current `title`/`subtitle`/`actions` API? → A: Yes. The slot-based API (`left`/`center`/`right`) is additive. When no slots are provided, the component behaves exactly as v1.2.0.

## Requirements *(mandatory)*

### Functional Requirements

**ProgressBar enhancements:**
- **FR-001**: ProgressBar MUST accept a `variant` prop with values `default` | `success` | `warning` | `danger` and apply the corresponding color token to the fill bar
- **FR-002**: ProgressBar MUST accept a `size` prop with values `xs` (4px) | `sm` (6px) | `md` (10px) | `lg` (16px) and apply the corresponding track height
- **FR-003**: ProgressBar MUST accept a `max` prop (number, default 100) and compute fill percentage as `value / max * 100`, clamped to 0–100
- **FR-004**: ProgressBar MUST set `aria-valuemax` to the `max` prop value
- **FR-005**: ProgressBar MUST remain backward-compatible — omitting `variant`, `size`, and `max` produces identical output to v1.2.0

**Textarea component:**
- **FR-006**: Package MUST export a new `Textarea` component that renders a `<textarea>` HTML element
- **FR-007**: Textarea MUST accept `label`, `error`, `hint`, `success`, `disabled`, `rows`, `className` props matching Input's visual contract
- **FR-008**: Textarea MUST accept a `resize` prop with values `none` | `vertical` | `horizontal` | `both`, defaulting to `vertical`
- **FR-009**: Textarea MUST use the same design tokens as Input for borders, focus ring, error state, and disabled state
- **FR-010**: Textarea MUST forward `ref` via `forwardRef` to the underlying `<textarea>` element
- **FR-011**: Textarea MUST export its `TextareaProps` interface

**useReducedMotion hook:**
- **FR-012**: Package MUST export a `useReducedMotion` hook that returns `boolean`
- **FR-013**: useReducedMotion MUST listen to `prefers-reduced-motion: reduce` media query and reactively update on change
- **FR-014**: useReducedMotion MUST return `false` during SSR (safe default)

**Header composable slots:**
- **FR-015**: Header MUST accept optional `left`, `center`, `right` slot props (all `ReactNode`)
- **FR-016**: When `left`/`center`/`right` are provided, Header MUST render them in a three-column flex layout
- **FR-017**: When `left`/`center`/`right` are NOT provided, Header MUST render using the existing `title`/`subtitle`/`actions` layout — no breaking change
- **FR-018**: Header MUST continue to accept `className` and forward it to the `<header>` element

**Sidebar collapsible state:**
- **FR-019**: Sidebar MUST accept optional `collapsible` prop (boolean, default `false`) to enable collapse behavior
- **FR-020**: Sidebar MUST accept optional `collapsed` / `defaultCollapsed` / `onCollapsedChange` props following the controlled/uncontrolled pattern (using `useControllableState`)
- **FR-021**: When collapsed, Sidebar MUST apply a `bac-sidebar--collapsed` CSS class that reduces width and hides nav item labels
- **FR-022**: Sidebar MUST provide CSS transitions for width changes (consumer can override with their own animation engine)
- **FR-023**: SidebarNavItem MUST hide its text label and show only its icon when the parent Sidebar is collapsed
- **FR-024**: When `collapsible` is `false` (default), Sidebar MUST behave identically to v1.2.0 — no breaking change

**Cross-cutting:**
- **FR-025**: All changes MUST be additive — zero breaking changes to existing APIs (minor version bump per Constitution IV)
- **FR-026**: All new/modified components MUST maintain TypeScript strict mode with zero `any` types (Constitution I)
- **FR-027**: All new CSS rules MUST use CSS custom properties only (Constitution II)
- **FR-028**: All new/modified components MUST accept `className` forwarded to the outermost element (Constitution III)

### Key Entities

- **Variant**: A semantic color designation (`default`, `success`, `warning`, `danger`) that maps to a CSS custom property
- **Size**: A height designation (`xs`, `sm`, `md`, `lg`) that maps to a pixel value via CSS custom property
- **Slot**: A named `ReactNode` prop that allows the consumer to inject arbitrary content into a specific region of a composable component
- **Collapsible state**: A boolean (`collapsed` / `expanded`) managed via `useControllableState`, controlling whether the sidebar displays in full or rail mode

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The lingo-fast-web consumer app can remove its local ProgressBar wrapper and use `@bacsystem/ui` ProgressBar directly with `variant`, `size`, and `max` props — all 6 usage sites migrate cleanly
- **SC-002**: The lingo-fast-web consumer app can remove its local Textarea component and import from `@bacsystem/ui` — all form pages render identically
- **SC-003**: The lingo-fast-web consumer app can remove its local `useReducedMotion` hook and import from `@bacsystem/ui` — the 2 usage sites work identically
- **SC-004**: The lingo-fast-web consumer app's Header can use the slot-based API to place hamburger, breadcrumbs, and actions without local workarounds
- **SC-005**: The lingo-fast-web consumer app's Sidebar can use the library's collapsible state management instead of a fully local implementation, reducing local code while retaining Framer Motion animations via className/style overrides
- **SC-006**: Zero breaking changes — all existing consumers of `@bacsystem/ui` v1.2.0 continue working without modification after upgrading

## Assumptions

- The lingo-fast-web audit was performed against consumer-side wrappers, not directly against `@bacsystem/ui` v1.2.0 source. The Button `asChild` and Badge legacy variant gaps are already resolved.
- Textarea follows the same visual language as Input — same tokens, same BEM prefix (`bac-textarea`), same error/success/disabled patterns.
- The Sidebar collapse feature provides CSS-based transitions. Consumers needing Framer Motion or spring-based animations wrap the Sidebar and drive animations via the `collapsed` boolean and `className` overrides.
- The Header slot-based API is additive — it does not replace the `title`/`subtitle`/`actions` API, which remains the simple-case default.
- Consumer migration of Button and Badge requires only changing import paths from the local barrel to `@bacsystem/ui` — no prop changes needed.
