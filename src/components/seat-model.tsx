import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Timer} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@/components/ui/separator.tsx";

const SeatModel = () => {
    return (
        <>
            <Card className="rounded-sm">
                <CardHeader>
                    <CardTitle>{"TILISHO SAFARI"}</CardTitle>
                    <CardDescription>{"ARUSHA | MOSHI => VIA BAGAMOYO | KIGAMBONI"}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between ">
                    {/*Car details*/}
                    <div>
                        <span className="">
                            {"T373 DFV => AC LUXURY VVIP"}
                        </span>
                        <span className="flex flex-col gap-1 p-3">
                            <p>Starting at: Arusha Main Office</p>
                            <p>Ending at: Kigamboni Office</p>
                            </span>
                    </div>

                    <Separator orientation="vertical" />

                        {/*route detail*/}
                    <div className="flex flex-row justify-between">
                        <span className="">
                            <h2>DEPARTURE TIME</h2>
                            <h3>5:00</h3>
                            <span>(EARL MORNING)</span>
                            <span>17-12-2025</span>
                        </span>
                        <span className="">
                                  <Timer className="h-4 w-4 fill-gray-700"/>
                        </span>
                        <span className="">
                            <h2>ARRIVAL TIME</h2>
                            <h3>17:00</h3>
                            <span>(EVENING)</span>
                            <span>17-12-2025</span>
                        </span>
                    </div>

                    <Separator orientation="vertical" />

                        {/*available ticket and book button*/}
                    <div className="flex flex-row justify-between gap-3">
                        <span>
                            <h1>37</h1>
                            <h2>AVAILABLE SEATS</h2>
                        </span>

                        <Button
                            className="rounded-full px-6"
                        >
                            Book Ticket
                        </Button>
                    </div>

                </CardContent>
            </Card>

        </>
    );
}

export default SeatModel;