import {
     AlertDialog,
     AlertDialogAction,
     AlertDialogCancel,
     AlertDialogContent,
     AlertDialogDescription,
     AlertDialogFooter,
     AlertDialogHeader,
     AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type PassengerDetailsModelProps = {
     isPassengerDetailsOpen: boolean
     setIsPassengerDetailsOpen: (open: boolean) => void
     onConfirmPassengerDetails: () => void
}

const PassengerDetailsModel = ({
     isPassengerDetailsOpen,
     setIsPassengerDetailsOpen,
     onConfirmPassengerDetails,
}: PassengerDetailsModelProps) => {
     return (
          <AlertDialog
               open={isPassengerDetailsOpen}
               onOpenChange={setIsPassengerDetailsOpen}
          >
               <AlertDialogContent className="w-260">
                    <AlertDialogHeader>
                         <AlertDialogTitle className="text-xl">
                              Confirm Passenger Details
                         </AlertDialogTitle>
                         <AlertDialogDescription>
                              Please review all details carefully before proceeding to payment.
                         </AlertDialogDescription>
                    </AlertDialogHeader>

                    {/* Cards Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 w-full">
                         {/* Schedule Details */}
                         <Card>
                              <CardHeader>
                                   <CardTitle className="text-base">Schedule Details</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2 text-sm">
                                   <Detail label="From" value="Dodoma" />
                                   <Detail label="To" value="Dar es Salaam" />
                                   <Detail label="Departure" value="12:00 PM" />
                                   <Detail label="Arrival" value="2:30 PM" />
                                   <Separator />
                                   <Detail label="Date" value="12 Jan 2026" />
                              </CardContent>
                         </Card>

                         {/* Bus Details */}
                         <Card>
                              <CardHeader>
                                   <CardTitle className="text-base">Bus Details</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2 text-sm">
                                   <Detail label="Bus Name" value="Kilimanjaro Express" />
                                   <Detail label="Bus Number" value="T 456 ABC" />
                                   <Detail label="Seat Number" value="A12" />
                                   <Detail label="Bus Type" value="Luxury / AC" />
                              </CardContent>
                         </Card>

                         {/* Passenger Details */}
                         <Card>
                              <CardHeader>
                                   <CardTitle className="text-base">Passenger Details</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2 text-sm">
                                   <Detail label="Full Name" value="John Doe" />
                                   <Detail label="Phone" value="+255 712 345 678" />
                                   <Detail label="Gender" value="Male" />
                                   <Detail label="Nationality" value="Tanzanian" />
                              </CardContent>
                         </Card>
                    </div>

                    {/* Footer */}
                    <AlertDialogFooter className="mt-6">
                         <AlertDialogCancel>Review</AlertDialogCancel>
                         <AlertDialogAction onClick={onConfirmPassengerDetails}>
                              Continue to Payment
                         </AlertDialogAction>
                    </AlertDialogFooter>
               </AlertDialogContent>
          </AlertDialog>
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
