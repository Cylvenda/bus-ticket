import { create } from "zustand"
import type { User } from "./auth.types"
import { userServices } from "@/api/services/user.service"

type AuthState = {
     loading: boolean
     user: User | null
     isAuthenticated: boolean
     isLoggedIn: boolean

     fetchUser: () => Promise<void>
}

export const useAuthUserStore = create<AuthState>((set,) => ({
     loading: false,
     user: null,
     isAuthenticated: false,
     isLoggedIn: false,

     fetchUser: async () => {
          try {

               const res = await userServices.getUserMe()

               const userData = {
                    id: res.data.id,
                    firstName: res.data.first_name,
                    lastName: res.data.last_name,
                    email: "brayanmlawa0917@gmail.com",
                    phone: res.data.phone ?? null,
                    username: res.data.username,
                    isActive: false,
                    isStaff: res.data.is_staff,
                    isAdmin: res.data.is_admin ?? null
               }

               set({
                    user: userData,
                    isAuthenticated: true,
                    isLoggedIn: true,
               })
          } catch (error) {
               console.error("Failed to fetch user:", error)
               set({
                    user: null,
                    isAuthenticated: false,
                    isLoggedIn: false,
               })
          }
     },
}))
