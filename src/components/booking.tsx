import { useState } from "react"
import { ArrowLeftRight, Route } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { SearchableSelect } from "@/components/searchable-select.tsx"
import { Button } from "@/components/ui/button"
import { SetCalendar } from "@/components/calender"
import { Label } from "@/components/ui/label.tsx"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "./ui/spinner"

import { useBus } from "@/hooks/use-bus-booking"
import { useBusBookingStore } from "@/store/bus/busBooking.store"

type RouteOption = {
  value: string
  label: string
}

const Booking = () => {
  const navigate = useNavigate()

  const { setSelectedSchedule, selectedSchedule, fetchSchedules, loading, reset } =
    useBusBookingStore()
  const { routes } = useBus()

  const routesFrom: RouteOption[] = Array.from(new Set(routes?.map((r) => r.origin))).map(
    (city) => ({
      value: city,
      label: city,
    }),
  )

  const routesTo: RouteOption[] = Array.from(
    new Set(routes?.map((r) => r.destination)),
  ).map((city) => ({
    value: city,
    label: city,
  }))

  const [from, setFrom] = useState(selectedSchedule?.origin ?? "")
  const [to, setTo] = useState(selectedSchedule?.destination ?? "")
  const [date, setDate] = useState(selectedSchedule?.date ?? "")

  const handleSwap = () => {
    setFrom(to)
    setTo(from)
  }

  const handleSearchBus = async () => {
    if (!from || !to || !date) return

    reset()

    setSelectedSchedule({
      origin: from,
      destination: to,
      date,
    })

    await fetchSchedules()
    navigate("/schedule")
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
      <Card className="border-border/70 bg-card/90 shadow-2xl backdrop-blur-sm">
        <CardHeader className="space-y-3 pb-2">
          <Badge className="w-fit bg-primary/15 text-primary hover:bg-primary/20">
            Fast Booking
          </Badge>
          <CardTitle className="text-2xl font-semibold text-foreground md:text-3xl">
            Plan Your Next Route
          </CardTitle>
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
            Select departure, destination, and travel date to view available buses.
          </p>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="rounded-xl border border-border bg-muted/35 p-4 md:p-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr_auto] md:items-end">
              <SearchableSelect
                label="From"
                placeholder="Select departure"
                value={from}
                onChange={setFrom}
                disabledValue={to}
                routes={routesFrom}
              />

              <div className="flex items-center justify-center md:pb-0.5">
                <div className="flex flex-col items-center gap-2">
                  <Label className="invisible hidden md:block">Swap</Label>
                  <Button
                    aria-label="Swap locations"
                    variant="outline"
                    size="icon"
                    className="border-border bg-background hover:bg-accent"
                    onClick={handleSwap}
                    disabled={!from || !to}
                  >
                    <ArrowLeftRight className="text-primary" />
                  </Button>
                </div>
              </div>

              <SearchableSelect
                label="To"
                placeholder="Select destination"
                value={to}
                onChange={setTo}
                disabledValue={from}
                routes={routesTo}
              />

              <div className="md:pb-0.5">
                <SetCalendar date={date} setDate={setDate} />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Route size={16} className="text-primary" />
              {from && to ? `${from} to ${to}` : "Choose a route to continue"}
            </div>

            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 md:w-56"
              onClick={handleSearchBus}
              disabled={!from || !to || !date || loading}
            >
              {loading ? <Spinner className="size-5 text-primary-foreground" /> : "Search Buses"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Booking
