import { type ColumnDef } from "@tanstack/react-table"
import { Actions } from "./actions"
import type { Bus } from "@/store/bus/bus.types"

interface BusesColumnsProps {
     onView: (bus: Bus) => void
     onEdit: (bus: Bus) => void
     onDelete: (bus: Bus) => void
}

export const BusesColumns = ({ onView, onEdit, onDelete }: BusesColumnsProps): ColumnDef<Bus>[] => [
     {
          accessorKey: "plate_number",
          header: "Plate Number",
          cell: ({ row }) => (
               <div className="font-medium">{row.getValue("plate_number")}</div>
          ),
     },
     {
          accessorKey: "bus_type",
          header: "Bus Type",
          cell: ({ row }) => (
               <div className="font-medium">{row.getValue("bus_type")}</div>
          ),
     },
     {
          accessorKey: "company_name",
          header: "Company",
          cell: ({ row }) => (
               <div className="font-medium">{row.getValue("company_name")}</div>
          ),
     },
     {
          accessorKey: "total_seats",
          header: "Total Seats",
          cell: ({ row }) => (
               <div className="text-sm">{row.getValue("total_seats")}</div>
          ),
     },
     {
          accessorKey: "is_active",
          header: "Status",
          cell: ({ row }) => (
               <div className={`text-sm font-medium ${row.getValue("is_active") ? "text-green-600" : "text-red-600"}`}>
                    {row.getValue("is_active") ? "Active" : "Inactive"}
               </div>
          ),
     },
     {
          id: "actions",
          header: "Actions",
          cell: ({ row }) => {
               const bus = row.original
               return (
                    <Actions
                         bus={bus}
                         onView={() => onView(bus)}
                         onEdit={() => onEdit(bus)}
                         onDelete={() => onDelete(bus)}
                    />
               )
          },
     },
]