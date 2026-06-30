// Shared Component — page layout wrapper
// Optional sidebar (used by both vendor and customer), shared layout shell
// Props only, no API calls

import Sidebar from '../Sidebar/Sidebar'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
}

interface AppLayoutProps {
  withSidebar?: boolean
  sidebarProps?: {
    navItems: NavItem[]
    roleLabel?: string
  }
  children: React.ReactNode
}

export default function AppLayout({ withSidebar = false, sidebarProps, children }: AppLayoutProps) {
  return (
    <div className="h-screen w-screen bg-[var(--bg-page)] text-[var(--text-primary)] flex overflow-hidden">

      {withSidebar && sidebarProps && (
        <Sidebar
          navItems={sidebarProps.navItems}
          roleLabel={sidebarProps.roleLabel}
        />
      )}

      <main className="flex-1 bg-[var(--bg-surface)] flex flex-col overflow-hidden">
        {children}
      </main>

    </div>
  )
}