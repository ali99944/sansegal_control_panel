import { Navigate, Outlet } from "react-router-dom"
import DashboardLayout from "./dashboard-layout"
import { useAppSelector } from "../../redux/hook"

export function ProtectedLayout() {
  const { isAuthenticated } = useAppSelector(
    state => state.auth
  )
  

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // If authenticated, render the dashboard layout with its nested routes
  return (
    <DashboardLayout>
        <Outlet />
    </DashboardLayout>
  )
}