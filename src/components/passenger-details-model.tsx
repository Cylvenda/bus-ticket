import {
     Sheet,
     SheetClose,
     SheetContent,
     SheetDescription,
     SheetHeader,
     SheetTitle,
} from "@/components/ui/sheet"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "./ui/button"
import type { PassengerInfo } from "@/types/user"
import { useBusBookingStore } from "@/store/bus/busBooking.store"

type PassengerDetailsModelProps = {
     isPassengerDetailsOpen: boolean
     setIsPassengerDetailsOpen: (open: boolean) => void
     onConfirmPassengerDetails: () => void
     passengerData?: PassengerInfo
}

const PassengerDetailsModel = ({
     isPassengerDetailsOpen,
     setIsPassengerDetailsOpen,
     onConfirmPassengerDetails,
     passengerData,
}: PassengerDetailsModelProps) => {


     const { activeSchedule, activeBus } = useBusBookingStore()
     return (
          <Sheet
               open={isPassengerDetailsOpen}
               onOpenChange={setIsPassengerDetailsOpen}
          >
               <SheetContent className="w-full sm:max-w-6xl overflow-y-auto h-screen">
                    <SheetHeader className="flex flex-col items-center justify-center -mb-6">
                         <SheetTitle className="text-2xl">
                              Review Your Booking
                         </SheetTitle>
                         <SheetDescription>
                              Please confirm the details below before proceeding to payment.
                         </SheetDescription>
                    </SheetHeader>
                    comfirmPassengerDetailsSubmit
                    {/* Cards */}
                    <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 p-3">
                         {/* Schedule */}
                         <Card className="rounded-sm border border-primary border-dashed">
                              <CardHeader>
                                   <CardTitle className="text-base">
                                        Schedule Details
                                   </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2 text-sm">
                                   <Detail label="From" value={passengerData?.startJournal ?? "-"} />
                                   <Detail label="To" value={passengerData?.endJournal ?? "-"} />
                                   <Detail label="Departure" value={activeSchedule?.departure_time ?? "-"} />
                                   <Detail label="Arrival" value={activeSchedule?.arrival_time ?? "-"} />
                                   <Separator className=" border border-primary border-dashed " />
                                   <Detail label="Date" value={activeSchedule?.travel_date ?? "-"} />
                              </CardContent>
                         </Card>

                         {/* Bus */}
                         <Card className="rounded-sm border border-primary border-dashed">
                              <CardHeader>
                                   <CardTitle className="text-base">
                                        Bus Details
                                   </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2 text-sm">
                                   <Detail label="Bus Name" value={activeBus?.company_name ?? "-"} />
                                   <Detail label="Bus Plate No" value={activeBus?.plate_number ?? "-"} />
                                   <Detail label="Seat" value={passengerData?.seatNumber ?? "-"} />
                                   <Detail label="Type" value={activeBus?.bus_type ?? "-"} />
                              </CardContent>
                         </Card>

                         {/* Passenger */}
                         <Card className="rounded-sm border border-primary border-dashed">
                              <CardHeader>
                                   <CardTitle className="text-base">
                                        Passenger Details
                                   </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2 text-sm">
                                   <Detail label="Name" value={`${passengerData?.firstName}  ${passengerData?.lastName} `} />
                                   <Detail label="Phone" value={passengerData?.phone ?? "-"} />
                                   <Detail label="Gender" value={passengerData?.gender ?? "-"} />
                                   <Detail label="Nationality" value={passengerData?.country === "TZ" ? "Tanzania" : passengerData?.country ?? "-"} />
                              </CardContent>
                         </Card>
                    </div>

                    {/* Price Summary */}
                    <div className="p-3 -mt-5">
                         <Card className="rounded-md border border-primary border-dashed shadow-sm">
                              {/* Price Section */}
                              <CardContent className="flex justify-between items-center py-4 px-5">
                                   <span className="text-sm text-muted-foreground">Total Price</span>
                                   <span className="text-lg font-bold text-primary">
                                        {"TZS " + Number(activeSchedule?.price).toLocaleString()}
                                   </span>
                              </CardContent>

                              <Separator className="border-primary border-dashed mx-5" />

                              {/* Actions */}
                              <CardFooter className="flex flex-col md:flex-row justify-between gap-3 px-5 py-4">
                                   <SheetClose className="w-full md:w-1/2">
                                        <Button variant="outline" className="w-full">
                                             Edit Details
                                        </Button>
                                   </SheetClose>
                                   <Button
                                        onClick={onConfirmPassengerDetails}
                                        className="w-full md:w-1/2 bg-primary text-primary-foreground hover:opacity-90 cursor-pointer"
                                   >
                                        Continue With Payment
                                   </Button>
                              </CardFooter>
                         </Card>

                    </div>

                    {/* Footer */}

               </SheetContent>
          </Sheet>

     )
}

export default PassengerDetailsModel

/* Small reusable component */
const Detail = ({
     label,
     value,
}: {
     label: string
     value: string
}) => (
     <div className="flex justify-between">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium">{value}</span>
     </div>
)
