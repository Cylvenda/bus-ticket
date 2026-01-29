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
import { Button } from "./ui/button";
import { companyName } from "@/lib/commonName";
import FormForgetPassword from "./form-forget-password";

type FormType = 'login' | 'register' | 'resetPassword' | null;

const Header = () => {
    const navigate = useNavigate();
    const [phoneMenu, setPhoneMenu] = useState<boolean>(false);
    const [activeForm, setActiveForm] = useState<FormType>(null);

    const openForm = (formType: FormType) => {
        setActiveForm(formType);
        setPhoneMenu(false); // Close mobile menu when opening a form
    };

    const handleClose = () => {
        setActiveForm(null);
    };

    return (
        <>
            <header className="p-3 bg-primary flex justify-between items-center sticky top-0 z-50">
                <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
                    {companyName}
                </h1>

                <NavigationMenuHome />

                <div className="flex justify-between items-center gap-2 cursor-pointer">
                    <ThemeSwitcher />
                    <>
                        <Menu onClick={() => setPhoneMenu(true)} className="block md:hidden" />
                        {phoneMenu && (
                            <ul className="absolute z-10 top-0 right-0 bg-secondary p-3 flex flex-col w-full">
                                <li className="p-2 flex flex-row justify-between border-b-2 border-primary">
                                    <span className="ml-5">Quick Actions</span>
                                    <X onClick={() => setPhoneMenu(false)} />
                                </li>
                                <li className="m-2 hover:opacity-80 cursor-pointer" onClick={() => openForm('register')}>
                                    Register
                                </li>
                                <li className="m-2 hover:opacity-80 cursor-pointer" onClick={() => openForm('login')}>
                                    Login
                                </li>
                            </ul>
                        )}
                    </>
                    <NavigationMenu className="hidden md:block">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="cursor-pointer">
                                    Quick Actions
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="p-3">
                                    <NavigationMenuLink
                                        onClick={() => openForm('login')}
                                        className="cursor-pointer block hover:opacity-80"
                                    >
                                        Login
                                    </NavigationMenuLink>
                                    <NavigationMenuLink
                                        onClick={() => openForm('register')}
                                        className="cursor-pointer block hover:opacity-80"
                                    >
                                        Register
                                    </NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </header>

            {activeForm && (
                <div className="fixed inset-0 bg-black/50 z-10 flex items-center justify-center md:items-start md:justify-end">
                    <Card className="relative bg-primary  w-full md:w-[50%] h-full md:h-screen border-none rounded overflow-y-auto top-9">
                        <div className="px-6 flex flex-col gap-3">
                            <div className="bg-secondary p-3 flex flex-row items-center justify-between gap-1 rounded-md">
                                <span>{companyName} </span>
                                <Button
                                    onClick={handleClose}
                                    className="bg-primary cursor-pointer"
                                    aria-label="Close form"
                                >
                                    <X size={24} />
                                </Button>
                            </div>
                            <div>
                                {activeForm === 'login' && (
                                    <FormLogin onForgotPassword={() => setActiveForm('resetPassword')} onRegisterClick={() => setActiveForm('register')} />
                                )}
                                {activeForm === 'register' && <FormRegister onLoginClick={() => setActiveForm('login')} />}
                                {activeForm === 'resetPassword' && <FormForgetPassword onLoginClick={() => setActiveForm('login')} onRegisterClick={() => setActiveForm('register')} />}
                            </div>

                        </div>
                    </Card>
                </div>
            )}
        </>
    );
};

export default Header;