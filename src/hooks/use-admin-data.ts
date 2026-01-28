import { useState, useEffect } from "react"
import { AdminService } from "@/api/services/admin.service"
import type { UserMeResponse } from "@/store/auth/auth.types"
import type { Booking, Bus, Route, ScheduleGet, BusCompany } from "@/store/admin/admin.types"

interface AdminData {
  users: UserMeResponse[] | null
  bookings: Booking[] | null
  routes: Route[] | null
  buses: Bus[] | null
  schedules: ScheduleGet[] | null
  busCompanies: BusCompany[] | null
  loading: boolean
  error: string | null
}

export const useAdminData = () => {
  const [data, setData] = useState<AdminData>({
    users: null,
    bookings: null,
    routes: null,
    buses: null,
    schedules: null,
    busCompanies: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchAllData = async () => {
      setData(prev => ({ ...prev, loading: true, error: null }))

      try {
        // Fetch all data in parallel
        const [
          usersResponse,
          bookingsResponse,
          routesResponse,
          busesResponse,
          schedulesResponse,
          busCompaniesResponse,
        ] = await Promise.all([
          AdminService.getAllUsers({ page: 1, pageSize: 1000 }),
          AdminService.getAllBookings({ page: 1, pageSize: 1000 }),
          AdminService.getAllRoutes({ page: 1, pageSize: 1000 }),
          AdminService.getAllBuses({ page: 1, pageSize: 1000 }),
          AdminService.getAllSchedule({ page: 1, pageSize: 1000 }),
          AdminService.getAllBusCompanies({ page: 1, pageSize: 1000 }),
        ])

        setData({
          users: usersResponse.data.results || [],
          bookings: bookingsResponse.data.results || [],
          routes: routesResponse.data.results || [],
          buses: busesResponse.data.results || [],
          schedules: schedulesResponse.data.results || [],
          busCompanies: busCompaniesResponse.data.results || [],
          loading: false,
          error: null,
        })
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch admin data'
        setData(prev => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }))
      }
    }

    fetchAllData()
  }, [])

  // Function to refresh data
  const refreshData = async () => {
    const [usersResponse, bookingsResponse, routesResponse, busesResponse, schedulesResponse, busCompaniesResponse] = 
      await Promise.all([
        AdminService.getAllUsers({ page: 1, pageSize: 1000 }),
        AdminService.getAllBookings({ page: 1, pageSize: 1000 }),
        AdminService.getAllRoutes({ page: 1, pageSize: 1000 }),
        AdminService.getAllBuses({ page: 1, pageSize: 1000 }),
        AdminService.getAllSchedule({ page: 1, pageSize: 1000 }),
        AdminService.getAllBusCompanies({ page: 1, pageSize: 1000 }),
      ])

    setData({
      users: usersResponse.data.results || [],
      bookings: bookingsResponse.data.results || [],
      routes: routesResponse.data.results || [],
      buses: busesResponse.data.results || [],
      schedules: schedulesResponse.data.results || [],
      busCompanies: busCompaniesResponse.data.results || [],
      loading: false,
      error: null,
    })
  }

  return {
    ...data,
    refreshData,
  }
}
