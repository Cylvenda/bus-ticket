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
} from "lucide-react"
import SeatSelectionModal from "@/components/seat-selection-model"

const buses = [
    {
        id: 1,
        route: "Moshi → Dodoma",
        date: "December 17th",
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

            <div className="mx-10 mb-20">
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
                                <div className="flex items-center justify-between p-5 gap-10">
                                    {/* LEFT */}
                                    <div className="flex flex-col gap-2 w-1/3">
                                        <span className="text-xs text-muted-foreground">
                                            {bus.date}
                                        </span>
                                        <p className="font-medium">{bus.route}</p>
                                        <div className="h-1 w-full bg-muted rounded">
                                            <div
                                                className={`h-1 rounded ${bus.color}`}
                                                style={{ width: "50%" }}
                                            />
                                        </div>
                                    </div>

                                    {/* MIDDLE */}
                                    <div className="flex flex-col gap-2 w-1/3">
                                        <span className="text-xs text-muted-foreground">
                                            {bus.company}
                                        </span>
                                        <p className="font-medium">{bus.type}</p>
                                        <div className="flex gap-3 text-muted-foreground">
                                            <Wifi size={16} />
                                            <Coffee size={16} />
                                            <Plug size={16} />
                                            <Armchair size={16} />
                                            <Bus size={16} />
                                        </div>
                                    </div>

                                    {/* RIGHT */}
                                    <div className="flex items-center justify-between w-1/3">
                                        <div>
                                            <p className="font-medium">{bus.time}</p>
                                            <span className="text-xs text-muted-foreground">
                                                {bus.period}
                                            </span>
                                        </div>

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
