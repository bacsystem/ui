import type { ReactNode } from 'react'
import { Loader2, Inbox } from 'lucide-react'

function toDisplayString(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'object') return JSON.stringify(value)
  if (typeof value === 'string') return value
  if (typeof value === 'number') return `${value}`
  if (typeof value === 'boolean') return `${value}`
  return ''
}

export interface DataTableColumn<T> {
  readonly key: keyof T | string
  readonly header: string
  readonly render?: (row: T) => ReactNode
  readonly className?: string
}

export interface DataTableProps<T extends object> {
  readonly columns: DataTableColumn<T>[]
  readonly data: T[]
  readonly loading?: boolean
  readonly emptyText?: string
  readonly getRowKey?: (row: T, index: number) => string | number
  readonly className?: string
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
}: Readonly<DataTableProps<T>>) {
  const extraClass = className ? ` ${className}` : ''

  let bodyRows: ReactNode
  if (loading) {
    bodyRows = (
      <tr>
        <td colSpan={Math.max(columns.length, 1)} className="bac-datatable__state-cell">
          <Loader2 className="bac-datatable__loader" size={24} aria-label="Cargando datos" />
        </td>
      </tr>
    )
  } else if (data.length === 0) {
    bodyRows = (
      <tr>
        <td colSpan={Math.max(columns.length, 1)} className="bac-datatable__state-cell">
          <Inbox size={32} className="bac-datatable__empty-icon" aria-hidden="true" />
          <p className="bac-datatable__empty-text">{emptyText}</p>
        </td>
      </tr>
    )
  } else {
    bodyRows = data.map((row, rowIndex) => (
      <tr key={getRowKey ? getRowKey(row, rowIndex) : String(rowIndex)} className="bac-datatable__row">
        {columns.map((col) => {
          const tdClass = col.className ? ` ${col.className}` : ''
          return (
            <td key={String(col.key)} className={`bac-datatable__td${tdClass}`}>
              {col.render
                ? col.render(row)
                : toDisplayString((row as Record<string, unknown>)[col.key as string])}
            </td>
          )
        })}
      </tr>
    ))
  }

  return (
    <div className={`bac-datatable${extraClass}`}>
      <table className="bac-datatable__table">
        <thead className="bac-datatable__head">
          <tr>
            {columns.map((col) => {
              const thClass = col.className ? ` ${col.className}` : ''
              return (
                <th key={String(col.key)} className={`bac-datatable__th${thClass}`}>
                  {col.header}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className="bac-datatable__body">
          {bodyRows}
        </tbody>
      </table>
    </div>
  )
}
