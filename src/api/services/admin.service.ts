import type { UserMeResponse } from "@/store/auth/auth.types"
import api from "../axios"
import { API_ENDPOINTS } from "../endpoints"
import type { Booking, BusCompany, ListResponse, ScheduleGet, SeatLayoutApi, ScheduleTemplate } from "@/store/admin/admin.types"
import type { Bus, Route, RouteStop } from "@/store/bus/bus.types"

export const AdminService = {

     // get all users
     async getAllUsers({ page, pageSize }: { page: number; pageSize: number }) {
          const response = await api.get<ListResponse<UserMeResponse>>(API_ENDPOINTS.USERS, {
               params: {
                    page,
                    page_size: pageSize,
               }
          })
          return {
               status: response.status,
               data: response.data
          }
     },

     async updateUser(id: string | number, data: Partial<UserMeResponse>) {
          const response = await api.patch<UserMeResponse>(`${API_ENDPOINTS.USERS}${id}/`, data)
          return {
               status: response.status,
               data: response.data,
          }
     },

     // get all bookings 
     async getAllBookings({ page, pageSize }: { page: number; pageSize: number }) {
          const response = await api.get<ListResponse<Booking>>(API_ENDPOINTS.GET_BOOKINGS, {
               params: {
                    page,
                    page_size: pageSize,
               }
          }
          )
          return {
               status: response.status,
               data: response.data
          }
     },

     // get all routes
     async getAllRoutes({ page, pageSize }: { page: number; pageSize: number }) {
          const response = await api.get<ListResponse<Route>>(API_ENDPOINTS.ROUTES_GET, {
               params: {
                    page,
                    page_size: pageSize,
               }
          }
          )
          return {
               status: response.status,
               data: response.data
          }
     },

     // get all schedules
     async getAllSchedule({ page, pageSize }: { page: number; pageSize: number }) {
          const response = await api.get<ListResponse<ScheduleGet>>(API_ENDPOINTS.SCHEDULE, {
               params: {
                    page,
                    page_size: pageSize,
               }
          }
          )
          return {
               status: response.status,
               data: response.data
          }
     },

     // get all 
     async getAllBuses({ page, pageSize }: { page: number; pageSize: number }) {
          const response = await api.get<ListResponse<Bus>>(API_ENDPOINTS.BUSES, {
               params: {
                    page,
                    page_size: pageSize,
               }
          }
          )
          return {
               status: response.status,
               data: response.data
          }
     },

     // get all Companies
     async getAllBusCompanies({ page, pageSize }: { page: number; pageSize: number }) {
          const response = await api.get<ListResponse<BusCompany>>(API_ENDPOINTS.BUS_COMPANIES, {
               params: {
                    page,
                    page_size: pageSize,
               }
          }
          )
          return {
               status: response.status,
               data: response.data
          }
     },

     async createBusCompany(data: Omit<BusCompany, "id">) {
          const response = await api.post<BusCompany>(API_ENDPOINTS.BUS_COMPANIES, data)
          return {
               status: response.status,
               data: response.data,
          }
     },

     async updateBusCompany(id: number, data: Partial<Omit<BusCompany, "id">>) {
          const response = await api.patch<BusCompany>(`${API_ENDPOINTS.BUS_COMPANIES}${id}/`, data)
          return {
               status: response.status,
               data: response.data,
          }
     },

     async deleteBusCompany(id: number) {
          const response = await api.delete(`${API_ENDPOINTS.BUS_COMPANIES}${id}/`)
          return {
               status: response.status,
          }
     },

     // Buses CRUD
     async createBus(data: Omit<Bus, "id">) {
          const response = await api.post<Bus>(API_ENDPOINTS.BUSES, data)
          return {
               status: response.status,
               data: response.data,
          }
     },

     async updateBus(id: number, data: Partial<Bus>) {
          const response = await api.patch<Bus>(`${API_ENDPOINTS.BUSES}${id}/`, data)
          return {
               status: response.status,
               data: response.data,
          }
     },

     deleteBus: async (id: number) => {
          const response = await api.delete(`${API_ENDPOINTS.BUSES}${id}/`)
          return {
               status: response.status,
          }
     },

     // Schedule CRUD
     async createSchedule(data: Omit<ScheduleGet, "id">) {
          const response = await api.post<ScheduleGet>(API_ENDPOINTS.SCHEDULE, data)
          return {
               status: response.status,
               data: response.data,
          }
     },

     async updateSchedule(id: number, data: Partial<ScheduleGet>) {
          const response = await api.patch<ScheduleGet>(`${API_ENDPOINTS.SCHEDULE}${id}/`, data)
          return {
               status: response.status,
               data: response.data,
          }
     },

     deleteSchedule: async (id: number) => {
          const response = await api.delete(`${API_ENDPOINTS.SCHEDULE}${id}/`)
          return {
               status: response.status,
          }
     },

     // Route Stops CRUD
     async createRouteStop(data: Omit<RouteStop, "id">) {
          const response = await api.post<RouteStop>(API_ENDPOINTS.ROUTE_STOPS, data)
          return {
               status: response.status,
               data: response.data,
          }
     },

     async updateRouteStop(id: number, data: Partial<RouteStop>) {
          const response = await api.patch<RouteStop>(`${API_ENDPOINTS.ROUTE_STOPS}${id}/`, data)
          return {
               status: response.status,
               data: response.data,
          }
     },

     async deleteRouteStop(id: number) {
          const response = await api.delete(`${API_ENDPOINTS.ROUTE_STOPS}${id}/`)
          return {
               status: response.status,
          }
     },

     async getRouteStops(routeId: number) {
          const response = await api.get<RouteStop[]>(`route/${routeId}/stops/`)
          return {
               status: response.status,
               data: response.data,
          }
     },

     // Schedule Templates
     async getAllScheduleTemplates({ page, pageSize }: { page: number; pageSize: number }) {
          const response = await api.get<ListResponse<ScheduleTemplate>>(API_ENDPOINTS.SCHEDULE_TEMPLATE, {
               params: {
                    page,
                    page_size: pageSize,
               },
          })

          return {
               status: response.status,
               data: response.data,
          }
     },

     // Seat layouts
     async getAllSeatLayouts({ page, pageSize }: { page: number; pageSize: number }) {
          const response = await api.get<ListResponse<SeatLayoutApi>>(API_ENDPOINTS.SEAT_LAYOUTS, {
               params: {
                    page,
                    page_size: pageSize,
               },
          })

          return {
               status: response.status,
               data: response.data,
          }
     },

     async createSeatLayout(data: Omit<SeatLayoutApi, "id">) {
          const response = await api.post<SeatLayoutApi>(API_ENDPOINTS.SEAT_LAYOUTS, data)
          return {
               status: response.status,
               data: response.data,
          }
     },

     async updateSeatLayout(id: number, data: Partial<Omit<SeatLayoutApi, "id">>) {
          const response = await api.patch<SeatLayoutApi>(`${API_ENDPOINTS.SEAT_LAYOUTS}${id}/`, data)
          return {
               status: response.status,
               data: response.data,
          }
     },

     async deleteSeatLayout(id: number) {
          const response = await api.delete(`${API_ENDPOINTS.SEAT_LAYOUTS}${id}/`)
          return {
               status: response.status,
          }
     },

     createRoute: async (data: Omit<Route, 'id'>) => {
          return api.post(API_ENDPOINTS.ROUTES_GET, data)
     },

     updateRoute: async (id: number, data: Partial<Route>) => {
          return api.patch(`${API_ENDPOINTS.ROUTES_GET}${id}/`, data)
     },

     deleteRoute: async (id: number) => {
          return api.delete(`${API_ENDPOINTS.ROUTES_GET}${id}/`)
     },
}

