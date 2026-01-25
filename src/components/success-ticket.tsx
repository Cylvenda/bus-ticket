import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { TicketDataTypes } from "@/store/passenger/passenger.type"
import { Bus, MapPin, User } from "lucide-react"


const TicketCard = ({ booking }: TicketDataTypes) => {
     const { schedule, bus, passenger } = booking

     return (
          <Card className="max-w-4xl mx-auto border-primary border-2 overflow-hidden shadow-md rounded-none">

               {/* Header */}
               <div className="bg-primary text-white px-6 py-5 flex items-center justify-between -mt-6">
                    <div className="flex items-center gap-2">
                         <Bus className="w-5 h-5" />
                         <h2 className="text-lg font-semibold">BUS TICKET</h2>
                    </div>

                    <span className="font-mono text-sm">
                         #{booking.booking_id}
                    </span>
               </div>

               {/* Body */}
               <div className="grid md:grid-cols-3 gap-6 p-6">

                    {/* Route & Time */}
                    <div className="md:col-span-2 space-y-4">
                         <div className="flex items-start gap-3">
                              <MapPin className="text-red-500 mt-1" />
                              <div>
                                   <p className="text-xs text-muted-foreground">From</p>
                                   <p className="font-semibold">{schedule.origin}</p>
                              </div>
                         </div>

                         <div className="flex items-start gap-3">
                              <MapPin className="text-yellow-500 mt-1" />
                              <div>
                                   <p className="text-xs text-muted-foreground">To</p>
                                   <p className="font-semibold">{schedule.destination}</p>
                              </div>
                         </div>

                         <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                   <p className="text-muted-foreground">Date</p>
                                   <p className="font-medium">{schedule.date}</p>
                              </div>

                              <div>
                                   <p className="text-muted-foreground">Booked Seat</p>
                                   <p className="font-medium">{booking.seat_number}</p>
                              </div>

                              <div>
                                   <p className="text-muted-foreground">Departure Time</p>
                                   <p className="font-medium">{schedule.departure_time}</p>
                              </div>

                              <div>
                                   <p className="text-muted-foreground">Arrival Time</p>
                                   <p className="font-medium">{schedule.arrival_time}</p>
                              </div>
                         </div>
                    </div>

                    {/* Right Side */}
                    <div className="border-l md:pl-6 space-y-4">
                         <div>
                              <p className="text-sm text-muted-foreground">Bus Company</p>
                              <p className="font-semibold">{bus.company}</p>
                         </div>

                         <div>
                              <p className="text-sm text-muted-foreground">Plate Number</p>
                              <p className="font-medium">{bus.plate_number}</p>
                         </div>

                         <Separator />

                         <div>
                              <p className="text-sm text-muted-foreground">Passenger</p>
                              <div className="flex items-center gap-2">
                                   <User className="w-4 h-4" />
                                   <p className="font-medium">
                                        {passenger.first_name} {passenger.last_name}
                                   </p>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                   {passenger.phone}
                              </p>
                         </div>

                         <Separator />

                         <div>
                              <p className="text-sm text-muted-foreground">Amount Paid</p>
                              <p className="text-xl font-bold text-green-600">
                                   TZS {Number(booking.price_paid).toLocaleString()}
                              </p>

                              {booking.discount !== "0.00" && (
                                   <p className="text-xs text-muted-foreground">
                                        Discount: TZS {Number(booking.discount).toLocaleString()}
                                   </p>
                              )}
                         </div>
                    </div>
               </div>
          </Card>
     )
}

export default TicketCard
