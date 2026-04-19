'use client'

import { useEffect, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  DataTable,
  EmptyState,
  Header,
  Input,
  Label,
  Modal,
  ProgressBar,
  Select,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarNav,
  SidebarNavGroup,
  SidebarNavItem,
  Skeleton,
  Spinner,
  StatCard,
  Stepper,
  StepperStep,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  Toggle,
  Tooltip,
  useBreakpoint,
  useTheme,
} from '@bacsystem/ui'
import type { DataTableColumn } from '@bacsystem/ui'
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Boxes,
  CheckCircle2,
  Clock3,
  DatabaseZap,
  Download,
  FolderKanban,
  Image,
  Mail,
  Package,
  Pencil,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Sparkles,
  ShieldAlert,
  Tag,
  type LucideIcon,
} from 'lucide-react'

export const showcaseTransition = { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }

export const stackStyle: CSSProperties = { display: 'grid', gap: 'var(--sp-3)' }
export const rowStyle: CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)', alignItems: 'center' }
export const softPanelStyle: CSSProperties = {
  border: '1px solid rgba(203, 213, 225, 0.9)',
  borderRadius: '18px',
  padding: '14px',
  background: 'rgba(255,255,255,0.72)',
}
export const mutedCopyStyle: CSSProperties = { fontSize: 'var(--text-sm)', color: '#475569', lineHeight: 1.6 }
export const smallLabelStyle: CSSProperties = { fontSize: 'var(--text-xs)', color: '#64748b', fontFamily: 'var(--font-mono)' }

type CompactSize = 'sm' | 'md' | 'lg'
type SurfaceAppearance = 'soft' | 'filled' | 'outline'

interface MotionShowcaseShellProps {
  readonly title: string
  readonly description: string
  readonly controls: ReactNode
  readonly metrics?: readonly string[]
  readonly preview: ReactNode
  readonly statusValue: string
  readonly statusCopy: string
  readonly interactionLabel?: string
  readonly stageKey: string
  readonly stageStyle?: CSSProperties
  readonly ariaLabel?: string
}

export function MotionControlGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: Readonly<{
  label: string
  options: readonly T[]
  value: T
  onChange: (value: T) => void
}>) {
  return (
    <div className="demo-button-lab__control-group">
      <span className="demo-button-lab__control-title">{label}</span>
      <div className="demo-button-lab__chip-row">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`demo-button-lab__chip${value === option ? ' demo-button-lab__chip--active' : ''}`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export function MotionShowcaseShell({
  title,
  description,
  controls,
  metrics = [],
  preview,
  statusValue,
  statusCopy,
  interactionLabel,
  stageKey,
  stageStyle,
  ariaLabel,
}: Readonly<MotionShowcaseShellProps>) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="demo-button-lab">
      <div className="demo-button-lab__intro">
        <span className="demo-button-lab__eyebrow">Motion playground</span>
        <h3 className="demo-button-lab__title">{title}</h3>
        <p className="demo-button-lab__description">{description}</p>
      </div>

      <div className="demo-button-lab__layout">
        <div className="demo-button-lab__controls">{controls}</div>

        <section className="demo-button-lab__stage" style={stageStyle} aria-label={ariaLabel ?? `${title} motion playground`}>
          <motion.div
            className="demo-button-lab__glow"
            aria-hidden="true"
            animate={prefersReducedMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.28, 0.56, 0.28], x: [-10, 12, -10], y: [-6, 8, -6] }}
            transition={prefersReducedMotion ? undefined : { duration: 8, ease: 'easeInOut', repeat: Infinity }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={stageKey}
              className="demo-button-lab__stage-frame"
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 18, scale: 0.98 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -18, scale: 0.98 }}
              transition={showcaseTransition}
            >
              <div className="demo-button-lab__stage-copy">
                <span className="demo-button-lab__stage-kicker">Live composition</span>
                <h4 className="demo-button-lab__stage-title">{title}</h4>
                <p className="demo-button-lab__stage-text">{description}</p>
                {metrics.length > 0 && (
                  <div className="demo-button-lab__metrics">
                    {metrics.map((metric) => <span key={metric} className="demo-button-lab__metric">{metric}</span>)}
                  </div>
                )}
              </div>

              <div className="demo-button-lab__action-panel">
                {preview}
                <div className="demo-button-lab__status-card">
                  <span className="demo-button-lab__status-label">Composición activa</span>
                  <strong className="demo-button-lab__status-value">{statusValue}</strong>
                  <p className="demo-button-lab__status-copy">{statusCopy}</p>
                  {interactionLabel ? <p className="demo-button-lab__status-interaction">{interactionLabel}</p> : null}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </div>
  )
}

function BadgeShowcase() {
  const [variant, setVariant] = useState<'primary' | 'success' | 'warning' | 'danger' | 'info'>('primary')
  const [lane, setLane] = useState<'checkout' | 'shipping' | 'support'>('checkout')

  const laneCopy = {
    checkout: 'Estados rápidos para compras activas y promociones vivas.',
    shipping: 'Etiquetas compactas para logística, entregas y desvíos.',
    support: 'Semáforos claros para triage, riesgo y prioridad.',
  } as const

  return (
    <MotionShowcaseShell
      title="Badges vivos para leer estado en un golpe de vista"
      description="Mueve el tono visual del badge según el flujo y observa cómo sigue funcionando como una señal compacta dentro de una tarjeta editorial."
      controls={(
        <>
          <MotionControlGroup label="Flow" options={['checkout', 'shipping', 'support'] as const} value={lane} onChange={setLane} />
          <MotionControlGroup label="Variant" options={['primary', 'success', 'warning', 'danger', 'info'] as const} value={variant} onChange={setVariant} />
        </>
      )}
      metrics={[lane, variant, 'soft']}
      stageKey={`${lane}-${variant}`}
      statusValue={`${lane} · ${variant}`}
      statusCopy={laneCopy[lane]}
      preview={(
        <div style={stackStyle}>
          <div style={softPanelStyle}>
            <div style={rowStyle}>
              <Badge variant={variant}>Live now</Badge>
              <Badge variant="success">2 min</Badge>
              <Badge variant="info">Realtime</Badge>
            </div>
            <p style={{ ...mutedCopyStyle, marginTop: 12 }}>El badge principal resume el estado actual, mientras otros chips satélite sostienen contexto temporal y nivel de urgencia.</p>
          </div>
          <div style={rowStyle}>
            <Badge variant="primary">Ops</Badge>
            <Badge variant="warning">Queue</Badge>
            <Badge variant="danger">Escalated</Badge>
          </div>
        </div>
      )}
    />
  )
}

function InputShowcase() {
  const [mode, setMode] = useState<'hint' | 'success' | 'error'>('hint')
  const [field, setField] = useState<'email' | 'search'>('email')
  const inputLabel = field === 'email' ? 'Correo de seguimiento' : 'Buscar producto'
  let stateCopy = 'Modo exploración: se favorece la guía.'

  if (mode === 'success') {
    stateCopy = 'Modo confirmación: el sistema responde con seguridad.'
  } else if (mode === 'error') {
    stateCopy = 'Modo corrección: la interfaz empuja a reparar el dato.'
  }

  return (
    <MotionShowcaseShell
      title="Inputs que mutan con el contexto"
      description="Prueba un campo enfocado a búsqueda o captura y alterna el estado de validación para ver cómo cambia la percepción de la tarea."
      controls={(
        <>
          <MotionControlGroup label="Field" options={['email', 'search'] as const} value={field} onChange={setField} />
          <MotionControlGroup label="State" options={['hint', 'success', 'error'] as const} value={mode} onChange={setMode} />
        </>
      )}
      metrics={[field, mode, 'live copy']}
      stageKey={`${field}-${mode}`}
      statusValue={`${inputLabel} · ${mode}`}
      statusCopy="El mismo input puede sentirse exploratorio, validado o bloqueado según el tono del mensaje que lo acompaña."
      preview={(
        <div style={stackStyle}>
          <Label htmlFor="motion-input">{inputLabel}</Label>
          <Input
            key={`${field}-${mode}`}
            id="motion-input"
            placeholder={field === 'email' ? 'ops@bacsystem.com' : 'SKU, cliente o pedido'}
            defaultValue={field === 'email' ? 'ops@bacsystem.com' : 'Laptop Ultrafino'}
            hint={mode === 'hint' ? 'Pulsa Enter para continuar el flujo.' : undefined}
            success={mode === 'success' ? 'Valor confirmado y listo para sincronizar.' : undefined}
            error={mode === 'error' ? 'No encontramos coincidencias con ese valor.' : undefined}
            iconLeft={field === 'search' ? Search : undefined}
          />
          <p style={mutedCopyStyle}>{stateCopy}</p>
        </div>
      )}
    />
  )
}

function LabelShowcase() {
  const [required, setRequired] = useState<'optional' | 'required'>('required')
  const [entity, setEntity] = useState<'sku' | 'owner'>('sku')

  return (
    <MotionShowcaseShell
      title="Labels que enmarcan el contexto del campo"
      description="La etiqueta también puede vender intención: cambia el tipo de dato y la obligatoriedad para ajustar el tono del formulario."
      controls={(
        <>
          <MotionControlGroup label="Entity" options={['sku', 'owner'] as const} value={entity} onChange={setEntity} />
          <MotionControlGroup label="Required" options={['optional', 'required'] as const} value={required} onChange={setRequired} />
        </>
      )}
      metrics={[entity, required, 'accessible']}
      stageKey={`${entity}-${required}`}
      statusValue={`${entity} · ${required}`}
      statusCopy="El label no solo nombra el campo: también negocia prioridad, precisión y urgencia." 
      preview={(
        <div style={stackStyle}>
          <Label htmlFor="motion-label" required={required === 'required'}>{entity === 'sku' ? 'SKU maestro' : 'Responsable de cuenta'}</Label>
          <Input id="motion-label" defaultValue={entity === 'sku' ? 'SKU-LIVE-2048' : 'María Fernández'} />
          <p style={smallLabelStyle}>El asterisco de requerido cambia la expectativa antes de escribir una sola tecla.</p>
        </div>
      )}
    />
  )
}

function SpinnerShowcase() {
  const [size, setSize] = useState<CompactSize>('md')
  const [surface, setSurface] = useState<'button' | 'panel'>('button')

  return (
    <MotionShowcaseShell
      title="Cargas que mantienen el ritmo visual"
      description="Alterna entre un contexto de acción y una espera más atmosférica para ver cómo el spinner sostiene atención sin bloquear la lectura."
      controls={(
        <>
          <MotionControlGroup label="Surface" options={['button', 'panel'] as const} value={surface} onChange={setSurface} />
          <MotionControlGroup label="Size" options={['sm', 'md', 'lg'] as const} value={size} onChange={setSize} />
        </>
      )}
      metrics={[surface, size, 'loading']}
      stageKey={`${surface}-${size}`}
      statusValue={`${surface} · ${size}`}
      statusCopy="La carga puede sentirse operativa o premium según el contenedor donde vive." 
      preview={surface === 'button' ? (
        <div style={stackStyle}>
          <Button loading size={size}>Publicando cambios</Button>
          <p style={mutedCopyStyle}>Ideal para acciones donde el usuario espera continuidad inmediata.</p>
        </div>
      ) : (
        <div style={{ ...softPanelStyle, ...stackStyle }}>
          <div style={{ ...rowStyle, justifyContent: 'space-between' }}>
            <span style={smallLabelStyle}>Sincronizando catálogo</span>
            <Spinner size={size} />
          </div>
          <ProgressBar value={72} label="Sync progress" showLabel />
        </div>
      )}
    />
  )
}

function ProgressBarShowcase() {
  const [progress, setProgress] = useState<'18' | '56' | '92'>('56')
  const [label, setLabel] = useState<'staging' | 'publish'>('staging')

  const progressValue = Number(progress)

  return (
    <MotionShowcaseShell
      title="Barras de progreso que cuentan dónde va el flujo"
      description="Prueba distintos hitos del proceso y cambia el contexto para ver cómo el mensaje de apoyo modifica la lectura del avance."
      controls={(
        <>
          <MotionControlGroup label="Context" options={['staging', 'publish'] as const} value={label} onChange={setLabel} />
          <MotionControlGroup label="Value" options={['18', '56', '92'] as const} value={progress} onChange={setProgress} />
        </>
      )}
      metrics={[`${progressValue}%`, label, progressValue < 50 ? 'early' : 'late']}
      stageKey={`${label}-${progress}`}
      statusValue={`${progressValue}% · ${label}`}
      statusCopy="Una barra con narrativa clara reduce ansiedad y hace que la espera se perciba más corta." 
      preview={(
        <div style={stackStyle}>
          <ProgressBar value={progressValue} label={label === 'staging' ? 'Preparando staging' : 'Publicando release'} showLabel />
          <p style={mutedCopyStyle}>{progressValue < 50 ? 'El sistema aún está ensamblando contexto antes del tramo final.' : 'El usuario ya percibe cercanía al resultado y tolera mejor la espera.'}</p>
        </div>
      )}
    />
  )
}

function CardShowcase() {
  const [variant, setVariant] = useState<'default' | 'elevated' | 'outlined' | 'tinted'>('elevated')
  const [size, setSize] = useState<CompactSize>('md')

  return (
    <MotionShowcaseShell
      title="Cards para vender una historia, no solo un contenedor"
      description="Ajusta la superficie y la escala para comparar cómo cambia la jerarquía percibida de una tarjeta informativa dentro de un dashboard."
      controls={(
        <>
          <MotionControlGroup label="Variant" options={['default', 'elevated', 'outlined', 'tinted'] as const} value={variant} onChange={setVariant} />
          <MotionControlGroup label="Size" options={['sm', 'md', 'lg'] as const} value={size} onChange={setSize} />
        </>
      )}
      metrics={[variant, size, 'surface']}
      stageKey={`${variant}-${size}`}
      statusValue={`${variant} · ${size}`}
      statusCopy="La card cambia cuánto pesa visualmente un bloque incluso antes de leer su contenido." 
      preview={(
        <Card variant={variant} size={size} style={{ minWidth: 0 } as CSSProperties}>
          <div style={stackStyle}>
            <span style={smallLabelStyle}>Revenue capsule</span>
            <strong style={{ fontSize: '1.6rem', color: '#0f172a' }}>S/ 84,200</strong>
            <p style={mutedCopyStyle}>Resumen semanal de ingresos con contexto listo para una vista ejecutiva.</p>
            <div style={rowStyle}>
              <Badge variant="success">+14%</Badge>
              <Badge variant="info">7 días</Badge>
            </div>
          </div>
        </Card>
      )}
    />
  )
}

function AlertShowcase() {
  const [variant, setVariant] = useState<'info' | 'success' | 'warning' | 'error'>('info')
  const [appearance, setAppearance] = useState<SurfaceAppearance>('soft')
  const [visible, setVisible] = useState(true)

  return (
    <MotionShowcaseShell
      title="Alerts que pueden subir o bajar la tensión del mensaje"
      description="Controla severidad, tratamiento visual y visibilidad para ver cómo la misma alerta escala desde una nota suave hasta una señal fuerte."
      controls={(
        <>
          <MotionControlGroup label="Variant" options={['info', 'success', 'warning', 'error'] as const} value={variant} onChange={(value) => { setVariant(value); setVisible(true) }} />
          <MotionControlGroup label="Appearance" options={['soft', 'filled', 'outline'] as const} value={appearance} onChange={(value) => { setAppearance(value); setVisible(true) }} />
        </>
      )}
      metrics={[variant, appearance, visible ? 'visible' : 'dismissed']}
      stageKey={`${variant}-${appearance}-${visible}`}
      statusValue={`${variant} · ${appearance}`}
      statusCopy="El mismo contenido puede acompañar, advertir o interrumpir según la intensidad del contenedor." 
      interactionLabel={visible ? 'Puedes cerrarla para probar el retorno del estado.' : 'La alerta se retiró; usa Restaurar para traerla de vuelta.'}
      preview={(
        <div style={stackStyle}>
          <AnimatePresence mode="wait">
            {visible ? (
              <motion.div key="visible" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={showcaseTransition}>
                <Alert variant={variant} appearance={appearance === 'soft' ? undefined : appearance} title={`Signal ${variant}`} onClose={() => setVisible(false)}>
                  Esta alerta guía un flujo vivo sin perder jerarquía editorial.
                </Alert>
              </motion.div>
            ) : (
              <motion.div key="restore" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Button variant="secondary" onClick={() => setVisible(true)}>Restaurar señal</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    />
  )
}

function AvatarShowcase() {
  const [appearance, setAppearance] = useState<SurfaceAppearance>('soft')
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg')

  return (
    <MotionShowcaseShell
      title="Avatares que ordenan presencia en espacios compactos"
      description="La mezcla de escala y tratamiento visual modifica si el avatar actúa como firma sutil o como identidad dominante dentro del layout."
      controls={(
        <>
          <MotionControlGroup label="Appearance" options={['soft', 'filled', 'outline'] as const} value={appearance} onChange={setAppearance} />
          <MotionControlGroup label="Size" options={['sm', 'md', 'lg', 'xl'] as const} value={size} onChange={setSize} />
        </>
      )}
      metrics={[appearance, size, 'presence']}
      stageKey={`${appearance}-${size}`}
      statusValue={`${appearance} · ${size}`}
      statusCopy="Útil para ownership, equipos y puntos de contacto donde la identidad debe respirar sin competir con todo el contenido." 
      preview={(
        <div style={stackStyle}>
          <div style={rowStyle}>
            <Avatar initials="ML" size={size} appearance={appearance === 'soft' ? undefined : appearance} />
            <Avatar initials="CF" size="md" appearance={appearance === 'soft' ? undefined : appearance} />
            <Avatar size="md" appearance={appearance === 'soft' ? undefined : appearance} />
          </div>
          <p style={mutedCopyStyle}>Equipo en vivo: diseño, operaciones y soporte coordinados desde una sola superficie.</p>
        </div>
      )}
    />
  )
}

function ToggleShowcase() {
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [enabled, setEnabled] = useState(true)

  return (
    <MotionShowcaseShell
      title="Toggles para permisos y activaciones rápidas"
      description="Alterna el switch principal y cambia su tamaño para ver cómo se comporta en un panel donde varias decisiones deben leerse de inmediato."
      controls={(
        <>
          <MotionControlGroup label="Size" options={['sm', 'md', 'lg'] as const} value={size} onChange={setSize} />
          <MotionControlGroup label="State" options={['on', 'off'] as const} value={enabled ? 'on' : 'off'} onChange={(value) => setEnabled(value === 'on')} />
        </>
      )}
      metrics={[size, enabled ? 'enabled' : 'disabled', 'workflow']}
      stageKey={`${size}-${enabled}`}
      statusValue={`${size} · ${enabled ? 'on' : 'off'}`}
      statusCopy="Perfecto para features de cuenta, banderas de automatización y preferencias críticas." 
      preview={(
        <div style={stackStyle}>
          <Toggle size={size} label="Sincronización automática" checked={enabled} onChange={setEnabled} />
          <Toggle size="sm" label="Notificar al equipo" defaultChecked={enabled} />
        </div>
      )}
    />
  )
}

function ModalShowcase() {
  const [open, setOpen] = useState(false)
  const [size, setSize] = useState<CompactSize>('md')

  return (
    <MotionShowcaseShell
      title="Modales para decisiones de foco alto"
      description="Abre una vista corta de confirmación y cambia el tamaño para comparar cómo se siente la interrupción en un flujo productivo."
      controls={(
        <MotionControlGroup label="Size" options={['sm', 'md', 'lg'] as const} value={size} onChange={setSize} />
      )}
      metrics={[size, open ? 'open' : 'closed', 'overlay']}
      stageKey={`${size}-${open}`}
      statusValue={`${size} · ${open ? 'open' : 'closed'}`}
      statusCopy="La diferencia entre una confirmación ligera y una revisión profunda muchas veces es solo el tamaño del modal." 
      interactionLabel={open ? 'Overlay visible: decide, confirma o descarta.' : 'Pulsa Quick view para abrir la superficie de foco.'}
      preview={(
        <div style={stackStyle}>
          <Button onClick={() => setOpen(true)}>Quick view</Button>
          <Modal open={open} onClose={() => setOpen(false)} title="Resumen rápido" size={size}>
            <p style={mutedCopyStyle}>Este modal vive dentro del playground y ayuda a contrastar densidad visual y jerarquía de acciones.</p>
            <div style={{ ...rowStyle, justifyContent: 'flex-end', marginTop: 16 }}>
              <Button variant="secondary" onClick={() => setOpen(false)}>Descartar</Button>
              <Button onClick={() => setOpen(false)}>Aplicar</Button>
            </div>
          </Modal>
        </div>
      )}
    />
  )
}

interface LiveOrderRow {
  order: string
  owner: string
  health: 'green' | 'amber'
}

const liveOrderColumns: DataTableColumn<LiveOrderRow>[] = [
  { key: 'order', header: 'Order' },
  { key: 'owner', header: 'Owner' },
  { key: 'health', header: 'Health', render: (row) => <Badge variant={row.health === 'green' ? 'success' : 'warning'}>{row.health === 'green' ? 'Healthy' : 'Review'}</Badge> },
]

const liveOrderRows: LiveOrderRow[] = [
  { order: 'OPS-204', owner: 'Lucía', health: 'green' },
  { order: 'OPS-205', owner: 'Mateo', health: 'amber' },
]

function DataTableShowcase() {
  const [state, setState] = useState<'live' | 'loading' | 'empty'>('live')

  return (
    <MotionShowcaseShell
      title="Tablas vivas para switching de estado instantáneo"
      description="Cambia entre datos, espera y vacío para revisar cómo el componente sostiene el layout sin romper el ritmo del dashboard."
      controls={(
        <MotionControlGroup label="State" options={['live', 'loading', 'empty'] as const} value={state} onChange={setState} />
      )}
      metrics={[state, '2 cols', 'ops']}
      stageKey={state}
      statusValue={`datatable · ${state}`}
      statusCopy="Un buen estado vacío o loading conserva estructura y evita saltos visuales agresivos." 
      preview={(
        <DataTable
          columns={liveOrderColumns}
          data={state === 'live' ? liveOrderRows : []}
          loading={state === 'loading'}
          emptyText="No live orders"
          getRowKey={(row) => row.order}
        />
      )}
    />
  )
}

function TableShowcase() {
  const [dataset, setDataset] = useState<'inventory' | 'sla'>('inventory')
  const rows = dataset === 'inventory'
    ? [
        ['SKU-07', 'Kits premium', '84'],
        ['SKU-11', 'Audífonos', '23'],
      ]
    : [
        ['Respuesta inicial', '< 5 min', 'Cumple'],
        ['Resolución crítica', '< 60 min', 'Atención'],
      ]

  return (
    <MotionShowcaseShell
      title="Primitivas de tabla para layouts controlados"
      description="Alterna entre datasets compactos y valida cómo las primitivas mantienen consistencia cuando el contenido cambia por completo."
      controls={(
        <MotionControlGroup label="Dataset" options={['inventory', 'sla'] as const} value={dataset} onChange={setDataset} />
      )}
      metrics={[dataset, 'static rows', 'primitives']}
      stageKey={dataset}
      statusValue={`table · ${dataset}`}
      statusCopy="Cuando no necesitas sorting o estados complejos, las primitivas mantienen control fino sobre el layout." 
      preview={(
        <Table>
          <TableCaption>{dataset === 'inventory' ? 'Inventario priorizado' : 'Objetivos de servicio'}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{dataset === 'inventory' ? 'SKU' : 'Métrica'}</TableHead>
              <TableHead>{dataset === 'inventory' ? 'Producto' : 'Objetivo'}</TableHead>
              <TableHead>{dataset === 'inventory' ? 'Stock' : 'Estado'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row[0]}>
                <TableCell>{row[0]}</TableCell>
                <TableCell>{row[1]}</TableCell>
                <TableCell>{row[2]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Visible</TableCell>
              <TableCell>{rows.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    />
  )
}

function EmptyStateShowcase() {
  const [scenario, setScenario] = useState<'orders' | 'search' | 'sync'>('orders')

  const scenarioMap = {
    orders: {
      title: 'No hay pedidos activos',
      description: 'Conecta una tienda o crea una orden manual para iniciar actividad.',
      actionA: 'Crear pedido',
      actionB: 'Conectar canal',
    },
    search: {
      title: 'No encontramos resultados',
      description: 'Prueba ajustar filtros o cambiar la palabra clave para ampliar la búsqueda.',
      actionA: 'Limpiar filtros',
      actionB: 'Guardar búsqueda',
    },
    sync: {
      title: 'Todavía no hay sincronización',
      description: 'Activa una primera importación para poblar este dashboard operativo.',
      actionA: 'Iniciar sync',
      actionB: 'Leer guía',
    },
  } as const

  const current = scenarioMap[scenario]

  return (
    <MotionShowcaseShell
      title="Estados vacíos con intención clara"
      description="Cambia el escenario y compara cómo el mismo patrón pasa de explicar una ausencia a proponer la siguiente acción."
      controls={(
        <MotionControlGroup label="Scenario" options={['orders', 'search', 'sync'] as const} value={scenario} onChange={setScenario} />
      )}
      metrics={[scenario, 'empty', 'cta']}
      stageKey={scenario}
      statusValue={`empty state · ${scenario}`}
      statusCopy="Los mejores estados vacíos combinan calma visual con un siguiente paso inequívoco." 
      preview={(
        <EmptyState
          title={current.title}
          description={current.description}
          icon={DatabaseZap}
          actions={(
            <>
              <Button>{current.actionA}</Button>
              <Button variant="secondary">{current.actionB}</Button>
            </>
          )}
        />
      )}
    />
  )
}

function StatCardShowcase() {
  const [appearance, setAppearance] = useState<SurfaceAppearance>('soft')
  const [color, setColor] = useState<'blue' | 'teal' | 'amber' | 'green' | 'purple'>('blue')

  return (
    <MotionShowcaseShell
      title="KPIs que cambian de tono sin perder legibilidad"
      description="Explora una stat card protagonista y compara cómo el color y la apariencia influyen en la energía de la métrica."
      controls={(
        <>
          <MotionControlGroup label="Appearance" options={['soft', 'filled', 'outline'] as const} value={appearance} onChange={setAppearance} />
          <MotionControlGroup label="Color" options={['blue', 'teal', 'amber', 'green', 'purple'] as const} value={color} onChange={setColor} />
        </>
      )}
      metrics={[appearance, color, 'kpi']}
      stageKey={`${appearance}-${color}`}
      statusValue={`${color} · ${appearance}`}
      statusCopy="Una misma métrica puede sentirse táctica o celebratoria según la envolvente cromática." 
      preview={(
        <div style={{ ...rowStyle, alignItems: 'stretch' }}>
          <StatCard title="NPS live" value="71" trend="up" trendValue="+4pts" color={color} appearance={appearance === 'soft' ? undefined : appearance} />
          <StatCard title="Tickets abiertos" value="18" trend="down" trendValue="-6" color="amber" />
        </div>
      )}
    />
  )
}

function StepperShowcase() {
  const [step, setStep] = useState<'1' | '2' | '3'>('2')
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal')
  const currentStep = Number(step)
  const firstStatus = currentStep > 1 ? 'completed' : 'current'
  let secondStatus: 'completed' | 'current' | 'pending' = 'pending'

  if (currentStep > 2) {
    secondStatus = 'completed'
  } else if (currentStep === 2) {
    secondStatus = 'current'
  }

  const thirdStatus = currentStep === 3 ? 'current' : 'pending'

  return (
    <MotionShowcaseShell
      title="Steppers para narrar progreso operativo"
      description="Mueve el paso activo y rota la orientación para ver cómo el mismo flujo se adapta a paneles anchos o módulos estrechos."
      controls={(
        <>
          <MotionControlGroup label="Step" options={['1', '2', '3'] as const} value={step} onChange={setStep} />
          <MotionControlGroup label="Orientation" options={['horizontal', 'vertical'] as const} value={orientation} onChange={setOrientation} />
        </>
      )}
      metrics={[`step ${step}`, orientation, 'journey']}
      stageKey={`${step}-${orientation}`}
      statusValue={`step ${step} · ${orientation}`}
      statusCopy="Muy útil para onboarding, publicación y setups donde el usuario necesita sentido de avance y contexto restante." 
      preview={(
        <Stepper orientation={orientation}>
          <StepperStep status={firstStatus} label="Brief" description="Contexto base" />
          <StepperStep status={secondStatus} label="Assets" description="Visuales y copy" />
          <StepperStep status={thirdStatus} label="Launch" description="Go live" />
        </Stepper>
      )}
    />
  )
}

function TabsShowcase() {
  const [setName, setSetName] = useState<'commerce' | 'studio'>('commerce')

  const items = setName === 'commerce'
    ? [
        { id: 'overview', label: 'Overview', icon: Package, content: <p style={mutedCopyStyle}>Resumen de revenue, órdenes y salud del pipeline.</p> },
        { id: 'pricing', label: 'Pricing', icon: Tag, content: <p style={mutedCopyStyle}>Promociones, bundles y margen del catálogo en vivo.</p> },
        { id: 'history', label: 'History', icon: Clock3, content: <p style={mutedCopyStyle}>Bitácora de cambios publicada por el equipo comercial.</p> },
      ]
    : [
        { id: 'assets', label: 'Assets', icon: Image, content: <p style={mutedCopyStyle}>Revisión de visuales, tamaños y piezas pendientes.</p> },
        { id: 'copy', label: 'Copy', icon: Pencil, content: <p style={mutedCopyStyle}>Mensajes, claims y tono editorial por bloque.</p> },
        { id: 'publish', label: 'Publish', icon: Sparkles, content: <p style={mutedCopyStyle}>Checklist de salida y distribución multi-canal.</p> },
      ]

  return (
    <MotionShowcaseShell
      title="Tabs que reorganizan un workspace sin rehacer la página"
      description="Alterna entre dos familias de tabs y compara cómo el componente puede pasar de panel operativo a estudio editorial."
      controls={(
        <MotionControlGroup label="Preset" options={['commerce', 'studio'] as const} value={setName} onChange={setSetName} />
      )}
      metrics={[setName, '3 tabs', 'workspace']}
      stageKey={setName}
      statusValue={`tabs · ${setName}`}
      statusCopy="El contenedor de tabs funciona mejor cuando cada grupo tiene una identidad clara y una carga cognitiva acotada." 
      preview={<Tabs key={setName} defaultTab={items[0]?.id} items={items} />}
    />
  )
}

function HeaderShowcase() {
  const [mode, setMode] = useState<'inventory' | 'campaigns' | 'support'>('inventory')
  const config = {
    inventory: { title: 'Inventario live', subtitle: 'Stock, alertas y rotación en un solo frente.', primary: 'Nuevo SKU' },
    campaigns: { title: 'Campañas activas', subtitle: 'Performance, presupuesto y creatividades en vuelo.', primary: 'Crear campaña' },
    support: { title: 'Mesa de ayuda', subtitle: 'Incidentes, SLA y escalaciones con foco inmediato.', primary: 'Nuevo ticket' },
  } as const
  const current = config[mode]

  return (
    <MotionShowcaseShell
      title="Headers que marcan tono de página y próximo paso"
      description="Cambia el contexto operativo y observa cómo el encabezado ajusta mensaje y jerarquía de acciones sin perder limpieza."
      controls={(
        <MotionControlGroup label="Context" options={['inventory', 'campaigns', 'support'] as const} value={mode} onChange={setMode} />
      )}
      metrics={[mode, 'page shell', 'actions']}
      stageKey={mode}
      statusValue={`header · ${mode}`}
      statusCopy="Buen header: contexto en una línea, dirección en la siguiente y CTA sin ruido." 
      preview={(
        <Header
          title={current.title}
          subtitle={current.subtitle}
          actions={(
            <>
              <Button variant="secondary" iconLeft={Download}>Exportar</Button>
              <Button iconLeft={Plus}>{current.primary}</Button>
            </>
          )}
        />
      )}
    />
  )
}

function SidebarShowcase() {
  const [active, setActive] = useState<'overview' | 'products' | 'settings'>('overview')

  return (
    <MotionShowcaseShell
      title="Sidebars que respiran como un mini workspace"
      description="Prueba distintos items activos para ver cómo cambia el peso del módulo sin necesitar toda una aplicación alrededor."
      controls={(
        <MotionControlGroup label="Active" options={['overview', 'products', 'settings'] as const} value={active} onChange={setActive} />
      )}
      metrics={[active, 'nav shell', 'ops']}
      stageKey={active}
      statusValue={`sidebar · ${active}`}
      statusCopy="El estado activo debe ser inequívoco incluso cuando el sidebar vive aislado dentro de una vitrina." 
      preview={(
        <div style={{ maxWidth: 320, borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(203,213,225,0.9)' }}>
          <Sidebar style={{ minHeight: 320 }}>
            <SidebarHeader>
              <div>
                <strong>Commerce Ops</strong>
                <p style={{ ...smallLabelStyle, marginTop: 4 }}>Workspace live</p>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarNav>
                <SidebarNavItem href="#overview" icon={BarChart3} active={active === 'overview'}>Overview</SidebarNavItem>
                <SidebarNavGroup label="Catálogo" icon={FolderKanban}>
                  <SidebarNavItem href="#products" icon={Boxes} active={active === 'products'}>Productos</SidebarNavItem>
                  <SidebarNavItem href="#orders" icon={ShoppingCart}>Pedidos</SidebarNavItem>
                </SidebarNavGroup>
                <SidebarNavItem href="#settings" icon={Settings} active={active === 'settings'}>Configuración</SidebarNavItem>
              </SidebarNav>
            </SidebarContent>
            <SidebarFooter>
              <span style={smallLabelStyle}>Sync hace 2 min</span>
            </SidebarFooter>
          </Sidebar>
        </div>
      )}
    />
  )
}

function TooltipShowcase() {
  const [placement, setPlacement] = useState<'top' | 'right' | 'bottom' | 'left'>('top')
  const [disabled, setDisabled] = useState<'off' | 'on'>('off')

  return (
    <MotionShowcaseShell
      title="Tooltips ligeros para contexto instantáneo"
      description="Ajusta placement y desactivación para revisar cómo el tooltip se comporta como una ayuda mínima, nunca invasiva."
      controls={(
        <>
          <MotionControlGroup label="Placement" options={['top', 'right', 'bottom', 'left'] as const} value={placement} onChange={setPlacement} />
          <MotionControlGroup label="Disabled" options={['off', 'on'] as const} value={disabled} onChange={setDisabled} />
        </>
      )}
      metrics={[placement, disabled === 'on' ? 'disabled' : 'enabled', 'hint']}
      stageKey={`${placement}-${disabled}`}
      statusValue={`${placement} · ${disabled === 'on' ? 'disabled' : 'enabled'}`}
      statusCopy="Ideal para aclaraciones breves en acciones densas sin llenar el layout de texto secundario." 
      preview={(
        <Tooltip content="Este CTA sincroniza catálogo y precios" placement={placement} disabled={disabled === 'on'}>
          <Button variant="secondary">Sync catalog</Button>
        </Tooltip>
      )}
    />
  )
}

function SkeletonShowcase() {
  const [loading, setLoading] = useState<'loading' | 'ready'>('loading')

  return (
    <MotionShowcaseShell
      title="Skeletons para esperar sin romper la composición"
      description="Conmuta entre placeholder y contenido real para validar que el layout conserve su ritmo en ambos estados."
      controls={(
        <MotionControlGroup label="Mode" options={['loading', 'ready'] as const} value={loading} onChange={setLoading} />
      )}
      metrics={[loading, 'shimmer', 'layout safe']}
      stageKey={loading}
      statusValue={`skeleton · ${loading}`}
      statusCopy="Un buen placeholder preserva la masa visual y reduce la sensación de salto cuando llega el contenido real." 
      preview={loading === 'loading' ? (
        <div style={stackStyle}>
          <Skeleton variant="text" width="72%" height={18} />
          <Skeleton variant="text" width="48%" height={18} />
          <div style={{ ...rowStyle, alignItems: 'center' }}>
            <Skeleton variant="circle" width={44} height={44} />
            <Skeleton variant="rect" width="100%" height={72} />
          </div>
        </div>
      ) : (
        <div style={stackStyle}>
          <strong style={{ fontSize: '1.1rem', color: '#0f172a' }}>Informe listo</strong>
          <p style={mutedCopyStyle}>El tablero ya cargó ventas, equipo asignado y próximos hitos.</p>
          <div style={rowStyle}><Badge variant="success">Ready</Badge><Badge variant="info">Live</Badge></div>
        </div>
      )}
    />
  )
}

function SelectShowcase() {
  const [mode, setMode] = useState<'hint' | 'success' | 'error'>('hint')
  const [value, setValue] = useState('ops')

  return (
    <MotionShowcaseShell
      title="Selects que cambian de tono según decisión y validación"
      description="Selecciona un destino y alterna el estado para comprobar cómo el mensaje contextual cambia la seguridad del formulario."
      controls={(
        <MotionControlGroup label="State" options={['hint', 'success', 'error'] as const} value={mode} onChange={setMode} />
      )}
      metrics={[mode, value, 'native']}
      stageKey={`${mode}-${value}`}
      statusValue={`${value} · ${mode}`}
      statusCopy="El select gana muchísimo cuando el copy de apoyo explica qué implica la elección actual." 
      preview={(
        <Select
          label="Destino del flujo"
          options={[
            { value: 'ops', label: 'Operations' },
            { value: 'sales', label: 'Sales desk' },
            { value: 'support', label: 'Support queue' },
          ]}
          value={value}
          onChange={setValue}
          hint={mode === 'hint' ? 'Escoge el equipo que recibirá la siguiente acción.' : undefined}
          success={mode === 'success' ? 'Destino validado y listo para automatizar.' : undefined}
          error={mode === 'error' ? 'Selecciona un destino antes de continuar.' : undefined}
        />
      )}
    />
  )
}

function BreadcrumbShowcase() {
  const [separator, setSeparator] = useState<'/' | '›' | '→'>('›')
  const [depth, setDepth] = useState<'3' | '4'>('4')

  const items = depth === '3'
    ? [
        { label: 'Inicio', href: '#' },
        { label: 'Campañas', href: '#' },
        { label: 'Performance' },
      ]
    : [
        { label: 'Inicio', href: '#' },
        { label: 'Ventas', href: '#' },
        { label: 'Clientes', href: '#' },
        { label: 'Cuenta premium' },
      ]

  return (
    <MotionShowcaseShell
      title="Breadcrumbs para orientar sin saturar la parte alta"
      description="Juega con profundidad y separador para revisar cómo la navegación secundaria puede ser útil sin robar protagonismo."
      controls={(
        <>
          <MotionControlGroup label="Separator" options={['/', '›', '→'] as const} value={separator} onChange={setSeparator} />
          <MotionControlGroup label="Depth" options={['3', '4'] as const} value={depth} onChange={setDepth} />
        </>
      )}
      metrics={[separator, `${depth} levels`, 'nav context']}
      stageKey={`${separator}-${depth}`}
      statusValue={`${depth} niveles · ${separator}`}
      statusCopy="Cuando el breadcrumb es claro, la página necesita menos texto explicativo para decir dónde está el usuario." 
      preview={<Breadcrumb items={items} separator={separator} />}
    />
  )
}

const tokenPaletteSets = {
  primary: ['#EFF6FF', '#DBEAFE', '#93C5FD', '#3B82F6', '#1D4ED8'],
  accent: ['#FEF3C7', '#FBBF24', '#F59E0B', '#D97706'],
  semantic: ['#D1FAE5', '#10B981', '#FEF3C7', '#F59E0B', '#FEE2E2', '#EF4444'],
} as const

function TokenSwatch({ color, label }: Readonly<{ color: string, label: string }>) {
  return (
    <div style={{ display: 'grid', gap: 6, justifyItems: 'center' }}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: color, border: '1px solid rgba(203,213,225,0.9)' }} />
      <span style={smallLabelStyle}>{label}</span>
    </div>
  )
}

function ColorsTokenShowcase() {
  const [palette, setPalette] = useState<keyof typeof tokenPaletteSets>('primary')
  const colors = tokenPaletteSets[palette]

  return (
    <MotionShowcaseShell
      title="Color tokens como material de composición"
      description="Cambia la familia cromática para ver cómo un mismo set de tokens puede sentirse editorial, utilitario o semántico dentro del sistema."
      controls={<MotionControlGroup label="Palette" options={['primary', 'accent', 'semantic'] as const} value={palette} onChange={setPalette} />}
      metrics={[palette, `${colors.length} swatches`, 'tokens']}
      stageKey={palette}
      statusValue={`colors · ${palette}`}
      statusCopy="Los tokens de color funcionan mejor cuando muestran jerarquía, no solo variedad." 
      ariaLabel="Colors motion playground"
      preview={<div style={{ ...rowStyle, gap: 'var(--sp-4)' }}>{colors.map((color, index) => <TokenSwatch key={`${color}-${index}`} color={color} label={`${palette}-${index + 1}`} />)}</div>}
    />
  )
}

function TypographyTokenShowcase() {
  const [mode, setMode] = useState<'display' | 'body' | 'mono'>('display')
  const config = {
    display: { family: 'var(--font-display)', title: 'Headline editorial', copy: 'Tipografía para bloques con intención visual alta.' },
    body: { family: 'var(--font-body)', title: 'Texto operativo', copy: 'Lectura clara para formularios, tablas y texto continuo.' },
    mono: { family: 'var(--font-mono)', title: 'Etiqueta técnica', copy: 'Ideal para tokens, valores, estados y metadata compacta.' },
  } as const
  const current = config[mode]
  const titleSizeMap = {
    display: '2rem',
    body: '1.2rem',
    mono: '1rem',
  } as const

  return (
    <MotionShowcaseShell
      title="Typography tokens con rol visible"
      description="Alterna la familia principal para mostrar cómo cambia el tono de una misma pieza de interfaz cuando cambia el token tipográfico."
      controls={<MotionControlGroup label="Family" options={['display', 'body', 'mono'] as const} value={mode} onChange={setMode} />}
      metrics={[mode, 'type scale', 'tokens']}
      stageKey={mode}
      statusValue={`typography · ${mode}`}
      statusCopy="Los tokens tipográficos deben comunicar uso, no solo estilo." 
      ariaLabel="Typography motion playground"
      preview={(
        <div style={stackStyle}>
          <strong style={{ fontFamily: current.family, fontSize: titleSizeMap[mode], color: '#0f172a' }}>{current.title}</strong>
          <p style={{ ...mutedCopyStyle, fontFamily: current.family }}>{current.copy}</p>
        </div>
      )}
    />
  )
}

function SpacingRadiusTokenShowcase() {
  const [focus, setFocus] = useState<'spacing' | 'radius'>('spacing')

  return (
    <MotionShowcaseShell
      title="Spacing y radius como ritmo y carácter"
      description="Compara espaciado y curvatura para ver cómo pequeñas decisiones de token cambian densidad, respiración y tono del bloque."
      controls={<MotionControlGroup label="Focus" options={['spacing', 'radius'] as const} value={focus} onChange={setFocus} />}
      metrics={[focus, 'foundation', 'tokens']}
      stageKey={focus}
      statusValue={`foundation · ${focus}`}
      statusCopy="Spacing organiza; radius humaniza. Juntos alteran la sensación de producto mucho más de lo que parece." 
      ariaLabel="Spacing and Radius motion playground"
      preview={focus === 'spacing' ? (
        <div style={{ display: 'grid', gap: 8 }}>
          {[8, 16, 24, 40].map((space) => <div key={space} style={{ width: space * 3, height: 14, borderRadius: 999, background: 'var(--color-primary-500)' }} />)}
        </div>
      ) : (
        <div style={{ ...rowStyle, gap: 'var(--sp-4)' }}>
          {[4, 8, 16, 24].map((radius) => <div key={radius} style={{ width: 64, height: 64, borderRadius: radius, background: 'var(--demo-accent-soft)', border: '1px solid var(--demo-accent-soft-border)' }} />)}
        </div>
      )}
    />
  )
}

function ShadowsTokenShowcase() {
  const [depth, setDepth] = useState<'sm' | 'md' | 'xl'>('md')
  const shadowMap = {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    xl: 'var(--shadow-xl)',
  } as const

  return (
    <MotionShowcaseShell
      title="Shadows que definen jerarquía de superficie"
      description="Mueve la profundidad para comparar cómo una misma tarjeta cambia de presencia según el token de sombra aplicado."
      controls={<MotionControlGroup label="Depth" options={['sm', 'md', 'xl'] as const} value={depth} onChange={setDepth} />}
      metrics={[depth, 'surface', 'tokens']}
      stageKey={depth}
      statusValue={`shadow · ${depth}`}
      statusCopy="Una sombra bien medida ayuda a separar planos sin ensuciar la lectura." 
      ariaLabel="Shadows motion playground"
      preview={<div style={{ width: 180, height: 120, borderRadius: 18, background: '#fff', border: '1px solid rgba(203,213,225,0.9)', boxShadow: shadowMap[depth] }} />}
    />
  )
}

type ButtonLiveVariant = 'primary' | 'accent' | 'success' | 'danger'
type ButtonLiveAppearance = 'filled' | 'soft' | 'outline' | 'link'
type ButtonLiveSize = 'sm' | 'md' | 'lg'
type IconMotionPreset = 'float' | 'nudge' | 'ring' | 'pulse'
type IconInteractionPhase = 'idle' | 'hover' | 'press' | 'release'

const buttonStories = [
  { id: 'launch', label: 'Lanzamiento', title: 'Convierte un release en una acción visible', copy: 'Prueba una CTA principal, un camino secundario y acciones satélite con la misma jerarquía visual.', metric: 'Release train · 98%', primaryLabel: 'Publicar release', secondaryLabel: 'Revisar checklist', tertiaryLabel: 'Compartir update', note: 'Ideal para hero sections, panels de onboarding y workflows con foco editorial.', icon: Sparkles },
  { id: 'sales', label: 'Ventas', title: 'Da contexto antes de pedir la conversión', copy: 'Muestra una primaria clara, una secundaria de soporte y microacciones que mantengan el ritmo comercial.', metric: 'Pipeline · 24 reuniones', primaryLabel: 'Solicitar demo', secondaryLabel: 'Enviar propuesta', tertiaryLabel: 'Avisar al equipo', note: 'Funciona bien en tarjetas de producto, pricing blocks y espacios de seguimiento.', icon: Mail },
  { id: 'support', label: 'Soporte', title: 'Escala acciones urgentes sin perder orden', copy: 'Usa contraste alto para lo crítico y conserva acciones rápidas para triage, seguimiento y cierre.', metric: 'SLA · 4 min', primaryLabel: 'Escalar ticket crítico', secondaryLabel: 'Asignar especialista', tertiaryLabel: 'Notificar cliente', note: 'Sirve para incidentes, dashboards operativos y layouts donde la velocidad importa.', icon: ShieldAlert },
] as const

const buttonPaletteMap: Record<ButtonLiveVariant, { readonly accent: string, readonly accentSoft: string, readonly glow: string }> = {
  primary: { accent: 'rgba(37, 99, 235, 0.94)', accentSoft: 'rgba(219, 234, 254, 0.92)', glow: 'rgba(96, 165, 250, 0.28)' },
  accent: { accent: 'rgba(217, 70, 239, 0.94)', accentSoft: 'rgba(245, 208, 254, 0.94)', glow: 'rgba(232, 121, 249, 0.28)' },
  success: { accent: 'rgba(22, 163, 74, 0.94)', accentSoft: 'rgba(220, 252, 231, 0.94)', glow: 'rgba(74, 222, 128, 0.24)' },
  danger: { accent: 'rgba(220, 38, 38, 0.94)', accentSoft: 'rgba(254, 226, 226, 0.96)', glow: 'rgba(248, 113, 113, 0.28)' },
}

function AnimatedButtonIcon({
  icon: Icon,
  preset,
  hoverKey = 0,
  pressKey = 0,
  releaseKey = 0,
}: Readonly<{ icon: LucideIcon, preset: IconMotionPreset, hoverKey?: number, pressKey?: number, releaseKey?: number }>) {
  const prefersReducedMotion = useReducedMotion()
  const controls = useAnimationControls()

  const animationMap: Record<IconMotionPreset, { readonly animate: Record<string, number | number[]>, readonly transition: Record<string, number | string> }> = {
    float: { animate: { y: [0, -2.5, 0], rotate: [0, -3, 0], scale: [1, 1.04, 1] }, transition: { duration: 2.2, ease: 'easeInOut', repeat: Infinity } },
    nudge: { animate: { x: [0, 3, 0], scale: [1, 1.05, 1] }, transition: { duration: 1.25, ease: 'easeInOut', repeat: Infinity } },
    ring: { animate: { rotate: [0, 10, -8, 6, 0], y: [0, -1, 0] }, transition: { duration: 1.6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6 } },
    pulse: { animate: { scale: [1, 1.08, 1], opacity: [0.88, 1, 0.88] }, transition: { duration: 1.35, ease: 'easeInOut', repeat: Infinity } },
  }

  const interactionAnimationMap: Record<IconMotionPreset, Record<Exclude<IconInteractionPhase, 'idle'>, { readonly animate: Record<string, number | number[]>, readonly transition: Record<string, number | string> }>> = {
    float: {
      hover: { animate: { y: [0, -5, -2, 0], rotate: [0, -8, 3, 0], scale: [1, 1.1, 1] }, transition: { duration: 0.38, ease: 'easeInOut' } },
      press: { animate: { y: [0, 1, -8, 0], rotate: [0, -14, 12, 0], scale: [1, 0.94, 1.18, 1] }, transition: { duration: 0.42, ease: 'easeInOut' } },
      release: { animate: { y: [0, -6, 2, 0], rotate: [0, 10, -4, 0], scale: [1, 1.12, 0.98, 1] }, transition: { duration: 0.4, ease: 'easeOut' } },
    },
    nudge: {
      hover: { animate: { x: [0, 4, 0], scale: [1, 1.06, 1] }, transition: { duration: 0.28, ease: 'easeInOut' } },
      press: { animate: { x: [0, 8, -3, 0], scale: [1, 1.14, 1] }, transition: { duration: 0.3, ease: 'easeInOut' } },
      release: { animate: { x: [0, 5, 0], scale: [1, 1.08, 1] }, transition: { duration: 0.24, ease: 'easeOut' } },
    },
    ring: {
      hover: { animate: { rotate: [0, 8, -6, 0], y: [0, -1, 0] }, transition: { duration: 0.36, ease: 'easeInOut' } },
      press: { animate: { rotate: [0, 18, -14, 10, 0], y: [0, -2, 0], scale: [1, 1.12, 1] }, transition: { duration: 0.52, ease: 'easeInOut' } },
      release: { animate: { rotate: [0, 12, -8, 0], y: [0, -1, 0], scale: [1, 1.08, 1] }, transition: { duration: 0.4, ease: 'easeOut' } },
    },
    pulse: {
      hover: { animate: { scale: [1, 1.1, 1], opacity: [0.92, 1, 1] }, transition: { duration: 0.26, ease: 'easeInOut' } },
      press: { animate: { scale: [1, 1.2, 0.96, 1], opacity: [0.9, 1, 1] }, transition: { duration: 0.38, ease: 'easeInOut' } },
      release: { animate: { scale: [1, 1.14, 1], opacity: [0.96, 1, 1] }, transition: { duration: 0.28, ease: 'easeOut' } },
    },
  }

  const animation = animationMap[preset]
  const interactionAnimation = interactionAnimationMap[preset]

  useEffect(() => {
    if (prefersReducedMotion) {
      controls.set({ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 })
      return
    }

    void controls.start({ ...animation.animate, transition: animation.transition })
  }, [animation.animate, animation.transition, controls, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion || hoverKey === 0) return
    let mounted = true
    const run = async () => {
      await controls.start({ ...interactionAnimation.hover.animate, transition: interactionAnimation.hover.transition })
      if (mounted) await controls.start({ ...animation.animate, transition: animation.transition })
    }
    void run()
    return () => { mounted = false }
  }, [animation.animate, animation.transition, controls, hoverKey, interactionAnimation.hover.animate, interactionAnimation.hover.transition, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion || pressKey === 0) return
    let mounted = true
    const run = async () => {
      await controls.start({ ...interactionAnimation.press.animate, transition: interactionAnimation.press.transition })
      if (mounted) await controls.start({ ...animation.animate, transition: animation.transition })
    }
    void run()
    return () => { mounted = false }
  }, [animation.animate, animation.transition, controls, interactionAnimation.press.animate, interactionAnimation.press.transition, prefersReducedMotion, pressKey])

  useEffect(() => {
    if (prefersReducedMotion || releaseKey === 0) return
    let mounted = true
    const run = async () => {
      await controls.start({ ...interactionAnimation.release.animate, transition: interactionAnimation.release.transition })
      if (mounted) await controls.start({ ...animation.animate, transition: animation.transition })
    }
    void run()
    return () => { mounted = false }
  }, [animation.animate, animation.transition, controls, interactionAnimation.release.animate, interactionAnimation.release.transition, prefersReducedMotion, releaseKey])

  return <motion.span className="demo-button-lab__icon-node" animate={controls}><Icon size={16} /></motion.span>
}

function ButtonShowcase() {
  const [storyId, setStoryId] = useState<(typeof buttonStories)[number]['id']>('launch')
  const [variant, setVariant] = useState<ButtonLiveVariant>('primary')
  const [appearance, setAppearance] = useState<ButtonLiveAppearance>('filled')
  const [size, setSize] = useState<ButtonLiveSize>('md')
  const [interactionLabel, setInteractionLabel] = useState('Pasa el cursor, presiona o suelta cualquier acción para disparar el gesto del icono.')
  const [interactionBursts, setInteractionBursts] = useState({ primaryHover: 0, primaryPress: 0, primaryRelease: 0, secondaryHover: 0, secondaryPress: 0, secondaryRelease: 0, tertiaryHover: 0, tertiaryPress: 0, tertiaryRelease: 0, linkHover: 0, linkPress: 0, linkRelease: 0 })

  const story = buttonStories.find((entry) => entry.id === storyId) ?? buttonStories[0]
  const palette = buttonPaletteMap[variant]
  const StoryIcon = story.icon
  const stageStyle = {
    '--button-lab-accent': palette.accent,
    '--button-lab-accent-soft': palette.accentSoft,
    '--button-lab-glow': palette.glow,
  } as CSSProperties

  const triggerInteraction = (target: keyof typeof interactionBursts, label: string) => {
    setInteractionBursts((current) => ({ ...current, [target]: current[target] + 1 }))
    setInteractionLabel(`Ultimo gesto: ${label}`)
  }

  const bindInteraction = (hoverTarget: keyof typeof interactionBursts, pressTarget: keyof typeof interactionBursts, releaseTarget: keyof typeof interactionBursts, actionLabel: string) => ({
    onMouseEnter: () => triggerInteraction(hoverTarget, `${actionLabel} · hover`),
    onFocus: () => triggerInteraction(hoverTarget, `${actionLabel} · hover`),
    onPointerDown: () => triggerInteraction(pressTarget, `${actionLabel} · press`),
    onMouseUp: () => triggerInteraction(releaseTarget, `${actionLabel} · release`),
    onKeyUp: () => triggerInteraction(releaseTarget, `${actionLabel} · release`),
  })

  return (
    <MotionShowcaseShell
      title={story.title}
      description={story.copy}
      controls={(
        <>
          <div className="demo-button-lab__control-group">
            <span className="demo-button-lab__control-title">Escenario</span>
            <div className="demo-button-lab__chip-row">
              {buttonStories.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  className={`demo-button-lab__chip${storyId === entry.id ? ' demo-button-lab__chip--active' : ''}`}
                  onClick={() => setStoryId(entry.id)}
                >
                  {entry.label}
                </button>
              ))}
            </div>
          </div>
          <MotionControlGroup label="Variant" options={['primary', 'accent', 'success', 'danger'] as const} value={variant} onChange={setVariant} />
          <MotionControlGroup label="Appearance" options={['filled', 'soft', 'outline', 'link'] as const} value={appearance} onChange={setAppearance} />
          <MotionControlGroup label="Size" options={['sm', 'md', 'lg'] as const} value={size} onChange={setSize} />
        </>
      )}
      metrics={[story.metric, appearance, size.toUpperCase()]}
      stageKey={`${story.id}-${variant}-${appearance}-${size}`}
      statusValue={`${variant} · ${appearance} · ${size.toUpperCase()}`}
      statusCopy={story.note}
      interactionLabel={interactionLabel}
      stageStyle={stageStyle}
      ariaLabel="Button motion playground"
      preview={(
        <>
          <Button
            variant={variant}
            appearance={appearance}
            size={size}
            iconLeft={<AnimatedButtonIcon icon={StoryIcon} preset="float" hoverKey={interactionBursts.primaryHover} pressKey={interactionBursts.primaryPress} releaseKey={interactionBursts.primaryRelease} />}
            iconRight={<AnimatedButtonIcon icon={ArrowRight} preset="nudge" hoverKey={interactionBursts.primaryHover} pressKey={interactionBursts.primaryPress} releaseKey={interactionBursts.primaryRelease} />}
            {...bindInteraction('primaryHover', 'primaryPress', 'primaryRelease', story.primaryLabel)}
          >
            {story.primaryLabel}
          </Button>
          <div className="demo-button-lab__secondary-row">
            <Button variant="secondary" appearance="soft" size="sm" iconLeft={<AnimatedButtonIcon icon={CheckCircle2} preset="pulse" hoverKey={interactionBursts.secondaryHover} pressKey={interactionBursts.secondaryPress} releaseKey={interactionBursts.secondaryRelease} />} {...bindInteraction('secondaryHover', 'secondaryPress', 'secondaryRelease', story.secondaryLabel)}>{story.secondaryLabel}</Button>
            <Button variant="ghost" appearance="link" size="sm" iconRight={<AnimatedButtonIcon icon={ArrowRight} preset="nudge" hoverKey={interactionBursts.linkHover} pressKey={interactionBursts.linkPress} releaseKey={interactionBursts.linkRelease} />} {...bindInteraction('linkHover', 'linkPress', 'linkRelease', 'Ver flujo')}>Ver flujo</Button>
          </div>
          <div className="demo-button-lab__micro-actions">
            <Button variant={variant} appearance="outline" size="sm" loading>Sincronizando</Button>
            <Button variant="secondary" appearance="outline" size="sm" iconLeft={<AnimatedButtonIcon icon={BellRing} preset="ring" hoverKey={interactionBursts.tertiaryHover} pressKey={interactionBursts.tertiaryPress} releaseKey={interactionBursts.tertiaryRelease} />} {...bindInteraction('tertiaryHover', 'tertiaryPress', 'tertiaryRelease', story.tertiaryLabel)}>{story.tertiaryLabel}</Button>
            <Button variant="ghost" appearance="soft" size="sm" disabled>Solo lectura</Button>
          </div>
        </>
      )}
    />
  )
}

function HooksShowcase() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()
  const { current, isMobile, isTablet, isDesktop } = useBreakpoint()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const displayedTheme = mounted ? theme : '...'
  const displayedResolvedTheme = mounted ? resolvedTheme : '...'
  const displayedBreakpoint = mounted ? current : '...'

  return (
    <MotionShowcaseShell
      title="Hooks con feedback vivo del entorno"
      description="La vitrina de hooks muestra cómo cambian tema y breakpoint en tiempo real, pero con una capa más editorial y compacta que la tabla base."
      controls={(
        <>
          <MotionControlGroup label="Theme" options={['light', 'dark', 'system'] as const} value={mounted ? theme : 'light'} onChange={setTheme} />
          <div className="demo-button-lab__control-group">
            <span className="demo-button-lab__control-title">Action</span>
            <button type="button" className="demo-button-lab__chip" onClick={toggleTheme}>toggleTheme()</button>
          </div>
        </>
      )}
      metrics={[`theme ${displayedTheme}`, `resolved ${displayedResolvedTheme}`, `bp ${displayedBreakpoint}`]}
      stageKey={`${displayedTheme}-${displayedResolvedTheme}-${displayedBreakpoint}`}
      statusValue={`theme ${displayedTheme} · breakpoint ${displayedBreakpoint}`}
      statusCopy="Útil para enseñar estado reactivo del entorno sin forzar al usuario a leer solo texto técnico." 
      ariaLabel="Hooks motion playground"
      preview={(
        <div style={stackStyle}>
          <div style={softPanelStyle}>
            <div style={stackStyle}>
              <p style={mutedCopyStyle}>theme: <strong>{displayedTheme}</strong></p>
              <p style={mutedCopyStyle}>resolvedTheme: <strong>{displayedResolvedTheme}</strong></p>
              <p style={mutedCopyStyle}>current: <strong>{displayedBreakpoint}</strong></p>
            </div>
          </div>
          <div style={rowStyle}>
            <Badge variant={isMobile ? 'success' : 'info'}>isMobile: {String(isMobile)}</Badge>
            <Badge variant={isTablet ? 'success' : 'info'}>isTablet: {String(isTablet)}</Badge>
            <Badge variant={isDesktop ? 'success' : 'info'}>isDesktop: {String(isDesktop)}</Badge>
          </div>
        </div>
      )}
    />
  )
}

const showcaseRegistry: Record<string, () => ReactNode> = {
  'Component:Button': ButtonShowcase,
  'Component:Badge': BadgeShowcase,
  'Component:Input': InputShowcase,
  'Component:Label': LabelShowcase,
  'Component:Spinner': SpinnerShowcase,
  'Component:ProgressBar': ProgressBarShowcase,
  'Component:Card': CardShowcase,
  'Component:Alert': AlertShowcase,
  'Component:Avatar': AvatarShowcase,
  'Component:Toggle': ToggleShowcase,
  'Component:Modal': ModalShowcase,
  'Component:DataTable': DataTableShowcase,
  'Component:Table': TableShowcase,
  'Component:EmptyState': EmptyStateShowcase,
  'Component:StatCard': StatCardShowcase,
  'Component:Stepper': StepperShowcase,
  'Component:Tabs': TabsShowcase,
  'Component:Header': HeaderShowcase,
  'Component:Sidebar': SidebarShowcase,
  'Component:Tooltip': TooltipShowcase,
  'Component:Skeleton': SkeletonShowcase,
  'Component:Select': SelectShowcase,
  'Component:Breadcrumb': BreadcrumbShowcase,
  'Tokens:Colors': ColorsTokenShowcase,
  'Tokens:Typography': TypographyTokenShowcase,
  'Tokens:Spacing & Radius': SpacingRadiusTokenShowcase,
  'Tokens:Shadows': ShadowsTokenShowcase,
  'Hook:Hooks': HooksShowcase,
}

function getShowcaseKey(title: string, tag?: string) {
  return tag ? `${tag}:${title}` : title
}

export function hasDynamicShowcase({ title, tag }: Readonly<{ title: string, tag?: string }>) {
  return Boolean(showcaseRegistry[getShowcaseKey(title, tag)])
}

export function DynamicComponentShowcase({ title, tag }: Readonly<{ title: string, tag?: string }>) {
  const Showcase = showcaseRegistry[getShowcaseKey(title, tag)]

  if (!Showcase) {
    return null
  }

  return <Showcase />
}
