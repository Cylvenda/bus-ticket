import { useEffect } from "react"
import { AdminStore } from "@/store/admin/admin.store"

export const useBuses = (page = 1, pageSize = 10) => {
     const buses = AdminStore(state => state.buses)
     const BusesPagination = AdminStore(state => state.busesPagination)
     const loading = AdminStore(state => state.loading) 
     const error = AdminStore(state => state.error)     
     const fetchBuses = AdminStore(state => state.fetchBuses)

     useEffect(() => {
          fetchBuses(page, pageSize)
     }, [fetchBuses, page, pageSize])

     // Calculate total pages based on backend pagination
     const totalPages = Math.ceil((BusesPagination?.count ?? 0) / pageSize)

     return { buses, BusesPagination, loading, error, totalPages }
}
