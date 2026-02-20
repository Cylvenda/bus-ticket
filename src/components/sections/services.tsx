import React from "react"
import {
  Bus,
  CheckCircle2,
  Clock,
  Headphones,
  Luggage,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Bus,
    title: "Intercity Trips",
    description:
      "Daily departures on high-demand routes with consistent seat availability.",
    points: ["Express and regular routes", "Comfort seating", "Live seat view"],
  },
  {
    icon: Clock,
    title: "On-Time Operations",
    description:
      "Tighter dispatch workflows and delay alerts keep your day predictable.",
    points: ["ETA updates", "Departure reminders", "Fewer missed rides"],
  },
  {
    icon: Smartphone,
    title: "Fast Booking",
    description:
      "Search, reserve, and confirm in minutes with mobile-friendly checkout.",
    points: ["Simple flow", "Instant confirmation", "Secure payment"],
  },
  {
    icon: Luggage,
    title: "Parcel Support",
    description:
      "Trusted transport options for small cargo and personal parcels.",
    points: ["Tracked handoff", "Route-wide drop points", "Clear pricing"],
  },
  {
    icon: Headphones,
    title: "24/7 Assistance",
    description:
      "Support team available whenever you need booking or travel help.",
    points: ["Chat and call support", "Issue follow-up", "Trip guidance"],
  },
  {
    icon: Wifi,
    title: "Onboard Comfort",
    description:
      "Thoughtful amenities for long journeys and daily commuters alike.",
    points: ["Wi-Fi enabled buses", "Charging ports", "Clean interiors"],
  },
]

const Services: React.FC = () => {
  return (
    <section className="bg-muted/30 py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-4 bg-primary/15 text-primary hover:bg-primary/20">
            Services
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Practical features, not visual noise
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Every service is designed to reduce friction and make bus travel more
            predictable for passengers and teams.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card
                key={service.title}
                className="h-full border-border/70 bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <Icon size={20} />
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 size={16} className="text-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="mx-auto mt-12 max-w-6xl overflow-hidden border-border/70 bg-card">
          <CardContent className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
            <div>
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Zap size={20} />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Safety and operations baseline</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We maintain scheduled inspections, driver checks, and route-level
                monitoring to keep service quality stable.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Routine maintenance", "Certified drivers", "Vehicle tracking", "Emergency response"].map((item) => (
                <div key={item} className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Services
