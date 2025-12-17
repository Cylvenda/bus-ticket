import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bus, Clock, MapPin } from "lucide-react"

type BusCardProps = {
    company: string
    from: string
    to: string
    departureTime: string
    arrivalTime: string
    price: number
    seatsLeft: number
}

const BusCard = ({
                     company,
                     from,
                     to,
                     departureTime,
                     arrivalTime,
                     price,
                     seatsLeft,
                 }: BusCardProps) => {
    return (
        <Card className="hover:shadow-md transition">
            <CardContent className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* LEFT */}
                <div className="flex items-center gap-4">
                    <Bus className="h-10 w-10 text-primary" />
                    <div>
                        <h3 className="font-semibold text-lg">{company}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {from} → {to}
                        </p>
                    </div>
                </div>

                {/* MIDDLE */}
                <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{departureTime}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{arrivalTime}</span>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="font-semibold text-lg">
                            TZS {price.toLocaleString()}
                        </p>
                        <p className="text-xs ">
                            {seatsLeft} seats left
                        </p>
                    </div>

                    <Button disabled={seatsLeft === 0}>
                        {seatsLeft === 0 ? "Full" : "Select"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default BusCard
