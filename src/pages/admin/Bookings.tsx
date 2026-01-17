"use client"

import { useState } from "react"
import { ViewBookingDialog, CancelBookingDialog } from "@/components/dialog/booking"
import PagesWrapper from "@/components/layout/pages-wrapper"
import { TablePagination } from "@/components/table/bookings-paginationtable"
import { BookingsTable } from "@/components/table/bookings-table"
import { Card } from "@/components/ui/card"
import { useBusBookingStore } from "@/store/bus/busBooking.store"
import { type Booking } from "@/store/bus/bus.types"

const Bookings = () => {
  const { bookings } = useBusBookingStore()
  console.log("From booking:", bookings)

  const bookingsDetails = [
    { id: 1, name: "Total Bookings", count: bookings.length },
    { id: 2, name: "Canceled Bookings", count: bookings.filter(b => b.status === "CANCELLED").length },
    { id: 3, name: "Confirmed Bookings", count: bookings.filter(b => b.status === "CONFIRMED").length },
    { id: 4, name: "Daily Bookings", count: bookings.filter(b => b.booked_at?.startsWith(new Date().toISOString().slice(0, 10))).length },
  ]

  const PAGE_SIZE = 5
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(bookings.length / PAGE_SIZE)
  const paginatedData = bookings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [openView, setOpenView] = useState(false)
  const [openCancel, setOpenCancel] = useState(false)

  const handleCancelBooking = (booking: Booking) => {
    console.log("Cancel booking:", booking)
    
    // Example: busBookingStore.cancelBooking(booking.id)
  }

  return (
    <PagesWrapper>
      {/* Stats Cards */}
      <Card className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {bookingsDetails.map((item) => (
          <div key={item.id} className="bg-rose-600 rounded border cursor-pointer py-4 flex flex-col items-center">
            <h1 className="text-4xl">{item.count}</h1>
            <p>{item.name}</p>
          </div>
        ))}
      </Card>

      {/* Bookings Table */}
      <Card className="mt-4">
        <BookingsTable
        
          data={paginatedData}

          onView={(booking: Booking) => {
            setSelectedBooking(booking)
            setOpenView(true)
          }}
          onCancel={(booking: Booking) => {
            setSelectedBooking(booking)
            setOpenCancel(true)
          }}
        />
        <TablePagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </Card>

      {/* Dialogs */}
      <ViewBookingDialog
        booking={selectedBooking}
        open={openView}
        onClose={() => setOpenView(false)}
      />

      <CancelBookingDialog
        booking={selectedBooking}
        open={openCancel}
        onClose={() => setOpenCancel(false)}
        onCancel={handleCancelBooking}
      />
    </PagesWrapper>
  )
}

export default Bookings
