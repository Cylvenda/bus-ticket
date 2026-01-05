import { MoveRight, EllipsisVerticalIcon, Circle, Square, Wifi, Coffee, Plug, Armchair, Bus, CircleArrowRight, LucideTimer, CircleX, ArrowBigRightDashIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import SeatModel from "./seat-model"
import EmptyState from "./empty-state"
import { assets } from "@/assets/assets"
import { useBusBookingStore } from "@/store/bus/busBooking.store"


const BussesAvailable = () => {

    const { setActiveBus, setActiveSchedule, openSeats, isSeatsOpen, fetchBookedSeats, schedules, selectedSchedule, activeBus, } = useBusBookingStore()

   // console.log(activeSchedule)
   // console.log("SCHEDULES AVAILABLE: ", schedules)
   // console.log(activeBus)

    const isScheduleSelected = selectedSchedule?.origin && selectedSchedule?.destination && selectedSchedule?.date

    return (
        <>
            <div className="mx-0 md:mx-10 mb-3 md:mb-20 flex flex-col gap-5">
                {
                    !isScheduleSelected ?
                        <>
                            <EmptyState
                                image={assets.busEmpty}
                                title={"Select your route "}
                                description={"You have to select your desired route in order to see available busses."}
                                classNameTitle={"text-2xl"}
                            />
                        </> :

                        <Card className="rounded-none md:rounded-sm border-dashed border-primary">
                            <CardHeader>
                                <CardTitle className="flex flex-row items-center text-lg ">BUSES SCHEDULE </CardTitle>
                                <CardTitle className="flex flex-row items-center gap-2 text-lg ">ROUTE: {selectedSchedule?.origin?.toUpperCase()} <ArrowBigRightDashIcon className="fill-current " /> {selectedSchedule?.destination?.toUpperCase()}</CardTitle>
                                <CardDescription>
                                    List of available buses based on your search
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {
                                    !schedules ?
                                        <EmptyState
                                            image={assets.busEmpty}
                                            title={"No Bus Available"}
                                            description={"Sorry, no bus available for this route right now. Try again later."}
                                        />
                                        :
                                        schedules?.map((schedule) => (
                                            schedule?.buses?.map((bus) => (
                                                <div key={bus.id} className="flex flex-col gap-2">
                                                    <Card className="rounded-sm border-dashed border-primary flex flex-col md:flex-row items-start md:items-center justify-center px-4 md:px-8 gap-3 md:gap-10">

                                                        {/* LEFT */}
                                                        <div className="flex flex-row md:flex-col gap-2 md:gap-1 w-full">
                                                            <div className="w-full">
                                                                <span className="text-xl font-medium text-primary">
                                                                    {bus.company_name}
                                                                </span>

                                                                <p className="flex flex-row gap-1 items-center ml-2">
                                                                    {schedule.route_origin} {<MoveRight size={18} />} {schedule.route_destination}
                                                                </p>

                                                                <span className="text-sm flex flex-row items-center text-muted-foreground ml-2">
                                                                    <p className="border p-1 text-black rounded bg-white">{bus.bus_plate}</p> {<EllipsisVerticalIcon size={18} />} <p className="text-blue-500 font-bold">{"ACTIVE"}</p>
                                                                </span>

                                                                <span className="relative flex flex-col gap-1 md:gap-3 p-3 text-sm ml-2 w-full">
                                                                    <span className="absolute left-[1.2rem] top-6 bottom-6 w-0.5 bg-muted-foreground z-0" />

                                                                    <p className="relative z-10 flex items-center gap-1 w-full">
                                                                        <Circle size={16} className="fill-current text-green-600 bg-background rounded-full" />
                                                                        {bus.startPoint}
                                                                    </p>

                                                                    <p className="relative z-10 flex items-center gap-1 w-full">
                                                                        <Square size={16} className="fill-current text-red-600 bg-background " />
                                                                        {bus.startPoint}
                                                                    </p>
                                                                </span>
                                                            </div>

                                                            <div className="w-fit h-20 ">
                                                                <h1 className="bold md:hidden text-primary font-bold mb-3">Services</h1>
                                                                <span className="flex flex-row gap-3 items-center">
                                                                    <Wifi size={16} className="text-primary" />
                                                                    <Coffee size={16} className="text-primary" />
                                                                    <Plug size={16} className="text-primary" />
                                                                    <Armchair size={16} className="text-primary" />
                                                                    <Bus size={16} className="text-primary" />
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* MIDDLE - DEPARTURE/ARRIVAL */}
                                                        <div className="relative flex flex-row gap-0 md:gap-0 items-center justify-between w-full">
                                                            <span className="hidden md:block absolute w-px -left-2.5 h-27 bg-primary z-0" />

                                                            <div className="flex justify-start w-full">
                                                                <span className="text-sm flex flex-col gap-1">
                                                                    <h2 className="font-semibold">DEPARTURE TIME</h2>
                                                                    <h3 className="font-medium">{schedule.departure_time}</h3>
                                                                    <span className="text-green-500 text-[12px] font-medium">({"MORNING".toUpperCase()})</span>
                                                                    <span className="font-medium">{schedule.travel_date}</span>
                                                                </span>
                                                            </div>

                                                            <span className="hidden md:block absolute w-px -right-2.5 h-27 bg-primary z-0" />

                                                            <div className="relative flex items-center">
                                                                <CircleArrowRight size={16} color="green" />
                                                                <span className="h-px w-9 bg-muted-foreground" />
                                                                <LucideTimer size={18} color="blue" />
                                                                <span className="h-px w-9 bg-muted-foreground" />
                                                                <CircleX size={16} color="red" />
                                                            </div>

                                                            <div className="w-full flex justify-end">
                                                                <span className="text-sm flex flex-col gap-1">
                                                                    <h2 className="font-semibold">ARRIVING TIME</h2>
                                                                    <h3 className="font-medium">{schedule.arrival_time}</h3>
                                                                    <span className="text-green-500 text-[12px] font-medium">({"EVENING".toLocaleUpperCase()})</span>
                                                                    <span className="font-medium">{schedule.travel_date}</span>
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* RIGHT - PRICE & BOOKING */}
                                                        <div className="flex flex-row gap-3 md:gap-6 items-center justify-between w-full">
                                                            <div className="flex flex-col gap-0 md:gap-2 items-center">
                                                                <p className="text-[15px] font-medium">AVAILABLE SEATS</p>
                                                                <span>{bus.total_seats}</span>
                                                            </div>

                                                            <div className="flex flex-col gap-4 items-center justify-center">
                                                                <p className="font-medium">TZS {Number(schedule.price).toLocaleString()}</p>

                                                                <Button
                                                                    className="rounded px-6"
                                                                    onClick={() => { setActiveBus(bus); setActiveSchedule(schedule); openSeats(bus); fetchBookedSeats() }}
                                                                >
                                                                    Book Ticket
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </Card>

                                                    {/* Show seat selection only for the active bus */}

                                                    {activeBus?.id === bus?.id && isSeatsOpen && (
                                                        <SeatModel />
                                                    )}
                                                </div>
                                            ))
                                        ))
                                    }
                            </CardContent>
                        </Card>
                }
            </div>
        </>
    )
}

export default BussesAvailable