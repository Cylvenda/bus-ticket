import { useAuthUserStore } from "@/store/auth/userAuth.store"
import { useEffect, useRef, useCallback } from "react"

// Global state to prevent multiple fetches across component instances
const globalFetchState = {
     isFetching: false,
     lastFetch: 0,
     currentPage: 1,
     currentPageSize: 10
}

export const useMyBookings = (page = 1, pageSize = 10) => {
     const MyBookings = useAuthUserStore(state => state.MyBookings)
     const MyBookingsPagination = useAuthUserStore(state => state.MyBookingsPagination)
     const loading = useAuthUserStore(state => state.loading)
     const error = useAuthUserStore(state => state.error)
     const fetchUserBookings = useAuthUserStore(state => state.fetchUserBookings)

     const hasFetched = useRef(false)
     const lastPageRef = useRef(page)
     const lastPageSizeRef = useRef(pageSize)
     const fetchFunctionRef = useRef(fetchUserBookings)

     // Update the fetch function ref if it changes
     if (fetchFunctionRef.current !== fetchUserBookings) {
          fetchFunctionRef.current = fetchUserBookings
     }

     const fetchBookings = useCallback(() => {
          const now = Date.now()

          // Prevent multiple simultaneous fetches across all instances
          if (globalFetchState.isFetching) {
               console.log('useMyBookings: Another instance is fetching, skipping')
               return
          }

          // Only fetch if it's the first time or if page/pageSize changed
          if (
               !hasFetched.current ||
               lastPageRef.current !== page ||
               lastPageSizeRef.current !== pageSize
          ) {
               // Additional check: don't fetch if we just fetched the same data
               if (
                    globalFetchState.currentPage === page &&
                    globalFetchState.currentPageSize === pageSize &&
                    (now - globalFetchState.lastFetch) < 1000 // 1 second cooldown
               ) {
                    console.log('useMyBookings: Recently fetched same data, skipping')
                    return
               }

               console.log('useMyBookings: Fetching bookings for page:', page, 'pageSize:', pageSize)
               globalFetchState.isFetching = true
               globalFetchState.currentPage = page
               globalFetchState.currentPageSize = pageSize

               fetchFunctionRef.current?.(page, pageSize)

               // Reset fetch state after a delay
               setTimeout(() => {
                    globalFetchState.isFetching = false
                    globalFetchState.lastFetch = Date.now()
               }, 500)

               hasFetched.current = true
               lastPageRef.current = page
               lastPageSizeRef.current = pageSize
          } else {
               console.log('useMyBookings: Skipping fetch - already fetched for page:', page, 'pageSize:', pageSize)
          }
     }, [page, pageSize]) // Remove fetchUserBookings from dependencies

     useEffect(() => {
          fetchBookings()
     }, [fetchBookings])

     // Calculate total pages based on backend pagination
     const totalPages = Math.ceil((MyBookingsPagination?.count ?? 0) / pageSize)

     return { MyBookings, MyBookingsPagination, loading, error, totalPages }
}
