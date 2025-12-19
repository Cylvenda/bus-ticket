import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { FieldInput, FieldSelect, FormInput } from "./field-input"
import { countryOptions } from "@/lib/countries-helper"
import { Button } from "./ui/button"
import { FormTicketUserInfoSchema } from "@/schema/ticketSchema"
import { useBusBookingStore } from "@/store/useBusBookingStore"

const routes = [
    { value: "dar-es-salaam", label: "Dar es Salaam" },
    { value: "dodoma", label: "Dodoma" },
    { value: "arusha", label: "Arusha" },
    { value: "moshi", label: "Moshi" },
    { value: "mwanza", label: "Mwanza" },
    { value: "tanga", label: "Tanga" },
    { value: "morogoro", label: "Morogoro" },
    { value: "iringa", label: "Iringa" },
    { value: "mbeya", label: "Mbeya" },
    { value: "songea", label: "Songea" },
    { value: "singida", label: "Singida" },
    { value: "tabora", label: "Tabora" },
    { value: "kigoma", label: "Kigoma" },
    { value: "shinyanga", label: "Shinyanga" },
    { value: "kahama", label: "Kahama" },
    { value: "bukoba", label: "Bukoba" },
    { value: "musoma", label: "Musoma" },
    { value: "babati", label: "Babati" },
    { value: "njombe", label: "Njombe" },
    { value: "lindi", label: "Lindi" },
    { value: "mtwara", label: "Mtwara" },
    { value: "rombo", label: "Rombo" },
]

const SeatSelectForm = () => {

    const { getTotalPrice, } = useBusBookingStore()

    const form = useForm<z.infer<typeof FormTicketUserInfoSchema>>({
        resolver: zodResolver(FormTicketUserInfoSchema),
        defaultValues: {
            seatNumber: "",
            seatPrice: "",
            idType: "none",
            idNumber: "",
            ageGroup: "adult",
            country: "Tanzania",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            gender: "null",
            startJournal: "",
            endJournal: ""
        }
    })

    const submitFormHandler = (data: z.infer<typeof FormTicketUserInfoSchema>) => {
        console.log(data)
    }

    return (
        <div>

            <form onSubmit={form.handleSubmit(submitFormHandler)} className=" flex flex-col w-full gap-3">

                <FormInput
                    title="Passenger Form details"
                    description="Please fill in your details to complete the booking."
                    className="border-none md:border"
                >

                    <div className="w-full flex flex-col md:flex-row gap-3 items-center justify-center">

                        <FieldSelect
                            control={form.control}
                            name="startJournal"
                            label="Select Your Starting Point"
                            options={routes}
                            placeHolder="Select From"
                        />

                        <FieldSelect
                            control={form.control}
                            name="endJournal"
                            label="Select Your Ending Point"
                            options={routes}
                            placeHolder="Select To"
                        />

                    </div>

                    <div className="flex flex-col md:flex-row gap-3">
                        <FieldInput
                            control={form.control}
                            type="text"
                            label="First Name"
                            name="firstName"
                            placeholder="Enter First Name"
                            id="firstName"
                        />

                        <FieldInput
                            control={form.control}
                            type="text"
                            label="Last Name"
                            name="lastName"
                            placeholder="Enter Last Name"
                            id="lastName"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-3">
                        <FieldInput
                            control={form.control}
                            type="email"
                            label="Email Address"
                            name="email"
                            placeholder="Enter your Email Address"
                            id="email"
                        />

                        <FieldInput
                            control={form.control}
                            type="phone"
                            label="Phone Number"
                            name="phone"
                            placeholder="Enter Phone Number"
                            id="phone"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-3">
                        <FieldSelect
                            placeHolder="Select Gender"
                            control={form.control}
                            label="Gender"
                            name="gender"
                            options={[
                                { value: "male", label: "Male" },
                                { value: "female", label: "Female" }
                            ]}
                        />

                        <FieldSelect
                            name="ageGroup"
                            control={form.control}
                            label="Age Group"
                            placeHolder="Select Age Group"
                            options={[
                                { value: "adult", label: "Adult", default: true },
                                { value: "child", label: "Child" },
                                { value: "infant", label: "Infant" },
                                { value: "elder", label: "Elder" },
                            ]}
                        />

                    </div>

                    <div className="flex flex-col md:flex-row gap-3">
                        <FieldSelect
                            control={form.control}
                            label="ID Type"
                            placeHolder="Chooce ID Type"
                            name="idType"
                            options={[
                                { value: "nida", label: "NIDA" },
                                { value: "passport", label: "Passport" },
                                { value: "drivingLicense", label: "Driving License" },
                                { value: "TIN", label: "TIN" },
                                { value: "voterID", label: "Voter ID" },
                                { value: "none", label: "None", default: true }
                            ]}
                        />
                        <FieldSelect
                            name="country"
                            control={form.control}
                            label="Select Nationality"
                            placeHolder="Nationality"
                            options={
                                countryOptions.map((country) => ({
                                    value: country.value,
                                    label: country.label,
                                    default: country.value === "TZ"
                                }))
                            }
                        />

                    </div>

                    <div className="flex flex-col md:flex-row gap-3">
                        <FieldInput
                            control={form.control}
                            type="text"
                            label="ID Number"
                            name="idNumber"
                            placeholder="Enter ID number"
                            id="idNumber"
                        />

                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-row items-center justify-between w-full mb-4 mt-2 px-5 py-4 border border-primary rounded-sm">
                            <span>Total</span>
                            <span>TZS {Number(getTotalPrice()).toLocaleString()}</span>
                        </div>
                        <Button className="w-70 cursor-pointer"> Continue </Button>
                    </div>
                </FormInput>
            </form>
        </div>
    )
}

export default SeatSelectForm