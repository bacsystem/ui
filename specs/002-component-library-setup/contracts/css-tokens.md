# Contract: CSS Design Tokens — @bacsystem/ui

**Type**: CSS custom property contract
**File**: `packages/ui/src/styles/globals.css` → `dist/styles.css`
**Import**: `import '@bacsystem/ui/styles.css'`

All tokens below are part of the public design contract. Removing or renaming a CSS
custom property is a MAJOR breaking change. Adding new tokens is MINOR.

---

## Color Tokens

### Primary Scale

| Token | Light value | Dark value | Usage |
|-------|-------------|------------|-------|
| `--color-primary-900` | `#0F2D5E` | `#1E3A8A` | Brand deep |
| `--color-primary-800` | `#1E3A8A` | `#1D4ED8` | Dark backgrounds |
| `--color-primary-700` | `#1D4ED8` | `#2563EB` | Buttons, links |
| `--color-primary-600` | `#2563EB` | `#3B82F6` | Hover states |
| `--color-primary-500` | `#3B82F6` | `#60A5FA` | Focus rings |
| `--color-primary-200` | `#BFDBFE` | `#1E3A8A` | Tinted borders |
| `--color-primary-100` | `#DBEAFE` | `#1E3A8A` | Tinted backgrounds |
| `--color-primary-50`  | `#EFF6FF` | `#0F172A` | Very light backgrounds |

### Accent Scale

| Token | Light value | Dark value | Usage |
|-------|-------------|------------|-------|
| `--color-accent-600` | `#D97706` | `#F59E0B` | CTAs, prices, highlights |
| `--color-accent-500` | `#F59E0B` | `#FBBF24` | Accent hover |
| `--color-accent-400` | `#FBBF24` | `#FDE68A` | Light accent |

### Semantic Scales

| Token | Light value | Dark value | Usage |
|-------|-------------|------------|-------|
| `--color-success-dark`  | `#065F46` | `#047857` | Success text on light bg |
| `--color-success-base`  | `#10B981` | `#34D399` | Success icons, borders |
| `--color-success-light` | `#D1FAE5` | `#064E3B` | Success backgrounds |
| `--color-warning-dark`  | `#92400E` | `#B45309` | Warning text on light bg |
| `--color-warning-base`  | `#F59E0B` | `#FBBF24` | Warning icons, borders |
| `--color-warning-light` | `#FEF3C7` | `#451A03` | Warning backgrounds |
| `--color-error-dark`    | `#991B1B` | `#B91C1C` | Error text on light bg |
| `--color-error-base`    | `#EF4444` | `#F87171` | Error icons, borders |
| `--color-error-light`   | `#FEE2E2` | `#450A0A` | Error backgrounds |
| `--color-info-dark`     | `#1E3A8A` | `#1D4ED8` | Info text on light bg |
| `--color-info-base`     | `#3B82F6` | `#60A5FA` | Info icons, borders |
| `--color-info-light`    | `#DBEAFE` | `#0F172A` | Info backgrounds |

### Neutral Scale

| Token | Light value | Dark value | Usage |
|-------|-------------|------------|-------|
| `--color-neutral-900` | `#0F172A` | `#F8FAFC` | Primary text (inverted in dark) |
| `--color-neutral-800` | `#1E293B` | `#E2E8F0` | Main text |
| `--color-neutral-700` | `#334155` | `#CBD5E1` | Secondary headings |
| `--color-neutral-600` | `#475569` | `#94A3B8` | Muted text |
| `--color-neutral-500` | `#64748B` | `#64748B` | Placeholder, labels |
| `--color-neutral-400` | `#94A3B8` | `#475569` | Disabled text |
| `--color-neutral-300` | `#CBD5E1` | `#334155` | Subtle borders |
| `--color-neutral-200` | `#E2E8F0` | `#1E293B` | Borders |
| `--color-neutral-100` | `#F1F5F9` | `#0F172A` | Subtle backgrounds |
| `--color-neutral-50`  | `#F8FAFC` | `#020617` | Page background |
| `--color-neutral-0`   | `#FFFFFF` | `#0F172A` | White / card surface |

---

## Typography Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--font-display` | `'Plus Jakarta Sans', sans-serif` | Titles, headings |
| `--font-body`    | `'Inter', sans-serif` | Body text, UI labels |
| `--font-mono`    | `'JetBrains Mono', monospace` | Code, data |

---

## Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--sp-1`  | `4px`  | Minimum gap |
| `--sp-2`  | `8px`  | Compact padding |
| `--sp-3`  | `12px` | Small padding |
| `--sp-4`  | `16px` | Standard padding |
| `--sp-5`  | `20px` | Small section gap |
| `--sp-6`  | `24px` | Card padding |
| `--sp-8`  | `32px` | Block gap |
| `--sp-10` | `40px` | Section separation |
| `--sp-12` | `48px` | Large section padding |
| `--sp-16` | `64px` | Major separation |

---

## Border-Radius Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm`   | `4px`    | Badges, small inputs |
| `--radius-base` | `8px`    | Buttons, inputs |
| `--radius-md`   | `12px`   | Cards, modals |
| `--radius-lg`   | `16px`   | Featured cards |
| `--radius-xl`   | `24px`   | Large modals |
| `--radius-full` | `9999px` | Pills, avatars |

---

## Shadow Tokens

| Token | Light value | Dark value | Usage |
|-------|-------------|------------|-------|
| `--shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | `0 1px 2px 0 rgb(0 0 0 / 0.3)` | Subtle elevation |
| `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | same with `/ 0.4` | Card elevated |
| `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | same with `/ 0.4` | Dropdowns |
| `--shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | same with `/ 0.5` | Modal |

---

## Dark Mode Activation

```css
/* Applied by useTheme() or manually by consumer */
[data-theme="dark"] {
  /* All dark overrides redeclare the same custom property names */
  --color-primary-700: #2563EB;
  /* ... */
}
```

The `data-theme="dark"` attribute MUST be set on the `<html>` element.
