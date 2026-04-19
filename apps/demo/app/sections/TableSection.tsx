'use client'

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@bacsystem/ui'
import { DemoSection } from '../../components/DemoSection'
import { tablePropRows } from '../../components/propTables'

const rows = [
  { sku: 'SKU-001', producto: 'Café de altura', stock: 42, estado: 'Activo' },
  { sku: 'SKU-002', producto: 'Té matcha', stock: 18, estado: 'Bajo stock' },
  { sku: 'SKU-003', producto: 'Granola premium', stock: 76, estado: 'Activo' },
]

export function TableSection() {
  return (
    <div id="table">
      <DemoSection
        title="Table"
        tag="Component"
        description="Primitivas composables para tablas estáticas y listados administrativos."
        props={tablePropRows}
        code={`
import {
  Table, TableBody, TableCaption, TableCell,
  TableFooter, TableHead, TableHeader, TableRow,
} from '@bacsystem/ui'

<Table>
  <TableCaption>Inventario actual</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>SKU</TableHead>
      <TableHead>Producto</TableHead>
      <TableHead>Stock</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>{/* filas */}</TableBody>
</Table>
`}
      >
        <Table>
          <TableCaption>Inventario actual de productos destacados</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.sku}>
                <TableCell>{row.sku}</TableCell>
                <TableCell>{row.producto}</TableCell>
                <TableCell>{row.stock}</TableCell>
                <TableCell>{row.estado}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total visible</TableCell>
              <TableCell>136</TableCell>
              <TableCell>3 productos</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </DemoSection>
    </div>
  )
}