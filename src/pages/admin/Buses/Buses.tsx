import PagesWrapper from "@/components/layout/pages-wrapper"
import { DataTable } from "@/components/table/table-data"
import { Card } from "@/components/ui/card"
import { TablePagination } from "@/components/table/bookings-paginationtable"
import { useState } from "react"
import { Actions } from './actions';
import { useBuses } from "@/hooks/use-admin/useBuses"
import { BusesColumns } from "./bus-columns"
import type { Bus } from "@/store/bus/bus.types"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { AdminStore } from "@/store/admin/admin.store"
import { useBusCompanies } from "@/hooks/use-admin/useBusCompanies"
import { useSeatLayouts } from "@/hooks/use-admin/useSeatLayouts"

const Buses = () => {

  const PAGE_SIZE = 10
  const [page, setPage] = useState(1)

  const { buses, totalPages } = useBuses(page, PAGE_SIZE)
  const { busCompanies } = useBusCompanies(1, 1000) // Get all companies for dropdown
  const { seatLayouts } = useSeatLayouts(1, 1000) // Get all seat layouts for dropdown

  const createBus = AdminStore((s) => s.createBus)
  const updateBus = AdminStore((s) => s.updateBus)
  const deleteBus = AdminStore((s) => s.deleteBus)

  const [selected, setSelected] = useState<Bus | null>(null)
  const [viewOpen, setViewOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [formMode, setFormMode] = useState<"create" | "edit">("create")

  const [plateNumber, setPlateNumber] = useState("")
  const [busType, setBusType] = useState("")
  const [amenities, setAmenities] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [companyId, setCompanyId] = useState<number | undefined>(undefined)
  const [seatLayoutId, setSeatLayoutId] = useState<number | undefined>(undefined)

  const openCreate = () => {
    setSelected(null)
    setFormMode("create")
    setPlateNumber("")
    setBusType("")
    setAmenities("")
    setIsActive(true)
    setCompanyId(undefined)
    setSeatLayoutId(undefined)
    setFormOpen(true)
  }

  const openEdit = (bus: Bus) => {
    setSelected(bus)
    setFormMode("edit")
    setPlateNumber(bus.plate_number ?? "")
    setBusType(bus.bus_type ?? "")
    setAmenities(bus.amenities ?? "")
    setIsActive(bus.is_active ?? true)
    setCompanyId(bus.company_id)
    setSeatLayoutId(bus.seat_layout_id)
    setFormOpen(true)
  }

  const openView = (bus: Bus) => {
    setSelected(bus)
    setViewOpen(true)
  }

  const openDelete = (bus: Bus) => {
    setSelected(bus)
    setDeleteOpen(true)
  }

  const handleSave = async () => {
    const payload: Omit<Bus, "id"> = {
      plate_number: plateNumber.trim(),
      bus_type: busType.trim(),
      amenities: amenities.trim() || null,
      is_active: isActive,
      company_id: companyId,
      seat_layout_id: seatLayoutId,
    }

    if (!payload.plate_number || !payload.bus_type || !payload.company_id || !payload.seat_layout_id) {
      return
    }

    if (formMode === "edit" && selected) {
      await updateBus(selected.id!, payload)
    } else {
      await createBus(payload)
    }

    setFormOpen(false)
    setSelected(null)
  }

  const handleDelete = async () => {
    if (selected) {
      await deleteBus(selected.id!)
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
            <h1 className="text-2xl font-bold">Buses Management</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage buses in your fleet.
            </p>
          </div>
          <Button onClick={openCreate} className="flex items-center gap-2">
            <Plus size={16} />
            Add Bus
          </Button>
        </div>

        {/* Table */}
        <Card>
          <DataTable 
            columns={BusesColumns({
              onView: openView,
              onEdit: openEdit,
              onDelete: openDelete,
            })} 
            data={buses ?? []}
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
              <DialogTitle>Bus Details</DialogTitle>
              <DialogDescription>
                View bus information
              </DialogDescription>
            </DialogHeader>
            {selected && (
              <div className="space-y-4">
                <div>
                  <Label>Plate Number</Label>
                  <p className="font-medium">{selected.plate_number}</p>
                </div>
                <div>
                  <Label>Bus Type</Label>
                  <p className="font-medium">{selected.bus_type}</p>
                </div>
                <div>
                  <Label>Company</Label>
                  <p className="font-medium">{selected.company_name}</p>
                </div>
                <div>
                  <Label>Total Seats</Label>
                  <p className="font-medium">{selected.total_seats}</p>
                </div>
                <div>
                  <Label>Amenities</Label>
                  <p className="font-medium">{selected.amenities || "None"}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <p className="font-medium">{selected.is_active ? "Active" : "Inactive"}</p>
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
                {formMode === "create" ? "Add New Bus" : "Edit Bus"}
              </DialogTitle>
              <DialogDescription>
                {formMode === "create" 
                  ? "Create a new bus" 
                  : "Update bus information"
                }
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="plateNumber">Plate Number</Label>
                <Input
                  id="plateNumber"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  placeholder="Enter plate number"
                />
              </div>
              <div>
                <Label htmlFor="busType">Bus Type</Label>
                <Input
                  id="busType"
                  value={busType}
                  onChange={(e) => setBusType(e.target.value)}
                  placeholder="Enter bus type (e.g., Luxury, Standard)"
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Select value={companyId?.toString()} onValueChange={(value) => setCompanyId(Number(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {busCompanies?.map((company) => (
                      <SelectItem key={company.id} value={company.id.toString()}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="seatLayout">Seat Layout</Label>
                <Select value={seatLayoutId?.toString()} onValueChange={(value) => setSeatLayoutId(Number(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select seat layout" />
                  </SelectTrigger>
                  <SelectContent>
                    {seatLayouts?.map((layout) => (
                      <SelectItem key={layout.id} value={layout.id.toString()}>
                        {layout.name} ({layout.total_seats} seats)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amenities">Amenities</Label>
                <Textarea
                  id="amenities"
                  value={amenities}
                  onChange={(e) => setAmenities(e.target.value)}
                  placeholder="Enter amenities (e.g., WiFi, AC, Entertainment)"
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="isActive">Active</Label>
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
              <AlertDialogTitle>Delete Bus</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the bus "{selected?.plate_number}"? 
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

export default Buses
