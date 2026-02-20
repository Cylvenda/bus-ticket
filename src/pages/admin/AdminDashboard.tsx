import PagesWrapper from "@/components/layout/pages-wrapper"
import { CardHeaderCount } from "@/components/cards/dashboard-counts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAdminData } from "@/hooks/use-admin-data"

import {
  Book,
  BookCheck,
  BookMinusIcon,
  BusFrontIcon,
  CalendarCheck,
  Route,
  Users,
  UserCog,
  TrendingUp,
  Activity,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react"

interface DashboardItem {
  name: string
  count: number
  icon: LucideIcon
  color: string
  link: string
  trend?: {
    value: number
    isUp: boolean
  }
}

interface ListItem {
  name: string
  time: string
  status?: string
  priority?: "high" | "medium" | "low"
}

interface RecentListCardProps {
  title: string
  items: ListItem[]
  icon?: LucideIcon
}

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  changeType?: "increase" | "decrease"
  icon?: LucideIcon
  description?: string
}

const DAYS_MS = 1000 * 60 * 60 * 24

const daysAgo = (date: string, days: number, offset = 0) => {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / DAYS_MS)
  return diff >= offset && diff < offset + days
}

const trendPercent = (current: number, previous: number) => {
  if (previous === 0) return current > 0 ? 100 : 0
  return Math.round(((current - previous) / previous) * 100)
}

const RecentListCard = ({ title, items, icon: Icon }: RecentListCardProps) => {
  const getPriorityColor = (priority?: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Card className="w-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
          <CardTitle className="text-lg font-semibold tracking-tight">{title}</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="rounded-full bg-muted p-3 mb-3">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">No recent items</p>
            <p className="text-sm text-muted-foreground mt-1">Items will appear here when available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.priority && (
                    <Badge variant="secondary" className={`text-xs ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </Badge>
                  )}
                  {item.status && (
                    <Badge variant="outline" className="text-xs">
                      {item.status}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const StatsCard = ({ title, value, change, changeType, icon: Icon, description }: StatsCardProps) => {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
              {typeof change === "number" && (
                <div
                  className={`flex items-center text-sm font-medium ${
                    changeType === "increase" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {changeType === "increase" ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(change)}%
                </div>
              )}
            </div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          {Icon && (
            <div className="rounded-full bg-muted p-3">
              <Icon className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const AdminDashboard = () => {
  const { users, bookings, routes, buses, schedules, busCompanies } = useAdminData()

  const bookingsData = bookings ?? []
  const usersData = users ?? []
  const routesData = routes ?? []
  const busesData = buses ?? []
  const schedulesData = schedules ?? []
  const companiesData = busCompanies ?? []

  const totalBookings = bookingsData.length
  const totalRevenue = bookingsData.reduce((sum, b) => sum + (Number(b.price_paid) || 0), 0)

  const confirmedBookings = bookingsData.filter((b) => b.status === "CONFIRMED").length
  const pendingBookings = bookingsData.filter((b) => b.status === "PENDING" || b.status === "HELD").length
  const paidBookings = bookingsData.filter((b) => b.is_paid).length

  const newBookingsCurrent = bookingsData.filter((b) => daysAgo(b.booked_at, 7, 0)).length
  const newBookingsPrevious = bookingsData.filter((b) => daysAgo(b.booked_at, 7, 7)).length
  const newBookingTrend = trendPercent(newBookingsCurrent, newBookingsPrevious)

  const revenueCurrent = bookingsData
    .filter((b) => daysAgo(b.booked_at, 30, 0))
    .reduce((sum, b) => sum + (Number(b.price_paid) || 0), 0)
  const revenuePrevious = bookingsData
    .filter((b) => daysAgo(b.booked_at, 30, 30))
    .reduce((sum, b) => sum + (Number(b.price_paid) || 0), 0)
  const revenueTrend = trendPercent(revenueCurrent, revenuePrevious)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const activeSchedules = schedulesData.filter((s) => new Date(s.travel_date) >= today).length

  const confirmationRate = totalBookings ? Math.round((confirmedBookings / totalBookings) * 100) : 0
  const paymentRate = totalBookings ? Math.round((paidBookings / totalBookings) * 100) : 0
  const scheduleReadiness = schedulesData.length
    ? Math.round((activeSchedules / schedulesData.length) * 100)
    : 0

  const dashboardItems: DashboardItem[] = [
    {
      name: "New Bookings",
      count: newBookingsCurrent,
      icon: Book,
      color: "green",
      link: "/admin/bookings",
      trend: { value: Math.abs(newBookingTrend), isUp: newBookingTrend >= 0 },
    },
    {
      name: "Active Schedule",
      count: activeSchedules,
      icon: CalendarCheck,
      color: "blue",
      link: "/admin/schedule",
    },
    {
      name: "Routes",
      count: routesData.length,
      icon: Route,
      color: "yellow",
      link: "/admin/routes",
    },
    {
      name: "Buses",
      count: busesData.length,
      icon: BusFrontIcon,
      color: "primary",
      link: "/admin/buses",
    },
    {
      name: "Confirmed Bookings",
      count: confirmedBookings,
      icon: BookCheck,
      color: "emerald",
      link: "/admin/bookings?status=confirmed",
    },
    {
      name: "Pending Bookings",
      count: pendingBookings,
      icon: BookMinusIcon,
      color: "orange",
      link: "/admin/bookings?status=pending",
    },
    {
      name: "Total Users",
      count: usersData.length,
      icon: Users,
      color: "purple",
      link: "/admin/users",
    },
    {
      name: "Bus Companies",
      count: companiesData.length,
      icon: UserCog,
      color: "cyan",
      link: "/admin/bus-companies",
    },
  ]

  const recentBookings: ListItem[] = [...bookingsData]
    .sort((a, b) => new Date(b.booked_at).getTime() - new Date(a.booked_at).getTime())
    .slice(0, 5)
    .map((booking) => ({
      name: `${booking.passenger?.first_name || "Unknown"} ${booking.passenger?.last_name || ""}`,
      time: new Date(booking.booked_at).toLocaleString(),
      status: booking.status,
      priority:
        booking.status === "PENDING" || booking.status === "HELD"
          ? "high"
          : booking.status === "CANCELLED"
          ? "low"
          : "medium",
    }))

  const recentActivity: ListItem[] = [...bookingsData]
    .sort((a, b) => new Date(b.booked_at).getTime() - new Date(a.booked_at).getTime())
    .slice(0, 5)
    .map((booking) => ({
      name: `Booking #${booking.id} (${booking.status})`,
      time: new Date(booking.booked_at).toLocaleString(),
      status: booking.status,
      priority:
        booking.status === "PENDING" || booking.status === "HELD"
          ? "high"
          : booking.status === "CANCELLED"
          ? "low"
          : "medium",
    }))

  return (
    <PagesWrapper>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Live operational metrics from current database records.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="gap-2">
              <Activity className="h-4 w-4" />
              Live Activity
            </Button>
          </div>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <CardHeaderCount items={dashboardItems} />
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Revenue"
            value={`TZS ${Math.round(totalRevenue).toLocaleString()}`}
            change={Math.abs(revenueTrend)}
            changeType={revenueTrend >= 0 ? "increase" : "decrease"}
            icon={TrendingUp}
            description="Compared with previous 30 days"
          />
          <StatsCard
            title="Active Routes"
            value={routesData.length}
            icon={Route}
            description="Routes available in system"
          />
          <StatsCard
            title="Confirmation Rate"
            value={`${confirmationRate}%`}
            icon={Activity}
            description="Confirmed bookings over total"
          />
          <StatsCard
            title="Payment Completion"
            value={`${paymentRate}%`}
            icon={Clock}
            description="Paid bookings over total"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <RecentListCard title="Recent Bookings" items={recentBookings} icon={Book} />
          <RecentListCard title="Recent Activity" items={recentActivity} icon={Activity} />
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>New Bookings (7 days vs previous 7)</span>
                <span className="font-medium">{Math.max(Math.min(newBookingsCurrent * 10, 100), 0)}%</span>
              </div>
              <Progress value={Math.max(Math.min(newBookingsCurrent * 10, 100), 0)} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Schedule Readiness</span>
                <span className="font-medium">{scheduleReadiness}%</span>
              </div>
              <Progress value={scheduleReadiness} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Booking Confirmation Rate</span>
                <span className="font-medium">{confirmationRate}%</span>
              </div>
              <Progress value={confirmationRate} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </PagesWrapper>
  )
}

export default AdminDashboard
