import type { ReactNode } from 'react'
import { Loader2, Inbox } from 'lucide-react'

export interface DataTableColumn<T> {
  key: keyof T | string
  header: string
  render?: (row: T) => ReactNode
  className?: string
}

export interface DataTableProps<T extends object> {
  columns: DataTableColumn<T>[]
  data: T[]
  loading?: boolean
  emptyText?: string
  getRowKey?: (row: T, index: number) => string | number
  className?: string
}

/**
 * Renders a configurable data table for rows of type `T`.
 *
 * @param columns - Column descriptors defining header text, key, optional `render` function, and optional cell `className`
 * @param data - Array of row objects to display
 * @param loading - When `true`, shows a loading state spanning all columns
 * @param emptyText - Message shown when `data` is empty
 * @param getRowKey - Returns a stable, unique key for each row; receives the row object and its index. Strongly recommended when rows can be inserted, removed, or reordered to avoid incorrect React reconciliation.
 * @param className - Additional CSS class applied to the table container
 * @returns A JSX element representing the rendered data table
 */
export function DataTable<T extends object>({
  columns,
  data,
  loading = false,
  emptyText = 'No hay datos disponibles',
  getRowKey,
  className = '',
}: DataTableProps<T>) {
  return (
    <div className={`bac-datatable${className ? ` ${className}` : ''}`}>
      <table className="bac-datatable__table">
        <thead className="bac-datatable__head">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`bac-datatable__th${col.className ? ` ${col.className}` : ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bac-datatable__body">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="bac-datatable__state-cell">
                <Loader2
                  className="bac-datatable__loader"
                  size={24}
                  aria-label="Cargando datos"
                />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="bac-datatable__state-cell">
                <Inbox size={32} className="bac-datatable__empty-icon" aria-hidden="true" />
                <p className="bac-datatable__empty-text">{emptyText}</p>
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={getRowKey ? getRowKey(row, rowIndex) : String(rowIndex)} className="bac-datatable__row">
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={`bac-datatable__td${col.className ? ` ${col.className}` : ''}`}
                  >
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[col.key as string] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
