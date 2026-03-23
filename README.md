# @bacsystem/ui

React component library for the bacsystem design system. Shared across OperaAI, AulaAI, and future projects.

## Demo

```bash
npm install
npm run dev
```

Opens `http://localhost:3000` — interactive showcase of all 11 components, 2 hooks, and design tokens.

## Install

### Requirements

- Node.js ≥ 20 (for local development and running the demo; matches monorepo `engines.node >= 20`)
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

### React / Next.js

```tsx
// Import styles once (in your app root)
import '@bacsystem/ui/styles.css'

// Use components
import { Button, Card, Badge, Input } from '@bacsystem/ui'

export default function Page() {
  return (
    <Card variant="elevated">
      <Badge variant="success">Active</Badge>
      <Input label="Email" placeholder="you@example.com" />
      <Button variant="primary">Get started</Button>
    </Card>
  )
}
```

### Angular

```json
// angular.json
"styles": [
  "node_modules/@bacsystem/ui/dist/styles.css"
]
```

```ts
import tokens from '@bacsystem/ui/dist/tokens.json'
const primary = tokens.colors.primary[900] // '#0F2D5E'
```

### Vue 3

```ts
// main.ts
import '@bacsystem/ui/dist/styles.css'
import tokens from '@bacsystem/ui/dist/tokens.json'
```

### React Native

```ts
import tokens from '@bacsystem/ui/dist/tokens.json'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  button: { backgroundColor: tokens.colors.primary[700] }
})
```

## Design Tokens

CSS custom properties are available after importing `styles.css`:

```css
var(--color-primary-700)   /* #1D4ED8 */
var(--color-success-base)  /* #10B981 */
var(--sp-4)                /* 16px    */
var(--radius-md)           /* 12px    */
var(--shadow-lg)
```

JSON tokens for framework-agnostic consumption:

```ts
import tokens from '@bacsystem/ui/dist/tokens.json'

tokens.colors.primary[700]    // '#1D4ED8'
tokens.spacing[4]             // '16px'
tokens.radius.md              // '12px'
tokens.typography.fonts.body  // 'Inter, sans-serif'
```

## Dark Mode

Activated by setting `data-theme="dark"` on `<html>`. Use the hook for managed toggling:

```tsx
import { useTheme } from '@bacsystem/ui'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return <button onClick={toggleTheme}>Switch to {theme === 'light' ? 'dark' : 'light'}</button>
}
```

## Components

| Component | Variants | Appearances | Sizes | Dark Mode |
|-----------|----------|-------------|-------|-----------|
| Button | primary, secondary, accent, ghost, danger, success | filled, outline, soft, link | xs, sm, md, lg, xl | ✅ |
| Badge | default, primary, success, warning, danger, info | soft (default), filled, outline | — | ✅ |
| Input | default, error, success, disabled | — | sm, md, lg | ✅ |
| Card | default, elevated, outlined, tinted | — | sm, md, lg | ✅ |
| Alert | info, success, warning, error | soft (default), filled, outline | — | ✅ |
| Avatar | image, initials | soft (default), filled, outline | xs, sm, md, lg, xl | ✅ |
| Toggle | checked, unchecked, disabled | — | sm, md, lg | ✅ |
| Modal | — | — | sm, md, lg | ✅ |
| DataTable | default, loading, empty | — | — | ✅ |
| StatCard | blue, teal, amber, green, purple | soft (default), filled, outline | — | ✅ |
| Tabs | — | — | — | ✅ |

### Input props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label |
| `error` | `string` | — | Error message + red border |
| `success` | `string` | — | Success message + green border |
| `hint` | `string` | — | Helper text (shown when no error/success) |
| `inputSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Field size |
| `iconLeft` | `LucideIcon` | — | Icon rendered inside, left |
| `iconRight` | `LucideIcon` | — | Icon rendered inside, right |
| `floating` | `boolean` | `false` | Floating label (CSS-only) |
| `prefix` | `string` | — | Text addon before the field |
| `suffix` | `string` | — | Text addon after the field |

## Hooks

- `useTheme()` — theme state + toggle, persists to `localStorage`, SSR-safe
- `useBreakpoint()` — reactive `sm | md | lg | xl`, SSR-safe

## Package Exports

```json
{
  ".":             { "import": "./dist/index.mjs", "require": "./dist/index.js", "types": "./dist/index.d.ts" },
  "./styles.css":  "./dist/styles.css",
  "./tokens.json": "./dist/tokens.json"
}
```

`styles.css` ships both design tokens (CSS variables) **and** all component base styles, so consumers get fully styled components with a single import.

## Publish

Triggered automatically on `v*` tags via GitHub Actions:

```bash
git tag v1.0.1
git push origin v1.0.1
```

## License

MIT
