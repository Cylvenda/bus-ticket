import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Armchair,
  DoorOpen,
  User,
  Bath,
} from "lucide-react"
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

type SeatLayout = {
  id: string
  name: string
  description: string
  totalSeats: number
  rows: (string | null)[][]
  createdAt: string
}

const SeatLayoutManagement = () => {
  const [layouts, setLayouts] = useState<SeatLayout[]>([
    {
      id: "1",
      name: "Standard 40-Seater",
      description: "Standard bus layout with 40 seats",
      totalSeats: 40,
      rows: [
        ["door", null, null, null, "driver"],
        ["1A", "1B", null, "1C", "1D"],
        ["2A", "2B", null, "2C", "2D"],
        ["3A", "3B", null, "3C", "3D"],
        ["4A", "4B", null, "4C", "4D"],
        ["5A", "5B", null, "5C", "5D"],
        ["toilet", null, null, "6C", "6D"],
        ["door", null, null, "7C", "7D"],
        ["8A", "8B", null, "8C", "8D"],
        ["9A", "9B", null, "9C", "9D"],
        ["10A", "10B", "10C", "10D", "10E"],
      ],
      createdAt: "2025-01-20",
    },
    {
      id: "2",
      name: "VIP 30-Seater",
      description: "Luxury bus with spacious seating",
      totalSeats: 30,
      rows: [
        ["door", null, null, "driver"],
        ["1A", "1B", "1C", "1D"],
        ["2A", "2B", "2C", "2D"],
        ["3A", "3B", "3C", "3D"],
        ["4A", "4B", "4C", "4D"],
        ["5A", "5B", "5C", "5D"],
        ["toilet", null, "6C", "6D"],
        ["7A", "7B", "7C", "7D"],
        ["door", null, "8C", "8D"],
      ],
      createdAt: "2025-01-18",
    },
  ])

  const [selectedLayout, setSelectedLayout] = useState<SeatLayout | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [layoutToDelete, setLayoutToDelete] = useState<string | null>(null)

  const [newLayout, setNewLayout] = useState({
    name: "",
    description: "",
  })

  const [editLayout, setEditLayout] = useState<SeatLayout | null>(null)

  const getSeatIcon = (seat: string | null) => {
    if (!seat) return null

    const seatLower = seat.toLowerCase()

    if (seatLower === "driver") {
      return <User className="h-5 w-5" />
    } else if (seatLower === "door") {
      return <DoorOpen className="h-5 w-5" />
    } else if (seatLower === "toilet") {
      return <Bath className="h-5 w-5" />
    } else {
      return <Armchair className="h-5 w-5" />
    }
  }

  const getSeatColor = (seat: string | null) => {
    if (!seat) return "bg-transparent"

    const seatLower = seat.toLowerCase()

    if (seatLower === "driver") {
      return "bg-blue-500 text-white"
    } else if (seatLower === "door") {
      return "bg-gray-400 text-white"
    } else if (seatLower === "toilet") {
      return "bg-purple-500 text-white"
    } else {
      return "bg-green-500 text-white hover:bg-green-600"
    }
  }

  const handleViewLayout = (layout: SeatLayout) => {
    setSelectedLayout(layout)
    setViewDialogOpen(true)
  }

  const handleOpenEditDialog = (layout: SeatLayout) => {
    setEditLayout(layout)
    setEditDialogOpen(true)
  }

  const handleAddLayout = () => {
    // In real implementation, this would open a form to create the layout
    const newLayoutData: SeatLayout = {
      id: Date.now().toString(),
      name: newLayout.name,
      description: newLayout.description,
      totalSeats: 0,
      rows: [
        ["door", null, null, "driver"],
        ["1A", "1B", "1C", "1D"],
        ["2A", "2B", "2C", "2D"],
      ],
      createdAt: new Date().toISOString().split("T")[0],
    }

    setLayouts([...layouts, newLayoutData])
    setAddDialogOpen(false)
    setNewLayout({ name: "", description: "" })
  }

  const handleUpdateLayout = () => {
    if (editLayout) {
      setLayouts(
        layouts.map((layout) =>
          layout.id === editLayout.id ? editLayout : layout
        )
      )
      setEditDialogOpen(false)
      setEditLayout(null)
    }
  }

  const handleDeleteLayout = (id: string) => {
    setLayoutToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (layoutToDelete) {
      setLayouts(layouts.filter((layout) => layout.id !== layoutToDelete))
      setLayoutToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  const countActualSeats = (rows: (string | null)[][]) => {
    let count = 0
    rows.forEach((row) => {
      row.forEach((seat) => {
        if (
          seat &&
          seat.toLowerCase() !== "driver" &&
          seat.toLowerCase() !== "door" &&
          seat.toLowerCase() !== "toilet"
        ) {
          count++
        }
      })
    })
    return count
  }

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Seat Layouts</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage bus seat configurations and layouts
            </p>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Layout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Seat Layout</DialogTitle>
                <DialogDescription>
                  Add a new seat layout configuration for your buses
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Layout Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Standard 40-Seater"
                    value={newLayout.name}
                    onChange={(e) =>
                      setNewLayout({ ...newLayout, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="e.g., Standard bus layout with 40 seats"
                    value={newLayout.description}
                    onChange={(e) =>
                      setNewLayout({
                        ...newLayout,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddLayout}>Create Layout</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Layouts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {layouts.map((layout) => (
            <Card
              key={layout.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{layout.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {layout.description}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">
                    {countActualSeats(layout.rows)} seats
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mini Preview */}
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                    <div className="inline-flex flex-col gap-1 min-w-max">
                      {layout.rows.slice(0, 5).map((row, rowIndex) => (
                        <div key={rowIndex} className="flex gap-1">
                          {row.map((seat, seatIndex) => (
                            <div
                              key={seatIndex}
                              className={`w-8 h-8 rounded flex items-center justify-center text-xs ${seat ? getSeatColor(seat) : "bg-transparent"
                                }`}
                            >
                              {seat && getSeatIcon(seat)}
                            </div>
                          ))}
                        </div>
                      ))}
                      {layout.rows.length > 5 && (
                        <div className="text-center text-xs text-gray-600 dark:text-gray-400">
                          +{layout.rows.length - 5} more rows
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewLayout(layout)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Full
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEditDialog(layout)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteLayout(layout.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {layouts.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">
                No seat layouts found. Create your first layout to get started.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Full Layout View Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedLayout?.name}
              </DialogTitle>
              <DialogDescription>
                {selectedLayout?.description}
              </DialogDescription>
            </DialogHeader>
            {selectedLayout && (
              <div className="space-y-6 py-4">
                {/* Layout Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">
                          {countActualSeats(selectedLayout.rows)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Total Seats
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {selectedLayout.rows.length}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Rows
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">
                          {Math.max(
                            ...selectedLayout.rows.map((r) => r.length)
                          )}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Max Columns
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Full Seat Layout Visualization */}
                <Card>
                  <CardHeader>
                    <CardTitle>Layout Visualization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 overflow-x-auto">
                      <div className="inline-flex flex-col gap-2 min-w-max">
                        <div className="text-center text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                          FRONT OF BUS
                        </div>
                        {selectedLayout.rows.map((row, rowIndex) => (
                          <div
                            key={rowIndex}
                            className="flex gap-2 items-center"
                          >
                            <span className="text-xs font-medium text-gray-500 w-8">
                              R{rowIndex + 1}
                            </span>
                            <div className="flex gap-2">
                              {row.map((seat, seatIndex) => (
                                <div
                                  key={seatIndex}
                                  className={`w-14 h-14 rounded-lg flex flex-col items-center justify-center text-xs font-semibold transition-all ${seat
                                      ? getSeatColor(seat) + " shadow-md"
                                      : "bg-transparent"
                                    }`}
                                  title={seat || "Empty space"}
                                >
                                  {seat && (
                                    <>
                                      {getSeatIcon(seat)}
                                      <span className="text-[10px] mt-1">
                                        {seat.length <= 4
                                          ? seat
                                          : seat.substring(0, 4)}
                                      </span>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        <div className="text-center text-sm font-semibold mt-2 text-gray-700 dark:text-gray-300">
                          REAR OF BUS
                        </div>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                          <Armchair className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm">Regular Seat</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm">Driver</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-400 rounded flex items-center justify-center">
                          <DoorOpen className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm">Door</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                          <Bath className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm">Toilet</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setViewDialogOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Layout Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Seat Layout</DialogTitle>
              <DialogDescription>
                Update the seat layout information
              </DialogDescription>
            </DialogHeader>
            {editLayout && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Layout Name</Label>
                  <Input
                    id="edit-name"
                    placeholder="e.g., Standard 40-Seater"
                    value={editLayout.name}
                    onChange={(e) =>
                      setEditLayout({ ...editLayout, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Input
                    id="edit-description"
                    placeholder="e.g., Standard bus layout with 40 seats"
                    value={editLayout.description}
                    onChange={(e) =>
                      setEditLayout({
                        ...editLayout,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateLayout}>Update Layout</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this seat layout. This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default SeatLayoutManagement