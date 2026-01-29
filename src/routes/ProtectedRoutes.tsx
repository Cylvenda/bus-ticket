import { Navigate, Outlet } from "react-router-dom"
import { useAuthUserStore } from "@/store/auth/userAuth.store"
import { useEffect, useState } from "react"
import { Spinner } from "@/components/ui/spinner"

const ProtectedRoute = () => {
     const { isAuthenticated, fetchUser, loading, user } = useAuthUserStore()
     const [initialized, setInitialized] = useState(false)

     useEffect(() => {
          const init = async () => {
               await fetchUser()
               setInitialized(true)
          }
          init()
     }, [])

     if (loading || !initialized) {
          return (
               <div className="flex justify-center items-center h-screen">
                    <Spinner />
               </div>
          )
     }

     if (!isAuthenticated) return <Navigate to="/" />
     if (!user?.isActive) return <Navigate to="/activate-account" />

     return <Outlet />
}

export default ProtectedRoute
