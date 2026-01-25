import { type ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../../../components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"
import { Button } from "../../../components/ui/button"
import type { Bus } from "@/store/bus/bus.types"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const BusesColumns: ColumnDef<Bus>[] = [

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
          accessorKey: "plate_number",
          header: ({ column }) => {
               return (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         Plate Number
                         <ArrowUpDown />
                    </Button>
               )
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("plate_number")}</div>,
     },
     {
          accessorKey: "bus_type",
          header: ({ column }) => {
               return (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         Bus Type
                         <ArrowUpDown />
                    </Button>
               )
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("bus_type")}</div>,
     },
]