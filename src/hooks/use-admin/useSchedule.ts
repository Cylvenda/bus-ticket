import { useEffect } from "react"
import { AdminStore } from "@/store/admin/admin.store"

export const useSchedule = (page = 1, pageSize = 10) => {
     const schedule = AdminStore(state => state.schedule)
     const schedulePagination = AdminStore(state => state.schedulePagination)
     const loading = AdminStore(state => state.loading)
     const error = AdminStore(state => state.error)
     const fetchSchedule = AdminStore(state => state.fetchSchedule)

     useEffect(() => {
          fetchSchedule(page, pageSize)
     }, [fetchSchedule, page, pageSize])

     // Calculate total pages based on backend pagination
     const totalPages = Math.ceil((schedulePagination?.count ?? 0) / pageSize)

     return { schedule, schedulePagination, loading, error, totalPages }
}