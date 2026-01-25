// @/components/cards/booking-mobile-card.tsx

import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, User, Phone, DollarSign, Hash } from "lucide-react"
import { formatDate, formatTime, formatCurrency } from "@/lib/utils"
import type { Booking } from "@/store/admin/admin.types"


const getStatusConfig = (status: string) => {
     switch (status) {
          case "CONFIRMED":
               return {
                    label: "Confirmed",
                    variant: "default" as const,
                    className: "bg-green-500/10 text-green-700 border-green-500/20",
               }
          case "CANCELLED":
               return {
                    label: "Cancelled",
                    variant: "destructive" as const,
                    className: "bg-red-500/10 text-red-700 border-red-500/20",
               }
          case "PENDING":
               return {
                    label: "Pending",
                    variant: "secondary" as const,
                    className: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
               }
          default:
               return {
                    label: status,
                    variant: "outline" as const,
                    className: "",
               }
     }
}

export const BookingMobileCard = (booking :Booking) => {
     const statusConfig = getStatusConfig(booking.status)
     const origin = booking.schedule.route || "N/A"
     const destination = booking.schedule.route_destination || "N/A"

     return (
          <div className="space-y-3">
               {/* Header with Reference and Status */}
               <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                         <Hash className="h-4 w-4 text-muted-foreground" />
                         <span className="font-mono text-sm font-medium">
                              {booking.booked_at}
                         </span>
                    </div>
                    <Badge variant={statusConfig.variant} className={statusConfig.className}>
                         {statusConfig.label}
                    </Badge>
               </div>

               {/* Passenger Info */}
               <div className="space-y-2">
                    <div className="flex items-center gap-2">
                         <User className="h-4 w-4 text-muted-foreground" />
                         <span className="font-medium">{booking.passenger.email}</span>
                    </div>
                    {booking.passenger.phone && (
                         <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-4 w-4" />
                              <span>{booking.passenger.phone}</span>
                         </div>
                    )}
               </div>

               {/* Route */}
               <div className="flex items-start gap-2 bg-muted/50 rounded-md p-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                         <div className="font-medium text-sm">{origin}</div>
                         <div className="text-xs text-muted-foreground my-1">↓</div>
                         <div className="font-medium text-sm">{destination}</div>
                    </div>
               </div>

               {/* Travel Details */}
               <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                         <Calendar className="h-4 w-4 text-muted-foreground" />
                         <span>{formatDate(booking.schedule.travel_date as string)}</span>
                    </div>
                    { booking.schedule.departure_time && (
                         <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{formatTime(booking.schedule.departure_time)}</span>
                         </div>
                    )}
               </div>

               {/* Price and Seat */}
               <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-sm text-muted-foreground">
                         Seat: <span className="font-medium text-foreground">{booking.seat_number || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold">
                         <DollarSign className="h-4 w-4" />
                         <span>{formatCurrency(booking.price_paid, "TZS")}</span>
                    </div>
               </div>
          </div>
     )
}