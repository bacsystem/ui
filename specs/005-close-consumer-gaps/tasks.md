# Tasks: Close Consumer Gaps — @bacsystem/ui v1.3.0

**Input**: Design documents from `/specs/005-close-consumer-gaps/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/public-api.md

**Tests**: Not requested in spec. No test tasks included.

**Organization**: Tasks grouped by user story / gap item. Items 1–2 are P1, items 3–4 are P2, item 5 is P3. All five are independent of each other — no inter-item dependencies. CSS tasks edit the same file and must be sequential.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Library package**: `packages/ui/src/` at repository root
- **Components**: `packages/ui/src/components/{ComponentName}/`
- **Hooks**: `packages/ui/src/hooks/`
- **Styles**: `packages/ui/src/styles/components.css`
- **Barrel**: `packages/ui/src/index.ts`

---

## Phase 1: ProgressBar Enhancements (Priority: P1) — US1

**Purpose**: Extend the existing ProgressBar with `variant`, `size`, and `max` props so consumer apps can remove their local ProgressBar wrappers.

**Independent Test**: Render `<ProgressBar variant="success" size="xs" value={3} max={5} />` — verify 60% fill, success color, 4px height.

### Implementation

- [ ] T001 [US1] Extend ProgressBar in `packages/ui/src/components/ProgressBar/ProgressBar.tsx` — Add `ProgressBarVariant = 'default' | 'success' | 'warning' | 'danger'` and `ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg'` types. Add `variant?: ProgressBarVariant` (default `'default'`), `size?: ProgressBarSize` (default `'md'`), `max?: number` (default `100`) to `ProgressBarProps`. Update `clampValue(value, max)` to accept a second parameter; clamp `max` to minimum `1` to avoid division by zero. Compute percentage as `Math.round(clampedValue / safeMax * 100)`. Apply BEM modifier classes `bac-progress--{variant}` (skip for `'default'`) and `bac-progress--{size}` (skip for `'md'`) via `cn()`. Update `<progress>` element to set `max={safeMax}`. Add `aria-valuemax` on the container if `max !== 100`. Export `ProgressBarVariant` and `ProgressBarSize` types.

- [ ] T002 [US1] Add ProgressBar variant/size CSS rules to `packages/ui/src/styles/components.css` — Append after existing `.bac-progress__bar` dark-mode block. **Variant modifiers**: `.bac-progress--success .bac-progress__bar` (background: `var(--color-success-base)`, no gradient), `.bac-progress--warning .bac-progress__bar` (background: `var(--color-warning-base)`), `.bac-progress--danger .bac-progress__bar` (background: `var(--color-error-base)`). **Size modifiers**: `.bac-progress--xs .bac-progress__track` (height: 4px), `.bac-progress--sm .bac-progress__track` (height: 6px), `.bac-progress--lg .bac-progress__track` (height: 16px). Default `md` (10px) is already the existing value — no class needed.

**Checkpoint**: `pnpm typecheck && pnpm build` from `packages/ui/`. Verify `ProgressBarVariant` and `ProgressBarSize` appear in `dist/index.d.ts`.

---

## Phase 2: Textarea Component (Priority: P1) — US2

**Purpose**: Create a new Textarea component matching Input's visual contract so consumer apps can remove their local Textarea.

**Independent Test**: Render `<Textarea label="Bio" error="Required" rows={4} />` — verify `<textarea>` element with error styling, 4 rows, label above, error message below.

### Implementation

- [ ] T003 [P] [US2] Create Textarea component in `packages/ui/src/components/Textarea/Textarea.tsx` — Implement with `forwardRef<HTMLTextAreaElement, TextareaProps>`. Define `TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both'`. Define `TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>` with: `label?: string`, `error?: string`, `hint?: string`, `success?: string`, `resize?: TextareaResize` (default `'vertical'`), `className?: string`. Use `useId()` for label/error/hint/success IDs (same pattern as Input). Create `buildTextareaClasses()` helper that combines `bac-textarea`, error/success/disabled modifiers, and `className`. Render structure: outer `<div className="bac-textarea__wrapper">`, optional `<label>` if `label` provided, `<textarea>` with `ref`, inline style `resize: {resize}`, `aria-invalid` if error, `aria-describedby` linking to hint/error/success. Below textarea: error `<p>` with `role="alert"`, or success `<p>`, or hint `<p>` (precedence: error > success > hint). Export `TextareaProps` and `TextareaResize` types.

- [ ] T004 [P] [US2] Create barrel file `packages/ui/src/components/Textarea/index.ts` — Single line: `export * from './Textarea'`

- [ ] T005 [US2] Add Textarea CSS rules to `packages/ui/src/styles/components.css` — New section `/* ── Textarea ── */`. `.bac-textarea__wrapper` (display flex, flex-direction column, gap `var(--sp-1)`). `.bac-textarea__label` (font-size `var(--text-sm)`, font-weight `var(--font-weight-medium)`, color `var(--color-text-primary)`). `.bac-textarea` (base: width 100%, padding `var(--sp-2) var(--sp-3)`, border: 1px solid `var(--color-border)`, border-radius `var(--radius-base)`, font-size `var(--text-sm)`, color `var(--color-text-primary)`, background `var(--color-bg-input, #fff)`, outline none, transition border-color 0.15s). `.bac-textarea:focus` (border-color `var(--color-primary-500)`, box-shadow `0 0 0 3px var(--color-primary-100)`). `.bac-textarea--error` (border-color `var(--color-error-base)`). `.bac-textarea--error:focus` (box-shadow with `var(--color-error-light)`). `.bac-textarea--success` (border-color `var(--color-success-base)`). `.bac-textarea--disabled` (opacity 0.5, cursor not-allowed, background `var(--color-neutral-50)`). `.bac-textarea__error-text` (font-size `var(--text-xs)`, color `var(--color-error-text)`). `.bac-textarea__success-text` (font-size `var(--text-xs)`, color `var(--color-success-text)`). `.bac-textarea__hint` (font-size `var(--text-xs)`, color `var(--color-text-secondary)`). Add `[data-theme="dark"]` overrides for label, textarea, focus ring, and message colors.

- [ ] T006 [US2] Add Textarea export to `packages/ui/src/index.ts` — Add line `export * from './components/Textarea'` in the Components section, after the Input export line.

**Checkpoint**: `pnpm typecheck && pnpm build`. Verify `Textarea`, `TextareaProps`, `TextareaResize` appear in `dist/index.d.ts`. Verify `.bac-textarea` rules in `dist/styles.css`.

---

## Phase 3: useReducedMotion Hook (Priority: P2) — US3

**Purpose**: Create a `useReducedMotion` hook so consumer apps can import it from the library instead of maintaining local copies.

**Independent Test**: Call `useReducedMotion()` in a component — verify it returns `true` when `prefers-reduced-motion: reduce` is active.

### Implementation

- [ ] T007 [P] [US3] Create useReducedMotion hook in `packages/ui/src/hooks/useReducedMotion.ts` — Implement `useReducedMotion(): boolean`. Use `useState(false)` for SSR-safe default. In `useEffect`: create `const mql = globalThis.matchMedia('(prefers-reduced-motion: reduce)')`, set state to `mql.matches`, add `'change'` event listener that updates state to `event.matches`, cleanup by removing listener. Guard `matchMedia` check with `typeof globalThis.matchMedia === 'function'` for SSR. Return state. Follow same pattern as `useBreakpoint.ts`.

- [ ] T008 [US3] Add useReducedMotion export to `packages/ui/src/index.ts` — Add line `export * from './hooks/useReducedMotion'` in the Hooks section, after the `useDisclosure` export line.

**Checkpoint**: `pnpm typecheck && pnpm build`. Verify `useReducedMotion` appears in `dist/index.d.ts`.

---

## Phase 4: Header Composable Slots (Priority: P2) — US4

**Purpose**: Add `left`/`center`/`right` slot props to Header so the consumer app can build an app shell layout without local workarounds.

**Independent Test**: Render `<Header left={<button>☰</button>} center={<nav>Breadcrumbs</nav>} right={<button>Theme</button>} />` — verify three-column layout.

### Implementation

- [ ] T009 [US4] Extend Header in `packages/ui/src/components/Header/Header.tsx` — Add `left?: ReactNode`, `center?: ReactNode`, `right?: ReactNode` to `HeaderProps`. Make `title` optional (change from `readonly title: string | ReactNode` to `readonly title?: string | ReactNode`). In the render function, compute `const hasSlots = !!(left || center || right)`. If `hasSlots`: render `<header className={cn('bac-header bac-header--slots', className)}>` with three children: `<div className="bac-header__slot--left">{left}</div>`, `<div className="bac-header__slot--center">{center}</div>`, `<div className="bac-header__slot--right">{right}</div>`. Else: render the existing title/subtitle/actions layout unchanged. Destructure `left`, `center`, `right` from props alongside existing destructured props.

- [ ] T010 [US4] Add Header slot CSS rules to `packages/ui/src/styles/components.css` — Append after existing `[data-theme="dark"] .bac-header__subtitle` block. `.bac-header--slots` (display flex, align-items center, gap `var(--sp-4)`). `.bac-header__slot--left` (display flex, align-items center, gap `var(--sp-2)`, flex-shrink 0). `.bac-header__slot--center` (flex 1 1 auto, display flex, align-items center, justify-content center, min-width 0). `.bac-header__slot--right` (display flex, align-items center, gap `var(--sp-2)`, flex-shrink 0, margin-left auto).

**Checkpoint**: `pnpm typecheck && pnpm build`. Verify `HeaderProps` in `dist/index.d.ts` includes `left`, `center`, `right`. Verify `.bac-header--slots` in `dist/styles.css`.

---

## Phase 5: Sidebar Collapsible (Priority: P3) — US5

**Purpose**: Add collapsible state management and CSS transitions to Sidebar so the consumer app can use the library's collapse logic instead of a fully local implementation.

**Independent Test**: Render `<Sidebar collapsible defaultCollapsed={false}>` with SidebarNavItems that have icons — verify toggling `collapsed` hides labels and narrows the sidebar with a CSS transition.

### Implementation

- [ ] T011 [US5] Extend Sidebar in `packages/ui/src/components/Sidebar/Sidebar.tsx` — Add to `SidebarProps`: `collapsible?: boolean` (default `false`), `collapsed?: boolean`, `defaultCollapsed?: boolean`, `onCollapsedChange?: (collapsed: boolean) => void`. Import `useControllableState` from `../../hooks/useControllableState`. In the Sidebar component: if `collapsible` is true, call `useControllableState({ value: collapsed, defaultValue: defaultCollapsed ?? false, onChange: onCollapsedChange })`. Compute classes with `cn('bac-sidebar', collapsible && 'bac-sidebar--collapsible', collapsible && state.value && 'bac-sidebar--collapsed', className)`. When `collapsible` is false, skip `useControllableState` entirely (no hooks called conditionally — always call it but only use result when collapsible is true; OR restructure to always call). Ensure hook call order is stable — always call `useControllableState` but only apply its classes when `collapsible` is true.

- [ ] T012 [US5] Add Sidebar collapsible CSS rules to `packages/ui/src/styles/components.css` — Append after existing `[data-theme="dark"] .bac-sidebar__nav-item--active` block. `.bac-sidebar--collapsible` (transition: width 0.2s ease, width `var(--bac-sidebar-width, 256px)`, overflow hidden). `.bac-sidebar--collapsed` (`--bac-sidebar-width: 64px`). `.bac-sidebar--collapsed .bac-sidebar__nav-label` (display none). `.bac-sidebar--collapsed .bac-sidebar__nav-group-label` (display none). `.bac-sidebar--collapsed .bac-sidebar__nav-group-chevron` (display none). `.bac-sidebar--collapsed .bac-sidebar__nav-group-items` (display none). `.bac-sidebar--collapsed .bac-sidebar__nav-item, .bac-sidebar--collapsed .bac-sidebar__nav-group-header` (justify-content center, padding `var(--sp-2)`). `.bac-sidebar--collapsed .bac-sidebar__header` (padding `var(--sp-2)`, text-align center). `.bac-sidebar--collapsed .bac-sidebar__footer` (padding `var(--sp-2)`, text-align center).

**Checkpoint**: `pnpm typecheck && pnpm build`. Verify `SidebarProps` in `dist/index.d.ts` includes `collapsible`, `collapsed`, `defaultCollapsed`, `onCollapsedChange`. Verify `.bac-sidebar--collapsed` in `dist/styles.css`.

---

## Phase 6: Polish & Cross-Cutting

**Purpose**: Build validation, version bump, and final checks.

- [ ] T013 Run full type check: `pnpm typecheck` from `packages/ui/` — must pass with zero errors
- [ ] T014 Run full build: `pnpm build` from `packages/ui/` — must produce `dist/index.js`, `dist/index.mjs`, `dist/index.d.ts`, `dist/styles.css`
- [ ] T015 Verify all new/modified exports appear in `dist/index.d.ts` — check for: `ProgressBarVariant`, `ProgressBarSize`, `Textarea`, `TextareaProps`, `TextareaResize`, `useReducedMotion`, `HeaderProps` (with `left`/`center`/`right`), `SidebarProps` (with `collapsible`/`collapsed`)
- [ ] T016 Verify all new CSS classes appear in `dist/styles.css` — check for: `bac-progress--success`, `bac-progress--warning`, `bac-progress--danger`, `bac-progress--xs`, `bac-progress--sm`, `bac-progress--lg`, `bac-textarea`, `bac-header--slots`, `bac-header__slot--left`, `bac-sidebar--collapsible`, `bac-sidebar--collapsed`
- [ ] T017 Bump version in `packages/ui/package.json` from `1.2.0` to `1.3.0` (minor bump — new exports, zero breaking changes per Constitution IV)

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (ProgressBar) ──┐
Phase 2 (Textarea)   ──┤
Phase 3 (Hook)       ──┼── All independent ──▶ Phase 6 (Polish)
Phase 4 (Header)     ──┤
Phase 5 (Sidebar)    ──┘
```

- **Phases 1–5**: All independent of each other — can be executed in any order or in parallel
- **Phase 6**: Depends on all of Phases 1–5 being complete

### Within Each Phase

- Component .tsx changes before CSS changes (CSS references BEM classes defined in component)
- Barrel/index.ts changes can be done alongside component changes
- CSS tasks (T002, T005, T010, T012) all edit `components.css` — if parallelized across phases, they must be serialized since they touch the same file

### Parallel Opportunities

- **T001 + T003 + T007 + T009 + T011**: All component .tsx changes can run in parallel (different files)
- **T004**: Barrel file creation is independent
- **T006 + T008**: Both modify `index.ts` — must be serialized or batched into one edit
- **T002 → T005 → T010 → T012**: All edit `components.css` — must be sequential

### Recommended Execution Flow

```
Batch 1 (parallel — different .tsx files):
  T001: ProgressBar.tsx enhancements
  T003: Textarea.tsx (new)
  T004: Textarea/index.ts (new)
  T007: useReducedMotion.ts (new)
  T009: Header.tsx enhancements
  T011: Sidebar.tsx enhancements

Batch 2 (sequential — same file: index.ts):
  T006: Add Textarea export to index.ts
  T008: Add useReducedMotion export to index.ts

Batch 3 (sequential — same file: components.css):
  T002: ProgressBar CSS
  T005: Textarea CSS
  T010: Header CSS
  T012: Sidebar CSS

Batch 4 (sequential — validation):
  T013: typecheck
  T014: build
  T015: verify exports
  T016: verify CSS
  T017: version bump
```

---

## Task Summary

| Task | Phase | File(s) | Type | FR |
|------|-------|---------|------|-----|
| T001 | 1 | ProgressBar.tsx | Modify | FR-001–FR-005 |
| T002 | 1 | components.css | Modify | FR-001–FR-002 |
| T003 | 2 | Textarea.tsx | New | FR-006–FR-011 |
| T004 | 2 | Textarea/index.ts | New | FR-006 |
| T005 | 2 | components.css | Modify | FR-009 |
| T006 | 2 | index.ts | Modify | FR-006 |
| T007 | 3 | useReducedMotion.ts | New | FR-012–FR-014 |
| T008 | 3 | index.ts | Modify | FR-012 |
| T009 | 4 | Header.tsx | Modify | FR-015–FR-018 |
| T010 | 4 | components.css | Modify | FR-016 |
| T011 | 5 | Sidebar.tsx | Modify | FR-019–FR-024 |
| T012 | 5 | components.css | Modify | FR-021–FR-023 |
| T013 | 6 | — | Validate | FR-026 |
| T014 | 6 | — | Validate | FR-025 |
| T015 | 6 | dist/index.d.ts | Validate | FR-011, FR-012, FR-025 |
| T016 | 6 | dist/styles.css | Validate | FR-027 |
| T017 | 6 | package.json | Modify | FR-025 |

**Total**: 17 tasks — 8 implementation, 3 new files, 4 validation, 1 version bump, 1 barrel
