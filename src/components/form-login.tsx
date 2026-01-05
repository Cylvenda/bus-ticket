import { useForm } from "react-hook-form"
import { FieldInput, FormInput, PasswordInput } from "./field-input"
import { LoginFormSchema } from "@/schema/userSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "./ui/button"
import { companyName } from "@/lib/commonName"

type FormLoginProps = {
  onForgotPassword: () => void;
  onRegisterClick?: () => void;
};


const FormLogin = ({ onForgotPassword, onRegisterClick }: FormLoginProps) => {

    const form = useForm<z.infer <typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmitHandler = (data: z.infer<typeof LoginFormSchema>) => {
        console.log(data)
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
              variant="secondary"
              className="bg-primary hover:bg-[#e02053] cursor-pointer"
            >
              Login
            </Button>
          </FormInput>

            </form>
        </div>
    </>
  )
}

export default FormLogin