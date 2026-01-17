import PagesWrapper from "@/components/layout/pages-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowBigRightDash, Book, BookCheck, BookMinusIcon, BusFrontIcon, CalendarCheck, Route } from "lucide-react"
import { Link } from "react-router-dom"

type DashboardType = {
  name: string
  count: string | number
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  link?: string
  color?: string
}

const AdminDashboard = () => {


  const dashboardItems: DashboardType[] = [
    {
      name: "New Bookings",
      count: 40,
      icon: Book,
      color: "green-500",
      link: "/admin/bookings"
    },
    {
      name: "Active Schedule",
      count: 120,
      icon: CalendarCheck,
      color: "blue-500",
      link: "/admin/schedule"
    },
    {
      name: "Routes",
      count: 60,
      icon: Route,
      color: "yellow-500",
      link: "/admin/routes"
    },
    {
      name: "Buses",
      count: 400,
      icon: BusFrontIcon,
      color: "primary",
      link: "/admin/buses"
    },
    {
      name: "Comfirmed Bookings",
      count: 400,
      icon: BookCheck,
      color: "primary",
      link: "/admin/bookings"
    },
    {
      name: "Canceled Bookings",
      count: 400,
      icon: BookMinusIcon,
      color: "primary",
      link: "/admin/bookings"
    },
    {
      name: "Total Users",
      count: 40,
      icon: BusFrontIcon,
      color: "primary",
      link: "/admin/users"
    }, {
      name: "Total Staff",
      count: 56,
      icon: BusFrontIcon,
      color: "primary",
      link: "/admin/users"
    },
  ]

  const bookings = [
    {
      name: "Brayan Mlawa",
      time: "2/02/2025 22:00"
    },
    {
      name: "John Doe",
      time: "2/02/2025 22:10"
    },
    {
      name: "Batola Mtole",
      time: "2/02/2025 22:23"
    },
    {
      name: "Mtole  Balota",
      time: "2/02/2025 22:27"
    },
    {
      name: "Ntole Daleda",
      time: "2/02/2025 22:35"
    },
    {
      name: "Bentla Baleda",
      time: "2/02/2025 22:52"
    },
  ]

  return (
    <>
      <PagesWrapper>
        <Card className="border-none rounded-none">
          <CardHeader className="p-2 grid grid-cols-4 gap-y-2">
            {
              dashboardItems.map((item, index) => (
                <div key={index} className={`w-75 bg-linear-to-r from-primary to-rose-600 rounded border flex flex-col cursor-pointer `}>
                  <div className="flex flex-row justify-between p-3">
                    <item.icon className="size-15" />

                    <div className="flex flex-col gap-5 ">
                      <h1 className="text-4xl text-right">{item.count}</h1>
                      <p>{item.name}</p>
                    </div>
                  </div>

                  <Link to={`${item.link}`}>
                    <span className="bg-accent rounded-b flex flex-row justify-between py-2 px-4 hover:px-5 transition-transform duration-400">
                      <p>View Details</p>
                      <ArrowBigRightDash />
                    </span>
                  </Link>
                </div>
              ))
            }
          </CardHeader>

          <CardContent className="flex flex-row justify-between gap-2">

            <Card className="w-full rounded border border-primary ">
              <CardTitle className="text-center text-2xl -m-2 ">Recently Bookings</CardTitle>
              <CardContent className="flex flex-col gap-y-3 items-center">
                {
                  bookings.map((item, index) => (
                    <div key={index} className=" py-3 px-3 rounded w-full items-center bg-primary flex flex-row justify-between">
                      <span className="w-full" >{item.name}</span>

                      <span className="w-full">{item.time}</span>
                      <Button variant={"secondary"} size="sm">View</Button>
                    </div>
                  ))
                }
              </CardContent>
            </Card>

            <Card className="w-full rounded border border-primary ">
              <CardTitle className="text-center text-2xl -m-2 ">Recently Bookings</CardTitle>
              <CardContent className="flex flex-col gap-y-3 items-center">
                {
                  bookings.map((item, index) => (
                    <div key={index} className=" py-3 px-3 rounded w-full items-center bg-primary flex flex-row justify-between">
                      <span className="w-full" >{item.name}</span>

                      <span className="w-full">{item.time}</span>
                      <Button variant={"secondary"} size="sm">View</Button>
                    </div>
                  ))
                }
              </CardContent>
            </Card>

          </CardContent>
        </Card>
      </PagesWrapper>
    </>
  )
}

export default AdminDashboard