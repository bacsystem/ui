# Implementation Plan: Absorb Local UI Components

**Branch**: `004-absorb-local-components` | **Date**: 2026-04-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-absorb-local-components/spec.md`

## Summary

Implement 8 new component groups (Label, Spinner, ProgressBar, Table, EmptyState, Stepper, Sidebar, Header) inside `@bacsystem/ui` and add corresponding CSS rules in `components.css`. Button, Badge, Card sub-components, Tabs, DropdownMenu, Skeleton, hooks, and cn are already implemented — no changes needed. This is a **minor** version bump (new components, zero breaking changes).

## Technical Context

**Language/Version**: TypeScript ^5.0 (strict mode, no `any`)
**Primary Dependencies**: React ^18.0 (peer), @radix-ui/react-slot ^1.1.2, @radix-ui/react-tabs ^1.1.3, @radix-ui/react-dropdown-menu ^2.1.6, lucide-react ^0.300.0
**Storage**: N/A — component library, no persistence
**Testing**: `tsc --noEmit` (type checking), `tsup` build validation
**Target Platform**: Next.js App Router ^14.0 (`"use client"` banner applied globally via tsup config)
**Project Type**: Library (npm package published to GitHub Packages as `@bacsystem/ui`)
**Performance Goals**: N/A — rendering components; no server-side processing
**Constraints**: Zero `any` types, CSS custom properties only (no hardcoded values), React as peerDependency, `"use client"` banner via tsup
**Scale/Scope**: 8 new component files + CSS additions, ~15 exported sub-components total

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Type-Safe Components | PASS | All new components will export named props interfaces, strict mode, zero `any` |
| II. Design Token Discipline | PASS | All styles use CSS custom properties from `globals.css`, dark mode via `[data-theme="dark"]` overrides |
| III. Component Contract | PASS | All components accept `className`, dark mode via CSS vars, `"use client"` via tsup banner, React is peerDependency |
| IV. Versioning & Breaking Changes | PASS | This is a minor bump (new components only), no prop renames/removals |
| V. Build Quality Gate | PASS | `tsup` produces CJS + ESM + `.d.ts`, `tsc --noEmit` validates types |

**All gates pass. No violations to justify.**

## Project Structure

### Documentation (this feature)

```text
specs/004-absorb-local-components/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
packages/ui/
├── src/
│   ├── index.ts                          # Barrel — already exports all components
│   ├── lib/
│   │   └── cn.ts                         # Class utility (existing)
│   ├── hooks/
│   │   ├── useBreakpoint.ts              # Existing
│   │   ├── useTheme.ts                   # Existing
│   │   ├── useControllableState.ts       # Existing
│   │   └── useDisclosure.ts              # Existing
│   ├── styles/
│   │   ├── globals.css                   # Design tokens (existing)
│   │   └── components.css                # Component styles (extend with new components)
│   └── components/
│       ├── Button/                       # Existing — no changes
│       ├── Badge/                        # Existing — no changes
│       ├── Card/                         # Existing — includes sub-components
│       ├── Tabs/                         # Existing — Radix-based, composable
│       ├── DropdownMenu/                 # Existing — Radix-based, full suite
│       ├── Skeleton/                     # Existing — no changes
│       ├── Label/                        # NEW — accessible form label
│       │   ├── Label.tsx
│       │   └── index.ts
│       ├── Spinner/                      # NEW — loading indicator
│       │   ├── Spinner.tsx
│       │   └── index.ts
│       ├── ProgressBar/                  # NEW — determinate progress
│       │   ├── ProgressBar.tsx
│       │   └── index.ts
│       ├── Table/                        # NEW — composable table primitives
│       │   ├── Table.tsx
│       │   └── index.ts
│       ├── EmptyState/                   # NEW — empty state display
│       │   ├── EmptyState.tsx
│       │   └── index.ts
│       ├── Stepper/                      # NEW — multi-step indicator
│       │   ├── Stepper.tsx
│       │   └── index.ts
│       ├── Sidebar/                      # NEW — navigation sidebar primitives
│       │   ├── Sidebar.tsx
│       │   └── index.ts
│       └── Header/                       # NEW — page/section header
│           ├── Header.tsx
│           └── index.ts
└── tsup.config.ts                        # Build config (existing, no changes)
```

**Structure Decision**: Follows existing pattern — each component in its own directory with `ComponentName.tsx` + `index.ts` barrel. All components export from `src/index.ts`. CSS rules appended to `src/styles/components.css`.

## Complexity Tracking

No violations. No complexity justifications needed.

---

## Implementation Notes

### Already Complete (no work needed)

| Component | Why |
|-----------|-----|
| Button | Has legacy variant mapping (`default`→`primary`, `destructive`→`danger`, `outline`→`secondary`), appearance, loading, icons, asChild |
| Badge | Has legacy variant mapping (`secondary`, `outline`, `destructive`, `gradient`, `premium`), appearance prop |
| Card + CardHeader/Title/Description/Content/Footer | All sub-components implemented with forwardRef |
| Tabs + TabsList/TabsTrigger/TabsContent | Radix-based, dual legacy/composable API |
| DropdownMenu (full suite) | Radix-based, all sub-components exported |
| Skeleton | Variant, width, height, shimmer animation |
| useControllableState | Generic controlled/uncontrolled state hook |
| useDisclosure | Open/close/toggle built on useControllableState |
| cn | Class concatenation utility |

### New Components (implementation required)

All new components follow this pattern:
- forwardRef where the component wraps a DOM element
- Named props interface exported
- BEM class naming: `bac-{component}`, `bac-{component}__{element}`, `bac-{component}--{modifier}`
- CSS custom properties only — no hardcoded values
- Dark mode via `[data-theme="dark"]` overrides in components.css
- `className` prop forwarded to outermost element

| Component | Base | Key Props |
|-----------|------|-----------|
| Label | Native `<label>` | `htmlFor`, `required`, `className` |
| Spinner | Native `<span>` + CSS animation | `size` (sm/md/lg), `className` |
| ProgressBar | Native `<div>` + ARIA | `value`, `label`, `showLabel`, `className` |
| Table (8 sub-components) | Native `<table>` elements | `className` on each |
| EmptyState | Native `<div>` | `title`, `description`, `icon`, `actions`, `className` |
| Stepper (Stepper, StepperStep) | Native `<div>`/`<ol>` | `orientation`, `className`; step: `status`, `label`, `description` |
| Sidebar (7 sub-components) | Native `<aside>`/`<nav>`/`<div>` | `className` on each; SidebarNavGroup: `label`, `defaultOpen`, `collapsible` |
| Header | Native `<header>` | `title`, `subtitle`, `actions`, `className` |

### CSS Strategy

Append new component rules to `src/styles/components.css`. Each component block includes:
1. Light mode base styles (using CSS custom properties)
2. Dark mode overrides under `[data-theme="dark"]`

No new CSS files — maintain single `components.css` merged with `globals.css` into `dist/styles.css` by tsup onSuccess hook.

### Version Bump

This feature constitutes a **minor** version bump per Constitution IV:
- New components = minor
- No prop renames/removals = not major
- Suggested: `1.1.0` → `1.2.0`
