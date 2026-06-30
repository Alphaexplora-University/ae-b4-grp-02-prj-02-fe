// View layer — dumb UI, calls ViewModel hook only
// NO useState, NO useEffect, NO API calls

import { useBookingsViewModel } from '../viewmodel/useBookingsViewModel'
import AppLayout from '../../../shared-components/AppLayout/AppLayout'
import PageHeader from '../../../shared-components/PageHeader/PageHeader'
import DataTable from '../../../shared-components/DataTable/DataTable'
import FilterSelect from '../../../shared-components/FilterSelect/FilterSelect'
import SearchInput from '../../../shared-components/SearchInput/SearchInput'
import StatusBadge from '../../../shared-components/StatusBadge/StatusBadge'
import type { Booking } from '../model/bookings.model'

export default function BookingsView() {
  const {
    vendor,
    bookings,
    filter,
    pagination,
    onSearchChange,
    onStatusChange,
    onPageChange,
  } = useBookingsViewModel()

  const columns: Array<{
    key: keyof Booking
    label: string
    render?: (row: Booking) => React.ReactNode
  }> = [
    {
      key: 'created_at',
      label: 'Request Timestamp',
      render: (row: Booking) => new Date(row.created_at).toLocaleString(),
    },
    { key: 'customer_name', label: 'Customer Name' },
    { key: 'customer_email', label: 'Customer Email' },
    { key: 'customer_phone', label: 'Contact Number' },
    { key: 'service_requested', label: 'Service Requested' },
    {
      key: 'status',
      label: 'Status',
      render: (row: Booking) => <StatusBadge status={row.status} />,
    },
  ]

  const pageNumbers = Array.from({ length: pagination.totalPages }, (_, i) => i + 1)

   return (
   <AppLayout
     withSidebar
     sidebarProps={{
       navItems: [
         {
           label: 'Dashboard',
           path: '/dashboard',
           icon: (
             <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
             </svg>
           ),
         },
         {
           label: 'Bookings',
           path: '/bookings',
           icon: (
             <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4M16 2v4" />
               <rect x="3" y="4" width="18" height="18" rx="2" />
               <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18m-9 6 2 2 4-4" />
             </svg>
           ),
         },
       ],
       roleLabel: 'Vendor Portal',
     }}
   >
      <PageHeader
        breadcrumbParent="Bookings"
        breadcrumbCurrent="All Records"
        name={vendor?.owner_name ?? 'Owner'}
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">All Bookings</h1>
        </div>

        {/* Control Bar */}
        <div className="flex gap-3">
          <SearchInput
            value={filter.search}
            placeholder="Search customer name, email, service..."
            onChange={onSearchChange}
          />
          <FilterSelect
            value={filter.status}
            onChange={onStatusChange}
            options={['All Status', 'pending', 'accepted', 'rejected'] as const}
          />
        </div>

        {/* Table */}
        <section className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-surface)]">
          

          <DataTable columns={columns} data={bookings} />

          {/* Pagination */}
          <div className="border-t border-[var(--border)] px-6 py-4 flex items-center justify-between">
            <span className="text-xs text-[var(--text-muted)]">
              Showing {((pagination.currentPage - 1) * pagination.perPage) + 1}–{Math.min(pagination.currentPage * pagination.perPage, pagination.total)} of {pagination.total}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onPageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-3 py-1.5 text-xs border border-[var(--border)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {pageNumbers.map(page => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    className={`w-12 h-7 text-xs rounded-lg transition-colors ${
                      page === pagination.currentPage
                        ? 'bg-[var(--accent)] text-white font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onPageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-3 py-1.5 text-xs border border-[var(--border)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}