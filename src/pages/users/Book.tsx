import { useState, useEffect } from "react"
import PagesWrapper from "@/components/layout/pages-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { useBusBookingStore } from "@/store/bus/busBooking.store"
import { useUserRoutes } from "@/hooks/use-user-routes"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Bus,
  Filter,
  RefreshCw,
  AlertCircle,
} from "lucide-react"
import { toast } from "react-toastify"

const Book = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { routes, loading: routesLoading, error: routesError } = useUserRoutes()
  const { 
    selectedSchedule, 
    setSelectedSchedule, 
    schedules, 
    loading: schedulesLoading, 
    fetchSchedules,
    activeBus,
    setActiveBus,
    isSeatsOpen,
    openSeats
  } = useBusBookingStore()

  // Get pre-filled values from URL params
  const origin = searchParams.get('origin') || ""
  const destination = searchParams.get('destination') || ""

  const [searchData, setSearchData] = useState({
    origin,
    destination,
    date: new Date().toISOString().split('T')[0], // Today's date
  })

  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!searchData.origin || !searchData.destination || !searchData.date) {
      toast.error("Please fill in all fields")
      return
    }

    setIsSearching(true)
    setSelectedSchedule({
      origin: searchData.origin,
      destination: searchData.destination,
      date: searchData.date,
    })

    try {
      await fetchSchedules()
    } catch (error) {
      toast.error("Failed to fetch schedules")
    } finally {
      setIsSearching(false)
    }
  }

  const handleSelectSchedule = (schedule: any) => {
    setActiveSchedule(schedule)
    // Find available buses for this schedule
    const availableBuses = schedule.bus_assignments || []
    if (availableBuses.length > 0) {
      openSeats(availableBuses[0])
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5) // Get HH:MM from HH:MM:SS
  }

  const calculateDuration = (departureTime: string, arrivalTime: string) => {
    const departure = new Date(`2000-01-01T${departureTime}`)
    const arrival = new Date(`2000-01-01T${arrivalTime}`)
    const diff = arrival.getTime() - departure.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  if (routesLoading) {
    return (
      <PagesWrapper>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="rounded-full bg-muted p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground animate-pulse" />
            </div>
            <p className="text-muted-foreground">Loading routes...</p>
          </div>
        </div>
      </PagesWrapper>
    )
  }

  if (routesError) {
    return (
      <PagesWrapper>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="rounded-full bg-red-100 dark:bg-red-950 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-red-500 mb-2">Error loading routes</p>
            <p className="text-muted-foreground text-sm">{routesError}</p>
          </div>
        </div>
      </PagesWrapper>
    )
  }

  return (
    <PagesWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Book Your Journey</h1>
            <p className="text-muted-foreground mt-1">
              Search and book your bus tickets
            </p>
          </div>
        </div>

        {/* Search Form */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Search Routes</CardTitle>
            <CardDescription>
              Find available buses for your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin">From</Label>
                <Input
                  id="origin"
                  placeholder="Enter origin city"
                  value={searchData.origin}
                  onChange={(e) => setSearchData(prev => ({ ...prev, origin: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">To</Label>
                <Input
                  id="destination"
                  placeholder="Enter destination city"
                  value={searchData.destination}
                  onChange={(e) => setSearchData(prev => ({ ...prev, destination: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Travel Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData(prev => ({ ...prev, date: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch} 
                  disabled={isSearching}
                  className="w-full gap-2"
                >
                  {isSearching ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {schedules && schedules.length > 0 && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Available Schedules
                <Badge variant="secondary">
                  {formatDate(searchData.date)}
                </Badge>
              </CardTitle>
              <CardDescription>
                {schedules.length} schedules found for {searchData.origin} → {searchData.destination}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleSelectSchedule(schedule)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 dark:bg-blue-950 p-3 rounded-lg">
                          <Bus className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {schedule.route_origin} → {schedule.route_destination}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{formatTime(schedule.departure_time)} - {formatTime(schedule.arrival_time)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{calculateDuration(schedule.departure_time, schedule.arrival_time)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">
                            TZS {parseFloat(schedule.price).toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">per seat</p>
                        </div>
                        <Button className="gap-2">
                          Select Seats
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {schedule.bus_assignments && schedule.bus_assignments.length > 1 && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm text-muted-foreground">
                          {schedule.bus_assignments.length} buses available
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Results */}
        {schedules && schedules.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="py-12 text-center">
              <div className="rounded-full bg-muted p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No schedules found</h3>
              <p className="text-muted-foreground mb-4">
                No buses available for this route on the selected date.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchData({
                  origin: "",
                  destination: "",
                  date: new Date().toISOString().split('T')[0],
                })
                setSelectedSchedule(null)
              }}>
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {schedulesLoading && (
          <Card className="border-0 shadow-lg">
            <CardContent className="py-12 text-center">
              <div className="rounded-full bg-muted p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <RefreshCw className="h-8 w-8 text-muted-foreground animate-spin" />
              </div>
              <p className="text-muted-foreground">Searching for schedules...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </PagesWrapper>
  )
}

export default Book
