import { useEffect } from "react"
import { AdminStore } from "@/store/admin/admin.store"

export const useBusCompanies = (page = 1, pageSize = 10) => {
     const busCompanies = AdminStore(state => state.busCompanies)
     const BusCompaniesPagination = AdminStore(state => state.busCompaniesPagination)
     const loading = AdminStore(state => state.loading) 
     const error = AdminStore(state => state.error)     
     const fetchBusCompanies = AdminStore(state => state.fetchBusCompanies)

     useEffect(() => {
          fetchBusCompanies(page, pageSize)
     }, [fetchBusCompanies, page, pageSize])

     // Calculate total pages based on backend pagination
     const totalPages = Math.ceil((BusCompaniesPagination?.count ?? 0) / pageSize)

     return { busCompanies, BusCompaniesPagination, loading, error, totalPages }
}
