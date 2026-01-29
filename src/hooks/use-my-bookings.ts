import { useState, useEffect } from "react"
import { userServices } from "@/api/services/user.service"
import { API_ENDPOINTS } from "@/api/endpoints"

interface Booking {
  id: number
  status: string
  price_paid: number
  seat_number: string
  is_paid: boolean
  booked_at: string
  schedule: {
    route?: string
    route_origin?: string
    route_destination?: string
    travel_date?: string
    departure_time?: string
    arrival_time?: string
  }
  bus_assignment?: {
    bus?: {
      company_name?: string
      plate_number?: string
    }
    available_seats?: number
  }
  passenger?: {
    first_name?: string
    last_name?: string
    email?: string
    phone?: string
  }
}

interface PaginationMeta {
  count: number
  next: string | null
  previous: string | null
}

export const useMyBookings = (page = 1, pageSize = 10) => {
  const [bookings, setBookings] = useState<Booking[] | null>(null)
  const [pagination, setPagination] = useState<PaginationMeta | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const fetchBookings = async () => {
      if (loading) return // Prevent multiple simultaneous requests
      
      setLoading(true)
      setError("")
      
      try {
        const response = await userServices.getAllMyBookings({ page, pageSize })
        setBookings(response.data.results)
        setPagination({
          count: Number(response.data.count),
          next: response.data.next,
          previous: response.data.previous,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch bookings")
        setBookings(null)
        setPagination(null)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [page, pageSize])

  const totalPages = pagination ? Math.ceil(pagination.count / pageSize) : 0

  return {
    MyBookings: bookings,
    MyBookingsPagination: pagination,
    loading,
    error,
    totalPages
  }
}
