# Tasks: Absorb Local UI Components into @bacsystem/ui

**Input**: Design documents from `/specs/004-absorb-local-components/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/public-api.md

**Tests**: Not requested in spec. No test tasks included.

**Organization**: Tasks grouped by user story. US1 and US2 are both P1 but separated for independent delivery. US3/US4/US5 are validation-only (components already exist).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Library package**: `packages/ui/src/` at repository root
- **Components**: `packages/ui/src/components/{ComponentName}/`
- **Styles**: `packages/ui/src/styles/components.css`
- **Barrel**: `packages/ui/src/index.ts` (already has all export lines)

---

## Phase 1: Setup

**Purpose**: No setup tasks needed — project structure, barrel exports, and build config already exist.

**Checkpoint**: Barrel `packages/ui/src/index.ts` already exports from all component paths. Build currently fails because Spinner, Label, ProgressBar, Table, EmptyState, Stepper, Sidebar, Header directories don't have implementation files yet.

---

## Phase 2: Foundational (Build Blocker)

**Purpose**: Create Spinner — Button.tsx already imports it (`import { Spinner } from '../Spinner'`), blocking the entire build.

**CRITICAL**: No other component work can proceed until Spinner exists and `pnpm typecheck` passes.

- [x] T001 Create Spinner component in `packages/ui/src/components/Spinner/Spinner.tsx` — implement with `forwardRef`, props: `size` (`'sm' | 'md' | 'lg'`, default `'md'`), `className`. Use CSS border animation with existing `bac-spin` keyframe. Export `SpinnerProps` and `SpinnerSize` types.
- [x] T002 Create barrel file `packages/ui/src/components/Spinner/index.ts` — re-export everything from `./Spinner`
- [x] T003 Add Spinner CSS rules to `packages/ui/src/styles/components.css` — add `.bac-spinner` base class (inline-block, border, border-radius, animation: bac-spin), size modifiers `.bac-spinner--sm` (16px), `.bac-spinner--md` (24px), `.bac-spinner--lg` (32px). Use CSS custom properties for colors. Add `[data-theme="dark"]` overrides.

**Checkpoint**: Run `pnpm typecheck` from `packages/ui/` — should pass with zero errors (Spinner satisfies Button's import). Run `pnpm build` to verify CJS + ESM + `.d.ts` + `styles.css` output.

---

## Phase 3: User Story 1 — Consumer App Replaces Local Primitives (Priority: P1) MVP

**Goal**: Implement Label and ProgressBar so consumer apps can replace local primitives with `@bacsystem/ui` imports. (Spinner already done in Phase 2.)

**Independent Test**: Import Label, Spinner, ProgressBar from the built package and render them — all should display correctly with correct accessibility attributes.

### Implementation for User Story 1

- [x] T004 [P] [US1] Create Label component in `packages/ui/src/components/Label/Label.tsx` — implement with `forwardRef`, extend `React.LabelHTMLAttributes<HTMLLabelElement>`. Props: `required` (optional boolean, shows `*` indicator), `className`. BEM class: `bac-label`, modifier `bac-label--required`. Export `LabelProps` type.
- [x] T005 [P] [US1] Create ProgressBar component in `packages/ui/src/components/ProgressBar/ProgressBar.tsx` — implement with `forwardRef`. Props: `value` (number 0-100, clamp internally), `label` (string), `showLabel` (boolean, default false), `className`. ARIA: `role="progressbar"`, `aria-valuenow`, `aria-valuemin=0`, `aria-valuemax=100`, `aria-label`. BEM classes: `bac-progress`, `bac-progress__track`, `bac-progress__bar`, `bac-progress__label`. Export `ProgressBarProps` type.
- [x] T006 [P] [US1] Create barrel files `packages/ui/src/components/Label/index.ts` and `packages/ui/src/components/ProgressBar/index.ts` — re-export everything from respective component files
- [x] T007 [US1] Add Label and ProgressBar CSS rules to `packages/ui/src/styles/components.css` — Label: `.bac-label` (font-size, font-weight, color using CSS vars), `.bac-label--required::after` (red asterisk). ProgressBar: `.bac-progress` (container), `.bac-progress__track` (bg track, border-radius), `.bac-progress__bar` (fill with transition, primary color), `.bac-progress__label` (text-sm, text-secondary). Add `[data-theme="dark"]` overrides for both.

**Checkpoint**: Run `pnpm typecheck && pnpm build`. Verify Label, Spinner, ProgressBar all appear in `dist/index.d.ts` exports. Verify CSS rules appear in `dist/styles.css`.

---

## Phase 4: User Story 2 — Consumer App Replaces Local Composite Components (Priority: P1)

**Goal**: Implement Table, EmptyState, Stepper, Header, and Sidebar so consumer apps can import composite components from `@bacsystem/ui`.

**Independent Test**: Import Table (with sub-components), EmptyState, Stepper, Header, Sidebar (with sub-components) from the built package and render them in an admin dashboard layout — all should display correctly.

### Implementation for User Story 2

- [x] T008 [P] [US2] Create Table composable primitives in `packages/ui/src/components/Table/Table.tsx` — implement 8 sub-components all with `forwardRef`: `Table` (wraps `<div>` with overflow + `<table>`), `TableHeader` (`<thead>`), `TableBody` (`<tbody>`), `TableFooter` (`<tfoot>`), `TableRow` (`<tr>`), `TableHead` (`<th>`), `TableCell` (`<td>`), `TableCaption` (`<caption>`). Each accepts `className` and extends corresponding HTML element attributes. BEM classes: `bac-table`, `bac-table__header`, `bac-table__body`, `bac-table__footer`, `bac-table__row`, `bac-table__head`, `bac-table__cell`, `bac-table__caption`. Export all props types.
- [x] T009 [P] [US2] Create EmptyState component in `packages/ui/src/components/EmptyState/EmptyState.tsx` — implement as function component. Props: `title` (string, required), `description` (string, optional), `icon` (`LucideIcon | ReactNode`, optional), `actions` (`ReactNode`, optional), `className`. Render icon (if provided) above title, description below title, actions at bottom. BEM classes: `bac-empty-state`, `bac-empty-state__icon`, `bac-empty-state__title`, `bac-empty-state__description`, `bac-empty-state__actions`. Export `EmptyStateProps` type.
- [x] T010 [P] [US2] Create Stepper components in `packages/ui/src/components/Stepper/Stepper.tsx` — implement `Stepper` (wraps `<ol>`) and `StepperStep` (wraps `<li>`). Stepper props: `orientation` (`'horizontal' | 'vertical'`, default `'horizontal'`), `children`, `className`. StepperStep props: `status` (`'pending' | 'current' | 'completed' | 'error'`, default `'pending'`), `label` (string, required), `description` (string, optional), `className`. Use `aria-current="step"` for current step. BEM classes: `bac-stepper`, `bac-stepper--horizontal`, `bac-stepper--vertical`, `bac-stepper__step`, `bac-stepper__step--pending/current/completed/error`, `bac-stepper__indicator`, `bac-stepper__connector`, `bac-stepper__label`, `bac-stepper__description`. Export `StepperProps`, `StepperStepProps`, `StepStatus`, `StepperOrientation` types.
- [x] T011 [P] [US2] Create Header component in `packages/ui/src/components/Header/Header.tsx` — implement with `forwardRef`. Props: `title` (`string | ReactNode`, required), `subtitle` (`string | ReactNode`, optional), `actions` (`ReactNode`, optional), `className`. Render as `<header>` with title area (left) and actions area (right, flex). BEM classes: `bac-header`, `bac-header__content`, `bac-header__title`, `bac-header__subtitle`, `bac-header__actions`. Export `HeaderProps` type.
- [x] T012 [P] [US2] Create Sidebar composable primitives in `packages/ui/src/components/Sidebar/Sidebar.tsx` — implement 7 sub-components: `Sidebar` (`<aside>` with `forwardRef`), `SidebarHeader` (`<div>`), `SidebarContent` (`<div>`, flex-1 overflow-y-auto), `SidebarFooter` (`<div>`), `SidebarNav` (`<nav>` with optional `aria-label`), `SidebarNavItem` (renders `<a>` if `href` provided, `<button>` otherwise; props: `icon`, `active`, `disabled`), `SidebarNavGroup` (collapsible group using `useDisclosure`; props: `label`, `icon`, `defaultOpen=true`, `collapsible=true`, `children`). BEM classes: `bac-sidebar`, `bac-sidebar__header`, `bac-sidebar__content`, `bac-sidebar__footer`, `bac-sidebar__nav`, `bac-sidebar__nav-item`, `bac-sidebar__nav-item--active`, `bac-sidebar__nav-group`, `bac-sidebar__nav-group--open`, `bac-sidebar__nav-group-header`, `bac-sidebar__nav-group-items`. Export all props types.
- [x] T013 [P] [US2] Create barrel files for all Phase 4 components — create `packages/ui/src/components/Table/index.ts`, `packages/ui/src/components/EmptyState/index.ts`, `packages/ui/src/components/Stepper/index.ts`, `packages/ui/src/components/Header/index.ts`, `packages/ui/src/components/Sidebar/index.ts`. Each re-exports everything from its component file.
- [x] T014 [US2] Add Table CSS rules to `packages/ui/src/styles/components.css` — `.bac-table` (wrapper with overflow-x-auto, border, border-radius), `.bac-table table` (width 100%, border-collapse), `.bac-table__head` (th styling: padding, text-align left, font-size xs, font-weight semibold, uppercase, letter-spacing, color text-secondary, bg neutral-50, border-bottom), `.bac-table__cell` (td styling: padding, font-size sm, color text-primary, border-bottom for non-last rows), `.bac-table__row` (hover bg), `.bac-table__footer` (bg neutral-50, font-weight medium), `.bac-table__caption` (padding, text-sm, text-secondary). Add `[data-theme="dark"]` overrides.
- [x] T015 [US2] Add EmptyState CSS rules to `packages/ui/src/styles/components.css` — `.bac-empty-state` (flex column, align-items center, text-align center, padding sp-10), `.bac-empty-state__icon` (color neutral-400, margin-bottom sp-4), `.bac-empty-state__title` (font-size lg, font-weight semibold, color text-primary, margin-bottom sp-2), `.bac-empty-state__description` (font-size sm, color text-secondary, max-width 24rem, margin-bottom sp-6), `.bac-empty-state__actions` (display flex, gap sp-3). Add `[data-theme="dark"]` overrides.
- [x] T016 [US2] Add Stepper CSS rules to `packages/ui/src/styles/components.css` — Horizontal: `.bac-stepper--horizontal` (display flex, align-items flex-start), step items flex with connector lines between. Vertical: `.bac-stepper--vertical` (flex-direction column). Step indicator: circle with status colors (pending=neutral, current=primary, completed=success with checkmark, error=error). Connector: line between steps. `.bac-stepper__label` (font-size sm, font-weight medium), `.bac-stepper__description` (font-size xs, color text-secondary). Add `[data-theme="dark"]` overrides.
- [x] T017 [US2] Add Header CSS rules to `packages/ui/src/styles/components.css` — `.bac-header` (display flex, align-items center, justify-content space-between, gap sp-4, padding-bottom sp-4, optionally border-bottom), `.bac-header__content` (flex 1, min-width 0), `.bac-header__title` (font-family display, font-size xl, font-weight bold, color text-primary), `.bac-header__subtitle` (font-size sm, color text-secondary, margin-top sp-1), `.bac-header__actions` (display flex, align-items center, gap sp-2, flex-shrink 0). Add `[data-theme="dark"]` overrides.
- [x] T018 [US2] Add Sidebar CSS rules to `packages/ui/src/styles/components.css` — `.bac-sidebar` (display flex, flex-direction column, height 100%, border-right, bg-card), `.bac-sidebar__header` (padding sp-4, border-bottom), `.bac-sidebar__content` (flex 1, overflow-y auto, padding sp-2), `.bac-sidebar__footer` (padding sp-4, border-top), `.bac-sidebar__nav` (display flex, flex-direction column, gap sp-1), `.bac-sidebar__nav-item` (display flex, align-items center, gap sp-3, padding sp-2 sp-3, border-radius, font-size sm, color text-secondary, transition, cursor pointer), `.bac-sidebar__nav-item:hover` (bg neutral-100, color text-primary), `.bac-sidebar__nav-item--active` (bg primary-50, color primary-700, font-weight medium), `.bac-sidebar__nav-item--disabled` (opacity 0.5, cursor not-allowed), `.bac-sidebar__nav-group-header` (same as nav-item plus chevron rotation on open), `.bac-sidebar__nav-group-items` (padding-left sp-6). Add `[data-theme="dark"]` overrides.

**Checkpoint**: Run `pnpm typecheck && pnpm build`. Verify all Phase 4 components appear in `dist/index.d.ts` exports. Verify all CSS rules appear in `dist/styles.css`.

---

## Phase 5: User Story 3 — Legacy Variant Compatibility (Priority: P2)

**Goal**: Validate that Button and Badge already handle legacy variants correctly. No code changes expected — Button and Badge are already implemented with internal legacy mapping.

**Independent Test**: Render `<Button variant="default">`, `<Button variant="destructive">`, `<Button variant="outline">` and `<Badge variant="secondary">`, `<Badge variant="gradient">`, `<Badge variant="premium">` — all should produce correct class names.

### Validation for User Story 3

- [x] T019 [US3] Verify Button legacy variant mapping in `packages/ui/src/components/Button/Button.tsx` — confirm `resolveButtonStyle` maps `default`→`primary`, `destructive`→`danger`, `outline`→`secondary`+`outline` appearance. Confirm `loading`, `iconLeft`, `iconRight`, `asChild`, `size`, `appearance`, `disabled` props all function. If any gap found, fix it; otherwise mark complete.
- [x] T020 [US3] Verify Badge legacy variant mapping in `packages/ui/src/components/Badge/Badge.tsx` — confirm `resolveBadgeStyle` maps `secondary`→`default`+`soft`, `outline`→`default`+`outline`, `destructive`→`danger`+`soft`, `gradient`→`primary`+`filled`+gradient class, `premium`→`warning`+`filled`+premium class. Confirm `appearance` prop works. If any gap found, fix it; otherwise mark complete.

**Checkpoint**: Button and Badge legacy APIs are confirmed working. Consumer apps can remove local wrappers.

---

## Phase 6: User Story 4 — Tabs and DropdownMenu Already Covered (Priority: P2)

**Goal**: Validate that Tabs and DropdownMenu composable APIs match consumer expectations. No code changes expected.

**Independent Test**: Render composable Tabs (Tabs + TabsList + TabsTrigger + TabsContent) and DropdownMenu (all sub-components) — verify they render and behave correctly.

### Validation for User Story 4

- [x] T021 [US4] Verify Tabs composable exports in `packages/ui/src/components/Tabs/Tabs.tsx` — confirm `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` are all exported with correct types. Confirm both legacy `items` API and composable API work. If any gap found, fix it; otherwise mark complete.
- [x] T022 [US4] Verify DropdownMenu exports in `packages/ui/src/components/DropdownMenu/DropdownMenu.tsx` — confirm all required sub-components are exported: `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuGroup`, `DropdownMenuPortal`, `DropdownMenuSub`, `DropdownMenuRadioGroup`. Confirm `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent` are also available. If any gap found, fix it; otherwise mark complete.

**Checkpoint**: Tabs and DropdownMenu APIs are confirmed matching consumer expectations.

---

## Phase 7: User Story 5 — Hooks and Utilities (Priority: P3)

**Goal**: Validate that hooks and cn utility are exported and usable. No code changes expected.

**Independent Test**: Import `useControllableState`, `useDisclosure`, `cn` from built package — verify they work.

### Validation for User Story 5

- [x] T023 [US5] Verify hook and utility exports in `packages/ui/src/index.ts` — confirm `useControllableState`, `useDisclosure`, `useTheme`, `useBreakpoint`, and `cn` are all exported. Verify types are exported. If any gap found, fix it; otherwise mark complete.

**Checkpoint**: All hooks and utilities confirmed available from package.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Build validation, version bump, and final checks across all components.

- [x] T024 Run full type check: `pnpm typecheck` from `packages/ui/` — must pass with zero errors
- [x] T025 Run full build: `pnpm build` from `packages/ui/` — must produce `dist/index.js`, `dist/index.mjs`, `dist/index.d.ts`, `dist/styles.css`
- [x] T026 Verify all new component exports appear in `dist/index.d.ts` — check that Label, Spinner, ProgressBar, Table (8 sub-components), EmptyState, Stepper (2 sub-components), Header, Sidebar (7 sub-components) and their types are present
- [x] T027 Verify all new CSS classes appear in `dist/styles.css` — check for `bac-label`, `bac-spinner`, `bac-progress`, `bac-table`, `bac-empty-state`, `bac-stepper`, `bac-header`, `bac-sidebar` and their variants/modifiers
- [x] T028 Bump version in `packages/ui/package.json` from `1.1.0` to `1.2.0` (minor bump — new components, zero breaking changes)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No tasks — project already set up
- **Phase 2 (Foundational)**: BLOCKS everything — Spinner must exist for Button to compile
- **Phase 3 (US1)**: Depends on Phase 2 — Label and ProgressBar are independent of each other
- **Phase 4 (US2)**: Depends on Phase 2 — all 5 component groups are independent of each other (Sidebar uses `useDisclosure` which already exists)
- **Phase 5 (US3)**: No dependencies — validation only
- **Phase 6 (US4)**: No dependencies — validation only
- **Phase 7 (US5)**: No dependencies — validation only
- **Phase 8 (Polish)**: Depends on Phases 2-4 completion

### User Story Dependencies

- **US1 (P1)**: Depends on Phase 2 (Spinner). Label and ProgressBar are independent of each other.
- **US2 (P1)**: Depends on Phase 2 (Spinner). All 5 component groups (Table, EmptyState, Stepper, Header, Sidebar) are independent of each other.
- **US3 (P2)**: No dependencies — validation of existing code
- **US4 (P2)**: No dependencies — validation of existing code
- **US5 (P3)**: No dependencies — validation of existing code

### Within Each User Story

- Component .tsx file before barrel index.ts
- Component implementation before CSS rules
- Tasks marked [P] within a phase can run in parallel

### Parallel Opportunities

- **Phase 3**: T004 (Label) and T005 (ProgressBar) can run in parallel
- **Phase 4**: T008 (Table), T009 (EmptyState), T010 (Stepper), T011 (Header), T012 (Sidebar) can ALL run in parallel
- **Phase 5-7**: Can all run in parallel (validation only, different files)
- **Phase 3 and Phase 4**: Can run in parallel after Phase 2 completes (US1 and US2 are independent)

---

## Parallel Example: Phase 4 (User Story 2)

```text
# Launch all 5 component implementations together (all [P]):
Task T008: "Create Table composable primitives in packages/ui/src/components/Table/Table.tsx"
Task T009: "Create EmptyState component in packages/ui/src/components/EmptyState/EmptyState.tsx"
Task T010: "Create Stepper components in packages/ui/src/components/Stepper/Stepper.tsx"
Task T011: "Create Header component in packages/ui/src/components/Header/Header.tsx"
Task T012: "Create Sidebar composable primitives in packages/ui/src/components/Sidebar/Sidebar.tsx"

# Then all barrel files together:
Task T013: "Create barrel files for Table, EmptyState, Stepper, Header, Sidebar"

# Then all CSS together (or sequentially — same file):
Tasks T014-T018: "Add CSS rules for Table, EmptyState, Stepper, Header, Sidebar"
# Note: T014-T018 edit the same file (components.css) so must be sequential
```

---

## Implementation Strategy

### MVP First (Phase 2 + US1)

1. Complete Phase 2: Spinner (unblocks build)
2. Complete Phase 3: Label + ProgressBar
3. **STOP and VALIDATE**: `pnpm typecheck && pnpm build` passes, Label/Spinner/ProgressBar all exported
4. Consumer apps can already migrate 3 primitive components

### Incremental Delivery

1. Phase 2 → Spinner (build unblocked)
2. Phase 3 (US1) → Label, ProgressBar (primitives migrated)
3. Phase 4 (US2) → Table, EmptyState, Stepper, Header, Sidebar (composites migrated)
4. Phase 5-7 → Validation of existing components
5. Phase 8 → Version bump to 1.2.0, publish

### Parallel Team Strategy

With multiple developers after Phase 2:

- Developer A: US1 (Label, ProgressBar) + US3 (Button/Badge validation)
- Developer B: US2 Table + EmptyState + Stepper
- Developer C: US2 Header + Sidebar + US4/US5 validation
- All stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- CSS tasks (T014-T018) edit the same file so must be sequential despite being in the same phase
- Barrel `src/index.ts` already has export lines for all new components — no barrel changes needed
- Validation tasks (US3/US4/US5) should take minimal time — existing code is already functional
- Commit after each component group (component + barrel + CSS)
