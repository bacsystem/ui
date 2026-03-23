# Feature Specification: @bacsystem/ui — React Component Library

**Feature Branch**: `002-component-library-setup`
**Created**: 2026-03-22
**Last Updated**: 2026-03-23
**Status**: Draft
**Input**: React component library with TypeScript, design tokens, 11 components, 2 hooks, publishable to GitHub Packages as `@bacsystem/ui`. Monorepo structure with interactive demo app at `apps/demo/`.

---

## Clarifications

### Session 2026-03-22

- Q: ¿Qué nivel de accesibilidad incluye v1.0.0? → A: Accesibilidad semántica básica — HTML semántico, `aria-label` donde corresponda, navegación por teclado solo en Modal (Escape) y Toggle.
- Q: ¿Cómo importa el desarrollador los estilos de la librería? → A: Importación explícita — `import '@bacsystem/ui/styles.css'` en el entry point del proyecto consumidor.
- Q: ¿Se incluyen shadow tokens en v1.0.0? → A: Sí — `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl` en `globals.css`; usados por `Card elevated` y `Modal`.
- HU-01 CA-06: El build genera `dist/tokens.json` con todos los valores del sistema de diseño (colors, typography, spacing, radius, shadows) en formato plano; accesible via `@bacsystem/ui/tokens.json`.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Install and Use Components (Priority: P1)

A product developer at OperaAI or AulaAI installs `@bacsystem/ui` and immediately uses a
component (e.g., `Button`) in their Next.js application. Their editor shows full autocompletion
for all props, variants, and sizes. The component renders correctly without any additional
configuration.

**Why this priority**: This is the core value proposition of the library. If a developer cannot
install and use a component out of the box, nothing else matters.

**Independent Test**: Install the package in a fresh Next.js project, import `Button`, render
`<Button variant="primary" size="md">Submit</Button>` — it should render without errors and
TypeScript should report no type errors.

**Acceptance Scenarios**:

1. **Given** a Next.js 14 project with `@bacsystem/ui` installed, **When** a developer imports
   `Button` and renders it with `variant="primary"`, **Then** it renders a styled button with
   no runtime errors and no TypeScript errors.
2. **Given** a developer uses an invalid variant (e.g., `variant="invalid"`), **When** they
   compile, **Then** TypeScript reports a type error at compile time.
3. **Given** any component, **When** a developer passes a `className` prop, **Then** the class
   is applied to the root DOM element and does not override internal styles destructively.
4. **Given** a component that uses browser APIs or React hooks (e.g., `Toggle`, `Modal`),
   **When** used inside a Next.js App Router page, **Then** it works without client component
   hydration errors.

---

### User Story 2 — Configure Design Tokens and Dark Mode (Priority: P2)

A developer sets up the design system in their project by importing `globals.css` from
`@bacsystem/ui` and optionally overriding CSS custom properties to adapt the theme. They then
use the `useTheme` hook to enable a dark mode toggle. All components respond to the theme
change without re-renders or page reloads.

**Why this priority**: Tokens and dark mode are the foundation of visual consistency across
OperaAI and AulaAI. Without them, each project would maintain its own color/spacing definitions.

**Independent Test**: Import `globals.css`, add `data-theme="dark"` to `<html>`, render a
`Card` — it should visually switch to dark colors. `useTheme` persists selection after reload.

**Acceptance Scenarios**:

1. **Given** `globals.css` is imported, **When** a developer inspects the document root,
   **Then** all color, spacing, radius, and typography CSS custom properties are available.
2. **Given** `useTheme` is used, **When** `toggleTheme()` is called, **Then** the theme
   switches and the preference persists after page reload.
3. **Given** dark mode is active, **When** any of the 11 components is rendered, **Then** all
   colors are drawn from dark-mode CSS variable overrides with no hardcoded values.
4. **Given** a developer overrides `--color-primary-700` in their own CSS, **When** any
   component uses that token, **Then** it reflects the override without code changes to the
   library.
5. **Given** the library is built, **When** a developer imports `@bacsystem/ui/tokens.json`,
   **Then** they receive a structured JSON object with `colors`, `typography`, `spacing`,
   `radius`, and `shadows` containing all token values (usable in any framework, including
   React Native and Angular, without CSS).

---

### User Story 3 — Responsive Layouts with useBreakpoint (Priority: P3)

A developer uses the `useBreakpoint` hook to conditionally render UI based on the current
viewport size. The hook returns reactive values (`isMobile`, `isTablet`, `isDesktop`, `current`)
that update immediately when the browser window is resized.

**Why this priority**: Responsive behavior is needed by consumer projects but is not a blocker
for core component usage or token setup.

**Independent Test**: Render a component using `useBreakpoint`, resize the browser from mobile
to desktop — `isMobile` toggles from `true` to `false` without a page reload.

**Acceptance Scenarios**:

1. **Given** `useBreakpoint` is called, **When** the viewport is 375px wide, **Then**
   `isMobile` is `true`, `isTablet` is `false`, `isDesktop` is `false`, `current` is `"sm"`.
2. **Given** the browser window is resized, **When** the new width crosses a breakpoint
   boundary, **Then** the hook's return values update reactively within one render cycle.

---

### User Story 4 — Publish and Consume from GitHub Packages (Priority: P4)

A maintainer pushes a `v1.0.0` tag. GitHub Actions automatically builds and publishes the
package to GitHub Packages as `@bacsystem/ui`. A developer in a consumer project installs it
and receives CJS, ESM, and type declaration outputs.

**Why this priority**: Publishing is a one-time setup but blocks adoption by all consumer
projects until it works.

**Independent Test**: Push a `v1.0.0` tag → CI passes → the artifact contains `index.js`
(CJS), `index.mjs` (ESM), and `index.d.ts` (types).

**Acceptance Scenarios**:

1. **Given** a `v*` git tag is pushed, **When** GitHub Actions runs, **Then** the package
   is published to GitHub Packages with the correct version and zero TypeScript errors.
2. **Given** the package is published, **When** a developer installs it in a CommonJS project,
   **Then** the CJS output resolves correctly.
3. **Given** the package is installed, **When** a developer uses named imports, **Then** tree
   shaking removes unused components from the final bundle.

---

### User Story 5 — Interactive Demo App (Priority: P5)

A developer or prospective client opens the demo app in a browser and sees all 11 components
and both hooks rendered interactively. They can toggle dark/light mode, resize the browser to
see breakpoint changes, open a real Modal, and switch the DataTable between its three states —
all without leaving the page.

**Why this priority**: The demo is not required for the library to work but is essential for
evaluating components before adoption and for internal QA. It is added to the monorepo as a
first-class workspace package.

**Independent Test**: Run `npm run dev` from the monorepo root → `localhost:3000` opens → all
13 sidebar sections render → dark mode toggle and breakpoint indicator work.

**Acceptance Scenarios**:

1. **Given** the monorepo is set up, **When** a developer runs `npm install && npm run dev`,
   **Then** the demo app is accessible at `localhost:3000` with zero errors in the console.
2. **Given** the demo is open, **When** a developer clicks any of the 13 sidebar sections,
   **Then** the corresponding component examples scroll into view and are rendered.
3. **Given** the demo header, **When** a developer clicks the dark/light mode toggle,
   **Then** the entire demo switches theme and the preference persists on reload.
4. **Given** the demo header, **When** the browser window is resized, **Then** the breakpoint
   indicator updates in real time (e.g., "Mobile — sm" → "Desktop — xl").
5. **Given** the Modal section, **When** a developer clicks "Abrir modal", **Then** a modal
   dialog opens and closes via the close button or Escape key.
6. **Given** the DataTable section, **When** a developer toggles "Loading" or "Empty",
   **Then** the table transitions to the corresponding state visually.
7. **Given** the Hooks section, **When** a developer clicks `setTheme('dark')`, **Then** the
   current theme display updates and the demo switches to dark mode.
8. **Given** the Tokens section, **When** a developer hovers over a color swatch, **Then**
   the hex value and token name appear as a tooltip.

---

### Edge Cases

- **className conflict**: When a component receives both a `className` and conflicting inline
  styles, the `className` is applied additively; CSS variable-based styles are not overridden.
- **useTheme in SSR**: `useTheme` must only be used in client components. Misuse in a server
  component must produce a clear React error, not a silent hydration mismatch.
- **Avatar fallback**: When `Avatar` receives neither an image URL nor initials, it renders
  the `User` icon from lucide-react.
- **DataTable empty state**: When `DataTable` receives an empty array, it renders the empty
  state with the `Inbox` icon and a descriptive message.
- **Modal Escape key**: When `Modal` is open and the user presses Escape, it closes (calls
  `onClose`).
- **Button loading state**: When `Button` has `loading={true}`, it renders `Loader2` (animated)
  and is non-interactive (disabled behavior) until loading is false.
- **Demo hot-reload**: When the library source changes, the demo app hot-reloads and reflects
  changes without a full page refresh.
- **Demo with library not built**: When `npm run dev` is run before `npm run build:ui`, the
  workspace resolves the local source directly so the demo still works.

---

## Requirements *(mandatory)*

### Functional Requirements

**Components**

- **FR-001**: Library MUST export all 11 components as named TypeScript exports: `Button`,
  `Badge`, `Input`, `Card`, `Alert`, `Avatar`, `Toggle`, `Modal`, `DataTable`, `StatCard`,
  `Tabs`.
- **FR-002**: Each component MUST have an exported TypeScript props interface (e.g.,
  `ButtonProps`, `CardProps`, `AlertProps`).
- **FR-003**: Every component MUST accept a `className` prop (`string | undefined`) forwarded
  to the root DOM element.
- **FR-004**: Every component MUST support dark mode exclusively via CSS variable overrides
  — no additional JS prop is required on individual components.
- **FR-005**: All icons within components MUST use `lucide-react` exclusively. Emojis,
  Unicode characters, and other icon libraries are prohibited.

**Design Tokens**

- **FR-006**: All color, spacing, radius, and typography values MUST be defined as CSS custom
  properties in a single `globals.css` file exported from the library as `@bacsystem/ui/styles.css`.
  Consumer projects MUST import it explicitly in their app entry point (e.g., `app/layout.tsx`).
  Styles are never auto-injected on component import.
- **FR-007**: Color tokens MUST follow the naming convention `--color-{scale}-{shade}`
  (e.g., `--color-primary-700`, `--color-error-base`, `--color-neutral-200`).
- **FR-008**: Typography tokens MUST expose `--font-display` (Plus Jakarta Sans),
  `--font-body` (Inter), and `--font-mono` (JetBrains Mono).
- **FR-009**: Spacing tokens MUST cover `--sp-1` (4px) through `--sp-16` (64px).
- **FR-010**: Border-radius tokens MUST cover `--radius-sm` (4px) through `--radius-full`
  (9999px).
- **FR-010a**: Shadow tokens MUST be defined in `globals.css` with four levels:
  `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`. `Card` (elevated variant) MUST
  use `--shadow-md`; `Modal` MUST use `--shadow-xl`. Hardcoded shadow values in components are
  prohibited (RC-07).

**Hooks**

- **FR-011**: `useTheme` MUST return `{ theme, setTheme, toggleTheme }` and persist the
  selected theme in browser storage under a stable key.
- **FR-012**: `useBreakpoint` MUST return `{ isMobile, isTablet, isDesktop, current }` and
  update reactively on viewport resize with automatic cleanup (no manual unsubscribe by caller).

**Accessibility**

- **FR-019a**: All interactive components (`Button`, `Toggle`, `Input`, `Tabs`, `Modal`,
  `DataTable`) MUST use semantic HTML elements (`<button>`, `<input>`, `<dialog>`, etc.).
- **FR-019b**: `Input` MUST associate its label via `aria-label` or `aria-labelledby` when in
  error state, and `aria-describedby` MUST point to the error message element.
- **FR-019c**: `Modal` MUST close when the user presses Escape and MUST trap focus within the
  dialog while open.
- **FR-019d**: `Toggle` MUST be operable via keyboard (Space/Enter to toggle) and MUST expose
  `role="switch"` with `aria-checked` reflecting its current state.
- **FR-019e**: Full WCAG 2.1 AA compliance and screen reader optimization are explicitly
  deferred to v1.1.0 and documented as known technical debt.

**Build & Distribution**

- **FR-013**: The build MUST produce five artifacts: CommonJS (`dist/index.js`),
  ESM (`dist/index.mjs`), TypeScript declarations (`dist/index.d.ts`), the compiled
  stylesheet (`dist/styles.css`) accessible via `@bacsystem/ui/styles.css`, and a design
  token JSON file (`dist/tokens.json`) accessible via `@bacsystem/ui/tokens.json`.
- **FR-013b**: `dist/tokens.json` MUST contain all token values structured under five
  top-level keys: `colors`, `typography`, `spacing`, `radius`, `shadows`. It MUST be
  generated automatically as part of `npm run build` via a build script
  (`scripts/build-tokens-json.ts`) that reads the token source files. It MUST NOT be
  hand-edited.
- **FR-014**: React MUST be declared as a `peerDependency` and MUST NOT appear in the
  compiled bundle output.
- **FR-015**: Components that use React hooks or browser APIs MUST include a `"use client"`
  directive banner compatible with Next.js 14 App Router.
- **FR-016**: The build MUST complete with zero TypeScript errors under `strict` mode with
  no `any` types.

**Publishing**

- **FR-017**: The package MUST be published to GitHub Packages under the `@bacsystem` scope
  automatically when a `v*` tag is pushed, with no manual steps.
- **FR-018**: The published `package.json` MUST include an `exports` field with entries for:
  `"."` (CJS, ESM, types), `"./styles.css"` (compiled stylesheet), and `"./tokens.json"`
  (design token JSON).

**Monorepo Structure**

- **FR-019**: The repository MUST be structured as a monorepo with two workspace packages:
  `packages/ui/` (the `@bacsystem/ui` library) and `apps/demo/` (the demo application).
- **FR-020**: The monorepo root `package.json` MUST define workspaces for `packages/*` and
  `apps/*`, and provide scripts: `dev` (start demo), `build:ui` (build library),
  `build` (build all), `dev:ui` (watch-mode library build).
- **FR-021**: The demo app MUST resolve `@bacsystem/ui` from the local workspace (no registry
  required) so contributors can develop library and demo simultaneously.

**Demo App**

- **FR-022**: The demo app MUST provide a persistent sidebar navigation with 13 sections:
  Tokens, Button, Badge, Input, Card, Alert, Avatar, Toggle, Modal, DataTable, StatCard,
  Tabs, and Hooks.
- **FR-023**: Each component section MUST display: a brief description, a props reference
  table with types, and interactive rendered examples of every variant and size.
- **FR-024**: The Tokens section MUST render visual swatches for every color token (showing
  hex on hover), typography scale specimens for all three font families, spacing blocks with
  pixel values, radius samples, and shadow samples.
- **FR-025**: The demo header MUST include a dark/light mode toggle powered by `useTheme()`
  that switches the entire demo and persists the preference across reloads.
- **FR-026**: The demo header MUST display the current breakpoint in real time using
  `useBreakpoint()`, updating on window resize.
- **FR-027**: The Modal section MUST include a live "Abrir modal" button that opens a real
  interactive `Modal` component instance.
- **FR-028**: The DataTable section MUST display sample invoice data (number, client, total,
  status) and provide toggles to switch between default, loading, and empty states.
- **FR-031**: `DataTable` rows MUST display a visible hover state: row background changes to
  a primary-tinted color and a primary-colored left-border accent appears on the first
  cell. The transition MUST be smooth (≤ 150 ms). Row hover MUST NOT apply
  during loading or empty states. The hover state MUST render correctly in both light and dark mode
  using appropriate dark-mode token overrides.
- **FR-029**: The Hooks section MUST show the live state of `useTheme` (current theme,
  buttons for `setTheme('light')`, `setTheme('dark')`, `toggleTheme()`) and `useBreakpoint`
  (all four returned values updating reactively on resize).
- **FR-030**: The repository README MUST include a "Demo" section with setup instructions:
  `npm install` and `npm run dev` to open `localhost:3000`.
- **FR-032**: `Button` MUST support an `appearance` prop (`'filled' | 'outline' | 'soft' | 'link'`,
  default `'filled'`). Each appearance applies to all 6 variants: `filled` = solid background;
  `outline` = transparent background with colored border; `soft` = tinted low-opacity background;
  `link` = text only with underline on hover and no padding. When the `appearance` prop is
  explicitly provided, it takes precedence over the legacy `outline` boolean prop. The legacy
  `outline` boolean prop MUST remain functional for backward compatibility when `appearance` is
  not explicitly set.

- **FR-033**: `Badge`, `Alert`, `Avatar`, and `StatCard` MUST each support an `appearance` prop
  (`'soft' | 'filled' | 'outline'`, default `'soft'`). `soft` preserves the prior default
  (light tinted background); `filled` uses a solid color background with white text; `outline`
  uses transparent background with a colored border and text. All appearance styles MUST include
  dark mode CSS overrides. This pattern MUST be applied to all future components at time of
  creation.

- **FR-034**: Dark mode MUST be implemented via component-specific CSS overrides rather than
  inverting the primary color scale. The neutral scale inversion powers surface/border/text
  semantic variables. Each component that uses light background colors (badge soft, alert soft,
  avatar soft, card tinted, ghost button hover, etc.) MUST have explicit `[data-theme="dark"]`
  rules that replace light backgrounds with translucent dark overlays and lighten text colors
  to maintain contrast ratios.

### Component Variants & Sizes Reference

| Component  | Variants                                           | Sizes              | Appearances               |
|------------|----------------------------------------------------|--------------------|---------------------------|
| Button     | primary, secondary, accent, ghost, danger, success | xs, sm, md, lg, xl | filled, outline, soft, link |
| Badge      | default, primary, success, warning, danger, info   | — (single)         | soft, filled, outline     |
| Input      | default, error, disabled                           | — (single)         | —                         |
| Card       | default, elevated, outlined, tinted                | sm, md, lg         | —                         |
| Alert      | info, success, warning, error                      | — (single)         | soft, filled, outline     |
| Avatar     | with image, with initials, icon fallback           | xs, sm, md, lg, xl | soft, filled, outline     |
| Toggle     | checked, unchecked, disabled                       | sm, md, lg         | —                         |
| Modal      | — (single style)                                   | sm, md, lg         | —                         |
| DataTable  | default (with row hover), loading, empty           | — (single)         | —                         |
| StatCard   | blue, teal, amber, green, purple                   | — (single)         | soft, filled, outline     |
| Tabs       | — (single style)                                   | — (single)         | —                         |

### Icon Assignments Reference

| Component  | State / Situation  | lucide-react Icon    |
|------------|--------------------|----------------------|
| Button     | loading spinner    | `Loader2` (animated) |
| Alert      | info variant       | `Info`               |
| Alert      | success variant    | `CheckCircle2`       |
| Alert      | warning variant    | `AlertTriangle`      |
| Alert      | error variant      | `XCircle`            |
| Alert      | close button       | `X`                  |
| Input      | error state        | `AlertCircle`        |
| Modal      | close button       | `X`                  |
| DataTable  | empty state        | `Inbox`              |
| DataTable  | loading state      | `Loader2` (animated) |
| StatCard   | trend up           | `TrendingUp`         |
| StatCard   | trend down         | `TrendingDown`       |
| Toggle     | checked dot        | `Check`              |
| Avatar     | no image / no name | `User`               |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A developer new to the library can render a working `Button` component in under
  5 minutes from install to first render, following only the README quickstart.
- **SC-002**: All 11 components compile with zero TypeScript errors in a strict-mode consumer
  project targeting React 18.
- **SC-003**: Each component's props interface is fully exported, enabling consumer projects
  to extend or compose types without re-declaring them.
- **SC-004**: Dark mode activates across all 11 components by toggling a single attribute at
  the document root — no per-component configuration required.
- **SC-005**: The published bundle size for the full library does not exceed 100 KB (minified,
  before gzip), excluding peer dependencies.
- **SC-006**: CI publishes a correctly versioned package to GitHub Packages within 3 minutes
  of a `v*` tag push, with zero manual steps.
- **SC-007**: Importing one component from the library does not pull in all 11 components
  (tree shaking works correctly in bundled consumer projects).
- **SC-008**: `useTheme` theme selection survives browser reload 100% of the time.
- **SC-009**: A contributor can clone the repo, run `npm install && npm run dev`, and see all
  components rendered in the demo within 3 minutes on a standard developer machine.
- **SC-010**: All 13 demo sections render without JavaScript console errors in both light and
  dark mode.
- **SC-011**: The demo's DataTable, Modal, dark mode toggle, and breakpoint indicator are
  all interactive and respond to user input within 100ms.
- **SC-012**: A developer using a non-React framework (Angular, Vue, React Native) can
  access all token values by importing `tokens.json` — no CSS processing required.

---

## Assumptions

- Consumer projects have React 18 and Next.js 14 installed; the library does not bundle them.
- Font loading (Plus Jakarta Sans, Inter, JetBrains Mono) is handled by consumer applications;
  the library defines only the `--font-*` CSS variable names.
- `lucide-react` is a direct dependency of `@bacsystem/ui` (not a peerDependency) since all
  icon usage is internal to the library.
- Dark mode convention uses a `data-theme="dark"` attribute on the `<html>` element.
- The `.npmrc` file for GitHub Packages authentication is managed by consumer projects.
- All 11 components are in scope for v1.0.0; v1.1.0+ adds Tooltip, Skeleton, Select, Breadcrumb.
- The monorepo uses npm workspaces (not pnpm or yarn); Node.js 20 is required.
- The demo app is not published to any registry; it is for development and evaluation only.
- Sample data for the DataTable section uses OperaAI invoice domain (N°, cliente, total, estado).
- `dist/tokens.json` is auto-generated from TypeScript token source files via
  `scripts/build-tokens-json.ts`; it is never hand-edited and is gitignored alongside `dist/`.
- `tokens.json` enables framework-agnostic consumption (Angular, Vue, React Native, HTML)
  without requiring a CSS pre-processor. Future framework-specific packages may depend on it.

### Monorepo Structure Reference

| Path                  | Contents                        | Package name           |
|-----------------------|---------------------------------|------------------------|
| `packages/ui/`        | Component library source        | `@bacsystem/ui`        |
| `packages/ui/src/`    | TypeScript source files         | —                      |
| `packages/ui/dist/`   | Generated build artifacts       | —                      |
| `apps/demo/`          | Next.js 14 demo application     | `@bacsystem/demo`      |
| `apps/demo/app/`      | Next.js App Router pages        | —                      |
| `apps/demo/components/` | Demo-specific wrapper components | —                   |

### Workspace Scripts Reference

| Script          | Command              | Description                          |
|-----------------|----------------------|--------------------------------------|
| `dev`           | `npm run dev`        | Start demo app on `localhost:3000`   |
| `build:ui`      | `npm run build:ui`   | Build `@bacsystem/ui` library        |
| `build`         | `npm run build`      | Build all workspace packages         |
| `dev:ui`        | `npm run dev:ui`     | Watch-mode build for library         |
