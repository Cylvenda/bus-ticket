import {
     DropdownMenu,
     DropdownMenuTrigger,
     DropdownMenuContent,
     DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical, Eye, Edit, Trash } from "lucide-react"
import type { BusCompany } from "@/store/admin/admin.types"

export const Actions = ({ busCompany }: { busCompany: BusCompany }) => {
     return (
          <DropdownMenu>
               <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                         <MoreVertical className="w-4 h-4" />
                    </Button>
               </DropdownMenuTrigger>

               <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => view(busCompany)}>
                         <Eye className="w-4 h-4 mr-2" />
                         View
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => edit(busCompany)}>
                         <Edit className="w-4 h-4 mr-2" />
                         Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                         className="text-red-500"
                         onClick={() => remove(busCompany.id)}
                    >
                         <Trash className="w-4 h-4 mr-2" />
                         Delete
                    </DropdownMenuItem>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}
