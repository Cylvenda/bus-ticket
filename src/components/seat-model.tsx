import { SquareArrowLeft, LifeBuoy } from "lucide-react"
import { Card } from "./ui/card"
import { useBusBookingStore } from "@/store/useBusBookingStore"
import Seat from "./seat"
import SeatSelectForm from "./seat-select-form"
import EmptyState from "./empty-state"


const BusSeatMap = () => {
    const {  seatLayout } = useBusBookingStore()
    const selectedSeat = useBusBookingStore(state => state.selectedSeat)

    return (
        <Card className="flex flex-col md:flex-row gap-5 md:gap-10 items-center justify-center p-0 md:p-5 border border-dashed border-primary w-full">

            {/* BUS */}
            <div className=" border-none md:border-md md:border-primary rounded-none md:rounded-xl p-5 w-full md:w-90 ml-2.5 md:ml-0">

                {/* LEGEND */}
                <div className="flex items-center gap-4 text-xs mb-4 w-full">
                    <span className="flex gap-1 items-center">
                        <span className="w-3 h-3 bg-green-600 rounded" /> Available
                    </span>
                    <span className="flex gap-1 items-center">
                        <span className="w-3 h-3 bg-red-600 rounded" /> Booked
                    </span>
                    <span className="flex gap-1 items-center">
                        <span className="w-3 h-3 bg-yellow-500 rounded" /> Selected
                    </span>
                </div>

                {seatLayout.map((row, index) => (
                    <div key={index} className="flex justify-between mb-3">

                        <div className="flex gap-2">
                            {row.left?.map(seat => (
                                <Seat key={seat.id} seat={seat} />
                            ))}
                        </div>

                        <div className="w-full flex flex-row justify-between items-center">
                            {row.special === "door" && <SquareArrowLeft size={24} />}
                            {row.special === "driver" && <div className="ml-60 w-full"> <LifeBuoy size={24} /></div>}
                            {row.special === "toilet" && "TOILET"}
                        </div>

                        <div className="flex gap-2">
                            {row.right?.map(seat => (
                                <Seat key={seat.id} seat={seat} />
                            ))}
                        </div>

                        <div className="flex gap-2 items-center mr-4.5 md:mr-3">
                            {row.last?.map(seat => (
                                <Seat key={seat.id} seat={seat} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* DETAILS */}
            <div className="flex flex-col gap-2 w-full">

                {selectedSeat ? (
                    <>
                        <div className="p-5" >
                            <h3 className="font-semibold text-center ">Seat Details</h3>
                            <p>
                                Selected Seats:{" "}
                                <b>{selectedSeat?.seatNumber ?? "None"}</b>
                            </p>
                        </div>
                        <SeatSelectForm />
                    </>
                ) : (
                    <EmptyState
                        title="Seat Details"
                        description="To Continue with booking you have to select a seat"
                    />
                )}
            </div>
        </Card>
    )
}

export default BusSeatMap
