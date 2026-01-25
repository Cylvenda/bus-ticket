import { create } from "zustand"
import { AdminService } from "@/api/services/admin.service"
import { getErrorMessage } from "@/utils/error"
import type { Booking, BusCompany, Route } from "./admin.types"
import type { UserMeResponse } from "../auth/auth.types"
import type { Bus, Schedule } from "../bus/bus.types"

type PaginationMeta = {
     count: number
     next: string | null
     previous: string | null
}

type AdminStoreState = {
     loading: boolean
     error: string

     users: UserMeResponse[] | null
     usersPagination: PaginationMeta | null

     bookings: Booking[] | null
     bookingsPagination: PaginationMeta | null

     routes: Route[] | null
     routesPagination: PaginationMeta | null

     schedule: Schedule[] | null
     schedulePagination: PaginationMeta | null

     buses: Bus[] | null
     busesPagination: PaginationMeta | null

     busCompanies: BusCompany[] | null
     busCompaniesPagination: PaginationMeta | null

     fetchUsers: (page?: number, pageSize?: number) => Promise<void>
     fetchBookings: (page?: number, pageSize?: number) => Promise<void>
     fetchRoutes: (page?: number, pageSize?: number) => Promise<void>
     fetchSchedule: (page?: number, pageSize?: number) => Promise<void>
     fetchBuses: (page?: number, pageSize?: number) => Promise<void>
     fetchBusCompanies: (page?: number, pageSize?: number) => Promise<void>
}

export const AdminStore = create<AdminStoreState>((set, get) => ({
     loading: false,
     error: "",

     users: null,
     usersPagination: null,

     bookings: null,
     bookingsPagination: null,

     routes: null,
     routesPagination: null,

     schedule: null,
     schedulePagination: null,

     buses: null,
     busesPagination: null,

     busCompanies: null,
     busCompaniesPagination: null,

     fetchUsers: async (page = 1, pageSize = 20) => {
          if (get().loading) return

          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.getAllUsers({ page, pageSize })

               set(state => ({
                    ...state,
                    users: res.data.results,
                    usersPagination: {
                         count: Number(res.data.count),
                         next: res.data.next,
                         previous: res.data.previous,
                    },
                    loading: false,
               }))
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
          }
     },

     fetchBookings: async (page = 1, pageSize = 20) => {
          if (get().loading) return

          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.getAllBookings({ page, pageSize })

               set(state => ({
                    ...state,
                    bookings: res.data.results,
                    bookingsPagination: {
                         count: Number(res.data.count),
                         next: res.data.next,
                         previous: res.data.previous,
                    },
                    loading: false,
               }))
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
          }
     },

     fetchRoutes: async (page = 1, pageSize = 20) => {
          if (get().loading) return

          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.getAllRoutes({ page, pageSize })

               set(state => ({
                    ...state,
                    routes: res.data.results,
                    routesPagination: {
                         count: Number(res.data.count),
                         next: res.data.next,
                         previous: res.data.previous,
                    },
                    loading: false,
               }))
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
          }
     },

     fetchBuses: async (page = 1, pageSize = 20) => {
          if (get().loading) return

          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.getAllBuses({ page, pageSize })

               set(state => ({
                    ...state,
                    buses: res.data.results,
                    busesPagination: {
                         count: Number(res.data.count),
                         next: res.data.next,
                         previous: res.data.previous,
                    },
                    loading: false,
               }))
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
          }
     },

     fetchSchedule: async (page = 1, pageSize = 20) => {
          if (get().loading) return

          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.getAllSchedule({ page, pageSize })

               set(state => ({
                    ...state,
                    schedule: res.data.results,
                    schedulePagination: {
                         count: Number(res.data.count),
                         next: res.data.next,
                         previous: res.data.previous,
                    },
                    loading: false,
               }))
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
          }
     },

     fetchBusCompanies: async (page = 1, pageSize = 20) => {
          if (get().loading) return

          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.getAllBusCompanies({ page, pageSize })

               set(state => ({
                    ...state,
                    busCompanies: res.data.results,
                    busCompaniesPagination: {
                         count: Number(res.data.count),
                         next: res.data.next,
                         previous: res.data.previous,
                    },
                    loading: false,
               }))
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
          }
     },


}))
