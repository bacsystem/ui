# Changelog

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
