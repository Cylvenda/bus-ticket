import {NavigationMenuHome} from "@/components/navigation-menu.tsx";
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu.tsx";
import {ThemeSwitcher} from "@/components/theme-swicher.tsx";
import {useNavigate} from "react-router-dom";

const Header = () => {

    const navigate = useNavigate()
    return (
        <>
            <header className="p-3 bg-primary  flex justify-between items-center">
                <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate( '/')}>Bus Ticket Booking</h1>

                <NavigationMenuHome />

                <div className="flex  justify-between items-center gap-2 cursor-pointer">
                    <ThemeSwitcher />
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className={"cursor-pointer"}>Quick Actions</NavigationMenuTrigger>
                                <NavigationMenuContent className="flex flex-col gap-2 p-3 ">
                                    <NavigationMenuLink>Login</NavigationMenuLink>
                                    <NavigationMenuLink>Register</NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </header>
        </>
    );
};

export default Header;