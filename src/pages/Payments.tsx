"use client"

import { useState } from "react"
import {
     Card,
     CardDescription,
     CardHeader,
     CardTitle,
     CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import PassengerDetailsModel from "@/components/passenger-details-model"
import { usePassengerStore } from "@/store/passenger/passenger.store"
import Header from "@/components/header"
import Footer from "@/components/sections/footer"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { toast } from "react-toastify"
import TicketCard from "@/components/success-ticket"
import { useNavigate } from "react-router-dom"


const Payments = () => { 
     const [isPassengerDetailsOpen, setIsPassengerDetailsOpen] = useState(false)
     const [paymentPhone, setPaymentPhone] = useState("")
     const [phoneError, setPhoneError] = useState<string | null>(null)
     const [booking, setBooking] = useState<any | null>(null)

     const navigate = useNavigate()

     const { updatePassenger, UserBookingCreate } = usePassengerStore()
     const passengerInfo = usePassengerStore((s) => s.passengerInfo)

     const confirmPassengerDetailsSubmit = () => {
          setIsPassengerDetailsOpen(false)
     }

     /* ---------- VALIDATION ---------- */
     const validatePhone = (value: string) => {
          if (!value) return "Phone number is required"

          const cleaned = value.replace(/\s+/g, "")
          const tzPhoneRegex = /^255[67]\d{8}$/

          if (!tzPhoneRegex.test(cleaned)) {
               return "Enter a valid Tanzania mobile number"
          }

          return null
     }

     const handlePhoneChange = (value: string) => {
          setPaymentPhone(value)
          setPhoneError(validatePhone(value))
     }

     const handlePay = async () => {
          const error = validatePhone(paymentPhone)
          setPhoneError(error)

          if (error) return

          if (!passengerInfo) {
               toast.error("Passenger details are missing")
               return
          }

          updatePassenger({
               phonePaymentNumber: paymentPhone.replace(/\s+/g, ""),
          })

          try {
               const response = await UserBookingCreate(passengerInfo)
                

               setBooking(response)

               toast.success("Booking completed successfully 🎉")
          } catch (error) {
               toast.error("Payment failed. Please try again.")
          }
     }

     const canPay = Boolean(passengerInfo && !phoneError && paymentPhone)

     return (
          <>
               <PassengerDetailsModel
                    isPassengerDetailsOpen={isPassengerDetailsOpen}
                    setIsPassengerDetailsOpen={setIsPassengerDetailsOpen}
                    onConfirmPassengerDetails={confirmPassengerDetailsSubmit}
                    passengerData={passengerInfo}
               />

               <Header />

               <div className="m-0 md:m-10 space-y-6">
                    {booking ? (
                         <>
                              <TicketCard booking={booking} />

                              <div className="flex justify-center gap-4 pt-6">
                                   <Button variant="outline" onClick={() => window.print()}>
                                        Print Ticket
                                   </Button>

                                   <Button onClick={() => {setBooking(null); navigate('/schedule')} }>
                                        Book Another Ticket
                                   </Button>
                              </div>
                         </>
                    ) : (
                         <Card className="bg-accent">
                              <CardHeader className="text-center">
                                   <CardTitle className="text-3xl">Payment Process</CardTitle>
                                   <CardDescription>
                                        Enter the mobile number to complete your payment.
                                   </CardDescription>
                              </CardHeader>

                              <CardContent className="space-y-6 w-full flex flex-col justify-center items-center">
                                   <div className="flex items-center justify-center w-full max-w-md">
                                        <Field className="w-full">
                                             <FieldLabel>Mobile Money Number</FieldLabel>
                                             <Input
                                                  type="tel"
                                                  placeholder="255712345678"
                                                  value={paymentPhone}
                                                  onChange={(e) => handlePhoneChange(e.target.value)}
                                             />

                                             {phoneError ? (
                                                  <p className="text-sm text-destructive">{phoneError}</p>
                                             ) : (
                                                  <FieldDescription>
                                                       This number will receive the payment prompt
                                                  </FieldDescription>
                                             )}
                                        </Field>
                                   </div>

                                   <div className="pt-5 grid grid-cols-2 gap-4 w-full max-w-md">
                                        <Button
                                             variant="outline"
                                             onClick={() => setIsPassengerDetailsOpen(true)}
                                        >
                                             Review Ticket Details
                                        </Button>

                                        <Button
                                             disabled={!canPay}
                                             onClick={handlePay}
                                        >
                                             Complete Payment
                                        </Button>
                                   </div>
                              </CardContent>
                         </Card>
                    )}
               </div>

               <Footer />
          </>
     )
}

export default Payments
