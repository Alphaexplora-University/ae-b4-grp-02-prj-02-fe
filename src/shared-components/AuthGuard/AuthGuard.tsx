// Shared Component — route wrapper that checks localStorage session
// Redirects unauthenticated users to /login

import { Navigate } from 'react-router-dom'

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const session = localStorage.getItem('session')

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}