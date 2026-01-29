import { useState, useEffect } from "react"
import PagesWrapper from "@/components/layout/pages-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAdminData } from "@/hooks/use-admin-data"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Ticket,
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Activity,
  Bus,
  MapPin,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react"

interface AnalyticsCard {
  title: string
  value: string | number
  change?: number
  changeType?: "increase" | "decrease"
  icon: React.ReactNode
  description: string
}

interface ChartData {
  name: string
  value: number
  change?: number
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
    error 
  } = useAdminData()

  const [selectedPeriod, setSelectedPeriod] = useState("7d")
  const [refreshing, setRefreshing] = useState(false)

  // Calculate analytics data
  const totalRevenue = bookings?.reduce((sum, booking) => sum + (booking.price_paid || 0), 0) || 0
  const activeUsers = users?.filter(user => user.is_active).length || 0
  const totalBookings = bookings?.length || 0
  const averageBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0

  // Mock trend data (in real app, this would come from backend)
  const analyticsCards: AnalyticsCard[] = [
    {
      title: "Total Revenue",
      value: `TZS ${totalRevenue.toLocaleString()}`,
      change: 12.5,
      changeType: "increase",
      icon: <DollarSign className="h-6 w-6" />,
      description: "Total revenue from all bookings"
    },
    {
      title: "Total Bookings",
      value: totalBookings,
      change: 8.2,
      changeType: "increase",
      icon: <Ticket className="h-6 w-6" />,
      description: "Total number of bookings"
    },
    {
      title: "Active Users",
      value: activeUsers,
      change: 15.3,
      changeType: "increase",
      icon: <Users className="h-6 w-6" />,
      description: "Active registered users"
    },
    {
      title: "Average Booking Value",
      value: `TZS ${Math.round(averageBookingValue).toLocaleString()}`,
      change: -2.1,
      changeType: "decrease",
      icon: <BarChart3 className="h-6 w-6" />,
      description: "Average value per booking"
    }
  ]

  // Mock chart data
  const bookingTrends: ChartData[] = [
    { name: "Mon", value: 45, change: 5 },
    { name: "Tue", value: 52, change: 8 },
    { name: "Wed", value: 38, change: -3 },
    { name: "Thu", value: 65, change: 12 },
    { name: "Fri", value: 78, change: 15 },
    { name: "Sat", value: 92, change: 18 },
    { name: "Sun", value: 58, change: -8 }
  ]

  const routePerformance = routes?.slice(0, 5).map(route => ({
    name: `${route.origin} → ${route.destination}`,
    bookings: Math.floor(Math.random() * 100) + 20,
    revenue: Math.floor(Math.random() * 1000000) + 100000,
    rating: (Math.random() * 2 + 3).toFixed(1)
  })) || []

  const topBusCompanies = busCompanies?.slice(0, 5).map(company => ({
    name: company.name,
    totalBookings: Math.floor(Math.random() * 500) + 100,
    revenue: Math.floor(Math.random() * 5000000) + 500000,
    buses: Math.floor(Math.random() * 20) + 5
  })) || []

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    setRefreshing(false)
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
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive insights and performance metrics
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={refreshing}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-2">
          {["24h", "7d", "30d", "90d", "1y"].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {period === "24h" ? "Last 24 hours" : 
               period === "7d" ? "Last 7 days" :
               period === "30d" ? "Last 30 days" :
               period === "90d" ? "Last 90 days" : "Last year"}
            </Button>
          ))}
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsCards.map((card, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                    <p className="text-2xl font-bold">{card.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                    {card.change && (
                      <div className="flex items-center gap-1 mt-2">
                        {card.changeType === "increase" ? (
                          <ArrowUpRight className="h-3 w-3 text-green-600" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-600" />
                        )}
                        <span className={`text-xs font-medium ${
                          card.changeType === "increase" ? "text-green-600" : "text-red-600"
                        }`}>
                          {Math.abs(card.change)}% from last period
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="rounded-full bg-muted p-3">
                    {card.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Analytics Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="routes">Routes</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Booking Trends */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Booking Trends
                  </CardTitle>
                  <CardDescription>
                    Daily booking activity for the selected period
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookingTrends.map((day, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-12 text-sm font-medium">{day.name}</div>
                        <div className="flex-1">
                          <Progress value={(day.value / 100) * 100} className="h-2" />
                        </div>
                        <div className="w-16 text-right">
                          <div className="text-sm font-medium">{day.value}</div>
                          {day.change && (
                            <div className={`text-xs ${
                              day.change > 0 ? "text-green-600" : "text-red-600"
                            }`}>
                              {day.change > 0 ? "+" : ""}{day.change}%
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Quick Stats
                  </CardTitle>
                  <CardDescription>
                    Key performance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Bus className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Active Buses</span>
                      </div>
                      <p className="text-2xl font-bold">{buses?.length || 0}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Total Routes</span>
                      </div>
                      <p className="text-2xl font-bold">{routes?.length || 0}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">Schedules</span>
                      </div>
                      <p className="text-2xl font-bold">{schedules?.length || 0}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium">Companies</span>
                      </div>
                      <p className="text-2xl font-bold">{busCompanies?.length || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Booking Analytics</CardTitle>
                <CardDescription>
                  Detailed booking performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Booking Analytics</h3>
                  <p className="text-muted-foreground">
                    Advanced booking analytics and charts would be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Routes Tab */}
          <TabsContent value="routes" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Route Performance</CardTitle>
                <CardDescription>
                  Top performing routes and metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routePerformance.map((route, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{route.name}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-muted-foreground">
                            {route.bookings} bookings
                          </span>
                          <span className="text-sm text-muted-foreground">
                            TZS {route.revenue.toLocaleString()}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span className="text-sm">{route.rating}</span>
                          </div>
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

          {/* Companies Tab */}
          <TabsContent value="companies" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Bus Company Performance</CardTitle>
                <CardDescription>
                  Top performing bus companies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topBusCompanies.map((company, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{company.name}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-muted-foreground">
                            {company.totalBookings} bookings
                          </span>
                          <span className="text-sm text-muted-foreground">
                            TZS {company.revenue.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {company.buses} buses
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
        </Tabs>
      </div>
    </PagesWrapper>
  )
}

export default Analytics
