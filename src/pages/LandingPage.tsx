import Header from "@/components/header.tsx";
import Booking from "@/components/booking.tsx";
import Footer from "@/components/sections/footer.tsx";
import Faq from "@/components/sections/faq";
import Services from "@/components/sections/services";

const LandingPage = () => {

    return (
        <>
            <Header />
            <section className="min-h-[85vh] bg-[url('./assets/bus.webp')] bg-cover bg-center bg-no-repeat flex items-center">
                <Booking />
            </section>
            <Services />
            <Faq />
            <Footer />
        </>
    )
}

export default LandingPage