import { useForm } from "react-hook-form"
import { RegisterFormSchema } from "@/schema/userSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { companyName } from "@/lib/commonName"
import { FieldInput, FormInput } from "@/components/field-input"
import { Button } from "@/components/ui/button"
import PagesWrapper from "@/components/layout/pages-wrapper"

const Profile = () => {

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
    }
  })

  const onSubmitHandler = (data: z.infer<typeof RegisterFormSchema>) => {
    console.log(data)
  }

  return (
    <PagesWrapper >
      <div>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <FormInput
            title={` ${companyName} Profile Management`}
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
                name="phone"
                placeholder="Enter Phone Number"
                label="Phone Number"
              />
            </div>

            <Button variant="secondary" className="bg-primary hover:bg-[#e02053] cursor-pointer" >Update</Button>
          </FormInput>
        </form>
      </div>
    </PagesWrapper>
  )
}

export default Profile