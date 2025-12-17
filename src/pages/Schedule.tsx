import { useState } from "react"
import Footer from "@/components/sections/footer"
import Header from "@/components/header"
import Booking from "@/components/booking"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Bus,
    Wifi,
    Coffee,
    Plug,
    Armchair,
    Circle,
    Square, MoveRight, LucideTimer,
} from "lucide-react"
import SeatSelectionModal from "@/components/seat-selection-model"

const buses = [
    {
        id: 1,
        route: "Moshi → Dar Es Salaam",
        date: "December 17th",
        form: "Moshi",
        to: "Dodoma",
        company: "SIFA",
        type: "Luxury Bus",
        time: "08:15 HRS",
        period: "Morning",
        price: "36,000 TZS",
        color: "bg-orange-500",
    },
    {
        id: 2,
        route: "Moshi → Dodoma",
        date: "December 17th",
        form: "Moshi",
        to: "Dodoma",
        company: "SIFA",
        type: "Upper Semi Luxury",
        time: "09:30 HRS",
        period: "Morning",
        price: "36,000 TZS",
        color: "bg-green-500",
    },
    {
        id: 3,
        route: "Moshi → Dodoma",
        date: "December 17th",
        form: "Moshi",
        to: "Mwanza",
        company: "SIFA",
        type: "Upper Semi Luxury",
        time: "20:00 HRS",
        period: "Night",
        price: "36,000 TZS",
        color: "bg-green-500",
    },
]

const mockSeats = Array.from({ length: 40 }).map((_, i) => ({
    number: `A${i + 1}`,
    status: Math.random() > 0.75 ? "booked" : "available",
}))

const Schedule = () => {
    const [openSeats, setOpenSeats] = useState(false)
    const [activeBus, setActiveBus] = useState<any>(null)

    return (
        <>
            <Header />

            <div className="m-10">
                <Booking />
            </div>

            <div className="mx-10 mb-20 flex flex-col gap-5 rounded- ">
                <Card className="rounded-sm">
                    <CardHeader>
                        <CardTitle>BUS SCHEDULE</CardTitle>
                        <CardDescription>
                            List of available buses based on your search
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {buses.map((bus) => (
                            <Card key={bus.id} className="rounded-sm border">
                                <div className="flex items-center justify-between px-8 gap-10">
                                    {/* LEFT */}
                                    <div className="flex flex-col gap-1 ">
                                        <span className="text-xl font-medium text-primary">
                                            {bus.type}
                                        </span>
                                        <p className="flex flex-row gap-1 items-center">{bus.form} {<MoveRight size={28} />} {bus.to} </p>

                                        <div >
                                                <span className="text-sm flex flex-row items-center gap-2">
                                                    <p>T373 DFV </p> {<MoveRight size={28} />} <p> {bus.type}</p>
                                                </span>
                                            <span className="relative flex flex-col gap-3 p-3 text-sm">
                                                <span className=" absolute left-[1.2rem] top-6 bottom-6 w-0.5 bg-black z-0 "/>
                                                <p className="relative z-10 flex items-center gap-1">
                                            <Circle size={16} className="fill-current text-green-600 bg-background rounded-full" />
                                            Arusha Main Office
                                          </p>

                                            <p className="relative z-10 flex items-center gap-1">
                                            <Square size={15} className="fill-current text-red-600 bg-background" />
                                            Kigamboni Office
                                          </p>
                                        </span>
                                        </div>

                                        <div className="flex gap-3 text-muted-foreground">
                                            <Wifi size={16} className="text-primary"/>
                                            <Coffee size={16} className="text-primary" />
                                            <Plug size={16} className="text-primary" />
                                            <Armchair size={16} className="text-primary" />
                                            <Bus size={16} className="text-primary" />
                                        </div>
                                    </div>

                                    {/* MIDDLE */}
                                    <div className="relative flex flex-row gap-15 items-center justify-between">

                                        {/*separator*/}
                                        <span className=" absolute w-px -left-2.5 h-30  bg-muted-foreground z-0 "/>
                                        <div>
                                        <span className="text-sm flex flex-col items-start">
                                            <h2>DEPARTURE TIME</h2>
                                            <h3 className=" font-medium">5:00</h3>
                                            <span className="text-green-500 text-[12px] font-medium">(EARL MORNING)</span>
                                            <span>17-12-2025</span>
                                        </span>

                                        </div>
                                        {/*separator*/}
                                        <span className=" absolute w-px -right-2.5 h-30  bg-muted-foreground z-0"/>
<div className="relative">
    <LucideTimer className="" />.
</div>                                        <div>
                                        <span className="text-sm flex flex-col items-start">
                                            <h2>ARRIVING TIME</h2>
                                            <h3 className=" font-medium" >5:00</h3>
                                            <span className="text-green-500 text-[12px] font-medium">(EVENING)</span>
                                            <span>17-12-2025</span>
                                        </span>
                                        </div>
                                    </div>

                                    {/* CENTER */}
                                    <div className="flex flex-col gap-2 items-center">
                                        <p className="font-medium">AVAILABLE SEATS</p>
                                        <span>40</span>
                                    </div>


                                    {/*THIRD*/}
                                    <div className="flex flex-col gap-4 items-center">
                                        <div>
                                            <p className="font-medium">{bus.price}</p>
                                        </div>

                                        <Button
                                            className="rounded-full px-6"
                                            onClick={() => {
                                                setActiveBus(bus)
                                                setOpenSeats(true)
                                            }}
                                        >
                                            Book Ticket
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <SeatSelectionModal
                open={openSeats}
                onClose={() => setOpenSeats(false)}
                seats={mockSeats}
                bus={activeBus}
            />

            <Footer />
        </>
    )
}

export default Schedule
