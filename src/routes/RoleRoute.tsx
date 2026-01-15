import { Navigate, Outlet } from "react-router-dom"
import { useAuthUserStore } from "@/store/auth/userAuth.store"

interface RoleRouteProps {
  allowAdmin?: boolean
}

export const RoleRoute: React.FC<RoleRouteProps> = ({ allowAdmin = true }) => {
  const { user } = useAuthUserStore()

  if (allowAdmin && !user?.isAdmin) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}
