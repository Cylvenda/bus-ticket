import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { userServices } from "@/api/services/user.service"
import { toast } from "react-toastify"

type statusType = "loading" | "success" | "error"

const VerifyAccount = () => {
     const { uid, token } = useParams()
     const navigate = useNavigate()

     const [status, setStatus] = useState<statusType>("loading")

     useEffect(() => {
          const verifyAccount = async () => {

               if (!uid || !token) {
                    toast.error("Verification failed, Try again later.")
                    return
               }

               try {
                    const response = await userServices.accountActivation({ uid, token })

                    if (response.status === 200) {
                         setStatus("success")
                    }
                    setStatus("error")

               } catch (error) {
                    console.log(error)
                    setStatus("error")
               }
          }

          if (uid && token) {
               verifyAccount()
          } else {
               setStatus("error")
          }
     }, [uid, token])

     return (
          <div className="h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
               {status === "loading" && (
                    <>
                         <h1 className="text-xl font-semibold">
                              Activating your account...
                         </h1>
                         <p className="text-muted-foreground">
                              Please wait while we verify your account.
                         </p>
                    </>
               )}

               {status === "success" && (
                    <>
                         <h1 className="text-2xl font-semibold text-green-600">
                              Account Activated 🎉
                         </h1>
                         <p className="text-muted-foreground max-w-md">
                              Your account has been successfully activated.
                              You can now log in and start using the platform.
                         </p>

                         <Button onClick={() => navigate("/login")}>
                              Go to Login
                         </Button>
                    </>
               )}

               {status === "error" && (
                    <>
                         <h1 className="text-2xl font-semibold text-red-600">
                              Activation Failed
                         </h1>
                         <p className="text-muted-foreground max-w-md">
                              This activation link is invalid or has expired.
                              Please request a new activation email.
                         </p>

                         <div className="flex gap-4">
                              <Button onClick={() => navigate("/activate-account")}>
                                   Resend Email
                              </Button>
                              <Button
                                   variant="outline"
                                   onClick={() => navigate("/")}
                              >
                                   Back to Login
                              </Button>
                         </div>
                    </>
               )}
          </div>
     )
}

export default VerifyAccount
