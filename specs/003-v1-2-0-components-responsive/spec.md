# Feature Specification: @bacsystem/ui v1.2.0 — Nuevos componentes y demo responsivo

**Feature Branch**: `003-v1-2-0-components-responsive`
**Created**: 2026-03-23
**Last Updated**: 2026-03-23
**Status**: Draft

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Demo responsivo en móvil (Priority: P1)

Un desarrollador accede al demo desde su teléfono mientras evalúa si adoptar la librería.
En vez de ver una interfaz rota con el sidebar ocupando toda la pantalla, encuentra una
navegación adaptada con un botón hamburguesa, el contenido apilado en columna y los
ejemplos legibles sin hacer zoom.

**Why this priority**: El demo es la carta de presentación de la librería. Si no funciona
en móvil, el primer contacto de cualquier desarrollador desde su celular es negativo. Es
el único cambio que afecta a usuarios actuales sin requerir instalación de paquete nuevo.

**Independent Test**: Abrir `localhost:3000` en un dispositivo de 375px de ancho — el sidebar
debe estar oculto, el botón hamburguesa visible, y el contenido de cualquier sección debe
renderizarse sin scroll horizontal.

**Acceptance Scenarios**:

1. **Given** el demo abierto en pantalla < 768px, **When** se carga la página, **Then** el sidebar está oculto y el botón hamburguesa es visible en el header.
2. **Given** el botón hamburguesa visible, **When** el usuario lo presiona, **Then** el sidebar aparece con overlay de fondo y puede cerrarse tocando fuera o presionando Escape.
3. **Given** el sidebar abierto en móvil, **When** el usuario toca un enlace de sección, **Then** el sidebar se cierra automáticamente y la página hace scroll a la sección.
4. **Given** cualquier sección de componente, **When** se visualiza en < 768px, **Then** los ejemplos no producen scroll horizontal y las filas de componentes se apilan en columna.
5. **Given** el botón hamburguesa, **When** se navega por teclado (Tab + Enter/Space), **Then** abre y cierra el sidebar correctamente con manejo de foco adecuado.

---

### User Story 2 — Tablas de props en el demo (Priority: P2)

Un desarrollador está evaluando el componente `Input` y quiere saber exactamente qué props
acepta, sus tipos TypeScript y valores por defecto, sin tener que leer el código fuente de
la librería ni abrir la documentación en otro lugar.

**Why this priority**: Resuelve el único requisito funcional pendiente del spec anterior
(FR-023). Las tablas de props son estándar en toda librería de componentes madura (MUI,
Chakra, Radix) y eliminan la necesidad de leer tipos en el editor.

**Independent Test**: Abrir la sección "Button" en el demo, hacer click en "Ver props" —
debe aparecer una tabla con columnas Prop, Tipo, Default, Descripción para todas las props
del componente. La tabla debe mostrarse correctamente en móvil con scroll horizontal.

**Acceptance Scenarios**:

1. **Given** cualquier sección de componente, **When** el usuario hace click en "Ver props", **Then** aparece una tabla con columnas: Prop, Tipo, Default, Descripción.
2. **Given** la tabla de props visible, **When** el usuario hace click en "Ver props" de nuevo, **Then** la tabla se oculta (comportamiento toggle, igual que "Ver código").
3. **Given** la tabla de props en pantalla < 768px, **When** el contenido es más ancho que la pantalla, **Then** la tabla tiene scroll horizontal sin romper el layout padre.
4. **Given** los 11 componentes existentes, **When** se revisa cada sección, **Then** todos tienen tabla de props con información completa y correcta.

---

### User Story 3 — Componente Tooltip (Priority: P3)

Un desarrollador de OperaAI o AulaAI necesita mostrar información adicional sobre un
elemento de la interfaz al hacer hover o focus, sin ocupar espacio permanente en pantalla.
Instala `@bacsystem/ui` y usa `<Tooltip content="Texto">` envolviendo cualquier elemento.

**Why this priority**: Es el componente de mayor demanda inmediata en los proyectos
consumidores (formularios con ayudas contextuales, botones de acción en tablas).

**Independent Test**: Envolver un `<Button>` con `<Tooltip content="Eliminar registro">`,
hacer hover — debe aparecer el tooltip encima. Navegar con Tab hasta el botón — el tooltip
debe aparecer y desaparecer con focus/blur. Presionar Escape — el tooltip debe cerrarse.

**Acceptance Scenarios**:

1. **Given** un `Tooltip` envolviendo cualquier elemento, **When** el usuario hace hover, **Then** aparece en la posición indicada por `placement` (default: top).
2. **Given** un `Tooltip` sobre un elemento focusable, **When** el usuario navega con Tab y recibe foco, **Then** el tooltip aparece; al perder foco, desaparece.
3. **Given** un tooltip visible, **When** el usuario presiona Escape, **Then** el tooltip se cierra inmediatamente.
4. **Given** `<Tooltip disabled>`, **When** el usuario hace hover o focus, **Then** el tooltip no aparece.
5. **Given** dark mode activo, **When** se muestra el tooltip, **Then** usa colores del sistema de diseño para dark mode sin valores hardcodeados.

---

### User Story 4 — Componente Skeleton (Priority: P4)

Un desarrollador está construyendo una pantalla con datos que tardan en cargar. En lugar
de mostrar un spinner genérico, quiere mostrar el esqueleto de la interfaz con placeholders
animados que imiten la forma del contenido final.

**Why this priority**: Mejora directamente la percepción de velocidad en OperaAI y AulaAI.
Es un componente de uso transversal (listas, cards, tablas) sin dependencias complejas.

**Independent Test**: Renderizar `<Skeleton variant="rect" width={200} height={20} />` —
debe aparecer un rectángulo con animación shimmer. Renderizar `<Skeleton variant="circle"
width={40} height={40} />` — debe ser circular con la misma animación.

**Acceptance Scenarios**:

1. **Given** `<Skeleton variant="rect">`, **When** se renderiza, **Then** muestra un rectángulo con animación shimmer continua.
2. **Given** `<Skeleton variant="circle">`, **When** se renderiza, **Then** muestra un círculo con la misma animación.
3. **Given** `<Skeleton variant="text">`, **When** se renderiza, **Then** muestra una línea de altura equivalente a texto con bordes redondeados.
4. **Given** dark mode activo, **When** se muestra el skeleton, **Then** los colores del shimmer se adaptan al tema oscuro.
5. **Given** un skeleton en pantalla, **When** un lector de pantalla lo escanea, **Then** el skeleton es ignorado (`aria-hidden="true"`).

---

### User Story 5 — Componente Select (Priority: P5)

Un desarrollador necesita un campo de selección visualmente consistente con el `Input`
existente. El `<select>` nativo del navegador no respeta el design system y tiene apariencia
distinta en cada sistema operativo.

**Why this priority**: Es el componente de formulario más solicitado tras `Input`. Comparte
la misma API y estilos que `Input`, reduciendo la curva de aprendizaje.

**Independent Test**: Renderizar `<Select label="País" options={[{value:'pe', label:'Perú'}]}
placeholder="Seleccionar" />` — debe verse idéntico al `Input` en estilos base. Pasar
`error="Campo requerido"` — debe mostrar el estado de error igual que `Input`.

**Acceptance Scenarios**:

1. **Given** un `Select` con `options`, **When** se renderiza, **Then** su apariencia base es visualmente consistente con el componente `Input`.
2. **Given** `Select` con `error="mensaje"`, **When** se renderiza, **Then** muestra el estado de error con el mismo estilo que `Input` en error.
3. **Given** `Select` con `disabled`, **When** se renderiza, **Then** el campo no es interactivo y muestra el estilo deshabilitado.
4. **Given** `Select` con `defaultValue`, **When** se renderiza sin `value` ni `onChange`, **Then** funciona como uncontrolled con el valor inicial seleccionado.
5. **Given** `Select` con `value` y `onChange`, **When** el usuario cambia la opción, **Then** llama a `onChange` con el nuevo valor (controlled).
6. **Given** dark mode activo, **When** se renderiza el `Select`, **Then** colores y estilos se adaptan correctamente.

---

### User Story 6 — Componente Breadcrumb (Priority: P6)

Un desarrollador en OperaAI necesita mostrar la ruta de navegación actual en páginas de
detalle profundas (ej: Empresa → Ventas → Factura F-0042).

**Why this priority**: Componente de navegación estándar, de implementación más simple que
los anteriores. Bajo riesgo, alta utilidad en aplicaciones con jerarquía de páginas.

**Independent Test**: Renderizar `<Breadcrumb items={[{label:'Inicio', href:'/'}, {label:
'Ventas', href:'/ventas'}, {label:'F-0042'}]} />` — debe mostrar los tres niveles separados
por "/", el último sin enlace y con `aria-current="page"`.

**Acceptance Scenarios**:

1. **Given** un `Breadcrumb` con `items`, **When** se renderiza, **Then** muestra cada ítem en orden separado por `separator` (default: "/").
2. **Given** el último ítem del array, **When** se renderiza, **Then** aparece sin enlace y con `aria-current="page"`.
3. **Given** ítems con `href`, **When** el usuario hace click, **Then** navega a la ruta indicada.
4. **Given** dark mode activo, **When** se renderiza el `Breadcrumb`, **Then** los colores se adaptan al tema oscuro.
5. **Given** un `Breadcrumb`, **When** se inspecciona el HTML, **Then** usa `<nav aria-label="Breadcrumb">` con `<ol>` y `<li>` semánticos.

---

### Edge Cases

- **Tooltip en borde de pantalla**: Si `placement="top"` y no hay espacio arriba, el tooltip no debe salirse del viewport.
- **Tooltip sobre elemento disabled**: Elementos HTML con `disabled` no disparan eventos de mouse; el wrapper del Tooltip debe usar un `<span>` intermedio.
- **Select sin opciones**: Cuando `options=[]`, debe renderizarse sin errores mostrando solo el placeholder.
- **Skeleton con width en porcentaje**: Debe funcionar dentro de contenedores flex/grid heredando el ancho del padre.
- **Breadcrumb con un solo ítem**: Debe renderizarse como el ítem actual sin separador.
- **Sidebar y resize**: Si el usuario abre el sidebar en móvil y redimensiona a desktop, el sidebar debe quedar visible sin overlay (sin estado inconsistente).
- **Props table en móvil**: Si una celda tiene un tipo TypeScript largo, debe truncarse o tener scroll sin romper la tabla.

---

## Requirements *(mandatory)*

### Functional Requirements

**Demo — Responsivo**

- **FR-001**: El layout del demo DEBE adaptarse a pantallas de 320px a 767px sin scroll horizontal en el contenido principal.
- **FR-002**: El sidebar DEBE estar oculto por defecto en pantallas < 768px y abrirse mediante un botón hamburguesa en el header.
- **FR-003**: El overlay del sidebar en móvil DEBE cerrarse al hacer click fuera, al presionar Escape, y al seleccionar una sección.
- **FR-004**: El botón hamburguesa DEBE tener `aria-expanded`, `aria-controls`, y manejo de foco correcto.
- **FR-005**: En pantallas ≥ 768px el sidebar DEBE ser siempre visible sin cambios respecto al comportamiento actual.

**Demo — Tablas de props**

- **FR-006**: Cada sección de componente DEBE tener un botón "Ver props" que revele una tabla con columnas: Prop, Tipo, Default, Descripción.
- **FR-007**: La tabla de props DEBE ser colapsable (toggle), iniciando oculta, con el mismo estilo visual que el botón "Ver código".
- **FR-008**: Las tablas DEBEN cubrir los 11 componentes: Button, Badge, Input, Card, Alert, Avatar, Toggle, Modal, DataTable, StatCard, Tabs.
- **FR-009**: Las tablas DEBEN tener scroll horizontal contenido cuando el ancho exceda el disponible.

**Tooltip**

- **FR-010**: `Tooltip` DEBE exportarse con interfaz `TooltipProps` nombrada.
- **FR-011**: `Tooltip` DEBE aceptar: `content` (string | ReactNode), `placement` ('top'|'bottom'|'left'|'right', default 'top'), `disabled` (boolean), `className`.
- **FR-012**: `Tooltip` DEBE activarse en hover y focus, y desactivarse en mouseleave, blur y Escape.
- **FR-013**: `Tooltip` DEBE usar `role="tooltip"` y `aria-describedby` en el elemento disparador.
- **FR-014**: `Tooltip` DEBE usar exclusivamente CSS custom properties del sistema de diseño.

**Skeleton**

- **FR-015**: `Skeleton` DEBE exportarse con interfaz `SkeletonProps` nombrada.
- **FR-016**: `Skeleton` DEBE aceptar: `variant` ('text'|'circle'|'rect', default 'rect'), `width` (string|number), `height` (string|number), `className`.
- **FR-017**: `Skeleton` DEBE mostrar animación shimmer (gradiente deslizante continuo).
- **FR-018**: `Skeleton` DEBE tener `aria-hidden="true"`.

**Select**

- **FR-019**: `Select` DEBE exportarse con interfaz `SelectProps` nombrada.
- **FR-020**: `Select` DEBE aceptar: `options` ({ value, label, disabled? }[]), `label`, `placeholder`, `hint`, `error`, `success`, `disabled`, `inputSize` ('sm'|'md'|'lg'), `value`, `defaultValue`, `onChange`, `className`.
- **FR-021**: `Select` DEBE ser visualmente consistente con `Input` en todos sus estados (default, error, success, disabled).
- **FR-022**: `Select` DEBE soportar modo controlado (`value` + `onChange`) y no controlado (`defaultValue`).
- **FR-023**: `Select` DEBE asociar label via `htmlFor`/`id` y `aria-describedby` en error.

**Breadcrumb**

- **FR-024**: `Breadcrumb` DEBE exportarse con interfaz `BreadcrumbProps` nombrada.
- **FR-025**: `Breadcrumb` DEBE aceptar: `items` ({ label: string; href?: string }[]), `separator` (string, default '/'), `className`.
- **FR-026**: El último ítem DEBE renderizarse sin enlace y con `aria-current="page"`.
- **FR-027**: `Breadcrumb` DEBE usar `<nav aria-label="Breadcrumb">` con `<ol>` y `<li>` internamente.

**Build & Export**

- **FR-028**: Los 4 componentes nuevos DEBEN exportarse desde `packages/ui/src/index.ts` con sus tipos.
- **FR-029**: El build DEBE completarse con cero errores TypeScript en modo `strict`.
- **FR-030**: Los 4 componentes nuevos DEBEN tener secciones en el sidebar del demo y sus `*Section.tsx` en `apps/demo/app/sections/`.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El demo carga y es navegable en un dispositivo de 375px sin scroll horizontal y sin elementos superpuestos.
- **SC-002**: Un desarrollador puede ver la tabla de props de cualquier componente en menos de 2 clicks.
- **SC-003**: Los 4 componentes nuevos compilan con cero errores TypeScript en un proyecto consumidor con strict mode.
- **SC-004**: El sidebar en móvil abre y cierra en menos de 300ms (CSS transition).
- **SC-005**: Los 4 componentes nuevos soportan dark mode sin valores de color hardcodeados.
- **SC-006**: Un desarrollador nuevo puede usar `<Tooltip>`, `<Skeleton>`, `<Select>` y `<Breadcrumb>` con autocompletado completo en su editor.
- **SC-007**: La tabla de props en móvil no produce scroll horizontal en el layout padre.
- **SC-008**: El build de `@bacsystem/ui` pasa con cero errores tras agregar los 4 componentes nuevos.

---

## Assumptions

- El sidebar responsivo se implementa solo en `apps/demo/`; no afecta la librería `@bacsystem/ui`.
- `Tooltip` usa posicionamiento CSS puro para v1.2.0; reposicionamiento automático se evalúa en v2.0.0.
- `Select` usa el elemento nativo `<select>` estilizado con CSS, no un dropdown custom, para garantizar accesibilidad y compatibilidad móvil.
- Las tablas de props son datos estáticos definidos en cada `*Section.tsx`; no se generan automáticamente desde tipos TypeScript.
- Los breakpoints del demo responsivo usan los mismos umbrales que `useBreakpoint`: móvil < 768px, tablet 768–1023px, desktop ≥ 1024px.
- La versión v1.2.0 se publica a GitHub Packages y npm con el workflow existente al crear el tag `v1.2.0`.
