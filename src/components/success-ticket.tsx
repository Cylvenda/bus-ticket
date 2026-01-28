import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { TicketDataTypes } from "@/store/passenger/passenger.type"
import { Bus, MapPin, User, Clock, Calendar, CreditCard, Shield, Ticket as TicketIcon } from "lucide-react"


const TicketCard = ({ booking }: TicketDataTypes) => {
     const { schedule, bus, passenger } = booking

     return (
          <div className="max-w-4xl mx-auto">
               {/* Main Ticket Container */}
               <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">

                    {/* Ticket Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 relative">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                         <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

                         <div className="relative z-10 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                   <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                                        <TicketIcon className="w-8 h-8" />
                                   </div>
                                   <div>
                                        <h1 className="text-2xl font-bold">BUS TICKET</h1>
                                        <p className="text-blue-100 text-sm">Electronic Ticket</p>
                                   </div>
                              </div>
                              <div className="text-right">
                                   <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                                        <p className="text-xs text-blue-100">Booking ID</p>
                                        <p className="font-mono font-bold text-lg">#{booking.booking_id}</p>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Ticket Body */}
                    <div className="p-0">
                         {/* Route Section */}
                         <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-b border-gray-200">
                              <div className="flex items-center justify-between">
                                   {/* Origin */}
                                   <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                             <div className="bg-green-100 p-3 rounded-full">
                                                  <MapPin className="w-5 h-5 text-green-600" />
                                             </div>
                                             <div>
                                                  <p className="text-xs text-gray-500 uppercase tracking-wide">From</p>
                                                  <p className="text-xl font-bold text-gray-900">{schedule.origin}</p>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Bus Icon with Route Line */}
                                   <div className="flex flex-col items-center px-4">
                                        <div className="relative">
                                             <div className="w-16 h-0.5 bg-blue-300 absolute top-1/2 -left-20"></div>
                                             <div className="w-16 h-0.5 bg-blue-300 absolute top-1/2 -right-20"></div>
                                             <div className="bg-blue-600 p-3 rounded-full">
                                                  <Bus className="w-6 h-6 text-white" />
                                             </div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">Direct Route</p>
                                   </div>

                                   {/* Destination */}
                                   <div className="flex-1 text-right">
                                        <div className="flex items-center gap-3 justify-end">
                                             <div className="text-right">
                                                  <p className="text-xs text-gray-500 uppercase tracking-wide">To</p>
                                                  <p className="text-xl font-bold text-gray-900">{schedule.destination}</p>
                                             </div>
                                             <div className="bg-red-100 p-3 rounded-full">
                                                  <MapPin className="w-5 h-5 text-red-600" />
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         {/* Journey Details */}
                         <div className="grid md:grid-cols-4 gap-6 p-6">
                              <div className="flex items-center gap-3">
                                   <div className="bg-blue-100 p-2 rounded-lg">
                                        <Calendar className="w-5 h-5 text-blue-600" />
                                   </div>
                                   <div>
                                        <p className="text-xs text-gray-500">Date</p>
                                        <p className="font-semibold">{schedule.date}</p>
                                   </div>
                              </div>

                              <div className="flex items-center gap-3">
                                   <div className="bg-purple-100 p-2 rounded-lg">
                                        <Clock className="w-5 h-5 text-purple-600" />
                                   </div>
                                   <div>
                                        <p className="text-xs text-gray-500">Departure</p>
                                        <p className="font-semibold">{schedule.departure_time}</p>
                                   </div>
                              </div>

                              <div className="flex items-center gap-3">
                                   <div className="bg-orange-100 p-2 rounded-lg">
                                        <Clock className="w-5 h-5 text-orange-600" />
                                   </div>
                                   <div>
                                        <p className="text-xs text-gray-500">Arrival</p>
                                        <p className="font-semibold">{schedule.arrival_time}</p>
                                   </div>
                              </div>

                              <div className="flex items-center gap-3">
                                   <div className="bg-green-100 p-2 rounded-lg">
                                        <TicketIcon className="w-5 h-5 text-green-600" />
                                   </div>
                                   <div>
                                        <p className="text-xs text-gray-500">Seat</p>
                                        <p className="font-semibold">{booking.seat_number}</p>
                                   </div>
                              </div>
                         </div>

                         <Separator className="mx-6" />

                         {/* Passenger & Bus Info */}
                         <div className="grid md:grid-cols-2 gap-6 p-6">
                              {/* Passenger Information */}
                              <div className="space-y-4">
                                   <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <User className="w-5 h-5 text-blue-600" />
                                        Passenger Information
                                   </h3>
                                   <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                        <div>
                                             <p className="text-xs text-gray-500">Full Name</p>
                                             <p className="font-semibold">
                                                  {passenger.first_name} {passenger.last_name}
                                             </p>
                                        </div>
                                        <div>
                                             <p className="text-xs text-gray-500">Phone Number</p>
                                             <p className="font-semibold">{passenger.phone}</p>
                                        </div>
                                   </div>
                              </div>

                              {/* Bus Information */}
                              <div className="space-y-4">
                                   <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <Bus className="w-5 h-5 text-blue-600" />
                                        Bus Information
                                   </h3>
                                   <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                        <div>
                                             <p className="text-xs text-gray-500">Bus Company</p>
                                             <p className="font-semibold">{bus.company}</p>
                                        </div>
                                        <div>
                                             <p className="text-xs text-gray-500">Plate Number</p>
                                             <p className="font-semibold">{bus.plate_number}</p>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         <Separator className="mx-6" />

                         {/* Payment Details */}
                         <div className="p-6">
                              <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
                                   <CreditCard className="w-5 h-5 text-green-600" />
                                   Payment Details
                              </h3>
                              <div className="bg-green-50 rounded-lg p-4 space-y-3">
                                   <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-600">Amount Paid</p>
                                        <p className="text-2xl font-bold text-green-600">
                                             TZS {Number(booking.price_paid).toLocaleString()}
                                        </p>
                                   </div>
                                   {booking.discount !== "0.00" && (
                                        <div className="flex items-center justify-between">
                                             <p className="text-sm text-gray-600">Discount</p>
                                             <p className="font-semibold text-green-600">
                                                  -TZS {Number(booking.discount).toLocaleString()}
                                             </p>
                                        </div>
                                   )}
                                   <div className="pt-2 border-t border-green-200">
                                        <div className="flex items-center gap-2 text-green-700">
                                             <Shield className="w-4 h-4" />
                                             <p className="text-xs">Payment Verified & Secure</p>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         {/* Footer */}
                         <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                   <p>Thank you for choosing our bus service!</p>
                                   <p>Generated on {new Date().toLocaleDateString()}</p>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default TicketCard
