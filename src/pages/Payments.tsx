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
import { CreditCard, Smartphone, Shield, Clock, CheckCircle, AlertCircle } from "lucide-react"


const Payments = () => {
     const [isPassengerDetailsOpen, setIsPassengerDetailsOpen] = useState(false)
     const [paymentPhone, setPaymentPhone] = useState("")
     const [phoneError, setPhoneError] = useState<string | null>(null)
     const [booking, setBooking] = useState<any | null>(null)
     const [isProcessing, setIsProcessing] = useState(false)
     const [paymentMethod, setPaymentMethod] = useState<'mobile' | 'card'>('mobile')
     const [cardDetails, setCardDetails] = useState({
          number: '',
          name: '',
          expiry: '',
          cvv: ''
     })
     const [cardErrors, setCardErrors] = useState<Record<string, string>>({})

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

     const validateCard = () => {
          const errors: Record<string, string> = {}

          // Card number validation
          const cardNumber = cardDetails.number.replace(/\s+/g, '')
          if (!cardNumber) {
               errors.number = 'Card number is required'
          } else if (!/^\d{16}$/.test(cardNumber)) {
               errors.number = 'Card number must be 16 digits'
          }

          // Name validation
          if (!cardDetails.name.trim()) {
               errors.name = 'Cardholder name is required'
          }

          // Expiry validation
          if (!cardDetails.expiry) {
               errors.expiry = 'Expiry date is required'
          } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) {
               errors.expiry = 'Use MM/YY format'
          }

          // CVV validation
          if (!cardDetails.cvv) {
               errors.cvv = 'CVV is required'
          } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
               errors.cvv = 'CVV must be 3 or 4 digits'
          }

          setCardErrors(errors)
          return Object.keys(errors).length === 0
     }

     const handlePhoneChange = (value: string) => {
          setPaymentPhone(value)
          setPhoneError(validatePhone(value))
     }

     const handleCardChange = (field: string, value: string) => {
          setCardDetails(prev => ({ ...prev, [field]: value }))
          // Clear error for this field when user starts typing
          if (cardErrors[field]) {
               setCardErrors(prev => ({ ...prev, [field]: '' }))
          }
     }

     const handlePay = async () => {
          if (!passengerInfo) {
               toast.error("Passenger details are missing")
               return
          }

          let isValid = true

          if (paymentMethod === 'mobile') {
               const error = validatePhone(paymentPhone)
               setPhoneError(error)
               if (error) isValid = false
          } else {
               isValid = validateCard()
          }

          if (!isValid) return

          setIsProcessing(true)

          try {
               const paymentData = {
                    ...passengerInfo,
                    paymentMethod,
                    ...(paymentMethod === 'mobile'
                         ? { phonePaymentNumber: paymentPhone.replace(/\s+/g, "") }
                         : { cardDetails }
                    )
               }

               updatePassenger(paymentData)
               const response = await UserBookingCreate(paymentData)
               setBooking(response)
               toast.success(`${paymentMethod === 'mobile' ? 'Mobile Money' : 'Credit Card'} payment completed successfully 🎉`)
          } catch (error) {
               toast.error("Payment failed. Please try again.")
          } finally {
               setIsProcessing(false)
          }
     }

     const canPay = Boolean(
          passengerInfo &&
          !isProcessing &&
          (paymentMethod === 'mobile'
               ? paymentPhone && !phoneError
               : cardDetails.number && cardDetails.name && cardDetails.expiry && cardDetails.cvv && Object.keys(cardErrors).length === 0
          )
     )

     return (
          <>
               <PassengerDetailsModel
                    isPassengerDetailsOpen={isPassengerDetailsOpen}
                    setIsPassengerDetailsOpen={setIsPassengerDetailsOpen}
                    onConfirmPassengerDetails={confirmPassengerDetailsSubmit}
                    passengerData={passengerInfo}
               />

               <Header />

               <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                         {booking ? (
                              <div className="space-y-6">
                                   <div className="text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                             <CheckCircle className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                                        <p className="text-gray-600">Your bus ticket has been booked successfully</p>
                                   </div>
                                   <TicketCard booking={booking} />
                                   <div className="flex justify-center gap-4 pt-6">
                                        <Button variant="outline" onClick={() => window.print()} className="flex items-center gap-2">
                                             <CreditCard className="w-4 h-4" />
                                             Print Ticket
                                        </Button>
                                        <Button onClick={() => { setBooking(null); navigate('/schedule') }} className="flex items-center gap-2">
                                             Book Another Ticket
                                        </Button>
                                   </div>
                              </div>
                         ) : (
                              <div className="grid lg:grid-cols-3 gap-8">
                                   {/* Booking Summary */}
                                   <div className="lg:col-span-1">
                                        <Card className="sticky top-8">
                                             <CardHeader>
                                                  <CardTitle className="flex items-center gap-2">
                                                       <CreditCard className="w-5 h-5" />
                                                       Booking Summary
                                                  </CardTitle>
                                             </CardHeader>
                                             <CardContent className="space-y-4">
                                                  {passengerInfo ? (
                                                       <>
                                                            <div className="space-y-3">
                                                                 <div className="flex justify-between">
                                                                      <span className="text-sm text-gray-600">Route:</span>
                                                                      <span className="text-sm font-medium">
                                                                           {passengerInfo.startJournal} → {passengerInfo.endJournal}
                                                                      </span>
                                                                 </div>
                                                                 <div className="flex justify-between">
                                                                      <span className="text-sm text-gray-600">Passenger:</span>
                                                                      <span className="text-sm font-medium">
                                                                           {passengerInfo.firstName} {passengerInfo.lastName}
                                                                      </span>
                                                                 </div>
                                                                 <div className="flex justify-between">
                                                                      <span className="text-sm text-gray-600">Seat:</span>
                                                                      <span className="text-sm font-medium">{passengerInfo.seatNumber}</span>
                                                                 </div>
                                                                 <div className="flex justify-between">
                                                                      <span className="text-sm text-gray-600">Price:</span>
                                                                      <span className="text-lg font-bold text-green-600">
                                                                           TZS {Number(passengerInfo.price || 0).toLocaleString()}
                                                                      </span>
                                                                 </div>
                                                            </div>
                                                            <div className="pt-4 border-t">
                                                                 <Button
                                                                      variant="outline"
                                                                      onClick={() => setIsPassengerDetailsOpen(true)}
                                                                      className="w-full"
                                                                 >
                                                                      Review Details
                                                                 </Button>
                                                            </div>
                                                       </>
                                                  ) : (
                                                       <div className="text-center py-8 text-gray-500">
                                                            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                                                            <p className="text-sm">No booking details found</p>
                                                       </div>
                                                  )}
                                             </CardContent>
                                        </Card>
                                   </div>

                                   {/* Payment Form */}
                                   <div className="lg:col-span-2">
                                        <Card>
                                             <CardHeader className="text-center pb-8">
                                                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                                       {paymentMethod === 'mobile' ? (
                                                            <Smartphone className="w-8 h-8 text-blue-600" />
                                                       ) : (
                                                            <CreditCard className="w-8 h-8 text-blue-600" />
                                                       )}
                                                  </div>
                                                  <CardTitle className="text-3xl mb-2">Complete Payment</CardTitle>
                                                  <CardDescription className="text-lg">
                                                       {paymentMethod === 'mobile'
                                                            ? 'Enter your mobile money number to complete your bus ticket booking'
                                                            : 'Enter your credit card details to complete your bus ticket booking'
                                                       }
                                                  </CardDescription>
                                             </CardHeader>

                                             <CardContent className="space-y-8">
                                                  {/* Payment Methods */}
                                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                       <div
                                                            className={`text-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'mobile'
                                                                 ? 'border-blue-500 bg-blue-50'
                                                                 : 'border-gray-200 hover:border-gray-300'
                                                                 }`}
                                                            onClick={() => setPaymentMethod('mobile')}
                                                       >
                                                            <Smartphone className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === 'mobile' ? 'text-blue-600' : 'text-gray-400'
                                                                 }`} />
                                                            <h3 className={`font-semibold ${paymentMethod === 'mobile' ? 'text-blue-900' : 'text-gray-600'
                                                                 }`}>Mobile Money</h3>
                                                            <p className="text-sm text-gray-600">Mix By Yas, M-Pesa, Halopesa, Airtel Money</p>
                                                       </div>
                                                       <div
                                                            className={`text-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'card'
                                                                 ? 'border-blue-500 bg-blue-50'
                                                                 : 'border-gray-200 hover:border-gray-300'
                                                                 }`}
                                                            onClick={() => setPaymentMethod('card')}
                                                       >
                                                            <CreditCard className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-400'
                                                                 }`} />
                                                            <h3 className={`font-semibold ${paymentMethod === 'card' ? 'text-blue-900' : 'text-gray-600'
                                                                 }`}>Credit Card</h3>
                                                            <p className="text-sm text-gray-600">Visa, Mastercard, American Express</p>
                                                       </div>
                                                  </div>

                                                  {/* Payment Form Fields */}
                                                  {paymentMethod === 'mobile' ? (
                                                       <div className="max-w-md mx-auto">
                                                            <Field className="w-full">
                                                                 <FieldLabel className="text-base font-semibold">Mobile Money Number</FieldLabel>
                                                                 <Input
                                                                      type="tel"
                                                                      placeholder="255712345678"
                                                                      value={paymentPhone}
                                                                      onChange={(e) => handlePhoneChange(e.target.value)}
                                                                      className="text-lg h-12"
                                                                      disabled={isProcessing}
                                                                 />
                                                                 {phoneError ? (
                                                                      <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                                                                           <AlertCircle className="w-4 h-4" />
                                                                           {phoneError}
                                                                      </p>
                                                                 ) : (
                                                                      <FieldDescription className="text-sm">
                                                                           You'll receive a payment prompt on this number
                                                                      </FieldDescription>
                                                                 )}
                                                            </Field>
                                                       </div>
                                                  ) : (
                                                       <div className="max-w-md mx-auto space-y-4">
                                                            <Field>
                                                                 <FieldLabel className="text-base font-semibold">Card Number</FieldLabel>
                                                                 <Input
                                                                      type="text"
                                                                      placeholder="1234 5678 9012 3456"
                                                                      value={cardDetails.number}
                                                                      onChange={(e) => handleCardChange('number', e.target.value)}
                                                                      className="text-lg h-12"
                                                                      disabled={isProcessing}
                                                                      maxLength={19}
                                                                 />
                                                                 {cardErrors.number && (
                                                                      <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                                                                           <AlertCircle className="w-4 h-4" />
                                                                           {cardErrors.number}
                                                                      </p>
                                                                 )}
                                                            </Field>

                                                            <Field>
                                                                 <FieldLabel className="text-base font-semibold">Cardholder Name</FieldLabel>
                                                                 <Input
                                                                      type="text"
                                                                      placeholder="John Doe"
                                                                      value={cardDetails.name}
                                                                      onChange={(e) => handleCardChange('name', e.target.value)}
                                                                      className="text-lg h-12"
                                                                      disabled={isProcessing}
                                                                 />
                                                                 {cardErrors.name && (
                                                                      <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                                                                           <AlertCircle className="w-4 h-4" />
                                                                           {cardErrors.name}
                                                                      </p>
                                                                 )}
                                                            </Field>

                                                            <div className="grid grid-cols-2 gap-4">
                                                                 <Field>
                                                                      <FieldLabel className="text-base font-semibold">Expiry</FieldLabel>
                                                                      <Input
                                                                           type="text"
                                                                           placeholder="MM/YY"
                                                                           value={cardDetails.expiry}
                                                                           onChange={(e) => handleCardChange('expiry', e.target.value)}
                                                                           className="text-lg h-12"
                                                                           disabled={isProcessing}
                                                                           maxLength={5}
                                                                      />
                                                                      {cardErrors.expiry && (
                                                                           <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                                                                                <AlertCircle className="w-4 h-4" />
                                                                                {cardErrors.expiry}
                                                                           </p>
                                                                      )}
                                                                 </Field>

                                                                 <Field>
                                                                      <FieldLabel className="text-base font-semibold">CVV</FieldLabel>
                                                                      <Input
                                                                           type="text"
                                                                           placeholder="123"
                                                                           value={cardDetails.cvv}
                                                                           onChange={(e) => handleCardChange('cvv', e.target.value)}
                                                                           className="text-lg h-12"
                                                                           disabled={isProcessing}
                                                                           maxLength={4}
                                                                      />
                                                                      {cardErrors.cvv && (
                                                                           <p className="text-sm text-destructive flex items-center gap-1 mt-1">
                                                                                <AlertCircle className="w-4 h-4" />
                                                                                {cardErrors.cvv}
                                                                           </p>
                                                                      )}
                                                                 </Field>
                                                            </div>
                                                       </div>
                                                  )}

                                                  {/* Security Notice */}
                                                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                                       <div className="flex items-start gap-3">
                                                            <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                                                            <div>
                                                                 <h4 className="font-semibold text-amber-800">Secure Payment</h4>
                                                                 <p className="text-sm text-amber-700 mt-1">
                                                                      Your payment information is encrypted and secure. You'll receive a confirmation {paymentMethod === 'mobile' ? 'SMS' : 'email'} after successful payment.
                                                                 </p>
                                                            </div>
                                                       </div>
                                                  </div>

                                                  {/* Action Buttons */}
                                                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                                       <Button
                                                            variant="outline"
                                                            onClick={() => navigate('/schedule')}
                                                            className="flex-1"
                                                            disabled={isProcessing}
                                                       >
                                                            Cancel
                                                       </Button>
                                                       <Button
                                                            disabled={!canPay || isProcessing}
                                                            onClick={handlePay}
                                                            className="flex-1 text-lg h-12"
                                                       >
                                                            {isProcessing ? (
                                                                 <div className="flex items-center gap-2">
                                                                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                                      Processing...
                                                                 </div>
                                                            ) : (
                                                                 <div className="flex items-center gap-2">
                                                                      {paymentMethod === 'mobile' ? (
                                                                           <>
                                                                                <Smartphone className="w-5 h-5" />
                                                                                Complete Payment
                                                                           </>
                                                                      ) : (
                                                                           <>
                                                                                <CreditCard className="w-5 h-5" />
                                                                                Pay Now
                                                                           </>
                                                                      )}
                                                                 </div>
                                                            )}
                                                       </Button>
                                                  </div>

                                                  {/* Help Section */}
                                                  <div className="text-center text-sm text-gray-600">
                                                       <div className="flex items-center justify-center gap-2 mb-2">
                                                            <Clock className="w-4 h-4" />
                                                            <span>Payment usually takes 2-3 minutes</span>
                                                       </div>
                                                       <p>Need help? Contact support at +255 123 456 789</p>
                                                  </div>
                                             </CardContent>
                                        </Card>
                                   </div>
                              </div>
                         )}
                    </div>
               </div>

               <Footer />
          </>
     )
}

export default Payments
