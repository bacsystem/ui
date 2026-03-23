---

description: "Task list for @bacsystem/ui — React Component Library"
---

# Tasks: @bacsystem/ui — React Component Library

**Input**: Design documents from `/specs/002-component-library-setup/`
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ data-model.md ✅ contracts/ ✅ quickstart.md ✅

**Tests**: Not requested — no test tasks generated. TypeScript strict compile is the primary quality gate.

**Organization**: Tasks grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US5)
- Include exact file paths in descriptions

## Path Conventions

Monorepo root. All paths relative to repo root:

- Library source: `packages/ui/src/`
- Library build output: `packages/ui/dist/`
- Demo app: `apps/demo/`
- Build scripts: `packages/ui/scripts/`
- CI/CD: `.github/workflows/`

---

## Phase 1: Setup (Monorepo Initialization)

**Purpose**: Create the monorepo skeleton and configure all build tooling.

- [ ] T001 Create root `package.json` with npm workspaces (`packages/*`, `apps/*`) and scripts: `dev`, `build:ui`, `build`, `dev:ui`
- [ ] T002 Create `packages/ui/` directory structure: `src/components/`, `src/hooks/`, `src/styles/`, `src/tokens/`, `scripts/`
- [ ] T003 Create `apps/demo/` directory structure: `app/`, `components/`
- [ ] T004 [P] Create `packages/ui/package.json` with name `@bacsystem/ui`, peerDeps (react ^18), deps (lucide-react), and `exports` field for `.`, `./styles.css`, `./tokens.json`
- [ ] T005 [P] Create `packages/ui/tsconfig.json` with `strict: true`, `noEmit: false`, target `ES2020`
- [ ] T006 [P] Create `packages/ui/tsup.config.ts` producing CJS (`dist/index.js`), ESM (`dist/index.mjs`), `.d.ts`, and CSS passthrough for `dist/styles.css`; include `"use client"` banner
- [ ] T007 [P] Create `apps/demo/package.json` with name `@bacsystem/demo`, `@bacsystem/ui: "*"` workspace dep, next ^14, react ^18
- [ ] T008 [P] Create `apps/demo/next.config.js` (minimal Next.js 14 App Router config, transpile `@bacsystem/ui`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Design tokens, token source files, and barrel export must exist before any component can be built.

**CRITICAL**: No user story work begins until this phase is complete.

- [ ] T009 Create `packages/ui/src/styles/globals.css` with all CSS custom properties: primary (9 shades), accent (3), success/warning/error/info (light/base/dark), neutral (11 shades), `--font-display/body/mono`, `--sp-1` through `--sp-16`, `--radius-sm` through `--radius-full`, `--shadow-sm/md/lg/xl`; include `[data-theme="dark"]` overrides for all color tokens
- [ ] T010 [P] Create `packages/ui/src/tokens/colors.ts` exporting typed color token values matching `globals.css`
- [ ] T011 [P] Create `packages/ui/src/tokens/typography.ts`, `spacing.ts`, `radius.ts`, `shadows.ts` exporting typed values
- [ ] T012 Create `packages/ui/scripts/build-tokens-json.ts` that reads `src/tokens/*.ts` and writes `dist/tokens.json` with structure `{ colors, typography, spacing, radius, shadows }`; integrate into `packages/ui/package.json` build script
- [ ] T013 Create `packages/ui/src/index.ts` as empty barrel (will grow with each component phase); verify `npm run build:ui` produces `dist/index.js`, `dist/index.mjs`, `dist/index.d.ts`, `dist/styles.css`, `dist/tokens.json` with zero errors

**Checkpoint**: Foundation ready — all user story implementation can now begin in parallel.

---

## Phase 3: User Story 1 — Install and Use Components (Priority: P1) MVP

**Goal**: All 11 components exported as named TypeScript exports with props interfaces and `className` forwarding.

**Independent Test**: Install workspace-local `@bacsystem/ui` in a fresh Next.js project, import `Button`, render `<Button variant="primary" size="md">Submit</Button>` — zero TypeScript errors, renders correctly.

### Implementation for User Story 1

- [ ] T014 [P] [US1] Create `Button` component in `packages/ui/src/components/Button/Button.tsx`: 6 variants (primary/secondary/accent/ghost/danger/success), 5 sizes (xs/sm/md/lg/xl), `loading` prop showing `Loader2` icon (animated) + disabled state, `iconLeft`/`iconRight` props, `className` forwarding; export `ButtonProps` interface
- [ ] T015 [P] [US1] Create `Badge` component in `packages/ui/src/components/Badge/Badge.tsx`: 6 variants; export `BadgeProps`
- [ ] T016 [P] [US1] Create `Input` component in `packages/ui/src/components/Input/Input.tsx`: default/error/disabled states; `error` prop triggers `AlertCircle` icon; `aria-label`/`aria-describedby` on error; `className` forwarding; export `InputProps`
- [ ] T017 [P] [US1] Create `Card` component in `packages/ui/src/components/Card/Card.tsx`: 4 variants (default/elevated/outlined/tinted), 3 sizes (sm/md/lg); `elevated` uses `--shadow-md`; export `CardProps`
- [ ] T018 [P] [US1] Create `Alert` component in `packages/ui/src/components/Alert/Alert.tsx`: 4 variants with icons (Info/CheckCircle2/AlertTriangle/XCircle); optional `onClose` renders `X` button; export `AlertProps`
- [ ] T019 [P] [US1] Create `Avatar` component in `packages/ui/src/components/Avatar/Avatar.tsx`: 5 sizes; fallback chain src→initials→`User` icon; export `AvatarProps`
- [ ] T020 [P] [US1] Create `Toggle` component in `packages/ui/src/components/Toggle/Toggle.tsx`: 3 sizes; `role="switch"`, `aria-checked`, Space/Enter keyboard; `Check` icon in dot when checked; export `ToggleProps`
- [ ] T021 [P] [US1] Create `Modal` component in `packages/ui/src/components/Modal/Modal.tsx`: 3 sizes; `X` close button; Escape key handler; focus trap while open; `--shadow-xl`; export `ModalProps`
- [ ] T022 [P] [US1] Create `DataTable` component in `packages/ui/src/components/DataTable/DataTable.tsx`: generic `<T>` type; `loading` state with `Loader2` (animated); empty state with `Inbox` icon + `emptyText`; export `DataTableProps`, `DataTableColumn`
- [ ] T023 [P] [US1] Create `StatCard` component in `packages/ui/src/components/StatCard/StatCard.tsx`: 5 color variants; `TrendingUp`/`TrendingDown` icons for trend; export `StatCardProps`
- [ ] T024 [P] [US1] Create `Tabs` component in `packages/ui/src/components/Tabs/Tabs.tsx`: controlled/uncontrolled via `defaultTab`/`onChange`; `disabled` tab support; export `TabsProps`, `TabItem`
- [ ] T025 [US1] Add index.ts re-export for each component directory (`packages/ui/src/components/*/index.ts`)
- [ ] T026 [US1] Export all 11 components and their types from `packages/ui/src/index.ts`
- [ ] T027 [US1] Run `tsc --noEmit` in `packages/ui/`; fix all TypeScript strict-mode errors before proceeding

**Checkpoint**: User Story 1 complete — all 11 components importable and type-safe.

---

## Phase 4: User Story 2 — Design Tokens and Dark Mode (Priority: P2)

**Goal**: `globals.css` tokens accessible to consumers; dark mode toggles all components; `tokens.json` importable from any framework.

**Independent Test**: Import `@bacsystem/ui/styles.css`, set `data-theme="dark"` on `<html>`, render `Card` — colors switch. Import `@bacsystem/ui/tokens.json` — JSON structure with 5 top-level keys present.

### Implementation for User Story 2

- [ ] T028 [P] [US2] Create `useTheme` hook in `packages/ui/src/hooks/useTheme.ts`: returns `{ theme, setTheme, toggleTheme }`; persists to `localStorage` key `bacsystem-ui-theme`; SSR-safe (reads localStorage only on client, defaults to `'light'`); sets/removes `data-theme="dark"` on `document.documentElement`
- [ ] T029 [US2] Verify dark mode CSS variable overrides in `globals.css` for all color tokens (manually test `[data-theme="dark"]` block covers every `--color-*` custom property defined in `:root`)
- [ ] T030 [US2] Run `npm run build:ui` and verify `dist/tokens.json` contains all 5 keys (`colors`, `typography`, `spacing`, `radius`, `shadows`) with correct values matching `globals.css`
- [ ] T031 [US2] Export `useTheme`, `UseThemeReturn`, `Theme` from `packages/ui/src/index.ts`

**Checkpoint**: User Story 2 complete — tokens and dark mode functional.

---

## Phase 5: User Story 3 — useBreakpoint Hook (Priority: P3)

**Goal**: `useBreakpoint` returns reactive breakpoint values that update on viewport resize.

**Independent Test**: Render component using `useBreakpoint` at 375px width — `isMobile: true`, `current: 'sm'`; resize to 1440px — `isDesktop: true`, `current: 'xl'`.

### Implementation for User Story 3

- [ ] T032 [US3] Create `useBreakpoint` hook in `packages/ui/src/hooks/useBreakpoint.ts`: returns `{ isMobile, isTablet, isDesktop, current }`; thresholds: sm (0–767px), md (768–1023px), lg (1024–1279px), xl (1280px+); uses `ResizeObserver` or `window.matchMedia`; automatic cleanup on unmount; SSR-safe
- [ ] T033 [US3] Export `useBreakpoint`, `UseBreakpointReturn`, `Breakpoint` from `packages/ui/src/index.ts`

**Checkpoint**: User Story 3 complete — responsive hook functional.

---

## Phase 6: User Story 4 — Publish to GitHub Packages (Priority: P4)

**Goal**: Pushing a `v*` tag triggers CI that builds and publishes `@bacsystem/ui` to GitHub Packages with no manual steps.

**Independent Test**: Push `v1.0.0` tag → GitHub Actions passes → `npm pack --dry-run` in `packages/ui/dist/` shows all 5 artifacts.

### Implementation for User Story 4

- [ ] T034 [US4] Create `.github/workflows/publish.yml`: trigger `push.tags: ['v*']`; `permissions: packages: write`; steps: checkout → setup-node (node 20, registry `npm.pkg.github.com`, scope `@bacsystem`) → `npm ci` → `npm run build:ui` → `npm publish --workspace=packages/ui`; env `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`
- [ ] T035 [P] [US4] Verify `packages/ui/package.json` `exports` field has all three entries: `.` (CJS/ESM/types), `./styles.css`, `./tokens.json`; verify `sideEffects: ["./dist/styles.css"]` present
- [ ] T036 [P] [US4] Run `npm pack --dry-run --workspace=packages/ui` and confirm `dist/index.js`, `dist/index.mjs`, `dist/index.d.ts`, `dist/styles.css`, `dist/tokens.json` all included; confirm `src/` not included

**Checkpoint**: User Story 4 complete — CI/CD pipeline ready for v1.0.0 tag.

---

## Phase 7: User Story 5 — Interactive Demo App (Priority: P5)

**Goal**: `npm run dev` opens `localhost:3000` with all 13 sections rendering, dark mode toggle and breakpoint indicator working.

**Independent Test**: Run `npm install && npm run dev` from repo root → `localhost:3000` loads → all 13 sidebar sections visible → dark mode toggle switches theme → breakpoint indicator updates on resize.

### Foundation for Demo App

- [ ] T037 [US5] Create `apps/demo/app/layout.tsx`: import `@bacsystem/ui/styles.css`; root `<html>` element; sidebar nav with 13 section links (Tokens, Button, Badge, Input, Card, Alert, Avatar, Toggle, Modal, DataTable, StatCard, Tabs, Hooks); header with dark mode toggle and breakpoint indicator
- [ ] T038 [P] [US5] Create `apps/demo/app/globals.css` with demo-specific layout styles (sidebar width, main content padding, section spacing)
- [ ] T039 [P] [US5] Create `apps/demo/components/DemoSection.tsx`: wrapper with section title, description, and content slot

### Component Demo Sections

- [ ] T040 [P] [US5] Create `apps/demo/app/sections/TokensSection.tsx`: color swatches grid (hex on hover), typography scale specimens (display/body/mono side-by-side), spacing blocks with px values, radius samples, shadow samples
- [ ] T041 [P] [US5] Create `apps/demo/app/sections/ButtonSection.tsx`: all 6 variants rendered, all 5 sizes rendered, loading state demo, iconLeft/iconRight demos
- [ ] T042 [P] [US5] Create `apps/demo/app/sections/BadgeSection.tsx` and `apps/demo/app/sections/InputSection.tsx`: all variants + error state for Input
- [ ] T043 [P] [US5] Create `apps/demo/app/sections/CardSection.tsx` and `apps/demo/app/sections/AlertSection.tsx`: all variants + sizes for Card, all 4 variants for Alert with close button
- [ ] T044 [P] [US5] Create `apps/demo/app/sections/AvatarSection.tsx` and `apps/demo/app/sections/ToggleSection.tsx`: all sizes for Avatar (image/initials/fallback), all sizes and states for Toggle
- [ ] T045 [US5] Create `apps/demo/app/sections/ModalSection.tsx`: "Abrir modal" button that opens a live `Modal` instance; modal contains sample content; Escape and close button both work
- [ ] T046 [US5] Create `apps/demo/app/sections/DataTableSection.tsx`: 5 OperaAI invoice rows (N°, cliente, total PEN, estado); Toggle buttons to switch between default/loading/empty states
- [ ] T047 [P] [US5] Create `apps/demo/app/sections/StatCardSection.tsx` and `apps/demo/app/sections/TabsSection.tsx`: all 5 color variants for StatCard, functional Tabs demo
- [ ] T048 [US5] Create `apps/demo/app/sections/HooksSection.tsx`: useTheme live state display + `setTheme('light')`, `setTheme('dark')`, `toggleTheme()` buttons; useBreakpoint live values (all 4 fields) updating on window resize

### Demo Header (Dark Mode + Breakpoint)

- [ ] T049 [US5] Add dark/light mode toggle to `apps/demo/app/layout.tsx` header using `useTheme()` from `@bacsystem/ui`; persists in localStorage; entire demo switches theme
- [ ] T050 [US5] Add breakpoint indicator to `apps/demo/app/layout.tsx` header using `useBreakpoint()` from `@bacsystem/ui`; displays current breakpoint label updating in real time

**Checkpoint**: User Story 5 complete — demo fully interactive with all 13 sections.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, final validation, repo hygiene.

- [ ] T051 [P] Update `README.md` with "Demo" section: `npm install` + `npm run dev` → `localhost:3000`; add "Install" section pointing to GitHub Packages + `.npmrc` setup
- [ ] T052 [P] Create `CHANGELOG.md` with v1.0.0 entry: list all 11 components, 2 hooks, token set, demo app, GitHub Packages publish
- [ ] T053 Run `npm run build` (all workspaces) and confirm zero errors; confirm all 5 `packages/ui/dist/` artifacts present
- [ ] T054 [P] Run `tsc --noEmit` in both `packages/ui/` and `apps/demo/`; fix any remaining type errors
- [ ] T055 [P] Verify tree shaking: create a minimal consumer importing only `Button`; confirm bundle does not include other components (inspect with `--bundle` flag or esbuild analysis)
- [ ] T056 Follow `quickstart.md` steps end-to-end in a fresh directory; confirm developer can render `Button` in under 5 minutes from `npm install` to first render
- [ ] T057 [P] Verify `tokens.json` values match `globals.css` custom property values (spot-check primary-700, neutral-800, shadow-xl)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — highest priority, start first
- **US2 (Phase 4)**: Depends on Phase 2; can start alongside US1 (different files)
- **US3 (Phase 5)**: Depends on Phase 2; can run parallel to US1 and US2
- **US4 (Phase 6)**: Depends on US1 (needs built package to test publish)
- **US5 (Phase 7)**: Depends on US1+US2+US3 (demo consumes all components and hooks)
- **Polish (Phase 8)**: Depends on all user stories complete

### User Story Dependencies

- **US1 (P1)**: After Phase 2 — independent, no story deps
- **US2 (P2)**: After Phase 2 — `useTheme` independent of components
- **US3 (P3)**: After Phase 2 — `useBreakpoint` independent of components
- **US4 (P4)**: After US1 complete — publish requires built components
- **US5 (P5)**: After US1+US2+US3 complete — demo requires all hooks and components

### Within Each User Story

- Token source files → globals.css → components → barrel export → tsc verify
- Components with same file scope can be built in parallel (T014–T024 all [P])

### Parallel Opportunities

- All Phase 1 tasks T004–T008 can run in parallel after T001–T003
- All token source files T010–T011 can run in parallel
- All 11 component implementations T014–T024 can run in parallel (different files)
- US2 (T028–T031) and US3 (T032–T033) can run in parallel with US1

---

## Parallel Example: User Story 1 (Components)

```bash
# After Phase 2 completes, launch all 11 components simultaneously:
Task: "Create Button component in packages/ui/src/components/Button/Button.tsx"
Task: "Create Badge component in packages/ui/src/components/Badge/Badge.tsx"
Task: "Create Input component in packages/ui/src/components/Input/Input.tsx"
Task: "Create Card component in packages/ui/src/components/Card/Card.tsx"
Task: "Create Alert component in packages/ui/src/components/Alert/Alert.tsx"
Task: "Create Avatar component in packages/ui/src/components/Avatar/Avatar.tsx"
Task: "Create Toggle component in packages/ui/src/components/Toggle/Toggle.tsx"
Task: "Create Modal component in packages/ui/src/components/Modal/Modal.tsx"
Task: "Create DataTable component in packages/ui/src/components/DataTable/DataTable.tsx"
Task: "Create StatCard component in packages/ui/src/components/StatCard/StatCard.tsx"
Task: "Create Tabs component in packages/ui/src/components/Tabs/Tabs.tsx"
# Then sequentially: T025 index.ts → T026 barrel → T027 tsc verify
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T008)
2. Complete Phase 2: Foundational (T009–T013)
3. Complete Phase 3: User Story 1 — all 11 components (T014–T027)
4. **STOP and VALIDATE**: Import `Button` in a Next.js project, verify TypeScript, render
5. Merge / demo if ready

### Incremental Delivery

1. Setup + Foundational → monorepo skeleton + tokens ready
2. US1 → 11 components type-safe and importable (MVP)
3. US2 → dark mode + tokens.json functional
4. US3 → useBreakpoint hook functional
5. US4 → GitHub Packages CI/CD ready
6. US5 → demo app live at localhost:3000

### Parallel Team Strategy (if multiple developers)

After Phase 2 completes:
- Developer A: US1 components (T014–T027)
- Developer B: US2 tokens (T028–T031) + US3 hook (T032–T033)
- Developer C: US4 CI/CD (T034–T036)
- After US1+US2+US3 done: any developer takes US5 demo

---

## Notes

- All [P] tasks = different files, no blocking dependencies between them
- [Story] label maps each task to its user story for traceability
- `tsc --noEmit` is the quality gate — run after each story before marking complete
- All CSS values MUST use CSS custom properties from `globals.css` (RC-07)
- Never import React in bundle output — always verify `react` stays in peerDeps
- `tokens.json` MUST be generated by script, never hand-edited
