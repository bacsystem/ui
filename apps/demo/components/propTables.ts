import type { PropRow } from './DemoSection'

export const buttonPropRows: readonly PropRow[] = [
  { prop: 'variant', type: "'primary' | 'secondary' | 'accent' | 'ghost' | 'danger' | 'success'", default: 'primary', description: 'Define el estilo visual base del botón.' },
  { prop: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: 'md', description: 'Controla padding y tamaño tipográfico.' },
  { prop: 'appearance', type: "'filled' | 'outline' | 'soft' | 'link'", default: 'filled', description: 'Cambia el tratamiento visual del variant seleccionado.' },
  { prop: 'outline', type: 'boolean', default: 'false', description: 'Compatibilidad retroactiva para usar appearance="outline".' },
  { prop: 'loading', type: 'boolean', default: 'false', description: 'Muestra spinner y deshabilita la interacción.' },
  { prop: 'iconLeft', type: 'LucideIcon', default: '—', description: 'Icono a la izquierda del contenido.' },
  { prop: 'iconRight', type: 'LucideIcon', default: '—', description: 'Icono a la derecha del contenido.' },
  { prop: 'className', type: 'string', default: '—', description: 'Clases CSS adicionales para el botón.' },
]

export const badgePropRows: readonly PropRow[] = [
  { prop: 'variant', type: "'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'", default: 'default', description: 'Selecciona la familia de color del badge.' },
  { prop: 'appearance', type: "'soft' | 'filled' | 'outline'", default: 'soft', description: 'Controla si el badge es suave, sólido o con borde.' },
  { prop: 'outline', type: 'boolean', default: 'false', description: 'Propiedad deprecada equivalente a appearance="outline".' },
  { prop: 'className', type: 'string', default: '—', description: 'Clases CSS adicionales.' },
]

export const inputPropRows: readonly PropRow[] = [
  { prop: 'label', type: 'string', default: '—', description: 'Texto visible asociado al campo.' },
  { prop: 'placeholder', type: 'string', default: '—', description: 'Texto mostrado cuando el campo está vacío.' },
  { prop: 'hint', type: 'string', default: '—', description: 'Mensaje auxiliar bajo el campo.' },
  { prop: 'error', type: 'string', default: '—', description: 'Mensaje de error y estado invalid.' },
  { prop: 'success', type: 'string', default: '—', description: 'Mensaje de éxito y estado visual positivo.' },
  { prop: 'inputSize', type: "'sm' | 'md' | 'lg'", default: 'md', description: 'Tamaño del input.' },
  { prop: 'iconLeft', type: 'LucideIcon', default: '—', description: 'Icono al lado izquierdo.' },
  { prop: 'iconRight', type: 'LucideIcon', default: '—', description: 'Icono al lado derecho cuando no hay estado.' },
  { prop: 'floating', type: 'boolean', default: 'false', description: 'Activa el label flotante.' },
  { prop: 'prefix', type: 'string', default: '—', description: 'Addon textual al inicio del campo.' },
  { prop: 'suffix', type: 'string', default: '—', description: 'Addon textual al final del campo.' },
  { prop: 'className', type: 'string', default: '—', description: 'Clases CSS adicionales.' },
]

export const cardPropRows: readonly PropRow[] = [
  { prop: 'variant', type: "'default' | 'elevated' | 'outlined' | 'tinted'", default: 'default', description: 'Variante visual de la card.' },
  { prop: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: 'Espaciado interno del contenedor.' },
  { prop: 'className', type: 'string', default: '—', description: 'Clases CSS adicionales.' },
]

export const alertPropRows: readonly PropRow[] = [
  { prop: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: 'info', description: 'Selecciona icono y colores del mensaje.' },
  { prop: 'appearance', type: "'soft' | 'filled' | 'outline'", default: 'soft', description: 'Tratamiento visual de la alerta.' },
  { prop: 'title', type: 'string', default: '—', description: 'Título opcional del bloque de alerta.' },
  { prop: 'onClose', type: '() => void', default: '—', description: 'Renderiza botón de cierre cuando se proporciona.' },
  { prop: 'closeAriaLabel', type: 'string', default: 'Close', description: 'Etiqueta accesible del botón de cierre.' },
  { prop: 'className', type: 'string', default: '—', description: 'Clases CSS adicionales.' },
]

export const avatarPropRows: readonly PropRow[] = [
  { prop: 'src', type: 'string', default: '—', description: 'URL de la imagen del avatar.' },
  { prop: 'alt', type: 'string', default: '—', description: 'Texto alternativo para accesibilidad.' },
  { prop: 'initials', type: 'string', default: '—', description: 'Iniciales cuando no hay imagen.' },
  { prop: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: 'md', description: 'Tamaño visual del avatar.' },
  { prop: 'appearance', type: "'soft' | 'filled' | 'outline'", default: 'soft', description: 'Estilo del contenedor del avatar.' },
  { prop: 'className', type: 'string', default: '—', description: 'Clases CSS adicionales.' },
]

export const togglePropRows: readonly PropRow[] = [
  { prop: 'checked', type: 'boolean', default: '—', description: 'Valor controlado del switch.' },
  { prop: 'defaultChecked', type: 'boolean', default: 'false', description: 'Estado inicial en modo no controlado.' },
  { prop: 'onChange', type: '(checked: boolean) => void', default: '—', description: 'Se invoca cuando cambia el valor.' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita interacción y foco.' },
  { prop: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: 'Tamaño del toggle.' },
  { prop: 'label', type: 'string', default: '—', description: 'Texto visible junto al switch.' },
  { prop: 'ariaLabel', type: 'string', default: '—', description: 'Etiqueta accesible cuando no hay label visible.' },
  { prop: 'aria-labelledby', type: 'string', default: '—', description: 'Referencia accesible a otro label existente.' },
  { prop: 'className', type: 'string', default: '—', description: 'Clases CSS adicionales.' },
]

export const modalPropRows: readonly PropRow[] = [
  { prop: 'open', type: 'boolean', default: '—', description: 'Controla la apertura del modal.' },
  { prop: 'onClose', type: '() => void', default: '—', description: 'Callback para cerrar el modal.' },
  { prop: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: 'Ancho máximo del diálogo.' },
  { prop: 'title', type: 'string', default: '—', description: 'Título visible y accesible del modal.' },
  { prop: 'closeLabel', type: 'string', default: 'Close modal', description: 'Etiqueta accesible del botón de cierre.' },
  { prop: 'className', type: 'string', default: '—', description: 'Clases CSS adicionales.' },
]

export const dataTablePropRows: readonly PropRow[] = [
  { prop: 'columns', type: 'DataTableColumn<T>[]', default: '—', description: 'Columnas configurables de la tabla.' },
  { prop: 'data', type: 'T[]', default: '—', description: 'Filas a renderizar.' },
  { prop: 'loading', type: 'boolean', default: 'false', description: 'Muestra estado de carga en toda la tabla.' },
  { prop: 'emptyText', type: 'string', default: 'No hay datos disponibles', description: 'Mensaje del estado vacío.' },
  { prop: 'getRowKey', type: '(row: T, index: number) => string | number', default: 'index', description: 'Genera una key estable por fila.' },
  { prop: 'className', type: 'string', default: '—', description: 'Clases CSS adicionales para el contenedor.' },
]

export const statCardPropRows: readonly PropRow[] = [
  { prop: 'title', type: 'string', default: '—', description: 'Título del KPI mostrado.' },
  { prop: 'value', type: 'string | number', default: '—', description: 'Valor principal de la tarjeta.' },
  { prop: 'description', type: 'string', default: '—', description: 'Texto secundario opcional.' },
  { prop: 'color', type: "'blue' | 'teal' | 'amber' | 'green' | 'purple'", default: 'blue', description: 'Paleta usada por la tarjeta.' },
  { prop: 'trend', type: "'up' | 'down' | 'neutral'", default: 'neutral', description: 'Dirección del indicador de tendencia.' },
  { prop: 'trendValue', type: 'string', default: '—', description: 'Valor textual de la tendencia.' },
  { prop: 'appearance', type: "'soft' | 'filled' | 'outline'", default: 'soft', description: 'Tratamiento visual del componente.' },
  { prop: 'className', type: 'string', default: '—', description: 'Clases CSS adicionales.' },
]

export const tabsPropRows: readonly PropRow[] = [
  { prop: 'items', type: 'TabItem[]', default: '—', description: 'Listado de tabs con contenido asociado.' },
  { prop: 'defaultTab', type: 'string', default: 'primer tab habilitado', description: 'Tab inicial en modo no controlado.' },
  { prop: 'activeTab', type: 'string', default: '—', description: 'Tab activo en modo controlado.' },
  { prop: 'onChange', type: '(tabId: string) => void', default: '—', description: 'Callback al cambiar de tab.' },
  { prop: 'className', type: 'string', default: '—', description: 'Clases CSS adicionales.' },
]

export const tooltipPropRows: readonly PropRow[] = [
  { prop: 'content', type: 'ReactNode', default: '—', description: 'Contenido visible dentro del tooltip.' },
  { prop: 'children', type: 'ReactElement', default: '—', description: 'Elemento disparador envuelto por el tooltip.' },
  { prop: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: 'top', description: 'Posición del globo respecto al trigger.' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva la visualización del tooltip.' },
  { prop: 'className', type: 'string', default: '—', description: 'Clases CSS adicionales en el wrapper.' },
]

export const skeletonPropRows: readonly PropRow[] = [
  { prop: 'variant', type: "'text' | 'circle' | 'rect'", default: 'rect', description: 'Forma del placeholder.' },
  { prop: 'width', type: 'string | number', default: '—', description: 'Ancho del skeleton.' },
  { prop: 'height', type: 'string | number', default: '—', description: 'Altura del skeleton.' },
  { prop: 'className', type: 'string', default: '—', description: 'Clases CSS adicionales.' },
]

export const selectPropRows: readonly PropRow[] = [
  { prop: 'options', type: 'SelectOption[]', default: '—', description: 'Opciones disponibles del select.' },
  { prop: 'label', type: 'string', default: '—', description: 'Label visible asociado al campo.' },
  { prop: 'placeholder', type: 'string', default: '—', description: 'Texto inicial cuando no hay valor seleccionado.' },
  { prop: 'hint', type: 'string', default: '—', description: 'Mensaje auxiliar bajo el campo.' },
  { prop: 'error', type: 'string', default: '—', description: 'Mensaje y estado de error.' },
  { prop: 'success', type: 'string', default: '—', description: 'Mensaje y estado de éxito.' },
  { prop: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita la interacción con el select.' },
  { prop: 'inputSize', type: "'sm' | 'md' | 'lg'", default: 'md', description: 'Tamaño del control.' },
  { prop: 'value', type: 'string', default: '—', description: 'Valor en modo controlado.' },
  { prop: 'defaultValue', type: 'string', default: '—', description: 'Valor inicial en modo no controlado.' },
  { prop: 'onChange', type: '(value: string) => void', default: '—', description: 'Callback al cambiar la opción.' },
  { prop: 'className', type: 'string', default: '—', description: 'Clases CSS adicionales.' },
]

export const breadcrumbPropRows: readonly PropRow[] = [
  { prop: 'items', type: 'BreadcrumbItem[]', default: '—', description: 'Ruta a renderizar en orden.' },
  { prop: 'separator', type: 'string', default: '/', description: 'Separador visual entre ítems.' },
  { prop: 'className', type: 'string', default: '—', description: 'Clases CSS adicionales.' },
]