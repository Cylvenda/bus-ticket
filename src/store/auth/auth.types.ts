import type { PassengerInfo } from "@/types/user"

export type User = {
     id: string | number,
     firstName: string
     lastName: string
     username: string 
     email: string 
     phone: string 
     isActive: boolean
     isAdmin: boolean
     isStaff: boolean
}

export type UserMeResponse = {
     id: string | number
     first_name: string
     last_name: string
     email: string
     phone: string 
     username: string 
     is_active: boolean
     is_admin: boolean
     is_staff: boolean
}

export type AccountActivation = {
     uid: string
     token: string
}

export interface BookingResponse {
     booking_id: number
     passenger: PassengerInfo
     total_amount: number
     payment_status: "PENDING" | "PAID" | "FAILED"
}