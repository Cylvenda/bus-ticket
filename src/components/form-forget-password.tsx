import { ResetFormSchema } from "@/schema/userSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { FieldInput, FormInput } from "./field-input"
import { companyName } from "@/lib/commonName"
import { Button } from "./ui/button"

type FormForgetPasswordProps = {
    onLoginClick: () => void;
    onRegisterClick?: () => void;
};

const FormForgetPassword = ({ onLoginClick, onRegisterClick }: FormForgetPasswordProps) => {

    const form = useForm<z.infer<typeof ResetFormSchema>>({
        resolver: zodResolver(ResetFormSchema),
        defaultValues: {
            email: ""
        }
    })

    const handleSubmit = (data: z.infer<typeof ResetFormSchema>) => {
        console.log(data)
    }


    return (
        <div>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormInput
                    title={`${companyName} Reset Password Form`}
                    description="Login for more premeum services "
                    className="border-none rounded-md"
                >
                    <FieldInput
                        name="email"
                        control={form.control}
                        type="text"
                        placeholder="Enter Valid Email Address"
                        label="Email Address"
                    />

                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={onLoginClick}
                            className="text-sm text-blue-500 hover:underline"
                        >
                            Back to Login
                        </button>
                        <button
                            type="button"
                            onClick={onRegisterClick}
                            className="text-sm text-blue-500 hover:underline"
                        >
                            Don't have an account? Register
                        </button>
                    </div>

                    <Button variant="secondary" className="bg-primary hover:bg-[#e02053] cursor-pointer" >Reset Password</Button>

                </FormInput>
            </form>
        </div>
    )
}

export default FormForgetPassword