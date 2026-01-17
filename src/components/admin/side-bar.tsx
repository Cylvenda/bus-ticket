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
import { Link, useLocation } from "react-router-dom"
import { companyName } from "@/lib/commonName"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useAuthUserStore } from "@/store/auth/userAuth.store"

type SidebarItem = {
     title: string
     url: string
     icon: LucideIcon
}


// Placeholder avatar (can be replaced with user image)
const placeholderAvatar =
     "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhITExAWFRUXGBcXFRYVFxgaGhgYGBUWGh0YGRUdHSggGBolGxcVITEhJSktLi4uFyAzODMsNygtLisBCgoKDg0OGhAQGislICYrLysvLy0tLS0tLy0tKy4rNS0tLS0tMi8tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAPEA0QMBIgACEQEDEQH/..."



export function AdminAppSidebar() {

     const { user } = useAuthUserStore();

     const location = useLocation()
     const active = location.pathname

     const items: SidebarItem[] = [
          { title: "Home", url: "/admin/dashboard", icon: Home },
          { title: "Users", url: "/admin/Users", icon: UsersIcon },
          { title: "Bookings", url: "/admin/bookings", icon: BookDownIcon },
          { title: "Bus Companies", url: "/admin/bus-companies", icon: CompassIcon },
          { title: "Buses", url: "/admin/buses", icon: Bus },
          { title: "Route Stop", url: "/admin/route-stop", icon: Search },
          { title: "Schedule", url: "/admin/schedule", icon: Calendar },
          { title: "Routes", url: "/admin/Routes", icon: Route },
          { title: "Seat Layout", url: "/admin/Seat-layout", icon: RockingChair },
          { title: "Profile", url: "/admin/profile", icon: UserSquare2Icon },
          { title: "Settings", url: "/admin/settings", icon: Settings },
     ]

     return (
          <Sidebar className="bg-primary border-r border-secondary ">
               {/* Sidebar Header */}
               <SidebarHeader className="bg-primary border-b border-accent">
                    <SidebarMenu>
                         <SidebarMenuItem>
                              <SidebarMenuButton size="lg" asChild>
                                   <Link to="/admin/dashboard" className="flex items-center gap-2">
                                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square w-8 items-center justify-center rounded-lg">
                                             <GalleryVerticalEnd className="w-4 h-4" />
                                        </div>
                                        <span className="font-medium">{companyName}</span>
                                   </Link>
                              </SidebarMenuButton>
                         </SidebarMenuItem>
                    </SidebarMenu>
               </SidebarHeader>

               {/* Sidebar Content */}
               <SidebarContent className="bg-primary">
                    <SidebarGroup>
                         <SidebarGroupLabel>Application</SidebarGroupLabel>
                         <SidebarGroupContent>
                              <SidebarMenu>
                                   {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                             <SidebarMenuButton asChild>
                                                  <Link
                                                       to={item.url}
                                                       className={`flex items-center gap-2 hover:text-accent ${active === item.url ? `bg-primary-foreground text-white dark:text-black ` : ``}`}
                                                  >
                                                       <item.icon className="w-5 h-5" />
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
               <SidebarFooter className="bg-primary border-t border-accent">
                    <SidebarMenu>
                         <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                   <SidebarMenuButton
                                        size="lg"
                                        className="flex items-center gap-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                   >
                                        <Avatar className="h-8 w-8 rounded-lg grayscale">
                                             <AvatarImage src={placeholderAvatar} alt="user" />
                                             <AvatarFallback className="rounded-lg">
                                                  {user?.firstName?.[0] ?? "U"}
                                                  {user?.lastName?.[0] ?? ""}
                                             </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col text-left leading-tight truncate">
                                             <span className="font-medium truncate">
                                                  {user?.firstName || "User"} {user?.lastName || ""}
                                             </span>
                                             <span className="text-xs text-muted truncate hover:text-primary">
                                                  {user?.email || "user@example.com"}
                                             </span>
                                        </div>
                                   </SidebarMenuButton>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent className="w-40">
                                   <DropdownMenuItem>
                                        <LogOutIcon className="w-4 h-4 mr-2" /> Logout
                                   </DropdownMenuItem>
                              </DropdownMenuContent>
                         </DropdownMenu>
                    </SidebarMenu>
               </SidebarFooter>
          </Sidebar>
     )
}
