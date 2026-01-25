import { useEffect } from "react"
import { AdminStore } from "@/store/admin/admin.store"

export const useBookings = (page = 1, pageSize = 10) => {
     const bookings = AdminStore(state => state.bookings)
     const bookingsPagination = AdminStore(state => state.bookingsPagination)
     const loading = AdminStore(state => state.loading) // optional: you can create bookings-specific loading
     const error = AdminStore(state => state.error)     // optional: same for error
     const fetchBookings = AdminStore(state => state.fetchBookings)

     useEffect(() => {
          fetchBookings(page, pageSize)
     }, [fetchBookings, page, pageSize])

     // Calculate total pages based on backend pagination
     const totalPages = Math.ceil((bookingsPagination?.count ?? 0) / pageSize)

     return { bookings, bookingsPagination, loading, error, totalPages }
}
