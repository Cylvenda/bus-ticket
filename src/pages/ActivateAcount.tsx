import { userServices } from "@/api/services/user.service"
import { Button } from "@/components/ui/button"
import { useAuthUserStore } from "@/store/auth/userAuth.store"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const ActivateAccount = () => {
     const navigate = useNavigate()
     const { user } = useAuthUserStore()

     const handleResend = async () => {
          if (!user?.email) {
               toast.error("Email not found. Please log in again.")
               return
          }

          try {
               await userServices.emailActivation(user.email)
               toast.info("Activation email resent. Please check your inbox.")
          } catch (error) {
               console.log(error)
               toast.error("Failed to resend activation email. Try again later.")
          }
     }


     return (
          <div className="h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
               <h1 className="text-2xl font-semibold">
                    Activate Your Account
               </h1>

               <p className="text-muted-foreground max-w-md">
                    We’ve sent an activation link to your email address.
                    Please check your inbox and click the link to activate
                    your account. If you don’t see the email, check your spam folder.
               </p>

               <div className="flex gap-4">
                    <Button onClick={handleResend}>
                         Resend Email
                    </Button>

                    <Button
                         variant="outline"
                         onClick={() => navigate("/")}
                    >
                         Back to Login
                    </Button>
               </div>
          </div>
     )
}

export default ActivateAccount
