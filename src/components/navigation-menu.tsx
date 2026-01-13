import * as React from "react"
import { Link, useNavigate } from "react-router-dom"

// import { useIsMobile } from "@/hooks/use-mobile"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { assets } from "@/assets/assets.ts";
import { Button } from "./ui/button";

/* =========================
   Menu Data
========================= */

const components = [
    {
        title: "Search Trips",
        href: "/search",
        description: "Find buses by route, date, and seat availability.",
    },
    {
        title: "Routes",
        href: "/routes",
        description: "Browse all supported routes and terminals.",
    },
    {
        title: "Schedules",
        href: "/schedules",
        description: "View departure and arrival times.",
    },
    {
        title: "Seat Selection",
        href: "/seats",
        description: "Choose your preferred seat before payment.",
    },
]

const accountMenu = [
    {
        title: "My Tickets",
        href: "/account/tickets",
        description: "View, download, or cancel your tickets.",
    },
    {
        title: "Booking History",
        href: "/account/history",
        description: "Track all your past bookings and payments.",
    },
    {
        title: "Profile",
        href: "/account/profile",
        description: "Manage personal details and preferences.",
    },
]

/* =========================
   Navigation Menu
========================= */

export function NavigationMenuHome() {
    // const isMobile = useIsMobile()

    const navigate = useNavigate()

    return (
        <NavigationMenu className="hidden md:block" >
            <NavigationMenuList className="flex-wrap">
                {/* HOME */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger aria-label="Home menu" className={"cursor-pointer"}>
                        Home
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                        <ul className="grid gap-2 md:w-100 lg:w-125 lg:grid-cols-[.75fr_1fr] ">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link
                                        to="/"
                                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none hover:bg-muted focus:shadow-md md:p-6"
                                    >
                                        <img src={assets.busEmpty} alt="" width={400} height={100} />
                                        <div className="mb-2 text-sm font-medium sm:mt-4">
                                            Bus Ticket Booking
                                        </div>
                                        <p className="text-muted-foreground text-[12px] text-justify leading-tight">
                                            Book bus tickets easily, choose seats, and pay securely.
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>

                            <ListItem href="/about" title="About Us">
                                Learn about our service, partners, and coverage.
                            </ListItem>

                            <ListItem href="/support" title="Contact & Support">
                                Get help with bookings, payments, or refunds.
                            </ListItem>

                            <ListItem href="/faqs" title="FAQs">
                                Common questions about booking and travel.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* FEATURES */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger aria-label="Features menu" className={"cursor-pointer"}>
                        Get More
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                        <ul className="grid gap-2 sm:w-100 md:w-125 md:grid-cols-2 lg:w-150 ">
                            {components.map((item) => (
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                >
                                    {item.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* CUSTOMERS */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger aria-label="Customer menu" className={"cursor-pointer"}>
                        Customers
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                        <ul className="grid gap-2 sm:w-100 md:w-125 md:grid-cols-2 lg:w-150 ">
                            {accountMenu.map((item) => (
                                <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                >
                                    {item.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>

                </NavigationMenuItem>
                
                <NavigationMenuItem >
                    <Button className="cursor-pointer text-black dark:text-white " onClick={() => navigate("/schedule")} >
                        Schedule
                    </Button>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

/* =========================
   List Item Component
========================= */

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link
                    to={href}
                    className="block rounded-md p-3 transition-colors hover:bg-muted focus:bg-muted"
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
