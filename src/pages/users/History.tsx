import { useState } from "react"
import PagesWrapper from "@/components/layout/pages-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMyBookings } from "@/hooks/use-my-bookings"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

const History = () => {
  const { MyBookings, loading, error } = useMyBookings()

  // Loading state
  if (loading) {
    return (
      <PagesWrapper>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground">Loading booking history...</p>
          </div>
        </div>
      </PagesWrapper>
    )
  }

  // Error state
  if (error) {
    return (
      <PagesWrapper>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-500 mb-2">Error loading bookings</p>
            <p className="text-muted-foreground text-sm">{error}</p>
          </div>
        </div>
      </PagesWrapper>
    )
  }

  return (
    <PagesWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booking History</h1>
          <p className="text-muted-foreground mt-1">
            Review your past bookings and tickets ({MyBookings?.length || 0} total)
          </p>
        </div>

        {MyBookings?.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="py-12 text-center">
              <h3 className="text-lg font-semibold mb-2">No booking history</h3>
              <p className="text-muted-foreground">
                You haven't made any bookings yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {MyBookings?.map((booking) => (
              <Card key={booking.id} className="border shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {booking.schedule?.route_origin} → {booking.schedule?.route_destination}
                    </CardTitle>
                    <Badge
                      variant={booking.is_paid ? "default" : "secondary"}
                      className={booking.is_paid ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                    >
                      {booking.is_paid ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground">Booking ID</p>
                      <p className="font-mono">#{booking.id}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Seat Number</p>
                      <p>{booking.seat_number}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Price Paid</p>
                      <p className="font-semibold">TZS {booking.price_paid.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Travel Date</p>
                      <p>
                        {booking.schedule?.travel_date &&
                          format(new Date(booking.schedule.travel_date), 'MMM dd, yyyy')
                        }
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Departure Time</p>
                      <p>{booking.schedule?.departure_time}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Arrival Time</p>
                      <p>{booking.schedule?.arrival_time}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Bus Company</p>
                      <p>{booking.bus_assignment?.bus?.company_name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Bus Plate</p>
                      <p>{booking.bus_assignment?.bus?.plate_number || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Booked At</p>
                      <p>
                        {booking.booked_at &&
                          format(new Date(booking.booked_at), 'MMM dd, yyyy HH:mm')
                        }
                      </p>
                    </div>
                  </div>

                  {booking.passenger && (
                    <div className="pt-3 border-t">
                      <p className="font-medium text-muted-foreground mb-2">Passenger Details</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-muted-foreground">Name</p>
                          <p>{booking.passenger.first_name} {booking.passenger.last_name}</p>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground">Email</p>
                          <p>{booking.passenger.email}</p>
                        </div>
                        <div>
                          <p className="font-medium text-muted-foreground">Phone</p>
                          <p>{booking.passenger.phone}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PagesWrapper>
  )
}

export default History
