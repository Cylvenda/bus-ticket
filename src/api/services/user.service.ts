import type { AccountActivation, UserMeResponse } from "@/store/auth/auth.types"
import api from "../axios"
import { API_ENDPOINTS } from "../endpoints"


export const userServices = {

     async getUserMe() {
          const response = await api.get<UserMeResponse>(API_ENDPOINTS.CURRENT_USER_PROFILE)
          return {
               status: response.status,
               data: response.data,
          }
     },

     async emailActivation(payload: string) {
          const response = await api.post(API_ENDPOINTS.USER_RESEND_ACTIVATION_EMAIL, { email: payload })
          return {
               status: response.status,
               data: response.data
          }
     },

     async accountActivation(payload: AccountActivation) {
          const response = await api.post(API_ENDPOINTS.USER_ACCOUNT_ACTIVATION, payload)
          return {
               status: response.status,
               data: response.data
          }
     },

     async getAllMyBookings({ page, pageSize }: { page: number; pageSize: number }) {
          const response = await api.get(API_ENDPOINTS.GET_MY_BOOKING, {
               params: {
                    page,
                    page_size: pageSize,
               }
          })
          return {
               status: response.status,
               data: response.data
          }
     }
}