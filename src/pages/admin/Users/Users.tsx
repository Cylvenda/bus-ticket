import { CardCount } from "@/components/cards/dashboard-counts"
import PagesWrapper from "@/components/layout/pages-wrapper"
import { DataTable } from "@/components/table/table-data"
import { Card } from "@/components/ui/card"
import { UserColumns } from "./user-column"
import { TablePagination } from "@/components/table/bookings-paginationtable"
import { useState } from "react"
import { useUsers } from "@/hooks/use-admin/useUsers"
import type { UserMeResponse } from "@/store/auth/auth.types"
import { UsersActions } from './actions';

const Users = () => {

  const PAGE_SIZE = 10
  const [page, setPage] = useState(1)

  const { users, totalPages } = useUsers(page, PAGE_SIZE)

  const userDetails = [
    { id: 1, name: "Total Users", count: users?.length },
    { id: 2, name: "Active Users", count: users?.filter(u => u.is_active).length },
    { id: 3, name: "Staff Users", count: users?.filter(u => u.is_staff).length },
    { id: 4, name: "Normal Users", count: users?.filter(u => !u.is_staff).length },
  ]

  const [selected, setSelected] = useState<UserMeResponse | null>(null)
  const [mode, setMode] = useState<"view" | "edit" | null>(null)


  return (
    <PagesWrapper>

      <CardCount items={userDetails} />
      <Card className="mt-4">
        <DataTable
          data={users ?? []}
          columns={UserColumns}
          actions={(users) => (
            <UsersActions
              users={users}
              onView={() => {
                setSelected(users)
                setMode("view")
              }}
              onEdit={() => {
                setSelected(users)
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

export default Users