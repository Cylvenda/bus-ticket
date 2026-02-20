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
     Activity,
     TrendingUp,
     Shield,
     CreditCard,
     MapPin,
     Clock,
     Star,
     ChevronRight,
     BarChart3,
     Building,
     Ticket,
     Bell,
     HelpCircle,
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
     DropdownMenuSeparator,
     DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useAuthUserStore } from "@/store/auth/userAuth.store"
import { authUserService } from "@/api/services/auth.service"
import { toast } from "react-toastify"
import { Badge } from "../ui/badge"

type SidebarItem = {
     title: string
     url: string
     icon: LucideIcon
     badge?: string
     description?: string
}

// Enhanced admin sidebar items with better organization
const dashboardItems: SidebarItem[] = [
     { title: "Dashboard", url: "/admin/dashboard", icon: Home, description: "Overview & Stats" },
     { title: "Analytics", url: "/admin/analytics", icon: BarChart3, description: "Reports & Insights" },
]

const managementItems: SidebarItem[] = [
     { title: "Users", url: "/admin/Users", icon: UsersIcon, description: "User Management" },
     { title: "Bookings", url: "/admin/bookings", icon: BookDownIcon, description: "Booking Management" },
     { title: "Companies", url: "/admin/bus-companies", icon: Building, description: "Bus Companies" },
     { title: "Buses", url: "/admin/buses", icon: Bus, description: "Bus Fleet" },
]

const operationsItems: SidebarItem[] = [
     { title: "Schedule", url: "/admin/schedule", icon: Calendar, description: "Trip Schedules" },
     { title: "Routes", url: "/admin/Routes", icon: Route, description: "Route Management" },
     { title: "Seat Layouts", url: "/admin/Seat-layout", icon: RockingChair, description: "Seat Configurations" },
]

const systemItems: SidebarItem[] = [
     { title: "Profile", url: "/admin/profile", icon: UserSquare2Icon, description: "Admin Profile" },
     { title: "Settings", url: "/admin/settings", icon: Settings, description: "System Settings" },
]

// Placeholder avatar (can be replaced with user image)
const placeholderAvatar =
     "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhITExAWFRUXGBcXFRYVFxgaGhgYGBUWGh0YGRUdHSggGBolGxcVITEhJSktLi4uFyAzODMsNygtLisBCgoKDg0OGhAQGislICYrLysvLy0tLS0tLy0tKy4rNS0tLS0tMi8tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAPEA0QMBIgACEQEDEQH/..."

export function AdminAppSidebar() {
     const { user } = useAuthUserStore()
     const location = useLocation()
     const active = location.pathname
     const navigate = useNavigate()

     const handleLogout = async () => {
          try {
               await authUserService.logOut()
               navigate("/")
          } catch {
               toast.error("Logout failed")
          }
     }

     const getUserInitials = () => {
          if (user?.firstName && user?.lastName) {
               return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
          }
          return user?.username?.[0]?.toUpperCase() || "A"
     }

     const isActive = (url: string) => {
          if (url === "/admin/dashboard" && active === "/admin/dashboard") return true
          return active.startsWith(url) && url !== "/admin/dashboard"
     }


     return (
          <Sidebar variant="inset">
               {/* Enhanced Admin Sidebar Header */}
               <SidebarHeader className="bg-primary">
                    <SidebarMenu>
                         <SidebarMenuItem>
                              <SidebarMenuButton size="lg" asChild className="hover:bg-white/10">
                                   <Link to="/admin/dashboard" className="flex items-center gap-3">
                                        <div className="flex aspect-square w-8 items-center justify-center rounded-lg bg-white text-purple-600 shadow-lg">
                                             <Shield className="size-4" />
                                        </div>
                                        <div className="flex flex-col gap-0.5 leading-none">
                                             <span className="font-semibold text-white">{companyName}</span>
                                             <span className="text-xs text-white/80">Admin Panel</span>
                                        </div>
                                   </Link>
                              </SidebarMenuButton>
                         </SidebarMenuItem>
                    </SidebarMenu>
               </SidebarHeader>

               {/* Enhanced Admin Sidebar Content */}
               <SidebarContent className="bg-background">
                    {/* Dashboard Section */}
                    <SidebarGroup className="pb-4">
                         <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground flex items-center gap-2 mb-3 pb-2 border-b border-border">
                              <Activity className="w-3 h-3" />
                              Dashboard
                         </SidebarGroupLabel>
                         <SidebarGroupContent>
                              <SidebarMenu>
                                   {dashboardItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                             <SidebarMenuButton asChild isActive={isActive(item.url)}>
                                                  <Link to={item.url} className="flex items-center gap-3 group">
                                                       <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${isActive(item.url)
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'bg-muted group-hover:bg-muted/80'
                                                            }`}>
                                                            <item.icon className="w-4 h-4" />
                                                       </div>
                                                       <div className="flex flex-col">
                                                            <span className="font-medium">{item.title}</span>
                                                            {item.description && (
                                                                 <span className="text-xs text-muted-foreground">{item.description}</span>
                                                            )}
                                                       </div>
                                                  </Link>
                                             </SidebarMenuButton>
                                        </SidebarMenuItem>
                                   ))}
                              </SidebarMenu>
                         </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Management Section */}
                    <SidebarGroup className="pb-4 mt-2">
                         <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground flex items-center gap-2 mb-3 pb-2 border-b border-border">
                              <UsersIcon className="w-3 h-3" />
                              Management
                         </SidebarGroupLabel>
                         <SidebarGroupContent>
                              <SidebarMenu>
                                   {managementItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                             <SidebarMenuButton asChild isActive={isActive(item.url)}>
                                                  <Link to={item.url} className="flex items-center gap-3 group">
                                                       <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${isActive(item.url)
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'bg-muted group-hover:bg-muted/80'
                                                            }`}>
                                                            <item.icon className="w-4 h-4" />
                                                       </div>
                                                       <div className="flex flex-col flex-1 py-5">
                                                            <span className="font-medium">{item.title}</span>
                                                            {item.description && (
                                                                 <span className="text-xs text-muted-foreground">{item.description}</span>
                                                            )}
                                                       </div>
                                                  </Link>
                                             </SidebarMenuButton>
                                        </SidebarMenuItem>
                                   ))}
                              </SidebarMenu>
                         </SidebarGroupContent>
                    </SidebarGroup>

                    {/* Operations Section */}
                    <SidebarGroup className="pb-4 mt-2">
                         <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground flex items-center gap-2 mb-3 pb-2 border-b border-border">
                              <Calendar className="w-3 h-3" />
                              Operations
                         </SidebarGroupLabel>
                         <SidebarGroupContent>
                              <SidebarMenu>
                                   {operationsItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                             <SidebarMenuButton asChild isActive={isActive(item.url)}>
                                                  <Link to={item.url} className="flex items-center gap-3 group">
                                                       <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${isActive(item.url)
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'bg-muted group-hover:bg-muted/80'
                                                            }`}>
                                                            <item.icon className="w-4 h-4" />
                                                       </div>
                                                       <div className="flex flex-col">
                                                            <span className="font-medium">{item.title}</span>
                                                            {item.description && (
                                                                 <span className="text-xs text-muted-foreground">{item.description}</span>
                                                            )}
                                                       </div>
                                                  </Link>
                                             </SidebarMenuButton>
                                        </SidebarMenuItem>
                                   ))}
                              </SidebarMenu>
                         </SidebarGroupContent>
                    </SidebarGroup>

                    {/* System Section */}
                    <SidebarGroup className="pb-4 mt-2">
                         <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground flex items-center gap-2 mb-3 pb-2 border-b border-border">
                              <Settings className="w-3 h-3" />
                              System
                         </SidebarGroupLabel>
                         <SidebarGroupContent>
                              <SidebarMenu>
                                   {systemItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                             <SidebarMenuButton asChild isActive={isActive(item.url)}>
                                                  <Link to={item.url} className="flex items-center gap-3 group">
                                                       <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${isActive(item.url)
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'bg-muted group-hover:bg-muted/80'
                                                            }`}>
                                                            <item.icon className="w-4 h-4" />
                                                       </div>
                                                       <div className="flex flex-col">
                                                            <span className="font-medium">{item.title}</span>
                                                            {item.description && (
                                                                 <span className="text-xs text-muted-foreground">{item.description}</span>
                                                            )}
                                                       </div>
                                                  </Link>
                                             </SidebarMenuButton>
                                        </SidebarMenuItem>
                                   ))}
                              </SidebarMenu>
                         </SidebarGroupContent>
                    </SidebarGroup>
               </SidebarContent>

               {/* Enhanced Admin Sidebar Footer */}
               <SidebarFooter className="bg-muted/30">
                    <SidebarMenu>
                         <SidebarMenuItem>
                              <DropdownMenu>
                                   <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton
                                             size="lg"
                                             className="h-auto min-h-14 w-full justify-start data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50"
                                        >
                                             <Avatar className="h-8 w-8 rounded-lg border-2 border-background shadow-sm">
                                                  <AvatarImage src={user?.avatar} alt={user?.firstName || "Admin"} />
                                                  <AvatarFallback className="bg-primary text-white font-semibold">
                                                       {getUserInitials()}
                                                  </AvatarFallback>
                                             </Avatar>
                                             <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                                                  <span className="truncate font-semibold">
                                                       {user?.firstName || "Admin"} {user?.lastName || ""}
                                                  </span>
                                                  <span className="truncate text-xs text-muted-foreground">
                                                       {user?.email || "admin@example.com"}
                                                  </span>
                                             </div>
                                             <ChevronRight className="ml-auto h-4 w-4" />
                                        </SidebarMenuButton>
                                   </DropdownMenuTrigger>
                                   <DropdownMenuContent
                                        side="top"
                                        className="w-[--radix-popper-anchor-width]"
                                   >
                                        <DropdownMenuItem className="cursor-pointer">
                                             <UserSquare2Icon className="mr-2 h-4 w-4" />
                                             View Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">
                                             <Settings className="mr-2 h-4 w-4" />
                                             System Settings
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={handleLogout}>
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
