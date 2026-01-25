import type { Route, Schedule, ScheduleSearchPayload, GetBookedSeatsPayload, HoldSeatResult } from "@/store/bus/bus.types"
import api from "../axios"
import { API_ENDPOINTS } from "../endpoints"
import type { ApiResponse } from "../types"

export const BusBookingService = {

     // fetching active routes
     async getRoutes() {
          const response = await api.get<ApiResponse<Route[]>>(API_ENDPOINTS.ROUTES)
          return {
               status: response.data,
               data: response.data
          }
     },

     // fetching schedules based on user search criteria
     async getSchedules(payload: ScheduleSearchPayload): Promise<ApiResponse<Schedule[]>> {
          const response = await api.post<Schedule[]>(API_ENDPOINTS.SCHEDULES, payload)
          return {
               status: response.status,
               data: response.data
          }
     },

     // fetching booked seats for a specific schedule and bus assignment
     async getBookedSeats(payload: GetBookedSeatsPayload): Promise<ApiResponse<HoldSeatResult[]>> {
          const response = await api.post<HoldSeatResult[]>(API_ENDPOINTS.BOOKED_SEATS, payload)
          return {
               status: response.status,
               data: response.data
          }
     },

     // holding seats for a specific schedule and bus assignment
     async holdSeats(payload: GetBookedSeatsPayload): Promise<ApiResponse<string[]>> {
          const response = await api.post<string[]>(API_ENDPOINTS.HOLD_SEAT, payload)
          return {
               status: response.status,
               data: response.data
          }
     },
     
     // get all bookings 

}

