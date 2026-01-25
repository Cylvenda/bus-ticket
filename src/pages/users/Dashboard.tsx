import PagesWrapper from "@/components/layout/pages-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useBusBookingStore } from "@/store/bus/busBooking.store"
import { DataTable } from "@/components/table/table-data"
import { RoutesColumns } from "@/components/table/route-column"
import {
  Ticket,
  CheckCircle,
  XCircle,
  Clock,
  Bus,
  MapPin,
  Calendar,
  TrendingUp,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type DashboardCard = {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
  bgColor: string
  description: string
  trend?: string
}

const Dashboard = () => {
  const { routes } = useBusBookingStore()

  const dashboardCards: DashboardCard[] = [
    {
      title: "Pending Tickets",
      value: 3,
      icon: <Clock className="h-8 w-8" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      description: "Awaiting confirmation",
      trend: "+2 from last week"
    },
    {
      title: "Active Tickets",
      value: 12,
      icon: <CheckCircle className="h-8 w-8" />,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      description: "Confirmed bookings",
      trend: "+5 from last week"
    },
    {
      title: "Cancelled Tickets",
      value: 5,
      icon: <XCircle className="h-8 w-8" />,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
      description: "Refund processed",
      trend: "-1 from last week"
    },
    {
      title: "Total Trips",
      value: 47,
      icon: <Bus className="h-8 w-8" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      description: "Completed journeys",
      trend: "+8 from last month"
    },
  ]

  // Mock upcoming trips
  const upcomingTrips = [
    {
      id: 1,
      origin: "Dodoma",
      destination: "Dar es Salaam",
      date: "2025-01-28",
      time: "08:00 AM",
      busCompany: "Kilimanjaro Express",
      seatNumber: "12A",
      status: "confirmed"
    },
    {
      id: 2,
      origin: "Mwanza",
      destination: "Arusha",
      date: "2025-02-02",
      time: "10:30 AM",
      busCompany: "Safari Coaches",
      seatNumber: "5B",
      status: "pending"
    },
  ]

  return (
    <PagesWrapper>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your bookings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCards.map((card) => (
            <Card key={card.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`${card.bgColor} ${card.color} p-2 rounded-lg`}>
                  {card.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
                {card.trend && (
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600">{card.trend}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Trips */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Upcoming Trips</CardTitle>
                <CardDescription>Your scheduled journeys</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-blue-100 dark:bg-blue-950 p-3 rounded-lg">
                      <Bus className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{trip.busCompany}</h3>
                        <Badge
                          variant={trip.status === "confirmed" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {trip.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{trip.origin} → {trip.destination}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{trip.date} at {trip.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Ticket className="h-4 w-4" />
                          <span>Seat {trip.seatNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
              {upcomingTrips.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Bus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No upcoming trips scheduled</p>
                  <Button className="mt-4" size="sm">
                    Book a Trip
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Available Routes */}
        <Card>
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
      </div>
    </PagesWrapper>
  )
}

export default Dashboard