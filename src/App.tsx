import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const LandingPage = lazy(() => import('./features/landing/LandingPage'))
const DashboardView = lazy(() => import('./features/dashboard/view/DashboardView'))
const BookingsView = lazy(() => import('./features/bookings/view/BookingsView'))
const CustomerDashboardView = lazy(() => import('./features/customer_dashboard/view/CustomerDashboardView'))

const LoadingFallback = () => (
  <div className="h-full w-full flex items-center justify-center bg-[#FEFEFE]">
    <p className="text-[#349E64] text-sm tracking-widest uppercase animate-pulse">Loading...</p>
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/bookings" element={<BookingsView />} />

          <Route
            path="/customer/dashboard"
            element={<CustomerDashboardView />}
          />
          <Route
            path="/customer-dashboard"
            element={<CustomerDashboardView />}
          />
        </Routes>


          <Route path="*" element={<Navigate to="/" replace />} />
      </Suspense>
    </BrowserRouter>
  )
}