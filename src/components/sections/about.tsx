import React from "react"
import { Award, Bus, Clock, MapPin, Shield, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stats = [
  {
    icon: Users,
    value: "1M+",
    label: "Happy Customers",
    description: "Trusted riders across the country",
  },
  {
    icon: Bus,
    value: "500+",
    label: "Modern Fleet",
    description: "Comfort and safety on every trip",
  },
  {
    icon: MapPin,
    value: "48",
    label: "Routes",
    description: "Connecting major towns and cities",
  },
  {
    icon: Award,
    value: "15+",
    label: "Years",
    description: "Built on dependable service",
  },
]

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Routine inspections, qualified drivers, and strict operating standards.",
  },
  {
    icon: Clock,
    title: "Reliable Timing",
    description:
      "Structured schedules and proactive updates keep your plans on track.",
  },
  {
    icon: Users,
    title: "People Focused",
    description:
      "From booking to arrival, every touchpoint is designed for clarity.",
  },
]

const About: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,hsl(var(--primary)/0.14),transparent_40%),radial-gradient(circle_at_90%_20%,hsl(var(--primary)/0.08),transparent_35%)]" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-4 bg-primary/15 text-primary hover:bg-primary/20">
            About Us
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Built for safer, smoother road travel
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            We combine dependable buses, modern booking, and responsive support so
            every trip feels easy from departure to arrival.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.label}
                className="border-border/60 bg-card/90 shadow-sm transition-colors hover:bg-accent"
              >
                <CardContent className="p-5 text-center">
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon size={20} />
                  </div>
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{stat.label}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-4 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon
            return (
              <Card
                key={value.title}
                className="border-border/70 bg-card shadow-sm transition-transform hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default About
