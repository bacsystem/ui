# Research: @bacsystem/ui — React Component Library

**Phase**: 0 | **Date**: 2026-03-22 | **Plan**: [plan.md](./plan.md)

---

## R-01: tsup Configuration for CJS + ESM + CSS Output

**Decision**: Use `tsup` with `format: ['cjs', 'esm']`, `dts: true`, and a separate
`entry` for `styles/globals.css` using tsup's CSS passthrough.

**Rationale**: tsup natively supports multiple output formats in one build pass. For CSS,
tsup copies the file as-is (no minification by default) which is appropriate for a token
file that consumers may want to inspect. The `"use client"` directive banner is injected
via the `banner` option.

**Key tsup.config.ts shape**:
```ts
export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    outDir: 'dist',
    banner: { js: '"use client";' },
    external: ['react', 'react-dom'],
  },
  {
    entry: { styles: 'src/styles/globals.css' },
    outDir: 'dist',
  },
])
```

**Alternatives considered**:
- Rollup: More configurable but higher setup cost; tsup wraps Rollup and is sufficient.
- esbuild standalone: No `dts` support; requires separate `tsc` step.
- Vite library mode: Tied to Vite ecosystem; less portable for a plain library.

---

## R-02: npm Workspaces — Local Package Resolution

**Decision**: Root `package.json` declares `"workspaces": ["packages/*", "apps/*"]`.
The demo's `package.json` references `"@bacsystem/ui": "*"` which npm resolves to
`packages/ui/` without a registry lookup during local development.

**Rationale**: npm workspaces (built into npm ≥7) require zero extra tooling. The `*`
version range always resolves to the local package when it exists in the workspace.

**Key root package.json scripts**:
```json
{
  "scripts": {
    "dev":      "npm run dev --workspace=apps/demo",
    "build:ui": "npm run build --workspace=packages/ui",
    "build":    "npm run build --workspaces --if-present",
    "dev:ui":   "npm run dev --workspace=packages/ui"
  }
}
```

**Alternatives considered**:
- pnpm workspaces: Faster installs, but introduces a non-standard lockfile; team uses npm.
- yarn workspaces: Legacy; npm workspaces achieves the same with standard tooling.
- Manual `file:` references: Works but breaks when package is published (version mismatch).

---

## R-03: GitHub Actions — Publish to GitHub Packages

**Decision**: A single workflow file `.github/workflows/publish.yml` triggers on `push`
to tags matching `v*`. It runs `build:ui` then `npm publish --workspace=packages/ui`.
Authentication uses the built-in `GITHUB_TOKEN` with `write:packages` permission.

**Rationale**: GitHub Packages with `GITHUB_TOKEN` requires no external secret; the token
is automatically available in GitHub Actions. The `registry-url` in the setup-node action
configures `NODE_AUTH_TOKEN` to point to `npm.pkg.github.com`.

**Key workflow shape**:
```yaml
on:
  push:
    tags: ['v*']
jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://npm.pkg.github.com'
          scope: '@bacsystem'
      - run: npm ci
      - run: npm run build:ui
      - run: npm publish --workspace=packages/ui
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**Alternatives considered**:
- Manual `npm publish`: Violates FR-017 (no manual steps).
- NPM public registry: Spec requires GitHub Packages (`@bacsystem` scope).
- Separate `NPM_TOKEN` secret: Unnecessary; `GITHUB_TOKEN` suffices for GitHub Packages.

---

## R-04: "use client" Banner Strategy

**Decision**: Apply `banner: { js: '"use client";' }` globally to the tsup ESM/CJS build.
This marks the entire library as client-compatible for Next.js App Router.

**Rationale**: All 11 components either use React hooks internally or compose components
that do. Selectively adding `"use client"` per component is feasible but adds overhead
with no practical benefit — consumer projects already know this is a UI library. The
banner is a no-op comment in non-Next.js environments (Vite, CRA).

**Alternatives considered**:
- Per-file `"use client"` directives: More granular but adds boilerplate to every file
  and risks missing new components in the future.
- Separate server/client entry points: Over-engineering for v1.0.0; revisit in v2.0.0
  if server components become a requirement.

---

## R-05: CSS Variables Dark Mode Pattern

**Decision**: Dark mode is activated by setting `data-theme="dark"` on the `<html>` element.
The `globals.css` file defines light-mode variables at `:root` and dark-mode overrides under
`[data-theme="dark"]`. The `useTheme` hook toggles this attribute and persists the value
to `localStorage` under the key `bacsystem-ui-theme`.

**CSS structure**:
```css
:root {
  --color-primary-700: #1D4ED8;
  /* ... all tokens ... */
}

[data-theme="dark"] {
  --color-primary-700: #3B82F6;
  /* ... dark overrides ... */
}
```

**Rationale**: `data-theme` attribute toggling is framework-agnostic, SSR-safe (the
attribute can be set on the server), and avoids class name conflicts. `localStorage` key
is namespaced to avoid collisions with other libraries.

**Alternatives considered**:
- `.dark` class on `<html>`: Popularized by Tailwind; avoided to stay framework-agnostic.
- `prefers-color-scheme` media query only: Cannot be overridden by user preference toggle.
- CSS-in-JS theme context: Violates Principle II (no runtime JS in component styles).

---

## R-06: Component Folder Structure

**Decision**: Each component gets its own directory under `src/components/` with two files:
`ComponentName.tsx` (implementation + props interface) and `index.ts` (re-export). The
barrel `src/index.ts` re-exports all components and hooks.

**Rationale**: This structure enables:
1. Clean per-component imports in the barrel (`export * from './components/Button'`).
2. Easy addition of new files per component (tests, stories) without restructuring.
3. Tree shaking — bundlers can analyze per-component modules.

**index.ts barrel pattern**:
```ts
// Components
export * from './components/Button'
export * from './components/Badge'
// ... etc
// Hooks
export * from './hooks/useTheme'
export * from './hooks/useBreakpoint'
```

**Alternatives considered**:
- Flat `src/components/*.tsx`: Simple but hard to add per-component assets later.
- Feature-based grouping: Overkill for a leaf-level component library.

---

## R-07: Shadow Token Values

**Decision**: Four shadow levels defined as CSS custom properties using `box-shadow` values.

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Subtle elevation (Badge, subtle Card) |
| `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Card elevated |
| `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | Dropdowns, popovers |
| `--shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Modal |

**Rationale**: Values mirror Tailwind's shadow scale (widely recognized) but expressed as
CSS custom properties per Principle II. Dark mode overrides reduce opacity to avoid harsh
shadows on dark backgrounds.

**Alternatives considered**:
- Single `--shadow` token: Insufficient for the four elevation levels needed by components.
- Filter-based shadows: Less supported and harder to customize via CSS override.
