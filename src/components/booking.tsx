import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {SearchableSelect} from "@/components/searchable-select.tsx";
import {useState} from "react";
import { Button } from "@/components/ui/button"
import { SetCalendar } from "@/components/calender"
import { ArrowLeftRight } from "lucide-react"
import {Label} from "@/components/ui/label.tsx";

const Booking = () => {

    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")

    const handleSwap = () => {
        setFrom(to)
        setTo(from)
    }

    return (
        <>

                <Card className="rounded-none md:rounded bg-primary max-w-5xl mx-auto w-full ">
                    <CardHeader>
                        <CardTitle className="text-xl">
                            Place Your Booking Now
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col justify-center gap-4">
                        <div className="bg-accent p-5 rounded flex flex-col md:flex-row gap-4 justify-between">
                            {/* FROM */}
                            <SearchableSelect
                                label="Where Are You From"
                                placeholder="Select From"
                                value={from}
                                onChange={setFrom}
                                disabledValue={to}
                            />

                            {/* SWAP BUTTON  FROM LEFT TO RIGHT*/}
                          <div className="flex flex-col gap-3 justify-between">
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
                            />

                            {/* DATE */}
                            <SetCalendar  />
                        </div>

                        <div className="text-center">
                            <Button variant="secondary" className=" w-full md:w-70 ">
                                Search For Bus
                            </Button>
                        </div>
                    </CardContent>
                </Card>


        </>
    );
};

export default Booking;