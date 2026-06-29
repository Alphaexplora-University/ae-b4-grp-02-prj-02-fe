# Project

This frontend is a vendor and customer booking dashboard for MVP testing. The dashboard is the default landing page, and there is no login or register flow. Vendor and customer test accounts are hardcoded.

# Tech Stack

- React 19.2.7
- React DOM 19.2.7
- React Router DOM 7.18.0
- Tailwind CSS 4.3.1
- Axios 1.18.1
- TypeScript 6.0.2
- Vite 8.1.0

# Folder Structure

```text
src/
├── App.css
├── App.tsx
├── index.css
├── main.tsx
├── api/
│   ├── bookingsApi.ts
│   ├── customerSession.ts
│   └── session.ts
├── assets/
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
├── features/
│   ├── bookings/
│   │   ├── model/
│   │   │   └── bookings.model.ts
│   │   ├── view/
│   │   │   └── BookingsView.tsx
│   │   └── viewmodel/
│   │       └── useBookingsViewModel.ts
│   ├── customer_dashboard/
│   │   ├── model/
│   │   │   └── customerDashboard.model.ts
│   │   ├── view/
│   │   │   └── CustomerDashboardView.tsx
│   │   └── viewmodel/
│   │       └── useCustomerDashboardViewModel.ts
│   └── dashboard/
│       ├── model/
│       │   └── dashboard.model.ts
│       ├── view/
│       │   └── DashboardView.tsx
│       └── viewmodel/
│           └── useDashboardViewModel.ts
├── routes/
│   └── index.tsx
└── shared-components/
    ├── BookingModal/
    │   └── BookingModal.tsx
    ├── DataTable/
    │   └── DataTable.tsx
    ├── FilterSelect/
    │   └── FilterSelect.tsx
    ├── NotificationBell/
    │   └── NotificationBell.tsx
    ├── Pagination/
    │   └── Pagination.tsx
    ├── SearchInput/
    │   └── SearchInput.tsx
    ├── Sidebar/
    │   └── Sidebar.tsx
    └── StatusBadge/
        └── StatusBadge.tsx
```

# Routes

The following routes are defined in `App.tsx`:

- `/` (Redirects to `/dashboard`)
- `/dashboard` (Renders `DashboardView`)
- `/bookings` (Renders `BookingsView`)
- `/customer/dashboard` (Renders `CustomerDashboardView`)
- `/customer-dashboard` (Renders `CustomerDashboardView`)

# Dependencies

### dependencies

- `@tailwindcss/vite`: `^4.3.1`
- `axios`: `^1.18.1`
- `react`: `^19.2.7`
- `react-dom`: `^19.2.7`
- `react-router-dom`: `^7.18.0`

### devDependencies

- `@eslint/js`: `^10.0.1`
- `@tailwindcss/cli`: `^4.3.1`
- `@types/node`: `^24.13.2`
- `@types/react`: `^19.2.17`
- `@types/react-dom`: `^19.2.3`
- `@vitejs/plugin-react`: `^6.0.2`
- `eslint`: `^10.5.0`
- `eslint-plugin-react-hooks`: `^7.1.1`
- `eslint-plugin-react-refresh`: `^0.5.3`
- `globals`: `^17.6.0`
- `tailwindcss`: `^4.3.1`
- `typescript`: `~6.0.2`
- `typescript-eslint`: `^8.61.0`
- `vite`: `^8.1.0`
