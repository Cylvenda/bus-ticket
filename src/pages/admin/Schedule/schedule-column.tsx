import { type ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../../../components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"
import { Button } from "../../../components/ui/button"
import type { ScheduleGet } from "@/store/admin/admin.types"

export const ScheduleColumns: ColumnDef<ScheduleGet>[] = [

     {
          id: "select",
          header: ({ table }) => (
               <Checkbox
                    checked={
                         table.getIsAllPageRowsSelected() ||
                         (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
               />
          ),
          cell: ({ row }) => (
               <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
               />
          ),
          enableSorting: false,
          enableHiding: false,
     },
     {
          accessorKey: "id",
          header: "id",
          cell: ({ row }) => (
               <div className="capitalize">{row.getValue("id")}</div>
          ),
     },
     {
          accessorKey: "travel_date",
          header: ({ column }) => {
               return (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         Travel Date
                         <ArrowUpDown />
                    </Button>
               )
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("travel_date")}</div>,
     },
     {
          accessorKey: "arrival_time",
          header: ({ column }) => {
               return (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         Arrival Time
                         <ArrowUpDown />
                    </Button>
               )
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("arrival_time")}</div>,
     },
     {
          accessorKey: "departure_time",
          header: ({ column }) => {
               return (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         Depature Time
                         <ArrowUpDown />
                    </Button>
               )
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("departure_time")}</div>,
     },
     {
          accessorKey: "price",
          header: ({ column }) => {
               return (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         Price
                         <ArrowUpDown />
                    </Button>
               )
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("price")}</div>,
     },
]