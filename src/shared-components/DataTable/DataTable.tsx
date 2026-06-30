// Shared Component — reusable data table
// Props only, no API calls

interface Column<T> {
  key: keyof T
  label: string
  render?: (row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
}

export default function DataTable<T extends { id: string }>({ columns, data }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0">
        <thead className="bg-[var(--bg-card)] text-left">
          <tr>
            {columns.map(col => (
              <th
                key={String(col.key)}
                className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)] border-b border-[var(--border)]"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-sm text-[var(--text-muted)]"
              >
                No bookings found.
              </td>
            </tr>
          ) : (
            data.map(row => (
              <tr
                key={row.id}
                className="hover:bg-[var(--bg-card)] transition-colors"
              >
                {columns.map(col => (
                  <td
                    key={String(col.key)}
                    className="px-4 py-3 text-sm text-[var(--text-secondary)]"
                  >
                    {col.render
                      ? col.render(row)
                      : String(row[col.key] ?? '')}
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