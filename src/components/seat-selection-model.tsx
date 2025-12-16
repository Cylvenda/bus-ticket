import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Seat = {
    number: string
    status: "available" | "booked"
}

interface Props {
    open: boolean
    onClose: () => void
    seats: Seat[]
}

export default function SeatSelectionModal({
                                               open,
                                               onClose,
                                               seats,
                                           }: Props) {
    const [selectedSeats, setSelectedSeats] = React.useState<string[]>([])

    const toggleSeat = (seat: Seat) => {
        if (seat.status === "booked") return

        setSelectedSeats((prev) =>
            prev.includes(seat.number)
                ? prev.filter((s) => s !== seat.number)
                : [...prev, seat.number]
        )
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Select Your Seat</DialogTitle>
                </DialogHeader>

                {/* Seats Grid */}
                <div className="grid grid-cols-4 gap-3 my-4">
                    {seats.map((seat) => {
                        const isSelected = selectedSeats.includes(seat.number)

                        return (
                            <button
                                key={seat.number}
                                onClick={() => toggleSeat(seat)}
                                className={cn(
                                    "h-10 w-10 rounded text-sm font-medium border",
                                    seat.status === "booked" &&
                                    "bg-muted text-muted-foreground cursor-not-allowed",
                                    isSelected &&
                                    "bg-primary text-primary-foreground",
                                    seat.status === "available" &&
                                    !isSelected &&
                                    "hover:bg-muted"
                                )}
                            >
                                {seat.number}
                            </button>
                        )
                    })}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center">
                    <p className="text-sm">
                        Selected: {selectedSeats.join(", ") || "None"}
                    </p>

                    <Button
                        disabled={selectedSeats.length === 0}
                        onClick={() => {
                            console.log("Selected seats:", selectedSeats)
                            onClose()
                        }}
                    >
                        Continue
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
