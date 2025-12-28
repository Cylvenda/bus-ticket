import PagesWrapper from "@/components/layout/pages-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { useBusBookingStore } from "@/store/useBusBookingStore"
import { ArrowRight } from "lucide-react"
import type { Bus } from "@/types/bus"
import useMockData from "@/hooks/use-mock-data"

type DashboardCard = {
  title: string
  description: string
  color: string
}

const Dashboard = () => {
  useMockData()

  const { availableBuses, filteredBuses } = useBusBookingStore()
  const buses: Bus[] = filteredBuses.length > 0 ? filteredBuses : availableBuses ?? []

  // Unique routes
  const uniqueRoutes = Array.from(
    new Map(buses.map((bus) => [`${bus.from}-${bus.to}`, bus])).values()
  )

  const dashboardCards: DashboardCard[] = [
    { title: "Pending Ticket", description: "3", color: "bg-blue-500" },
    { title: "Issued Ticket", description: "12", color: "bg-green-500" },
    { title: "Canceled Ticket", description: "5", color: "bg-red-500" },
  ]

  return (
    <PagesWrapper>
      <div className="flex flex-col gap-8">

        {/* ===== Stats Cards ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {dashboardCards.map((card) => (
            <Card
              key={card.title}
              className={`${card.color} text-white shadow-lg hover:scale-105 transition-transform duration-300`}
            >
              <CardContent className="flex flex-col items-center justify-center py-8">
                <p className="text-2xl font-semibold">{card.description}</p>
                <p className="mt-2 text-lg">{card.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ===== Available Routes ===== */}
        <div>
          <h2 className="text-xl font-bold mb-4">Available Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uniqueRoutes.length === 0 ? (
              <p className=" text-center col-span-full">
                No routes available
              </p>
            ) : (
              uniqueRoutes.map((bus) => (
                <Card
                  key={`${bus.from}-${bus.to}`}
                  className="border hover:shadow-lg transition-shadow rounded-xl p-4 flex items-center justify-between gap-2 cursor-pointer "
                >
                  <span className="font-medium">{bus.from}</span>
                  <ArrowRight className="text-primary" />
                  <span className="font-medium">{bus.to}</span>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </PagesWrapper>
  )
}

export default Dashboard
