import { type ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../../../components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"
import { Button } from "../../../components/ui/button"
import type { BusCompany } from "@/store/admin/admin.types"

export const BusCompnyColumns: ColumnDef<BusCompany>[] = [

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
          accessorKey: "name",
          header: ({ column }) => {
               return (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         Company Name
                         <ArrowUpDown />
                    </Button>
               )
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
     },
     {
          accessorKey: "contact_email",
          header: ({ column }) => {
               return (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         Company Email
                         <ArrowUpDown />
                    </Button>
               )
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("contact_email")}</div>,
     },
     {
          accessorKey: "license_number",
          header: ({ column }) => {
               return (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         License
                         <ArrowUpDown />
                    </Button>
               )
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("licence_number")}</div>,
     }
]