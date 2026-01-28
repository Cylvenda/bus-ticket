import PagesWrapper from "@/components/layout/pages-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useBusBookingStore } from "@/store/bus/busBooking.store"
import { useMyBookings } from "@/hooks/use-my-bookings"
import { DataTable } from "@/components/table/table-data"
import { RoutesColumns } from "@/components/table/route-column"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Ticket,
  CheckCircle,
  XCircle,
  Clock,
  Bus,
  MapPin,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Activity,
  Users,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Search,
  Filter
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom"

type DashboardCard = {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
  bgColor: string
  description: string
  trend?: {
    value: number
    isUp: boolean
  }
}

type TripItem = {
  id: number
  origin: string
  destination: string
  date: string
  time: string
  busCompany: string
  seatNumber: string
  status: "confirmed" | "pending" | "cancelled"
  price?: string
}

type QuickAction = {
  title: string
  description: string
  icon: React.ReactNode
  action: () => void
  color: string
}

const Dashboard = () => {
  const { routes } = useBusBookingStore()
  const { MyBookings, loading: bookingsLoading } = useMyBookings()
  const navigate = useNavigate()

  // Calculate real statistics from user's bookings
  const pendingTickets = MyBookings?.filter(b => b.status === 'PENDING').length || 0
  const activeTickets = MyBookings?.filter(b => b.status === 'CONFIRMED').length || 0
  const cancelledTickets = MyBookings?.filter(b => b.status === 'CANCELLED').length || 0
  const totalTrips = MyBookings?.length || 0
  const totalSpent = MyBookings?.reduce((sum, b) => sum + (b.price_paid || 0), 0) || 0

  // Get upcoming trips (confirmed bookings with future dates)
  const upcomingTrips = MyBookings?.filter(booking => {
    if (booking.status !== 'CONFIRMED') return false
    const travelDate = new Date(booking.schedule.travel_date)
    return travelDate > new Date()
  }).slice(0, 5) || []

  const dashboardCards: DashboardCard[] = [
    {
      title: "Pending Tickets",
      value: pendingTickets,
      icon: <Clock className="h-6 w-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      description: "Awaiting confirmation",
      trend: { value: pendingTickets > 0 ? 2 : 0, isUp: pendingTickets > 0 }
    },
    {
      title: "Active Tickets",
      value: activeTickets,
      icon: <CheckCircle className="h-6 w-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      description: "Confirmed bookings",
      trend: { value: activeTickets > 0 ? 5 : 0, isUp: activeTickets > 0 }
    },
    {
      title: "Cancelled Tickets",
      value: cancelledTickets,
      icon: <XCircle className="h-6 w-6" />,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
      description: "Refund processed",
      trend: { value: cancelledTickets > 0 ? -1 : 0, isUp: false }
    },
    {
      title: "Total Spent",
      value: `TZS ${totalSpent.toLocaleString()}`,
      icon: <TrendingUp className="h-6 w-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      description: "Total amount spent",
      trend: { value: totalSpent > 0 ? 8 : 0, isUp: totalSpent > 0 }
    }
  ]

  const quickActions: QuickAction[] = [
    {
      title: "Book New Trip",
      description: "Find and book your next journey",
      icon: <Search className="h-5 w-5" />,
      action: () => navigate('/book'),
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "View Routes",
      description: "Browse all available routes",
      icon: <MapPin className="h-5 w-5" />,
      action: () => navigate('/routes'),
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "My Bookings",
      description: "Manage your existing bookings",
      icon: <Ticket className="h-5 w-5" />,
      action: () => navigate('/history'),
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Update Profile",
      description: "Edit your personal information",
      icon: <Users className="h-5 w-5" />,
      action: () => navigate('/profile'),
      color: "bg-orange-500 hover:bg-orange-600"
    }
  ]

  return (
    <PagesWrapper>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your bookings
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Input
              placeholder="Search bookings..."
              className="w-64"
              prefix={<Search className="h-4 w-4" />}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardCards.map((card) => (
            <Card key={card.title} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`${card.bgColor} ${card.color} p-2 rounded-lg transition-transform hover:scale-110`}>
                  {card.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
                {card.trend && (
                  <div className={`flex items-center gap-1 mt-2 ${card.trend.isUp ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {card.trend.isUp ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    <span className="text-xs font-medium">
                      {card.trend.value}% from last period
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.action}
                  className={`h-auto p-4 flex flex-col items-center gap-2 text-white ${action.color} transition-all duration-300 hover:scale-105`}
                >
                  {action.icon}
                  <div className="text-center">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs opacity-90">{action.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="trips" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-96">
            <TabsTrigger value="trips">Upcoming Trips</TabsTrigger>
            <TabsTrigger value="routes">Available Routes</TabsTrigger>
          </TabsList>

          <TabsContent value="trips" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Upcoming Trips</CardTitle>
                    <CardDescription>Your scheduled journeys</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTrips.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="rounded-full bg-muted p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Bus className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No upcoming trips</h3>
                      <p className="text-muted-foreground mb-4">
                        You don't have any scheduled journeys at the moment.
                      </p>
                      <Button className="gap-2">
                        <Search className="h-4 w-4" />
                        Book Your First Trip
                      </Button>
                    </div>
                  ) : (
                    upcomingTrips.map((booking) => (
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
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="routes" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Available Routes</CardTitle>
                <CardDescription>
                  Browse and book from our popular routes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable columns={RoutesColumns} data={routes} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PagesWrapper>
  )
}

export default Dashboard