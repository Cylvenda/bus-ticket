import PagesWrapper from "@/components/pages-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { useBusBookingStore } from "@/store/bus/busBooking.store"
import { DataTable } from "@/components/table-data"
import { RoutesColumns } from "@/components/columns/route-column"

type DashboardCard = {
  title: string
  description: string
  color: string
}

const Dashboard = () => {


  const { routes } = useBusBookingStore()

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
          <h1>Available Routes</h1>
          <DataTable columns={RoutesColumns} data={routes} />
        </div>
      </div>


    </PagesWrapper>
  )
}

export default Dashboard
