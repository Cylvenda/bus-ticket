import { type ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { formatDate, formatTime, formatCurrency } from "@/lib/utils"
import type { Booking } from "@/store/admin/admin.types"
import { CheckCircle2, XCircle, Clock, Calendar, User, Phone, MapPin, Bus } from "lucide-react"

// Utility function to format booking status
const getStatusConfig = (status: string) => {
     switch (status.toUpperCase()) {
          case "CONFIRMED":
               return {
                    label: "Confirmed",
                    variant: "default" as const,
                    icon: CheckCircle2,
                    className: "bg-green-500/10 text-green-700 border-green-500/20 hover:bg-green-500/20",
               }
          case "CANCELLED":
               return {
                    label: "Cancelled",
                    variant: "destructive" as const,
                    icon: XCircle,
                    className: "bg-red-500/10 text-red-700 border-red-500/20 hover:bg-red-500/20",
               }
          case "PENDING":
               return {
                    label: "Pending",
                    variant: "secondary" as const,
                    icon: Clock,
                    className: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20 hover:bg-yellow-500/20",
               }
          case "COMPLETED":
               return {
                    label: "Completed",
                    variant: "outline" as const,
                    icon: CheckCircle2,
                    className: "bg-blue-500/10 text-blue-700 border-blue-500/20 hover:bg-blue-500/20",
               }
          default:
               return {
                    label: status,
                    variant: "outline" as const,
                    icon: Clock,
                    className: "",
               }
     }
}

export const bookingColumns: ColumnDef<Booking>[] = [
     {
          accessorKey: "passenger",
          header: "Passenger",
          cell: ({ row }) => `${row.original.passenger?.first_name} ${row.original.passenger?.last_name}`,
          enableSorting: true,
     },
     {
          accessorKey: "route",
          header: "Route",
          cell: ({ row }) => {
               const route = row.original.schedule
               const origin = route?.route_origin || row.original.schedule.route_origin || "N/A"
               const destination = route?.route_destination || row.original.schedule.route_destination || "N/A"

               return (
                    <div className="flex items-center gap-2 min-w-[150px]">
                         <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                         <div className="flex flex-col">
                              <span className="text-sm font-medium">{origin}</span>
                              <span className="text-xs text-muted-foreground">↓</span>
                              <span className="text-sm font-medium">{destination}</span>
                         </div>
                    </div>
               )
          },
          enableSorting: false,
     },
     {
          accessorKey: "travel_date",
          header: "Travel Date",
          cell: ({ row }) => {
               const travelDate = row.original.schedule.travel_date as string
               const departureTime = row.original.schedule.departure_time

               if (!travelDate) return <span className="text-muted-foreground">N/A</span>

               return (
                    <div className="flex flex-col gap-1">
                         <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm font-medium">
                                   {formatDate(travelDate)}
                              </span>
                         </div>
                         {departureTime && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                   <Clock className="h-3 w-3" />
                                   <span>{formatTime(departureTime)}</span>
                              </div>
                         )}
                    </div>
               )
          },
          enableSorting: true,
     },
     {
          accessorKey: "seat_number",
          header: "Seat",
          cell: ({ row }) => {
               const seatNumber = row.getValue("seat_number") as string | number
               const seatCount = row.original.seat_number || 1

               return (
                    <div className="flex items-center gap-2">
                         <Bus className="h-4 w-4 text-muted-foreground" />
                         <div className="flex flex-col">
                              <span className="font-medium">{seatNumber || "N/A"}</span>
                                   <span className="text-xs text-muted-foreground">
                                        {seatCount}
                                   </span>
                         </div>
                    </div>
               )
          },
          enableSorting: true,
     },
     {
          header: "Amount",
          cell: ({ row }) => {
               const amount = row.original.price_paid as number

               return (
                    <div className="font-medium text-right">
                         {amount ? formatCurrency(parseFloat(amount)) : "N/A"}
                    </div>
               )
          },
          enableSorting: true,
     },
     {
          accessorKey: "status",
          header: "Status",
          cell: ({ row }) => {
               const status = row.getValue("status") as string
               const config = getStatusConfig(status)
               const Icon = config.icon

               return (
                    <Badge variant={config.variant} className={config.className}>
                         <Icon className="h-3 w-3 mr-1" />
                         {config.label}
                    </Badge>
               )
          },
          enableSorting: true,
     },
     {
          accessorKey: "booked_at",
          header: "Booked At",
          cell: ({ row }) => {
               const bookedAt = row.getValue("booked_at") as string

               if (!bookedAt) return <span className="text-muted-foreground">N/A</span>

               return (
                    <div className="flex flex-col gap-1 text-sm">
                         <span>{formatDate(bookedAt)}</span>
                         <span className="text-xs text-muted-foreground">
                              {formatTime(bookedAt)}
                         </span>
                    </div>
               )
          },
          enableSorting: true,
     },
]