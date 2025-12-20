import { useForm } from "react-hook-form"
import { FieldInput, FormInput, PasswordInput } from "./field-input"
import { LoginFormSchema } from "@/schema/userSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "./ui/button"

const FormLogin = () => {

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
                    title="Bus Booking Login Form"
                    description="Login for more premeum services "
                      className="border-none rounded-none"
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
                      <Button variant="secondary" className="bg-primary hover:bg-[#e02053] cursor-pointer" >Login</Button>
                </FormInput>
            </form>
        </div>
    </>
  )
}

export default FormLogin