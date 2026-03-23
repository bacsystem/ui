# Contract: package.json Exports Field — @bacsystem/ui

**Type**: Node.js package exports contract
**File**: `packages/ui/package.json`

This contract defines how consumers resolve `@bacsystem/ui` imports across different
module systems and bundlers. Changes to the `exports` field are MAJOR breaking changes.

---

## package.json Shape

```json
{
  "name": "@bacsystem/ui",
  "version": "1.0.0",
  "description": "bacsystem design system — React component library",
  "license": "MIT",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles.css":  "./dist/styles.css",
    "./tokens.json": "./dist/tokens.json"
  },
  "files": ["dist"],
  "sideEffects": ["./dist/styles.css"],
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "dependencies": {
    "lucide-react": "^0.300.0"
  }
}
```

---

## Export Path Contracts

| Import path | Resolves to | Module system |
|-------------|-------------|---------------|
| `@bacsystem/ui` (import) | `dist/index.mjs` | ESM (Next.js, Vite, modern bundlers) |
| `@bacsystem/ui` (require) | `dist/index.js` | CJS (older Node, Jest) |
| `@bacsystem/ui` (types) | `dist/index.d.ts` | TypeScript declarations |
| `@bacsystem/ui/styles.css` | `dist/styles.css` | CSS stylesheet (explicit import required) |
| `@bacsystem/ui/tokens.json` | `dist/tokens.json` | Design token values (all frameworks) |

---

## Key Decisions

**`sideEffects: ["./dist/styles.css"]`**: Prevents tree shaking from eliminating the
stylesheet when it is only imported (not referenced as a JS value). Without this,
some bundlers may drop the CSS import.

**`files: ["dist"]`**: Only the compiled artifacts are included in the published package.
Source files (`src/`), config files (`tsup.config.ts`, `tsconfig.json`), and spec docs
are excluded.

**`peerDependencies`**: React and React DOM are peers — they MUST NOT appear in
`dependencies` or `devDependencies` as runtime deps.

**`lucide-react` as `dependencies`**: Icon usage is internal to the library; consumers
should not need to install it separately.

**`./tokens.json` export**: Provides all design token values as a structured JSON object
for framework-agnostic consumption (Angular, Vue 3, React Native, HTML). Generated
automatically at build time by `scripts/build-tokens-json.ts` — never hand-edited.
Structure: `{ colors, typography, spacing, radius, shadows }`.

**Framework consumption patterns**:

| Framework | Consumption |
|-----------|-------------|
| React / Next.js | Components + `styles.css` import |
| Angular | `styles.css` (angular.json) + `tokens.json` import |
| Vue 3 | `styles.css` import + `tokens.json` import |
| React Native | `tokens.json` only (no CSS) |
| HTML | `styles.css` via link tag |

---

## Consumer Setup (.npmrc)

Consumers must add the following to their project `.npmrc` to resolve `@bacsystem` scope:

```ini
@bacsystem:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```
