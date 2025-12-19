import { NavigationMenuHome } from "@/components/navigation-menu.tsx";
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu.tsx";
import { ThemeSwitcher } from "@/components/theme-swicher.tsx";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {

    const navigate = useNavigate()

    const [phoneMenu, setphoneMenu] = useState<boolean>(false)

    return (
        <>
            <header className="p-3 bg-primary  flex justify-between items-center">
                <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>Bus Ticket Booking</h1>

                <NavigationMenuHome />

                

                <div className="flex  justify-between items-center gap-2 cursor-pointer">
                    <ThemeSwitcher />
                    <>
                        <Menu onClick={() => setphoneMenu(true)} className="block md:hidden" />
                        {
                            phoneMenu ?
                                <ul className="absolute z-10 top-0 right-0 bg-secondary p-3 flex flex-col w-full ">

                                    <li className="p-2 flex flex-row justify-between border-b-2 border-primary"><span className="ml-5 ">Quick Actions</span> <X onClick={() => setphoneMenu(false)} /></li>
                                    <li className="m-2">Register</li>
                                    <li className="m-2">Login</li>
                                </ul>
                                : 
                                <></>
                        }
                    </>
                    <NavigationMenu className="hidden md:block">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className={"cursor-pointer"}>Quick Actions</NavigationMenuTrigger>
                                <NavigationMenuContent className="p-3">
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