import { useState, useEffect } from "react"
import PagesWrapper from "@/components/layout/pages-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/table/table-data"
import { RoutesColumns } from "@/components/table/route-column"
import { useUserRoutes } from "@/hooks/use-user-routes"
import { useNavigate } from "react-router-dom"
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  ArrowRight,
  Bus,
  TrendingUp,
  Activity,
  RefreshCw,
} from "lucide-react"

const Routes = () => {
  const { routes, loading, error, refreshRoutes } = useUserRoutes()
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  // Filter routes based on search query
  const filteredRoutes = routes?.filter(route => {
    if (!searchQuery) return true
    const searchLower = searchQuery.toLowerCase()
    return (
      route.origin?.toLowerCase().includes(searchLower) ||
      route.destination?.toLowerCase().includes(searchLower) ||
      route.distance_km?.toString().includes(searchLower)
    )
  }) || []

  const handleBookRoute = (route: any) => {
    // Navigate to booking page with route pre-selected
    navigate(`/book?origin=${encodeURIComponent(route.origin)}&destination=${encodeURIComponent(route.destination)}`)
  }

  if (loading) {
    return (
      <PagesWrapper>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="rounded-full bg-muted p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-muted-foreground animate-pulse" />
            </div>
            <p className="text-muted-foreground">Loading routes...</p>
          </div>
        </div>
      </PagesWrapper>
    )
  }

  if (error) {
    return (
      <PagesWrapper>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="rounded-full bg-red-100 dark:bg-red-950 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-red-500 mb-2">Error loading routes</p>
            <p className="text-muted-foreground text-sm mb-4">{error}</p>
            <Button onClick={refreshRoutes} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
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
            <h1 className="text-3xl font-bold tracking-tight">Available Routes</h1>
            <p className="text-muted-foreground mt-1">
              Browse and book from our {routes?.length || 0} available routes
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search routes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button onClick={refreshRoutes} variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-950 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Routes</p>
                  <p className="text-2xl font-bold">{routes?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 dark:bg-green-950 p-2 rounded-lg">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Routes</p>
                  <p className="text-2xl font-bold">{routes?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 dark:bg-purple-950 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Popular Routes</p>
                  <p className="text-2xl font-bold">
                    {Math.floor((routes?.length || 0) * 0.3)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 dark:bg-orange-950 p-2 rounded-lg">
                  <Star className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Rating</p>
                  <p className="text-2xl font-bold">4.5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Routes */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Popular Routes</CardTitle>
            <CardDescription>
              Most frequently traveled routes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRoutes.slice(0, 6).map((route, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleBookRoute(route)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 dark:bg-blue-950 p-2 rounded-lg">
                        <MapPin className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{route.origin}</h3>
                        <p className="text-sm text-muted-foreground">to</p>
                        <h3 className="font-semibold">{route.destination}</h3>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {route.distance_km ? `${route.distance_km}km` : 'Distance N/A'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{route.estimated_duration_minutes || 'N/A'} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>Popular</span>
                      </div>
                    </div>
                    <Button size="sm" className="gap-2">
                      Book Now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Routes Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">All Routes</CardTitle>
            <CardDescription>
              Complete list of available routes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredRoutes.length === 0 ? (
              <div className="text-center py-12">
                <div className="rounded-full bg-muted p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No routes found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? "No routes match your search criteria." : "No routes available at the moment."}
                </p>
                {searchQuery && (
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                )}
              </div>
            ) : (
              <DataTable columns={RoutesColumns} data={filteredRoutes} />
            )}
          </CardContent>
        </Card>
      </div>
    </PagesWrapper>
  )
}

export default Routes
