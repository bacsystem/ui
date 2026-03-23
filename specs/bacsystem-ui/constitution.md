<!--
SYNC IMPACT REPORT
==================
Version change: [UNVERSIONED] → 1.0.0
Bump rationale: MINOR — initial ratification; all placeholder tokens replaced with concrete values.

Modified principles (template token → final name):
  [PRINCIPLE_1_NAME] → I. Type-Safe Components
  [PRINCIPLE_2_NAME] → II. Design Token Discipline
  [PRINCIPLE_3_NAME] → III. Component Contract
  [PRINCIPLE_4_NAME] → IV. Versioning & Breaking Changes
  [PRINCIPLE_5_NAME] → V. Build Quality Gate

Added sections:
  - Technical Stack & Registry (replaces [SECTION_2_NAME])
  - Contribution Rules (replaces [SECTION_3_NAME])

Removed sections: none

Templates requiring updates:
  ✅ .specify/templates/plan-template.md — Constitution Check section present; gates align with principles above.
  ✅ .specify/templates/spec-template.md — No mandatory sections conflict; compatible as-is.
  ✅ .specify/templates/tasks-template.md — Phase structure is compatible; no principle-driven task types added.
  ⚠  .specify/templates/commands/ — Directory not found; no command files to update.
  ✅ README.md — Minimal; no stale principle references.

Deferred TODOs: none — all fields resolved.
-->

# @bacsystem/ui Constitution

## Core Principles

### I. Type-Safe Components

Every component and hook MUST be authored in TypeScript with `strict` mode enabled and zero `any`
types. Each component MUST export its own named props interface. Changing a component's TypeScript
type signature without updating the interface is a contribution violation.

**Rationale**: Consumer projects (OperaAI, AulaAI) depend on type inference for autocomplete and
refactor safety. Silent runtime regressions caused by loosely-typed props are harder to detect than
compile errors.

### II. Design Token Discipline

All color values, spacing, radii, and typography references MUST be expressed as CSS custom
properties defined in `globals.css`. Hardcoded hex values, pixel literals, or raw font names inside
component files are prohibited. Dark mode adaptation MUST be achieved exclusively through CSS
variable overrides — never through runtime JavaScript theme logic inside components.

**Rationale**: CSS variables are the single source of truth for the design system. Hardcoded values
scatter token decisions across dozens of files, making palette updates a grep-and-pray exercise.
The `globals.css` constraint ensures one change propagates everywhere.

### III. Component Contract

Every component MUST:

- Accept a `className` prop that is forwarded to its outermost DOM element.
- Support dark mode through CSS variable overrides (no extra prop required).
- Ship with a `"use client"` banner when using hooks or browser APIs (Next.js App Router target).
- Treat React as a `peerDependency` — it MUST NOT be bundled in the output.

These four rules are non-negotiable across all versions. A component that violates any of them
MUST NOT be merged.

**Rationale**: Consumer apps compose components with their own `className` for layout; without
forwarding, they cannot override spacing or positioning. Bundling React would cause version
conflicts in consumer apps. The `"use client"` banner is required by Next.js 14 App Router for any
client-interactive component.

### IV. Versioning & Breaking Changes

The library MUST follow Semantic Versioning:

| Bump  | Trigger                                                        |
|-------|----------------------------------------------------------------|
| patch | Bug fix, visual correction, typo                               |
| minor | New component, new variant, new hook, new token               |
| major | Prop rename/removal, component rename, token removal          |

Breaking changes (major bumps) MUST be accompanied by a migration guide in `CHANGELOG.md` before
the tag is pushed. The CI/CD pipeline triggers on `v*` tags only — no manual publishes to GitHub
Packages are permitted.

**Rationale**: OperaAI and AulaAI pin to version ranges. An undocumented breaking change in a
minor release would silently break builds in both products simultaneously.

### V. Build Quality Gate

Every pull request MUST pass a clean `tsup` build with zero TypeScript errors before review.
The build MUST produce CJS, ESM, and `.d.ts` declaration outputs. CI validates this automatically
on `v*` tag pushes via GitHub Actions using Node.js 20.

Any PR that causes `tsc --noEmit` to report errors is automatically blocked.

**Rationale**: Type errors discovered in consumer projects after publish are significantly more
expensive to fix than catching them in CI. The dual CJS/ESM output ensures compatibility with both
bundled Next.js apps and any CommonJS tooling used by future consumer projects.

## Technical Stack & Registry

| Layer     | Technology         | Version  | Notes                                |
|-----------|--------------------|----------|--------------------------------------|
| Language  | TypeScript         | ^5.0     | strict mode, no `any`               |
| Framework | React              | ^18.0    | peerDependency — never bundled       |
| Bundler   | tsup               | ^8.0     | CJS + ESM + `.d.ts` outputs         |
| Target    | Next.js App Router | ^14.0    | `"use client"` banner required       |
| Registry  | GitHub Packages    | —        | scope `@bacsystem`                  |
| CI/CD     | GitHub Actions     | —        | triggers on `v*` tags               |
| Runtime   | Node.js            | ^20.0    | build and publish environment        |

Components are published under the `@bacsystem` scope to GitHub Packages. Local consumption
requires a `.npmrc` entry pointing `@bacsystem:registry` to `https://npm.pkg.github.com`.

## Contribution Rules

| Code  | Rule                                                                      |
|-------|---------------------------------------------------------------------------|
| RC-01 | Never modify a component without updating its TypeScript interface.        |
| RC-02 | Every new component requires an exported named props interface.            |
| RC-03 | Every component MUST accept and forward a `className` prop.               |
| RC-04 | Every component MUST support dark mode via CSS variable overrides.         |
| RC-05 | Breaking changes are permitted only in major versions with a migration guide. |
| RC-06 | Build MUST pass with zero TypeScript errors before any PR is opened.      |
| RC-07 | CSS variables MUST live in `globals.css`; never hardcode values in components. |
| RC-08 | React MUST remain a peerDependency and MUST NOT appear in the bundle.     |

### Roadmap Snapshot

| Version | Status     | Scope                                               |
|---------|------------|-----------------------------------------------------|
| v1.0.0  | In Progress| 11 components + 2 hooks + full token set            |
| v1.1.0  | Planned    | Tooltip, Skeleton, Select, Breadcrumb               |
| v1.2.0  | Planned    | DatePicker, FileUpload, Toast, Sidebar              |
| v2.0.0  | Idea       | Vue 3 support, Storybook docs, Figma token sync     |

## Governance

This constitution is the authoritative source of non-negotiable rules for `@bacsystem/ui`. It
supersedes any conflicting guidance in READMEs, PR comments, or verbal agreements.

**Amendment procedure**:
1. Open a PR that edits `.specify/memory/constitution.md` and bumps `CONSTITUTION_VERSION`.
2. State the bump type (patch/minor/major) and rationale in the PR description.
3. Update `LAST_AMENDED_DATE` to the merge date.
4. Propagate changes to dependent templates (`plan-template.md`, `spec-template.md`,
   `tasks-template.md`) in the same PR if the amendment affects their gates or task categories.

**Compliance review**: All PRs against the library MUST verify the five core principles before
merge. The Constitution Check gate in `plan-template.md` codifies this review for feature work.

**Versioning policy**: `CONSTITUTION_VERSION` follows semantic versioning independently of the
library's own npm version.

---

**Version**: 1.0.0 | **Ratified**: 2026-03-22 | **Last Amended**: 2026-03-22
