import { useMemo, useState } from "react"
import { ViewBookingDialog, CancelBookingDialog } from "@/components/dialog/booking"
import PagesWrapper from "@/components/layout/pages-wrapper"
import { TablePagination } from "@/components/table/bookings-paginationtable"
import { Card } from "@/components/ui/card"
import { CardCount } from "@/components/cards/dashboard-counts"
import { Button } from "@/components/ui/button"
import type { Booking } from "@/store/admin/admin.types"
import { useBookings } from "@/hooks/use-admin/useBooking"
import { Eye, XCircle } from "lucide-react"
import { bookingColumns } from "./booking-columns"
import { DataTable } from "@/components/table/table-data"

const PAGE_SIZE = 5

const Bookings = () => {
  const [page, setPage] = useState(1)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [openView, setOpenView] = useState(false)
  const [openCancel, setOpenCancel] = useState(false)

  const { bookings, totalPages, loading,} = useBookings(page, PAGE_SIZE)

  const bookingsStats = useMemo(() => {
    const bookingResults = bookings ?? []
    const today = new Date().toISOString().slice(0, 10)

    return [
      {
        id: 1,
        name: "Total Bookings",
        count: bookingResults.length
      },
      {
        id: 2,
        name: "Canceled Bookings",
        count: bookingResults.filter(b => b.status === "CANCELLED").length,
      },
      {
        id: 3,
        name: "Confirmed Bookings",
        count: bookingResults.filter(b => b.status === "CONFIRMED").length,
      },
      {
        id: 4,
        name: "Daily Bookings",
        count: bookingResults.filter(b =>
          b.booked_at?.startsWith(today)
        ).length,
      },
    ]
  }, [bookings])

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking)
    setOpenView(true)
  }

  const handleOpenCancelDialog = (booking: Booking) => {
    setSelectedBooking(booking)
    setOpenCancel(true)
  }

  const handleCancelBooking = async (booking: Booking) => {
    try {
      console.log("Cancel booking:", booking)
      // TODO: Implement cancellation

      setOpenCancel(false)
      setSelectedBooking(null)
    } catch (error) {
      console.error("Failed to cancel booking:", error)
    }
  }


  return (
    <PagesWrapper>
      <CardCount items={bookingsStats} />

      <Card className="mt-4">
        <DataTable
          data={bookings ?? []}
          columns={bookingColumns}
          searchPlaceholder="Search by name, reference, or phone..."
          isLoading={loading}
          emptyMessage="No bookings found"
        //  mobileCard={(booking) => <BookingMobileCard booking={booking} />}
          actions={(booking) => (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleViewBooking(booking)}
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              {booking.status !== "CANCELLED" && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleOpenCancelDialog(booking)}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              )}
            </>
          )}
        />
        <TablePagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </Card>

      <ViewBookingDialog
        booking={selectedBooking}
        open={openView}
        onClose={() => {
          setOpenView(false)
          setSelectedBooking(null)
        }}
      />

      <CancelBookingDialog
        booking={selectedBooking}
        open={openCancel}
        onClose={() => {
          setOpenCancel(false)
          setSelectedBooking(null)
        }}
        onCancel={handleCancelBooking}
      />
    </PagesWrapper>
  )
}

export default Bookings