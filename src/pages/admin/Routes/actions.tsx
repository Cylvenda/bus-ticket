import {
     DropdownMenu,
     DropdownMenuTrigger,
     DropdownMenuContent,
     DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical, Eye, Edit, Trash, MapPin, Settings } from "lucide-react"
import type { Route } from "@/store/admin/admin.types"

export const Actions = ({
     route,
     onView,
     onEdit,
     onDelete,
     onViewStops,
     onManageStops,
}: {
     route: Route
     onView: () => void
     onEdit: () => void
     onDelete: () => void
     onViewStops: () => void
     onManageStops: () => void
}) => {
     return (
          <DropdownMenu>
               <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                         <MoreVertical className="w-4 h-4" />
                    </Button>
               </DropdownMenuTrigger>

               <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onView}>
                         <Eye className="w-4 h-4 mr-2" />
                         View
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={onEdit}>
                         <Edit className="w-4 h-4 mr-2" />
                         Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={onManageStops}>
                         <Settings className="w-4 h-4 mr-2" />
                         Manage Stops
                    </DropdownMenuItem>

                    {route.stops && route.stops.length > 0 && (
                         <DropdownMenuItem onClick={onViewStops}>
                              <MapPin className="w-4 h-4 mr-2" />
                              View {route.stops.length} Stop{route.stops.length !== 1 ? 's' : ''}
                         </DropdownMenuItem>
                    )}

                    <DropdownMenuItem
                         className="text-red-500"
                         onClick={onDelete}
                    >
                         <Trash className="w-4 h-4 mr-2" />
                         Delete
                    </DropdownMenuItem>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}
