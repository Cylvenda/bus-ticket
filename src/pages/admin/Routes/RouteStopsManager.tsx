import { useState, useEffect } from "react"
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
import { Plus, Edit, Trash, MapPin, ArrowUp, ArrowDown } from "lucide-react"
import type { Route, RouteStop } from "@/store/admin/admin.types"
import { useRouteStops } from "@/hooks/use-admin/useRouteStops"

interface RouteStopsManagerProps {
  route: Route | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const RouteStopsManager = ({ route, open, onOpenChange }: RouteStopsManagerProps) => {
  const { routeStops, loading, createRouteStop, updateRouteStop, deleteRouteStop, refetch } = useRouteStops(route?.id)

  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editingStop, setEditingStop] = useState<RouteStop | null>(null)
  const [deletingStop, setDeletingStop] = useState<RouteStop | null>(null)

  const [stopName, setStopName] = useState("")
  const [arrivalOffset, setArrivalOffset] = useState("")
  const [departureOffset, setDepartureOffset] = useState("")

  const resetForm = () => {
    setStopName("")
    setArrivalOffset("")
    setDepartureOffset("")
    setEditingStop(null)
  }

  const openCreateForm = () => {
    resetForm()
    setFormOpen(true)
  }

  const openEditForm = (stop: RouteStop) => {
    setStopName(stop.stop_name)
    setArrivalOffset(stop.arrival_offset_min?.toString() || "")
    setDepartureOffset(stop.departure_offset_min?.toString() || "")
    setEditingStop(stop)
    setFormOpen(true)
  }

  const openDeleteDialog = (stop: RouteStop) => {
    setDeletingStop(stop)
    setDeleteOpen(true)
  }

  const handleSave = async () => {
    if (!route || !stopName.trim()) return

    const payload = {
      route_id: route.id,
      stop_name: stopName.trim(),
      arrival_offset_min: arrivalOffset ? parseInt(arrivalOffset) : null,
      departure_offset_min: departureOffset ? parseInt(departureOffset) : null,
      stop_order: editingStop ? editingStop.stop_order : (routeStops?.length || 0) + 1,
    }

    if (editingStop) {
      await updateRouteStop(editingStop.id, payload)
    } else {
      await createRouteStop(payload)
    }

    setFormOpen(false)
    resetForm()
    refetch()
  }

  const handleDelete = async () => {
    if (deletingStop) {
      await deleteRouteStop(deletingStop.id)
      setDeleteOpen(false)
      setDeletingStop(null)
      refetch()
    }
  }

  const moveStopUp = async (stop: RouteStop) => {
    if (!routeStops || stop.stop_order <= 1) return

    const stopAbove = routeStops.find(s => s.stop_order === stop.stop_order - 1)
    if (!stopAbove) return

    await updateRouteStop(stop.id, { ...stop, stop_order: stop.stop_order - 1 })
    await updateRouteStop(stopAbove.id, { ...stopAbove, stop_order: stopAbove.stop_order + 1 })
    refetch()
  }

  const moveStopDown = async (stop: RouteStop) => {
    if (!routeStops || stop.stop_order >= routeStops.length) return

    const stopBelow = routeStops.find(s => s.stop_order === stop.stop_order + 1)
    if (!stopBelow) return

    await updateRouteStop(stop.id, { ...stop, stop_order: stop.stop_order + 1 })
    await updateRouteStop(stopBelow.id, { ...stopBelow, stop_order: stopBelow.stop_order - 1 })
    refetch()
  }

  const sortedStops = routeStops?.sort((a, b) => a.stop_order - b.stop_order) || []

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage Route Stops</DialogTitle>
            <DialogDescription>
              {route?.origin} → {route?.destination}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Add Stop Button */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Route Stops</h3>
              <Button onClick={openCreateForm} className="flex items-center gap-2">
                <Plus size={16} />
                Add Stop
              </Button>
            </div>

            {/* Stops List */}
            <div className="space-y-2">
              {sortedStops.length === 0 ? (
                <div className="text-center py-8 text-gray-500 border rounded-lg">
                  <MapPin size={48} className="mx-auto mb-2 text-gray-300" />
                  <p>No stops added yet. Click "Add Stop" to get started.</p>
                </div>
              ) : (
                sortedStops.map((stop, index) => (
                  <div key={stop.id} className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveStopUp(stop)}
                        disabled={index === 0}
                      >
                        <ArrowUp size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveStopDown(stop)}
                        disabled={index === sortedStops.length - 1}
                      >
                        <ArrowDown size={14} />
                      </Button>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin size={16} className="text-blue-600" />
                        <span className="font-medium">{stop.stop_name}</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Stop #{stop.stop_order}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {stop.arrival_offset_min !== null && (
                          <span>Arrival: {stop.arrival_offset_min}min</span>
                        )}
                        {stop.arrival_offset_min !== null && stop.departure_offset_min !== null && (
                          <span> • </span>
                        )}
                        {stop.departure_offset_min !== null && (
                          <span>Departure: {stop.departure_offset_min}min</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditForm(stop)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDeleteDialog(stop)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash size={14} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Stop Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingStop ? "Edit Stop" : "Add New Stop"}
            </DialogTitle>
            <DialogDescription>
              {editingStop ? "Update stop information" : "Add a new stop to this route"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="stopName">Stop Name</Label>
              <Input
                id="stopName"
                value={stopName}
                onChange={(e) => setStopName(e.target.value)}
                placeholder="Enter stop name"
              />
            </div>
            <div>
              <Label htmlFor="arrivalOffset">Arrival Offset (minutes)</Label>
              <Input
                id="arrivalOffset"
                type="number"
                value={arrivalOffset}
                onChange={(e) => setArrivalOffset(e.target.value)}
                placeholder="Minutes from route start"
              />
            </div>
            <div>
              <Label htmlFor="departureOffset">Departure Offset (minutes)</Label>
              <Input
                id="departureOffset"
                type="number"
                value={departureOffset}
                onChange={(e) => setDepartureOffset(e.target.value)}
                placeholder="Minutes from route start"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!stopName.trim()}>
              {editingStop ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Stop</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingStop?.stop_name}"?
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
    </>
  )
}
