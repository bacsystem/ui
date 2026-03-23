# @bacsystem/ui

React component library for the bacsystem design system. Shared across OperaAI, AulaAI and future projects.

## Demo

```bash
npm install
npm run dev
```

Opens `http://localhost:3000` — interactive showcase of all 11 components, 2 hooks, and design tokens.

## Install

### Requirements

- Node.js ≥ 18
- React ^18.0 (peer dependency)
- React DOM ^18.0 (peer dependency)

Add to your `.npmrc` (replace `${GITHUB_TOKEN}` with a personal access token that has `read:packages` scope):

```ini
@bacsystem:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then install:

```bash
npm install @bacsystem/ui
```

## Usage

```tsx
// Import styles once (in your app root)
import '@bacsystem/ui/styles.css'

// Use components
import { Button, Card, Badge } from '@bacsystem/ui'

export default function Page() {
  return (
    <Card variant="elevated">
      <Badge variant="success">Active</Badge>
      <Button variant="primary">Get started</Button>
    </Card>
  )
}
```

## Design Tokens

```tsx
// CSS custom properties (after importing styles.css)
// var(--color-primary-700), var(--sp-4), var(--radius-md), etc.

// JSON (for Angular, Vue, React Native)
import tokens from '@bacsystem/ui/tokens.json'
const primary = tokens.colors.primary[700] // '#1D4ED8'
```

## Dark Mode

```tsx
import { useTheme } from '@bacsystem/ui'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return <button onClick={toggleTheme}>{theme}</button>
}
```

## Components

| Component | Variants | Sizes |
|-----------|----------|-------|
| Button | primary, secondary, accent, ghost, danger, success | xs, sm, md, lg, xl |
| Badge | default, primary, success, warning, danger, info | — |
| Input | default, error, disabled | — |
| Card | default, elevated, outlined, tinted | sm, md, lg |
| Alert | info, success, warning, error | — |
| Avatar | image, initials, icon fallback | xs, sm, md, lg, xl |
| Toggle | checked, unchecked, disabled | sm, md, lg |
| Modal | — | sm, md, lg |
| DataTable | default, loading, empty | — |
| StatCard | blue, teal, amber, green, purple | — |
| Tabs | — | — |

## Hooks

- `useTheme()` — theme state + toggle, persists to localStorage
- `useBreakpoint()` — reactive breakpoint (sm/md/lg/xl)

## Publish

Triggered automatically on `v*` tags via GitHub Actions:

```bash
git tag v1.0.0
git push origin v1.0.0
```

## License

MIT
