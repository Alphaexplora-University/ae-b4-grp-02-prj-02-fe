// Shared Component — sidebar navigation (vendor and customer)
// Props only, no API calls

import { useNavigate, useLocation } from 'react-router-dom'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
}

interface SidebarProps {
  name: string
  email: string
  navItems: NavItem[]
}

export default function Sidebar({ name, email, navItems }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className="w-64 shrink-0 flex flex-col py-4 px-2 select-none">
      <div className="space-y-6">

        {/* Profile Card */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)]">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm shrink-0">
            {name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-[var(--text-primary)] truncate">
              {name}
            </span>
            <span className="text-[12px] text-[var(--text-muted)] truncate">
              {email}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)] px-3">
            General
          </span>
          <nav className="space-y-1">
            {navItems.map(item => {
              const isActive = location.pathname === item.path
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                  }`}
                >
                  <span className={isActive ? 'text-[var(--accent)]' : ''}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </aside>
  )
}