import type { PassengerFinalInfo, User } from "@/types/user"
import api from "../axios"
import { API_ENDPOINTS } from "../endpoints"
import type { ApiResponse } from "../types"
import type { TicketDataTypes } from "@/store/passenger/passenger.type"

export const authUserService = {

     async userRegister(payload: User): Promise<ApiResponse<User>> {
          const response = await api.post<User>(API_ENDPOINTS.USER_REGISTRATION, payload)
          return {
               data: response.data,
               status: response.status
          }
     },

     async userLogin(payload: User): Promise<ApiResponse<User>> {
          const response = await api.post<User>(API_ENDPOINTS.USER_TOKEN_LOGIN, payload)
          return {
               data: response.data,
               status: response.status
          }
     },

     async bookingCreate(payload: PassengerFinalInfo): Promise<ApiResponse<TicketDataTypes>> {
          const response = await api.post<PassengerFinalInfo>(API_ENDPOINTS.BOOKINGS, payload)
          return {
               data: response.data,
               status: response.status
          }
     },

     async logOut() {
          const response = await api.post(API_ENDPOINTS.USER_LOGOUT)

          return {
               data: response.data as { detail: string },
               status: response.status,
          }
     }
}
