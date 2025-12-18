import Footer from "@/components/sections/footer"
import Header from "@/components/header"
import Booking from "@/components/booking"
import BussesAvailable from "@/components/busses-available"

const Schedule = () => {

    return (
        <>
            <Header />

            <div className="m-0 md:m-10">
                <Booking />
            </div>
            <BussesAvailable />
            <Footer />
        </>
    )
}

export default Schedule
