import PagesWrapper from "@/components/layout/pages-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBusBookingStore } from "@/store/bus/useBusBookingStore"

const History = () => {


  const { passengerData, selectedSeat, activeBus } = useBusBookingStore()

  // Example: create history entries
  const historyEntries = passengerData.length > 0 && selectedSeat && activeBus
    ? [
      {
        seatNumber: selectedSeat.seatNumber,
        route: `${activeBus.from} → ${activeBus.to}`,
        date: activeBus.startDate,
        price: selectedSeat.seatPrice,
        status: "Issued",
      },
    ]
    : []

  return (
    <PagesWrapper>
      <div className="flex flex-col gap-6">

        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold">Booking History</h1>
          <p className="text-muted-foreground">
            Review your past bookings and tickets
          </p>
        </div>

        {/* History Cards */}
        <div className="flex flex-col gap-4">
          {historyEntries.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">
              No booking history available
            </p>
          ) : (
            historyEntries.map((entry) => (
              <Card key={entry.seatNumber} className="bg-muted/50 hover:bg-muted/70 transition-all">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{entry.route}</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Seat</span>
                    <p className="font-medium">{entry.seatNumber}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Date</span>
                    <p className="font-medium">{entry.date}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Price</span>
                    <p className="font-medium">TZS {entry.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Status</span>
                    <p className={`font-medium ${entry.status === "Issued" ? "text-green-500" : "text-red-500"}`}>
                      {entry.status}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </PagesWrapper>
  )
}

export default History
