import EmptyState from "./empty-state"
import { useBus } from "@/hooks/use-bus-booking"
import Seat from "./seat"
import { Card } from "./ui/card"
import { useBusBookingStore } from "@/store/bus/busBooking.store"
import SeatSelectForm from "./seat-select-form"
import { assets } from "@/assets/assets"
import { DotSquareIcon, ToiletIcon } from "lucide-react"

const SeatModel = () => {
    
    const {
        activeBus,
    } = useBus()

    const { selectedSeat } = useBusBookingStore()

    const seatLayout = activeBus?.seat_layout_structure

    if (!seatLayout) {
        return (
            <EmptyState
                title="No Bus Selected"
                description="Please select a bus"
            />
        )
    }

    return (
        <>
            <Card className="flex flex-col md:flex-row gap-0 md:gap-5  justify-center p-0 md:p-5 border border-dashed border-primary w-full">
                <Card className=" border-none md:border-md md:border-primary rounded-none md:rounded-xl p-5 w-full md:w-90 ml-2.5 md:ml-0 flex flex-col gap-1 ">
                    <div className="flex flex-col gap-1 text-xs w-full border border-primary border-dashed rounded-md p-2">
                        <h1 className="text-center text-lg font-bold">Seat Color Details</h1>
                        <div className="flex flex-row justify-between ">
                            <div >
                                <span className="flex gap-1 items-center m-2">
                                    <span className="w-3 h-3 bg-green-600 rounded" /> Available
                                </span>
                                <span className="flex gap-1 items-center m-2">
                                    <span className="w-3 h-3 bg-red-600 rounded" /> Booked
                                </span>
                            </div>

                            <div>
                                <span className="flex gap-1 items-center m-2">
                                    <span className="w-3 h-3 bg-yellow-500 rounded" /> Selected by You
                                </span>

                                <span className="flex gap-1 items-center m-2">
                                    <span className="w-3 h-3 bg-gray-400 rounded" /> Selected by Others
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="border border-primary border-dashed p-5 rounded-md">
                        {seatLayout.rows.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex justify-between gap-4 mb-2">
                                {row.map((seat, seatIndex) => {

                                    if (!seat || seat === "null") return <div key={seatIndex} className="w-10" />

                                    if (seat === "door") {
                                        return (
                                            <div key={seatIndex} className="w-11 bg-accent dark:bg-accent-foreground  p-2 rounded cursor-pointer">
                                                <DotSquareIcon className="text-primary"  />
                                            </div>
                                        )
                                    }

                                    if (seat === "driver") {
                                        return (
                                            <div key={seatIndex} className="w-12 bg-accent dark:bg-accent-foreground  p-2 rounded cursor-pointer">
                                                <img src={assets.steeringWheel} alt="driver" />
                                            </div>
                                        )
                                    }

                                    if (seat === "toilet") {
                                        return (
                                            <div key={seatIndex} className="w-12 bg-accent dark:bg-accent-foreground p-2 rounded cursor-pointer">
                                                <ToiletIcon className="text-primary" />
                                            </div>
                                        )
                                    }


                                    return (
                                        <div className="w-10">
                                            <Seat seat={{ id: seatIndex, seat_number: seat }} />
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </Card>

                {/* DETAILS */}
                <Card className="flex flex-col w-full p-5">

                    {selectedSeat ? (
                        <>
                            <div className="p-3 -mb-7" >
                                <div className="rounded-md border border-primary border-dashed p-2 ">
                                    <h3 className="font-semibold text-center ">Passenger Form For Ticket Booking</h3>
                                    <p className="pt-5">
                                        You have Selected Seats{" "}{" "}{" "}
                                        <b className="bg-yellow-400 p-1 rounded cursor-pointer text-white dark:text-black">{selectedSeat}</b>
                                        {" "}{" "}{" "} Fill the form for completing your purchaces
                                    </p>
                                </div>
                            </div>
                            <SeatSelectForm />
                        </>
                    ) : (
                        <EmptyState
                            title="Seat Details"
                            description="To Continue with booking you have to select a seat"
                        />
                    )}
                </Card>
            </Card>
        </>
    )
}

export default SeatModel


