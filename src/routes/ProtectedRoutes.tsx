import { Navigate, Outlet } from "react-router-dom"
import { useAuthUserStore } from "@/store/auth/userAuth.store"
import { useEffect, useState } from "react"
import { Spinner } from "@/components/ui/spinner" // optional loading spinner
import { userServices } from "@/api/services/user.service"
import { toast } from "react-toastify"

export const ProtectedRoute = () => {
     const { isAuthenticated, fetchUser, loading, user } = useAuthUserStore()
     const [initialized, setInitialized] = useState(false)


     useEffect(() => {
          const init = async () => {
               await fetchUser()
               setInitialized(true)
          }
          init()
     }, [fetchUser])

     if (loading || !initialized) {
          return (
               <div className="flex justify-center items-center h-screen">
                    <Spinner />
               </div>
          )
     }

     const handleResend = async () => {
          if (!user?.email) {
               toast.error("Email not found. Please log in again.")
               return
          }

          try {
               await userServices.emailActivation(user.email)
               toast.info("Activation email resent. Please check your inbox.")
          } catch (error) {
               toast.error("Failed to resend activation email. Try again later.")
          }
     }

     if (!isAuthenticated) {
          return <Navigate to="/" />
     }

     if (!user?.isActive) {
          handleResend()
          return <Navigate to="/activate-account" />
     }


     return <Outlet /> // followed with rendering nested routes
}
