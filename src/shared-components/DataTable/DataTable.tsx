// Shared Component — reusable data table
// Props only, no API calls

interface Column<T> {
  key: keyof T
  label: string
  render?: (row: T) => React.ReactNode
  emphasize?: boolean
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
}

export default function DataTable<T extends { id: string }>({ columns, data }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0">
        <thead className="bg-[#349E64] text-left">
            <tr>
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white border-b border-[var(--border)]"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-sm text-[var(--text-muted)] border-b border-[var(--border)]"
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
                    className={`px-4 py-3 text-sm border-b border-[var(--border)] ${
                      col.emphasize
                        ? 'text-[var(--text-primary)] font-semibold'
                        : 'text-[var(--text-primary)]/80 font-medium'
                    }`}
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