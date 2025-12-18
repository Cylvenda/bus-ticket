import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {SearchableSelect} from "@/components/searchable-select.tsx";
import {useState} from "react";
import { Button } from "@/components/ui/button"
import { SetCalendar } from "@/components/calender"
import { ArrowLeftRight } from "lucide-react"
import {Label} from "@/components/ui/label.tsx";

const routes = [
    { value: "dar-es-salaam", label: "Dar es Salaam" },
    { value: "dodoma", label: "Dodoma" },
    { value: "arusha", label: "Arusha" },
    { value: "moshi", label: "Moshi" },
    { value: "mwanza", label: "Mwanza" },
    { value: "tanga", label: "Tanga" },
    { value: "morogoro", label: "Morogoro" },
    { value: "iringa", label: "Iringa" },
    { value: "mbeya", label: "Mbeya" },
    { value: "songea", label: "Songea" },
    { value: "singida", label: "Singida" },
    { value: "tabora", label: "Tabora" },
    { value: "kigoma", label: "Kigoma" },
    { value: "shinyanga", label: "Shinyanga" },
    { value: "kahama", label: "Kahama" },
    { value: "bukoba", label: "Bukoba" },
    { value: "musoma", label: "Musoma" },
    { value: "babati", label: "Babati" },
    { value: "njombe", label: "Njombe" },
    { value: "lindi", label: "Lindi" },
    { value: "mtwara", label: "Mtwara" },
    { value: "rombo", label: "Rombo" },
]

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
                                routes={routes}
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
                                routes={routes}
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