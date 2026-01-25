import { MoveRight, EllipsisVerticalIcon, Circle, Square, Wifi, Coffee, Plug, Armchair, Bus, CircleArrowRight, LucideTimer, CircleX, ArrowBigRightDashIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import SeatModel from "./seat-model"
import EmptyState from "./empty-state"
import { assets } from "@/assets/assets"
import { useBusBookingStore } from "@/store/bus/busBooking.store"
import { useCallback, useMemo } from "react"

// Helper function to determine time of day
const getTimeOfDay = (time: string): string => {
    const hour = parseInt(time.split(':')[0])
    if (hour >= 5 && hour < 12) return 'MORNING'
    if (hour >= 12 && hour < 17) return 'AFTERNOON'
    if (hour >= 17 && hour < 21) return 'EVENING'
    return 'NIGHT'
}

// Helper function to format time of day with color
const getTimeOfDayColor = (timeOfDay: string): string => {
    switch (timeOfDay) {
        case 'MORNING': return 'text-green-500'
        case 'AFTERNOON': return 'text-yellow-500'
        case 'EVENING': return 'text-orange-500'
        case 'NIGHT': return 'text-blue-500'
        default: return 'text-gray-500'
    }
}

interface BusServiceIconsProps {
    isMobile?: boolean
}

const BusServiceIcons = ({ isMobile = false }: BusServiceIconsProps) => (
    <div className="w-fit h-20">
        {isMobile && <h1 className="bold md:hidden text-primary font-bold mb-3">Services</h1>}
        <span className="flex flex-row gap-3 items-center" role="list" aria-label="Bus amenities">
            <Wifi size={16} className="text-primary" aria-label="WiFi available" />
            <Coffee size={16} className="text-primary" aria-label="Refreshments available" />
            <Plug size={16} className="text-primary" aria-label="Power outlets available" />
            <Armchair size={16} className="text-primary" aria-label="Comfortable seating" />
            <Bus size={16} className="text-primary" aria-label="Bus service" />
        </span>
    </div>
)

const BussesAvailable = () => {
    const {
        setActiveBus,
        setActiveSchedule,
        openSeats,
        isSeatsOpen,
        fetchBookedSeats,
        schedules,
        selectedSchedule,
        activeBus,
    } = useBusBookingStore()

    const isScheduleSelected = useMemo(() =>
        selectedSchedule?.origin && selectedSchedule?.destination && selectedSchedule?.date,
        [selectedSchedule]
    )

    const hasSchedules = useMemo(() =>
        schedules && schedules.length > 0,
        [schedules]
    )

    // Memoized handler for viewing seats
    const handleViewSeats = useCallback((bus: any, schedule: any) => {
        setActiveBus(bus)
        setActiveSchedule(schedule)
        openSeats(bus)
        fetchBookedSeats()
    }, [setActiveBus, setActiveSchedule, openSeats, fetchBookedSeats])

    if (!isScheduleSelected) {
        return (
            <div className="mx-0 md:mx-10 mb-3 md:mb-20 flex flex-col gap-5">
                <EmptyState
                    image={assets.busEmpty}
                    title="Select your route"
                    description="You have to select your desired route in order to see available buses."
                    classNameTitle="text-2xl"
                />
            </div>
        )
    }

    return (
        <div className="mx-0 md:mx-10 mb-3 md:mb-20 flex flex-col gap-5">
            <Card className="rounded-none md:rounded-sm border-dashed border-primary">
                <CardHeader>
                    <CardTitle className="flex flex-row items-center text-lg">
                        BUSES SCHEDULE
                    </CardTitle>
                    <CardTitle className="flex flex-row items-center gap-2 text-lg">
                        ROUTE: {selectedSchedule.origin?.toUpperCase()}
                        <ArrowBigRightDashIcon className="fill-current" aria-hidden="true" />
                        {selectedSchedule.destination?.toUpperCase()}
                    </CardTitle>
                    <CardDescription>
                        List of available buses based on your search
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {!hasSchedules ? (
                        <EmptyState
                            image={assets.busEmpty}
                            title="No Bus Available"
                            description="Sorry, no bus available for this route right now. Try again later."
                        />
                    ) : (
                        schedules.map((schedule) => (
                            schedule?.buses?.map((bus) => {
                                const departureTimeOfDay = getTimeOfDay(schedule.departure_time)
                                const arrivalTimeOfDay = getTimeOfDay(schedule.arrival_time)
                                const isActiveBusSelected = activeBus?.id === bus?.id

                                return (
                                    <div key={bus.id} className="flex flex-col gap-2">
                                        <Card className="rounded-sm border-dashed border-primary flex flex-col md:flex-row items-start md:items-center justify-center px-4 md:px-8 gap-3 md:gap-10">
                                            {/* LEFT - Bus Details */}
                                            <div className="flex flex-row md:flex-col gap-2 md:gap-1 w-full">
                                                <div className="w-full">
                                                    <span className="text-xl font-medium text-primary">
                                                        {bus.company_name}
                                                    </span>

                                                    <p className="flex flex-row gap-1 items-center ml-2">
                                                        {schedule.route_origin}
                                                        <MoveRight size={18} aria-hidden="true" />
                                                        {schedule.route_destination}
                                                    </p>

                                                    <span className="text-sm flex flex-row items-center gap-1 text-muted-foreground ml-2">
                                                        <p className="border p-1 text-black rounded bg-white font-mono">
                                                            {bus.bus_plate}
                                                        </p>
                                                        <EllipsisVerticalIcon size={18} aria-hidden="true" />
                                                        <p className={`font-bold ${bus.status === 'ACTIVE' ? 'text-blue-500' : 'text-gray-500'}`}>
                                                            {bus.status || 'ACTIVE'}
                                                        </p>
                                                    </span>

                                                    {/* Route Points */}
                                                    <span className="relative flex flex-col gap-1 md:gap-3 p-3 text-sm ml-2 w-full">
                                                        <span
                                                            className="absolute left-[1.2rem] top-6 bottom-6 w-0.5 bg-muted-foreground z-0"
                                                            aria-hidden="true"
                                                        />

                                                        <p className="relative z-10 flex items-center gap-1 w-full">
                                                            <Circle
                                                                size={16}
                                                                className="fill-current text-green-600 bg-background rounded-full flex-shrink-0"
                                                                aria-label="Starting point"
                                                            />
                                                            <span className="truncate">{bus.startPoint}</span>
                                                        </p>

                                                        <p className="relative z-10 flex items-center gap-1 w-full">
                                                            <Square
                                                                size={16}
                                                                className="fill-current text-red-600 bg-background flex-shrink-0"
                                                                aria-label="Destination point"
                                                            />
                                                            <span className="truncate">{bus.endPoint || bus.destination}</span>
                                                        </p>
                                                    </span>
                                                </div>

                                                <BusServiceIcons isMobile />
                                            </div>

                                            {/* MIDDLE - Departure/Arrival Times */}
                                            <div className="relative flex flex-row gap-0 md:gap-0 items-center justify-between w-full">
                                                <span className="hidden md:block absolute w-px -left-2.5 h-full bg-primary z-0" aria-hidden="true" />

                                                <div className="flex justify-start w-full">
                                                    <span className="text-sm flex flex-col gap-1">
                                                        <h2 className="font-semibold">DEPARTURE TIME</h2>
                                                        <h3 className="font-medium text-base">{schedule.departure_time}</h3>
                                                        <span className={`${getTimeOfDayColor(departureTimeOfDay)} text-xs font-medium`}>
                                                            ({departureTimeOfDay})
                                                        </span>
                                                        <span className="font-medium text-xs">{schedule.travel_date}</span>
                                                    </span>
                                                </div>

                                                <span className="hidden md:block absolute w-px -right-2.5 h-full bg-primary z-0" aria-hidden="true" />

                                                {/* Journey Timeline */}
                                                <div className="relative flex items-center" aria-label="Journey timeline">
                                                    <CircleArrowRight size={16} color="green" aria-label="Departure" />
                                                    <span className="h-px w-9 bg-muted-foreground" aria-hidden="true" />
                                                    <LucideTimer size={18} color="blue" aria-label="Travel time" />
                                                    <span className="h-px w-9 bg-muted-foreground" aria-hidden="true" />
                                                    <CircleX size={16} color="red" aria-label="Arrival" />
                                                </div>

                                                <div className="w-full flex justify-end">
                                                    <span className="text-sm flex flex-col gap-1">
                                                        <h2 className="font-semibold">ARRIVING TIME</h2>
                                                        <h3 className="font-medium text-base">{schedule.arrival_time}</h3>
                                                        <span className={`${getTimeOfDayColor(arrivalTimeOfDay)} text-xs font-medium`}>
                                                            ({arrivalTimeOfDay})
                                                        </span>
                                                        <span className="font-medium text-xs">{schedule.travel_date}</span>
                                                    </span>
                                                </div>
                                            </div>

                                            {/* RIGHT - Price & Booking */}
                                            <div className="flex flex-row gap-3 md:gap-6 items-center justify-between w-full">
                                                <div className="flex flex-col gap-0 md:gap-2 items-center">
                                                    <p className="text-[15px] font-medium">AVAILABLE SEATS</p>
                                                    <span className="text-lg font-semibold text-primary">
                                                        {bus.available_seats ?? bus.total_seats}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col gap-4 items-center justify-center">
                                                    <p className="font-medium text-lg">
                                                        TZS {Number(schedule.price).toLocaleString()}
                                                    </p>

                                                    <Button
                                                        className="rounded px-6 cursor-pointer"
                                                        onClick={() => handleViewSeats(bus, schedule)}
                                                        aria-label={`View seats for ${bus.company_name} bus`}
                                                        disabled={bus.available_seats === 0}
                                                    >
                                                        View Seats
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>

                                        {/* Seat Selection Modal */}
                                        {isActiveBusSelected && isSeatsOpen && (
                                            <SeatModel />
                                        )}
                                    </div>
                                )
                            })
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default BussesAvailable