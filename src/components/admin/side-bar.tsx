import React from "react"
import {
     Bus,
     Calendar,
     CompassIcon,
     GalleryVerticalEnd,
     Home,
     LogOutIcon,
     RockingChair,
     Route,
     Search,
     Settings,
     UserSquare2Icon,
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
import { Link } from "react-router-dom"
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
     icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

// Sidebar menu items
const items: SidebarItem[] = [
     { title: "Home", url: "/dashboard", icon: Home },
     { title: "Users", url: "/Users", icon: Search },
     { title: "Bus Companies", url: "/bus-companies", icon: CompassIcon },
     { title: "Buses", url: "/buses", icon: Bus },
     { title: "Route Stop", url: "/route-stop", icon: Search },
     { title: "Schedule", url: "/schedule", icon: Calendar },
     { title: "Routes", url: "/Routes", icon: Route },
     { title: "Seat Layout", url: "/Seat-layout", icon: RockingChair },
     { title: "History", url: "/history", icon: Search },
     { title: "Profile", url: "/profile", icon: UserSquare2Icon },
     { title: "Settings", url: "/settings", icon: Settings },
]

// Placeholder avatar (can be replaced with user image)
const placeholderAvatar =
     "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhITExAWFRUXGBcXFRYVFxgaGhgYGBUWGh0YGRUdHSggGBolGxcVITEhJSktLi4uFyAzODMsNygtLisBCgoKDg0OGhAQGislICYrLysvLy0tLS0tLy0tKy4rNS0tLS0tMi8tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAPEA0QMBIgACEQEDEQH/..."

// Main sidebar component
export function AppSidebar() {
     const { user } = useAuthUserStore() // get current user

     return (
          <Sidebar>
               {/* Sidebar Header */}
               <SidebarHeader>
                    <SidebarMenu>
                         <SidebarMenuItem>
                              <SidebarMenuButton size="lg" asChild>
                                   <Link to="/dashboard" className="flex items-center gap-2">
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
               <SidebarContent>
                    <SidebarGroup>
                         <SidebarGroupLabel>Application</SidebarGroupLabel>
                         <SidebarGroupContent>
                              <SidebarMenu>
                                   {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                             <SidebarMenuButton asChild>
                                                  <Link
                                                       to={item.url}
                                                       className="flex items-center gap-2 text-primary hover:text-primary/80"
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
               <SidebarFooter>
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
                                             <span className="text-xs text-muted-foreground truncate">
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
