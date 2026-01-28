import {
     DropdownMenu,
     DropdownMenuTrigger,
     DropdownMenuContent,
     DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical, Eye, UserX, UserCheck } from "lucide-react"
import type { UserMeResponse } from "@/store/auth/auth.types"

export const UsersActions = ({
     users,
     onView,
     onToggleActive,
}: {
     users: UserMeResponse
     onView: () => void
     onToggleActive: () => void
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

                    <DropdownMenuItem onClick={onToggleActive}>
                         {users.is_active ? (
                              <>
                                   <UserX className="w-4 h-4 mr-2" />
                                   Disable
                              </>
                         ) : (
                              <>
                                   <UserCheck className="w-4 h-4 mr-2" />
                                   Activate
                              </>
                         )}
                    </DropdownMenuItem>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}
