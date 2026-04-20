# Research: Close Consumer Gaps

**Feature**: 005-close-consumer-gaps
**Date**: 2026-04-20

## Findings

### 1. ProgressBar — No New Dependencies

**Decision**: Extend the existing ProgressBar component with `variant`, `size`, and `max` props. Pure CSS + prop additions.

**Rationale**: The current ProgressBar already uses native `<progress>` + visual `<div>` track/bar with `clampValue()`. Adding variant/size/max is a prop expansion with BEM modifier classes. The existing `bac-progress__bar` applies `background: linear-gradient(…)` using `--color-primary-600/400` — variant support overrides this gradient per-variant via CSS custom properties.

**Token mapping for variants**:
- `default` → existing `--color-primary-600`/`--color-primary-400` gradient (no change)
- `success` → `--color-success-base` (existing token: `#10B981`)
- `warning` → `--color-warning-base` (existing token: `#F59E0B`)
- `danger` → `--color-error-base` (existing token: `#EF4444`)

Note: The spec uses `danger` as the variant name; the CSS tokens use `error`. This is intentional — `danger` is the consumer-facing semantic name (consistent with Button's `danger` variant), while `error` is the internal token namespace. The CSS rule `.bac-progress--danger .bac-progress__bar` maps to `--color-error-base`.

**Size mapping**: New CSS custom property `--bac-progress-height` set per modifier class:
- `xs` → 4px, `sm` → 6px, `md` → 10px (current default), `lg` → 16px

### 2. Textarea — Mirrors Input Visual Contract

**Decision**: New component `Textarea` in `packages/ui/src/components/Textarea/Textarea.tsx`. No new dependencies.

**Rationale**: Input uses `buildInputClasses()` with `bac-input--*` modifiers for error, success, disabled, size. Textarea needs an analogous `buildTextareaClasses()` with `bac-textarea--*` modifiers. The visual tokens (borders, focus ring, error color, disabled opacity) are the same CSS custom properties already used by Input. The difference is the rendered element (`<textarea>` vs `<input>`) and the `resize` / `rows` props.

**Why not extend Input**: Input renders `<input>` and has `type`, `prefix`, `suffix`, `iconLeft`, `iconRight`, `floating` props that don't apply to textarea. A separate component is cleaner than conditional rendering inside Input.

**Alternatives considered**:
- Shared `buildFieldClasses()` utility extracted from Input — rejected for this iteration. Input's `buildInputClasses` is tightly scoped to its own modifiers. Textarea has a simpler modifier set (no floating, no prefix/suffix, no icons). Extracting a shared utility would require refactoring Input, which is out of scope (no unnecessary changes). Can be done in a future refactor pass.

### 3. useReducedMotion — Standard matchMedia Hook

**Decision**: New hook `packages/ui/src/hooks/useReducedMotion.ts`. No dependencies beyond React.

**Rationale**: Follows the same pattern as `useBreakpoint.ts` — `useState` + `useEffect` listening to a media query. The media query is `(prefers-reduced-motion: reduce)`. SSR safety is handled by initializing state to `false` and only attaching the listener in `useEffect`.

**Pattern reference**: `useBreakpoint` uses `useState('sm')` + `useEffect` with `window.innerWidth` and a `resize` event listener. `useReducedMotion` uses `useState(false)` + `useEffect` with `window.matchMedia('(prefers-reduced-motion: reduce)')` and a `change` event listener.

### 4. Header Slots — Additive Layout Branch

**Decision**: Add `left`, `center`, `right` optional props to the existing Header component. When any slot prop is provided, render a three-column flex layout. Otherwise, keep the current `title`/`subtitle`/`actions` rendering.

**Rationale**: The current Header uses `display: flex; justify-content: space-between` with two children: `.bac-header__content` (title+subtitle) and `.bac-header__actions`. The slot-based layout uses a three-column flex: `.bac-header__slot--left`, `.bac-header__slot--center`, `.bac-header__slot--right`. A boolean check `const hasSlots = !!(left || center || right)` determines which branch to render.

**Backward compatibility**: When `left`/`center`/`right` are all undefined, the component renders identically to v1.2.0. The only TypeScript change is making `title` optional (was required) — existing consumers who pass `title` are unaffected. Consumers who don't pass any props get an empty `<header>`.

### 5. Sidebar Collapsible — Context-Based State Propagation

**Decision**: Use React Context to propagate collapsed state from `Sidebar` to descendant `SidebarNavItem` and `SidebarNavGroup` components. No new dependencies.

**Rationale**: `SidebarNavItem` needs to know whether the parent sidebar is collapsed to hide its text label. Today, SidebarNavItem is a standalone function component with no access to Sidebar's state. Options:

- **CSS-only** (`.bac-sidebar--collapsed .bac-sidebar__nav-label { display: none }`): Works for hiding labels but doesn't let SidebarNavGroup suppress its items panel in JS. Sufficient for the visual requirement.
- **React Context**: Sidebar creates a context with `collapsed` boolean. SidebarNavItem and SidebarNavGroup consume it. More explicit but adds complexity.

**Decision**: Use **CSS-only** for label hiding (simpler, no context needed) combined with **Sidebar-level state** for the `collapsed` prop and `bac-sidebar--collapsed` class. SidebarNavItem's `<span className="bac-sidebar__nav-label">` is hidden via CSS when the parent `<aside>` has `bac-sidebar--collapsed`. SidebarNavGroup's items panel is hidden via the same CSS cascade. No React Context needed — the CSS ancestor selector is sufficient.

**Controlled/uncontrolled**: `useControllableState` (already in the package) manages `collapsed`/`defaultCollapsed`/`onCollapsedChange` with zero new dependencies.

**CSS transitions**: The sidebar's width transition uses `transition: width 0.2s ease` on `.bac-sidebar`. Consumers who need Framer Motion simply override this with their own transition/animation on the same element.

### 6. No New External Dependencies

All five items are implementable with:
- React ^18.0 (peer — already present)
- Existing internal hooks (`useControllableState`)
- CSS custom properties from `globals.css`

No new npm packages. No Radix additions. `package.json` dependency section is unchanged.

## No Unresolved Items

All NEEDS CLARIFICATION items were resolved during the specification phase. No further research blockers.
