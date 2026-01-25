"use client"

import {
     type ColumnDef,
     flexRender,
     getCoreRowModel,
     getFilteredRowModel,
     getSortedRowModel,
     useReactTable,
     type SortingState,
     type Row,
} from "@tanstack/react-table"
import { useState, useMemo, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { ChevronsUpDown, ArrowUp, ArrowDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface DataTableProps<TData> {
     data: TData[]
     columns: ColumnDef<TData>[]
     searchPlaceholder?: string
     searchable?: boolean
     mobileCard?: (item: TData) => React.ReactNode
     actions?: (item: TData) => React.ReactNode
     isLoading?: boolean
     emptyMessage?: string
     className?: string
}

export function DataTable<TData>({
     data,
     columns,
     searchPlaceholder = "Search...",
     searchable = true,
     mobileCard,
     actions,
     isLoading = false,
     emptyMessage = "No results found.",
     className,
}: DataTableProps<TData>) {
     const [globalFilter, setGlobalFilter] = useState("")
     const [sorting, setSorting] = useState<SortingState>([])

     // Memoize the actions column to prevent recreation on every render
     const enhancedColumns = useMemo(() => {
          if (!actions) return columns

          const actionColumn: ColumnDef<TData> = {
               id: "actions",
               header: () => <span className="sr-only">Actions</span>,
               cell: ({ row }) => (
                    <div className="flex gap-2 justify-end" role="group" aria-label="Row actions">
                         {actions(row.original)}
                    </div>
               ),
               enableSorting: false,
               enableHiding: false,
          }

          return [...columns, actionColumn]
     }, [columns, actions])

     const table = useReactTable({
          data,
          columns: enhancedColumns,
          state: { globalFilter, sorting },
          onGlobalFilterChange: setGlobalFilter,
          onSortingChange: setSorting,
          getCoreRowModel: getCoreRowModel(),
          getFilteredRowModel: getFilteredRowModel(),
          getSortedRowModel: getSortedRowModel(),
          globalFilterFn: (row, columnIds, filterValue) => {
               const searchValue = String(filterValue).toLowerCase().trim()
               if (!searchValue) return true

               return columnIds.some(id => {
                    const value = row.getValue(id)
                    if (value == null) return false
                    return String(value).toLowerCase().includes(searchValue)
               })
          },
     })

     const getSortIcon = useCallback((columnId: string) => {
          const column = table.getColumn(columnId)
          if (!column?.getCanSort()) return null

          const sorting = column.getIsSorted()

          if (!sorting) {
               return (
                    <ChevronsUpDown
                         className="inline w-4 h-4 ml-1 text-muted-foreground"
                         aria-hidden="true"
                    />
               )
          }
          if (sorting === "asc") {
               return (
                    <ArrowUp
                         className="inline w-4 h-4 ml-1 text-primary"
                         aria-label="Sorted ascending"
                    />
               )
          }
          if (sorting === "desc") {
               return (
                    <ArrowDown
                         className="inline w-4 h-4 ml-1 text-primary"
                         aria-label="Sorted descending"
                    />
               )
          }
     }, [table])

     const rows = table.getRowModel().rows
     const hasResults = rows.length > 0
     const totalColumns = enhancedColumns.length

     // Loading state
     if (isLoading) {
          return (
               <div className={cn("w-full", className)}>
                    {searchable && (
                         <div className="w-full px-4 md:px-6 mb-4 flex justify-end">
                              <div className="max-w-sm w-full h-10 bg-muted animate-pulse rounded-md" />
                         </div>
                    )}
                    <div className="rounded-md border">
                         <div className="p-8 text-center">
                              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                   <span className="sr-only">Loading...</span>
                              </div>
                              <p className="mt-2 text-sm text-muted-foreground">Loading data...</p>
                         </div>
                    </div>
               </div>
          )
     }

     return (
          <div className={cn("w-full", className)}>
               {/* Search Input */}
               {searchable && (
                    <div className="w-full px-4 md:px-6 mb-4 flex justify-end">
                         <div className="relative max-w-sm w-full">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                   placeholder={searchPlaceholder}
                                   value={globalFilter}
                                   onChange={(e) => setGlobalFilter(e.target.value)}
                                   className="pl-9"
                                   aria-label="Search table"
                              />
                         </div>
                    </div>
               )}

               {/* Desktop Table */}
               <div className="rounded-md border hidden md:block overflow-x-auto">
                    <table className="w-full table-auto" role="table" aria-label="Data table">
                         <thead className="border-b bg-muted/50">
                              {table.getHeaderGroups().map((headerGroup) => (
                                   <tr key={headerGroup.id} role="row">
                                        {headerGroup.headers.map((header) => {
                                             const canSort = header.column.getCanSort()
                                             const sortHandler = header.column.getToggleSortingHandler()

                                             return (
                                                  <th
                                                       key={header.id}
                                                       className={cn(
                                                            "p-3 text-left font-medium text-sm whitespace-nowrap",
                                                            canSort && "cursor-pointer select-none hover:bg-muted transition-colors"
                                                       )}
                                                       onClick={canSort ? sortHandler : undefined}
                                                       onKeyDown={
                                                            canSort
                                                                 ? (e) => {
                                                                      if (e.key === "Enter" || e.key === " ") {
                                                                           e.preventDefault()
                                                                           sortHandler?.(e)
                                                                      }
                                                                 }
                                                                 : undefined
                                                       }
                                                       tabIndex={canSort ? 0 : undefined}
                                                       role="columnheader"
                                                       aria-sort={
                                                            header.column.getIsSorted() === "asc"
                                                                 ? "ascending"
                                                                 : header.column.getIsSorted() === "desc"
                                                                      ? "descending"
                                                                      : undefined
                                                       }
                                                  >
                                                       <div className="flex items-center">
                                                            {header.isPlaceholder
                                                                 ? null
                                                                 : flexRender(
                                                                      header.column.columnDef.header,
                                                                      header.getContext()
                                                                 )}
                                                            {canSort && getSortIcon(header.id)}
                                                       </div>
                                                  </th>
                                             )
                                        })}
                                   </tr>
                              ))}
                         </thead>

                         <tbody>
                              {hasResults ? (
                                   rows.map((row) => (
                                        <tr
                                             key={row.id}
                                             className="border-b last:border-b-0 hover:bg-muted/50 transition-colors"
                                             role="row"
                                        >
                                             {row.getVisibleCells().map((cell) => (
                                                  <td
                                                       key={cell.id}
                                                       className="p-3 whitespace-nowrap"
                                                       role="cell"
                                                  >
                                                       {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                       )}
                                                  </td>
                                             ))}
                                        </tr>
                                   ))
                              ) : (
                                   <tr>
                                        <td
                                             colSpan={totalColumns}
                                             className="text-center p-8"
                                             role="cell"
                                        >
                                             <div className="flex flex-col items-center justify-center gap-2">
                                                  <p className="text-muted-foreground font-medium">
                                                       {emptyMessage}
                                                  </p>
                                                  {globalFilter && (
                                                       <p className="text-sm text-muted-foreground">
                                                            Try adjusting your search
                                                       </p>
                                                  )}
                                             </div>
                                        </td>
                                   </tr>
                              )}
                         </tbody>
                    </table>
               </div>

               {/* Mobile Cards */}
               <div className="md:hidden">
                    {hasResults ? (
                         <div className="space-y-3 px-4">
                              {rows.map((row) => (
                                   <div
                                        key={row.id}
                                        className="border rounded-lg p-4 shadow-sm bg-card hover:shadow-md transition-shadow"
                                   >
                                        {mobileCard ? (
                                             <>
                                                  {mobileCard(row.original)}
                                                  {actions && (
                                                       <div className="flex justify-end gap-2 mt-3 pt-3 border-t">
                                                            {actions(row.original)}
                                                       </div>
                                                  )}
                                             </>
                                        ) : (
                                             <div className="space-y-2">
                                                  {row.getVisibleCells().map((cell) => {
                                                       const header = cell.column.columnDef.header
                                                       const headerText =
                                                            typeof header === "string"
                                                                 ? header
                                                                 : cell.column.id

                                                       // Skip actions column in default mobile view
                                                       if (cell.column.id === "actions") {
                                                            return (
                                                                 <div key={cell.id} className="flex justify-end gap-2 pt-2 border-t">
                                                                      {flexRender(
                                                                           cell.column.columnDef.cell,
                                                                           cell.getContext()
                                                                      )}
                                                                 </div>
                                                            )
                                                       }

                                                       return (
                                                            <div key={cell.id} className="flex justify-between gap-2">
                                                                 <span className="font-medium text-sm text-muted-foreground">
                                                                      {headerText}:
                                                                 </span>
                                                                 <span className="text-sm text-right">
                                                                      {flexRender(
                                                                           cell.column.columnDef.cell,
                                                                           cell.getContext()
                                                                      )}
                                                                 </span>
                                                            </div>
                                                       )
                                                  })}
                                             </div>
                                        )}
                                   </div>
                              ))}
                         </div>
                    ) : (
                         <div className="border rounded-lg p-8 text-center mx-4">
                              <p className="text-muted-foreground font-medium">
                                   {emptyMessage}
                              </p>
                              {globalFilter && (
                                   <p className="text-sm text-muted-foreground mt-2">
                                        Try adjusting your search
                                   </p>
                              )}
                         </div>
                    )}
               </div>
          </div>
     )
}