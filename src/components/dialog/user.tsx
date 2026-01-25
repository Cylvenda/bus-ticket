"use client"

import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
} from "../ui/dialog"
import { Badge } from "../ui/badge"

interface User {
     id: number | string
     name: string
     email: string
     role: "admin" | "user"
     is_active: boolean
     date_joined?: string
}

interface ViewUserDialogProps {
     open: boolean
     user: User | null
     onClose: () => void
}

export function ViewUserDialog({
     open,
     user,
     onClose,
}: ViewUserDialogProps) {
     if (!user) return null

     return (
          <Dialog open= { open } onOpenChange = { onClose } >
               <DialogContent className="max-w-lg" >
                    <DialogHeader>
                    <DialogTitle>User Details </DialogTitle>
                         </DialogHeader>

                         < div className = "space-y-3 text-sm" >
                              <p>
                              <strong>Name: </strong> {user.name}
                                   </p>

                                   < p >
                                   <strong>Email: </strong> {user.email}
                                        </p>

                                        < p className = "flex items-center gap-2" >
                                             <strong>Role: </strong>
                                                  < Badge variant = { user.role === "admin" ? "default" : "secondary" } >
                                                       { user.role }
                                                       </Badge>
                                                       </p>

                                                       < p className = "flex items-center gap-2" >
                                                            <strong>Status: </strong>
                                                                 < Badge
     className = {
          user.is_active
               ? "bg-green-100 text-green-700"
               : "bg-red-100 text-red-700"
     }
          >
          { user.is_active ? "Active" : "Inactive" }
          </Badge>
          </p>

     {
          user.date_joined && (
               <p>
               <strong>Joined: </strong>{" "}
          { new Date(user.date_joined).toLocaleDateString() }
          </p>
                         )
     }
     </div>
          </DialogContent>
          </Dialog>
     )
}
