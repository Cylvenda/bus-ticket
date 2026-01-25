import PagesWrapper from "@/components/layout/pages-wrapper"
import { DataTable } from "@/components/table/table-data"
import { Card } from "@/components/ui/card"
import { TablePagination } from "@/components/table/bookings-paginationtable"
import { useState } from "react"
import { Actions } from './actions';
import { useBusCompanies } from "@/hooks/use-admin/useBusCompanies"
import { BusCompnyColumns } from "./bus-companies-column"
import type { BusCompany } from "@/store/admin/admin.types"

const BusCompanies = () => {

  const PAGE_SIZE = 10
  const [page, setPage] = useState(1)

  const { busCompanies, totalPages } = useBusCompanies(page, PAGE_SIZE)


  const [selected, setSelected] = useState<BusCompany | null>(null)
  const [mode, setMode] = useState<"view" | "edit" | null>(null)

  return (
    <PagesWrapper>


      <Card className="mt-4">
        <DataTable
          data={busCompanies ?? []}
          columns={BusCompnyColumns}
          actions={(busCompanies) => (
            <Actions
              busCompany={busCompanies}
              onView={() => {
                setSelected(busCompanies)
                setMode("view")
              }}
              onEdit={() => {
                setSelected(busCompanies)
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

export default BusCompanies
