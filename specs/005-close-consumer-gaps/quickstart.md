# Quickstart: Close Consumer Gaps

**Feature**: 005-close-consumer-gaps

## Prerequisites

- Node.js ^20.0
- pnpm (workspace monorepo)
- Existing `@bacsystem/ui` dev environment at v1.2.0

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

Components can be implemented in any order — there are no inter-dependencies between the five items. Recommended order by priority:

1. **ProgressBar enhancements** (P1) — Extends existing file, smallest scope
2. **Textarea** (P1) — New component, mirrors Input patterns
3. **useReducedMotion** (P2) — New hook, trivial implementation
4. **Header slots** (P2) — Extends existing file, conditional rendering branch
5. **Sidebar collapsible** (P3) — Extends existing file + CSS, most complex

## File Modification/Creation Map

### Modified files

| File | Change |
|------|--------|
| `packages/ui/src/components/ProgressBar/ProgressBar.tsx` | Add `variant`, `size`, `max` props; update `clampValue`; add BEM classes |
| `packages/ui/src/components/Header/Header.tsx` | Add `left`/`center`/`right` props; conditional slot layout |
| `packages/ui/src/components/Sidebar/Sidebar.tsx` | Add `collapsible`/`collapsed`/`defaultCollapsed`/`onCollapsedChange` to SidebarProps; use `useControllableState`; apply `bac-sidebar--collapsed` class |
| `packages/ui/src/styles/components.css` | New CSS rules for all five items |
| `packages/ui/src/index.ts` | Add `Textarea` and `useReducedMotion` exports |

### New files

| File | Purpose |
|------|---------|
| `packages/ui/src/components/Textarea/Textarea.tsx` | Textarea component |
| `packages/ui/src/components/Textarea/index.ts` | Barrel re-export |
| `packages/ui/src/hooks/useReducedMotion.ts` | Reduced motion hook |

## Validation

```bash
# Type check (must pass with zero errors)
pnpm typecheck

# Build (must produce dist/ with CJS + ESM + .d.ts)
pnpm build

# Verify new exports are accessible
node -e "const ui = require('./dist/index.cjs'); console.log(Object.keys(ui).filter(k => ['Textarea','useReducedMotion','ProgressBar'].includes(k)))"
```
