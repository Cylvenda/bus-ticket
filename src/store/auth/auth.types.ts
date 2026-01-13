export type User = {
     id: string | number,
     firstName: string
     lastName: string
     username: string | null
     email: string 
     phone?: string | null
     isActive: boolean
     isAdmin?: boolean
     isStaff: boolean
}

export type UserMeResponse = {
     id: string | number
     first_name: string
     last_name: string
     email: string
     phone?: string | null
     username?: string | null
     is_active: boolean
     is_admin?: boolean
     is_staff: boolean
}

export type AccountActivation = {
     uid: string
     token: string
}
