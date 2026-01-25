import { CardCount } from "@/components/cards/dashboard-counts"
import PagesWrapper from "@/components/layout/pages-wrapper"
import { DataTable } from "@/components/table/table-data"
import { Card } from "@/components/ui/card"
import { BusesColumns } from "./bus-columns"
import { TablePagination } from "@/components/table/bookings-paginationtable"
import { useState } from "react"
import { BusesActions } from './actions';
import { useBuses } from "@/hooks/use-admin/useBuses"
import type { Bus } from "@/store/bus/bus.types"

const Buses = () => {

  const PAGE_SIZE = 10
  const [page, setPage] = useState(1)

  const { buses, totalPages } = useBuses(page, PAGE_SIZE)

  const userDetails = [
    { id: 1, name: "Total Buses", count: buses?.length },
    { id: 2, name: "Active buses", count: buses?.filter(u => u.is_active).length },
    { id: 3, name: "InActive buses buses", count: buses?.filter(u => !u.is_active).length },
  ]

  const [selected, setSelected] = useState<Bus | null>(null)
  const [mode, setMode] = useState<"view" | "edit" | null>(null)


  return (
    <PagesWrapper>

      <CardCount items={userDetails} />
      <Card className="mt-4">
        <DataTable
          data={buses ?? []}
          columns={BusesColumns}
          actions={(buses) => (
            <BusesActions
              buses={buses}
              onView={() => {
                setSelected(buses)
                setMode("view")
              }}
              onEdit={() => {
                setSelected(buses)
                setMode("edit")
              }}
            />
          )}
        />
        <TablePagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </Card>

    </PagesWrapper>
  )
}

export default Buses