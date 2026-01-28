import {
     type ColumnDef,
} from "@tanstack/react-table"
import { Actions } from "./actions"
import type { Route } from "@/store/admin/admin.types"

export const RoutesColumns = ({ onView, onEdit, onDelete, onViewStops, onManageStops }: {
     onView: (route: Route) => void
     onEdit: (route: Route) => void
     onDelete: (route: Route) => void
     onViewStops: (route: Route) => void
     onManageStops: (route: Route) => void
}): ColumnDef<Route>[] => [
          {
               accessorKey: "origin",
               header: "Origin",
               cell: ({ row }) => (
                    <div className="font-medium">{row.getValue("origin")}</div>
               ),
          },
          {
               accessorKey: "destination",
               header: "Destination",
               cell: ({ row }) => (
                    <div className="font-medium">{row.getValue("destination")}</div>
               ),
          },
          {
               id: "actions",
               header: "Actions",
               cell: ({ row }) => {
                    const route = row.original
                    return (
                         <Actions
                              route={route}
                              onView={() => onView(route)}
                              onEdit={() => onEdit(route)}
                              onDelete={() => onDelete(route)}
                              onViewStops={() => onViewStops(route)}
                              onManageStops={() => onManageStops(route)}
                         />
                    )
               },
          },
     ]
