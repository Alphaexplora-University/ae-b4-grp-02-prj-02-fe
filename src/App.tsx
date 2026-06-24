import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import AuthGuard from './shared-components/AuthGuard/AuthGuard'

const LoginView = lazy(() => import('./features/auth/view/LoginView'))
const RegisterView = lazy(() => import('./features/auth/view/RegisterView'))
const DashboardView = lazy(() => import('./features/dashboard/view/DashboardView'))
const BookingsView = lazy(() => import('./features/bookings/view/BookingsView'))

const LoadingFallback = () => (
  <div className="h-full w-full flex items-center justify-center bg-[#121212]">
    <p className="text-[#39EF8E] text-sm tracking-widest uppercase animate-pulse">Loading...</p>
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/dashboard" element={<AuthGuard><DashboardView /></AuthGuard>} />
          <Route path="/bookings" element={<AuthGuard><BookingsView /></AuthGuard>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}