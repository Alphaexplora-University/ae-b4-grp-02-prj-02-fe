// Shared Component — route wrapper for the customer portal
// Redirects unauthenticated customers to /customer/login

import { Navigate } from 'react-router-dom'

interface CustomerAuthGuardProps {
  children: React.ReactNode
}

export default function CustomerAuthGuard({ children }: CustomerAuthGuardProps) {
  const session = localStorage.getItem('customer_session')

  if (!session) {
    return <Navigate to="/customer/login" replace />
  }

  return <>{children}</>
}
