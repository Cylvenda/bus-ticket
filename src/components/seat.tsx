import { useBus } from "@/hooks/use-bus-booking"
import type { Seat as SeatType } from "@/store/bus/bus.types"
import { useBusBookingStore } from "@/store/bus/busBooking.store"

type SeatProps = {
    id?: string | number
    seat: SeatType
}

const Seat = ({ seat }: SeatProps) => {
    const { bookedSeats } = useBus()
    const { toggleUserSeatSelection, selectedSeat } = useBusBookingStore()

    const bookedSeatNumbers = new Set([
        ...(bookedSeats?.booked_seats ?? []),
    ])

    const heldSeatNumbers = new Set([
        ...(bookedSeats?.held_seats ?? [])
    ])

    const isBooked = bookedSeatNumbers.has(seat.seat_number)

    const isSelected = heldSeatNumbers.has(seat.seat_number)

    const userchoiceSelected = selectedSeat === seat.seat_number

    const base =
        "w-12 h-12 rounded-md text-white text-sm font-semibold flex items-center justify-center"

    const colors = {
        booked: "bg-red-600 cursor-not-allowed",
        available: "bg-green-600 hover:opacity-80 cursor-pointer",
        selected: "bg-yellow-500 cursor-pointer",
        unavailable: "bg-gray-400 cursor-not-allowed",
    }

    return (
        <button
            key={seat.id}
            disabled={isBooked}
            onClick={() => toggleUserSeatSelection(seat.seat_number)}
            className={`${base} ${isBooked
                ? colors.booked
                : isSelected
                    ? colors.unavailable
                    : userchoiceSelected
                        ? colors.selected
                    : colors.available
                }`}
        >
            {seat.seat_number}
        </button>
    )
}

export default Seat
