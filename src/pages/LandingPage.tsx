import Header from "@/components/header.tsx";
import Booking from "@/components/booking.tsx";
import Footer from "@/components/sections/footer.tsx";
import BussesAvailable from "@/components/busses-available";

const LandingPage = () => {
    return (
        <>
            <Header />
            <section className="min-h-[85vh] bg-[url('./assets/bg.jpeg')] bg-cover bg-center bg-no-repeat flex items-center">
                <Booking  />
            </section>
            <div className="mt-6">
                <BussesAvailable />
            </div>
            <Footer />
        </>
    )
}

export default LandingPage