import { useEffect } from "react"
import { AdminStore } from "@/store/admin/admin.store"

export const useAdminStore = () => {
     const loading = AdminStore(state => state.loading)
     const error = AdminStore(state => state.error)
     const users = AdminStore(state => state.users)
     const bookings = AdminStore(state => state.bookings)

     const fetchUsers = AdminStore(state => state.fetchUsers)
     const fetchBookings = AdminStore(state => state.fetchBookings)

     useEffect(() => {
          fetchUsers()
          fetchBookings()
     }, [fetchUsers, fetchBookings])

     return {
          loading,
          error,
          users,
          bookings,
     }
}
