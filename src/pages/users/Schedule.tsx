import { useState } from "react"
import PagesWrapper from "@/components/layout/pages-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBusBookingStore } from "@/store/bus/busBooking.store"
import { useMyBookings } from "@/hooks/use-my-bookings"
import { useNavigate } from "react-router-dom"
import Booking from "@/components/booking"
import BussesAvailable from "@/components/busses-available"
import {
    Calendar,
    Clock,
    MapPin,
    Bus,
    Search,
    Filter,
    RefreshCw,
    Ticket,
    TrendingUp,
    Activity,
    Star,
    ArrowRight,
    AlertCircle,
} from "lucide-react"

const Schedule = () => {
    const { routes } = useBusBookingStore()
    const { MyBookings } = useMyBookings()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("booking")

    // Get upcoming trips from user's bookings
    const upcomingTrips = MyBookings?.filter(booking => {
        if (booking.status !== 'CONFIRMED') return false
        const travelDate = new Date(booking.schedule.travel_date)
        return travelDate >= new Date()
    }).slice(0, 5) || []

    return (
        <PagesWrapper>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">My Trips</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage your bookings and schedule new journeys
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => navigate('/book')}
                            className="gap-2"
                        >
                            <Ticket className="h-4 w-4" />
                            Book New Trip
                        </Button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 dark:bg-blue-950 p-2 rounded-lg">
                                    <Calendar className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Upcoming Trips</p>
                                    <p className="text-2xl font-bold">{upcomingTrips.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 dark:bg-green-950 p-2 rounded-lg">
                                    <Activity className="h-5 w-5 text-green-600" />
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
                                <div className="bg-purple-100 dark:bg-purple-950 p-2 rounded-lg">
                                    <MapPin className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Available Routes</p>
                                    <p className="text-2xl font-bold">{routes?.length || 0}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-orange-100 dark:bg-orange-950 p-2 rounded-lg">
                                    <Star className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Favorite Routes</p>
                                    <p className="text-2xl font-bold">3</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="booking">Book New Trip</TabsTrigger>
                        <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
                    </TabsList>

                    <TabsContent value="booking" className="space-y-6">
                        <div className="space-y-6">
                            <Booking />
                            <div className="w-full">
                                <BussesAvailable />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="upcoming" className="space-y-6">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Upcoming Trips
                                    <Badge variant="secondary">
                                        {upcomingTrips.length} trips
                                    </Badge>
                                </CardTitle>
                                <CardDescription>
                                    Your confirmed upcoming journeys
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {upcomingTrips.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="rounded-full bg-muted p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                            <Calendar className="h-8 w-8 text-muted-foreground" />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">No upcoming trips</h3>
                                        <p className="text-muted-foreground mb-4">
                                            You don't have any scheduled journeys at the moment.
                                        </p>
                                        <Button
                                            onClick={() => setActiveTab("booking")}
                                            className="gap-2"
                                        >
                                            <Search className="h-4 w-4" />
                                            Book Your First Trip
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {upcomingTrips.map((booking) => (
                                            <div
                                                key={booking.id}
                                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="flex items-start gap-4 flex-1">
                                                    <div className="bg-blue-100 dark:bg-blue-950 p-3 rounded-lg">
                                                        <Bus className="h-6 w-6 text-blue-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-semibold">
                                                                {booking.bus_assignment?.bus?.company_name || 'Unknown Company'}
                                                            </h3>
                                                            <Badge
                                                                variant={booking.status === "CONFIRMED" ? "default" : "secondary"}
                                                                className="text-xs"
                                                            >
                                                                {booking.status}
                                                            </Badge>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                            <div className="flex items-center gap-1">
                                                                <MapPin className="h-4 w-4" />
                                                                <span>
                                                                    {booking.schedule.route_origin || 'Unknown'} → {booking.schedule.route_destination || 'Unknown'}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="h-4 w-4" />
                                                                <span>
                                                                    {new Date(booking.schedule.travel_date).toLocaleDateString()} at {booking.schedule.departure_time?.slice(0, 5)}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Ticket className="h-4 w-4" />
                                                                <span>Seat {booking.seat_number}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm">
                                                    View Details
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </PagesWrapper>
    )
}

export default Schedule