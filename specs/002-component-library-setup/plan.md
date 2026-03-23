# Implementation Plan: @bacsystem/ui — React Component Library

**Branch**: `002-component-library-setup` | **Date**: 2026-03-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-component-library-setup/spec.md`

## Summary

Build `@bacsystem/ui` as a TypeScript React component library distributed via GitHub Packages.
The repo is structured as an npm workspaces monorepo with two packages: `packages/ui/` (the
library) and `apps/demo/` (a Next.js 14 interactive showcase). The library ships 11 components,
2 hooks, and a full design token set via CSS custom properties. All styles are CSS-pure (no
Tailwind); icons use `lucide-react` exclusively. Build tooling is `tsup` producing CJS, ESM,
`.d.ts`, and `styles.css` artifacts. Publishing is automated via GitHub Actions on `v*` tags.

## Technical Context

**Language/Version**: TypeScript ^5.0 (`strict` mode, no `any`)
**Primary Dependencies**: React ^18.0 (peer), tsup ^8.0 (bundler), lucide-react (direct dep)
**Storage**: N/A — component library, no persistence layer
**Testing**: TypeScript strict compile (`tsc --noEmit`) as primary quality gate; no unit test
framework required for v1.0.0 (deferred to v1.1.0)
**Target Platform**: Next.js 14 App Router (primary); plain React 18 + Vite (secondary)
**Project Type**: library (monorepo — `packages/ui` + `apps/demo`)
**Performance Goals**: Bundle < 100 KB minified excluding peers; CI publish < 3 min; demo
interactions < 100 ms response time
**Constraints**: No Tailwind; CSS variables only (no hardcoded values); React as peerDependency;
lucide-react as direct dep; Node.js 20; npm workspaces (no pnpm/yarn)
**Scale/Scope**: 11 components, 2 hooks, ~30 CSS token categories, 1 demo app, 3 consumer
projects (OperaAI, AulaAI, Futuros)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Gate | Status | Notes |
|-----------|------|--------|-------|
| I. Type-Safe Components | All components have exported props interfaces; `strict` mode; no `any` | PASS | Spec FR-001, FR-002, FR-016 enforce this |
| II. Design Token Discipline | All values in `globals.css` as CSS variables; no hardcoded values in components | PASS | Spec FR-006–FR-010a; shadow tokens added via clarification |
| III. Component Contract | `className` forwarded; dark mode via CSS vars; `"use client"` banner; React as peerDep | PASS | Spec FR-003, FR-004, FR-014, FR-015 |
| IV. Versioning & Breaking Changes | SemVer; `v*` tag triggers CI publish; migration guide for major bumps | PASS | Spec FR-017; v1.0.0 initial release |
| V. Build Quality Gate | tsup produces CJS+ESM+`.d.ts`+`styles.css`; zero TS errors | PASS | Spec FR-013, FR-016 |

**Result**: All gates PASS. Proceeding to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/002-component-library-setup/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   ├── public-api.md
│   ├── css-tokens.md
│   └── package-exports.md
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
bacsystem-ui/                          ← repo root
├── package.json                       ← workspace root (private: true)
├── packages/
│   └── ui/                            ← @bacsystem/ui
│       ├── src/
│       │   ├── components/
│       │   │   ├── Button/
│       │   │   │   ├── Button.tsx
│       │   │   │   └── index.ts
│       │   │   ├── Badge/
│       │   │   ├── Input/
│       │   │   ├── Card/
│       │   │   ├── Alert/
│       │   │   ├── Avatar/
│       │   │   ├── Toggle/
│       │   │   ├── Modal/
│       │   │   ├── DataTable/
│       │   │   ├── StatCard/
│       │   │   └── Tabs/
│       │   ├── hooks/
│       │   │   ├── useTheme.ts
│       │   │   └── useBreakpoint.ts
│       │   ├── styles/
│       │   │   └── globals.css        ← all CSS custom properties
│       │   └── index.ts               ← barrel export
│       ├── dist/                      ← generated (gitignored)
│       │   ├── index.js               ← CJS
│       │   ├── index.mjs              ← ESM
│       │   ├── index.d.ts             ← TypeScript types
│       │   └── styles.css             ← compiled tokens
│       ├── package.json
│       └── tsup.config.ts
└── apps/
    └── demo/                          ← @bacsystem/demo
        ├── app/
        │   ├── layout.tsx
        │   ├── page.tsx
        │   └── globals.css
        ├── components/
        │   └── DemoSection.tsx
        ├── package.json
        └── next.config.js
```

**Structure Decision**: Monorepo (Option: `packages/*` + `apps/*`) chosen because the library
and demo must share the same source without a registry round-trip during development. npm
workspaces handles local resolution of `@bacsystem/ui` from `packages/ui/`.

## Complexity Tracking

> No constitution violations — complexity tracking not required.
