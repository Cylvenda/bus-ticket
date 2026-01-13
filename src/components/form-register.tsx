import { useForm } from "react-hook-form"
import { FieldInput, FormInput, PasswordInput } from "./field-input"
import { RegisterFormSchema } from "@/schema/userSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "./ui/button"
import { companyName } from "@/lib/commonName"
import { authUserService } from "@/api/services/auth.service"
import { toast } from "react-toastify"
import { useState } from "react"
import { Spinner } from "./ui/spinner"

type FormRegisterProps = {
    onLoginClick: () => void;
};

const FormRegister = ({ onLoginClick }: FormRegisterProps) => {

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            password: "",
            username: "",
        }
    })

    const onSubmitHandler = async (
        data: z.infer<typeof RegisterFormSchema>
    ) => {

        setLoading(true)

        try {
            const res = await authUserService.userRegister(data)

            if (res.status === 201) {
                toast.success("Account created successfully. Now you can login.")
                onLoginClick()
                return
            }

        } catch (error: any) {
            const errors = error?.response?.data

            if (errors) {
                Object.entries(errors).forEach(([field, messages]) => {
                    form.setError(field as any, {
                        type: "server",
                        message: (messages as string[])[0],
                    })
                })
            } else {
                toast.error("Registration failed. Please try again.")
            }
        }finally {
            setLoading(false)
        }

    }

    return (
        <div>
            <form onSubmit={form.handleSubmit(onSubmitHandler)}>
                <FormInput
                    title={` ${companyName} Register Portal`}
                    description="Register and Login for more premeum services "
                    className="border-none rounded-md "
                >
                    <div className="w-full flex flex-col md:flex-row gap-3 items-center justify-center">
                        <FieldInput
                            control={form.control}
                            type="text"
                            name="first_name"
                            placeholder="Enter First Name"
                            label="First Name"
                        />

                        <FieldInput
                            control={form.control}
                            type="text"
                            name="last_name"
                            placeholder="Enter Last Name"
                            label="Last Name"
                        />
                    </div>

                    <div className="w-full flex flex-col md:flex-row gap-3 items-center justify-center">
                        <FieldInput
                            control={form.control}
                            type="text"
                            name="email"
                            placeholder="Enter Email Address"
                            label="Email Address"
                        />


                        <FieldInput
                            control={form.control}
                            type="text"
                            name="username"
                            placeholder="Enter Username"
                            label="Username"
                        />

                    </div>

                    <div className="w-full flex flex-col md:flex-row gap-3 items-center justify-center">
                        <FieldInput
                            control={form.control}
                            type="text"
                            name="phone"
                            placeholder="Enter Phone Number"
                            label="Phone Number"
                        />

                        <PasswordInput
                            control={form.control}
                            label="Password"
                            name="password"
                            placeholder="Enter Password"
                        />
                    </div>

                    <div className="flex justify-start items-center">
                        <button
                            type="button"
                            onClick={onLoginClick}
                            className="text-sm text-blue-500 hover:underline"
                        >
                            Have an account? Login
                        </button>
                    </div>

                    <Button  disabled={loading}
                     className="bg-primary hover:bg-[#e02053] cursor-pointer" >
                        {loading ? <Spinner  className="size-6 " /> : "Register"}
                    </Button>
                </FormInput>
            </form>
        </div>
    )
}

export default FormRegister