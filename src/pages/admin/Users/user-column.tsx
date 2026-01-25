import { type ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../../../components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"
import { Button } from "../../../components/ui/button"
import type { UserMeResponse } from "@/store/auth/auth.types"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const UserColumns: ColumnDef<UserMeResponse>[] = [

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
          accessorKey: "first_name",
          header: ({ column }) => {
               return (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         First Name
                         <ArrowUpDown />
                    </Button>
               )
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("first_name")}</div>,
     },
     {
          accessorKey: "last_name",
          header: ({ column }) => {
               return (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         Last Name
                         <ArrowUpDown />
                    </Button>
               )
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("last_name")}</div>,
     },
     {
          accessorKey: "email",
          header: ({ column }) => {
               return (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         Email
                         <ArrowUpDown />
                    </Button>
               )
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
     },
     {
          accessorKey: "username",
          header: ({ column }) => {
               return (
                    <Button
                         variant="ghost"
                         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                         Username
                         <ArrowUpDown />
                    </Button>
               )
          },
          cell: ({ row }) => <div className="lowercase">{row.getValue("username")}</div>,
     },
]