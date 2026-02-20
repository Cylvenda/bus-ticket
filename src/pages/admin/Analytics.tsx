import { useMemo, useState } from "react"
import PagesWrapper from "@/components/layout/pages-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAdminData } from "@/hooks/use-admin-data"
import {
  BarChart3,
  Users,
  Ticket,
  Calendar,
  RefreshCw,
  Activity,
  Bus,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  MonitorSpeakerIcon,
} from "lucide-react"

type AnalyticsCard = {
  title: string
  value: string | number
  change?: number
  changeType?: "increase" | "decrease"
  icon: React.ReactNode
  description: string
}

type ChartData = {
  name: string
  value: number
}

const DAY_MS = 1000 * 60 * 60 * 24

const periodDaysMap: Record<string, number> = {
  "24h": 1,
  "7d": 7,
  "30d": 30,
  "90d": 90,
  "1y": 365,
}

const trendPercent = (current: number, previous: number) => {
  if (previous === 0) return current > 0 ? 100 : 0
  return Math.round(((current - previous) / previous) * 100)
}

const isInPeriod = (dateValue: string, days: number, offsetDays = 0) => {
  const diffDays = Math.floor((Date.now() - new Date(dateValue).getTime()) / DAY_MS)
  return diffDays >= offsetDays && diffDays < offsetDays + days
}

const Analytics = () => {
  const {
    users,
    bookings,
    routes,
    buses,
    schedules,
    busCompanies,
    loading,
    error,
    refreshData,
  } = useAdminData()

  const [selectedPeriod, setSelectedPeriod] = useState("7d")
  const [refreshing, setRefreshing] = useState(false)

  const periodDays = periodDaysMap[selectedPeriod]

  const bookingsData = useMemo(() => bookings ?? [], [bookings])
  const usersData = users ?? []
  const routesData = routes ?? []
  const busesData = buses ?? []
  const schedulesData = schedules ?? []
  const companiesData = busCompanies ?? []

  const currentBookings = useMemo(
    () => bookingsData.filter((b) => isInPeriod(b.booked_at, periodDays, 0)),
    [bookingsData, periodDays],
  )

  const previousBookings = useMemo(
    () => bookingsData.filter((b) => isInPeriod(b.booked_at, periodDays, periodDays)),
    [bookingsData, periodDays],
  )

  const totalRevenue = currentBookings.reduce((sum, b) => sum + (Number(b.price_paid) || 0), 0)
  const previousRevenue = previousBookings.reduce((sum, b) => sum + (Number(b.price_paid) || 0), 0)

  const totalBookings = currentBookings.length
  const previousTotalBookings = previousBookings.length

  const activeUsers = usersData.filter((user) => user.is_active).length
  const averageBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0
  const previousAverageBookingValue =
    previousTotalBookings > 0 ? previousRevenue / previousTotalBookings : 0

  const analyticsCards: AnalyticsCard[] = [
    {
      title: "Revenue",
      value: `TZS ${Math.round(totalRevenue).toLocaleString()}`,
      change: Math.abs(trendPercent(totalRevenue, previousRevenue)),
      changeType: trendPercent(totalRevenue, previousRevenue) >= 0 ? "increase" : "decrease",
      icon: <MonitorSpeakerIcon className="h-6 w-6" />,
      description: `Compared to previous ${selectedPeriod}`,
    },
    {
      title: "Bookings",
      value: totalBookings,
      change: Math.abs(trendPercent(totalBookings, previousTotalBookings)),
      changeType:
        trendPercent(totalBookings, previousTotalBookings) >= 0 ? "increase" : "decrease",
      icon: <Ticket className="h-6 w-6" />,
      description: `Total bookings in ${selectedPeriod}`,
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: <Users className="h-6 w-6" />,
      description: "Current active users",
    },
    {
      title: "Avg Booking Value",
      value: `TZS ${Math.round(averageBookingValue).toLocaleString()}`,
      change: Math.abs(trendPercent(averageBookingValue, previousAverageBookingValue)),
      changeType:
        trendPercent(averageBookingValue, previousAverageBookingValue) >= 0
          ? "increase"
          : "decrease",
      icon: <BarChart3 className="h-6 w-6" />,
      description: "Average price per booking",
    },
  ]

  const chartRangeDays = Math.min(periodDays, 14)
  const bookingTrends: ChartData[] = Array.from({ length: chartRangeDays }).map((_, index) => {
    const daysOffset = chartRangeDays - index - 1
    const dayDate = new Date(Date.now() - daysOffset * DAY_MS)

    const value = currentBookings.filter((booking) => {
      const bookingDate = new Date(booking.booked_at)
      return bookingDate.toDateString() === dayDate.toDateString()
    }).length

    return {
      name: dayDate.toLocaleDateString("en-US", { weekday: "short" }),
      value,
    }
  })

  const routePerformance = Object.values(
    currentBookings.reduce<Record<string, { name: string; bookings: number; revenue: number }>>(
      (acc, booking) => {
        const routeName = `${booking.schedule.route_origin || "Unknown"} → ${
          booking.schedule.route_destination || "Unknown"
        }`
        if (!acc[routeName]) {
          acc[routeName] = { name: routeName, bookings: 0, revenue: 0 }
        }

        acc[routeName].bookings += 1
        acc[routeName].revenue += Number(booking.price_paid) || 0

        return acc
      },
      {},
    ),
  )
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 5)

  const topBusCompanies = Object.values(
    currentBookings.reduce<
      Record<string, { name: string; totalBookings: number; revenue: number; buses: Set<string> }>
    >((acc, booking) => {
      const companyName = booking.bus_assignment?.bus?.company_name || "Unknown Company"
      const plate = booking.bus_assignment?.bus?.plate_number || "UNKNOWN"

      if (!acc[companyName]) {
        acc[companyName] = {
          name: companyName,
          totalBookings: 0,
          revenue: 0,
          buses: new Set<string>(),
        }
      }

      acc[companyName].totalBookings += 1
      acc[companyName].revenue += Number(booking.price_paid) || 0
      acc[companyName].buses.add(plate)

      return acc
    }, {}),
  )
    .map((company) => ({
      ...company,
      buses: company.buses.size,
    }))
    .sort((a, b) => b.totalBookings - a.totalBookings)
    .slice(0, 5)

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await refreshData()
    } finally {
      setRefreshing(false)
    }
  }

  if (loading) {
    return (
      <PagesWrapper>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="rounded-full bg-muted p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-muted-foreground animate-pulse" />
            </div>
            <p className="text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </PagesWrapper>
    )
  }

  if (error) {
    return (
      <PagesWrapper>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="rounded-full bg-red-100 dark:bg-red-950 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-red-500 mb-2">Error loading analytics</p>
            <p className="text-muted-foreground text-sm mb-4">{error}</p>
            <Button onClick={handleRefresh} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </PagesWrapper>
    )
  }

  return (
    <PagesWrapper>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Metrics are generated from live database records.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing} className="gap-2">
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {Object.keys(periodDaysMap).map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {period === "24h"
                ? "Last 24 hours"
                : period === "7d"
                ? "Last 7 days"
                : period === "30d"
                ? "Last 30 days"
                : period === "90d"
                ? "Last 90 days"
                : "Last year"}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsCards.map((card) => (
            <Card key={card.title} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                    <p className="text-2xl font-bold">{card.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                    {typeof card.change === "number" && (
                      <div className="flex items-center gap-1 mt-2">
                        {card.changeType === "increase" ? (
                          <ArrowUpRight className="h-3 w-3 text-green-600" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-600" />
                        )}
                        <span
                          className={`text-xs font-medium ${
                            card.changeType === "increase" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {card.change}% from previous period
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="rounded-full bg-muted p-3">{card.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="routes">Routes</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Booking Trends
                  </CardTitle>
                  <CardDescription>Daily bookings for selected period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookingTrends.map((day) => {
                      const maxValue = Math.max(...bookingTrends.map((d) => d.value), 1)
                      const pct = Math.round((day.value / maxValue) * 100)
                      return (
                        <div key={`${day.name}-${day.value}`} className="flex items-center gap-4">
                          <div className="w-12 text-sm font-medium">{day.name}</div>
                          <div className="flex-1">
                            <Progress value={pct} className="h-2" />
                          </div>
                          <div className="w-16 text-right text-sm font-medium">{day.value}</div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Quick Stats
                  </CardTitle>
                  <CardDescription>Live totals from database</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Bus className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Buses</span>
                      </div>
                      <p className="text-2xl font-bold">{busesData.length}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Routes</span>
                      </div>
                      <p className="text-2xl font-bold">{routesData.length}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">Schedules</span>
                      </div>
                      <p className="text-2xl font-bold">{schedulesData.length}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium">Companies</span>
                      </div>
                      <p className="text-2xl font-bold">{companiesData.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Booking Analytics</CardTitle>
                <CardDescription>Status distribution for selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Confirmed</p>
                    <p className="text-2xl font-bold">
                      {currentBookings.filter((b) => b.status === "CONFIRMED").length}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Pending/Held</p>
                    <p className="text-2xl font-bold">
                      {currentBookings.filter((b) => b.status === "PENDING" || b.status === "HELD").length}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Cancelled</p>
                    <p className="text-2xl font-bold">
                      {currentBookings.filter((b) => b.status === "CANCELLED").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="routes" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Route Performance</CardTitle>
                <CardDescription>Top routes by bookings in selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routePerformance.map((route) => (
                    <div key={route.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{route.name}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-muted-foreground">{route.bookings} bookings</span>
                          <span className="text-sm text-muted-foreground">
                            TZS {Math.round(route.revenue).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Bus Company Performance</CardTitle>
                <CardDescription>Top companies by bookings in selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topBusCompanies.map((company) => (
                    <div key={company.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{company.name}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-muted-foreground">{company.totalBookings} bookings</span>
                          <span className="text-sm text-muted-foreground">
                            TZS {Math.round(company.revenue).toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">{company.buses} buses</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PagesWrapper>
  )
}

export default Analytics
