import { useState } from "react"
import { useRoutes } from "@/hooks/use-admin/useRoutes"
import { MapPin, X, Navigation } from "lucide-react"
import type { Route } from "@/store/admin/admin.types"

const RoutesManagement = () => {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [viewingRoute, setViewingRoute] = useState<Route | null>(null)

  const { routes, loading, error, totalPages } = useRoutes(page, pageSize)

  if (loading && !routes) return <div className="p-6">Loading routes...</div>
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Routes Management</h1>
        <p className="text-sm text-gray-600 mt-1">
          View all available routes.
        </p>
      </div>

      {/* Routes Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Origin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Distance (km)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration (min)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stops</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {routes?.map((route, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">{route.origin}</td>
                <td className="px-6 py-4 text-sm font-medium">{route.destination}</td>
                <td className="px-6 py-4 text-sm">{route.distance_km}</td>
                <td className="px-6 py-4 text-sm">{route.estimated_duration_minutes}</td>
                <td className="px-6 py-4 text-sm">
                  {route?.stops.length > 0 ? (
                    <button
                      onClick={() => setViewingRoute(route)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline"
                    >
                      <MapPin size={16} />
                      View {route.stops.length} stop{route.stops.length !== 1 ? 's' : ''}
                    </button>
                  ) : (
                    <span className="text-gray-400 text-xs">No stops</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {routes && routes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No routes found.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}

      {/* View Stops Modal */}
      {viewingRoute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-start mb-4 pb-4 border-b">
              <div>
                <h2 className="text-xl font-bold mb-2">
                  {viewingRoute.origin} → {viewingRoute.destination}
                </h2>
                <div className="flex gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Navigation size={14} />
                    <span>{viewingRoute.distance_km} km</span>
                  </div>
                  <div>
                    <span>~{viewingRoute.estimated_duration_minutes} minutes</span>
                  </div>
                  <div>
                    <span>{viewingRoute.stops.length} stop{viewingRoute.stops.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setViewingRoute(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Route Timeline */}
            <div className="space-y-2">
              {/* Origin */}
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow"></div>
                  <div className="w-0.5 h-8 bg-gray-300"></div>
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="font-semibold text-green-700">{viewingRoute.origin}</div>
                  <div className="text-xs text-gray-500">Origin - Start</div>
                </div>
              </div>

              {/* Stops */}
              {viewingRoute.stops
                .sort((a, b) => a.stop_order - b.stop_order)
                .map((stop, index) => (
                  <div key={stop.id} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow"></div>
                      {index < viewingRoute.stops.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-300"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-blue-600" />
                            <span className="font-medium">{stop.stop_name}</span>
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            Stop #{stop.stop_order}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Arrival:</span>
                            <span className="ml-1">{stop.arrival_offset_min} min</span>
                          </div>
                          <div>
                            <span className="font-medium">Departure:</span>
                            <span className="ml-1">{stop.departure_offset_min} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {/* Show connector line before destination */}
              {viewingRoute.stops.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-8 bg-gray-300"></div>
                  </div>
                </div>
              )}

              {/* Destination */}
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow"></div>
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="font-semibold text-red-700">{viewingRoute.destination}</div>
                  <div className="text-xs text-gray-500">Destination - End</div>
                </div>
              </div>

              {/* No stops message */}
              {viewingRoute.stops.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-gray-500">
                    This is a direct route with no intermediate stops.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t flex justify-end">
              <button
                onClick={() => setViewingRoute(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoutesManagement