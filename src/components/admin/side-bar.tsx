import {
     Bus,
     Calendar,
     CompassIcon,
     GalleryVerticalEnd,
     Home,
     LogOutIcon,
     RockingChair,
     Search,
     Settings,
     UserSquare2Icon,
     Route,
     UsersIcon,
     BookDownIcon,
     type LucideIcon,
} from "lucide-react"

import {
     Sidebar,
     SidebarContent,
     SidebarFooter,
     SidebarGroup,
     SidebarGroupContent,
     SidebarGroupLabel,
     SidebarHeader,
     SidebarMenu,
     SidebarMenuButton,
     SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { companyName } from "@/lib/commonName"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useAuthUserStore } from "@/store/auth/userAuth.store"
import { authUserService } from "@/api/services/auth.service"
import { toast } from "react-toastify"

type SidebarItem = {
     title: string
     url: string
     icon: LucideIcon
}

// Placeholder avatar (can be replaced with user image)
const placeholderAvatar =
     "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhITExAWFRUXGBcXFRYVFxgaGhgYGBUWGh0YGRUdHSggGBolGxcVITEhJSktLi4uFyAzODMsNygtLisBCgoKDg0OGhAQGislICYrLysvLy0tLS0tLy0tKy4rNS0tLS0tMi8tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAPEA0QMBIgACEQEDEQH/..."

export function AdminAppSidebar() {
     const { user } = useAuthUserStore()
     const location = useLocation()
     const active = location.pathname

     const items: SidebarItem[] = [
          { title: "Home", url: "/admin/dashboard", icon: Home },
          { title: "Users", url: "/admin/Users", icon: UsersIcon },
          { title: "Bookings", url: "/admin/bookings", icon: BookDownIcon },
          { title: "Bus Companies", url: "/admin/bus-companies", icon: CompassIcon },
          { title: "Buses", url: "/admin/buses", icon: Bus },
          { title: "Schedule", url: "/admin/schedule", icon: Calendar },
          { title: "Routes", url: "/admin/Routes", icon: Route },
          { title: "Seat Layout", url: "/admin/Seat-layout", icon: RockingChair },
          { title: "Profile", url: "/admin/profile", icon: UserSquare2Icon },
          { title: "Settings", url: "/admin/settings", icon: Settings },
     ]

     const navigate = useNavigate()
     const handleLogout = async () => {
          try {
               await authUserService.logOut()

               navigate("/")
          } catch {
               toast.error("Logout failed")
          }
     }


     return (
          <Sidebar>
               {/* Sidebar Header */}
               <SidebarHeader>
                    <SidebarMenu>
                         <SidebarMenuItem>
                              <SidebarMenuButton size="lg" asChild>
                                   <Link to="/admin/dashboard">
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                             <GalleryVerticalEnd className="size-4" />
                                        </div>
                                        <div className="flex flex-col gap-0.5 leading-none">
                                             <span className="font-semibold">{companyName}</span>
                                        </div>
                                   </Link>
                              </SidebarMenuButton>
                         </SidebarMenuItem>
                    </SidebarMenu>
               </SidebarHeader>

               {/* Sidebar Content */}
               <SidebarContent>
                    <SidebarGroup>
                         <SidebarGroupLabel>Application</SidebarGroupLabel>
                         <SidebarGroupContent>
                              <SidebarMenu>
                                   {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                             <SidebarMenuButton asChild isActive={active === item.url}>
                                                  <Link to={item.url}>
                                                       <item.icon />
                                                       <span>{item.title}</span>
                                                  </Link>
                                             </SidebarMenuButton>
                                        </SidebarMenuItem>
                                   ))}
                              </SidebarMenu>
                         </SidebarGroupContent>
                    </SidebarGroup>
               </SidebarContent>

               {/* Sidebar Footer */}
               <SidebarFooter>
                    <SidebarMenu>
                         <SidebarMenuItem>
                              <DropdownMenu>
                                   <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton className="w-full">
                                             <Avatar className="h-8 w-8 rounded-lg">
                                                  <AvatarImage src={placeholderAvatar} alt={user?.firstName || "User"} />
                                                  <AvatarFallback className="rounded-lg">
                                                       {user?.firstName?.[0] ?? "U"}
                                                       {user?.lastName?.[0] ?? ""}
                                                  </AvatarFallback>
                                             </Avatar>
                                             <div className="grid flex-1 text-left text-sm leading-tight">
                                                  <span className="truncate font-semibold">
                                                       {user?.firstName || "User"} {user?.lastName || ""}
                                                  </span>
                                                  <span className="truncate text-xs">
                                                       {user?.email || "user@example.com"}
                                                  </span>
                                             </div>
                                        </SidebarMenuButton>
                                   </DropdownMenuTrigger>
                                   <DropdownMenuContent
                                        side="top"
                                        className="w-[--radix-popper-anchor-width]"
                                   >
                                        <DropdownMenuItem onClick={handleLogout}>
                                             <LogOutIcon className="mr-2 h-4 w-4" />
                                             Logout
                                        </DropdownMenuItem>
                                   </DropdownMenuContent>
                              </DropdownMenu>
                         </SidebarMenuItem>
                    </SidebarMenu>
               </SidebarFooter>
          </Sidebar>
     )
}