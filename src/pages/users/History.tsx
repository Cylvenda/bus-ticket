import { useState, useCallback, useMemo } from "react"
import PagesWrapper from "@/components/layout/pages-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Download,
  Search,
  Filter,
  CreditCard,
  MoreHorizontal,
  CheckCircle
} from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useMyBookings } from "@/hooks/use-my-bookings"
import type { Booking, BusAssignment, Passenger, Schedule } from "@/store/admin/admin.types"

const History = () => {
  const { MyBookings, loading, error } = useMyBookings()

  const [expandedBooking, setExpandedBooking] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("all")

  // Memoized functions to prevent re-renders
  const getStatusVariant = useCallback((status: string): "default" | "secondary" | "destructive" => {
    const variants = {
      CONFIRMED: "default" as const,
      PENDING: "secondary" as const,
      CANCELLED: "destructive" as const,
    }
    return variants[status as keyof typeof variants] || "default"
  }, [])

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }, [])

  const formatTime = useCallback((timeString: string) => {
    return timeString.slice(0, 5) // Get HH:MM from HH:MM:SS
  }, [])

  const formatDateTime = useCallback((dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }, [])

  const toggleExpanded = useCallback((bookingId: number) => {
    setExpandedBooking(prev => prev === bookingId ? null : bookingId)
  }, [])

  // Memoized filtered bookings
  const filteredBookings = useMemo(() => {
    if (!MyBookings) return []
    
    return MyBookings.filter(booking => {
      // Filter by status tab
      if (activeTab !== "all" && booking.status !== activeTab.toUpperCase()) {
        return false
      }
      
      // Filter by search query
      if (!searchQuery) return true
      
      const searchLower = searchQuery.toLowerCase()
      return (
        booking.schedule.route?.toLowerCase().includes(searchLower) ||
        booking.schedule.route_origin?.toLowerCase().includes(searchLower) ||
        booking.schedule.route_destination?.toLowerCase().includes(searchLower) ||
        booking.bus_assignment?.bus?.company_name?.toLowerCase().includes(searchLower)
      )
    })
  }, [MyBookings, activeTab, searchQuery])

  // Loading state
  if (loading) {
    return (
      <PagesWrapper>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Bus className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
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
            <div className="rounded-full bg-red-100 dark:bg-red-950 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Ticket className="h-8 w-8 text-red-600" />
            </div>
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
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Booking History</h1>
            <p className="text-muted-foreground mt-1">
              Review your past bookings and tickets ({MyBookings?.length || 0} total)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-950 p-2 rounded-lg">
                  <Ticket className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-2xl font-bold">{MyBookings?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 dark:bg-green-950 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                  <p className="text-2xl font-bold">
                    {MyBookings?.filter(b => b.status === "CONFIRMED").length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 dark:bg-yellow-950 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">
                    {MyBookings?.filter(b => b.status === "PENDING").length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 dark:bg-purple-950 p-2 rounded-lg">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">
                    TZS {MyBookings?.reduce((sum, b) => sum + (b.price_paid || 0), 0).toLocaleString() || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {/* Bookings List */}
            <div className="space-y-4">
              {filteredBookings.length === 0 ? (
                <Card className="border-0 shadow-lg">
                  <CardContent className="py-12 text-center">
                    <div className="rounded-full bg-muted p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Ticket className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No booking history</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery || activeTab !== "all" 
                        ? "No bookings match your current filters." 
                        : "You haven't made any bookings yet. Start by booking your first trip!"
                      }
                    </p>
                    <Button className="gap-2">
                      <Search className="h-4 w-4" />
                      Find Routes
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredBookings.map((booking) => (
                  <Collapsible
                    key={booking.id}
                    open={expandedBooking === booking.id}
                    onOpenChange={() => toggleExpanded(booking.id)}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-xl">
                                {booking.schedule.route || 'Unknown Route'}
                              </CardTitle>
                              <Badge variant={getStatusVariant(booking.status)}>
                                {booking.status}
                              </Badge>
                              {booking.is_paid && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  <CreditCard className="h-3 w-3 mr-1" />
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
                            <Button variant="ghost" size="sm" className="gap-2">
                              {expandedBooking === booking.id ? (
                                <>
                                  Less <ChevronUp className="h-4 w-4" />
                                </>
                              ) : (
                                <>
                                  Details <ChevronDown className="h-4 w-4" />
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
                                {booking.schedule.route_origin || 'Unknown'} → {booking.schedule.route_destination || 'Unknown'}
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
                                {booking.schedule.travel_date ? formatDate(booking.schedule.travel_date) : 'Unknown'}
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
                                TZS {booking.price_paid?.toLocaleString() || '0'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Timing Info */}
                        <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div className="flex items-center gap-2 text-sm">
                            <span>Departure: <strong>{booking.schedule.departure_time ? formatTime(booking.schedule.departure_time) : 'Unknown'}</strong></span>
                            <span>→</span>
                            <span>Arrival: <strong>{booking.schedule.arrival_time ? formatTime(booking.schedule.arrival_time) : 'Unknown'}</strong></span>
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
                                <p className="font-medium">{booking.bus_assignment?.bus?.company_name || 'Unknown'}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Plate Number</p>
                                <p className="font-medium">{booking.bus_assignment?.bus?.plate_number || 'Unknown'}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Available Seats</p>
                                <p className="font-medium">{booking.bus_assignment?.available_seats || 'Unknown'}</p>
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
                                    {booking.passenger?.first_name || ''} {booking.passenger?.last_name || ''}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium text-sm">{booking.passenger?.email || 'Not provided'}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <p className="font-medium">{booking.passenger?.phone || 'Not provided'}</p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Gender</p>
                                  <p className="font-medium">
                                    {booking.passenger?.gender === 'M' ? 'Male' : booking.passenger?.gender === 'F' ? 'Female' : 'Unknown'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Age Group</p>
                                  <p className="font-medium">{booking.passenger?.age_group || 'Unknown'}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Nationality</p>
                                  <p className="font-medium">{booking.passenger?.nationality?.toUpperCase() || 'Unknown'}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Boarding Point</p>
                                  <p className="font-medium">{booking.passenger?.boarding_point || 'Unknown'}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Dropping Point</p>
                                  <p className="font-medium">{booking.passenger?.dropping_point || 'Unknown'}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-2 pt-4">
                            <Button variant="outline" size="sm" className="gap-2">
                              <Download className="h-4 w-4" />
                              Download Ticket
                            </Button>
                            {booking.status === "CONFIRMED" && (
                              <Button variant="destructive" size="sm">
                                Cancel Booking
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" className="gap-2">
                              <MoreHorizontal className="h-4 w-4" />
                              More Options
                            </Button>
                          </div>
                        </CollapsibleContent>
                      </CardContent>
                    </Card>
                  </Collapsible>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PagesWrapper>
  )
}

export default History
