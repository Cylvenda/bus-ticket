import type { UserMeResponse } from "@/store/auth/auth.types"
import api from "../axios"
import { API_ENDPOINTS } from "../endpoints"
import type { Booking, BusCompany, ListResponse, ScheduleGet } from "@/store/admin/admin.types"
import type { Bus, Route } from "@/store/bus/bus.types"

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

     // In admin.service.ts
     createRoute: async (data: Omit<Route, 'id'>) => {
          return api.post('/admin/routes/', data)
     },

     updateRoute: async (id: number, data: Partial<Route>) => {
          return api.patch(`/admin/routes/${id}/`, data)
     },

     deleteRoute: async (id: number) => {
          return api.delete(`/admin/routes/${id}/`)
     },
}

