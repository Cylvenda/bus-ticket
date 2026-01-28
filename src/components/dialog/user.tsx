"use client"

import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
} from "../ui/dialog"
import { Badge } from "../ui/badge"
import type { UserMeResponse } from "@/store/auth/auth.types"

interface ViewUserDialogProps {
     open: boolean
     user: UserMeResponse | null
     onClose: () => void
}

export function ViewUserDialog({
     open,
     user,
     onClose,
}: ViewUserDialogProps) {
     if (!user) return null

     const fullName = `${user.first_name} ${user.last_name}`
     const role = user.is_admin ? "admin" : user.is_staff ? "staff" : "user"

     return (
          <Dialog open={open} onOpenChange={onClose}>
               <DialogContent className="max-w-lg">
                    <DialogHeader>
                         <DialogTitle>User Details</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-3 text-sm">
                         <p>
                              <strong>Name: </strong>
                              {fullName}
                         </p>

                         <p>
                              <strong>Email: </strong>
                              {user.email}
                         </p>

                         <p>
                              <strong>Phone: </strong>
                              {user.phone}
                         </p>

                         <p className="flex items-center gap-2">
                              <strong>Role: </strong>
                              <Badge variant={role === "admin" ? "default" : "secondary"}>
                                   {role}
                              </Badge>
                         </p>

                         <p className="flex items-center gap-2">
                              <strong>Status: </strong>
                              <Badge
                                   className={
                                        user.is_active
                                             ? "bg-green-100 text-green-700"
                                             : "bg-red-100 text-red-700"
                                   }
                              >
                                   {user.is_active ? "Active" : "Inactive"}
                              </Badge>
                         </p>
                    </div>
               </DialogContent>
          </Dialog>
     )
}
