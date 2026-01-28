import PagesWrapper from "@/components/layout/pages-wrapper"
import { DataTable } from "@/components/table/table-data"
import { Card } from "@/components/ui/card"
import { TablePagination } from "@/components/table/bookings-paginationtable"
import { useState } from "react"
import { Actions } from './actions';
import { useRoutes } from "@/hooks/use-admin/useRoutes"
import { RoutesColumns } from "./routes-columns"
import { RouteStopsManager } from "./RouteStopsManager"
import type { Route } from "@/store/admin/admin.types"
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
import { Plus, Navigation, MapPin, X, Settings, Route as RouteIcon, Clock, Ruler } from "lucide-react"
import { AdminStore } from "@/store/admin/admin.store"

const RoutesManagement = () => {

  const PAGE_SIZE = 10
  const [page, setPage] = useState(1)

  const { routes, totalPages } = useRoutes(page, PAGE_SIZE)

  const createRoute = AdminStore((s) => s.createRoute)
  const updateRoute = AdminStore((s) => s.updateRoute)
  const deleteRoute = AdminStore((s) => s.deleteRoute)

  const [selected, setSelected] = useState<Route | null>(null)
  const [viewOpen, setViewOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [viewStopsOpen, setViewStopsOpen] = useState(false)
  const [manageStopsOpen, setManageStopsOpen] = useState(false)

  const [formMode, setFormMode] = useState<"create" | "edit">("create")

  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [distanceKm, setDistanceKm] = useState("")
  const [estimatedDurationMinutes, setEstimatedDurationMinutes] = useState("")

  const openCreate = () => {
    setSelected(null)
    setFormMode("create")
    setOrigin("")
    setDestination("")
    setDistanceKm("")
    setEstimatedDurationMinutes("")
    setFormOpen(true)
  }

  const openEdit = (route: Route) => {
    setSelected(route)
    setFormMode("edit")
    setOrigin(route.origin ?? "")
    setDestination(route.destination ?? "")
    setDistanceKm(route.distance_km?.toString() ?? "")
    setEstimatedDurationMinutes(route.estimated_duration_minutes?.toString() ?? "")
    setFormOpen(true)
  }

  const openView = (route: Route) => {
    setSelected(route)
    setViewOpen(true)
  }

  const openViewStops = (route: Route) => {
    setSelected(route)
    setViewStopsOpen(true)
  }

  const openManageStops = (route: Route) => {
    setSelected(route)
    setManageStopsOpen(true)
  }

  const openDelete = (route: Route) => {
    setSelected(route)
    setDeleteOpen(true)
  }

  const handleSave = async () => {
    const payload: Omit<Route, "id"> = {
      origin: origin.trim(),
      destination: destination.trim(),
      distance_km: parseFloat(distanceKm) || 0,
      estimated_duration_minutes: parseInt(estimatedDurationMinutes) || 0,
    }

    if (!payload.origin || !payload.destination) return

    if (formMode === "edit" && selected) {
      await updateRoute(selected.id, payload)
    } else {
      await createRoute(payload)
    }

    setFormOpen(false)
    setSelected(null)
  }

  const handleDelete = async () => {
    if (selected) {
      await deleteRoute(selected.id)
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
            <h1 className="text-2xl font-bold">Routes Management</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage bus routes and their stops.
            </p>
          </div>
          <Button onClick={openCreate} className="flex items-center gap-2">
            <Plus size={16} />
            Add Route
          </Button>
        </div>

        {/* Table */}
        <Card>
          <DataTable
            columns={RoutesColumns({
              onView: openView,
              onEdit: openEdit,
              onDelete: openDelete,
              onViewStops: openViewStops,
              onManageStops: openManageStops,
            })}
            data={routes ?? []}
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
              <DialogTitle>Route Details</DialogTitle>
              <DialogDescription>
                View route information
              </DialogDescription>
            </DialogHeader>
            {selected && (
              <div className="space-y-4">
                <div>
                  <Label>Origin</Label>
                  <p className="font-medium">{selected.origin}</p>
                </div>
                <div>
                  <Label>Destination</Label>
                  <p className="font-medium">{selected.destination}</p>
                </div>
                <div>
                  <Label>Distance</Label>
                  <p className="font-medium">{selected.distance_km} km</p>
                </div>
                <div>
                  <Label>Estimated Duration</Label>
                  <p className="font-medium">{selected.estimated_duration_minutes} minutes</p>
                </div>
                <div>
                  <Label>Stops</Label>
                  <p className="font-medium">{selected.stops?.length ?? 0} stop{(selected.stops?.length ?? 0) !== 1 ? 's' : ''}</p>
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

        {/* View Stops Dialog */}
        <Dialog open={viewStopsOpen} onOpenChange={setViewStopsOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selected?.origin} → {selected?.destination}
              </DialogTitle>
              <DialogDescription>
                Route stops and timing information
              </DialogDescription>
            </DialogHeader>
            {selected && (
              <div className="space-y-4">
                <div className="flex gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Navigation size={14} />
                    <span>{selected.distance_km} km</span>
                  </div>
                  <div>
                    <span>~{selected.estimated_duration_minutes} minutes</span>
                  </div>
                  <div>
                    <span>{selected.stops?.length ?? 0} stop{(selected.stops?.length ?? 0) !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Route Timeline */}
                <div className="space-y-2">
                  {/* Origin */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow"></div>
                      <div className="w-0.5 h-8 bg-gray-300"></div>
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div className="font-semibold text-green-700">{selected.origin}</div>
                      <div className="text-xs text-gray-500">Origin - Start</div>
                    </div>
                  </div>

                  {/* Stops */}
                  {selected.stops
                    .sort((a, b) => a.stop_order - b.stop_order)
                    .map((stop, index) => (
                      <div key={stop.id} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow"></div>
                          {index < (selected.stops?.length ?? 0) - 1 && (
                            <div className="w-0.5 h-8 bg-gray-300"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-blue-600" />
                                <span className="font-medium">{stop.stop_name}</span>
                              </div>
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                Stop #{stop.stop_order}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Arrival:</span>
                                <span className="ml-1">{stop.arrival_offset_min} min</span>
                              </div>
                              <div>
                                <span className="font-medium">Departure:</span>
                                <span className="ml-1">{stop.departure_offset_min} min</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Show connector line before destination */}
                  {(selected.stops?.length ?? 0) > 0 && (
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-0.5 h-8 bg-gray-300"></div>
                      </div>
                    </div>
                  )}

                  {/* Destination */}
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow"></div>
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div className="font-semibold text-red-700">{selected.destination}</div>
                      <div className="text-xs text-gray-500">Destination - End</div>
                    </div>
                  </div>

                  {/* No stops message */}
                  {(!selected.stops || selected.stops.length === 0) && (
                    <div className="py-8 text-center">
                      <p className="text-gray-500">
                        This is a direct route with no intermediate stops.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewStopsOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create/Edit Route Dialog */}
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <RouteIcon size={20} className="text-blue-600" />
                {formMode === "create" ? "Add New Route" : "Edit Route"}
              </DialogTitle>
              <DialogDescription>
                {formMode === "create"
                  ? "Create a new bus route with origin and destination"
                  : "Update route information"
                }
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin" className="flex items-center gap-2 text-sm font-medium">
                    <Navigation size={16} className="text-green-600" />
                    Origin
                  </Label>
                  <Input
                    id="origin"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g., Dodoma"
                    className="border-green-200 focus:border-green-500 focus:ring-green-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination" className="flex items-center gap-2 text-sm font-medium">
                    <MapPin size={16} className="text-red-600" />
                    Destination
                  </Label>
                  <Input
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g., Rombo"
                    className="border-red-200 focus:border-red-500 focus:ring-red-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="distance" className="flex items-center gap-2 text-sm font-medium">
                    <Ruler size={16} className="text-blue-600" />
                    Distance (km)
                  </Label>
                  <Input
                    id="distance"
                    type="number"
                    step="0.1"
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(e.target.value)}
                    placeholder="e.g., 215.5"
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration" className="flex items-center gap-2 text-sm font-medium">
                    <Clock size={16} className="text-purple-600" />
                    Duration (minutes)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    value={estimatedDurationMinutes}
                    onChange={(e) => setEstimatedDurationMinutes(e.target.value)}
                    placeholder="e.g., 240"
                    className="border-purple-200 focus:border-purple-500 focus:ring-purple-200"
                  />
                </div>
              </div>

              {/* Route Summary */}
              {(origin || destination) && (
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <RouteIcon size={16} />
                    Route Preview
                  </div>
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <span className="text-green-700">{origin || "Origin"}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-red-700">{destination || "Destination"}</span>
                  </div>
                  {(distanceKm || estimatedDurationMinutes) && (
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                      {distanceKm && (
                        <span className="flex items-center gap-1">
                          <Ruler size={14} />
                          {distanceKm} km
                        </span>
                      )}
                      {estimatedDurationMinutes && (
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {estimatedDurationMinutes} min
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setFormOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!origin.trim() || !destination.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {formMode === "create" ? "Create Route" : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Route</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the route from "{selected?.origin}" to "{selected?.destination}"?
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

        {/* Route Stops Manager */}
        <RouteStopsManager
          route={selected}
          open={manageStopsOpen}
          onOpenChange={setManageStopsOpen}
        />
      </div>
    </PagesWrapper>
  )
}

export default RoutesManagement
