import { useAuthUserStore } from "@/store/auth/userAuth.store"
import { useEffect } from "react"

export const useMyBookings = (page = 1, pageSize = 10) => {
     const MyBookings = useAuthUserStore(state => state.MyBookings)
     const MyBookingsPagination = useAuthUserStore(state => state.MyBookingsPagination)
     const loading = useAuthUserStore(state => state.loading) 
     const error = useAuthUserStore(state => state.error)  
     const fetchMyBookings = useAuthUserStore(state => state.fetchUserBookings)

     useEffect(() => {
          fetchMyBookings(page, pageSize)
     }, [fetchMyBookings, page, pageSize])

     // Calculate total pages based on backend pagination
     const totalPages = Math.ceil((MyBookingsPagination?.count ?? 0) / pageSize)

     return { MyBookings, MyBookingsPagination, loading, error, totalPages }
}
