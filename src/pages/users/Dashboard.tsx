import PagesWrapper from "@/components/layout/pages-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useBusBookingStore } from "@/store/bus/busBooking.store"
import { useMyBookings } from "@/hooks/use-my-bookings"
import { DataTable } from "@/components/table/table-data"
import { RoutesColumns } from "@/components/table/route-column"
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
  ArrowRight,
  Activity,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
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

type QuickAction = {
  title: string
  description: string
  icon: React.ReactNode
  action: () => void
  color: string
}

const DAY_MS = 1000 * 60 * 60 * 24

const trendPercent = (current: number, previous: number) => {
  if (previous === 0) return current > 0 ? 100 : 0
  return Math.round(((current - previous) / previous) * 100)
}

const inRangeDays = (date: string, days: number, offset = 0) => {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / DAY_MS)
  return diff >= offset && diff < offset + days
}

const Dashboard = () => {
  const { routes } = useBusBookingStore()
  const { MyBookings, loading: bookingsLoading, error: bookingsError } = useMyBookings()
  const navigate = useNavigate()

  if (bookingsLoading) {
    return (
      <PagesWrapper>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="rounded-full bg-muted p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Activity className="h-8 w-8 text-muted-foreground animate-pulse" />
            </div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </PagesWrapper>
    )
  }

  if (bookingsError) {
    return (
      <PagesWrapper>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="rounded-full bg-red-100 dark:bg-red-950 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-red-500 mb-2">Error loading dashboard</p>
            <p className="text-muted-foreground text-sm mb-4">{bookingsError}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </PagesWrapper>
    )
  }

  const bookingsData = MyBookings ?? []

  const pendingTickets = bookingsData.filter((b) => b.status === "PENDING" || b.status === "HELD").length
  const activeTickets = bookingsData.filter((b) => b.status === "CONFIRMED").length
  const cancelledTickets = bookingsData.filter((b) => b.status === "CANCELLED").length
  const totalSpent = bookingsData.reduce((sum, b) => sum + (Number(b.price_paid) || 0), 0)

  const pendingCurrent = bookingsData.filter(
    (b) => (b.status === "PENDING" || b.status === "HELD") && inRangeDays(b.booked_at, 30, 0),
  ).length
  const pendingPrevious = bookingsData.filter(
    (b) => (b.status === "PENDING" || b.status === "HELD") && inRangeDays(b.booked_at, 30, 30),
  ).length

  const activeCurrent = bookingsData.filter(
    (b) => b.status === "CONFIRMED" && inRangeDays(b.booked_at, 30, 0),
  ).length
  const activePrevious = bookingsData.filter(
    (b) => b.status === "CONFIRMED" && inRangeDays(b.booked_at, 30, 30),
  ).length

  const cancelledCurrent = bookingsData.filter(
    (b) => b.status === "CANCELLED" && inRangeDays(b.booked_at, 30, 0),
  ).length
  const cancelledPrevious = bookingsData.filter(
    (b) => b.status === "CANCELLED" && inRangeDays(b.booked_at, 30, 30),
  ).length

  const spentCurrent = bookingsData
    .filter((b) => inRangeDays(b.booked_at, 30, 0))
    .reduce((sum, b) => sum + (Number(b.price_paid) || 0), 0)
  const spentPrevious = bookingsData
    .filter((b) => inRangeDays(b.booked_at, 30, 30))
    .reduce((sum, b) => sum + (Number(b.price_paid) || 0), 0)

  const pendingTrend = trendPercent(pendingCurrent, pendingPrevious)
  const activeTrend = trendPercent(activeCurrent, activePrevious)
  const cancelledTrend = trendPercent(cancelledCurrent, cancelledPrevious)
  const spentTrend = trendPercent(spentCurrent, spentPrevious)

  const upcomingTrips = bookingsData
    .filter((booking) => {
      if (booking.status !== "CONFIRMED") return false
      const travelDate = booking.schedule?.travel_date
      if (!travelDate) return false
      return new Date(travelDate) > new Date()
    })
    .slice(0, 5)

  const dashboardCards: DashboardCard[] = [
    {
      title: "Pending Tickets",
      value: pendingTickets,
      icon: <Clock className="h-6 w-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      description: "Awaiting confirmation",
      trend: { value: Math.abs(pendingTrend), isUp: pendingTrend >= 0 },
    },
    {
      title: "Active Tickets",
      value: activeTickets,
      icon: <CheckCircle className="h-6 w-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      description: "Confirmed bookings",
      trend: { value: Math.abs(activeTrend), isUp: activeTrend >= 0 },
    },
    {
      title: "Cancelled Tickets",
      value: cancelledTickets,
      icon: <XCircle className="h-6 w-6" />,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
      description: "Cancelled bookings",
      trend: { value: Math.abs(cancelledTrend), isUp: cancelledTrend >= 0 },
    },
    {
      title: "Total Spent",
      value: `TZS ${Math.round(totalSpent).toLocaleString()}`,
      icon: <TrendingUp className="h-6 w-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      description: "Total amount spent",
      trend: { value: Math.abs(spentTrend), isUp: spentTrend >= 0 },
    },
  ]

  const quickActions: QuickAction[] = [
    {
      title: "Book New Trip",
      description: "Find and book your next journey",
      icon: <Search className="h-5 w-5" />,
      action: () => navigate("/book"),
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "View Routes",
      description: "Browse all available routes",
      icon: <MapPin className="h-5 w-5" />,
      action: () => navigate("/routes"),
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "My Bookings",
      description: "Manage your existing bookings",
      icon: <Ticket className="h-5 w-5" />,
      action: () => navigate("/history"),
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Update Profile",
      description: "Edit your personal information",
      icon: <Users className="h-5 w-5" />,
      action: () => navigate("/profile"),
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ]

  return (
    <PagesWrapper>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Live data based on your booking history</p>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardCards.map((card) => (
            <Card
              key={card.title}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                <div className={`${card.bgColor} ${card.color} p-2 rounded-lg transition-transform hover:scale-110`}>
                  {card.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                {card.trend && (
                  <div
                    className={`flex items-center gap-1 mt-2 ${card.trend.isUp ? "text-green-600" : "text-red-600"}`}
                  >
                    {card.trend.isUp ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    <span className="text-xs font-medium">{card.trend.value}% vs previous 30 days</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {!bookingsData.length ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="py-12 text-center">
              <div className="rounded-full bg-muted p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Ticket className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Welcome to your dashboard!</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                You haven't made any bookings yet. Start by booking your first bus ticket.
              </p>
              <Button onClick={() => navigate("/book")} className="gap-2">
                <Bus className="h-4 w-4" />
                Book Your First Trip
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                <CardDescription>Common tasks you might want to perform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action) => (
                    <Button
                      key={action.title}
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
                      {!upcomingTrips.length ? (
                        <div className="text-center py-12">
                          <div className="rounded-full bg-muted p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <Bus className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <h3 className="text-lg font-semibold mb-2">No upcoming trips</h3>
                          <p className="text-muted-foreground mb-4">
                            You don't have any scheduled journeys at the moment.
                          </p>
                          <Button className="gap-2" onClick={() => navigate("/book")}>
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
                                    {booking.bus_assignment?.bus?.company_name || "Unknown Company"}
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
                                      {booking.schedule.route_origin || "Unknown"} → {booking.schedule.route_destination || "Unknown"}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                      {booking.schedule.travel_date
                                        ? new Date(booking.schedule.travel_date).toLocaleDateString()
                                        : "N/A"}
                                      {" "}at {booking.schedule.departure_time?.slice(0, 5)}
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
                    <CardDescription>Browse and book from our popular routes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DataTable columns={RoutesColumns} data={routes} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </PagesWrapper>
  )
}

export default Dashboard
