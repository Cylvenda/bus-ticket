import {NavigationMenuHome} from "@/components/navigation-menu.tsx";
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu.tsx";

const Header = () => {
    return (
        <>
            <header className="p-3 bg-primary  flex justify-between items-center">
                <h1 className="text-2xl font-bold">Bus Ticket Booking</h1>

                <NavigationMenuHome />

                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Quick Actions</NavigationMenuTrigger>
                            <NavigationMenuContent className="flex flex-col gap-2 p-3">
                                <NavigationMenuLink>Login</NavigationMenuLink>
                                <NavigationMenuLink>Register</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </header>
        </>
    );
};

export default Header;