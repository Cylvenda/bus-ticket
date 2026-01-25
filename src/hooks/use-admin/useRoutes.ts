import { useEffect } from "react"
import { AdminStore } from "@/store/admin/admin.store"

export const useRoutes = (page = 1, pageSize = 10) => {
     const routes = AdminStore(state => state.routes)
     const routesPagination = AdminStore(state => state.routesPagination)
     const loading = AdminStore(state => state.loading)
     const error = AdminStore(state => state.error)
     const fetchRoutes = AdminStore(state => state.fetchRoutes)

     useEffect(() => {
          fetchRoutes(page, pageSize)
     }, [fetchRoutes, page, pageSize])

     // Calculate total pages based on backend pagination
     const totalPages = Math.ceil((routesPagination?.count ?? 0) / pageSize)

     return { routes, routesPagination, loading, error, totalPages }
}