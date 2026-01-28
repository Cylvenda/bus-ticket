import { useEffect } from "react"
import { AdminStore } from "@/store/admin/admin.store"

export const useScheduleTemplates = (page = 1, pageSize = 10) => {
     const scheduleTemplates = AdminStore(state => state.scheduleTemplates)
     const scheduleTemplatesPagination = AdminStore(state => state.scheduleTemplatesPagination)
     const loading = AdminStore(state => state.loading)
     const error = AdminStore(state => state.error)
     const fetchScheduleTemplates = AdminStore(state => state.fetchScheduleTemplates)

     useEffect(() => {
          fetchScheduleTemplates(page, pageSize)
     }, [fetchScheduleTemplates, page, pageSize])

     // Calculate total pages based on backend pagination
     const totalPages = Math.ceil((scheduleTemplatesPagination?.count ?? 0) / pageSize)

     return { scheduleTemplates, scheduleTemplatesPagination, loading, error, totalPages }
}
