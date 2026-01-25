import PagesWrapper from "@/components/layout/pages-wrapper"
import { CardHeaderCount } from "@/components/cards/dashboard-counts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
  Book,
  BookCheck,
  BookMinusIcon,
  BusFrontIcon,
  CalendarCheck,
  Route,
  Users,
  UserCog,
  type LucideIcon,
} from "lucide-react"


interface DashboardItem {
  name: string
  count: number
  icon: LucideIcon
  color: string
  link: string
}

interface ListItem {
  name: string
  time: string
}

interface RecentListCardProps {
  title: string
  items: ListItem[]
}


const RecentListCard = ({ title, items }: RecentListCardProps) => {
  return (
    <Card className="w-full border border-primary">
      <CardHeader>
        <CardTitle className="text-center text-2xl">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {items.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No recent items</p>
        ) : (
          items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-2 border border-primary rounded px-3 py-3"
            >
              <span className="flex-1 truncate font-medium">{item.name}</span>
              <span className="flex-shrink-0 text-sm text-muted-foreground">{item.time}</span>
              <Button variant="secondary" size="sm" className="flex-shrink-0">
                View
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

const AdminDashboard = () => {
  const dashboardItems: DashboardItem[] = [
    {
      name: "New Bookings",
      count: 40,
      icon: Book,
      color: "green",
      link: "/admin/bookings",
    },
    {
      name: "Active Schedule",
      count: 120,
      icon: CalendarCheck,
      color: "blue",
      link: "/admin/schedule",
    },
    {
      name: "Routes",
      count: 60,
      icon: Route,
      color: "yellow",
      link: "/admin/routes",
    },
    {
      name: "Buses",
      count: 400,
      icon: BusFrontIcon,
      color: "primary",
      link: "/admin/buses",
    },
    {
      name: "Confirmed Bookings",
      count: 400,
      icon: BookCheck,
      color: "emerald",
      link: "/admin/bookings?status=confirmed",
    },
    {
      name: "Canceled Bookings",
      count: 400,
      icon: BookMinusIcon,
      color: "red",
      link: "/admin/bookings?status=canceled",
    },
    {
      name: "Total Users",
      count: 40,
      icon: Users,
      color: "purple",
      link: "/admin/users",
    },
    {
      name: "Total Staff",
      count: 56,
      icon: UserCog,
      color: "orange",
      link: "/admin/staff",
    },
  ]

  const recentBookings: ListItem[] = [
    { name: "Brayan Mlawa", time: "02/02/2025 22:00" },
    { name: "John Doe", time: "02/02/2025 22:10" },
    { name: "Batola Mtole", time: "02/02/2025 22:23" },
    { name: "Mtole Balota", time: "02/02/2025 22:27" },
    { name: "Ntole Daleda", time: "02/02/2025 22:35" },
    { name: "Bentla Baleda", time: "02/02/2025 22:52" },
  ]

  const recentActivity: ListItem[] = [
    { name: "Route Updated: Dar → Mwanza", time: "02/02/2025 21:45" },
    { name: "New Bus Added: TZ-1234", time: "02/02/2025 21:30" },
    { name: "Schedule Modified", time: "02/02/2025 21:15" },
    { name: "Staff Login: Admin User", time: "02/02/2025 21:00" },
  ]

  return (
    <PagesWrapper>
      <Card className="border-none rounded-none">
        {/* Dashboard Counts */}
        <CardHeaderCount items={dashboardItems} />

        {/* Dashboard Content */}
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <RecentListCard
            title="Recent Bookings"
            items={recentBookings}
          />

          <RecentListCard
            title="Recent Activity"
            items={recentActivity}
          />
        </CardContent>
      </Card>
    </PagesWrapper>
  )
}

export default AdminDashboard