# Research: @bacsystem/ui v1.2.0

## Decision 1 — Tooltip: CSS puro vs Floating UI

**Decision**: CSS `position: absolute` dentro de wrapper `position: relative`
**Rationale**: Sin dependencias nuevas. Casos de uso simples en v1.2.0. Reposicionamiento en bordes con `clamp()`.
**Alternatives considered**: Floating UI (+12KB bundle), Popper.js (descontinuado), CSS anchor-positioning (soporte limitado aún)
**How to apply**: wrapper `inline-flex position:relative` + tooltip `position:absolute` según placement; visibility controlada via JS state para focus, CSS :hover para mouse

## Decision 2 — Tooltip sobre disabled elements

**Decision**: Siempre envolver children en `<span style={{display:'contents'}}>` como receptor de eventos
**Rationale**: `disabled` nativo bloquea eventos de mouse/focus. El span no altera layout (display:contents).
**Alternatives considered**: Clonar el children con `React.cloneElement` añadiendo tabIndex — rechazado porque muta props del children sin consentimiento

## Decision 3 — Skeleton shimmer

**Decision**: CSS `@keyframes` + `background-position` animado
**Rationale**: 100% CSS, 60fps vía GPU, sin JS. Sin dependencias.
**Alternatives considered**: Web Animations API (más verboso, mismo resultado), GIF/SVG animado (no respeta tokens del sistema)

## Decision 4 — Select: nativo vs custom dropdown

**Decision**: `<select>` nativo + `appearance: none` + caret SVG/lucide overlay
**Rationale**: Accesibilidad garantizada por el navegador (especialmente crítico en móvil). API compatible con `Input`.
**Alternatives considered**: Dropdown custom con Listbox ARIA — rechazado por complejidad (~200 LOC extra) y riesgo de bugs de accesibilidad

## Decision 5 — Sidebar responsivo

**Decision**: `layout.tsx` → `'use client'` + `useState` + CSS transform
**Rationale**: Mínimo JS, transición fluida por CSS. El layout del demo puede ser client component sin impacto en la librería.
**Alternatives considered**: CSS-only con `:target` o checkbox hack — rechazado por falta de accesibilidad (aria-expanded, manejo de foco)

## Decision 6 — Tablas de props

**Decision**: Datos estáticos `PropRow[]` en cada `*Section.tsx`
**Rationale**: Simple, mantenible, sin tooling extra. La alternativa (ts-morph + AST) añade complejidad innecesaria para 11 componentes con props estables.
**Alternatives considered**: Generación automática desde tipos TypeScript con ts-morph — diferida a v2.0.0 (Storybook docs)
