# Changelog

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

- `useTheme` — light/dark mode, persists to `localStorage`, SSR-safe
- `useBreakpoint` — reactive sm/md/lg/xl; ResizeObserver cleanup

### Design Tokens

- CSS custom properties via `@bacsystem/ui/styles.css`
- Dark mode via `[data-theme="dark"]` on `<html>`
- JSON tokens via `@bacsystem/ui/tokens.json` (colors, typography, spacing, radius, shadows)

### Infrastructure

- npm workspaces monorepo (`packages/ui` + `apps/demo`)
- tsup: CJS + ESM + `.d.ts` + `styles.css` + `tokens.json`
- `"use client"` banner for Next.js App Router compatibility
- GitHub Actions CI/CD — publishes on `v*` tags to GitHub Packages
- Next.js 14 demo app at `localhost:3000`
