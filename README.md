# Vendor Management Frontend

A modern React + TypeScript frontend for a vendor-focused booking dashboard. The app is built around a clean dark UI, reusable shared components, and an MVVM-style structure for scalable feature development.

## What this frontend includes

- Login and registration flows for vendors
- Protected dashboard and bookings routes
- Booking metrics and recent activity views
- Search, filtering, and pagination for bookings
- Notification bell with unread state and booking modal updates
- Reusable UI primitives for tables, forms, badges, and modal interactions

## Tech stack

- React 19
- TypeScript
- Vite
- React Router DOM
- LocalStorage-based prototype state for demo flows

## Project structure

```text
src/
├── App.tsx
├── main.tsx
├── index.css
├── features/
│   ├── login/
│   │   ├── model/
│   │   ├── view/
│   │   └── viewmodel/
│   ├── register/
│   │   ├── model/
│   │   ├── view/
│   │   └── viewmodel/
│   ├── dashboard/
│   │   ├── model/
│   │   ├── view/
│   │   └── viewmodel/
│   └── bookings/
│       ├── model/
│       ├── view/
│       └── viewmodel/
├── shared-components/
│   ├── AuthGuard/
│   ├── BookingModal/
│   ├── DataTable/
│   ├── FilterSelect/
│   ├── NotificationBell/
│   ├── Pagination/
│   ├── SearchInput/
│   └── StatusBadge/
├── routes/
└── docs/
```

## Main routes

- /login
- /register
- /dashboard
- /bookings

## Frontend architecture notes

The project follows a lightweight MVVM-style split:

- View: presentational UI components under each feature's view folder
- ViewModel: stateful logic, handlers, and derived data under each feature's viewmodel folder
- Model: TypeScript types and default values under each feature's model folder
- Shared components: reusable, prop-driven UI elements under src/shared-components

## Development workflow

Install dependencies:

```bash
npm install
```

Start the app locally:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## UI and experience highlights

- Dark, high-density dashboard layout
- Fixed-sidebar navigation shell
- Search and status filtering for bookings
- Modal-driven booking detail and status updates
- Notification feed inspired by operational workflows

## Notes

This frontend currently uses localStorage as a lightweight prototype data layer for rapid UI development and demo flows. The app is structured so the UI can evolve into a full API-backed experience without changing the overall feature organization.
