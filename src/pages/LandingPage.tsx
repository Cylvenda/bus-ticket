import Header from "@/components/header.tsx"
import Booking from "@/components/booking.tsx"
import Footer from "@/components/sections/footer.tsx"
import Faq from "@/components/sections/faq"
import Services from "@/components/sections/services"
import About from "@/components/sections/about"

const LandingPage = () => {
  return (
    <>
      <Header />

      <section className="relative min-h-[85vh] overflow-hidden">
        <div className="absolute inset-0 bg-[url('./assets/bus.webp')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />

        <div className="relative flex min-h-[85vh] items-center">
          <Booking />
        </div>
      </section>

      <About />
      <Services />
      <Faq />
      <Footer />
    </>
  )
}

export default LandingPage
