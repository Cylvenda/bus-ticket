import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { SearchableSelect } from "@/components/searchable-select.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { SetCalendar } from "@/components/calender"
import { ArrowLeftRight } from "lucide-react"
import { Label } from "@/components/ui/label.tsx";
import { useBusBookingStore } from "@/store/useBusBookingStore";
import useMockData from "@/hooks/use-mock-data";

type routesType = {
    value: string,
    label: string
}

const Booking = () => {

    const { availableBuses, setSelectedRoute } = useBusBookingStore()

    useMockData()
    

    const routesFrom: routesType[] = availableBuses?.map((data) => ({
        value: data.from,
        label: data.from,
    }))

    const routesTo: routesType[] = availableBuses?.map((data) => ({
        value: data.to,
        label: data.to,
    }))

    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [date, setDate] = useState<string>("")


    const handleSwap = () => {
        setFrom(to)
        setTo(from)
    }

    const handleSearchBus = () => {
        if (from && to) {
            setSelectedRoute({
                selectedRouteFrom: from,
                selectedRouteTo: to,
                selecteDate: date
            })

            // navigation logic
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
                            disabled={!from || !to}
                        >
                            Search For Bus
                        </Button>

                    </div>
                </CardContent>
            </Card>


        </>
    );
};

export default Booking;