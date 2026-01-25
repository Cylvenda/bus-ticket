import EmptyState from "./empty-state"
import { useBus } from "@/hooks/use-bus-booking"
import Seat from "./seat"
import { Card } from "./ui/card"
import { useBusBookingStore } from "@/store/bus/busBooking.store"
import SeatSelectForm from "./seat-select-form"
import { assets } from "@/assets/assets"
import { DotSquareIcon, ToiletIcon } from "lucide-react"
import { useMemo } from "react"

// Seat legend item component
interface LegendItemProps {
    color: string
    label: string
}

const LegendItem = ({ color, label }: LegendItemProps) => (
    <span className="flex gap-1 items-center m-2">
        <span className={`w-3 h-3 ${color} rounded`} aria-hidden="true" />
        <span className="text-xs">{label}</span>
    </span>
)

// Special seat components
interface SpecialSeatProps {
    type: 'door' | 'driver' | 'toilet'
    seatIndex: number
}

const SpecialSeat = ({ type, seatIndex }: SpecialSeatProps) => {
    const baseClass = "w-11 md:w-12 bg-accent dark:bg-accent-foreground p-2 rounded cursor-default"

    switch (type) {
        case 'door':
            return (
                <div key={seatIndex} className={baseClass} aria-label="Bus door">
                    <DotSquareIcon className="text-primary" aria-hidden="true" />
                </div>
            )
        case 'driver':
            return (
                <div key={seatIndex} className={baseClass} aria-label="Driver seat">
                    <img src={assets.steeringWheel} alt="Driver steering wheel" className="w-full h-full object-contain" />
                </div>
            )
        case 'toilet':
            return (
                <div key={seatIndex} className={baseClass} aria-label="Toilet">
                    <ToiletIcon className="text-primary" aria-hidden="true" />
                </div>
            )
    }
}

const SeatModel = () => {
    const { activeBus } = useBus()
    const { selectedSeat } = useBusBookingStore()

    const seatLayout = useMemo(() =>
        activeBus?.seat_layout_structure,
        [activeBus]
    )

    // Early return if no seat layout
    if (!seatLayout || !seatLayout.rows) {
        return (
            <EmptyState
                title="No Bus Selected"
                description="Please select a bus to view available seats"
            />
        )
    }

    return (
        <Card className="flex flex-col md:flex-row gap-0 md:gap-5 justify-center p-0 md:p-5 border border-dashed border-primary w-full">
            {/* LEFT SIDE - Seat Layout */}
            <Card className="border-none md:border md:border-primary rounded-none md:rounded-xl p-5 w-full md:w-[360px] lg:w-[400px] ml-2.5 md:ml-0 flex flex-col gap-4">

                {/* Seat Legend */}
                <div className="flex flex-col gap-2 text-xs w-full border border-primary border-dashed rounded-md p-3">
                    <h2 className="text-center text-base md:text-lg font-bold mb-1">
                        Seat Color Guide
                    </h2>

                    <div className="flex flex-row justify-between flex-wrap">
                        <div className="flex flex-col">
                            <LegendItem color="bg-green-600" label="Available" />
                            <LegendItem color="bg-red-600" label="Booked" />
                        </div>

                        <div className="flex flex-col">
                            <LegendItem color="bg-yellow-500" label="Your Selection" />
                            <LegendItem color="bg-gray-400" label="Held by Others" />
                        </div>
                    </div>
                </div>

                {/* Seat Grid */}
                <div
                    className="border border-primary border-dashed p-3 md:p-5 rounded-md overflow-auto"
                    role="region"
                    aria-label="Bus seat layout"
                >
                    <div className="flex flex-col gap-2">
                        {seatLayout.rows.map((row, rowIndex) => (
                            <div
                                key={`row-${rowIndex}`}
                                className="flex justify-between gap-2 md:gap-4"
                                role="row"
                                aria-label={`Row ${rowIndex + 1}`}
                            >
                                {row.map((seat, seatIndex) => {
                                    // Empty space
                                    if (!seat || seat === "null" || seat === null) {
                                        return (
                                            <div
                                                key={`empty-${rowIndex}-${seatIndex}`}
                                                className="w-10 md:w-12"
                                                aria-hidden="true"
                                            />
                                        )
                                    }

                                    // Special seats
                                    if (seat === "door") {
                                        return <SpecialSeat key={`door-${rowIndex}-${seatIndex}`} type="door" seatIndex={seatIndex} />
                                    }

                                    if (seat === "driver") {
                                        return <SpecialSeat key={`driver-${rowIndex}-${seatIndex}`} type="driver" seatIndex={seatIndex} />
                                    }

                                    if (seat === "toilet") {
                                        return <SpecialSeat key={`toilet-${rowIndex}-${seatIndex}`} type="toilet" seatIndex={seatIndex} />
                                    }

                                    // Regular seat
                                    return (
                                        <div
                                            key={`seat-${rowIndex}-${seatIndex}-${seat}`}
                                            className="w-10 md:w-12"
                                        >
                                            <Seat
                                                seat={{
                                                    id: `${rowIndex}-${seatIndex}`,
                                                    seat_number: seat
                                                }}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bus Info */}
                {activeBus && (
                    <div className="text-xs text-muted-foreground text-center">
                        <p className="font-medium">{activeBus.company_name}</p>
                        <p>Bus: {activeBus.bus_plate}</p>
                    </div>
                )}
            </Card>

            {/* RIGHT SIDE - Passenger Details Form */}
            <Card className="flex flex-col w-full p-5 rounded-none md:rounded-xl">
                {selectedSeat ? (
                    <>
                        <div className="p-3 mb-2 md:-mb-7">
                            <div className="rounded-md border border-primary border-dashed p-3 md:p-4">
                                <h3 className="font-semibold text-center text-base md:text-lg mb-2">
                                    Passenger Form For Ticket Booking
                                </h3>
                                <p className="text-sm md:text-base text-center">
                                    You have selected seat{" "}
                                    <span className="inline-flex items-center justify-center bg-yellow-400 px-2 py-1 rounded font-bold text-white dark:text-black mx-1">
                                        {selectedSeat}
                                    </span>
                                    {" "}Fill the form below to complete your purchase
                                </p>
                            </div>
                        </div>
                        <SeatSelectForm />
                    </>
                ) : (
                    <EmptyState
                        title="No Seat Selected"
                        description="Please select a seat from the layout to continue with your booking"
                        image={assets.busEmpty}
                    />
                )}
            </Card>
        </Card>
    )
}

export default SeatModel