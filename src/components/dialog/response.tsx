"use client"

import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {type ReactNode } from "react"
import type { Booking } from "@/store/admin/admin.types"

// Generic Props for any dialog
interface GenericDialogProps {
     title: string
     open: boolean
     onClose: () => void
     children: ReactNode
     actions?: ReactNode // optional buttons or actions at the bottom
     size?: "sm" | "md" | "lg" // optional size
}

interface ViewProps {
     booking: Booking | null
     open: boolean
     onClose: () => void
}

// Props for canceling a booking
interface CancelProps {
     booking: Booking | null
     open: boolean
     onClose: () => void
     onCancel: (booking: Booking) => void
}

// --- Generic Reusable Dialog ---
export function GenericDialog({
     title,
     open,
     onClose,
     children,
     actions,
     size = "md",
}: GenericDialogProps) {
     const sizeClasses = {
          sm: "max-w-sm",
          md: "max-w-md",
          lg: "max-w-lg",
     }

     return (
          <Dialog open={open} onOpenChange={onClose}>
               <DialogContent className={`p-4 ${sizeClasses[size]}`}>
                    <DialogHeader>
                         <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>

                    <div className="my-4 text-sm">{children}</div>

                    {actions && <div className="flex justify-end gap-2 mt-4">{actions}</div>}
               </DialogContent>
          </Dialog>
     )
}

// --- Example Usage for Booking View ---
export function ViewBookingDialog({ booking, open, onClose }: ViewProps) {
     if (!booking) return null

     return (
          <GenericDialog
               title="Booking Details"
               open={open}
               onClose={onClose}
               size="md"
               actions={
                    <Button variant="outline" onClick={onClose}>
                         Close
                    </Button>
               }
          >
               <p>
                    <strong>Name:</strong> {booking.passenger.first_name}{" "}
                    {booking.passenger.last_name}
               </p>
               <p>
                    <strong>Email:</strong> {booking.passenger.email}
               </p>
               <p>
                    <strong>Route:</strong> {booking.schedule.route_origin} →{" "}
                    {booking.schedule.route_destination}
               </p>
               <p>
                    <strong>Bus:</strong> {booking.bus_assignment.bus.company_name}
               </p>
          </GenericDialog>
     )
}

// --- Example Usage for Booking Cancel ---
export function CancelBookingDialog({ booking, open, onClose, onCancel }: CancelProps) {
     if (!booking) return null

     const handleCancel = () => {
          onCancel(booking)
          onClose()
     }

     return (
          <GenericDialog
               title="Cancel Booking"
               open={open}
               onClose={onClose}
               size="sm"
               actions={
                    <>
                         <Button variant="outline" onClick={onClose}>
                              No
                         </Button>
                         <Button variant="destructive" onClick={handleCancel}>
                              Yes, Cancel
                         </Button>
                    </>
               }
          >
               <p className="text-muted-foreground">
                    Are you sure you want to cancel this booking?
               </p>
          </GenericDialog>
     )
}
