import { create } from "zustand"
import type { User } from "./auth.types"
import { userServices } from "@/api/services/user.service"

type AuthState = {
     loading: boolean
     user: User | null
     isAuthenticated: boolean
     isLoggedIn: boolean

     fetchUser: () => Promise<User | null>
}

export const useAuthUserStore = create<AuthState>((set) => ({
     loading: false,
     user: null,
     isAuthenticated: false,
     isLoggedIn: false,

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

               set({
                    user: userData,
                    isAuthenticated: true,
                    isLoggedIn: true,
               })

               return userData
          } catch {
               set({
                    user: null,
                    isAuthenticated: false,
                    isLoggedIn: false,
               })
               return null
          }
     },

}))