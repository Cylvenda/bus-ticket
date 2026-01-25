import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Bus,
  CreditCard,
  Hash,
  CheckCircle2,
  XCircle,
  Users,
  Navigation,
  Armchair,
  Globe,
  AlertCircle,
  AlertTriangle,
  Loader2,
  type LucideIcon,
} from "lucide-react"
import { formatDate, formatTime, formatCurrency } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { Booking } from "@/store/admin/admin.types"

interface ViewProps {
  booking: Booking | null
  open: boolean
  onClose: () => void
}

interface CancelProps {
  booking: Booking | null
  open: boolean
  onClose: () => void
  onCancel: (booking: Booking, reason?: string) => Promise<void> | void
}

// Shared utility functions
const getStatusConfig = (status: string) => {
  switch (status.toUpperCase()) {
    case "CONFIRMED":
      return {
        label: "Confirmed",
        variant: "default" as const,
        icon: CheckCircle2,
        className: "bg-green-500/10 text-green-700 border-green-500/20",
      }
    case "CANCELLED":
      return {
        label: "Cancelled",
        variant: "destructive" as const,
        icon: XCircle,
        className: "bg-red-500/10 text-red-700 border-red-500/20",
      }
    case "PENDING":
      return {
        label: "Pending",
        variant: "secondary" as const,
        icon: AlertCircle,
        className: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
      }
    default:
      return {
        label: status,
        variant: "outline" as const,
        icon: AlertCircle,
        className: "",
      }
  }
}

const getPaymentStatusConfig = (isPaid: boolean) => {
  return isPaid
    ? {
      label: "Paid",
      variant: "default" as const,
      className: "bg-green-500/10 text-green-700 border-green-500/20",
    }
    : {
      label: "Unpaid",
      variant: "destructive" as const,
      className: "bg-red-500/10 text-red-700 border-red-500/20",
    }
}

const InfoRow = ({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: LucideIcon
  label: string
  value: string | React.ReactNode
  className?: string
}) => (
  <div className={cn("flex items-start gap-3", className)}>
    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted flex-shrink-0">
      <Icon className="h-4 w-4 text-muted-foreground" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-sm font-medium break-words">{value}</p>
    </div>
  </div>
)

const SectionHeader = ({ title }: { title: string }) => (
  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
    {title}
  </h3>
)

// View Booking Dialog
export function ViewBookingDialog({ booking, open, onClose }: ViewProps) {
  if (!booking) return null

  const statusConfig = getStatusConfig(booking.status)
  const paymentConfig = getPaymentStatusConfig(booking.is_paid)
  const StatusIcon = statusConfig.icon

  const passenger = booking.passenger
  const schedule = booking.schedule
  const busAssignment = booking.bus_assignment
  const bus = busAssignment?.bus

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-8">
            <span>Booking Details</span>
            <Badge variant={statusConfig.variant} className={statusConfig.className}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusConfig.label}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto px-1 flex-1">
          {/* Booking Reference and Payment Status */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Booking ID</span>
              </div>
              <span className="font-mono font-semibold">#{booking.id}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Payment Status</span>
              </div>
              <Badge variant={paymentConfig.variant} className={paymentConfig.className}>
                {paymentConfig.label}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Booked At</span>
              </div>
              <span className="text-sm font-medium">
                {formatDate(booking.booked_at)} • {formatTime(booking.booked_at)}
              </span>
            </div>
          </div>

          {/* Passenger Information */}
          <div>
            <SectionHeader title="Passenger Information" />
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow
                icon={User}
                label="Full Name"
                value={`${passenger.first_name} ${passenger.last_name}`}
              />
              <InfoRow
                icon={Mail}
                label="Email Address"
                value={passenger.email}
              />
              <InfoRow
                icon={Phone}
                label="Phone Number"
                value={passenger.phone}
              />
              <InfoRow
                icon={Users}
                label="Age Group"
                value={passenger.age}
              />
              <InfoRow
                icon={User}
                label="Gender"
                value={passenger.gender === "M" ? "Male" : "Female"}
              />
              <InfoRow
                icon={Globe}
                label="Nationality"
                value={passenger.nationality}
              />
            </div>
          </div>

          <Separator />

          {/* Travel Information */}
          <div>
            <SectionHeader title="Travel Information" />

            {/* Route */}
            <div className="bg-primary/5 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <Navigation className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-muted-foreground">Route</span>
              </div>
              <div className="flex items-center gap-2 ml-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="font-semibold text-lg">{schedule.route_origin}</span>
                  <span className="text-muted-foreground hidden sm:inline">→</span>
                  <span className="text-sm text-muted-foreground sm:hidden">↓</span>
                  <span className="font-semibold text-lg">{schedule.route_destination}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow
                icon={Calendar}
                label="Travel Date"
                value={formatDate(schedule.travel_date as string)}
              />
              <InfoRow
                icon={Clock}
                label="Departure Time"
                value={formatTime(schedule.departure_time as string)}
              />
              <InfoRow
                icon={Clock}
                label="Arrival Time"
                value={formatTime(schedule.arrival_time as string)}
              />
              <InfoRow
                icon={Armchair}
                label="Seat Number"
                value={
                  <span className="font-mono text-base font-bold">
                    {booking.seat_number}
                  </span>
                }
              />
            </div>
          </div>

          <Separator />

          {/* Boarding & Dropping Points */}
          <div>
            <SectionHeader title="Pick-up & Drop-off" />
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow
                icon={MapPin}
                label="Boarding Point"
                value={passenger.boarding_point}
              />
              <InfoRow
                icon={MapPin}
                label="Dropping Point"
                value={passenger.dropping_point}
              />
            </div>
          </div>

          <Separator />

          {/* Bus Information */}
          <div>
            <SectionHeader title="Bus Information" />
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow
                icon={Bus}
                label="Bus Company"
                value={bus.company_name}
              />
              <InfoRow
                icon={Hash}
                label="Plate Number"
                value={
                  <span className="font-mono font-semibold">
                    {bus.plate_number}
                  </span>
                }
              />
              <InfoRow
                icon={Armchair}
                label="Available Seats"
                value={`${busAssignment.available_seats} seats`}
              />
            </div>
          </div>

          <Separator />

          {/* Pricing */}
          <div>
            <SectionHeader title="Payment Details" />
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Ticket Price</span>
                <span className="font-medium">
                  {formatCurrency(parseFloat(schedule.price as string), "TZS")}
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="font-semibold">Amount Paid</span>
                <span className="text-lg font-bold text-primary">
                  {formatCurrency(parseFloat(booking.price_paid), "TZS")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
              Close
            </Button>
            <Button className="flex-1 sm:flex-none">
              Print Receipt
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Cancel Booking Dialog
export function CancelBookingDialog({ booking, open, onClose, onCancel }: CancelProps) {
  const [cancellationReason, setCancellationReason] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!booking) return null

  const passenger = booking.passenger
  const schedule = booking.schedule
  const amount = parseFloat(booking.price_paid)

  const handleCancel = async () => {
    if (!cancellationReason.trim()) {
      setError("Please provide a reason for cancellation")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await onCancel(booking, cancellationReason)
      // Reset form
      setCancellationReason("")
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to cancel booking")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      setCancellationReason("")
      setError(null)
      onClose()
    }
  }

  const isAlreadyCancelled = booking.status === "CANCELLED"

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Cancel Booking
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. Please review the booking details before proceeding.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Already Cancelled Warning */}
          {isAlreadyCancelled && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Already Cancelled</AlertTitle>
              <AlertDescription>
                This booking has already been cancelled.
              </AlertDescription>
            </Alert>
          )}

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Booking Summary */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Booking ID</span>
              </div>
              <span className="font-mono font-semibold">#{booking.id}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Passenger</span>
              </div>
              <span className="font-medium">
                {passenger.first_name} {passenger.last_name}
              </span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Route</span>
              </div>
              <span className="font-medium text-right">
                {schedule.route_origin} → {schedule.route_destination}
              </span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Travel Date</span>
              </div>
              <span className="font-medium">
                {formatDate(schedule.travel_date as string)}
              </span>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Armchair className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Seat</span>
              </div>
              <span className="font-mono font-semibold">{booking.seat_number}</span>
            </div>
          </div>

          {/* Refund Information */}
          {booking.is_paid && !isAlreadyCancelled && (
            <Alert>
              <CreditCard className="h-4 w-4" />
              <AlertTitle>Refund Information</AlertTitle>
              <AlertDescription>
                The passenger paid{" "}
                <strong className="font-semibold">
                  {formatCurrency(amount, "TZS")}
                </strong>
                . A refund will be processed according to the cancellation policy.
              </AlertDescription>
            </Alert>
          )}

          {/* Cancellation Reason */}
          {!isAlreadyCancelled && (
            <div className="space-y-2">
              <Label htmlFor="cancellation-reason">
                Reason for Cancellation <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="cancellation-reason"
                placeholder="Please provide a reason for cancelling this booking..."
                value={cancellationReason}
                onChange={(e) => {
                  setCancellationReason(e.target.value)
                  setError(null)
                }}
                rows={4}
                className={cn(
                  "resize-none",
                  error && !cancellationReason.trim() && "border-destructive"
                )}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                This reason will be recorded and may be shared with the passenger.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 sm:flex-none"
            >
              {isAlreadyCancelled ? "Close" : "Keep Booking"}
            </Button>
            {!isAlreadyCancelled && (
              <Button
                variant="destructive"
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 sm:flex-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  <>
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel Booking
                  </>
                )}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}