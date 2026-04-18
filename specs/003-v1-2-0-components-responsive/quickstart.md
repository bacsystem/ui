# Quickstart: @bacsystem/ui v1.2.0

## Test del demo responsivo (US1)

1. `npm run dev` desde la raíz del monorepo
2. Abrir Chrome DevTools → Toggle device toolbar → iPhone SE (375×667)
3. Verificar: sidebar oculto, botón ☰ visible en el header
4. Click en ☰ → sidebar aparece con overlay oscuro detrás
5. Click fuera del sidebar → se cierra
6. Click en "Button" en el sidebar → sidebar se cierra + scroll a la sección Button
7. Presionar Escape con sidebar abierto → se cierra
8. Redimensionar a 1024px+ → sidebar siempre visible, sin overlay, sin botón ☰

## Test de tablas de props (US2)

1. Ir a la sección "Button" en el demo
2. Click en "Ver props" → aparece tabla con columnas: Prop, Tipo, Default, Descripción
3. Click en "Ver props" de nuevo → tabla se oculta
4. En móvil (375px): la tabla debe tener scroll horizontal si el contenido es ancho

## Test de Tooltip (US3)

```tsx
import { Tooltip, Button } from '@bacsystem/ui'
import '@bacsystem/ui/styles.css'

<Tooltip content="Eliminar este registro" placement="top">
  <Button variant="danger" size="sm">Eliminar</Button>
</Tooltip>
```
- Hover sobre el botón → tooltip aparece encima
- Tab hasta el botón → tooltip aparece; blur → desaparece
- Escape con tooltip visible → cierra el tooltip
- `<Tooltip disabled>` → nunca aparece

## Test de Skeleton (US4)

```tsx
import { Skeleton } from '@bacsystem/ui'
import '@bacsystem/ui/styles.css'

// Línea de texto
<Skeleton variant="text" width="80%" height={16} />

// Imagen placeholder
<Skeleton variant="rect" width={200} height={120} />

// Avatar placeholder
<Skeleton variant="circle" width={48} height={48} />
```
- Debe mostrar animación shimmer continua en los tres casos
- En dark mode: los colores del shimmer se adaptan automáticamente

## Test de Select (US5)

```tsx
import { Select } from '@bacsystem/ui'
import '@bacsystem/ui/styles.css'
import { useState } from 'react'

const [pais, setPais] = useState('')

<Select
  label="País"
  placeholder="Seleccionar país"
  options={[
    { value: 'pe', label: 'Perú' },
    { value: 'mx', label: 'México' },
    { value: 'ar', label: 'Argentina' },
  ]}
  value={pais}
  onChange={setPais}
/>

// Con error
<Select
  label="Categoría"
  options={[{ value: 'a', label: 'Opción A' }]}
  error="Este campo es requerido"
/>

// Deshabilitado
<Select
  label="Tipo"
  options={[{ value: 'x', label: 'X' }]}
  disabled
/>
```

## Test de Breadcrumb (US6)

```tsx
import { Breadcrumb } from '@bacsystem/ui'
import '@bacsystem/ui/styles.css'

<Breadcrumb
  items={[
    { label: 'Inicio', href: '/' },
    { label: 'Ventas', href: '/ventas' },
    { label: 'Factura F-0042' },
  ]}
/>
```
- "Inicio" y "Ventas" son links; "Factura F-0042" es texto plano
- Inspeccionando el DOM: `<nav aria-label="Breadcrumb"><ol>...<li aria-current="page">Factura F-0042</li></ol></nav>`
- Con `separator=">"`: los ítems se separan con `>`

## Build final

```bash
# Desde la raíz del monorepo
npm run build
# → packages/ui/dist/ con 0 errores TypeScript
# → apps/demo/out/ listo para GitHub Pages
```
