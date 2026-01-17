import {
     type ColumnDef,
     flexRender,
     getCoreRowModel,
     getFilteredRowModel,
     getSortedRowModel,
     useReactTable,
} from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { useBusBookingStore } from "@/store/bus/busBooking.store"
import type { Booking } from "@/store/bus/bus.types"

interface Props {
     data: Booking[]
     onView: (b: Booking) => void
     onCancel: (b: Booking) => void
}

export function BookingsTable({ data, onView, onCancel }: Props) {
     const [globalFilter, setGlobalFilter] = useState("")

     const { fetchBookings, } = useBusBookingStore()

     useEffect(() => {
          fetchBookings()

     }, [fetchBookings])

     const columns: ColumnDef<Booking>[] = [
          {
               accessorKey: "name",
               header: "User",
          },
          {
               header: "Route",
               cell: ({ row }) =>
                    `${row.original.schedule.route_origin} → ${row.original.schedule.route_destination}`,
          },
          {
               header: "Bus",
               cell: ({ row }) => row.original.bus_assignment.company_name,
          },
          {
               id: "actions",
               cell: ({ row }) => (
                    <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                   <MoreHorizontal className="h-4 w-4" />
                              </Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onView(row.original)}>
                                   View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                   className="text-red-600"
                                   onClick={() => onCancel(row.original)}
                              >
                                   Cancel
                              </DropdownMenuItem>
                         </DropdownMenuContent>
                    </DropdownMenu>
               ),
          },
     ]

     const table = useReactTable({
          data,
          columns,
          state: { globalFilter },
          onGlobalFilterChange: setGlobalFilter,
          getCoreRowModel: getCoreRowModel(),
          getFilteredRowModel: getFilteredRowModel(),
          getSortedRowModel: getSortedRowModel(),
     })

     console.log("Form table page: " + data)

     return (
          <>
               <Input
                    placeholder="Search bookings..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="mb-4 max-w-sm"
               />

               <div className="rounded-md border hidden md:block">
                    <table className="w-full">
                         <thead className="border-b">
                              {table.getHeaderGroups().map(hg => (
                                   <tr key={hg.id}>
                                        {hg.headers.map(header => (
                                             <th
                                                  key={header.id}
                                                  className="p-3 text-left cursor-pointer"
                                                  onClick={header.column.getToggleSortingHandler()}
                                             >
                                                  {flexRender(header.column.columnDef.header, header.getContext())}
                                             </th>
                                        ))}
                                   </tr>
                              ))}
                         </thead>

                         <tbody>
                              {table.getRowModel().rows.map(row => (
                                   <tr key={row.id} className="border-b">
                                        {row.getVisibleCells().map(cell => (
                                             <td key={cell.id} className="p-3">
                                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                             </td>
                                        ))}
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>

               {/* 📱 Mobile Cards */}
               <div className="space-y-3 md:hidden">
                    {
                         data.map(item => (
                              <div key={item.id} className="rounded-lg border p-3">
                                   <p className="font-semibold">{""}</p>
                                   <p className="text-sm">{item.schedule.route_origin} → {item.schedule.route_destination}</p>
                                   <p className="text-sm text-muted-foreground">{item.bus_assignment.company_name}</p>

                                   <div className="flex justify-end mt-2 gap-2">
                                        <Button size="sm" onClick={() => onView(item)}>View</Button>
                                        <Button size="sm" variant="destructive" onClick={() => onCancel(item)}>
                                             Cancel
                                        </Button>
                                   </div>
                              </div>
                         ))}
               </div>
          </>
     )
}
