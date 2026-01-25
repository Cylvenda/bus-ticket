import { CardCount } from "@/components/cards/dashboard-counts"
import PagesWrapper from "@/components/layout/pages-wrapper"
import { DataTable } from "@/components/table/table-data"
import { Card } from "@/components/ui/card"
import { ScheduleColumns } from "./schedule-column"
import { TablePagination } from "@/components/table/bookings-paginationtable"
import { useState } from "react"
import type { UserMeResponse } from "@/store/auth/auth.types"
import { Actions } from './actions';
import { useSchedule } from "@/hooks/use-admin/useSchedule"

const ScheduleManagement = () => {

  const PAGE_SIZE = 10
  const [page, setPage] = useState(1)

  const { schedule, totalPages } = useSchedule(page, PAGE_SIZE)


  const [selected, setSelected] = useState<UserMeResponse | null>(null)
  const [mode, setMode] = useState<"view" | "edit" | null>(null)


  return (
    <PagesWrapper>

      
      <Card className="mt-4">
        <DataTable
          data={schedule ?? []}
          columns={ScheduleColumns}
          actions={(schedule) => (
            <Actions
              schedule={schedule}
              onView={() => {
                setSelected(schedule)
                setMode("view")
              }}
              onEdit={() => {
                setSelected(schedule)
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

export default ScheduleManagement
