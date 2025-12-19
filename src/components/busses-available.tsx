import { MoveRight, EllipsisVerticalIcon, Circle, Square, Wifi, Coffee, Plug, Armchair, Bus, CircleArrowRight, LucideTimer, CircleX } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import SeatModel from "./seat-model"
import { useBusBookingStore } from "@/store/useBusBookingStore"
import EmptyState from "./empty-state"
import { assets } from "@/assets/assets"
import useMockData from "@/hooks/use-mock-data"


const BussesAvailable = () => {
    const { availableBuses, activeBus, isSeatsOpen, openSeats } = useBusBookingStore()

    // calling the mock data before connecting to an API
    useMockData()


    return (
        <>
            <div className="mx-0 md:mx-10 mb-3 md:mb-20 flex flex-col gap-5">
                <Card className="rounded-none md:rounded-sm border-dashed border-primary">
                    <CardHeader>
                        <CardTitle>BUS SCHEDULE</CardTitle>
                        <CardDescription>
                            List of available buses based on your search
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">

                        {
                            BussesAvailable === null ?
                                <EmptyState
                                    image={assets.busEmpty}
                                    title={"No Bus Available"}
                                    description={"Sorry, no bus available for this route right now. Try again later."}
                                />
                                :
                                availableBuses?.map((bus) => (
                                    <div key={bus.id} className="flex flex-col gap-2">
                                        <Card className="rounded-sm border-dashed border-primary flex flex-col md:flex-row items-start md:items-center justify-center px-4 md:px-8 gap-3 md:gap-10">

                                            {/* LEFT */}
                                            <div className="flex flex-row md:flex-col gap-3 md:gap-1 w-full">
                                                <div className="w-full">
                                                    <span className="text-xl font-medium text-primary">
                                                        {bus.company}
                                                    </span>

                                                    <p className="flex flex-row gap-1 items-center ml-2">
                                                        {bus.from} {<MoveRight size={18} />} {bus.to}
                                                    </p>

                                                    <span className="text-sm flex flex-row items-center text-muted-foreground ml-2">
                                                        <p>{bus.plateNumber}</p> {<EllipsisVerticalIcon size={18} />} <p>{bus.type}</p>
                                                    </span>

                                                    <span className="relative flex flex-col gap-1 md:gap-3 p-3 text-sm ml-2">
                                                        <span className="absolute left-[1.2rem] top-6 bottom-6 w-0.5 bg-muted-foreground z-0" />

                                                        <p className="relative z-10 flex items-center gap-1">
                                                            <Circle size={16} className="fill-current text-green-600 bg-background rounded-full" />
                                                            {bus.startPoint}
                                                        </p>

                                                        <p className="relative z-10 flex items-center gap-1">
                                                            <Square size={15} className="fill-current text-red-600 bg-background" />
                                                            {bus.endPoint}
                                                        </p>
                                                    </span>
                                                </div>

                                                <div>
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
                                                        <h3 className="font-medium">{bus.startTime}</h3>
                                                        <span className="text-green-500 text-[12px] font-medium">({bus.startPeriod.toUpperCase()})</span>
                                                        <span className="font-medium">{bus.startDate}</span>
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
                                                        <h3 className="font-medium">{bus.endTime}</h3>
                                                        <span className="text-green-500 text-[12px] font-medium">({bus.endPeriod.toLocaleUpperCase()})</span>
                                                        <span className="font-medium">{bus.endDate}</span>
                                                    </span>
                                                </div>
                                            </div>

                                            {/* RIGHT - PRICE & BOOKING */}
                                            <div className="flex flex-row gap-3 md:gap-6 items-center justify-between w-full">
                                                <div className="flex flex-col gap-0 md:gap-2 items-center">
                                                    <p className="text-[15px] font-medium">AVAILABLE SEATS</p>
                                                    <span>40</span>
                                                </div>

                                                <div className="flex flex-col gap-4 items-center justify-center">
                                                    <p className="font-medium">{bus.price}</p>

                                                    <Button
                                                        className="rounded px-6"
                                                        onClick={() => openSeats(bus)}
                                                    >
                                                        Book Ticket
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>

                                        {/* Show seat selection only for the active bus */}
                                        {activeBus?.id === bus.id && isSeatsOpen && (
                                            <SeatModel />
                                        )}
                                    </div>
                                ))}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default BussesAvailable