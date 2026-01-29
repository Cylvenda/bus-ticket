import { type ColumnDef } from "@tanstack/react-table"
import { Actions } from "./actions"
import type { ScheduleGet } from "@/store/admin/admin.types"

interface ScheduleColumnsProps {
     onView: (schedule: ScheduleGet) => void
     onEdit: (schedule: ScheduleGet) => void
     onDelete: (schedule: ScheduleGet) => void
}

export const ScheduleColumns = ({ onView, onEdit, onDelete }: ScheduleColumnsProps): ColumnDef<ScheduleGet>[] => [
     {
          accessorKey: "travel_date",
          header: "Travel Date",
          cell: ({ row }) => (
               <div className="font-medium">{row.getValue("travel_date")}</div>
          ),
     },
     {
          accessorKey: "departure_time",
          header: "Departure Time",
          cell: ({ row }) => (
               <div className="font-medium">{row.getValue("departure_time")}</div>
          ),
     },
     {
          accessorKey: "arrival_time",
          header: "Arrival Time",
          cell: ({ row }) => (
               <div className="font-medium">{row.getValue("arrival_time")}</div>
          ),
     },
     {
          accessorKey: "price",
          header: "Price",
          cell: ({ row }) => (
               <div className="font-medium">TZS {row.getValue("price")}</div>
          ),
     },
     {
          accessorKey: "template",
          header: "Route",
          cell: ({ row }) => {
               const template = row.original.template
               return (
                    <div className="font-medium">
                         Route ID: {template?.route}
                    </div>
               )
          },
     },
     {
          id: "actions",
          header: "Actions",
          cell: ({ row }) => {
               const schedule = row.original
               return (
                    <Actions
                         schedule={schedule}
                         onView={() => onView(schedule)}
                         onEdit={() => onEdit(schedule)}
                         onDelete={() => onDelete(schedule)}
                    />
               )
          },
     },
]