import PagesWrapper from "@/components/layout/pages-wrapper"
import { DataTable } from "@/components/table/table-data"
import { Card } from "@/components/ui/card"
import { TablePagination } from "@/components/table/bookings-paginationtable"
import { useState } from "react"
import { Actions } from './actions';
import { useSchedule } from "@/hooks/use-admin/useSchedule"
import { useScheduleTemplates } from "@/hooks/use-admin/useScheduleTemplates"
import { ScheduleColumns } from "./schedule-column"
import type { ScheduleGet } from "@/store/admin/admin.types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { AdminStore } from "@/store/admin/admin.store"

const ScheduleManagement = () => {

  const PAGE_SIZE = 10
  const [page, setPage] = useState(1)

  const { schedule, totalPages } = useSchedule(page, PAGE_SIZE)
  const { scheduleTemplates } = useScheduleTemplates(1, 1000) // Get all templates for dropdown

  const createSchedule = AdminStore((s) => s.createSchedule)
  const updateSchedule = AdminStore((s) => s.updateSchedule)
  const deleteSchedule = AdminStore((s) => s.deleteSchedule)

  const [selected, setSelected] = useState<ScheduleGet | null>(null)
  const [viewOpen, setViewOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [formMode, setFormMode] = useState<"create" | "edit">("create")

  const [travelDate, setTravelDate] = useState("")
  const [departureTime, setDepartureTime] = useState("")
  const [arrivalTime, setArrivalTime] = useState("")
  const [price, setPrice] = useState("")
  const [templateId, setTemplateId] = useState<number | undefined>(undefined)

  const openCreate = () => {
    setSelected(null)
    setFormMode("create")
    setTravelDate("")
    setDepartureTime("")
    setArrivalTime("")
    setPrice("")
    setTemplateId(undefined)
    setFormOpen(true)
  }

  const openEdit = (schedule: ScheduleGet) => {
    setSelected(schedule)
    setFormMode("edit")
    setTravelDate(schedule.travel_date)
    setDepartureTime(schedule.departure_time)
    setArrivalTime(schedule.arrival_time)
    setPrice(schedule.price)
    setTemplateId(schedule.template_id)
    setFormOpen(true)
  }

  const openView = (schedule: ScheduleGet) => {
    setSelected(schedule)
    setViewOpen(true)
  }

  const openDelete = (schedule: ScheduleGet) => {
    setSelected(schedule)
    setDeleteOpen(true)
  }

  const handleSave = async () => {
    const payload: Omit<ScheduleGet, "id"> = {
      travel_date: travelDate.trim(),
      departure_time: departureTime.trim(),
      arrival_time: arrivalTime.trim(),
      price: price.trim(),
      template_id: templateId,
      template: selected?.template || (scheduleTemplates?.find(t => t.id === templateId)!)
    }

    if (!payload.travel_date || !payload.departure_time || !payload.arrival_time || !payload.price || !payload.template_id) {
      return
    }

    if (formMode === "edit" && selected) {
      await updateSchedule(selected.id, payload)
    } else {
      await createSchedule(payload)
    }

    setFormOpen(false)
    setSelected(null)
  }

  const handleDelete = async () => {
    if (selected) {
      await deleteSchedule(selected.id)
      setDeleteOpen(false)
      setSelected(null)
    }
  }

  return (
    <PagesWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Schedule Management</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage bus schedules and timetables.
            </p>
          </div>
          <Button onClick={openCreate} className="flex items-center gap-2">
            <Plus size={16} />
            Add Schedule
          </Button>
        </div>

        {/* Table */}
        <Card>
          <DataTable
            columns={ScheduleColumns({
              onView: openView,
              onEdit: openEdit,
              onDelete: openDelete,
            })}
            data={schedule ?? []}
          />
          {totalPages > 1 && (
            <TablePagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </Card>

        {/* View Dialog */}
        <Dialog open={viewOpen} onOpenChange={setViewOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule Details</DialogTitle>
              <DialogDescription>
                View schedule information
              </DialogDescription>
            </DialogHeader>
            {selected && (
              <div className="space-y-4">
                <div>
                  <Label>Travel Date</Label>
                  <p className="font-medium">{selected.travel_date}</p>
                </div>
                <div>
                  <Label>Departure Time</Label>
                  <p className="font-medium">{selected.departure_time}</p>
                </div>
                <div>
                  <Label>Arrival Time</Label>
                  <p className="font-medium">{selected.arrival_time}</p>
                </div>
                <div>
                  <Label>Price</Label>
                  <p className="font-medium">TZS {selected.price}</p>
                </div>
                <div>
                  <Label>Route</Label>
                  <p className="font-medium">Route ID: {selected.template?.route}</p>
                </div>
                <div>
                  <Label>Template Departure</Label>
                  <p className="font-medium">{selected.template?.departure_time}</p>
                </div>
                <div>
                  <Label>Template Arrival</Label>
                  <p className="font-medium">{selected.template?.arrival_time}</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create/Edit Dialog */}
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {formMode === "create" ? "Add New Schedule" : "Edit Schedule"}
              </DialogTitle>
              <DialogDescription>
                {formMode === "create"
                  ? "Create a new schedule"
                  : "Update schedule information"
                }
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="travelDate">Travel Date</Label>
                <Input
                  id="travelDate"
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="departureTime">Departure Time</Label>
                <Input
                  id="departureTime"
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="arrivalTime">Arrival Time</Label>
                <Input
                  id="arrivalTime"
                  type="time"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                />
              </div>
              <div>
                <Label htmlFor="template">Schedule Template</Label>
                <Select value={templateId?.toString()} onValueChange={(value) => setTemplateId(Number(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select schedule template" />
                  </SelectTrigger>
                  <SelectContent>
                    {scheduleTemplates?.map((template) => (
                      <SelectItem key={template.id} value={template.id.toString()}>
                        Route {template.route} - {template.departure_time} to {template.arrival_time} (TZS {template.base_price})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setFormOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {formMode === "create" ? "Create" : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Schedule</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the schedule for {selected?.travel_date}?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PagesWrapper>
  )
}

export default ScheduleManagement
