'use client'

import { Tabs, Badge, StatCard } from '@bacsystem/ui'
import { Package, Pencil, Image, Clock, Boxes, Tag } from 'lucide-react'
import { DemoSection } from '../../components/DemoSection'

const resumenContent = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-4)' }}>
      <StatCard title="Ventas del mes" value="S/ 12,400" trend="up" trendValue="+8%" color="blue" />
      <StatCard title="Unidades vendidas" value="284" trend="up" trendValue="+12%" color="green" />
      <StatCard title="Stock disponible" value="1,042" trend="neutral" color="teal" />
    </div>
    <div style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'center' }}>
      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>Estado:</span>
      <Badge variant="success">Activo</Badge>
      <Badge variant="primary" appearance="outline">Destacado</Badge>
    </div>
  </div>
)

const editarContent = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', maxWidth: 480 }}>
    {[
      { label: 'Nombre del producto', value: 'Laptop Ultrafino Pro 14"' },
      { label: 'SKU', value: 'LAP-PRO-14-2026' },
      { label: 'Precio (S/)', value: '3,499.00' },
      { label: 'Categoría', value: 'Electrónica' },
    ].map(({ label, value }) => (
      <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-1)' }}>
        <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)' }}>{label}</label>
        <div style={{ padding: 'var(--sp-2) var(--sp-3)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-base)', fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', backgroundColor: 'var(--color-neutral-50)' }}>
          {value}
        </div>
      </div>
    ))}
  </div>
)

const imagenesContent = (
  <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
    {[1, 2, 3, 4].map((slotNum) => (
      <div key={slotNum} style={{ width: 100, height: 100, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-50)', border: '2px dashed var(--color-primary-200)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Image size={28} style={{ color: 'var(--color-primary-300)' }} aria-hidden />
      </div>
    ))}
    <div style={{ width: 100, height: 100, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-neutral-50)', border: '2px dashed var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 'var(--text-2xl)', color: 'var(--color-neutral-400)' }}>
      +
    </div>
  </div>
)

const historialContent = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
    {[
      { fecha: 'Hoy, 14:32', accion: 'Precio actualizado a S/ 3,499.00', usuario: 'admin@bac.pe' },
      { fecha: 'Ayer, 09:15', accion: 'Stock ajustado: +200 unidades', usuario: 'almacen@bac.pe' },
      { fecha: '20 mar, 11:40', accion: 'Producto marcado como Destacado', usuario: 'admin@bac.pe' },
      { fecha: '15 mar, 08:00', accion: 'Producto creado', usuario: 'admin@bac.pe' },
    ].map(({ fecha, accion, usuario }) => (
      <div key={fecha} style={{ display: 'flex', gap: 'var(--sp-3)', padding: 'var(--sp-3)', borderRadius: 'var(--radius-base)', border: '1px solid var(--color-border)' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-primary-400)', flexShrink: 0, marginTop: 6 }} />
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>{accion}</p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: 2 }}>{fecha} · {usuario}</p>
        </div>
      </div>
    ))}
  </div>
)

const stockContent = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-4)' }}>
      <StatCard title="Stock total" value="1,042" color="teal" />
      <StatCard title="Reservado" value="58" trend="down" trendValue="-3" color="amber" />
      <StatCard title="Disponible" value="984" trend="up" trendValue="+200" color="green" />
    </div>
    <div style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'center' }}>
      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>Alerta stock mínimo:</span>
      <Badge variant="warning">50 unidades</Badge>
    </div>
  </div>
)

const promocionesContent = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
    {[
      { nombre: 'Black Friday 2026', descuento: '25%', estado: 'programada' as const, fecha: '28 nov 2026' },
      { nombre: 'Campaña Verano', descuento: '15%', estado: 'activa' as const, fecha: '01 dic 2026' },
    ].map(({ nombre, descuento, estado, fecha }) => (
      <div key={nombre} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-4)', borderRadius: 'var(--radius-base)', border: '1px solid var(--color-border)' }}>
        <div>
          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>{nombre}</p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: 2 }}>Vence: {fecha}</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'center' }}>
          <Badge variant="warning" appearance="outline">{descuento} OFF</Badge>
          <Badge variant={estado === 'activa' ? 'success' : 'default'}>{estado}</Badge>
        </div>
      </div>
    ))}
  </div>
)

/**
 * Renders a demo section showcasing a pill-style Tabs component with six static tab panels.
 *
 * @returns A React element containing the demo section with the configured Tabs and their static content
 */
export function TabsSection() {
  return (
    <div id="tabs">
      <DemoSection title="Tabs" tag="Component" description="Pill container with icon support — controlled and uncontrolled">
        <div style={{ width: '100%' }}>
          <Tabs
            defaultTab="resumen"
            items={[
              { id: 'resumen',     label: 'Resumen',    icon: Package, content: resumenContent },
              { id: 'editar',      label: 'Editar',     icon: Pencil,  content: editarContent },
              { id: 'imagenes',    label: 'Imágenes',   icon: Image,   content: imagenesContent },
              { id: 'historial',   label: 'Historial',  icon: Clock,   content: historialContent },
              { id: 'stock',       label: 'Stock',      icon: Boxes,   content: stockContent },
              { id: 'promociones', label: 'Promociones',icon: Tag,     content: promocionesContent },
            ]}
          />
        </div>
      </DemoSection>
    </div>
  )
}
