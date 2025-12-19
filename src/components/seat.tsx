import { useBusBookingStore } from "@/store/useBusBookingStore"
import type { Seat as SeatType } from "@/types/bus"

type SeatProps = {
    seat: SeatType
}

const Seat = ({ seat }: SeatProps) => {
    const {
        activeBus,
        toggleSeatSelection,
        getSeatStatus,
    } = useBusBookingStore()

    const status = getSeatStatus(seat.id, seat.status)

    const base =
        "w-12 h-12 rounded-md text-white text-sm font-semibold flex items-center justify-center"

    const colors = {
        booked: "bg-red-600 cursor-not-allowed",
        available: "bg-green-600 hover:opacity-80 cursor-pointer",
        selected: "bg-yellow-500 cursor-pointer",
    }

    return (
        <button
            disabled={status === "booked"}
            onClick={() =>
                toggleSeatSelection(seat.id, activeBus?.price ?? 0)
            }
            className={`${base} ${colors[status]}`}
        >
            {seat.id}
        </button>
    )
}

export default Seat
