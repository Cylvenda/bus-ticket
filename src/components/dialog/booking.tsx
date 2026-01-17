"use client"

import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { type Booking } from '../../store/bus/bus.types'

// Props for viewing a booking
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

// --- View Booking Dialog ---
export function ViewBookingDialog({ booking, open, onClose }: ViewProps) {
     if (!booking) return null

     return (
          <Dialog open={open} onOpenChange={onClose}>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle>Booking Details</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-2 text-sm">
                         <p><strong>Name:</strong> {booking.passenger.first_name} {booking.passenger.last_name}</p>
                         <p><strong>Email:</strong> {booking.passenger.email}</p>
                         <p><strong>Route:</strong> {booking.schedule.route_origin} → {booking.schedule.route_destination}</p>
                         <p><strong>Bus:</strong> {booking.bus_assignment.bus_plate}</p>
                    </div>
               </DialogContent>
          </Dialog>
     )
}

// --- Cancel Booking Dialog ---
export function CancelBookingDialog({ booking, open, onClose, onCancel }: CancelProps) {
     if (!booking) return null

     const handleCancel = () => {
          onCancel(booking) // Call the callback
          onClose()         // Close the dialog
     }

     return (
          <Dialog open={open} onOpenChange={onClose}>
               <DialogContent>
                    <DialogHeader>
                         <DialogTitle>Cancel Booking</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-muted-foreground">
                         Are you sure you want to cancel this booking?
                    </p>

                    <div className="flex justify-end gap-2">
                         <Button variant="outline" onClick={onClose}>No</Button>
                         <Button variant="destructive" onClick={handleCancel}>Yes, Cancel</Button>
                    </div>
               </DialogContent>
          </Dialog>
     )
}
