// Shared Component — top header bar
// Used by both vendor and customer pages
// Props only, no API calls

interface PageHeaderProps {
  breadcrumbParent: string
  breadcrumbCurrent: string
  name: string
  rightSlot?: React.ReactNode
}

export default function PageHeader({ breadcrumbParent, breadcrumbCurrent, name, rightSlot }: PageHeaderProps) {
  return (
    <header className="h-14 border-b border-[var(--border)] flex items-center justify-between bg-[var(--bg-page)] shadow-sm/2 px-8 shrink-0">
      <div className="text-[14px] font-medium text-[var(--text-muted)]">
        {breadcrumbParent}
        <span className="mx-1 text-[var(--border)]">/</span>
        <span className="text-[var(--text-secondary)]">{breadcrumbCurrent}</span>
      </div>

      <div className="flex items-center gap-3">
        {rightSlot}

        {/* Profile initials */}
        <div className="w-8 h-8 rounded-full bg-[#3548A8] flex items-center justify-center text-white font-bold text-xs shrink-0">
          {name.slice(0, 2).toUpperCase()}
        </div>
      </div>
    </header>
  )
}