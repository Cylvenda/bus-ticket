import { useForm } from "react-hook-form"
import { RegisterFormSchema } from "@/schema/userSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { companyName } from "@/lib/commonName"
import { FieldInput, FormInput } from "@/components/field-input"
import { Button } from "@/components/ui/button"
import PagesWrapper from "@/components/pages-wrapper"
import { useAuthUserStore } from "@/store/auth/userAuth.store"
import { useEffect } from "react"

const Profile = () => {
  const { user } = useAuthUserStore()

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      username: "",
    },
  })

  useEffect(() => {
    if (user) {
      form.reset({
        first_name: user.firstName ?? "",
        last_name: user.lastName ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        username: user.username ?? "",
      })
    }
  }, [user, form])

  const onSubmitHandler = (data: z.infer<typeof RegisterFormSchema>) => {
    console.log("Updated profile data:", data)
  }

  return (
    <PagesWrapper>
      <form onSubmit={form.handleSubmit(onSubmitHandler)}>
        <FormInput
          title={`${companyName} Profile Management`}
          className="border-none rounded-md"
        >
          {/* Name Fields */}
          <div className="w-full flex flex-col md:flex-row gap-3">
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

          {/* Email & Phone */}
          <div className="w-full flex flex-col md:flex-row gap-3 mt-3">
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

          {/* Username */}
          <div className="w-full mt-3">
            <FieldInput
              control={form.control}
              type="text"
              name="username"
              placeholder="Enter Username"
              label="Username"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <Button
              variant="secondary"
              className="bg-primary hover:bg-[#e02053] cursor-pointer"
            >
              Update
            </Button>
          </div>
        </FormInput>
      </form>
    </PagesWrapper>
  )
}

export default Profile
