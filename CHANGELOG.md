# Changelog

## v1.2.0 — 2026-04-19

### New components

- **Tooltip** — new `Tooltip` component with `top | bottom | left | right` placements, hover/focus activation, Escape close support, and `aria-describedby` wiring.
- **Skeleton** — new shimmer placeholder component with `text`, `circle`, and `rect` variants.
- **Select** — new native `<select>`-based form control aligned visually with `Input`, including `label`, `hint`, `error`, `success`, and `sm | md | lg` sizes.
- **Breadcrumb** — new semantic navigation component with `<nav aria-label="Breadcrumb">`, linked items, current-page handling, and custom separator support.
- **Label** — accessible form label primitive with optional required indicator.
- **Spinner** — lightweight loading indicator with `sm | md | lg` sizes.
- **ProgressBar** — determinate progress primitive with value clamping, native `<progress>` support, and optional visual meta.
- **Table** — composable table primitives for static admin and reporting layouts.
- **EmptyState** — reusable empty-state block with icon and action slots.
- **Stepper** — horizontal or vertical multi-step indicator with `pending | current | completed | error` states.
- **Sidebar** — shell and navigation primitives with collapsible groups powered by `useDisclosure`.
- **Header** — page and section header primitive with title, subtitle, and actions.

### Package API

- **Expanded exports** — `DropdownMenu`, `useControllableState`, `useDisclosure`, and `cn` are now part of the documented public surface alongside the new component groups.
- **Minor release bump** — all changes are additive; existing APIs remain compatible with prior consumers.

### Demo improvements

- **Responsive demo layout** — mobile navigation drawer with hamburger trigger, overlay close behavior, Escape handling, and desktop reset behavior for the component showcase.
- **Props tables** — every demo section now supports a **"Ver props"** toggle showing `Prop`, `Tipo`, `Default`, and `Descripción` in a horizontally scrollable table.
- **New demo sections** — added showcase sections for `Tooltip`, `Skeleton`, `Select`, and `Breadcrumb` in the demo sidebar and page flow.
- **Dynamic motion showcases** — every component section now renders a second interactive motion playground.
- **Foundation motion** — `Tokens` and `Hooks` also receive dedicated dynamic showcases with behavior distinct from component demos.
- **Centralized motion infrastructure** — button motion was unified into the shared showcase registry instead of a bespoke local implementation.
- **Richer button feedback** — button icon gestures now differentiate hover, press, and release interactions.
- **Visual regression stability** — top-level Playwright snapshots were clipped to the intended hero region so page-height growth no longer invalidates the baseline.

### Validation

- `npm run build` passes for both `@bacsystem/ui` and `@bacsystem/demo`
- `npm run test -w @bacsystem/demo` passes (`169` tests)
- `npm run typecheck -w @bacsystem/ui` passes
- `npm run build` passes for `@bacsystem/ui` and `@bacsystem/demo`
- `npm test -w @bacsystem/demo` passes (`176` tests)
- `npm run test:visual -w @bacsystem/demo` passes (`8` passed, `1` skipped)

## demo v0.2.0 — 2026-03-23

### New features

- **Interactive code examples** — every component section in the demo now includes a `code` prop with a runnable TSX snippet covering the most common usage patterns. Added for all 11 components: Button, Badge, Alert, Input, Card, Avatar, Toggle, Modal, Tabs, StatCard, DataTable.
- **Collapsible code block** — code is hidden by default; a **"Ver código"** button (with `<Code>` icon) in the section header toggles visibility. The button changes to **"Ocultar"** (with `<ChevronUp>` icon) and highlights in primary blue when active. `aria-expanded` kept in sync for accessibility.
- **`CodeBlock` component** — new `apps/demo/components/CodeBlock.tsx`: regex-based JSX/TSX syntax tokenizer (no external deps), GitHub dark-theme color palette (`#7ee787` tags, `#ffa657` attrs, `#a5d6ff` strings, `#ff7b72` keywords, `#8b949e` comments), copy-to-clipboard button with 2-second confirmation state.
- **GitHub Pages deployment** — new `.github/workflows/deploy-pages.yml`: builds the demo as a static export (`output: 'export'`) and deploys to GitHub Pages on every push to `main`. Base path driven by `NEXT_PUBLIC_BASE_PATH` env var set to `/${{ github.event.repository.name }}`.

### Infrastructure

- **Dual-registry publish** — `publish.yml` updated to publish `@bacsystem/ui` to both GitHub Packages (`GITHUB_TOKEN`) and npm public registry (`NPM_TOKEN`) on every `v*` tag push. Added `packages/ui/.npmignore` to exclude `src/`, `scripts/`, and config files from the tarball (ships only `dist/`).

---

## v1.1.0 — 2026-03-23

### New features

- **Semantic text color tokens** — added `--color-success-text`, `--color-warning-text`, and `--color-error-text` to `globals.css`. Light-mode values (`#065F46`, `#92400E`, `#991B1B`) ensure readable text on soft/outline backgrounds; dark-mode overrides (`#6EE7B7`, `#FCD34D`, `#FCA5A5`) provide high-contrast text on semi-transparent dark surfaces. All hardcoded hex literals in `components.css` replaced with these tokens.
- **Modal overlay click-to-close** — clicking the backdrop (`bac-modal__overlay`) now calls `onClose`. Inner `<dialog>` calls `e.stopPropagation()` to prevent content clicks from bubbling to the overlay. Keyboard users continue to close via Escape.
- **DataTable `toDisplayString` hardening** — `JSON.stringify` wrapped in `try/catch` (returns `String(value)` on circular-reference or non-serialisable objects); `bigint` and `symbol` primitives now return `String(value)` instead of `''`.

### Improvements

- **Demo mock `getRowKey`** — the `DataTable` mock now accepts and honours `getRowKey?: (row, index) => string | number`, matching the real component contract; falls back to `String(rowIndex)`.
- **Demo mock strict types** — replaced `any` on `Avatar` and `DataTable` mock props with explicit `Readonly<{…}>` inline types; callback parameters inferred; `unknown` accesses use `as React.ReactNode`.
- **Demo mock native `<dialog open>`** — mock `Modal` now renders `<dialog open …>` so `getByRole('dialog')` queries resolve correctly in jsdom.
- **`tsconfig.json` `@ui-mock` path** — added `"@ui-mock"` alias to `apps/demo/tsconfig.json`, resolving `ts(2307)` across all test files.

## v1.0.2 — 2026-03-23

### Bug fixes (code quality — SonarQube & TypeScript)

- **S6759 — Read-only props** — wrapped all component prop types with `Readonly<…>` across `Alert`, `Avatar`, `Badge`, `Button`, `Card`, `DataTable`, `Input`, `Modal`, `StatCard`, `Tabs`, `Toggle`, `DemoSection`, `RootLayout`, and `Swatch` (demo).
- **S7924 — CSS contrast** — introduced `--color-success-text`, `--color-warning-text`, and `--color-error-text` design tokens (dark values in `[data-theme="dark"]`, light values in `:root`). Replaced all hardcoded `#6EE7B7`, `#FCD34D`, `#FCA5A5` hex literals in `components.css` with the new CSS variables; resolves false-positive contrast failures under static analysis.
- **S6754 — useState destructuring** — `useTheme`: removed the `hydrated` state flag, replaced with a lazy `useState` initializer (`readStoredTheme`), collapsed two `useEffect` calls into one. Setter renamed from `setThemeState` to `setTheme` to form an explicit value+setter pair.
- **S4624 — Nested template literals** — extracted inner template literals to intermediate variables in `Card`, `DataTable`, and `TokensSection` (`Swatch`).
- **S3358 — Nested ternaries** — extracted nested ternary in `DataTable` (body rows) and Avatar mock to `if/else if/else` statements.
- **S7761 — Prefer `.dataset`** — replaced `getAttribute('data-appearance')` / `getAttribute('data-variant')` with `.dataset['appearance']` / `.dataset['variant']` in `AlertSection.test.tsx` and `BadgeSection.test.tsx`; updated `null` checks to `undefined`.
- **S7764 — Prefer `globalThis`** — replaced all `window` references with `globalThis` in `useBreakpoint.ts` and `DataTableSection.test.tsx`.
- **S6819 — Native `<dialog>`** — replaced `<div role="dialog">` with `<dialog>` in the `@bacsystem/ui` test mock; existing `getByRole('dialog')` queries continue to work via the element's implicit ARIA role.
- **S6479 — Array index keys** — `DataTable` mock: removed index param, uses `JSON.stringify(row)` as stable key. `TabsSection`: renamed loop variable `i` → `slotNum` to clarify it is a slot value, not an array index.
- **S3776 + S7781 — Input complexity & replaceAll** — extracted `buildInputClasses` helper to reduce cognitive complexity; replaced `replace(/:/g, '')` with `replaceAll(':', '')`.
- **Accessibility — Modal overlay** — removed `role="presentation"` and all interactive handlers (`onClick`, `onKeyDown`) from the overlay `div`; Escape handling remains via `document.addEventListener` in `useEffect`.
- **ts(6385) — Deprecated `outline` prop** — replaced `outline` boolean shorthand with `appearance="outline"` in `TabsSection.tsx`.
- **ts(2307) — Missing `@ui-mock` types** — added `"@ui-mock": ["./__mocks__/@bacsystem/ui.tsx"]` path alias to `apps/demo/tsconfig.json` to match the existing `vitest.config.ts` alias.
- **tsconfig ES2021** — updated `packages/ui/tsconfig.json` target and lib from `ES2020` to `ES2021` to enable `String.prototype.replaceAll`.

## v1.0.1 — 2026-03-23

### Bug fixes

- **Hydration errors** — `useTheme` and `useBreakpoint` now always initialize with SSR-safe defaults (`'light'` and `'sm'`) and sync from `localStorage` / `window` inside `useEffect`. Eliminates React hydration mismatches in Next.js App Router.
- **Component styles missing from package** — `dist/styles.css` previously shipped only design tokens. All `bac-*` component styles and dark mode overrides are now bundled into `dist/styles.css`. Consumers no longer need to copy styles manually.
- **Input `size` prop conflict** — renamed to `inputSize` to avoid collision with the native HTML `size` attribute (`number`) on `<input>`.
- **Link button hover background** — `.bac-btn--link:hover` was overridden by variant hover rules with higher specificity. Fixed by raising the link hover rule specificity with `.bac-btn.bac-btn--link`.
- **Dark mode — Badge filled** — soft dark override was overriding `color` on filled badges. Added explicit `color: #fff` on all filled badge dark overrides.
- **Dark mode — Alert filled** — soft dark overrides were winning due to equal specificity + later position. Added explicit filled dark overrides with higher specificity.
- **Dark mode — Avatar filled** — `[data-theme="dark"] .bac-avatar` was overriding `.bac-avatar--filled`. Fixed with explicit filled override placed after the soft override.
- **Dark mode — StatCard filled values** — color-specific value overrides (`spec 0,3,0`) were beating the filled white-text rule. Fixed by placing the filled override after individual color rules.
- **Dark mode — Secondary button border** — in dark mode `--color-border` equals the button background, making the border invisible. Fixed with `border-color: var(--color-neutral-200)`.

### New features

#### Input component — fully redesigned

- `inputSize`: `sm | md | lg`
- `iconLeft` / `iconRight`: any Lucide icon rendered inside the field
- `success`: green border + CheckCircle2 icon + success message
- `hint`: helper text shown when no error or success
- `floating`: floating label (CSS-only, uses `:placeholder-shown` + sibling selector — no JS state)
- `prefix` / `suffix`: text addon groups (e.g. `https://`, `.com`, `S/`, `kg`)
- `aria-describedby` wired to error, hint, and success elements
- SSR-safe IDs via React 18 `useId()`

#### Appearance system

- `Button`: `appearance` prop — `filled | outline | soft | link` for all 6 variants
- `Badge`, `Alert`, `Avatar`, `StatCard`: `appearance` prop — `soft | filled | outline`

#### DataTable row hover

- Row hover state: `--color-primary-100` background + `--color-primary-600` left-border accent, CSS transition ≤ 150 ms

#### Design tokens JSON

- `tokens.json` generated at build time from `src/tokens/*.ts`
- Accessible via `import tokens from '@bacsystem/ui/tokens.json'`
- Contains: `colors`, `typography`, `spacing`, `radius`, `shadows`

---

## v1.0.0 — 2026-03-22

### Components

- `Button` — 6 variants, 5 sizes, loading state, iconLeft/iconRight
- `Badge` — 6 variants
- `Input` — default, error, disabled; aria-invalid + aria-describedby on error
- `Card` — 4 variants, 3 sizes
- `Alert` — 4 variants with icons; optional onClose
- `Avatar` — 5 sizes; image → initials → icon fallback chain
- `Toggle` — 3 sizes; role="switch", keyboard accessible (Space/Enter)
- `Modal` — 3 sizes; focus trap; Escape key; backdrop click to close
- `DataTable` — generic `<T extends object>`; loading/empty states
- `StatCard` — 5 color variants with trend indicators
- `Tabs` — controlled/uncontrolled; disabled tab support

### Hooks

- `useTheme` — light/dark mode, persists to `localStorage`
- `useBreakpoint` — reactive sm/md/lg/xl; resize listener cleanup

### Design Tokens

- CSS custom properties via `@bacsystem/ui/styles.css`
- Dark mode via `[data-theme="dark"]` on `<html>`
- JSON tokens via `@bacsystem/ui/tokens.json`

### Infrastructure

- npm workspaces monorepo (`packages/ui` + `apps/demo`)
- tsup: CJS + ESM + `.d.ts` + `styles.css` + `tokens.json`
- `"use client"` banner for Next.js App Router compatibility
- GitHub Actions CI/CD — publishes on `v*` tags to GitHub Packages
- Next.js 14 demo app at `localhost:3000`
