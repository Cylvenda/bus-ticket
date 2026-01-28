import { useEffect } from "react"
import { AdminStore } from "@/store/admin/admin.store"

export const useSeatLayouts = (page = 1, pageSize = 10) => {
  const seatLayouts = AdminStore(state => state.seatLayouts)
  const seatLayoutsPagination = AdminStore(state => state.seatLayoutsPagination)
  const loading = AdminStore(state => state.loading)
  const error = AdminStore(state => state.error)
  const fetchSeatLayouts = AdminStore(state => state.fetchSeatLayouts)

  useEffect(() => {
    fetchSeatLayouts(page, pageSize)
  }, [fetchSeatLayouts, page, pageSize])

  const totalPages = Math.ceil((seatLayoutsPagination?.count ?? 0) / pageSize)

  return { seatLayouts, seatLayoutsPagination, loading, error, totalPages }
}
