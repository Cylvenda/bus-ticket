import type { Route } from "@/store/bus/bus.types"
import { type ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../ui/checkbox"
import { ArrowUpDown } from "lucide-react"
import { Button } from "../ui/button"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const RoutesColumns: ColumnDef<Route>[] = [

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
          accessorKey: "origin",
          header: ({ column }) => {
               return (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         From
                         <ArrowUpDown />
                    </Button>
               )
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("origin")}</div>,
     },
     {
          accessorKey: "destination",
          header: ({ column }) => {
               return(
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         To
                         <ArrowUpDown />
                    </Button>
               )
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("destination")}</div>,
     },
     {
          accessorKey: "distance_km",
          header: "Distance / km",
     },
     {
          accessorKey: "estimated_duration_minutes",
          header: "Estimated Duration",
     },
]