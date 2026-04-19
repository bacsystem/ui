# Quickstart: Absorb Local UI Components

**Feature**: 004-absorb-local-components

## Prerequisites

- Node.js ^20.0
- pnpm (workspace monorepo)
- Existing `@bacsystem/ui` dev environment

## Development Setup

```bash
# From repo root
cd packages/ui

# Install dependencies (no new deps needed)
pnpm install

# Type check
pnpm typecheck

# Build
pnpm build

# Watch mode
pnpm dev
```

## Implementation Order

Components must be implemented in this order due to dependencies:

1. **Spinner** — Button.tsx already imports it; build is blocked without it
2. **Label** — Simple, no dependencies
3. **ProgressBar** — Simple, no dependencies
4. **Table** (8 sub-components) — No dependencies
5. **EmptyState** — No dependencies
6. **Stepper** — No dependencies
7. **Header** — No dependencies
8. **Sidebar** (7 sub-components) — Uses `useDisclosure` for SidebarNavGroup

## File Creation Pattern

For each new component:

```
packages/ui/src/components/{ComponentName}/
├── {ComponentName}.tsx    # Implementation
└── index.ts               # Re-export: export * from './{ComponentName}'
```

Then add CSS rules to `packages/ui/src/styles/components.css`.

The barrel `src/index.ts` already has export lines for all new components — no barrel changes needed.

## Validation

After implementing all components:

```bash
# Must pass with zero errors
pnpm typecheck

# Must produce dist/ with CJS + ESM + .d.ts + styles.css
pnpm build

# Verify exports
node -e "const ui = require('./dist/index.js'); console.log(Object.keys(ui).sort())"
```

## Consumer Migration

After publishing v1.2.0, consumer apps replace local imports:

```typescript
// Before (local barrel)
import { Label, Spinner, Table, EmptyState } from '@/components/ui'

// After (package)
import { Label, Spinner, Table, EmptyState } from '@bacsystem/ui'
```

No prop changes, no wrapper code needed.
