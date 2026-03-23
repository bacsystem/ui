# Changelog

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

- Row hover state: `--color-primary-50` background + `--color-primary-400` left-border accent, CSS transition ≤ 150 ms

#### Design tokens JSON

- `dist/tokens.json` generated at build time from `src/tokens/*.ts`
- Accessible via `import tokens from '@bacsystem/ui/dist/tokens.json'`
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
