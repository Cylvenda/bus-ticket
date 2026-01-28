import { useMemo, useState } from "react"
import PagesWrapper from "@/components/layout/pages-wrapper"
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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
import { AdminStore } from "@/store/admin/admin.store"
import { useSeatLayouts } from "@/hooks/use-admin/useSeatLayouts"
import type { SeatLayoutApi } from "@/store/admin/admin.types"
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Armchair,
  DoorOpen,
  User,
  Bath,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { TablePagination } from "@/components/table/bookings-paginationtable"

type Tool = "seat" | "empty" | "door" | "driver" | "toilet"

const SPECIAL = new Set(["door", "driver", "toilet"])

const createGrid = (rows: number, cols: number): (string | null)[][] =>
  Array.from({ length: rows }, () => Array.from({ length: cols }, () => null))

const countSeats = (rows: (string | null)[][]) => {
  let count = 0
  for (const row of rows) {
    for (const cell of row) {
      if (!cell) continue
      const value = String(cell).toLowerCase()
      if (!SPECIAL.has(value)) count += 1
    }
  }
  return count
}

const normalizeSeats = (rows: (string | null)[][]) => {
  let seatNumber = 1
  return rows.map((row) =>
    row.map((cell) => {
      if (!cell) return null
      const value = String(cell).toLowerCase()
      if (SPECIAL.has(value)) return value
      return String(seatNumber++)
    })
  )
}

const getCellIcon = (cell: string | null) => {
  if (!cell) return null
  const v = cell.toLowerCase()
  if (v === "driver") return <User className="h-4 w-4" />
  if (v === "door") return <DoorOpen className="h-4 w-4" />
  if (v === "toilet") return <Bath className="h-4 w-4" />
  return <Armchair className="h-4 w-4" />
}

const getCellClass = (cell: string | null) => {
  if (!cell) return "bg-transparent"
  const v = cell.toLowerCase()
  if (v === "driver") return "bg-blue-500 text-white"
  if (v === "door") return "bg-gray-400 text-white"
  if (v === "toilet") return "bg-purple-500 text-white"
  return "bg-green-500 text-white hover:bg-green-600"
}

const SeatLayoutManagement = () => {
  const PAGE_SIZE = 9
  const [page, setPage] = useState(1)
  const { seatLayouts, totalPages, loading, error } = useSeatLayouts(page, PAGE_SIZE)

  const createSeatLayout = AdminStore((s) => s.createSeatLayout)
  const updateSeatLayout = AdminStore((s) => s.updateSeatLayout)
  const deleteSeatLayout = AdminStore((s) => s.deleteSeatLayout)

  const [viewOpen, setViewOpen] = useState(false)
  const [builderOpen, setBuilderOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [selected, setSelected] = useState<SeatLayoutApi | null>(null)
  const [layoutToDelete, setLayoutToDelete] = useState<SeatLayoutApi | null>(null)

  const [tool, setTool] = useState<Tool>("seat")
  const [name, setName] = useState("")
  const [rowsCount, setRowsCount] = useState(10)
  const [colsCount, setColsCount] = useState(5)
  const [grid, setGrid] = useState<(string | null)[][]>(() => createGrid(10, 5))

  const isEditMode = Boolean(selected && builderOpen)

  const openCreate = () => {
    setSelected(null)
    setName("")
    setRowsCount(10)
    setColsCount(5)
    setGrid(createGrid(10, 5))
    setTool("seat")
    setBuilderOpen(true)
  }

  const openEdit = (layout: SeatLayoutApi) => {
    setSelected(layout)
    setName(layout.name)

    const existing = layout.layout?.rows ?? []
    const r = existing.length || 10
    const c = Math.max(...existing.map((x) => x.length), 5)
    setRowsCount(r)
    setColsCount(c)

    const next = createGrid(r, c)
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        next[i][j] = existing[i]?.[j] ?? null
      }
    }
    setGrid(next)
    setTool("seat")
    setBuilderOpen(true)
  }

  const resizeGrid = (r: number, c: number) => {
    const next = createGrid(r, c)
    for (let i = 0; i < Math.min(r, grid.length); i++) {
      for (let j = 0; j < Math.min(c, grid[i].length); j++) {
        next[i][j] = grid[i][j]
      }
    }
    setGrid(next)
  }

  const applyTool = (r: number, c: number) => {
    setGrid((prev) => {
      const next = prev.map((row) => [...row])
      if (tool === "empty") next[r][c] = null
      if (tool === "seat") next[r][c] = "seat"
      if (tool === "door") next[r][c] = "door"
      if (tool === "driver") next[r][c] = "driver"
      if (tool === "toilet") next[r][c] = "toilet"
      return next
    })
  }

  const handleSave = async () => {
    const normalized = normalizeSeats(grid)
    const payload: Omit<SeatLayoutApi, "id"> = {
      name: name.trim(),
      layout: { rows: normalized },
      total_seats: countSeats(normalized),
      is_active: selected?.is_active ?? true,
    }

    if (!payload.name) return

    if (selected) {
      await updateSeatLayout(selected.id, payload)
    } else {
      await createSeatLayout(payload)
    }

    setBuilderOpen(false)
  }

  if (error) {
    return (
      <PagesWrapper>
        <div className="p-6 text-red-600">Error: {error}</div>
      </PagesWrapper>
    )
  }

  return (
    <PagesWrapper>
      <div className="p-2 md:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Seat Layouts</h1>
            <p className="text-sm text-muted-foreground">
              Create and manage reusable bus seat layout templates.
            </p>
          </div>

          <Button className="gap-2" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Add New Layout
          </Button>
        </div>

        <div className="mt-4">
          {loading && !seatLayouts ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Loading seat layouts...
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(seatLayouts ?? []).map((layout) => (
                <Card key={layout.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg">{layout.name}</CardTitle>
                        <CardDescription>
                          {layout.total_seats} seat{layout.total_seats !== 1 ? "s" : ""}
                        </CardDescription>
                      </div>
                      <Badge
                        variant="secondary"
                        className={layout.is_active ? "bg-green-500/10 text-green-700" : "bg-red-500/10 text-red-700"}
                      >
                        {layout.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 rounded-lg p-3 overflow-x-auto">
                      <div className="inline-flex flex-col gap-1 min-w-max">
                        {(layout.layout?.rows ?? []).slice(0, 5).map((row, r) => (
                          <div key={r} className="flex gap-1">
                            {row.slice(0, 8).map((cell, c) => (
                              <div
                                key={c}
                                className={`w-7 h-7 rounded flex items-center justify-center text-[10px] ${getCellClass(cell)}`}
                              >
                                {getCellIcon(cell)}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setSelected(layout)
                          setViewOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEdit(layout)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setLayoutToDelete(layout)
                          setDeleteOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <TablePagination page={page} totalPages={totalPages} onPageChange={setPage} />

        <Dialog
          open={viewOpen}
          onOpenChange={(open) => {
            setViewOpen(open)
            if (!open) setSelected(null)
          }}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selected?.name}</DialogTitle>
              <DialogDescription>
                {selected?.total_seats} seat{selected?.total_seats !== 1 ? "s" : ""}
              </DialogDescription>
            </DialogHeader>

            {selected && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge
                    className={selected.is_active ? "bg-green-500/10 text-green-700" : "bg-red-500/10 text-red-700"}
                    variant="secondary"
                  >
                    {selected.is_active ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Active
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3 mr-1" /> Inactive
                      </>
                    )}
                  </Badge>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 overflow-x-auto">
                  <div className="inline-flex flex-col gap-2 min-w-max">
                    {(selected.layout?.rows ?? []).map((row, r) => (
                      <div key={r} className="flex gap-2 items-center">
                        <span className="text-xs text-muted-foreground w-8">R{r + 1}</span>
                        <div className="flex gap-2">
                          {row.map((cell, c) => (
                            <div
                              key={c}
                              className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center text-xs font-semibold ${getCellClass(cell)}`}
                            >
                              {getCellIcon(cell)}
                              {cell && !SPECIAL.has(cell.toLowerCase()) && (
                                <span className="text-[10px] mt-1">{cell}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
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

        <Dialog
          open={builderOpen}
          onOpenChange={(open) => {
            setBuilderOpen(open)
            if (!open) setSelected(null)
          }}
        >
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selected ? "Edit Layout" : "Create Layout"}</DialogTitle>
              <DialogDescription>
                Click cells to place items. When you save, seats are auto-numbered.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="layout-name">Layout Name</Label>
                  <Input
                    id="layout-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Standard 45 seater"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="rows">Rows</Label>
                    <Input
                      id="rows"
                      type="number"
                      min={1}
                      value={rowsCount}
                      onChange={(e) => {
                        const v = Math.max(1, Number(e.target.value || 1))
                        setRowsCount(v)
                        resizeGrid(v, colsCount)
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cols">Columns</Label>
                    <Input
                      id="cols"
                      type="number"
                      min={1}
                      value={colsCount}
                      onChange={(e) => {
                        const v = Math.max(1, Number(e.target.value || 1))
                        setColsCount(v)
                        resizeGrid(rowsCount, v)
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tool</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant={tool === "seat" ? "default" : "outline"} size="sm" onClick={() => setTool("seat")}>
                      Seat
                    </Button>
                    <Button variant={tool === "empty" ? "default" : "outline"} size="sm" onClick={() => setTool("empty")}>
                      Empty
                    </Button>
                    <Button variant={tool === "door" ? "default" : "outline"} size="sm" onClick={() => setTool("door")}>
                      Door
                    </Button>
                    <Button variant={tool === "driver" ? "default" : "outline"} size="sm" onClick={() => setTool("driver")}>
                      Driver
                    </Button>
                    <Button variant={tool === "toilet" ? "default" : "outline"} size="sm" onClick={() => setTool("toilet")}>
                      Toilet
                    </Button>
                  </div>
                </div>

                {isEditMode && selected && (
                  <Button
                    variant={selected.is_active ? "destructive" : "secondary"}
                    onClick={() => void updateSeatLayout(selected.id, { is_active: !selected.is_active })}
                  >
                    {selected.is_active ? "Disable Layout" : "Activate Layout"}
                  </Button>
                )}
              </div>

              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Layout Builder</CardTitle>
                      <Badge variant="secondary">Seats: {countSeats(normalizeSeats(grid))}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <div className="inline-flex flex-col gap-2 min-w-max">
                        {grid.map((row, r) => (
                          <div key={r} className="flex gap-2 items-center">
                            <span className="text-xs text-muted-foreground w-8">R{r + 1}</span>
                            <div className="flex gap-2">
                              {row.map((cell, c) => (
                                <button
                                  key={c}
                                  type="button"
                                  className={`w-12 h-12 rounded-lg border flex items-center justify-center ${getCellClass(cell)}`}
                                  onClick={() => applyTool(r, c)}
                                >
                                  {getCellIcon(cell)}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setBuilderOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>{selected ? "Save Changes" : "Create Layout"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={deleteOpen}
          onOpenChange={(open) => {
            setDeleteOpen(open)
            if (!open) setLayoutToDelete(null)
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete seat layout?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this seat layout. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600"
                onClick={() => {
                  if (layoutToDelete) void deleteSeatLayout(layoutToDelete.id)
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PagesWrapper>
  )
}

export default SeatLayoutManagement