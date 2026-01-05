import Booking from "@/components/booking"
import BussesAvailable from "@/components/busses-available"

const Schedule = () => {
    
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