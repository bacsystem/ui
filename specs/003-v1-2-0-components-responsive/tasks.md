---
description: "Task list for @bacsystem/ui v1.2.0 — Nuevos componentes y demo responsivo"
---

# Tasks: @bacsystem/ui v1.2.0 — Nuevos componentes y demo responsivo

**Input**: Design documents from `/specs/003-v1-2-0-components-responsive/`
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ contracts/public-api.md ✅ quickstart.md ✅

**Tests**: Not requested — no test tasks generated. TypeScript strict compile (`tsc --noEmit`) is the primary quality gate.

**Organization**: Tasks grouped by user story priority order. US1 (demo responsivo) is P1 but depends on no library changes, so it can run in parallel with component work. Library components (US3–US6) are prerequisites for their demo sections.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US6)
- Include exact file paths in descriptions

## Path Conventions

Monorepo root. All paths relative to repo root:

- Library source: `packages/ui/src/`
- Library styles: `packages/ui/src/styles/components.css`
- Library exports: `packages/ui/src/index.ts`
- Demo app: `apps/demo/`
- Demo layout: `apps/demo/app/layout.tsx`
- Demo globals: `apps/demo/app/globals.css`
- Demo sections: `apps/demo/app/sections/`
- Demo components: `apps/demo/components/`

---

## Phase 1: Tooltip Component (US3 — P3)

**Purpose**: Implementar el componente `Tooltip` en la librería con CSS puro, soporte de hover/focus, tecla Escape, y accesibilidad ARIA.

**Independent Test**: `<Tooltip content="Eliminar" placement="top"><Button>X</Button></Tooltip>` — tooltip aparece encima en hover/focus, desaparece en mouseleave/blur/Escape. `<Tooltip disabled>` — no aparece.

- [x] T001 [P] [US3] Crear `packages/ui/src/components/Tooltip/Tooltip.tsx`: wrapper `inline-flex` con `position: relative`; `<span style={{display:'contents'}}>` envolviendo children para soporte de elementos `disabled`; estado `open` via `useState`; handlers: `onMouseEnter`/`onMouseLeave` + `onFocus`/`onBlur` + `onKeyDown` (Escape); el globo del tooltip con `role="tooltip"` e `id` generado (`useId`); `aria-describedby` en el span wrapper; `placement` mapeado a clases CSS BEM (`.bac-tooltip--top/bottom/left/right`); prop `disabled` previene apertura; exportar `TooltipProps`, `TooltipPlacement`
- [x] T002 [P] [US3] Crear `packages/ui/src/components/Tooltip/index.ts` re-exportando `Tooltip`, `TooltipProps`, `TooltipPlacement`
- [x] T003 [P] [US3] Agregar estilos Tooltip a `packages/ui/src/styles/components.css`: `.bac-tooltip__wrapper` (inline-flex, position:relative); `.bac-tooltip__content` (position:absolute, visibility:hidden, opacity:0, transition 150ms, z-index:50, padding, border-radius usando `--radius-md`, fondo `--color-neutral-900`, color `--color-neutral-50`, font-size `--text-sm`, max-width 200px, pointer-events:none); `.bac-tooltip__content.bac-tooltip__content--visible` (visibility:visible, opacity:1); posicionamiento por modificador: `--top` (bottom:calc(100% + 6px), left:50%, transform:translateX(-50%)), `--bottom` (top:calc(100% + 6px), left:50%, transform:translateX(-50%)), `--left` (right:calc(100% + 6px), top:50%, transform:translateY(-50%)), `--right` (left:calc(100% + 6px), top:50%, transform:translateY(-50%)); `[data-theme="dark"]` overrides con `--color-neutral-100` fondo y `--color-neutral-900` color

---

## Phase 2: Skeleton Component (US4 — P4)

**Purpose**: Implementar el componente `Skeleton` con animación shimmer CSS, tres variantes de forma, y accesibilidad correcta.

**Independent Test**: `<Skeleton variant="rect" width={200} height={20} />` — rectángulo con shimmer. `<Skeleton variant="circle" width={40} height={40} />` — círculo. `aria-hidden="true"` presente.

- [x] T004 [P] [US4] Crear `packages/ui/src/components/Skeleton/Skeleton.tsx`: elemento `<span>` con `aria-hidden="true"`; clases BEM `.bac-skeleton` base + `.bac-skeleton--{variant}`; `width`/`height` aplicados como `style` inline (si number, agregar 'px'; si string, usar directamente); `className` forwarding; exportar `SkeletonProps`, `SkeletonVariant`
- [x] T005 [P] [US4] Crear `packages/ui/src/components/Skeleton/index.ts` re-exportando `Skeleton`, `SkeletonProps`, `SkeletonVariant`
- [x] T006 [P] [US4] Agregar estilos Skeleton a `packages/ui/src/styles/components.css`: `@keyframes bac-shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }`; `.bac-skeleton` (display:block, background: linear-gradient(90deg, var(--color-neutral-100) 25%, var(--color-neutral-200) 50%, var(--color-neutral-100) 75%), background-size:200% 100%, animation: bac-shimmer 1.5s ease-in-out infinite); `.bac-skeleton--rect` (border-radius: var(--radius-sm)); `.bac-skeleton--text` (border-radius: var(--radius-full), height por defecto 1em); `.bac-skeleton--circle` (border-radius: 50%); `[data-theme="dark"]` overrides usando `--color-neutral-700` y `--color-neutral-600` para el gradiente

---

## Phase 3: Select Component (US5 — P5)

**Purpose**: Implementar el componente `Select` usando `<select>` nativo estilizado con CSS, visualmente consistente con `Input`, API idéntica en props de estado.

**Independent Test**: `<Select label="País" options={[{value:'pe',label:'Perú'}]} placeholder="Seleccionar" />` — idéntico visualmente a `Input`. `error="Campo requerido"` — muestra estado de error igual que `Input`. `disabled` — no interactivo.

- [x] T007 [P] [US5] Crear `packages/ui/src/components/Select/Select.tsx`: wrapper `<div className="bac-select bac-select--{inputSize} ...">` con `position: relative`; `<label>` con `htmlFor={id}` (generar id con `useId`); `<select className="bac-select__field">` con `id`, `disabled`, `value`/`defaultValue`, `onChange` adaptado a `(e) => props.onChange?.(e.target.value)`, `aria-describedby` cuando hay `error`; `<ChevronDown>` de lucide-react con `className="bac-select__caret"` + `pointer-events:none`; texto de hint/error/success bajo el campo igual que `Input`; clases de modificador: `--error`, `--success`, `--disabled`; modo uncontrolled funciona con `defaultValue`; exportar `SelectProps`, `SelectOption`
- [x] T008 [P] [US5] Crear `packages/ui/src/components/Select/index.ts` re-exportando `Select`, `SelectProps`, `SelectOption`
- [x] T009 [P] [US5] Agregar estilos Select a `packages/ui/src/styles/components.css`: `.bac-select` (position:relative, display:flex, flex-direction:column, gap: var(--sp-1)); `.bac-select__field` (width:100%, appearance:none, padding-right:2.5rem, mismos estilos de borde/fondo/color que `.bac-input__field`, cursor:pointer); `.bac-select__caret` (position:absolute, right:0.75rem, bottom calculado para alinearse con el campo, pointer-events:none, color: var(--color-neutral-500)); modificadores `--sm`/`--md`/`--lg` igualando los tamaños de `Input`; modificadores `--error`/`--success`/`--disabled` con los mismos tokens de color que `Input`; `[data-theme="dark"]` overrides

---

## Phase 4: Breadcrumb Component (US6 — P6)

**Purpose**: Implementar el componente `Breadcrumb` con semántica `<nav>/<ol>/<li>`, separador configurable y `aria-current="page"` en el último ítem.

**Independent Test**: `<Breadcrumb items={[{label:'Inicio',href:'/'},{label:'Ventas',href:'/ventas'},{label:'F-0042'}]} />` — tres niveles separados por "/", último sin enlace, con `aria-current="page"`.

- [x] T010 [P] [US6] Crear `packages/ui/src/components/Breadcrumb/Breadcrumb.tsx`: `<nav aria-label="Breadcrumb" className={...}>` conteniendo `<ol className="bac-breadcrumb__list">`; mapear `items` a `<li className="bac-breadcrumb__item {--current si es el último}">`: si no es el último y tiene `href`, renderizar `<a href={item.href}>{item.label}</a>`; si es el último, renderizar `<span aria-current="page">{item.label}</span>`; entre ítems (no después del último) agregar `<li className="bac-breadcrumb__separator" aria-hidden="true">{separator}</li>`; exportar `BreadcrumbProps`, `BreadcrumbItem`
- [x] T011 [P] [US6] Crear `packages/ui/src/components/Breadcrumb/index.ts` re-exportando `Breadcrumb`, `BreadcrumbProps`, `BreadcrumbItem`
- [x] T012 [P] [US6] Agregar estilos Breadcrumb a `packages/ui/src/styles/components.css`: `.bac-breadcrumb` (display:inline-block); `.bac-breadcrumb__list` (list-style:none, margin:0, padding:0, display:flex, flex-wrap:wrap, align-items:center, gap: var(--sp-1), font-size: var(--text-sm)); `.bac-breadcrumb__item` (color: var(--color-primary-600)); `.bac-breadcrumb__item a` (color: inherit, text-decoration:none, hover: text-decoration:underline); `.bac-breadcrumb__item--current` (color: var(--color-neutral-500), font-weight:500); `.bac-breadcrumb__separator` (color: var(--color-neutral-400), user-select:none); `[data-theme="dark"]` overrides para todos los colores

---

## Phase 5: Library Exports (Blocker para fases de demo)

**Purpose**: Registrar los 4 componentes nuevos en el barrel export y verificar que el build TypeScript pasa con zero errores.

- [x] T013 [US3,US4,US5,US6] Agregar exports a `packages/ui/src/index.ts`: añadir las 4 líneas de export para componentes y las 4 líneas de `export type` para interfaces según el contrato en `contracts/public-api.md`
- [x] T014 Ejecutar `tsc --noEmit` en `packages/ui/`; corregir todos los errores de tipo en modo strict antes de continuar
- [x] T015 Ejecutar `npm run build:ui` desde la raíz; confirmar que `dist/styles.css` incluye los estilos de Tooltip, Skeleton, Select y Breadcrumb; confirmar zero errores de compilación

**Checkpoint**: Librería lista — los 4 componentes nuevos son importables y type-safe.

---

## Phase 6: Demo Responsivo (US1 — P1)

**Purpose**: Hacer el layout del demo completamente responsivo en móvil: sidebar con hamburguesa, overlay, cierre con Escape/click fuera/navegación, y layout adaptado a 320px–767px.

**Independent Test**: `localhost:3000` en 375px — sidebar oculto, botón ☰ visible. Click en ☰ → sidebar + overlay. Click fuera → cierra. Click en sección → cierra + scroll. Escape → cierra. Resize a 768px+ → sidebar siempre visible, sin ☰.

- [x] T016 [US1] Convertir `apps/demo/app/layout.tsx` a `'use client'`: añadir `useState<boolean>(false)` para `sidebarOpen`; agregar botón hamburguesa en el header con `aria-expanded={sidebarOpen}`, `aria-controls="demo-sidebar"`, icono `Menu`/`X` de lucide-react según estado; agregar `<div className="demo-sidebar__overlay">` que al hacer click llama `setSidebarOpen(false)`; pasar clase `demo-sidebar--open` al sidebar cuando `sidebarOpen` es `true`; añadir `useEffect` con listener `keydown` para cerrar con Escape; añadir `useEffect` con `matchMedia('(min-width: 768px)')` para forzar `setSidebarOpen(false)` al pasar a desktop; cada enlace del sidebar llama `setSidebarOpen(false)` antes de navegar
- [x] T017 [US1] Agregar estilos responsivos del sidebar a `apps/demo/app/globals.css`: `@media (max-width: 767px)` con reglas: `.demo-sidebar` (position:fixed, top:0, left:0, height:100vh, z-index:100, transform:translateX(-100%), transition:transform 0.25s ease, overflow-y:auto); `.demo-sidebar--open` (transform:translateX(0), box-shadow: var(--shadow-xl)); `.demo-sidebar__overlay` (display:block, position:fixed, inset:0, z-index:99, background:rgba(0,0,0,0.5)); `.demo-hamburger` (display:flex); `.demo-main` (width:100%); — `@media (min-width: 768px)`: `.demo-sidebar` (transform:none !important, position:sticky, height:100vh); `.demo-sidebar__overlay` (display:none !important); `.demo-hamburger` (display:none)
- [x] T018 [US1] Asegurar que cada sección del demo no produce scroll horizontal en 320px: revisar `apps/demo/app/sections/` y ajustar en `globals.css` los flex/grid containers que quiebran en mobile (añadir `flex-wrap: wrap`, `min-width: 0`, `overflow-x: auto` donde corresponda); los ejemplos con múltiples items side-by-side deben apilarse en columna con `@media (max-width: 767px)`

---

## Phase 7: Tablas de Props (US2 — P2)

**Purpose**: Agregar un slot `PropsTable` con toggle "Ver props" al componente `DemoSection` y poblar los datos de props para los 11 componentes existentes.

**Independent Test**: Click en "Ver props" en la sección Button → tabla con columnas Prop, Tipo, Default, Descripción. Click de nuevo → oculta. En móvil (375px) → tabla con scroll horizontal sin romper el layout.

### Interface y componente base

- [x] T019 [US2] Agregar en `apps/demo/components/DemoSection.tsx` la interfaz `PropRow` y el prop `props?: PropRow[]`: definir `interface PropRow { readonly prop: string; readonly type: string; readonly default: string; readonly description: string }`; agregar estado `showProps: boolean` con `useState(false)`; cuando `props` está presente, renderizar botón "Ver props" con el mismo estilo visual que "Ver código"; cuando `showProps` es true, renderizar `<div className="demo-props-table-wrapper"><table className="demo-props-table">` con header (Prop, Tipo, Default, Descripción) y filas mapeadas desde `props`; el wrapper con `overflow-x: auto` para scroll horizontal en móvil

### CSS para tabla de props

- [x] T020 [US2] Agregar estilos de tabla de props a `apps/demo/app/globals.css`: `.demo-props-table-wrapper` (overflow-x:auto, margin-top: var(--sp-2)); `.demo-props-table` (width:100%, border-collapse:collapse, font-size: var(--text-sm), white-space:nowrap); `.demo-props-table th` (text-align:left, padding: var(--sp-2) var(--sp-3), background: var(--color-neutral-100), font-weight:600, border-bottom:2px solid var(--color-neutral-200)); `.demo-props-table td` (padding: var(--sp-2) var(--sp-3), border-bottom:1px solid var(--color-neutral-100), vertical-align:top); `.demo-props-table td:nth-child(2)` (font-family: var(--font-mono), color: var(--color-primary-700), font-size: var(--text-xs)); `.demo-props-table td:nth-child(3)` (font-family: var(--font-mono), color: var(--color-neutral-500)); `[data-theme="dark"]` overrides

### Datos de props por sección (11 componentes existentes)

- [x] T021 [P] [US2] Agregar `props` a `apps/demo/app/sections/ButtonSection.tsx`: filas para `variant` ('primary'|'secondary'|'accent'|'ghost'|'danger'|'success', default:'primary'), `size` ('xs'|'sm'|'md'|'lg'|'xl', default:'md'), `appearance` ('filled'|'outline'|'soft'|'link', default:'filled'), `loading` (boolean, default:false), `disabled` (boolean, default:false), `iconLeft` (ReactNode, default:—), `iconRight` (ReactNode, default:—), `className` (string, default:—)
- [x] T022 [P] [US2] Agregar `props` a `apps/demo/app/sections/BadgeSection.tsx`: `variant` ('primary'|'secondary'|'accent'|'success'|'warning'|'error', default:'primary'), `appearance` ('filled'|'outline'|'soft', default:'filled'), `className` (string, default:—)
- [x] T023 [P] [US2] Agregar `props` a `apps/demo/app/sections/InputSection.tsx`: `label` (string, default:—), `placeholder` (string, default:—), `hint` (string, default:—), `error` (string, default:—), `disabled` (boolean, default:false), `inputSize` ('sm'|'md'|'lg', default:'md'), `value` (string, default:—), `onChange` ((v:string)=>void, default:—), `className` (string, default:—)
- [x] T024 [P] [US2] Agregar `props` a `apps/demo/app/sections/CardSection.tsx`: `variant` ('default'|'elevated'|'outlined'|'tinted', default:'default'), `size` ('sm'|'md'|'lg', default:'md'), `className` (string, default:—)
- [x] T025 [P] [US2] Agregar `props` a `apps/demo/app/sections/AlertSection.tsx`: `variant` ('info'|'success'|'warning'|'error', default:'info'), `appearance` ('soft'|'filled'|'outline', default:'soft'), `onClose` (()=>void, default:—), `className` (string, default:—)
- [x] T026 [P] [US2] Agregar `props` a `apps/demo/app/sections/AvatarSection.tsx`: `src` (string, default:—), `alt` (string, default:—), `initials` (string, default:—), `size` ('xs'|'sm'|'md'|'lg'|'xl', default:'md'), `appearance` ('filled'|'outline'|'soft', default:'filled'), `className` (string, default:—)
- [x] T027 [P] [US2] Agregar `props` a `apps/demo/app/sections/ToggleSection.tsx`: `checked` (boolean, default:—), `defaultChecked` (boolean, default:false), `onChange` ((v:boolean)=>void, default:—), `disabled` (boolean, default:false), `size` ('sm'|'md'|'lg', default:'md'), `label` (string, default:—), `className` (string, default:—)
- [x] T028 [P] [US2] Agregar `props` a `apps/demo/app/sections/ModalSection.tsx`: `open` (boolean, default:—), `onClose` (()=>void, default:—), `title` (string, default:—), `size` ('sm'|'md'|'lg', default:'md'), `className` (string, default:—)
- [x] T029 [P] [US2] Agregar `props` a `apps/demo/app/sections/DataTableSection.tsx`: `columns` (DataTableColumn<T>[], default:—), `data` (T[], default:—), `loading` (boolean, default:false), `emptyText` (string, default:'Sin datos'), `className` (string, default:—)
- [x] T030 [P] [US2] Agregar `props` a `apps/demo/app/sections/StatCardSection.tsx`: `title` (string, default:—), `value` (string|number, default:—), `description` (string, default:—), `trend` ('up'|'down', default:—), `trendValue` (string, default:—), `color` ('primary'|'success'|'warning'|'error'|'accent', default:'primary'), `appearance` ('soft'|'filled'|'outline', default:'soft'), `className` (string, default:—)
- [x] T031 [P] [US2] Agregar `props` a `apps/demo/app/sections/TabsSection.tsx`: `items` (TabItem[], default:—), `defaultTab` (string, default: primer item), `onChange` ((v:string)=>void, default:—), `className` (string, default:—)

---

## Phase 8: Secciones del demo para nuevos componentes (US3–US6)

**Purpose**: Agregar las cuatro secciones nuevas al demo con ejemplos interactivos y tablas de props. Depende de Phase 5 (exports listos).

**Prerequisite**: Phase 5 completada (componentes exportados y build pasando).

- [x] T032 [P] [US3] Crear `apps/demo/app/sections/TooltipSection.tsx`: importar `Tooltip`, `Button`, `Badge` de `@bacsystem/ui`; mostrar ejemplos con los 4 placements (top/bottom/left/right) — cada uno con un `Button` envuelto; ejemplo con `disabled`; ejemplo con content como `ReactNode` (texto en negrita); incluir `props` con filas para: `content` (string|ReactNode, —, el texto del tooltip), `placement` ('top'|'bottom'|'left'|'right', 'top', posición del tooltip), `disabled` (boolean, false, desactiva el tooltip), `className` (string, —, clase CSS adicional)
- [x] T033 [P] [US4] Crear `apps/demo/app/sections/SkeletonSection.tsx`: importar `Skeleton` de `@bacsystem/ui`; mostrar ejemplos agrupados por variante: sección "text" con varios `Skeleton variant="text"` simulando un párrafo, sección "rect" con un placeholder de imagen, sección "circle" con tamaños xs/sm/md/lg de avatar placeholder; ejemplo de composición (card skeleton completa); incluir `props` con filas para: `variant` ('text'|'circle'|'rect', 'rect'), `width` (string|number, —), `height` (string|number, —), `className` (string, —)
- [x] T034 [P] [US5] Crear `apps/demo/app/sections/SelectSection.tsx`: importar `Select` de `@bacsystem/ui`; mostrar ejemplos: default con placeholder, con valor seleccionado, estado error, estado success, disabled, los tres tamaños (sm/md/lg); ejemplo controlado con `useState` para el valor; incluir `props` con filas para: `options` (SelectOption[], —), `label` (string, —), `placeholder` (string, —), `hint` (string, —), `error` (string, —), `success` (string, —), `disabled` (boolean, false), `inputSize` ('sm'|'md'|'lg', 'md'), `value` (string, —), `defaultValue` (string, —), `onChange` ((v:string)=>void, —), `className` (string, —)
- [x] T035 [P] [US6] Crear `apps/demo/app/sections/BreadcrumbSection.tsx`: importar `Breadcrumb` de `@bacsystem/ui`; mostrar ejemplos: 1 ítem (solo actual), 2 ítems, 3 ítems (Inicio→Ventas→F-0042), separador personalizado ("›"), dark mode; incluir `props` con filas para: `items` (BreadcrumbItem[], —, array de ítems con label y href opcional), `separator` (string, '/', separador entre ítems), `className` (string, —)
- [x] T036 [US3,US4,US5,US6] Agregar los 4 nuevos componentes al sidebar de `apps/demo/app/layout.tsx`: agregar entradas para Tooltip, Skeleton, Select, Breadcrumb en el grupo "Components" del nav; añadir sus secciones al `page.tsx` o donde corresponda según la estructura actual del demo

---

## Phase 9: Validación Final

**Purpose**: Confirmar que todo compila, el build pasa, y los criterios de éxito del spec están cumplidos.

- [x] T037 Ejecutar `tsc --noEmit` en `packages/ui/`; confirmar zero errores TypeScript strict
- [x] T038 [P] Ejecutar `tsc --noEmit` en `apps/demo/`; confirmar zero errores TypeScript strict
- [x] T039 Ejecutar `npm run build` desde la raíz; confirmar zero errores en ambos workspaces y que `dist/styles.css` incluye los nuevos componentes (SC-008)
- [x] T040 [P] Verificar `packages/ui/src/index.ts` exporta: `Tooltip`, `TooltipProps`, `TooltipPlacement`, `Skeleton`, `SkeletonProps`, `SkeletonVariant`, `Select`, `SelectProps`, `SelectOption`, `Breadcrumb`, `BreadcrumbProps`, `BreadcrumbItem` (FR-028, SC-006)
- [ ] T041 [P] Verificar demo en 375px: sidebar oculto al cargar, ☰ visible, apertura/cierre funcionan, ninguna sección produce scroll horizontal (SC-001, FR-001–FR-005)
- [x] T042 [P] Verificar tablas de props: click en "Ver props" en Button → tabla visible con 4 columnas; click de nuevo → oculta (SC-002, FR-006–FR-009)
- [ ] T043 [P] Verificar dark mode en los 4 componentes nuevos: `data-theme="dark"` en `<html>` → Tooltip, Skeleton, Select, Breadcrumb usan colores del sistema sin valores hardcodeados (SC-005, FR-014)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1–4** (Componentes librería): Sin dependencias entre sí — se pueden ejecutar en paralelo
- **Phase 5** (Exports): Depende de Phases 1–4 — BLOQUEANTE para Phase 8
- **Phase 6** (Demo responsivo): Sin dependencias de librería — puede ejecutarse en paralelo con Phases 1–5
- **Phase 7** (Tablas de props): Depende solo de cambios en `DemoSection.tsx` y secciones existentes — paralelo con Phases 1–5
- **Phase 8** (Nuevas secciones demo): Depende de Phase 5 (componentes exportados)
- **Phase 9** (Validación): Depende de todas las fases anteriores

### Recommended Parallel Batches

**Batch A** (paralelo):
- T001–T003 (Tooltip)
- T004–T006 (Skeleton)
- T007–T009 (Select)
- T010–T012 (Breadcrumb)
- T016–T018 (Demo responsivo)
- T019–T020 (PropsTable base)

**Batch B** (después de T013–T015):
- T021–T031 (Props data para 11 secciones)
- T032–T035 (Nuevas secciones demo)

**Batch C** (final):
- T036 (Sidebar update)
- T037–T043 (Validación)

### Critical Path

`Phases 1–4` → `T013 (exports)` → `T014–T015 (build check)` → `T032–T036 (demo sections)` → `T037–T043 (validation)`
