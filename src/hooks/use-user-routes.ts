import { useState, useEffect } from "react"
import { BusBookingService } from "@/api/services/busBooking.service"
import type { Route } from "@/store/bus/bus.types"

interface UserRoutesData {
  routes: Route[] | null
  loading: boolean
  error: string | null
}

export const useUserRoutes = () => {
  const [data, setData] = useState<UserRoutesData>({
    routes: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchRoutes = async () => {
      setData(prev => ({ ...prev, loading: true, error: null }))

      try {
        const response = await BusBookingService.getRoutes()
        setData({
          routes: response.data || [],
          loading: false,
          error: null,
        })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch routes'
        setData(prev => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }))
      }
    }

    fetchRoutes()
  }, [])

  const refreshRoutes = async () => {
    try {
      const response = await BusBookingService.getRoutes()
      setData(prev => ({
        ...prev,
        routes: response.data || [],
        error: null,
      }))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh routes'
      setData(prev => ({
        ...prev,
        error: errorMessage,
      }))
    }
  }

  return {
    ...data,
    refreshRoutes,
  }
}
