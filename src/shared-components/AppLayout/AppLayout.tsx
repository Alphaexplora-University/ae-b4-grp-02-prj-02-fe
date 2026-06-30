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
    name: string
    email: string
    navItems: NavItem[]
  }
  children: React.ReactNode
}

export default function AppLayout({ withSidebar = false, sidebarProps, children }: AppLayoutProps) {
  return (
    <div className="h-screen w-screen bg-[var(--bg-page)] text-[var(--text-primary)] flex p-4 gap-4 overflow-hidden">

      {withSidebar && sidebarProps && (
        <Sidebar
          name={sidebarProps.name}
          email={sidebarProps.email}
          navItems={sidebarProps.navItems}
        />
      )}

      <main className="flex-1 bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl flex flex-col overflow-hidden">
        {children}
      </main>

    </div>
  )
}