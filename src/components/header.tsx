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
import FormLogin from "./form-login";
import FormRegister from "./form-register";
import { Card } from "./ui/card";

const Header = () => {

    const navigate = useNavigate()

    const [phoneMenu, setphoneMenu] = useState<boolean>(false)
    const [loginForm, setLoginForm] = useState<boolean>(false)
    const [registerForm, setRegisterForm] = useState<boolean>(false)


    const handleClose = () => {
        setLoginForm(false)
        setRegisterForm(false)
    }

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
                                    <li className="m-2" onClick={() => setRegisterForm(true)}>Register</li>
                                    <li className="m-2" onClick={() => { setLoginForm(true) }} >Login</li>
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
                                    <NavigationMenuLink onClick={() => setLoginForm(true)}>
                                        Login
                                    </NavigationMenuLink>
                                    <NavigationMenuLink onClick={() => setRegisterForm(true)}>
                                        Register
                                    </NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </header>


            {(loginForm || registerForm) && (
                <Card className="fixed md:absolute w-full md:w-[50%] h-full z-10 right-0 border-none rounded-none overflow-y-auto">
                    {/* Sticky Close Button - Top Right */}
                    <button
                        onClick={handleClose}
                        className="sticky top-4 float-right mr-4 z-20 p-2 "
                        aria-label="Close"
                    >
                        <X className="text-primary" size={24} />
                    </button>

                    {/* Form Content */}
                    <div className="clear-both p-6 pt-16">
                        {loginForm && <FormLogin />}
                        {registerForm && <FormRegister />}
                    </div>
                </Card>
            )}
        </>
    );
};

export default Header;