'use client'

import { useState } from 'react'
import { DataTable, Badge, Button } from '@bacsystem/ui'
import type { DataTableColumn } from '@bacsystem/ui'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { DemoSection } from '../../components/DemoSection'

interface DemoInvoice {
  numero: string
  cliente: string
  total: string
  estado: 'pagado' | 'pendiente' | 'vencido'
}

const invoices: DemoInvoice[] = [
  { numero: 'F-0001', cliente: 'Importadora del Sur S.A.C.', total: 'S/ 4,200.00', estado: 'pagado' },
  { numero: 'F-0002', cliente: 'Tech Solutions Perú E.I.R.L.', total: 'S/ 1,850.00', estado: 'pendiente' },
  { numero: 'F-0003', cliente: 'Distribuidora Andina S.R.L.', total: 'S/ 9,600.00', estado: 'vencido' },
  { numero: 'F-0004', cliente: 'Comercial Lima Norte S.A.C.', total: 'S/ 3,150.00', estado: 'pagado' },
  { numero: 'F-0005', cliente: 'Servicios Integrales Perú S.A.', total: 'S/ 6,800.00', estado: 'pendiente' },
]

const badgeVariant: Record<DemoInvoice['estado'], 'success' | 'warning' | 'danger'> = {
  pagado: 'success',
  pendiente: 'warning',
  vencido: 'danger',
}

const columns: DataTableColumn<DemoInvoice>[] = [
  { key: 'numero', header: 'N°' },
  { key: 'cliente', header: 'Cliente' },
  { key: 'total', header: 'Total PEN' },
  {
    key: 'estado',
    header: 'Estado',
    render: (row) => (
      <Badge variant={badgeVariant[row.estado]}>{row.estado}</Badge>
    ),
  },
  {
    key: 'acciones',
    header: 'Acciones',
    render: (row) => (
      <div className="bac-datatable__actions">
        <button
          className="bac-datatable__action-btn bac-datatable__action-btn--view"
          title={`Ver ${row.numero}`}
          aria-label={`Ver ${row.numero}`}
          onClick={() => alert(`Ver: ${row.numero}`)}
        >
          <Eye size={15} />
        </button>
        <button
          className="bac-datatable__action-btn bac-datatable__action-btn--edit"
          title={`Editar ${row.numero}`}
          aria-label={`Editar ${row.numero}`}
          onClick={() => alert(`Editar: ${row.numero}`)}
        >
          <Pencil size={15} />
        </button>
        <button
          className="bac-datatable__action-btn bac-datatable__action-btn--delete"
          title={`Eliminar ${row.numero}`}
          aria-label={`Eliminar ${row.numero}`}
          onClick={() => alert(`Eliminar: ${row.numero}`)}
        >
          <Trash2 size={15} />
        </button>
      </div>
    ),
  },
]

/**
 * Demo section showcasing a typed DataTable with controls to toggle between data, loading, and empty states.
 *
 * Renders three buttons to switch the table state and a DataTable configured with demo invoices, loading flag, and empty text.
 *
 * @returns A React element that renders the demo DataTable and its state controls.
 */
export function DataTableSection() {
  const [state, setState] = useState<'data' | 'loading' | 'empty'>('data')

  return (
    <div id="datatable">
      <DemoSection title="DataTable" tag="Component" description="Generic typed table with loading and empty states">
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', gap: 'var(--sp-2)', marginBottom: 'var(--sp-4)' }}>
            <Button size="sm" variant={state === 'data' ? 'primary' : 'secondary'} onClick={() => setState('data')}>
              Con datos
            </Button>
            <Button size="sm" variant={state === 'loading' ? 'primary' : 'secondary'} onClick={() => setState('loading')}>
              Cargando
            </Button>
            <Button size="sm" variant={state === 'empty' ? 'primary' : 'secondary'} onClick={() => setState('empty')}>
              Vacío
            </Button>
          </div>
          <DataTable
            columns={columns}
            data={state === 'data' ? invoices : []}
            loading={state === 'loading'}
            emptyText="No hay facturas registradas"
            getRowKey={(row) => row.numero}
          />
        </div>
      </DemoSection>
    </div>
  )
}
