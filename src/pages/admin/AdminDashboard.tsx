import PagesWrapper from "@/components/layout/pages-wrapper"
import { CardHeaderCount } from "@/components/cards/dashboard-counts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAdminData } from "@/hooks/use-admin-data"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

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
  TrendingDown,
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
  priority?: 'high' | 'medium' | 'low'
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
  changeType?: 'increase' | 'decrease'
  icon?: LucideIcon
  description?: string
}


const RecentListCard = ({ title, items, icon: Icon }: RecentListCardProps) => {
  const getPriorityColor = (priority?: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
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
                key={index}
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
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    View
                  </Button>
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
              {change && (
                <div className={`flex items-center text-sm font-medium ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {changeType === 'increase' ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {change}%
                </div>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
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
  const navigate = useNavigate()
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

  // Calculate real statistics
  const newBookings = bookings?.filter(b => {
    const bookingDate = new Date(b.booked_at)
    const today = new Date()
    const daysDiff = Math.floor((today.getTime() - bookingDate.getTime()) / (1000 * 60 * 60 * 24))
    return daysDiff <= 7 // Bookings from last 7 days
  }).length || 0

  const activeSchedules = schedules?.filter(s => {
    const scheduleDate = new Date(s.travel_date)
    return scheduleDate >= new Date()
  }).length || 0

  const confirmedBookings = bookings?.filter(b => b.status === 'CONFIRMED').length || 0
  const pendingBookings = bookings?.filter(b => b.status === 'PENDING').length || 0
  const cancelledBookings = bookings?.filter(b => b.status === 'CANCELLED').length || 0

  const dashboardItems: DashboardItem[] = [
    {
      name: "New Bookings",
      count: newBookings,
      icon: Book,
      color: "green",
      link: "/admin/bookings",
      trend: { value: newBookings > 0 ? 12 : 0, isUp: newBookings > 0 }
    },
    {
      name: "Active Schedule",
      count: activeSchedules,
      icon: CalendarCheck,
      color: "blue",
      link: "/admin/schedule",
      trend: { value: activeSchedules > 0 ? 8 : 0, isUp: activeSchedules > 0 }
    },
    {
      name: "Routes",
      count: routes?.length || 0,
      icon: Route,
      color: "yellow",
      link: "/admin/routes",
      trend: { value: routes?.length || 0, isUp: true }
    },
    {
      name: "Buses",
      count: buses?.length || 0,
      icon: BusFrontIcon,
      color: "primary",
      link: "/admin/buses",
      trend: { value: buses?.length || 0, isUp: true }
    },
    {
      name: "Confirmed Bookings",
      count: confirmedBookings,
      icon: BookCheck,
      color: "emerald",
      link: "/admin/bookings?status=confirmed",
      trend: { value: confirmedBookings > 0 ? 15 : 0, isUp: confirmedBookings > 0 }
    },
    {
      name: "Pending Bookings",
      count: pendingBookings,
      icon: BookMinusIcon,
      color: "orange",
      link: "/admin/bookings?status=pending",
      trend: { value: pendingBookings > 0 ? 5 : 0, isUp: pendingBookings > 0 }
    },
    {
      name: "Total Users",
      count: users?.length || 0,
      icon: Users,
      color: "purple",
      link: "/admin/users",
      trend: { value: users?.length || 0, isUp: true }
    },
    {
      name: "Bus Companies",
      count: busCompanies?.length || 0,
      icon: UserCog,
      color: "cyan",
      link: "/admin/bus-companies",
      trend: { value: busCompanies?.length || 0, isUp: true }
    },
  ]

  // Get recent bookings
  const recentBookings: ListItem[] = bookings?.slice(0, 5).map(booking => ({
    name: `${booking.passenger?.first_name || 'Unknown'} ${booking.passenger?.last_name || ''}`,
    time: new Date(booking.booked_at).toLocaleString(),
    status: booking.status,
    priority: booking.status === 'PENDING' ? 'high' : booking.status === 'CANCELLED' ? 'low' : 'medium'
  })) || []

  // Mock recent activity (this could be enhanced with real activity logs)
  const recentActivity: ListItem[] = [
    { name: `New booking: ${recentBookings[0]?.name || 'No recent bookings'}`, time: recentBookings[0]?.time || 'No activity', priority: 'medium' },
    { name: `Total routes: ${routes?.length || 0}`, time: 'System update', priority: 'low' },
    { name: `Active buses: ${buses?.length || 0}`, time: 'System update', priority: 'low' },
    { name: `Pending bookings: ${pendingBookings}`, time: 'Real-time', priority: pendingBookings > 0 ? 'high' : 'low' },
  ]

  return (
    <PagesWrapper>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your bus management system today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="gap-2">
              <Activity className="h-4 w-4" />
              View All Activity
            </Button>
          </div>
        </div>

        {/* Dashboard Counts */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <CardHeaderCount items={dashboardItems} />
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Revenue"
            value="TZS 0"
            change={0}
            changeType="increase"
            icon={TrendingUp}
            description="No data available"
          />
          <StatsCard
            title="Active Routes"
            value="0"
            change={0}
            changeType="decrease"
            icon={Route}
            description="No data available"
          />
          <StatsCard
            title="Occupancy Rate"
            value="0%"
            change={0}
            changeType="increase"
            icon={Activity}
            description="No data available"
          />
          <StatsCard
            title="On-time Performance"
            value="0%"
            change={0}
            changeType="increase"
            icon={Clock}
            description="No data available"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentListCard
            title="Recent Bookings"
            items={recentBookings}
            icon={Book}
          />

          <RecentListCard
            title="Recent Activity"
            items={recentActivity}
            icon={Activity}
          />
        </div>

        {/* Performance Metrics */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Daily Bookings Progress</span>
                <span className="font-medium">0%</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Route Utilization</span>
                <span className="font-medium">0%</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Staff Efficiency</span>
                <span className="font-medium">0%</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </PagesWrapper>
  )
}

export default AdminDashboard