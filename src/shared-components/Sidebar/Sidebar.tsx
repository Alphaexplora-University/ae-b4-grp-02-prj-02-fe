// Shared Component — sidebar navigation (vendor and customer)
// Props only, no API calls

import { useNavigate, useLocation } from "react-router-dom";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  navItems: NavItem[];
  roleLabel?: string;
}

export default function Sidebar({ navItems, roleLabel }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-64 shrink-0 flex flex-col py-5 px-3 select-none border-r border-[#D6D9D2] bg-[var(--bg-page)]/10">
      <div className="space-y-4">
        {/* Brand */}
        <div className="px-3">
          <p className="text-sm font-bold text-[var(--text-primary)] leading-tight">
            Vendor Booking
          </p>

          <p className="text-sm font-bold text-[var(--accent)] leading-tight">
            Management System
          </p>

          {roleLabel && (
            <span className="inline-flex mt-3 rounded-full border border-[#D6D9D2] bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#5B6154]">
              {roleLabel}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="mx- border-t border-[#BFC5B5]" />

        {/* Navigation */}
        <div className="space-y-2">
          <span className="block px-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#70776A]">
            General
          </span>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`group w-full flex items-center gap-3 rounded-r-lg py-2.5 pr-3 transition-all duration-200 border-l-[3px] ${
                    isActive
                      ? "bg-[var(--accent)]/12 text-[var(--accent)] border-[var(--accent)] pl-[9px] font-semibold shadow-sm"
                      : "border-transparent pl-3 text-[#495057] hover:bg-white/70 hover:text-[#1F2937] font-medium"
                  }`}
                >
                  <span
                    className={`transition-colors ${
                      isActive
                        ? "text-[var(--accent)]"
                        : "text-[#6B7280] group-hover:text-[#374151]"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}