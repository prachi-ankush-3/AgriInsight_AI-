import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute() {
  const { user, isAuthReady } = useAuth()
  const location = useLocation()

  if (!isAuthReady) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-emerald-100/80">
        Checking session...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}