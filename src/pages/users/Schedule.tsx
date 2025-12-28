import Booking from "@/components/booking"
import BussesAvailable from "@/components/busses-available"
import useMockData from "@/hooks/use-mock-data"

const Schedule = () => {
    useMockData()
    return (
        <div className="flex flex-col items-center gap-3">
            <Booking />
            <div className="w-full">
                <BussesAvailable />
            </div>
        </div>
    )
}

export default Schedule