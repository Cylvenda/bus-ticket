import { useForm } from "react-hook-form"
import { FieldInput, FormInput, PasswordInput } from "./field-input"
import { LoginFormSchema } from "@/schema/userSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "./ui/button"
import { companyName } from "@/lib/commonName"
import { authUserService } from "@/api/services/auth.service"
import { toast } from "react-toastify"
import { useState } from "react"
import { Spinner } from "./ui/spinner"
import { useAuthUserStore } from "@/store/auth/userAuth.store"
import { useNavigate } from "react-router-dom"

type FormLoginProps = {
  onForgotPassword: () => void;
  onRegisterClick?: () => void;
};


const FormLogin = ({ onForgotPassword, onRegisterClick }: FormLoginProps) => {

  const [loading, setLoading] = useState(false)
  const { fetchUser, user } = useAuthUserStore()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmitHandler = async (data: z.infer<typeof LoginFormSchema>) => {
    setLoading(true)

    try {
      const res = await authUserService.userLogin(data)

      if (res.status === 200 && res.data) {
        const currentUser = await fetchUser()

        if (!currentUser?.isActive) {
          navigate('/')
          return
        }

        if (currentUser.isAdmin) {
          navigate("/admin/dashboard")
          return
        }

        navigate("/dashboard")
        return
      }
    } catch (error: any) {
      const msg = error?.response?.data?.detail || "Login failed. Please check credentials."
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }


    return (
      <>
        <div >
          <form onSubmit={form.handleSubmit(onSubmitHandler)}>
            <FormInput
              title={`${companyName} Login Portal`}
              description="Login for more premium services"
              className="border-none rounded-md"
            >
              <FieldInput
                control={form.control}
                type="text"
                name="email"
                placeholder="Enter Email Address"
                label="Email Address"
              />

              <PasswordInput
                control={form.control}
                label="Password"
                name="password"
                placeholder="Enter Password"
              />

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={onRegisterClick}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Don't have an account? Register
                </button>
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                disabled={loading}
                className="bg-primary hover:bg-[#e02053] cursor-pointer"
              >
                {loading ? <Spinner /> : "Login"}
              </Button>
            </FormInput>

          </form>
        </div>
      </>
    )
  }

  export default FormLogin