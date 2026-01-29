import { create } from "zustand"
import type { User } from "./auth.types"
import { userServices } from "@/api/services/user.service"
import type { Booking } from "../admin/admin.types"
import { getErrorMessage } from "@/utils/error"

type PaginationMeta = {
     count: number
     next: string | null
     previous: string | null
}

type AuthState = {
     loading: boolean
     error: string
     user: User | null
     isAuthenticated: boolean
     isLoggedIn: boolean

     MyBookings: Booking[] | null
     MyBookingsPagination: PaginationMeta | null

     fetchUser: () => Promise<User | null>
     fetchUserBookings: (page?: number, pageSize?: number) => Promise<void>
}

export const useAuthUserStore = create<AuthState>((set) => ({
     loading: false,
     error: "",
     user: null,
     isAuthenticated: false,
     isLoggedIn: false,

     MyBookings: null,
     MyBookingsPagination: null,

     fetchUser: async (): Promise<User | null> => {
          try {
               const res = await userServices.getUserMe()
               const userData: User = {
                    id: res.data.id,
                    firstName: res.data.first_name,
                    lastName: res.data.last_name,
                    email: res.data.email,
                    phone: res.data.phone,
                    username: res.data.username,
                    isActive: res.data.is_active,
                    isAdmin: res.data.is_admin,
                    isStaff: res.data.is_staff,
               }

               set((state) => ({
                    ...state,
                    user: userData,
                    isAuthenticated: true,
                    isLoggedIn: true,
               }))

               return userData
          } catch {
               set((state) => ({
                    ...state,
                    user: null,
                    isAuthenticated: false,
                    isLoggedIn: false,
               }))
               return null
          }
     },

     fetchUserBookings: async (page = 1, pageSize = 20) => {
          set(state => ({ ...state, loading: true, error: "" }))

          try {
               const res = await userServices.getAllMyBookings({ page, pageSize })

               set(state => ({
                    ...state,
                    MyBookings: res.data.results,
                    MyBookingsPagination: {
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