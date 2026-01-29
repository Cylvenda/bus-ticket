import React from "react"
import {
    Calendar,
    GalleryVerticalEnd,
    Home,
    Inbox,
    LogOutIcon,
    Search,
    Settings,
    UserSquare2Icon,
    Ticket,
    MapPin,
    CreditCard,
    Bell,
    HelpCircle,
    Shield,
    TrendingUp,
    Bus,
    Clock,
    Star,
    ChevronRight,
    Activity,
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
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { companyName } from "@/lib/commonName"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useAuthUserStore } from "@/store/auth/userAuth.store"
import { Badge } from "./ui/badge"
import { authUserService } from "@/api/services/auth.service"
import { toast } from "react-toastify"

type SidebarItem = {
    title: string
    url: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    badge?: string
    submenu?: SidebarItem[]
}

// Enhanced sidebar menu items with better organization
const mainItems: SidebarItem[] = [
    { title: "Dashboard", url: "/dashboard", icon: Home},
    { title: "Book Ticket", url: "/book", icon: Ticket },
    { title: "My Trips", url: "/schedule", icon: Calendar },
    { title: "Routes", url: "/routes", icon: MapPin },
]

const accountItems: SidebarItem[] = [
    { title: "Booking History", url: "/history", icon: Clock },
    { title: "Inbox", url: "/inbox", icon: Inbox },
    { title: "Profile", url: "/profile", icon: UserSquare2Icon },
    { title: "Payment Methods", url: "/payment", icon: CreditCard },
]

const supportItems: SidebarItem[] = [
    { title: "Help Center", url: "/help", icon: HelpCircle },
    { title: "Settings", url: "/settings", icon: Settings },
]

// Placeholder avatar (can be replaced with user image)
const placeholderAvatar =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhITExAWFRUXGBcXFRYVFxgaGhgYGBUWGh0YGRUdHSggGBolGxcVITEhJSktLi4uFyAzODMsNygtLisBCgoKDg0OGhAQGislICYrLysvLy0tLS0tLy0tKy4rNS0tLS0tMi8tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAPEA0QMBIgACEQEDEQH/..."

// Main sidebar component
export function AppSidebar() {
    const { user } = useAuthUserStore()
    const location = useLocation()
    const activePath = location.pathname

    const handleLogout = async () => {
        try {
            await authUserService.logOut()
            window.location.href = "/"
        } catch {
            toast.error("Logout failed")
        }
    }

    const getUserInitials = () => {
        if (user?.firstName && user?.lastName) {
            return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
        }
        return user?.username?.[0]?.toUpperCase() || "U"
    }

    const isActive = (url: string) => {
        if (url === "/dashboard" && activePath === "/dashboard") return true
        return activePath.startsWith(url) && url !== "/dashboard"
    }

    return (
        <Sidebar variant="inset">
            {/* Enhanced Sidebar Header */}
            <SidebarHeader className="bg-primary">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-white/10">
                            <Link to="/dashboard" className="flex items-center gap-3">
                                <div className="flex aspect-square w-8 items-center justify-center rounded-lg bg-white text-blue-600 shadow-lg">
                                    <Bus className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold text-white">{companyName}</span>
                                    <span className="text-xs text-white/80">Travel Management</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Enhanced Sidebar Content */}
            <SidebarContent className="bg-background">
                {/* Main Navigation */}
                <SidebarGroup className="pb-4">
                    <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground flex items-center gap-2 mb-3 pb-2 border-b border-border">
                        <Home className="w-3 h-3" />
                        Main
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                                        <Link
                                            to={item.url}
                                            className="flex items-center gap-3 group"
                                        >
                                            <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${isActive(item.url)
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted group-hover:bg-muted/80'
                                                }`}>
                                                <item.icon className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{item.title}</span>
                                                {item.badge && (
                                                    <Badge variant="secondary" className="w-fit text-xs">
                                                        {item.badge}
                                                    </Badge>
                                                )}
                                            </div>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Account Management */}
                <SidebarGroup className="pb-4 mt-2">
                    <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground flex items-center gap-2 mb-3 pb-2 border-b border-border">
                        <UserSquare2Icon className="w-3 h-3" />
                        Account
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {accountItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                                        <Link
                                            to={item.url}
                                            className="flex items-center gap-3 group"
                                        >
                                            <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${isActive(item.url)
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted group-hover:bg-muted/80'
                                                }`}>
                                                <item.icon className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{item.title}</span>
                                                {item.badge && (
                                                    <Badge variant="destructive" className="w-fit text-xs animate-pulse">
                                                        {item.badge}
                                                    </Badge>
                                                )}
                                            </div>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Support */}
                <SidebarGroup className="pb-4 mt-2">
                    <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground flex items-center gap-2 mb-3 pb-2 border-b border-border">
                        <HelpCircle className="w-3 h-3" />
                        Support
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {supportItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                                        <Link
                                            to={item.url}
                                            className="flex items-center gap-3 group"
                                        >
                                            <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${isActive(item.url)
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted group-hover:bg-muted/80'
                                                }`}>
                                                <item.icon className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{item.title}</span>
                                            </div>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Enhanced Sidebar Footer */}
            <SidebarFooter className="bg-muted/30">
                <SidebarMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton className="w-full justify-start data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50">
                                <Avatar className="h-8 w-8 rounded-lg border-2 border-background shadow-sm">
                                    <AvatarImage src={user?.avatar} alt={user?.firstName || "User"} />
                                    <AvatarFallback className="bg-primary text-white font-semibold">
                                        {getUserInitials()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {user?.firstName || "User"} {user?.lastName || ""}
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        {user?.email || "user@example.com"}
                                    </span>
                                    <Badge variant="secondary" className="w-fit mt-1 text-xs">
                                        User
                                    </Badge>
                                </div>
                                <ChevronRight className="ml-auto h-4 w-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56" side="top">
                            <DropdownMenuItem className="cursor-pointer">
                                <UserSquare2Icon className="w-4 h-4 mr-2" />
                                View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Settings className="w-4 h-4 mr-2" />
                                Account Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={handleLogout}>
                                <LogOutIcon className="w-4 h-4 mr-2" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
