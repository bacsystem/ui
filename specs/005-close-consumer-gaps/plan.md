# Implementation Plan: Close Consumer Gaps

**Branch**: `005-close-consumer-gaps` | **Date**: 2026-04-20 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-close-consumer-gaps/spec.md`

## Summary

Close 5 consumer gaps identified in the lingo-fast-web audit by extending ProgressBar (variant, size, max), creating a new Textarea component, adding a `useReducedMotion` hook, adding composable slots to Header, and adding collapsible state to Sidebar. All changes are additive — zero breaking changes. Version bump: v1.2.0 → v1.3.0.

## Technical Context

**Language/Version**: TypeScript ^5.0 (strict mode, no `any`)
**Primary Dependencies**: React ^18.0 (peer), existing internal hooks (`useControllableState`)
**New Dependencies**: None
**Storage**: N/A — component library, no persistence
**Testing**: `tsc --noEmit` (type checking), `tsup` build validation
**Target Platform**: Next.js App Router ^14.0 (`"use client"` banner applied globally via tsup config)
**Project Type**: Library (npm package published to GitHub Packages as `@bacsystem/ui`)
**Constraints**: Zero `any` types, CSS custom properties only, React as peerDependency, `"use client"` banner via tsup
**Scale/Scope**: 3 modified components, 1 new component, 1 new hook, CSS additions. ~8 files changed/created.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Type-Safe Components | PASS | All new/modified components export named props interfaces, strict mode, zero `any`. New types: `ProgressBarVariant`, `ProgressBarSize`, `TextareaProps`, `TextareaResize` |
| II. Design Token Discipline | PASS | ProgressBar variants use existing tokens (`--color-success-base`, `--color-warning-base`, `--color-error-base`). Textarea reuses Input's token set. Sidebar width uses CSS custom property. No hardcoded values |
| III. Component Contract | PASS | All components accept `className`, dark mode via CSS vars, `"use client"` via tsup banner, React is peerDependency |
| IV. Versioning & Breaking Changes | PASS | All changes additive (new optional props, new exports). Minor bump v1.2.0 → v1.3.0 |
| V. Build Quality Gate | PASS | `tsup` produces CJS + ESM + `.d.ts`, `tsc --noEmit` validates types |

**All gates pass. No violations to justify.**

## Project Structure

### Documentation (this feature)

```text
specs/005-close-consumer-gaps/
├── spec.md              # Specification
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── public-api.md    # Phase 1 output
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (files touched)

```text
packages/ui/src/
├── index.ts                                      # MODIFY — add Textarea + useReducedMotion exports
├── hooks/
│   └── useReducedMotion.ts                       # NEW — prefers-reduced-motion hook
├── styles/
│   └── components.css                            # MODIFY — append new CSS rules
└── components/
    ├── ProgressBar/
    │   └── ProgressBar.tsx                       # MODIFY — add variant, size, max props
    ├── Textarea/                                 # NEW directory
    │   ├── Textarea.tsx                          # NEW — multi-line text input
    │   └── index.ts                              # NEW — barrel re-export
    ├── Header/
    │   └── Header.tsx                            # MODIFY — add left/center/right slot props
    └── Sidebar/
        └── Sidebar.tsx                           # MODIFY — add collapsible/collapsed props
```

**Structure Decision**: Follows existing pattern — new component in its own directory with barrel. Modified components edited in-place. CSS appended to existing `components.css`.

## Complexity Tracking

No violations. No complexity justifications needed.

---

## Implementation Notes

### Item 1: ProgressBar Enhancements (FR-001 → FR-005)

**Current state**: `ProgressBarProps` has `value`, `label`, `showLabel`, `className`. `clampValue()` clamps to 0–100. Renders `<progress>` (sr-only) + visual `<div>` track/bar.

**Changes**:
1. Add `ProgressBarVariant` and `ProgressBarSize` types
2. Add `variant`, `size`, `max` to `ProgressBarProps`
3. Update `clampValue(value, max)` to accept `max` parameter; clamp `max` to minimum 1
4. Compute `percentage = clampValue(value, max) / max * 100`
5. Apply BEM modifier classes: `bac-progress--{variant}`, `bac-progress--{size}`
6. Set `aria-valuemax={max}` on the native `<progress>` element
7. Append CSS rules for variant colors and size heights to `components.css`

**Backward compatibility**: All three new props are optional with defaults (`default`, `md`, `100`). Omitting them produces identical output to v1.2.0.

### Item 2: Textarea Component (FR-006 → FR-011)

**New file**: `packages/ui/src/components/Textarea/Textarea.tsx`

**Pattern**: Mirrors Input's structure but simpler:
- `forwardRef<HTMLTextAreaElement, TextareaProps>`
- `useId()` for label/error/hint IDs
- `buildTextareaClasses()` utility function
- BEM prefix: `bac-textarea`
- No floating label, no prefix/suffix, no icons (these are Input-specific)
- `resize` prop mapped to inline style `resize: {value}` on the `<textarea>`

**CSS**: New `.bac-textarea*` rules in `components.css` mirroring Input's visual tokens (borders, focus ring, error/success colors, disabled opacity).

### Item 3: useReducedMotion Hook (FR-012 → FR-014)

**New file**: `packages/ui/src/hooks/useReducedMotion.ts`

**Implementation**:
```
function useReducedMotion(): boolean
  - useState(false) — SSR-safe default
  - useEffect:
    - const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    - Set state to mql.matches
    - Add 'change' event listener → update state
    - Cleanup: remove listener
  - Return state
```

### Item 4: Header Composable Slots (FR-015 → FR-018)

**Current state**: `HeaderProps` requires `title: string | ReactNode`, optional `subtitle`, `actions`.

**Changes**:
1. Make `title` optional (type stays `string | ReactNode`)
2. Add `left?: ReactNode`, `center?: ReactNode`, `right?: ReactNode`
3. Rendering: `const hasSlots = !!(left || center || right)`
   - If `hasSlots`: render three-column flex (`.bac-header--slots`)
   - Else: render existing title/subtitle/actions layout (unchanged)
4. Append CSS rules for `.bac-header--slots` and `.bac-header__slot--*`

**Backward compatibility**: Existing consumers pass `title` (which is now optional but still accepted) and `actions`. Their rendering path is identical.

### Item 5: Sidebar Collapsible (FR-019 → FR-024)

**Current state**: `SidebarProps extends HTMLAttributes<HTMLElement>` with no collapse props. SidebarNavItem renders `<span className="bac-sidebar__nav-label">{children}</span>`.

**Changes to `Sidebar`**:
1. Add `collapsible`, `collapsed`, `defaultCollapsed`, `onCollapsedChange` to `SidebarProps`
2. Import and use `useControllableState`
3. Apply `bac-sidebar--collapsible` when `collapsible` is true
4. Apply `bac-sidebar--collapsed` when state is collapsed
5. Set CSS custom property `--bac-sidebar-width` for transition target

**CSS additions**:
```css
.bac-sidebar--collapsible {
  transition: width 0.2s ease;
  width: var(--bac-sidebar-width, 256px);
  overflow: hidden;
}

.bac-sidebar--collapsed {
  --bac-sidebar-width: 64px;
}

.bac-sidebar--collapsed .bac-sidebar__nav-label,
.bac-sidebar--collapsed .bac-sidebar__nav-group-label,
.bac-sidebar--collapsed .bac-sidebar__nav-group-chevron,
.bac-sidebar--collapsed .bac-sidebar__nav-group-items {
  display: none;
}
```

**Backward compatibility**: Without `collapsible` prop, no state is created, no classes are added, rendering is identical to v1.2.0.

### CSS Strategy

All new CSS rules are appended to `src/styles/components.css` in this order:
1. ProgressBar variant/size modifiers (after existing `.bac-progress__bar` rules)
2. Textarea rules (new block)
3. Header slot layout rules (after existing `.bac-header` rules)
4. Sidebar collapsible rules (after existing `.bac-sidebar` rules)

Dark mode overrides under `[data-theme="dark"]` are included for each block where applicable.

### Barrel Export Updates

Two new lines in `src/index.ts`:

```typescript
export * from './components/Textarea'
export * from './hooks/useReducedMotion'
```

### Version Bump

v1.2.0 → v1.3.0 per Constitution IV (new exports, zero breaking changes).
