// Shared Component — top header bar
// Used by both vendor and customer pages
// Props only, no API calls

interface PageHeaderProps {
    breadcrumbParent: string
    breadcrumbCurrent: string
    rightSlot?: React.ReactNode
}

export default function PageHeader({ breadcrumbParent, breadcrumbCurrent, rightSlot }: PageHeaderProps) {
    return (
        <header className="h-14 border-b border-[var(--border)] flex items-center justify-between px-8 shrink-0">
            <div className="text-[14px] font-medium text-[var(--text-muted)]">
                {breadcrumbParent}
                <span className="mx-1 text-[var(--border)]">/</span>
                <span className="text-[var(--text-secondary)]">{breadcrumbCurrent}</span>
            </div>
            {rightSlot && (
                <div className="flex items-center gap-3">
                    {rightSlot}
                </div>
            )}
        </header>
    )
}