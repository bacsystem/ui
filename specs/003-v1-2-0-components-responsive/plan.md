# Implementation Plan: @bacsystem/ui v1.2.0

**Branch**: `003-v1-2-0-components-responsive` | **Date**: 2026-03-23 | **Spec**: [spec.md](./spec.md)

## Summary

Versión minor que agrega 4 componentes nuevos (`Tooltip`, `Skeleton`, `Select`, `Breadcrumb`),
hace el demo app completamente responsivo en móvil (sidebar hamburguesa + layout adaptado),
y agrega tablas de props a los 11 componentes existentes del demo (FR-023 pendiente).

Todos los componentes nuevos siguen el contrato establecido: TypeScript strict, CSS variables,
dark mode, `className` forwarding, `"use client"` banner, React como peerDependency.

---

## Technical Context

**Language/Version**: TypeScript ^5.0 (strict, no `any`)
**Primary Dependencies**: React ^18.0 (peer), tsup ^8.0, lucide-react, Next.js ^14.0
**Storage**: N/A — component library
**Testing**: TypeScript strict compile (`tsc --noEmit`) es el quality gate principal
**Target Platform**: Next.js 14 App Router (library); navegadores modernos (demo)
**Project Type**: Monorepo — library (`packages/ui/`) + demo app (`apps/demo/`)
**Performance Goals**: CSS transitions ≤ 300ms (sidebar móvil); shimmer animation fluida a 60fps
**Constraints**: Sin dependencias nuevas en `packages/ui/`; Tooltip con CSS puro (sin Floating UI)
**Scale/Scope**: 4 componentes nuevos + responsivo demo + 11 tablas de props

---

## Constitution Check

| Principio | Estado | Notas |
|-----------|--------|-------|
| I. Type-Safe Components | ✅ PASS | Los 4 componentes tendrán interfaces exportadas; strict mode |
| II. Design Token Discipline | ✅ PASS | Solo CSS custom properties; sin hex hardcodeados |
| III. Component Contract | ✅ PASS | `className`, dark mode, `"use client"`, React peerDep |
| IV. Versioning & Breaking Changes | ✅ PASS | Minor bump (nuevos componentes); sin breaking changes |
| V. Build Quality Gate | ✅ PASS | tsup + tsc --noEmit deben pasar con 0 errores |

**Resultado**: Todos los gates pasan. Se puede proceder.

---

## Project Structure

### Documentación (esta feature)

```text
specs/003-v1-2-0-components-responsive/
├── plan.md         ← este archivo
├── research.md     ← decisiones técnicas
├── contracts/
│   └── public-api.md
├── quickstart.md
└── tasks.md        ← generado por /speckit.tasks
```

### Código fuente

```text
packages/ui/src/
├── components/
│   ├── Tooltip/
│   │   ├── Tooltip.tsx      ← nuevo
│   │   └── index.ts
│   ├── Skeleton/
│   │   ├── Skeleton.tsx     ← nuevo
│   │   └── index.ts
│   ├── Select/
│   │   ├── Select.tsx       ← nuevo
│   │   └── index.ts
│   ├── Breadcrumb/
│   │   ├── Breadcrumb.tsx   ← nuevo
│   │   └── index.ts
│   └── [11 existentes sin cambios]
├── styles/
│   └── components.css       ← agregar estilos Tooltip, Skeleton, Select, Breadcrumb
└── index.ts                 ← agregar exports nuevos

apps/demo/
├── app/
│   ├── layout.tsx           ← sidebar responsivo (hamburguesa)
│   ├── globals.css          ← estilos responsivos + tabla props
│   └── sections/
│       ├── TooltipSection.tsx    ← nuevo
│       ├── SkeletonSection.tsx   ← nuevo
│       ├── SelectSection.tsx     ← nuevo
│       ├── BreadcrumbSection.tsx ← nuevo
│       └── [11 existentes]      ← agregar prop `props` con tabla
└── components/
    └── DemoSection.tsx      ← agregar slot PropsTable
```

---

## Phase 0: Research

### Decisión 1 — Tooltip: posicionamiento CSS puro vs librería

**Decision**: CSS puro con `position: absolute` dentro de un wrapper `position: relative`.
**Rationale**: Sin dependencias nuevas en el bundle. Para v1.2.0 los casos de uso son simples
(botones, inputs); el reposicionamiento automático en bordes se maneja con `clamp()` en CSS.
**Alternatives rejected**: Floating UI / Popper.js añaden ~12KB al bundle; complejidad innecesaria
para el scope actual.

**Implementation approach**:
```
wrapper (position: relative, inline-flex)
  └── children (el elemento envuelto)
  └── tooltip (position: absolute, visibility: hidden por defecto)
        → visible en :hover del wrapper y via estado JS en focus
```

Posicionamiento por `placement`:
- `top`: `bottom: 100%; left: 50%; transform: translateX(-50%)`
- `bottom`: `top: 100%; left: 50%; transform: translateX(-50%)`
- `left`: `right: 100%; top: 50%; transform: translateY(-50%)`
- `right`: `left: 100%; top: 50%; transform: translateY(-50%)`

### Decisión 2 — Tooltip sobre elementos `disabled`

**Decision**: Envolver el children en un `<span style={{display:'contents'}}>` siempre.
**Rationale**: Elementos con `disabled` nativo no disparan eventos de mouse/focus. El span
actúa como receptor de eventos sin alterar el layout.

### Decisión 3 — Skeleton shimmer animation

**Decision**: CSS `@keyframes` con `background: linear-gradient(...)` animado via `background-position`.
**Rationale**: 100% CSS, sin JS, 60fps en GPU. El gradiente va de `neutral-100 → neutral-200 → neutral-100`
en light mode y sus equivalentes dark en `[data-theme="dark"]`.

```css
@keyframes bac-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
.bac-skeleton {
  background: linear-gradient(90deg,
    var(--color-neutral-100) 25%,
    var(--color-neutral-200) 50%,
    var(--color-neutral-100) 75%
  );
  background-size: 200% 100%;
  animation: bac-shimmer 1.5s infinite;
}
```

### Decisión 4 — Select: nativo vs custom dropdown

**Decision**: `<select>` nativo estilizado con `appearance: none` + CSS custom.
**Rationale**: Accesibilidad garantizada (el navegador maneja el dropdown nativo en móvil,
teclado, ARIA). Un dropdown custom requeriría ~200 líneas adicionales para igualar la
accesibilidad nativa. API idéntica a `Input` (label, error, hint, inputSize).

**Caret**: SVG inline en `background-image` o icono de lucide-react (`ChevronDown`) posicionado
absolutamente dentro de un wrapper, con `pointer-events: none`.

### Decisión 5 — Sidebar responsivo en Next.js App Router

**Decision**: `layout.tsx` se convierte en `'use client'` con `useState(false)` para `sidebarOpen`.
Media query CSS oculta el sidebar en móvil; el estado JS controla la clase `.demo-sidebar--open`.
**Rationale**: Next.js App Router permite client components en layout si se necesita estado.
El overhead es mínimo; solo afecta al demo app, no a la librería.

**Approach**:
- CSS: `@media (max-width: 767px) { .demo-sidebar { transform: translateX(-100%) } }`
- CSS: `.demo-sidebar--open { transform: translateX(0) }`
- Overlay: `<div class="demo-sidebar__overlay">` visible solo en móvil con sidebar abierto
- Breakpoint detection: CSS media queries + `matchMedia` listener para cerrar al pasar a desktop

### Decisión 6 — Tablas de props

**Decision**: Datos estáticos en cada `*Section.tsx` como array de objetos `PropRow[]`.
Un nuevo slot `props?: PropRow[]` en `DemoSection` renderiza la tabla con el toggle "Ver props".
**Rationale**: Generación automática desde tipos TypeScript requiere transformers complejos.
Los datos estáticos son mantenibles y 100% controlados.

```typescript
interface PropRow {
  readonly prop: string
  readonly type: string
  readonly default: string
  readonly description: string
}
```

---

## Phase 1: Design & Contracts

### Interfaces de componentes nuevos

**Tooltip**
```typescript
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  readonly content: React.ReactNode
  readonly children: React.ReactElement
  readonly placement?: TooltipPlacement     // default: 'top'
  readonly disabled?: boolean
  readonly className?: string
}
```

**Skeleton**
```typescript
export type SkeletonVariant = 'text' | 'circle' | 'rect'

export interface SkeletonProps {
  readonly variant?: SkeletonVariant        // default: 'rect'
  readonly width?: string | number
  readonly height?: string | number
  readonly className?: string
}
```

**Select**
```typescript
export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly disabled?: boolean
}

export interface SelectProps {
  readonly options: SelectOption[]
  readonly label?: string
  readonly placeholder?: string
  readonly hint?: string
  readonly error?: string
  readonly success?: string
  readonly disabled?: boolean
  readonly inputSize?: 'sm' | 'md' | 'lg'  // default: 'md'
  readonly value?: string
  readonly defaultValue?: string
  readonly onChange?: (value: string) => void
  readonly className?: string
}
```

**Breadcrumb**
```typescript
export interface BreadcrumbItem {
  readonly label: string
  readonly href?: string
}

export interface BreadcrumbProps {
  readonly items: BreadcrumbItem[]
  readonly separator?: string               // default: '/'
  readonly className?: string
}
```

### CSS classes

| Componente | Clase raíz | Modificadores |
|-----------|-----------|---------------|
| Tooltip | `.bac-tooltip` | `--top` `--bottom` `--left` `--right` |
| Tooltip wrapper | `.bac-tooltip__wrapper` | — |
| Tooltip content | `.bac-tooltip__content` | `--visible` |
| Skeleton | `.bac-skeleton` | `--text` `--circle` `--rect` |
| Select wrapper | `.bac-select` | `--sm` `--md` `--lg` `--error` `--success` `--disabled` |
| Select native | `.bac-select__field` | — |
| Select caret | `.bac-select__caret` | — |
| Breadcrumb | `.bac-breadcrumb` | — |
| Breadcrumb list | `.bac-breadcrumb__list` | — |
| Breadcrumb item | `.bac-breadcrumb__item` | `--current` |
| Breadcrumb separator | `.bac-breadcrumb__separator` | — |

### CSS sidebar responsivo (demo)

```css
/* Mobile — sidebar oculto por defecto */
@media (max-width: 767px) {
  .demo-sidebar {
    position: fixed;
    top: 0; left: 0;
    height: 100vh;
    z-index: 100;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
  }
  .demo-sidebar--open {
    transform: translateX(0);
    box-shadow: var(--shadow-xl);
  }
  .demo-sidebar__overlay {
    display: block;  /* hidden en desktop */
  }
  .demo-hamburger { display: flex; }
  .demo-main { width: 100%; }
}

@media (min-width: 768px) {
  .demo-sidebar { transform: none !important; }
  .demo-sidebar__overlay { display: none !important; }
  .demo-hamburger { display: none; }
}
```

### Quickstart de testing

```tsx
// Tooltip
<Tooltip content="Eliminar registro" placement="top">
  <Button variant="danger" size="sm">Eliminar</Button>
</Tooltip>

// Skeleton — estado de carga
{loading ? (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Skeleton variant="text" width="60%" height={20} />
    <Skeleton variant="rect" width="100%" height={80} />
    <Skeleton variant="circle" width={40} height={40} />
  </div>
) : <ContenidoReal />}

// Select
<Select
  label="Estado"
  placeholder="Seleccionar estado"
  options={[
    { value: 'activo', label: 'Activo' },
    { value: 'inactivo', label: 'Inactivo' },
    { value: 'suspendido', label: 'Suspendido', disabled: true },
  ]}
  value={estado}
  onChange={setEstado}
/>

// Breadcrumb
<Breadcrumb
  items={[
    { label: 'Inicio', href: '/' },
    { label: 'Ventas', href: '/ventas' },
    { label: 'Factura F-0042' },
  ]}
/>
```

---

## Agent Context

Tecnologías añadidas en este plan vs el contexto previo:
- `Tooltip` — CSS `position: absolute` + `visibility`/`opacity` toggle, `role="tooltip"`, `aria-describedby`
- `Skeleton` — CSS `@keyframes bac-shimmer`, `background-size: 200%`, `aria-hidden="true"`
- `Select` — `<select>` nativo + `appearance: none` + `ChevronDown` lucide icon overlay
- `Breadcrumb` — `<nav>` + `<ol>`/`<li>`, `aria-current="page"`, `aria-label="Breadcrumb"`
- Demo responsivo — `layout.tsx` como `'use client'`, `useState` para sidebar, CSS `transform` + `@media`
- `PropRow` interface — datos estáticos de props en cada `*Section.tsx`
