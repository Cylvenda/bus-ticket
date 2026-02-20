import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { NavigationMenuHome } from "@/components/navigation-menu.tsx"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu.tsx"
import { ThemeSwitcher } from "@/components/theme-swicher.tsx"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import FormLogin from "./form-login"
import FormRegister from "./form-register"
import FormForgetPassword from "./form-forget-password"
import { companyName } from "@/lib/commonName"

type FormType = "login" | "register" | "resetPassword" | null

const Header = () => {
  const navigate = useNavigate()
  const [phoneMenu, setPhoneMenu] = useState<boolean>(false)
  const [activeForm, setActiveForm] = useState<FormType>(null)

  const openForm = (formType: FormType) => {
    setActiveForm(formType)
    setPhoneMenu(false)
  }

  const handleClose = () => {
    setActiveForm(null)
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-primary/40 bg-primary px-3 py-3 text-primary-foreground backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2">
          <h1
            className="cursor-pointer text-xl font-semibold tracking-tight text-primary-foreground"
            onClick={() => navigate("/")}
          >
            {companyName}
          </h1>

          <NavigationMenuHome />

          <div className="flex items-center gap-2">
            <ThemeSwitcher />

            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setPhoneMenu(true)}
              aria-label="Open menu"
            >
              <Menu />
            </Button>

            {phoneMenu && (
              <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
                <div className="absolute right-3 top-3 w-[92%] max-w-sm rounded-xl border border-primary-foreground/25 bg-primary p-3 text-primary-foreground shadow-xl">
                  <div className="mb-3 flex items-center justify-between border-b border-primary-foreground/20 pb-2">
                    <span className="text-sm font-medium text-primary-foreground">Quick Actions</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setPhoneMenu(false)}
                      aria-label="Close menu"
                    >
                      <X />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <button
                      className="w-full rounded-md border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-2 text-left text-sm text-primary-foreground hover:bg-primary-foreground/20"
                      onClick={() => openForm("register")}
                    >
                      Register
                    </button>
                    <button
                      className="w-full rounded-md border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-2 text-left text-sm text-primary-foreground hover:bg-primary-foreground/20"
                      onClick={() => openForm("login")}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            )}

            <NavigationMenu className="hidden md:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="cursor-pointer">
                    Quick Actions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-44 p-2">
                    <NavigationMenuLink
                      onClick={() => openForm("login")}
                      className="block cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-accent"
                    >
                      Login
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      onClick={() => openForm("register")}
                      className="block cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-accent"
                    >
                      Register
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </header>

      {activeForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 md:items-start md:justify-end">
          <Card className="relative top-0 h-[95vh] w-full overflow-y-auto rounded-xl border-border bg-card md:top-3 md:h-[98vh] md:w-[50%]">
            <div className="flex flex-col gap-3 px-4 py-4 md:px-6">
              <div className="flex items-center justify-between rounded-md border border-border bg-muted/30 p-3">
                <span className="text-sm font-medium text-foreground">{companyName}</span>
                <Button onClick={handleClose} variant="outline" aria-label="Close form">
                  <X size={18} />
                </Button>
              </div>

              <div>
                {activeForm === "login" && (
                  <FormLogin
                    onForgotPassword={() => setActiveForm("resetPassword")}
                    onRegisterClick={() => setActiveForm("register")}
                  />
                )}
                {activeForm === "register" && (
                  <FormRegister onLoginClick={() => setActiveForm("login")} />
                )}
                {activeForm === "resetPassword" && (
                  <FormForgetPassword
                    onLoginClick={() => setActiveForm("login")}
                    onRegisterClick={() => setActiveForm("register")}
                  />
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}

export default Header
