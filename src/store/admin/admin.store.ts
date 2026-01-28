import { create } from "zustand"
import { AdminService } from "@/api/services/admin.service"
import { getErrorMessage } from "@/utils/error"
import type { Booking, BusCompany, Route, SeatLayoutApi, ScheduleGet, ScheduleTemplate, RouteStop } from "./admin.types"
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

     seatLayouts: SeatLayoutApi[] | null
     seatLayoutsPagination: PaginationMeta | null

     scheduleTemplates: ScheduleTemplate[] | null
     scheduleTemplatesPagination: PaginationMeta | null

     routeStops: RouteStop[] | null

     fetchUsers: (page?: number, pageSize?: number) => Promise<void>
     fetchBookings: (page?: number, pageSize?: number) => Promise<void>
     fetchRoutes: (page?: number, pageSize?: number) => Promise<void>
     fetchSchedule: (page?: number, pageSize?: number) => Promise<void>
     fetchBuses: (page?: number, pageSize?: number) => Promise<void>
     fetchBusCompanies: (page?: number, pageSize?: number) => Promise<void>

     createBusCompany: (data: Omit<BusCompany, "id">) => Promise<BusCompany | null>
     updateBusCompany: (id: number, data: Partial<Omit<BusCompany, "id">>) => Promise<BusCompany | null>
     deleteBusCompany: (id: number) => Promise<void>

     createRoute: (data: Omit<Route, "id">) => Promise<Route | null>
     updateRoute: (id: number, data: Partial<Route>) => Promise<Route | null>
     deleteRoute: (id: number) => Promise<void>

     createBus: (data: Omit<Bus, "id">) => Promise<Bus | null>
     updateBus: (id: number, data: Partial<Bus>) => Promise<Bus | null>
     deleteBus: (id: number) => Promise<void>

     createSchedule: (data: Omit<ScheduleGet, "id">) => Promise<ScheduleGet | null>
     updateSchedule: (id: number, data: Partial<ScheduleGet>) => Promise<ScheduleGet | null>
     deleteSchedule: (id: number) => Promise<void>

     createRouteStop: (data: Omit<RouteStop, "id">) => Promise<RouteStop | null>
     updateRouteStop: (id: number, data: Partial<RouteStop>) => Promise<RouteStop | null>
     deleteRouteStop: (id: number) => Promise<void>
     getRouteStops: (routeId: number) => Promise<RouteStop[]>

     toggleUserActive: (userId: string | number, isActive: boolean) => Promise<void>

     fetchSeatLayouts: (page?: number, pageSize?: number) => Promise<void>
     fetchScheduleTemplates: (page?: number, pageSize?: number) => Promise<void>
     createSeatLayout: (data: Omit<SeatLayoutApi, "id">) => Promise<SeatLayoutApi | null>
     updateSeatLayout: (id: number, data: Partial<Omit<SeatLayoutApi, "id">>) => Promise<SeatLayoutApi | null>
     deleteSeatLayout: (id: number) => Promise<void>
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

     seatLayouts: null,
     seatLayoutsPagination: null,

     scheduleTemplates: null,
     scheduleTemplatesPagination: null,

     routeStops: null,

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

     createBusCompany: async (data) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.createBusCompany(data)
               set(state => ({
                    ...state,
                    busCompanies: state.busCompanies ? [res.data, ...state.busCompanies] : [res.data],
                    loading: false,
               }))
               return res.data
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
               return null
          }
     },

     updateBusCompany: async (id, data) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.updateBusCompany(id, data)
               set(state => ({
                    ...state,
                    busCompanies: (state.busCompanies ?? []).map(c => (c.id === id ? res.data : c)),
                    loading: false,
               }))
               return res.data
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
               return null
          }
     },

     deleteBusCompany: async (id) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               await AdminService.deleteBusCompany(id)
               set(state => ({
                    ...state,
                    busCompanies: (state.busCompanies ?? []).filter(c => c.id !== id),
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

     createRoute: async (data) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.createRoute(data)
               set(state => ({
                    ...state,
                    routes: state.routes ? [res.data, ...state.routes] : [res.data],
                    loading: false,
               }))
               return res.data
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
               return null
          }
     },

     updateRoute: async (id, data) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.updateRoute(id, data)
               set(state => ({
                    ...state,
                    routes: (state.routes ?? []).map(r => (r.id === id ? res.data : r)),
                    loading: false,
               }))
               return res.data
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
               return null
          }
     },

     deleteRoute: async (id) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               await AdminService.deleteRoute(id)
               set(state => ({
                    ...state,
                    routes: (state.routes ?? []).filter(r => r.id !== id),
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

     createBus: async (data) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.createBus(data)
               set(state => ({
                    ...state,
                    buses: state.buses ? [res.data, ...state.buses] : [res.data],
                    loading: false,
               }))
               return res.data
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
               return null
          }
     },

     updateBus: async (id, data) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.updateBus(id, data)
               set(state => ({
                    ...state,
                    buses: (state.buses ?? []).map(b => (b.id === id ? res.data : b)),
                    loading: false,
               }))
               return res.data
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
               return null
          }
     },

     deleteBus: async (id) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               await AdminService.deleteBus(id)
               set(state => ({
                    ...state,
                    buses: (state.buses ?? []).filter(b => b.id !== id),
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

     createSchedule: async (data) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.createSchedule(data)
               set(state => ({
                    ...state,
                    schedule: state.schedule ? [res.data, ...state.schedule] : [res.data],
                    loading: false,
               }))
               return res.data
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
               return null
          }
     },

     updateSchedule: async (id, data) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.updateSchedule(id, data)
               set(state => ({
                    ...state,
                    schedule: (state.schedule ?? []).map(s => (s.id === id ? res.data : s)),
                    loading: false,
               }))
               return res.data
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
               return null
          }
     },

     deleteSchedule: async (id) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               await AdminService.deleteSchedule(id)
               set(state => ({
                    ...state,
                    schedule: (state.schedule ?? []).filter(s => s.id !== id),
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

     createRouteStop: async (data) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.createRouteStop(data)
               set(state => ({
                    ...state,
                    routeStops: state.routeStops ? [...state.routeStops, res.data] : [res.data],
                    loading: false,
               }))
               return res.data
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
               return null
          }
     },

     updateRouteStop: async (id, data) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.updateRouteStop(id, data)
               set(state => ({
                    ...state,
                    routeStops: (state.routeStops ?? []).map(rs => (rs.id === id ? res.data : rs)),
                    loading: false,
               }))
               return res.data
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
               return null
          }
     },

     deleteRouteStop: async (id) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               await AdminService.deleteRouteStop(id)
               set(state => ({
                    ...state,
                    routeStops: (state.routeStops ?? []).filter(rs => rs.id !== id),
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

     getRouteStops: async (routeId) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.getRouteStops(routeId)
               // This endpoint returns a direct array, not paginated results
               set(state => ({
                    ...state,
                    routeStops: res.data,
                    loading: false,
               }))
               return res.data
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
               return []
          }
     },

     fetchSeatLayouts: async (page = 1, pageSize = 20) => {
          if (get().loading) return

          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.getAllSeatLayouts({ page, pageSize })

               set(state => ({
                    ...state,
                    seatLayouts: res.data.results,
                    seatLayoutsPagination: {
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

     fetchScheduleTemplates: async (page = 1, pageSize = 20) => {
          if (get().loading) return

          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.getAllScheduleTemplates({ page, pageSize })

               set(state => ({
                    ...state,
                    scheduleTemplates: res.data.results,
                    scheduleTemplatesPagination: {
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

     createSeatLayout: async (data) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.createSeatLayout(data)
               set(state => ({
                    ...state,
                    seatLayouts: state.seatLayouts ? [res.data, ...state.seatLayouts] : [res.data],
                    loading: false,
               }))
               return res.data
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
               return null
          }
     },

     updateSeatLayout: async (id, data) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await AdminService.updateSeatLayout(id, data)
               set(state => ({
                    ...state,
                    seatLayouts: (state.seatLayouts ?? []).map(l => (l.id === id ? res.data : l)),
                    loading: false,
               }))
               return res.data
          } catch (err) {
               set(state => ({
                    ...state,
                    error: getErrorMessage(err),
                    loading: false,
               }))
               return null
          }
     },

     deleteSeatLayout: async (id) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               await AdminService.deleteSeatLayout(id)
               set(state => ({
                    ...state,
                    seatLayouts: (state.seatLayouts ?? []).filter(l => l.id !== id),
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

     toggleUserActive: async (userId, isActive) => {
          set(state => ({ ...state, loading: true, error: "" }))
          try {
               const res = await AdminService.updateUser(userId, { is_active: isActive })
               set(state => ({
                    ...state,
                    users: (state.users ?? []).map(u => (u.id === userId ? res.data : u)),
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
