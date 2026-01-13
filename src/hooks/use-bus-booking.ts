import { useEffect, useRef } from "react"
import { useBusBookingStore } from "@/store/bus/busBooking.store"

export const useBus = () => {
     const {
          routes,
          schedules,
          loading,
          error,
          selectedSchedule,
          activeBus,
          activeSchedule,
          selectedSeat,
          bookedSeats,
          fetchRoutes,

     } = useBusBookingStore()

     const didRun = useRef(false)

     useEffect(() => {
          if (didRun.current) return
          didRun.current = true
          fetchRoutes()
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [])


     return {
          routes,
          schedules,
          loading,
          error,
          selectedSchedule,
          activeBus,
          activeSchedule,
          bookedSeats,
          selectedSeat,
     }
}
