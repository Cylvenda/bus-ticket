import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { SearchableSelect } from "@/components/searchable-select.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { SetCalendar } from "@/components/calender"
import { ArrowLeftRight } from "lucide-react"
import { Label } from "@/components/ui/label.tsx";
import { useBus } from "@/hooks/use-bus-booking";
import { useBusBookingStore } from "@/store/bus/busBooking.store";
import { Spinner } from "./ui/spinner";

type routesType = {
    value: string,
    label: string
}

const Booking = () => {

    const { setSelectedSchedule, fetchSchedules, loading } = useBusBookingStore()

    const { routes } = useBus()

    const routesFrom: routesType[] = routes?.map((data) => ({
        id: data.id,
        value: data.origin,
        label: data.origin,
    }))

    const routesTo: routesType[] = routes?.map((data) => ({
        id: data.id,
        value: data.destination,
        label: data.destination,
    }))

    const [from, setFrom] = useState("" )
    const [to, setTo] = useState("")
    const [date, setDate] = useState<string>("")


    const handleSwap = () => {
        setFrom(to)
        setTo(from)
    }

    const handleSearchBus = () => {
        if (from && to && date) {

            setSelectedSchedule({
                origin: from,
                destination: to,
                date: date
            })

            fetchSchedules()
        }
    }

    return (
        <>
            <Card className="rounded-none md:rounded bg-primary max-w-5xl mx-auto w-full ">
                <CardHeader>
                    <CardTitle className="text-xl text-center">
                        Place Your Route
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col justify-center gap-4 ">
                    <div className="bg-accent p-5 rounded flex flex-col md:flex-row gap-4 justify-between">
                        {/* FROM */}
                        <SearchableSelect
                            label="Where Are You From"
                            placeholder="Select From"
                            value={from}
                            onChange={setFrom}
                            disabledValue={to}
                            routes={routesFrom}
                        />

                        {/* SWAP BUTTON  FROM LEFT TO RIGHT*/}
                        <div className="flex flex-col gap-3 justify-between ">
                            <Label className="hidden md:block invisible">Swap</Label>
                            <Button
                                aria-label="reverse"
                                variant="outline"
                                size="icon"
                                className="mb-2"
                                onClick={handleSwap}
                                disabled={!from || !to}
                            >
                                <ArrowLeftRight />
                            </Button>
                        </div>

                        {/* TO */}
                        <SearchableSelect
                            label="Where Are You Going"
                            placeholder="Select To"
                            value={to}
                            onChange={setTo}
                            disabledValue={from}
                            routes={routesTo}
                        />

                        {/* DATE */}
                        <SetCalendar date={date} setDate={setDate} />
                    </div>

                    <div className="text-center">
                        <Button
                            variant="secondary"
                            className="w-full md:w-70 disabled:cursor-not-allowed"
                            onClick={handleSearchBus}
                            disabled={!from || !to || !date || loading}
                        >
                            {loading ? <Spinner className="size-6 text-primary" /> : "Search For Bus"}
                        </Button>

                    </div>
                </CardContent>
            </Card>


        </>
    );
};

export default Booking;