import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../store/auth/userAuth.store" // or context

const ProtectedRoute = () => {
     const { isAuthenticated } = useAuth()

     if (!isAuthenticated) {
          return <Navigate to="/login" replace />
     }

     return <Outlet />
}

export default ProtectedRoute
