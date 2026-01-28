import PagesWrapper from "@/components/layout/pages-wrapper"
import { DataTable } from "@/components/table/table-data"
import { Card } from "@/components/ui/card"
import { TablePagination } from "@/components/table/bookings-paginationtable"
import { useState } from "react"
import { Actions } from './actions';
import { useBusCompanies } from "@/hooks/use-admin/useBusCompanies"
import { BusCompnyColumns } from "./bus-companies-column"
import type { BusCompany } from "@/store/admin/admin.types"
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
import { Plus } from "lucide-react"
import { AdminStore } from "@/store/admin/admin.store"

const BusCompanies = () => {

  const PAGE_SIZE = 10
  const [page, setPage] = useState(1)

  const { busCompanies, totalPages } = useBusCompanies(page, PAGE_SIZE)

  const createBusCompany = AdminStore((s) => s.createBusCompany)
  const updateBusCompany = AdminStore((s) => s.updateBusCompany)
  const deleteBusCompany = AdminStore((s) => s.deleteBusCompany)

  const [selected, setSelected] = useState<BusCompany | null>(null)
  const [viewOpen, setViewOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [formMode, setFormMode] = useState<"create" | "edit">("create")

  const [name, setName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [licenseNumber, setLicenseNumber] = useState("")
  const [address, setAddress] = useState("")

  const openCreate = () => {
    setSelected(null)
    setFormMode("create")
    setName("")
    setContactEmail("")
    setContactPhone("")
    setLicenseNumber("")
    setAddress("")
    setFormOpen(true)
  }

  const openEdit = (company: BusCompany) => {
    setSelected(company)
    setFormMode("edit")
    setName(company.name ?? "")
    setContactEmail(company.contact_email ?? "")
    setContactPhone(company.contact_phone ?? "")
    setLicenseNumber(company.license_number ?? "")
    setAddress(company.address ?? "")
    setFormOpen(true)
  }

  const handleSave = async () => {
    const payload: Omit<BusCompany, "id"> = {
      name: name.trim(),
      contact_email: contactEmail.trim(),
      contact_phone: contactPhone.trim() || null,
      address: address.trim() || null,
      license_number: licenseNumber.trim(),
    }

    if (!payload.name || !payload.license_number) return

    if (formMode === "edit" && selected) {
      await updateBusCompany(selected.id, payload)
    } else {
      await createBusCompany(payload)
    }

    setFormOpen(false)
    setSelected(null)
  }

  const handleConfirmDelete = async () => {
    if (!selected) return
    await deleteBusCompany(selected.id)
    setDeleteOpen(false)
    setSelected(null)
  }

  return (
    <PagesWrapper>

      <div className="p-2 md:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Bus Companies</h1>
            <p className="text-sm text-muted-foreground">
              Create and manage bus companies.
            </p>
          </div>

          <Button className="gap-2" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Add Company
          </Button>
        </div>

        <Card className="mt-4">
          <DataTable
            data={busCompanies ?? []}
            columns={BusCompnyColumns}
            actions={(busCompanies) => (
              <Actions
                busCompany={busCompanies}
                onView={() => {
                  setSelected(busCompanies)
                  setViewOpen(true)
                }}
                onEdit={() => {
                  openEdit(busCompanies)
                }}
                onDelete={() => {
                  setSelected(busCompanies)
                  setDeleteOpen(true)
                }}
              />
            )}
          />
          <TablePagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </Card>

        <Dialog
          open={viewOpen}
          onOpenChange={(open) => {
            setViewOpen(open)
            if (!open) setSelected(null)
          }}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Company Details</DialogTitle>
              <DialogDescription>
                {selected?.name}
              </DialogDescription>
            </DialogHeader>

            {selected && (
              <div className="grid gap-3 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="text-muted-foreground">Email</div>
                    <div className="font-medium break-words">{selected.contact_email || "-"}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Phone</div>
                    <div className="font-medium break-words">{selected.contact_phone || "-"}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">License</div>
                    <div className="font-medium break-words">{selected.license_number || "-"}</div>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Address</div>
                  <div className="font-medium whitespace-pre-wrap">{selected.address || "-"}</div>
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
          open={formOpen}
          onOpenChange={(open) => {
            setFormOpen(open)
            if (!open) setSelected(null)
          }}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{formMode === "edit" ? "Edit Company" : "Add Company"}</DialogTitle>
              <DialogDescription>
                {formMode === "edit" ? "Update company information." : "Create a new bus company."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Name</Label>
                  <Input
                    id="company-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license-number">License Number</Label>
                  <Input
                    id="license-number"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    placeholder="License number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="contact@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Phone</Label>
                  <Input
                    id="contact-phone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+255..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-address">Address</Label>
                <Textarea
                  id="company-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Company address"
                  rows={4}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setFormOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => void handleSave()}>
                {formMode === "edit" ? "Save Changes" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={deleteOpen}
          onOpenChange={(open) => {
            setDeleteOpen(open)
            if (!open) setSelected(null)
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete company?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this bus company. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600"
                onClick={() => void handleConfirmDelete()}
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

export default BusCompanies
