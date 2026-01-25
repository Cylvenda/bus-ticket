import {
     DropdownMenu,
     DropdownMenuTrigger,
     DropdownMenuContent,
     DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical, Eye, Edit, Trash } from "lucide-react"
import type { Bus } from "@/store/bus/bus.types"

export const BusesActions = ({ buses }: { buses: Bus }) => {
     return (
          <DropdownMenu>
               <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                         <MoreVertical className="w-4 h-4" />
                    </Button>
               </DropdownMenuTrigger>

               <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => view(buses)}>
                         <Eye className="w-4 h-4 mr-2" />
                         View
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => edit(buses)}>
                         <Edit className="w-4 h-4 mr-2" />
                         Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                         className="text-red-500"
                         onClick={() => remove(buses.id)}
                    >
                         <Trash className="w-4 h-4 mr-2" />
                         Delete
                    </DropdownMenuItem>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}
