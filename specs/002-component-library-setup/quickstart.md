# Quickstart: @bacsystem/ui

**For**: OperaAI / AulaAI developers installing the library in a Next.js 14 project.

---

## Prerequisites

- Node.js 20+
- Next.js 14 project with App Router
- `.npmrc` configured for `@bacsystem` scope (see below)

---

## Step 1 — Configure Registry

Add to your project's `.npmrc`:

```ini
@bacsystem:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Set `GITHUB_TOKEN` as an environment variable (your GitHub PAT with `read:packages` scope).

---

## Step 2 — Install

```bash
npm install @bacsystem/ui
```

---

## Step 3 — Import Styles

In your app's root layout (`app/layout.tsx`):

```tsx
import '@bacsystem/ui/styles.css'
```

This loads all design tokens (colors, spacing, typography, shadows, radii) as CSS custom
properties. Without this import, components will render without any visual styling.

---

## Step 4 — Render Your First Component

```tsx
// app/page.tsx
import { Button } from '@bacsystem/ui'

export default function Page() {
  return (
    <Button variant="primary" size="md">
      Guardar cambios
    </Button>
  )
}
```

---

## Step 5 — Use Design Tokens in Your Own CSS

```css
/* Refer to any token from globals.css in your styles */
.my-heading {
  font-family: var(--font-display);
  color: var(--color-neutral-900);
  font-size: 24px;
}

.my-card {
  background: var(--color-neutral-0);
  border-radius: var(--radius-md);
  padding: var(--sp-6);
  box-shadow: var(--shadow-md);
}
```

---

## Step 6 — Enable Dark Mode

### Option A: Automatic via useTheme hook

```tsx
// components/ThemeToggle.tsx
'use client'
import { useTheme, Button } from '@bacsystem/ui'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme}>
      {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
    </Button>
  )
}
```

`useTheme` sets `data-theme="dark"` on `<html>` and persists the preference in
`localStorage`. All components switch automatically.

### Option B: Manual attribute

```html
<html data-theme="dark">
```

---

## Step 7 — Responsive Layouts with useBreakpoint

```tsx
'use client'
import { useBreakpoint } from '@bacsystem/ui'

export function ResponsivePanel() {
  const { isMobile, current } = useBreakpoint()
  return (
    <div style={{ padding: isMobile ? '16px' : '32px' }}>
      Breakpoint: {current}
    </div>
  )
}
```

---

## Available Components

| Component | Import |
|-----------|--------|
| Button | `import { Button } from '@bacsystem/ui'` |
| Badge | `import { Badge } from '@bacsystem/ui'` |
| Input | `import { Input } from '@bacsystem/ui'` |
| Card | `import { Card } from '@bacsystem/ui'` |
| Alert | `import { Alert } from '@bacsystem/ui'` |
| Avatar | `import { Avatar } from '@bacsystem/ui'` |
| Toggle | `import { Toggle } from '@bacsystem/ui'` |
| Modal | `import { Modal } from '@bacsystem/ui'` |
| DataTable | `import { DataTable } from '@bacsystem/ui'` |
| StatCard | `import { StatCard } from '@bacsystem/ui'` |
| Tabs | `import { Tabs } from '@bacsystem/ui'` |

All components accept a `className` prop for custom styling.

---

## Running the Demo (contributors only)

```bash
git clone https://github.com/bacsystem/ui
cd ui
npm install
npm run dev
# → http://localhost:3000
```
