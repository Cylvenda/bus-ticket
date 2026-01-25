import { useEffect, useState } from "react"
import PagesWrapper from "@/components/layout/pages-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  MapPin,
  DollarSign,
  User,
  Bus,
  Ticket,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  ChevronUp,
  Download
} from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface Passenger {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  age_group: string
  gender: string
  nationality: string
  boarding_point: string
  dropping_point: string
}

interface BusInfo {
  id: number
  plate_number: string
  company_name: string
}

interface BusAssignment {
  id: number
  available_seats: number
  bus: BusInfo
}

interface Schedule {
  id: number
  route: string
  route_origin: string
  route_destination: string
  travel_date: string
  departure_time: string
  arrival_time: string
  price: string
}

interface Booking {
  id: number
  schedule: Schedule
  bus_assignment: BusAssignment
  seat_number: string
  price_paid: string
  status: "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED"
  is_paid: boolean
  booked_at: string
  passenger: Passenger | null
}

interface BookingResponse {
  count: number
  next: string | null
  previous: string | null
  results: Booking[]
}

const History = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("ALL")

  useEffect(() => {
    fetchBookingHistory()
  }, [filterStatus])

  const fetchBookingHistory = async () => {
    try {
      setLoading(true)
      // Replace with your actual API endpoint
      const url = filterStatus === "ALL"
        ? '/api/my-bookings/'
        : `/api/my-bookings/?status=${filterStatus}`

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust based on your auth
        }
      })

      if (!response.ok) throw new Error('Failed to fetch bookings')

      const data: BookingResponse = await response.json()
      setBookings(data.results)
      setError(null)
    } catch (err) {
      setError('Failed to load booking history')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      CONFIRMED: "bg-green-500",
      PENDING: "bg-yellow-500",
      CANCELLED: "bg-red-500",
      COMPLETED: "bg-blue-500"
    }
    return colors[status as keyof typeof colors] || "bg-gray-500"
  }

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    const variants = {
      CONFIRMED: "default" as const,
      PENDING: "secondary" as const,
      CANCELLED: "destructive" as const,
      COMPLETED: "default" as const
    }
    return variants[status as keyof typeof variants] || "default"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5) // Get HH:MM from HH:MM:SS
  }

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const toggleExpanded = (bookingId: number) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId)
  }

  const filteredBookings = filterStatus === "ALL"
    ? bookings
    : bookings.filter(b => b.status === filterStatus)

  if (loading) {
    return (
      <PagesWrapper>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading booking history...</p>
        </div>
      </PagesWrapper>
    )
  }

  if (error) {
    return (
      <PagesWrapper>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      </PagesWrapper>
    )
  }

  return (
    <PagesWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Booking History</h1>
            <p className="text-muted-foreground mt-1">
              Review your past bookings and tickets ({bookings.length} total)
            </p>
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {["ALL", "CONFIRMED", "PENDING", "CANCELLED", "COMPLETED"].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Ticket className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No booking history available</p>
              </CardContent>
            </Card>
          ) : (
            filteredBookings.map((booking) => (
              <Collapsible
                key={booking.id}
                open={expandedBooking === booking.id}
                onOpenChange={() => toggleExpanded(booking.id)}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">
                            {booking.schedule.route}
                          </CardTitle>
                          <Badge variant={getStatusVariant(booking.status)}>
                            {booking.status}
                          </Badge>
                          {booking.is_paid && (
                            <Badge variant="outline" className="bg-green-50">
                              Paid
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="flex items-center gap-2">
                          <span className="text-sm">Booking ID: #{booking.id}</span>
                          <span>•</span>
                          <span className="text-sm">
                            Booked on {formatDateTime(booking.booked_at)}
                          </span>
                        </CardDescription>
                      </div>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          {expandedBooking === booking.id ? (
                            <>
                              Less <ChevronUp className="ml-2 h-4 w-4" />
                            </>
                          ) : (
                            <>
                              Details <ChevronDown className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Main Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 dark:bg-blue-950 p-2 rounded-lg">
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Route</p>
                          <p className="font-medium">
                            {booking.schedule.route_origin} → {booking.schedule.route_destination}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 dark:bg-green-950 p-2 rounded-lg">
                          <Calendar className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Travel Date</p>
                          <p className="font-medium">
                            {formatDate(booking.schedule.travel_date)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-purple-100 dark:bg-purple-950 p-2 rounded-lg">
                          <Ticket className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Seat Number</p>
                          <p className="font-medium text-lg">{booking.seat_number}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-yellow-100 dark:bg-yellow-950 p-2 rounded-lg">
                          <DollarSign className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Price Paid</p>
                          <p className="font-semibold text-lg">
                            TZS {parseFloat(booking.price_paid).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Timing Info */}
                    <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div className="flex items-center gap-2 text-sm">
                        <span>Departure: <strong>{formatTime(booking.schedule.departure_time)}</strong></span>
                        <span>→</span>
                        <span>Arrival: <strong>{formatTime(booking.schedule.arrival_time)}</strong></span>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <CollapsibleContent className="mt-4 space-y-4">
                      {/* Bus Information */}
                      <div className="border-t pt-4">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Bus className="h-5 w-5" />
                          Bus Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-muted/30 p-4 rounded-lg">
                          <div>
                            <p className="text-sm text-muted-foreground">Company</p>
                            <p className="font-medium">{booking.bus_assignment.bus.company_name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Plate Number</p>
                            <p className="font-medium">{booking.bus_assignment.bus.plate_number}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Available Seats</p>
                            <p className="font-medium">{booking.bus_assignment.available_seats}</p>
                          </div>
                        </div>
                      </div>

                      {/* Passenger Information */}
                      {booking.passenger && (
                        <div className="border-t pt-4">
                          <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Passenger Information
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-muted/30 p-4 rounded-lg">
                            <div>
                              <p className="text-sm text-muted-foreground">Name</p>
                              <p className="font-medium">
                                {booking.passenger.first_name} {booking.passenger.last_name}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-medium text-sm">{booking.passenger.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm text-muted-foreground">Phone</p>
                                <p className="font-medium">{booking.passenger.phone}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Gender</p>
                              <p className="font-medium">
                                {booking.passenger.gender === 'M' ? 'Male' : 'Female'}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Age Group</p>
                              <p className="font-medium">{booking.passenger.age_group}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Nationality</p>
                              <p className="font-medium">{booking.passenger.nationality.toUpperCase()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Boarding Point</p>
                              <p className="font-medium">{booking.passenger.boarding_point}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Dropping Point</p>
                              <p className="font-medium">{booking.passenger.dropping_point}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-4">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download Ticket
                        </Button>
                        {booking.status === "CONFIRMED" && (
                          <Button variant="destructive" size="sm">
                            Cancel Booking
                          </Button>
                        )}
                      </div>
                    </CollapsibleContent>
                  </CardContent>
                </Card>
              </Collapsible>
            ))
          )}
        </div>
      </div>
    </PagesWrapper>
  )
}

export default History