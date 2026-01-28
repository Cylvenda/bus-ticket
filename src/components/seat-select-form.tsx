import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { FieldInput, FieldSelect, FormInput } from "./field-input"
import { countryOptions } from "@/lib/countries-helper"
import { Button } from "./ui/button"
import { FormTicketUserInfoSchema } from "@/schema/ticketSchema"
import { useEffect, useState } from "react"
import PassengerDetailsModel from "./passenger-details-model"
import { useBusBookingStore } from "@/store/bus/busBooking.store"
import { usePassengerStore } from "@/store/passenger/passenger.store"
import { useNavigate } from "react-router-dom"
import type { RouteStop } from "@/store/bus/bus.types"


const SeatSelectForm = () => {

    const { selectedSeat, activeSchedule, activeBus, routeStops, fetchRouteStops } = useBusBookingStore()

    const navigate = useNavigate()

    const setPassenger = usePassengerStore((state) => state.setPassenger)

    const [selectedIDType, setSelectedIDType] = useState("none")
    const [isPassengerDetailsOpen, setIsPassengerDetailsOpen] = useState(false)

    // Convert route stops to options format for the select dropdown with order numbers
    const routeOptions = routeStops.map((stop: RouteStop) => ({
        value: stop.stop_name.toLowerCase().replace(/\s+/g, '-'),
        label: `${stop.stop_order}. ${stop.stop_name}`,
        stopOrder: stop.stop_order,
        stopName: stop.stop_name
    }))

    // Sort route options by stop order to ensure proper sequence
    routeOptions.sort((a, b) => a.stopOrder - b.stopOrder)

    // Create separate options for start and end stops
    const startStopOptions = [...routeOptions] // Ascending order (1, 2, 3...)
    const endStopOptions = [...routeOptions].reverse() // Descending order (last, second-to-last, first)

    // Get route direction info
    const routeDirection = routeStops.length > 0
        ? `${routeStops[0].stop_name} → ${routeStops[routeStops.length - 1].stop_name}`
        : ""

    const form = useForm<z.infer<typeof FormTicketUserInfoSchema>>({
        resolver: zodResolver(FormTicketUserInfoSchema),
        defaultValues: {
            bus_id: undefined,
            schedule_id: undefined,
            seatNumber: "",
            idType: "none",
            idNumber: "",
            ageGroup: "adult",
            country: "TZ",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            gender: "M",
            startJournal: "",
            endJournal: ""
        }
    })

    useEffect(() => {
        if (!activeBus || !activeSchedule || !selectedSeat) return

        form.reset({
            bus_id: activeBus.id,
            schedule_id: activeSchedule.id,
            seatNumber: selectedSeat,
        })
    }, [form, activeBus, activeSchedule, selectedSeat])

    // Fetch route stops when we have an active schedule
    useEffect(() => {
        if (activeSchedule?.route_id) {
            const routeId = activeSchedule.route_id;
            console.log('Route ID:', routeId);

            if (!isNaN(routeId)) {
                fetchRouteStops(routeId);
            } else {
                console.error('Invalid route ID:', routeId);
            }
        }
    }, [activeSchedule, fetchRouteStops])


    // const {
    //     formState: { errors },
    // } = form

    // console.log("FORM ERRORS:", errors)
    // console.log("FORM ERRORS:", form.formState.errors)


    const submitFormHandler = () => {

        setIsPassengerDetailsOpen(true)
    }

    const comfirmPassengerDetailsSubmit = () => {

        setIsPassengerDetailsOpen(false)

        const formData = form.getValues()

        // Find the actual stop names from the correct options arrays based on the selected values
        const startStop = startStopOptions.find(option => option.value === formData.startJournal)
        const endStop = endStopOptions.find(option => option.value === formData.endJournal)

        const cleanedFormData = {
            ...formData,
            startJournal: startStop?.stopName || formData.startJournal,
            endJournal: endStop?.stopName || formData.endJournal
        }

        setPassenger(cleanedFormData)

        navigate("/payments-process")

        // 
        // console.log("FORM VALUES:", form.getValues())
    }

    return (
        <>
            <div>
                <form onSubmit={form.handleSubmit(submitFormHandler)} className=" flex flex-col w-full gap-3">

                    <FormInput
                        className="border-none md:border"
                    >

                        <div className="w-full flex flex-col md:flex-row gap-3 items-center justify-center">

                            <FieldSelect
                                control={form.control}
                                name="startJournal"
                                label="Select Your Starting Point"
                                options={startStopOptions}
                                placeHolder="Select From"
                            />

                            <FieldSelect
                                control={form.control}
                                name="endJournal"
                                label="Select Your Ending Point"
                                options={endStopOptions}
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
                                type="tel"
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
                                    { value: "M", label: "Male" },
                                    { value: "F", label: "Female" }
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
                                onValueChange={(value) => setSelectedIDType(value)}
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

                        {selectedIDType !== "none" && ["nida", "passport", "drivingLicense", "TIN", "voterID"].includes(selectedIDType) && (
                            <div className="flex flex-col md:flex-row gap-3">
                                <FieldInput
                                    control={form.control}
                                    type="text"
                                    label={`${selectedIDType.toUpperCase()} Number`}
                                    name="idNumber"
                                    placeholder={`Enter your ${selectedIDType.toUpperCase()} Number`}
                                    id="idNumber"
                                />
                            </div>
                        )}


                        <div className="flex flex-col items-center justify-center">
                            <div className="flex flex-row items-center justify-between w-full mb-4 mt-2 px-5 py-4 border border-primary rounded-sm">
                                <span>Total Seat Price</span>
                                <span>TZS {Number(activeSchedule?.price).toLocaleString()}</span>
                            </div>
                            <Button
                                className="w-70 cursor-pointer"
                                type="submit"
                            > Continue </Button>
                        </div>
                    </FormInput>
                </form>
            </div>

            <PassengerDetailsModel
                isPassengerDetailsOpen={isPassengerDetailsOpen}
                setIsPassengerDetailsOpen={setIsPassengerDetailsOpen}
                onConfirmPassengerDetails={comfirmPassengerDetailsSubmit}
                passengerData={form.getValues()}
            />
        </>
    )
}

export default SeatSelectForm