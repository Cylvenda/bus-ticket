import { useBus } from "@/hooks/use-bus-booking"
import type { Seat as SeatType } from "@/store/bus/bus.types"
import { useBusBookingStore } from "@/store/bus/busBooking.store"
import { useMemo } from "react"

type SeatProps = {
    id?: string | number
    seat: SeatType
}

/**
 * Seat component - Represents a single seat in the bus layout
 * Handles seat selection, booking status, and visual states
 */
const Seat = ({ seat }: SeatProps) => {
    const { bookedSeats } = useBus()
    const { toggleUserSeatSelection, selectedSeat } = useBusBookingStore()

    // Memoize seat status calculations
    const seatStatus = useMemo(() => {
        const bookedSeatNumbers = new Set(bookedSeats?.booked_seats ?? [])
        const heldSeatNumbers = new Set(bookedSeats?.held_seats ?? [])

        return {
            isBooked: bookedSeatNumbers.has(seat.seat_number),
            isHeldByOthers: heldSeatNumbers.has(seat.seat_number),
            isSelectedByUser: selectedSeat === seat.seat_number
        }
    }, [bookedSeats, seat.seat_number, selectedSeat])

    // Determine seat appearance based on status
    const getSeatStyles = () => {
        const base = "w-10 h-10 md:w-12 md:h-12 rounded-md text-white text-xs md:text-sm font-semibold flex items-center justify-center transition-all duration-200"

        if (seatStatus.isBooked) {
            return `${base} bg-red-600 cursor-not-allowed opacity-90`
        }

        if (seatStatus.isHeldByOthers) {
            return `${base} bg-gray-400 cursor-not-allowed opacity-90`
        }

        if (seatStatus.isSelectedByUser) {
            return `${base} bg-yellow-500 hover:bg-yellow-600 cursor-pointer shadow-md transform scale-105`
        }

        return `${base} bg-green-600 hover:bg-green-700 cursor-pointer hover:shadow-md active:scale-95`
    }

    // Determine aria-label for accessibility
    const getAriaLabel = () => {
        if (seatStatus.isBooked) {
            return `Seat ${seat.seat_number}, booked, unavailable`
        }

        if (seatStatus.isHeldByOthers) {
            return `Seat ${seat.seat_number}, held by another passenger, unavailable`
        }

        if (seatStatus.isSelectedByUser) {
            return `Seat ${seat.seat_number}, selected by you, click to deselect`
        }

        return `Seat ${seat.seat_number}, available, click to select`
    }

    const handleSeatClick = () => {
        // Only allow interaction with available seats or user's own selection
        if (!seatStatus.isBooked && !seatStatus.isHeldByOthers) {
            toggleUserSeatSelection(seat.seat_number)
        }
    }

    return (
        <button
            type="button"
            disabled={seatStatus.isBooked || seatStatus.isHeldByOthers}
            onClick={handleSeatClick}
            className={getSeatStyles()}
            aria-label={getAriaLabel()}
            aria-pressed={seatStatus.isSelectedByUser}
            title={getAriaLabel()}
        >
            {seat.seat_number}
        </button>
    )
}

export default Seat