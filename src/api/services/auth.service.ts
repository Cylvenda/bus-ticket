import type { User } from "@/types/user"
import api from "../axios"
import { API_ENDPOINTS } from "../endpoints"
import type { ApiResponse } from "../types"

export const authUserService = {

     async userRegister(payload: User): Promise<ApiResponse<User>> {
          const response = await api.post<User>(API_ENDPOINTS.USER_REGISTRATION, payload)
          return {
               data: response.data,
               status: response.status
          }
     },

     async userLogin(payload: User): Promise<ApiResponse<User>>{
          const response = await api.post<User>(API_ENDPOINTS.USER_TOKEN_LOGIN, payload)
          return {
               data: response.data,
               status: response.status
          }
     }
}


