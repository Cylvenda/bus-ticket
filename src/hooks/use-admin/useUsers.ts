import { useEffect } from "react"
import { AdminStore } from "@/store/admin/admin.store"

export const useUsers = (page = 1, pageSize = 10) => {
     const users = AdminStore(state => state.users)
     const usersPagination = AdminStore(state => state.usersPagination)
     const loading = AdminStore(state => state.loading) // optional: make users-specific if needed
     const error = AdminStore(state => state.error)     // optional: same

     const fetchUsers = AdminStore(state => state.fetchUsers)

     useEffect(() => {
          fetchUsers(page, pageSize)
     }, [fetchUsers, page, pageSize])

     // Calculate total pages based on backend pagination
     const totalPages = Math.ceil((usersPagination?.count ?? 0) / pageSize)

     return { users, usersPagination, loading, error, totalPages }
}
