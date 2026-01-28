import { useEffect } from "react"
import { AdminStore } from "@/store/admin/admin.store"

export const useRouteStops = (routeId?: number) => {
     const routeStops = AdminStore(state => state.routeStops)
     const loading = AdminStore(state => state.loading)
     const error = AdminStore(state => state.error)
     const getRouteStops = AdminStore(state => state.getRouteStops)
     const createRouteStop = AdminStore(state => state.createRouteStop)
     const updateRouteStop = AdminStore(state => state.updateRouteStop)
     const deleteRouteStop = AdminStore(state => state.deleteRouteStop)

     useEffect(() => {
          if (routeId) {
               getRouteStops(routeId)
          }
     }, [getRouteStops, routeId])

     return {
          routeStops,
          loading,
          error,
          createRouteStop,
          updateRouteStop,
          deleteRouteStop,
          refetch: () => routeId && getRouteStops(routeId),
     }
}
